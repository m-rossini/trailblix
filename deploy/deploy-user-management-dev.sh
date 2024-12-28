#!/bin/zsh

# Default values
engine="podman"
image_name="user-management-deploy-dev"
hostname="user-management-deploy-dev-host"
podname="trailblix-deploy-dev-pod"
container_name="user-management-dev-app"
memory="8G"
network="marcos-net"
ports=("5000:5000")
remove_existing=""
remove_force=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --engine|-e)
            engine="$2"
            shift 2
            ;;
        --network|-n)
            network="$2"
            shift 2
            ;;
        --podname|-p)
            podname="$2"
            shift 2
            ;;
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

echo -e "Calling command: $cmd"

eval $cmd