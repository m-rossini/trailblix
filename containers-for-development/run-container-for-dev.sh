#!/bin/zsh

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m' # No Color

print_usage() {
  echo -e "${YELLOW}Usage: $0 [-e|--engine <engine>] [-p|--pod-name <pod_name>] [--network <network_name>] -i|--image-name <image_name> -c|--container-name <container_name> [-m|--mount <mount_path>] [--remove-existing|-re] [--remove-force|-rf] [-h|--help]${NC}"
  echo -e "${YELLOW}Options:${NC}"
  echo -e "${YELLOW}  -e, --engine <engine>           Specify the container engine (podman or docker, default: podman)${NC}"
  echo -e "${YELLOW}  -p, --pod-name <pod_name>       Specify the pod name (default: trailblix-dev-pod)${NC}"
  echo -e "${YELLOW}  --network <network_name>        Specify the network name${NC}"
  echo -e "${YELLOW}  -i, --image-name <image_name>   Specify the image name (mandatory)${NC}"
  echo -e "${YELLOW}  -c, --container-name <container_name> Specify the container name (mandatory)${NC}"
  echo -e "${YELLOW}  -m, --mount <mount_path>        Specify the mount path${NC}"
  echo -e "${YELLOW}  --remove-existing|-re          Remove existing container if it exists${NC}"
  echo -e "${YELLOW}  --remove-force|-rf             Force remove running container if it exists${NC}"
  echo -e "${YELLOW}  -h, --help                      Show this help message and exit${NC}"
  echo -e "${YELLOW}Examples:${NC}"
  echo -e "${YELLOW}  $0 --engine docker --pod-name my-pod --network my-network -i my-image -c my-container --mount /my/mount/path --remove-existing --remove-force${NC}"
}

print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
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
    -c|--container-name)
      CONTAINER_NAME="$2"
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
      break
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
    echo -e "${RED}Error: --container-name parameter is required.${NC}"
    print_usage
    exit 1
fi

if [ -z "$MOUNT_PATH" ]; then
    echo -e "${RED}Error: --mount parameter is required.${NC}"
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
MOUNT_PATH="${PROJECT_ROOT}/$MOUNT_PATH"

if [ -n "$REMOVE_FORCE" ]; then
    echo -e "${YELLOW}Force removing existing container: $CONTAINER_NAME${NC}"
    print_message $GREEN "Force removing container..."
    $ENGINE rm -f "$CONTAINER_NAME" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_message $GREEN "Container '$CONTAINER_NAME' removed successfully."
    else
        print_message $RED "Failed to force remove container '$CONTAINER_NAME'. It may not exist or you might not have the necessary permissions."
    fi
elif [ -n "$REMOVE_EXISTING" ]; then
    echo -e "${YELLOW}Removing existing container: $CONTAINER_NAME${NC}"
    print_message $GREEN "Removing container..."
    $ENGINE rm "$CONTAINER_NAME" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_message $GREEN "Container '$CONTAINER_NAME' removed successfully."
    else
        print_message $RED "Failed to remove container '$CONTAINER_NAME'. It may not exist."
    fi
fi

CMD="$ENGINE run --name $CONTAINER_NAME --rm -it -d"

if [ -n "$POD_NAME" ]; then
    CMD="$CMD --pod $POD_NAME"
fi

if [ -n "$NETWORK_NAME" ]; then
    CMD="$CMD --network $NETWORK_NAME"
fi

if [ -n "$MOUNT_PATH" ]; then
    CMD="$CMD -v $MOUNT_PATH"
fi

CMD="$CMD $IMAGE_NAME"

echo -e "${LIGHT_BLUE}Starting development container: $CMD${NC}"
eval $CMD
EXIT_CODE=$?