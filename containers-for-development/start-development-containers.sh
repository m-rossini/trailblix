#!/bin/zsh

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m' # No Color

REMOVE_EXISTING=""
REMOVE_FORCE=""

print_usage() {
    echo -e "${YELLOW}Usage: $0 --engine <engine> [--remove-existing|-re] [--remove-force|-rf] [-h|--help]${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo -e "${YELLOW}  --engine <engine>               Specify the container engine (mandatory)${NC}"
    echo -e "${YELLOW}  --remove-existing, -re          Remove existing containers if they exist${NC}"
    echo -e "${YELLOW}  --remove-force, -rf             Force remove running containers if they exist${NC}"
    echo -e "${YELLOW}  -h, --help                      Show this help message and exit${NC}"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--engine)
            ENGINE="$2"
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

if [ -z "$ENGINE" ]; then
    echo -e "${RED}Error: --engine parameter is required.${NC}"
    print_usage
    exit 1
fi

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")

# Function to check the exit status of the last command and exit if it failed
check_exit_status() {
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: $1 failed.${NC}"
    exit 1
  fi
}

POD_NAME_APP="trailblix-dev-pod"
POD_NAME_DB="mongo-dev-pod"

if [ "$ENGINE" = "podman" ]; then
  echo -e "${YELLOW}Creating pods...${NC}"
  ${PROJECT_ROOT}/containers-for-development/create-development-pod.sh $POD_NAME_APP $POD_NAME_DB
  check_exit_status "Creating pods"
  POD_OPTION="--pod-name $POD_NAME_APP"
  POD_OPTION_DB="--pod-name $POD_NAME_DB"
else
  echo -e "${YELLOW}Creating Docker network...${NC}"
  docker network create marcos-net || true
  check_exit_status "Creating Docker network"
  POD_OPTION="--network marcos-net"
  POD_OPTION_DB="--network marcos-net"
fi

RUN_PYTHON_USER_SERVICE_CMD1="${PROJECT_ROOT}/containers-for-development/run-python-for-dev.sh \
  --engine \"$ENGINE\" \
  --image-name python-coding \
  --container-name python-coding-container-user-service \
  $POD_OPTION \
  --mount 'user_service' \
  --remove-existing \
  --remove-force"
echo -e "${YELLOW}Starting container for user service: ${RUN_PYTHON_USER_SERVICE_CMD1}${NC}"
eval $RUN_PYTHON_USER_SERVICE_CMD1
check_exit_status "Running Python container for User Service"

RUN_PYTHON_CAREER_SERVICE_CMD2="${PROJECT_ROOT}/containers-for-development/run-python-for-dev.sh \
  --engine \"$ENGINE\" \
  --image-name python-coding \
  --container-name python-coding-container-career-service \
  $POD_OPTION  \
  --mount 'career_service' \
  --remove-existing \
  --remove-force"
echo -e "${YELLOW}Starting cointainer for career service: ${RUN_PYTHON_CAREER_SERVICE_CMD2}${NC}"
eval $RUN_PYTHON_CAREER_SERVICE_CMD2
check_exit_status "Running Python container for Career Service"

RUN_NODE_CONTAINER_CMD="${PROJECT_ROOT}/containers-for-development/run-node-for-dev.sh \
  --engine \"$ENGINE\" \
  --image-name node-coding \
  --container-name 'node-coding-container' \
  --mount 'front_end' \
  $POD_OPTION  \
  --remove-existing \
  --remove-force"
echo -e "${YELLOW}Starting container for front end app: ${RUN_NODE_CONTAINER_CMD}${NC}"
eval $RUN_NODE_CONTAINER_CMD
check_exit_status "Running Node container"

RUN_MONGO_CONTAINER_CMD="${PROJECT_ROOT}/containers-for-development/run-mongo-for-dev.sh \
  --database-volume mongo-data \
  --engine \"$ENGINE\" \
  --image-name mongo-dev \
  --hostname 'mongo-for-dev-machine' \
  $POD_OPTION_DB \
  --remove-existing \
  --remove-force"
echo -e "${YELLOW}Starting up Mongo container and DB: ${RUN_MONGO_CONTAINER_CMD}${NC}"
eval $RUN_MONGO_CONTAINER_CMD
check_exit_status "Running Mongo container"

echo -e "${GREEN}All containers started successfully.${NC}"