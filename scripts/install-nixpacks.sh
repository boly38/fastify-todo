#!/usr/bin/env bash
set -e

if ! command -v nixpacks &>/dev/null; then
  echo "Installing Nixpacks..."
  curl -sSL https://nixpacks.com/install.sh | bash
  nixpacks --version
fi