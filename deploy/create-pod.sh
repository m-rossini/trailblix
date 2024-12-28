#!/usr/bin/env bash

# Debugging: Print the initial arguments
echo "Initial arguments: $@"

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if a pod exists
pod_exists() {
    local engine=$1
    local podname=$2
    $engine pod exists $podname 2>/dev/null
}

# Function to check if a network exists
network_exists() {
    local engine=$1
    local network=$2
    $engine network inspect $network &>/dev/null
}

# Function to create a network
create_network() {
    local engine=$1
    local network=$2
    $engine network create $network
}

# Function to remove a pod
remove_pod() {
    local engine=$1
    local podname=$2
    local force=$3
    if [ "$force" = true ]; then
        $engine pod rm -f $podname
    else
        $engine pod rm $podname
    fi
}

# Function to check if a pod has containers
pod_has_containers() {
    local engine=$1
    local podname=$2
    [ "$($engine pod inspect $podname --format '{{.NumContainers}}')" -gt 0 ]
}

usage() {
    echo -e "${YELLOW}Usage:${NC} $0 [options]"
    echo -e "\n${YELLOW}Options:${NC}"
    echo -e "  --engine|-e           Container engine to use (default: podman)"
    echo -e "  --podname|-pn         Name of the pod (required)"
    echo -e "  --hostname|-hn        Hostname of the pod (required)"
    echo -e "  --memory|-m           Memory allocation for the pod (default: 8G)"
    echo -e "  --network|-net        Network to use (default: <podname>-net)"
    echo -e "  --ports|-p            List of ports to map (e.g., 8080:80 8443:443)"
    echo -e "  --remove-existing|-re Remove existing pod if it exists (default: false)"
    echo -e "  --remove-force|-rf    Forcefully remove existing pod if it exists (default: false)"
    echo -e "  --help|-h             Display this help message"
    echo -e "\n${YELLOW}Examples:${NC}"
    echo -e "  $0 --engine podman --podname my-pod --hostname my-host --memory 4G --ports 8080:80 8443:443"
    echo -e "  $0 --podname test-pod --hostname test-host --remove-existing"
}

# Parse arguments
engine="podman"
memory="8G"
remove_existing=false
remove_force=false

# Display usage if no arguments are provided or --help is requested
if [[ $# -eq 0 || "$1" == "--help" || "$1" == "-h" ]]; then
    usage
    exit 1
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        --engine|-e)
            engine="$2"
            shift 2
            ;;
        --podname|-pn)
            podname="$2"
            shift 2
            ;;
        --hostname|-hn)
            hostname="$2"
            shift 2
            ;;
        --memory|-m)
            memory="$2"
            shift 2
            ;;
        --network|-net)
            network="$2"
            shift 2
            ;;
        --ports|-p)
            ports=("$2")
            shift 2
            while [[ $# -gt 0 && $1 != -* ]]; do
                ports+=("$1")
                shift
            done
            ;;
        --remove-existing|-re)
            remove_existing=true
            shift
            ;;
        --remove-force|-rf)
            remove_force=true
            shift
            ;;
        *)
            print_message $RED "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Display usage if required arguments are missing
if [[ -z "$podname" || -z "$hostname" ]]; then
    usage
    exit 1
fi

# Set default network if not provided
network=${network:-"$podname-net"}

# Check if network exists, if not, create it
if ! network_exists $engine $network; then
    print_message $YELLOW "Warning: Network '$network' does not exist. Creating it now."
    if create_network $engine $network; then
        print_message $GREEN "Network '$network' created successfully."
    else
        print_message $RED "Error: Failed to create network '$network'."
        exit 1
    fi
fi

# Check if pod exists
if pod_exists $engine $podname; then
    if [ "$remove_force" = true ]; then
        print_message $YELLOW "Removing existing pod '$podname' forcefully."
        if remove_pod $engine $podname true; then
            print_message $GREEN "Pod '$podname' removed successfully."
        else
            print_message $RED "Error: Failed to remove pod '$podname'."
            exit 1
        fi
    elif [ "$remove_existing" = true ]; then
        if pod_has_containers $engine $podname; then
            print_message $YELLOW "Warning: Pod '$podname' has containers. Not removing."
        else
            print_message $YELLOW "Removing existing empty pod '$podname'."
            if remove_pod $engine $podname false; then
                print_message $GREEN "Pod '$podname' removed successfully."
            else
                print_message $RED "Error: Failed to remove pod '$podname'."
                exit 1
            fi
        fi
    else
        print_message $YELLOW "Warning: Pod '$podname' already exists. No changes will be made."
        exit 0
    fi
fi

# Create pod
create_command="$engine pod create --name $podname --hostname $hostname --memory $memory --network $network"

# Add port mappings
for port in "${ports[@]}"; do
    create_command+=" -p $port"
done

print_message $GREEN "Creating pod with command:"
print_message $GREEN "$create_command"

if eval $create_command; then
    print_message $GREEN "Pod '$podname' created successfully."
else
    print_message $RED "Error: Failed to create pod '$podname'."
    exit 1
fi