#!/usr/bin/env bash
# Clean npm cache
npm cache clean --force
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
# Build frontend
npm run build