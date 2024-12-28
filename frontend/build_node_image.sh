#!/bin/bash

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

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Build a Node.js development image with network utilities and eza"
    echo
    echo "Options:"
    echo "  -e, --engine ENGINE       Specify the container engine (default: podman)"
    echo "  -i, --image-name NAME     Specify the name for the built image (default: node-dev)"
    echo "  -n, --node-args ARGS      Specify arguments for the Node.js command"
    echo "  -f, --dockerfile FILE     Specify the Dockerfile to use (default: ../Dockerfile.dev)"
    echo "  -h, --help                Display this help message"
    echo
    echo "Example:"
    echo "  $0 --engine docker --image-name my-node-dev --node-args '--inspect=0.0.0.0:9229' --dockerfile ../Dockerfile.custom"
}

# Function to check if the container engine is installed
check_engine() {
    local engine=$1
    if ! command -v $engine &> /dev/null; then
        print_message $RED "$engine is not installed. Please install $engine and try again."
        exit 1
    fi
}

# Function to build the image
build_image() {
    local engine=$1
    local image_name=$2
    local node_args=$3
    local dockerfile=$4

    print_message $YELLOW "Using Dockerfile: $dockerfile"

    # If node_args are provided, modify the CMD instruction in the Dockerfile
    if [ -n "$node_args" ]; then
        sed -i "s|CMD \[\"node\", \"npm\", \"start\"\]|CMD [\"node\", $node_args, \"npm\", \"start\"]|" $dockerfile
    fi

    print_message $YELLOW "Building image: $image_name"
    
    # Ensure .dockerignore exists
    if [ ! -f .dockerignore ]; then
        echo "deploy/" > .dockerignore
        print_message $YELLOW "Created .dockerignore file to exclude 'deploy' directory"
    fi

    if $engine build -t "$image_name" -f "$dockerfile" .; then
        print_message $GREEN "Image built successfully: $image_name"
    else
        print_message $RED "Failed to build image"
        exit 1
    fi
}

# Parse arguments
engine="podman"
image_name="node-deploy-dev"
node_args=""
dockerfile="../Dockerfile.dev"  # Default Dockerfile path

while [[ $# -gt 0 ]]; do
    case $1 in
        --engine|-e)
            engine="$2"
            shift 2
            ;;
        --image-name|-i)
            image_name="$2"
            shift 2
            ;;
        --node-args|-n)
            node_args="$2"
            shift 2
            ;;
        --dockerfile|-f)
            dockerfile="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            print_message $RED "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Check if the specified engine is installed
check_engine $engine

# Check if the specified Dockerfile exists
if [ ! -f "$dockerfile" ]; then
    print_message $RED "Error: Dockerfile '$dockerfile' not found."
    exit 1
fi

# Build the image
build_image $engine $image_name "$node_args" "$dockerfile"

print_message $GREEN "Image build complete"