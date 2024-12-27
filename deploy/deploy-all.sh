#!/bin/zsh

ui_image_name="node-deploy-dev"
ui_container_name="node-ui-dev-app"
ui_memory="8G"

um_image_name="user-management-deploy-dev"
um_container_name="user-management-dev-app"
um_memory="8G"

# Common values
engine="podman"
podname="trailblix-deploy-dev-pod"
network="marcos-net"
hostname="trailblix-dev-host"
remove_existing=""
remove_force=""
ports=("3000:3000" "5000:5000" "8443:8443")

ui_memory_value=${ui_memory%G}
um_memory_value=${um_memory%G}
memory_value=$((ui_memory_value + um_memory_value))
memory="${memory_value}G"

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

# Call create-pod.sh to manage the pod
./create-pod.sh \
  --engine "$engine" \
  --podname "$podname" \
  --hostname "$hostname" \
  --memory "$memory" \
  --network "$network" \
  --ports "${ports[@]}" \
    $remove_existing \
    $remove_force

# Deploy UI
./deploy-local.sh \
  --engine "$engine" \
  --image-name "$ui_image_name" \
  --hostname "$hostname" \
  --podname "$podname" \
  --container-name "$ui_container_name" \
  --memory "$ui_memory" \
  --network "$network" \
  $remove_existing \
  $remove_force

# Deploy User Management
./deploy-local.sh \
  --engine "$engine" \
  --image-name "$um_image_name" \
  --hostname "$hostname" \
  --podname "$podname" \
  --container-name "$um_container_name" \
  --memory "$um_memory" \
  --network "$network" \
  $remove_existing \
  $remove_force