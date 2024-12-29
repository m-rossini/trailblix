#!/bin/bash

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Default values
DEFAULT_ENGINE="podman"
DEFAULT_IMAGE_NAME="python-coding"
DEFAULT_DOCKERFILE="../Dockerfile"

# Function to print usage
print_usage() {
  echo -e "${YELLOW}Usage: $0 [-e|--engine <engine>] [-i|--image-name <image_name>] [-f|--dockerfile <dockerfile>] [-h|--help]${NC}"
  echo -e "${YELLOW}Options:${NC}"
  echo -e "${YELLOW}  -e, --engine <engine>           Specify the container engine (podman or docker, default: podman)${NC}"
  echo -e "${YELLOW}  -i, --image-name <image_name>   Specify the image name (default: python-coding)${NC}"
  echo -e "${YELLOW}  -f, --dockerfile <dockerfile>   Specify the Dockerfile to use (default: ../Dockerfile)${NC}"
  echo -e "${YELLOW}  -h, --help                      Show this help message and exit${NC}"
  echo -e "${YELLOW}Examples:${NC}"
  echo -e "${YELLOW}  $0 --engine docker --image-name my-python-dev --dockerfile ../Dockerfile.custom${NC}"
}

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
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
    local dockerfile=$3

    print_message $YELLOW "Using Dockerfile: $dockerfile"

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
    -f|--dockerfile)
      DOCKERFILE="$2"
      shift 2
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

# Use default values if not provided
ENGINE=${ENGINE:-$DEFAULT_ENGINE}
IMAGE_NAME=${IMAGE_NAME:-$DEFAULT_IMAGE_NAME}
DOCKERFILE=${DOCKERFILE:-$DEFAULT_DOCKERFILE}

# Check if the container engine is installed
check_engine $ENGINE

# Build the image
build_image $ENGINE $IMAGE_NAME $DOCKERFILE