#!/bin/bash

START_TIME=$(date +%s)

# Load .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
else
  echo ".env.local file not found!"
  exit 1
fi

# Local config
APP_NAME="app"
ZIP_NAME="$APP_NAME.zip"
LOCAL_PATH="./"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
RESET='\033[0m'

echo -e "${BLUE}📦 Zipping the Next.js app (excluding node_modules, venv, etc.)...${RESET}"
zip -qr $ZIP_NAME $LOCAL_PATH \
    -x "./node_modules/*" \
    -x "*.git*" \
    -x "*.next*" \
    -x "*$ZIP_NAME" \
    -x "*.sh" \
    -x "./src/app/lib/scripts/venv/*"

echo -e "${BLUE}🚚 Sending zip to remote server...${RESET}"
scp -i $PEM_PATH $ZIP_NAME $REMOTE_USER@$REMOTE_HOST:~/

echo -e "${BLUE}🔗 Connecting to remote server and deploying...${RESET}"
ssh -i $PEM_PATH $REMOTE_USER@$REMOTE_HOST << EOF
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    BLUE='\033[1;34m'
    YELLOW='\033[1;33m'
    RESET='\033[0m'

    TIMESTAMP=\$(date +%Y%m%d%H%M%S)
    APP_DIR=~/app
    BACKUP_DIR=~/app_backup_\$TIMESTAMP
    ZIP_NAME="$ZIP_NAME"

    if [ -d "\$APP_DIR" ]; then
        echo -e "\${YELLOW}🗂 Backing up current app to \$BACKUP_DIR\${RESET}"
        mv \$APP_DIR \$BACKUP_DIR
    fi

    echo -e "\${BLUE}📁 Creating fresh app directory...\${RESET}"
    mkdir -p \$APP_DIR

    echo -e "\${BLUE}📦 Unzipping into app directory...\${RESET}"
    unzip -oq ~/\$ZIP_NAME -d \$APP_DIR

    echo -e "\${BLUE}🧹 Cleaning up zip...\${RESET}"
    rm ~/\$ZIP_NAME

    cd \$APP_DIR

    echo -e "\${BLUE}📦 Installing npm dependencies...\${RESET}"
    npm install

    echo -e "\${BLUE}🐍 Setting up Python virtual environment...\${RESET}"
    cd src/app/lib/scripts

    if [ ! -d "venv" ]; then
        echo -e "\${BLUE}Creating virtual environment...\${RESET}"
        python3 -m venv venv
    else
        echo -e "\${BLUE}Virtual environment already exists. Skipping creation.\${RESET}"
    fi

    echo -e "\${BLUE}Activating virtual environment and installing Python dependencies...\${RESET}"
    source venv/bin/activate
    pip install -r requirements.txt
    deactivate

    cd \$APP_DIR

    echo -e "\${BLUE}🛠️ Building project...\${RESET}"
    npm run build

    echo -e "\${BLUE}🚀 Restarting the systemd service...\${RESET}"
    sudo systemctl restart nextjs-app

    echo -e "\${BLUE}🔍 Checking service status...\${RESET}"
    sleep 3
    STATUS=\$(systemctl is-active nextjs-app)

    if [ "\$STATUS" != "active" ]; then
        echo -e "\${RED}❌ Deployment failed. Rolling back...\${RESET}"
        sudo systemctl stop nextjs-app
        rm -rf \$APP_DIR
        mv \$BACKUP_DIR \$APP_DIR
        echo -e "\${YELLOW}↩️  Restarting previous version...\${RESET}"
        sudo systemctl restart nextjs-app
    else
        echo -e "\${GREEN}✅ Deployment succeeded.\${RESET}"
        echo -e "\${BLUE}🧹 Cleaning up old backup: \$BACKUP_DIR\${RESET}"
        rm -rf \$BACKUP_DIR
    fi

    sudo systemctl status nextjs-app --no-pager
EOF

echo -e "${BLUE}🧹 Cleaning up local zip...${RESET}"
rm $ZIP_NAME

echo -e "${GREEN}🎉 Done!${RESET}"

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
MIN=$((ELAPSED / 60))
SEC=$((ELAPSED % 60))
echo -e "${GREEN}🎉 Done in ${MIN}m ${SEC}s!${RESET}"