#!/bin/bash

# Build your project (this step depends on your project setup)
echo "Building the project..."
npm run build

# Check for errors in the build process
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting publish."
  exit 1
fi

# Copy package.json to the build directory
echo "Copying package.json to the build directory..."
cp package.json ./dist

# Publish to npm
echo "Publishing to npm..."
cd dist && npm publish

# Check for errors in the publish process
if [ $? -ne 0 ]; then
  echo "Publish failed."
  exit 1
fi

echo "Publish successful."