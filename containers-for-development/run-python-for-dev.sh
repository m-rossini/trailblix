#!/bin/zsh

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m' # No Color

print_usage() {
    echo -e "${YELLOW}Usage: $0 [-e|--engine <engine>] [-i|--image-name <image_name>] [-p|--pod-name <pod_name>] [-c|--container-name <container_name>] [-m|--mount <mount_path>] [--network <network_name>] [--remove-existing|-re] [--remove-force|-rf] [-h|--help]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo -e "${YELLOW}  -e, --engine <engine>           Specify the container engine (podman or docker)${NC}"
    echo -e "${YELLOW}  -i, --image-name <image_name>   Specify the image name${NC}"
    echo -e "${YELLOW}  -p, --pod-name <pod_name>       Specify the pod name${NC}"
    echo -e "${YELLOW}  -c, --container-name <container_name> Specify the container name (mandatory)${NC}"
    echo -e "${YELLOW}  -m, --mount <mount_path>        Specify the mount path${NC}"
    echo -e "${YELLOW}  --network <network_name>        Specify the network name${NC}"
    echo -e "${YELLOW}  --remove-existing, -re          Remove existing container if it exists${NC}"
    echo -e "${YELLOW}  --remove-force, -rf             Force remove running container if it exists${NC}"
    echo -e "${YELLOW}  -h, --help                      Show this help message and exit${NC}"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--engine)
            ENGINE="$2"
            shift 2
            ;;    
        -i|--image-name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -p|--pod-name)
            POD_NAME="$2"
            shift 2
            ;;
        -n|--network)
            NETWORK_NAME="$2"
            shift 2
            ;;            
        -c|--container-name)
            CONTAINER_NAME="$2"
            shift 2
            ;;
        -m|--mount)
            MOUNT_PATH="$2"
            shift 2
            ;;
        --remove-existing|-re)
            REMOVE_EXISTING="--remove-existing"
            shift
            ;;
        --remove-force|-rf)
            REMOVE_FORCE="--remove-force"
            shift
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            print_usage
            exit 1
            ;;
    esac
done

if [ -z "$ENGINE" ]; then
    echo -e "${RED}Error: --engine parameter is required.${NC}"
    print_usage
    exit 1
fi

if [ -z "$IMAGE_NAME" ]; then
    echo -e "${RED}Error: --image-name parameter is required.${NC}"
    print_usage
    exit 1
fi

if [ -z "$CONTAINER_NAME" ]; then
    echo -e "${RED}Error: Container name is required.${NC}"
    print_usage
    exit 1
fi

if [ -z "$MOUNT_PATH" ]; then
    echo -e "${RED}Error: Mount path is required.${NC}"
    print_usage
    exit 1
fi

if [ -n "$POD_NAME" ] && [ -n "$NETWORK_NAME" ]; then
    echo -e "${RED}Error: --pod-name and --network are incompatible. Please specify only one.${NC}"
    print_usage
    exit 1
fi

if [ -z "$POD_NAME" ] && [ -z "$NETWORK_NAME" ]; then
    echo -e "${RED}Error: Either --pod-name or --network must be specified.${NC}"
    print_usage
    exit 1
fi

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")

CMD="${PROJECT_ROOT}/containers-for-development/run-container-for-dev.sh \
    --engine \"$ENGINE\" \
    --image-name \"$IMAGE_NAME\" \
    --container-name \"$CONTAINER_NAME\" \
    --mount \"$MOUNT_PATH\""

if [ "$ENGINE" = "podman" ]; then
    if [ -n "$POD_NAME" ]; then
        CMD="$CMD --pod-name \"$POD_NAME\""
    else
        echo -e "${RED}Error: --pod-name is required for podman.${NC}"
        print_usage
        exit 1
    fi
elif [ "$ENGINE" = "docker" ]; then
    if [ -n "$NETWORK_NAME" ]; then
        CMD="$CMD --network \"$NETWORK_NAME\""
    else
        echo -e "${RED}Error: --network is required for docker.${NC}"
        print_usage
        exit 1
    fi
else
    echo -e "${RED}Error: Unsupported engine: $ENGINE. Supported engines are podman and docker.${NC}"
    print_usage
    exit 1
fi

if [ -n "$REMOVE_EXISTING" ]; then
    CMD="$CMD $REMOVE_EXISTING"
fi

if [ -n "$REMOVE_FORCE" ]; then
    CMD="$CMD $REMOVE_FORCE"
fi

echo -e "${LIGHT_BLUE}Starting: $CMD${NC}"
eval $CMD 2>&1
COMMAND_EXIT_CODE=$?

if [ $COMMAND_EXIT_CODE -ne 0 ]; then
    echo -e "${RED}Failed to start Python container: $CONTAINER_NAME.${NC}"
    echo -e "${RED}Error details: $OUTPUT${NC}"
    exit $COMMAND_EXIT_CODE
else
    echo -e "${GREEN}Python container $CONTAINER_NAME started successfully.${NC}"
fi