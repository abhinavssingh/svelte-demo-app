@echo off
REM Builder.io Setup Guide - Quick Start
REM Run this script to set up your Builder.io integration

echo 🚀 Builder.io + SvelteKit Setup Guide
echo =====================================
echo.

REM Check for environment file
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # Builder.io API Key and Space ID
        echo # Get these from: https://builder.io/account/home
        echo VITE_BUILDER_API_KEY=your_api_key_here
        echo VITE_BUILDER_SPACE_ID=your_space_id_here
    ) > .env.local
    echo ✅ Created .env.local - UPDATE WITH YOUR API KEYS
) else (
    echo ✅ .env.local already exists
)

echo.
echo 📦 Installation Steps
echo =====================
echo.
echo 1️⃣  Install dependencies (if not already done^):
echo    npm install
echo.
echo 2️⃣  Set up Builder Devtools:
echo    npm init builder.io@latest
echo.
echo 3️⃣  Start development server:
echo    npm run dev
echo.
echo 4️⃣  Visit http://localhost:300
echo    Click the Builder logo (bottom right^) to access Devtools
echo.

echo 📚 Documentation
echo ================
echo - AGENTS.md             - Comprehensive project documentation
echo - .builder\rules\       - AI instruction files
echo - src\lib\types\        - TypeScript type definitions
echo - src\lib\i18n\store.ts - Translation configuration
echo.

echo 🎯 Next Steps
echo =============
echo 1. Update .env.local with your Builder.io API key and Space ID
echo 2. Run: npm init builder.io@latest
echo 3. Run: npm run dev
echo 4. Create and register components in Builder UI
echo 5. Start building! 🎉
echo.

echo 📖 Key Files
echo ===========
echo Component Registration: src\lib\builders\registry.ts
echo i18n Translations:      src\lib\i18n\store.ts
echo API Client:             src\lib\api\client.ts
echo Type Definitions:       src\lib\types\index.ts
echo.

echo ✨ You're all set! Happy building with Builder.io 🎉
pause
