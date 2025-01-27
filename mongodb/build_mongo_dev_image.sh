#!/bin/bash

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 --engine <engine> --image-name <image_name> --dockerfile <dockerfile>"
    echo "Build a MongoDB development image"
    echo
    echo "Options:"
    echo "  --engine, -e       Specify the container engine (podman or docker)"
    echo "  --image-name, -i   Specify the image name"
    echo "  --dockerfile, -f   Specify the Dockerfile to use"
    echo "  -h, --help         Show this help message and exit"
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

    print_message $YELLOW "Using Dockerfile: $dockerfile and build image: $image_name" $NC
    
    if $engine build -t "$image_name" -f "$dockerfile" .; then
        print_message $GREEN "Image built successfully: $image_name"
        exit 0
    else
        print_message $RED "Failed to build image"
        exit 1
    fi
}

# Parse arguments
engine=""
image_name="mongo-dev"
dockerfile="Dockerfile.mongo-for-dev"

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
        --dockerfile|-f)
            dockerfile="$2"
            shift 2
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            print_message $RED "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [ -z "$engine" ]; then
    echo -e "${RED}Error: --engine parameter is required.${NC}"
    print_usage
    exit 1
fi 

check_engine $engine

# Build the image
build_image $engine $image_name $dockerfile
BUILD_EXIT_CODE=$?
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo -e "${RED}Failed to build the image: $image_name.${NC}"
    exit $BUILD_EXIT_CODE
else
    echo -e "${GREEN}Image $image_name built successfully.${NC}"
fi