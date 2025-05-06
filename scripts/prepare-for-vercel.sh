#!/bin/bash

# Prepare For Vercel Deployment Script
# This script helps prepare the Next.js application for Vercel deployment
# by testing it in a local production environment first.

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BOLD}${BLUE}====================================${NC}"
echo -e "${BOLD}${BLUE}  VERCEL DEPLOYMENT PREPARATION     ${NC}"
echo -e "${BOLD}${BLUE}====================================${NC}"
echo ""

# Step 1: Clean build
echo -e "${BOLD}Step 1: Cleaning previous builds...${NC}"
npm run clean
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to clean previous builds${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Clean completed${NC}"
echo ""

# Step 2: Build for local production testing
echo -e "${BOLD}Step 2: Building for local production testing...${NC}"
npm run local-prod-build
if [ $? -ne 0 ]; then
  echo -e "${RED}Production build failed${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Production build completed${NC}"
echo ""

# Step 3: Start local production server
echo -e "${BOLD}Step 3: Starting local production server...${NC}"
echo -e "${YELLOW}Starting server on port 3001...${NC}"
echo -e "${YELLOW}This will run in the background. Press Ctrl+C later to stop it.${NC}"
npm run local-prod-start &
SERVER_PID=$!

# Give the server time to start
echo -e "${YELLOW}Waiting for server to start...${NC}"
sleep 5

# Check if server is running
if ! curl -s http://localhost:3001 > /dev/null; then
  echo -e "${RED}Failed to start production server${NC}"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi
echo -e "${GREEN}✓ Production server is running on port 3001${NC}"
echo ""

# Step 4: Run CSP verification
echo -e "${BOLD}Step 4: Verifying Content Security Policies...${NC}"
npm run verify:csp
if [ $? -ne 0 ]; then
  echo -e "${RED}CSP verification failed${NC}"
  echo -e "${YELLOW}Server will continue running for manual inspection${NC}"
else
  echo -e "${GREEN}✓ CSP verification completed${NC}"
fi
echo ""

# Step 5: Display fix suggestions
echo -e "${BOLD}Step 5: Generating fix suggestions...${NC}"
npm run fix:production
echo ""

# Step 6: Provide manual testing instructions
echo -e "${BOLD}Step 6: Manual Testing Instructions${NC}"
echo -e "${BLUE}Please perform the following manual tests:${NC}"
echo -e "${BLUE}1. Visit http://localhost:3001 in your browser${NC}"
echo -e "${BLUE}2. Check all images are loading correctly${NC}"
echo -e "${BLUE}3. Verify fonts are rendering properly${NC}"
echo -e "${BLUE}4. Test the questionnaire flow${NC}"
echo -e "${BLUE}5. Check mobile responsiveness${NC}"
echo -e "${BLUE}6. Verify all interactive elements work${NC}"
echo ""

# Step 7: Final check
echo -e "${BOLD}Step 7: Ready for Vercel Deployment?${NC}"
echo -e "${YELLOW}When you are finished testing, press Enter to continue${NC}"
read -p "Press Enter to continue..."

# Kill the server process
kill $SERVER_PID 2>/dev/null
echo -e "${GREEN}✓ Server stopped${NC}"

# Step 8: Finalize for Vercel
echo -e "${BOLD}Step 8: Finalizing for Vercel deployment...${NC}"
echo -e "${YELLOW}Checking if any changes need to be committed...${NC}"

git status --porcelain
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}You have uncommitted changes. Consider committing before deploying:${NC}"
  git status --short
else
  echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi

# Step 9: Instructions for Vercel deployment
echo ""
echo -e "${BOLD}${BLUE}====================================${NC}"
echo -e "${BOLD}${BLUE}  READY FOR VERCEL DEPLOYMENT       ${NC}"
echo -e "${BOLD}${BLUE}====================================${NC}"
echo ""
echo -e "${GREEN}Your application has been prepared for Vercel deployment.${NC}"
echo ""
echo -e "${BOLD}Deployment Instructions:${NC}"
echo -e "1. Push your changes to GitHub: ${BLUE}git push origin main${NC}"
echo -e "2. Go to your Vercel dashboard and deploy from GitHub"
echo -e "3. Or run: ${BLUE}vercel --prod${NC} if you have the Vercel CLI installed"
echo ""
echo -e "${YELLOW}Make sure all environment variables are properly set in the Vercel dashboard:${NC}"
echo -e "- NEXT_PUBLIC_SUPABASE_URL"
echo -e "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo -e "- NEXT_PUBLIC_SANITY_PROJECT_ID"
echo -e "- NEXT_PUBLIC_SANITY_DATASET"
echo -e "- NEXT_PUBLIC_SENTRY_DSN"
echo ""
echo -e "${BOLD}Good luck with your deployment!${NC}" 