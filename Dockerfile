# Use the specified Python image from Microsoft Container Registry
FROM mcr.microsoft.com/devcontainers/python:1-3.11-bullseye

# Install Node.js (LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# [Optional] Uncomment this line to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
