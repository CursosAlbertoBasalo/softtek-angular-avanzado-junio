# Command Line Interface

```bash
################################################################################
# 0️⃣ - Initialize the project
################################################################################

# Install the CLI
npm i -g @angular/cli
# and create a new project with minimal boilerplate
ng new softtek-angular-avanzado-abril --inline-style --prefix stk --routing true --skip-tests --style css
# ... or execute from the internet
npx ng new softtek-angular-avanzado-abril --inline-style --prefix stk --routing true --skip-tests --style css

# Add prettier and eslint to the project
ng add @angular-eslint/schematics
npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
npm run lint

## Add auxiliary dependencies (CSS framework and API server)
#===============================================================

npm i @picocss/pico
# :root { --spacing: 0.6rem; } on styles.css
npm install -D json-server json-server-auth
# database folder with routes an db json files

# Start the application and the API server
npm start
npm run api

## Clear initial component and styles
#====================================

# Create a Core module for header and footer components
ng g m core --module app.module.ts
ng g c core/components/header --export true
ng g c core/components/footer --export true

# Create Api folder with models and services
ng g s api/services/agencies
ng g interface api/models/agency --type interface
ng g enum api/models/agencyRange --type enum
ng g enum api/models/agencyStatus --type enum
ng g s api/services/trips
ng g interface api/models/trip --type interface
ng g enum api/models/tripKind --type enum
ng g enum api/models/tripStatus --type enum

# Create Shared module for components, directives and pipes
ng g m shared
ng g c shared/components/preview --export true
ng g c shared/components/loading --export true
ng g c shared/components/error --export true
ng g c shared/components/empty --export true
ng g c shared/components/refresh --export true

# Create Home module for home page
ng g m home --module app.module.ts --route 'home'
ng g s home/home
```
