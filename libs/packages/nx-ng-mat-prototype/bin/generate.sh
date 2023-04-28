#!/usr/bin/env bash

NX_VERSION="^15.2.3"
NGRX_VERSION="^15.0.0"
MATERIAL_VERSION="^15.0.0"

CWD=$(pwd);

echo "$CWD"

read -p "What is the Nx Workspace name? "  WORKSPACE_NAME

WORKSPACE_PATH="${CWD}/${WORKSPACE_NAME}"

PRIVATE_WORKSPACE="${WORKSPACE_NAME}_private"
PRIVATE_WORKSPACE_PATH="${CWD}/${WORKSPACE_NAME}_private"

read -p "What is the application name? " APP_NAME

# https://pretzelhands.com/posts/command-line-flags/
# Default values of arguments
# WORKSPACE_NAME="demo"
# APP_NAME="todo"

# Loop through arguments and process them
for arg in "$@"
do
    case $arg in
        -n=*|--name=*)
        WORKSPACE_NAME="${arg#*=}"
        shift # Remove argument name from processing
        ;;
        -a=*|--appName=*)
        APP_NAME="${arg#*=}"
        shift # Remove argument name from processing
        ;;
        *)
    esac
done

echo "# workspace name: $WORKSPACE_NAME"
echo "# App Name: $APP_NAME"
# echo "For angular workspace configuration, choose \"Integrated\"";

echo "Installing yarn globally"
yarn add -g yarn

npx create-nx-workspace@"$NX_VERSION" --preset=angular --name="$WORKSPACE_NAME" --appName="$APP_NAME" --style=scss --nxCloud=false --packageManager=yarn
# npx create-nx-workspace@latest --preset=angular --name="ng-patterns" --appName="patterns" --style=scss --nxCloud=false --packageManager=yarn
# npx create-nx-workspace@latest


echo "cd $WORKSPACE_NAME"
cd "$WORKSPACE_NAME";

# Install Dependencies
yarn add lodash --latest;
yarn add @ngrx/store@"$NGRX_VERSION" @ngrx/store-devtools@"$NGRX_VERSION" @ngrx/component@"$NGRX_VERSION" @ngrx/effects@"$NGRX_VERSION" @ngrx/schematics@"$NGRX_VERSION"
yarn add @ngpat/schematics@latest
yarn add @nx/plugin@latest
yarn add @angular-architects/ddd
yarn add firebase-tools --dev
yarn add firebase

# NODE VERSION
node -v > .nvmrc;

# Add Tailwind preset
npx nx generate @nx/angular:setup-tailwind "$APP_NAME"

mkdir libs/tailwind-preset

cat > libs/tailwind-preset/project.json <<EOF
{
  "projectType": "library",
  "root": "libs/tailwind-preset",
  "sourceRoot": "libs/tailwind-preset",
  "targets": {},
  "tags": []
}
EOF


cat > libs/tailwind-preset/tailwind.config.js <<EOF
module.exports = {
  theme: {
    extend: {
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    }
  },
  plugins: []
};


EOF

cat > apps/"$APP_NAME"/tailwind.config.js <<EOF
const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');
const {merge} = require('lodash');
const sharedTailwindConfig = require('../../libs/tailwind-preset/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = merge(sharedTailwindConfig, {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {}
  },
  plugins: []
});

EOF


# Add Material
yarn add @angular/material@"$MATERIAL_VERSION"
yarn add @angular/cdk@"$MATERIAL_VERSION"
npx nx g @angular/material:ng-add --project="$APP_NAME" --theme=custom --typography=true --animations=enabled
# npx nx g @angular/material:ng-add --project=todo --theme=custom --typography=true --animations=enabled

git add .
git commit -m "add angular material with custom theme configuration"

# Install version of RxJS to support NgRX
# yarn add rxjs@~7.5.0



npx nx g @ngrx/store:ng-add --project="$APP_NAME" --module=app.module.ts --force
npx nx g @ngrx/store-devtools:ng-add --project="$APP_NAME" --module=app.module.ts --force
npx nx g @ngrx/component:ng-add --project="$APP_NAME" --module=app.module.ts --force
npx nx g @ngrx/effects:ng-add --project="$APP_NAME" --module=app.module.ts --force



# DDD ARCHITECT
# DDD ARCHITECT
# DDD ARCHITECT

npx nx g @angular-architects/ddd:init

npx nx generate @angular-architects/ddd:domain --name="$APP_NAME" --addApp=false
npx nx generate @angular-architects/ddd:api --name="$APP_NAME" --domain="$APP_NAME"
npx nx generate @angular-architects/ddd:ui --name="$APP_NAME" --domain="$APP_NAME"
npx nx generate @angular-architects/ddd:util --name="$APP_NAME" --domain="$APP_NAME"
npx nx generate @angular-architects/ddd:domain --name=shared --addApp=false
npx nx generate @angular-architects/ddd:ui --name=design-library --shared --standalone

# FIREBASE
# FIREBASE
# FIREBASE

# BEGIN Create Private Repo for secrets
cd $CWD
mkdir "$PRIVATE_WORKSPACE"
cd $PRIVATE_WORKSPACE

#npm init -y

cat > index.ts << EOF
  export * from './firebase';
EOF

cat > firebase.ts <<EOF
 export const firebaseConfig = {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      storageBucket: "...",
      messagingSenderId: "...",
      appId: "..."
      };
EOF


# BEGIN Create Private Repo for secrets

# Navigate to angular project repo
cd $WORKSPACE_PATH

## Create secretes library
npx nx generate @nx/angular:library --name=secrets --directory=shared --compilationMode=partial --importPath=@secrets
rm -rf /libs/shared/secrets/src/lib
echo '/libs/shared/secrets/src/lib/' >> .gitignore

mkdir scripts;

cat > scripts/secrets.sh << EOF
#!/usr/bin/env bash

rm -rf libs/shared/secrets/src/lib
rsync -av --exclude '.git' --exclude '.gitignore' --exclude '.idea' --exclude 'scripts' --exclude 'package.json' ../\$1/* libs/shared/secrets/src/lib
EOF

# In root directory, add npm script to get secrets to package.json
npx npm-add-script \
  -k "secrets" \
  -v "bash scripts/secrets.sh $PRIVATE_WORKSPACE" \
  --force

read -n1 -p "Configure Firebase? (Y/n) " INIT_FIREBASE


# BEGIN SETUP FIREBASE
if echo $INIT_FIREBASE | grep '^[Yy]\?$'; then

  # Firebase

  mkdir apps/firebase
  chmod 0777 apps/firebase
  cd apps/firebase

  firebase ngPatLogout;
  firebase login;
  firebase init;

  # npm init -y does not exit correctly
cat > package.json << EOF
  {
    "name": "firebase",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
EOF

  echo "public" >> .gitignore

  # back to root directory
  cd ../../

DEPLOYMENT_SCRIPT="deploy.$WORKSPACE_NAME.prd.sh";

cat > scripts/$DEPLOYMENT_SCRIPT << EOF
#!/usr/bin/env bash

npx nx build $WORKSPACE_NAME --configuration=production;

cd apps/firebase;
firebase use $WORKSPACE_NAME;

firebase deploy --only hosting;
EOF

# In root directory, add npm script to deploy firebase to package.json
npx npm-add-script \
-k "d.$APP_NAME.prd" \
-v "bash scripts/deploy.$WORKSPACE_NAME.prd.sh" \
--force

fi
# END SETUP FIREBASE

# Format all files based on prettierrc
# PRETTIER Configure
cat > .prettierrc <<EOF
{
  "bracketSpacing": false,
  "printWidth": 80,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "bracketSameLine": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": ["**/*.css", "**/*.scss", "**/*.html"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
EOF



npx nx format:write

git add .
git commit -m "Create $WORKSPACE_NAME with $APP_NAME app"
