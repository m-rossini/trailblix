#!/bin/zsh

# Color codes
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m' # No Color

if [ -z "$1" ] || [ -z "$2" ]; then
  echo -e "${RED}Error: Both development pod name and MongoDB pod name are required.${NC}"
  echo -e "${YELLOW}Usage: $0 <development_pod_name> <mongodb_pod_name>${NC}"
  exit 1
fi

POD_NAME_APP=$1
POD_NAME_DB=$2

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")

create_pod() {
  local POD_NAME=$1
  shift
  local PORTS=("$@")
  if ! podman pod exists "$POD_NAME"; then
    echo -e "${YELLOW}Creating pod $POD_NAME...${NC}"
    local PORT_ARGS=()
    for PORT in "${PORTS[@]}"; do
      PORT_ARGS+=(-p "$PORT")
    done
    ${PROJECT_ROOT}/deploy/create-pod.sh -e podman \
      -pn "$POD_NAME" \
      -hn "${POD_NAME}-host" \
      -m 4G \
      -net marcos-net \
      "${PORT_ARGS[@]}" \
      -re
    echo -e "${GREEN}Pod $POD_NAME created successfully.${NC}"
  else
    echo -e "${LIGHT_BLUE}Pod $POD_NAME already exists.${NC}"
  fi
}

create_pod $POD_NAME_APP "5000:5000 5001:5001"
create_pod $POD_NAME_DB "27017:27017"