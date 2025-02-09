#!/bin/sh

# Ensure we are in the project root
cd "$(dirname "$0")"

# Set environment variables and create a .env file in apps/async-task
ENV_FILE="apps/async-task/.env"

# Clear existing .env file if it exists
rm -f $ENV_FILE

# Write environment variables to the .env file
echo "GCLOUD_STORAGE_BUCKET=$GCLOUD_STORAGE_BUCKET" >> $ENV_FILE
echo "FRONTEND_URL=$FRONTEND_URL" >> $ENV_FILE
echo "EDGE_SERVER_URL=$EDGE_SERVER_URL" >> $ENV_FILE
echo "JWT_SECRET=$JWT_SECRET" >> $ENV_FILE
echo "DATABASE_URL=$DATABASE_URL" >> $ENV_FILE
echo "GCLOUD_PROJECT_ID=$GCLOUD_PROJECT_ID" >> $ENV_FILE
echo "GCLOUD_SERVICE_ACCOUNT_KEY=$GCLOUD_SERVICE_ACCOUNT_KEY" >> $ENV_FILE
echo "IMAGE_PROCESS_SERVER_URL=$IMAGE_PROCESS_SERVER_URL" >> $ENV_FILE

# Log the created .env file for debugging
echo "✅ Environment variables saved to $ENV_FILE"
cat $ENV_FILE
