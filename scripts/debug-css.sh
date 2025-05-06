#!/bin/bash

# Enable CSS debugging for local development
export NEXT_PUBLIC_CSS_DEBUG=true

# Run the development server with extra logging
echo "Starting Next.js with CSS debugging enabled..."
echo "Access the site and look for the CSS Debugger panel at the bottom right"

# Start the development server
npm run dev 