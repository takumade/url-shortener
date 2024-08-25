#!/bin/bash

# Name of the Docker image
IMAGE_NAME="url-shortener"

# Build the Docker image
docker build -t $IMAGE_NAME .

# Print success message
echo "Docker image '$IMAGE_NAME' built successfully."
