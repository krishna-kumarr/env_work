#!/bin/bash

set -euo pipefail

# Ensure GitHub CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Please run 'gh auth login' and try again."
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
TOKEN=""

if [[ "$BRANCH" == "main" ]]; then
  ENV_FILE="env/.env.production"
elif [[ "$BRANCH" == "dev" ]]; then
  ENV_FILE="env/.env.local"
else
  echo "Unsupported branch: $BRANCH"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE not found. Skipping secret update for branch '$BRANCH'."
  exit 0
fi

# Check and create environment if it doesn't exist
env_exists=$(curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/${REPO}/environments/${BRANCH}" | jq -r '.name // empty')

if [[ -z "$env_exists" ]]; then
  echo "Creating environment '$BRANCH'..."
  curl -s -X PUT -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${REPO}/environments/${BRANCH}" \
    -d '{"wait_timer":0,"reviewers":[]}'
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

echo "All secrets uploaded to environment: $BRANCH"
