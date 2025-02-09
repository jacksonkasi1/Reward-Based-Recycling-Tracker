#!/bin/bash

# Set 1Password Vault & Item Name (Read from Leapcell environment variables or prompt user)
VAULT_NAME=${VAULT_NAME:-"$(printenv OP_VAULT || echo 'DefaultVault')"}
ITEM_NAME=${ITEM_NAME:-"$(printenv OP_ITEM || echo 'Project Secrets')"}

# 1Password Authentication (Retrieve OP Session from Leapcell ENV Variable)
if [ -z "$OP_SESSION" ]; then
    echo "🔐 Signing in to 1Password..."
    OP_SESSION=$(op signin --raw)
    export OP_SESSION
else
    echo "✅ Using existing 1Password session."
fi

# Path to the .env file
ENV_FILE=".env"

# Function to add secrets from .env file to 1Password
add_secrets() {
    if [ ! -f "$ENV_FILE" ]; then
        echo "❌ .env file not found! Please create it first."
        exit 1
    fi

    echo "🔐 Storing secrets in 1Password ($VAULT_NAME > $ITEM_NAME) from $ENV_FILE..."

    # Construct fields for 1Password item
    OP_FIELDS=""
    while IFS='=' read -r key value || [[ -n "$key" ]]; do
        [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
        value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
        OP_FIELDS+=" --fields ${key}=${value}"
    done < "$ENV_FILE"

    # Check if the secret item already exists in 1Password
    if op item get "$ITEM_NAME" --vault "$VAULT_NAME" >/dev/null 2>&1; then
        echo "🔄 Updating existing secrets in 1Password..."
        op item edit "$ITEM_NAME" --vault "$VAULT_NAME" $OP_FIELDS
    else
        echo "🆕 Creating a new secret item in 1Password..."
        op item create --category Login "$ITEM_NAME" --vault "$VAULT_NAME" $OP_FIELDS
    fi

    echo "✅ Secrets stored successfully in 1Password!"
}

# Function to retrieve secrets from 1Password and store them in .env file
get_secrets() {
    echo "📥 Retrieving secrets from 1Password ($VAULT_NAME > $ITEM_NAME)..."
    > .env  # Clear the existing .env file

    SECRET_JSON=$(op item get "$ITEM_NAME" --vault "$VAULT_NAME" --format json)
    
    if [ -z "$SECRET_JSON" ]; then
        echo "❌ Failed to retrieve secrets from 1Password."
        exit 1
    fi

    # Parse JSON and extract fields
    echo "$SECRET_JSON" | jq -r '.fields[] | "\(.label)=\(.value)"' >> .env

    echo "✅ Secrets saved to .env file!"
}

# Function to delete secrets from 1Password
delete_secrets() {
    echo "🚨 WARNING: This will permanently delete all secrets in 1Password ($VAULT_NAME > $ITEM_NAME)!"
    read -p "Are you sure you want to proceed? (yes/no): " confirm

    if [[ "$confirm" == "yes" ]]; then
        op item delete "$ITEM_NAME" --vault "$VAULT_NAME"
        echo "✅ Secrets deleted from 1Password!"
    else
        echo "❌ Operation canceled."
    fi
}

# Menu for user selection
echo "🔹 1Password Secret Manager Automation 🔹"
echo "🔹 Vault: $VAULT_NAME | Item: $ITEM_NAME 🔹"
echo "1) Add secrets from .env to 1Password"
echo "2) Retrieve secrets from 1Password and save to .env"
echo "3) Delete secrets from 1Password"
echo "4) Exit"

read -p "Select an option (1-4): " choice

case $choice in
    1) add_secrets ;;
    2) get_secrets ;;
    3) delete_secrets ;;
    4) echo "👋 Exiting..."; exit 0 ;;
    *) echo "❌ Invalid option. Please run the script again." ;;
esac