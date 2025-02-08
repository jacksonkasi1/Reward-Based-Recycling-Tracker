#!/bin/bash

# Set variables
BUCKET_NAME="your-bucket-name"  # Replace with your actual bucket name
CORS_FILE="cors.json"           # Ensure this file exists in the same directory

echo "🚀 Starting Google Cloud Storage setup..."

# 1️⃣ Install Google Cloud SDK if not installed
if ! command -v gsutil &> /dev/null; then
    echo "📥 Installing Google Cloud SDK..."

    # Detect OS and install accordingly
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt update && sudo apt install -y curl apt-transport-https ca-certificates gnupg
        curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
        echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
        sudo apt update && sudo apt install -y google-cloud-sdk
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install --cask google-cloud-sdk
    else
        echo "❌ Unsupported OS. Please install Google Cloud SDK manually."
        exit 1
    fi

    echo "✅ Google Cloud SDK installed successfully!"
else
    echo "✅ Google Cloud SDK is already installed."
fi

# 2️⃣ Authenticate with Google Cloud (only if not authenticated)
if ! gcloud auth list --format="value(account)" | grep -q "@"; then
    echo "🔑 Please log in to your Google Cloud account..."
    gcloud auth login
else
    echo "✅ Already authenticated with Google Cloud."
fi

# 3️⃣ Set Google Cloud Project (if not already set)
if ! gcloud config get-value project 2>/dev/null | grep -q "."; then
    echo "⚙️  No project set. Please select your Google Cloud project..."
    gcloud projects list
    echo "Enter your Google Cloud Project ID:"
    read PROJECT_ID
    gcloud config set project "$PROJECT_ID"
else
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    echo "✅ Using Google Cloud Project: $PROJECT_ID"
fi

# 4️⃣ Make the GCS Bucket Public
echo "🔓 Making bucket '$BUCKET_NAME' public..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME
if [ $? -eq 0 ]; then
    echo "✅ Bucket is now public!"
else
    echo "❌ Failed to set public access."
    exit 1
fi

# 5️⃣ Apply CORS Configuration
if [ -f "$CORS_FILE" ]; then
    echo "🌍 Applying CORS settings from '$CORS_FILE'..."
    gsutil cors set $CORS_FILE gs://$BUCKET_NAME
    if [ $? -eq 0 ]; then
        echo "✅ CORS settings applied successfully!"
    else
        echo "❌ Failed to apply CORS settings."
        exit 1
    fi
else
    echo "⚠️ CORS file '$CORS_FILE' not found. Skipping CORS configuration."
fi

# 6️⃣ Verify the Setup
echo "🔎 Verifying bucket IAM settings..."
gsutil iam get gs://$BUCKET_NAME

echo "🔎 Verifying CORS settings..."
gsutil cors get gs://$BUCKET_NAME

echo "🎉 Google Cloud Storage setup is complete!"
