#!/bin/bash

set -e

BRANCH="$1"

if [[ "$BRANCH" == "main" ]]; then
  ENV_FILE="./env/.env.production"
elif [[ "$BRANCH" == "dev" ]]; then
  ENV_FILE="./env/.env.local"
else
  echo "Unsupported branch: $BRANCH"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE not found"
  exit 1
fi

echo "Updating environment secrets for '$BRANCH' from $ENV_FILE..."

while IFS='=' read -r key value; do
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  if [[ -z "$key" || "$key" == \#* ]]; then
    continue
  fi

  echo "Setting secret: $key"
  echo "$value" | gh secret set "$key" --env "$BRANCH"
done < "$ENV_FILE"
