#!/bin/zsh

# Default values
engine="podman"
image_name="node-deploy-dev"
hostname="ui-deploy-dev-host"
container_name="node-ui-dev-app"
podname="trailblix-deploy-dev-pod"
memory="8G"
network="marcos-net"
ports=("3000:3000" "8443:8443")
remove_existing=""
remove_force=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --remove-existing|-re)
            remove_existing="--remove-existing"
            shift
            ;;
        --remove-force|-rf)
            remove_force="--remove-force"
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done
# Construct the command line
cmd="./deploy-local.sh \
  --engine \"$engine\" \
  --podname \"$podname\" \
  --hostname \"$hostname\" \
  --memory \"$memory\" \
  --network \"$network\" \
  --image-name \"$image_name\" \
  --container-name \"$container_name\" \
  $remove_existing \
  $remove_force"

# Add ports to the command line
for port in "${ports[@]}"; do
  cmd="$cmd --ports $port"
done

# Print the command line
echo -e "Calling command: $cmd"

# Execute the command
eval $cmd