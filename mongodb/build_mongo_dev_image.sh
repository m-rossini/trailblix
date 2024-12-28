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
    
    if $engine build -t "$image_name" -f "$dockerfile" .; then
        print_message $GREEN "Image built successfully: $image_name"
    else
        print_message $RED "Failed to build image"
        exit 1
    fi
}

# Parse arguments
engine="podman"
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
            echo "Usage: $0 [OPTIONS]"
            echo "Build a MongoDB development image"
            echo
            echo "Options:"
            echo "  -e, --engine ENGINE       Specify the container engine (default: podman)"
            echo "  -i, --image-name NAME     Specify the name for the built image (default: mongo-dev)"
            echo "  -f, --dockerfile FILE     Specify the Dockerfile to use (default: Dockerfile.mongo-for-dev)"
            echo "  -h, --help                Display this help message"
            exit 0
            ;;
        *)
            print_message $RED "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Check if the container engine is installed
check_engine $engine

# Build the image
build_image $engine $image_name $dockerfile