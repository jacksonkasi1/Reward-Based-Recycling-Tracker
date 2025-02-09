#!/bin/bash

# Set variables
PROJECT_ID="your-gcp-project-id"  # Replace with your actual GCP project ID
SECRET_NAME="gcs-service-key"     # Name of the secret in Google Secret Manager
SECRET_FILE="service-account.json" # File where the secret will be saved locally

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null
then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK first."
    exit 1
fi

# Function to add the secret
add_secret() {
    if [ ! -f "$SECRET_FILE" ]; then
        echo "❌ Secret file '$SECRET_FILE' not found. Please create it first."
        exit 1
    fi

    echo "🔐 Adding secret '$SECRET_NAME' to Google Secret Manager..."
    
    # Check if the secret already exists
    if gcloud secrets list --project="$PROJECT_ID" | grep -q "$SECRET_NAME"; then
        echo "🔄 Secret '$SECRET_NAME' already exists. Updating it..."
        gcloud secrets versions add "$SECRET_NAME" --data-file="$SECRET_FILE" --project="$PROJECT_ID"
    else
        echo "🆕 Creating new secret '$SECRET_NAME'..."
        gcloud secrets create "$SECRET_NAME" --replication-policy="automatic" --project="$PROJECT_ID"
        gcloud secrets versions add "$SECRET_NAME" --data-file="$SECRET_FILE" --project="$PROJECT_ID"
    fi

    echo "✅ Secret added successfully!"
}

# Function to retrieve the secret and save it to a file
get_secret() {
    echo "📥 Retrieving secret '$SECRET_NAME' from Google Secret Manager..."
    gcloud secrets versions access latest --secret="$SECRET_NAME" --project="$PROJECT_ID" > "$SECRET_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✅ Secret saved to '$SECRET_FILE' successfully!"
    else
        echo "❌ Failed to retrieve the secret."
        exit 1
    fi
}

# Function to delete the secret
delete_secret() {
    echo "🚨 WARNING: This will permanently delete the secret '$SECRET_NAME' from Google Secret Manager."
    read -p "Are you sure you want to proceed? (yes/no): " confirm

    if [[ "$confirm" == "yes" ]]; then
        gcloud secrets delete "$SECRET_NAME" --project="$PROJECT_ID"
        echo "✅ Secret '$SECRET_NAME' has been deleted."
    else
        echo "❌ Operation canceled."
    fi
}

# Function to remove the local secret file
remove_local_secret() {
    if [ -f "$SECRET_FILE" ]; then
        rm "$SECRET_FILE"
        echo "🗑️ Local secret file '$SECRET_FILE' deleted."
    else
        echo "⚠️ No local secret file found."
    fi
}

# Menu for user selection
echo "🔹 Google Cloud Secret Manager Automation 🔹"
echo "1) Add secret to Google Secret Manager"
echo "2) Retrieve secret and save to file"
echo "3) Delete secret from Google Secret Manager"
echo "4) Remove local secret file"
echo "5) Exit"

read -p "Select an option (1-5): " choice

case $choice in
    1) add_secret ;;
    2) get_secret ;;
    3) delete_secret ;;
    4) remove_local_secret ;;
    5) echo "👋 Exiting..."; exit 0 ;;
    *) echo "❌ Invalid option. Please run the script again." ;;
esac