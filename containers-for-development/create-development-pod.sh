#!/bin/zsh

# Color codes
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")

# Function to create a pod if it doesn't exist
create_pod() {
  local POD_NAME=$1
  if ! podman pod exists "$POD_NAME"; then
    echo -e "${YELLOW}Creating pod $POD_NAME...${NC}"
    ${PROJECT_ROOT}/deploy/create-pod.sh -e podman \
      -pn "$POD_NAME" \
      -hn "${POD_NAME}-host" \
      -m 4G \
      -net marcos-net \
      -re
    echo -e "${GREEN}Pod $POD_NAME created successfully.${NC}"
  else
    echo -e "${GREEN}Pod $POD_NAME already exists.${NC}"
  fi
}

create_pod "trailblix-dev-pod"

create_pod "mongo-dev-pod"

exit 0