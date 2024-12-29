#!/bin/zsh

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Default values
DEFAULT_IMAGE_NAME="python-coding"
DEFAULT_POD_NAME="trailblix-dev-pod"

print_usage() {
    echo -e "${YELLOW}Usage: $0 [-i|--image-name <image_name>] [-p|--pod-name <pod_name>] [-c|--container-name <container_name>] [-m|--mount <mount_path>] [--remove-existing|-re] [--remove-force|-rf] [-h|--help]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo -e "${YELLOW}  -i, --image-name <image_name>   Specify the image name (default: $DEFAULT_IMAGE_NAME)${NC}"
    echo -e "${YELLOW}  -p, --pod-name <pod_name>       Specify the pod name (default: $DEFAULT_POD_NAME)${NC}"
    echo -e "${YELLOW}  -c, --container-name <container_name> Specify the container name (mandatory)${NC}"
    echo -e "${YELLOW}  -m, --mount <mount_path>        Specify the mount path${NC}"
    echo -e "${YELLOW}  --remove-existing, -re          Remove existing container if it exists${NC}"
    echo -e "${YELLOW}  --remove-force, -rf             Force remove running container if it exists${NC}"
    echo -e "${YELLOW}  -h, --help                      Show this help message and exit${NC}"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--image-name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -p|--pod-name)
            POD_NAME="$2"
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

IMAGE_NAME=${IMAGE_NAME:-$DEFAULT_IMAGE_NAME}
POD_NAME=${POD_NAME:-$DEFAULT_POD_NAME}

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

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")
MOUNT_PATH="${PROJECT_ROOT}/$MOUNT_PATH"

echo -e "${YELLOW}Please ensure you are calling this script from the root of the module.${NC}"

# Call the common script with the appropriate parameters using absolute path
${PROJECT_ROOT}/containers-for-development/run-container-for-dev.sh --image-name "$IMAGE_NAME" --pod-name "$POD_NAME" --container-name "$CONTAINER_NAME" --mount "$MOUNT_PATH" $REMOVE_EXISTING $REMOVE_FORCE "$@"