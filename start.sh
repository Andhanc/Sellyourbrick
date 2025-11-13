#!/bin/bash

# Загружаем nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Используем Node.js 22
nvm use 22

# Запускаем dev-сервер
npm run dev

