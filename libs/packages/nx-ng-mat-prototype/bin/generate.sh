#!/usr/bin/env bash

NX_VERSION="^16.0.1"
NGRX_VERSION="^15.4.0"
MATERIAL_VERSION="^15.2.8"

CWD=$(pwd);

echo "$CWD"

read -p "What is the Nx Workspace name? "  WORKSPACE_NAME

WORKSPACE_PATH="${CWD}/${WORKSPACE_NAME}"

SECRETS_WORKSPACE="${WORKSPACE_NAME}_secrets"
SECRETS_WORKSPACE_PATH="${CWD}/${WORKSPACE_NAME}_secrets"

read -p "What is the initial domain name? " DOMAIN_NAME
read -p "What is the initial application name? " APP_NAME
read -p "What is the ngrx Entity interface name? " ENTITY
read -p "Add a mobile app ( Capacitor.js )? (y/N) " ADD_MOBILE
read -p "Add a desktop app ( Electron.js )? (y/N) " ADD_DESKTOP
read -p "Configure Firebase? (y/N) " INIT_FIREBASE
#read -n1 -p "Add a mobile app ( Capacitor.js )? (y/N) " ADD_MOBILE
#read -n1 -p "Add a desktop app ( Electron.js )? (y/N) " ADD_DESKTOP
#read -n1 -p "Configure Firebase? (y/N) " INIT_FIREBASE



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
        -d=*|--domainName=*)
        DOMAIN_NAME="${arg#*=}"
        shift # Remove argument name from processing
        ;;
        -d=*|--entity=*)
        ENTITY="${arg#*=}"
        shift # Remove argument name from processing
        ;;
        *)
    esac
done

PROJECT_NAME="$DOMAIN_NAME-$APP_NAME"

echo "# workspace name: $WORKSPACE_NAME"
#echo "# App Name: $APP_NAME"
# echo "For angular workspace configuration, choose \"Integrated\"";

# echo "Installing npm globally"
# npm install -g npm

# npx create-nx-workspace@latest --preset=angular-monorepo --name=demo --appName="ngrx/todo" --style=scss --nxCloud=false --routing=true --standaloneApi=true
echo "npx create-nx-workspace@latest --preset=angular-monorepo --name=\"$WORKSPACE_NAME\" --appName=\"$APP_NAME\" --style=scss --nxCloud=false --routing=true --standaloneApi=true"
npx create-nx-workspace@latest --preset=angular-monorepo --name="$WORKSPACE_NAME" --appName="$APP_NAME" --style=scss --nxCloud=false --routing=true --standaloneApi=true --packageManager=npm



echo "cd $WORKSPACE_NAME"
cd "$WORKSPACE_NAME" || exit


node <<EOF
  const fs = require('fs');
  var data = require('./package.json');
  data.resolutions = {"firebaseui/firebase": "^9.23.0"};
  data.overrides = {"firebaseui": {"firebase": "^9.23.0"}};
  fs.writeFileSync('package.json', JSON.stringify(data, null, 2));
  console.log(data);
EOF


# ADD NODE VERSION
node -v > .nvmrc;
git add .
git commit -m "add node version"

# Remove apps generated by nx
# App will be created by @angular-architects/domain
npx nx generate @nrwl/workspace:remove --projectName="$APP_NAME-e2e" --forceRemove
npx nx generate @nrwl/workspace:remove --projectName="$APP_NAME"

# Install Dependencies
npm install firebase-tools --dev
npm install firebase-tools -g

# need to be installed in node_module dependencies, not at root
npm install firebase
#npm install firebaseui

git add .
git commit -m "add firebase"

# npm install @ngrx/store @ngrx/component-store @ngrx/entity @ngrx/store-devtools @ngrx/component @ngrx/effects @ngrx/schematics
npm install @ngrx/store @ngrx/component-store @ngrx/entity @ngrx/store-devtools @ngrx/component @ngrx/effects @ngrx/schematics
#npm install @ngrx/store@"$NGRX_VERSION" @ngrx/component-store@"$NGRX_VERSION" @ngrx/entity@"$NGRX_VERSION" @ngrx/store-devtools@"$NGRX_VERSION" @ngrx/component@"$NGRX_VERSION" @ngrx/effects@"$NGRX_VERSION" @ngrx/schematics@"$NGRX_VERSION"

git add .
git commit -m "add ngrx"

npm install @ngpat/fn@latest

npm install @ngpat/date@latest

npm install @ngpat/data@latest
npm install @ngpat/firebase@latest
npm install @ngpat/rxjs@latest

npm install @ngpat/utils@latest
npm install @ngpat/calculations@latest
npm install @ngpat/store@latest

npm install @ngpat/schematics@latest
npm install @ngpat/material@latest

git add .
git commit -m "add ngpat"

npm install @nx/plugin@latest
npm install convert-source-map@^1.9.0 --dev
npm install @nx/angular
#npm install @nx/angular@"$NX_VERSION"
#npm install nx --dev

git add .
git commit -m "add nx plugins"

npx nx g @nx/angular:application --name="$APP_NAME" --directory="$DOMAIN_NAME" --routing=true --standalone=true --standaloneConfig=true --strict=true --style=scss --tags="domain:$DOMAIN_NAME, type:app"



# DDD ARCHITECT
# DDD ARCHITECT
# DDD ARCHITECT

npx nx g @ngpat/schematics:ddd-init
#npx nx g @ngpat/schematics:ddd-full-domain --domain="$DOMAIN_NAME" --appName="$APP_NAME"
npx nx generate @ngpat/schematics:ddd-api --name="$APP_NAME" --domain="$DOMAIN_NAME" --standalone=true --importPath="@$WORKSPACE_NAME/$DOMAIN_NAME/api"
npx nx generate @ngpat/schematics:ddd-domain --name="$DOMAIN_NAME"  --standalone=true --addApp=false --importPath="@$WORKSPACE_NAME/$DOMAIN_NAME/domain"
npx nx generate @ngpat/schematics:ddd-feature --name="$APP_NAME" --domain="$DOMAIN_NAME" --entity="$ENTITY" --ngrx=true --noApp=true --prefix=true --standalone=true --importPath="@$WORKSPACE_NAME/$DOMAIN_NAME/feature-$APP_NAME"
npx nx generate @ngpat/schematics:ddd-ui --name="$APP_NAME" --domain="$DOMAIN_NAME" --standalone=true --importPath="@$WORKSPACE_NAME/$DOMAIN_NAME/ui-$APP_NAME"
npx nx generate @ngpat/schematics:ddd-util --name="$APP_NAME" --domain="$DOMAIN_NAME" --standalone=true --importPath="@$WORKSPACE_NAME/$DOMAIN_NAME/util-$APP_NAME"
npx nx generate @ngpat/schematics:environment --appName="$APP_NAME" --domain="$DOMAIN_NAME" --workspaceName="@$WORKSPACE_NAME"

# SHARED DOMAIN
npx nx generate @ngpat/schematics:ddd-domain --name=shared --addApp=false --shared
npx nx generate @ngpat/schematics:ddd-ui --name=design-library --shared --standalone
npx nx generate @ngpat/schematics:ddd-ui --name=common --shared --standalone



mkdir libs/shared/ui-design-library/src/lib
cat > libs/shared/ui-design-library/src/lib/.gitKeep <<EOF
EOF
mkdir libs/shared/ui-common/src/lib
cat > libs/shared/ui-common/src/lib/.gitKeep <<EOF
EOF

mkdir libs/shared/ui-design-library/src/assets
cat > libs/shared/ui-design-library/src/assets/.gitKeep <<EOF
EOF
mkdir libs/shared/ui-common/src/assets
cat > libs/shared/ui-common/src/assets/.gitKeep <<EOF
EOF

git add .
git commit -m "add ddd architecture"

# STORYBOOK
npm install -D @nx/storybook
npm install -D @storybook/angular
npm install -D @compodoc/compodoc

git add .
git commit -m "add storybook"

npx nx g @nx/angular:application --name=storybook-app --directory=storybook --routing=false --standalone=true --standaloneConfig=true --strict=true --style=scss --tags="domain:shared, type:app"
npx nx g @nx/storybook:configuration storybook-storybook-app --tsConfiguration=true --configureCypress=false --storybook7UiFramework=@storybook/angular --configureTestRunner=true
npx nx g @ngpat/schematics:update-storybook-global --projectName=storybook-storybook-app


git add .
git commit -m "add storybook app"

npx npm-add-script \
  -k "storybook" \
  -v "npx nx storybook storybook-storybook-app" \
  --force

# Add design library component
npx nx generate @ngpat/schematics:design-library-component --name=nx-sb-butn --projectName=shared-ui-design-library --path=libs/shared/ui-design-library/src/lib/components --prefix=design-library

# Add Tailwind preset
npx nx generate @nx/angular:setup-tailwind "$PROJECT_NAME"

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
// Is imported in the apps ( app/[domain]/[app]/tailwind.config.js )
// so that the apps can extend the shared tailwind config
// the ../../node_modules is required to resolve the path correctly
const {
  colors
} = require('../../node_modules/@ngpat/material/tailwind/src/tailwind.config.cjs');

/**
 * See https://github.com/tailwindlabs/tailwindcss/issues/1232#issuecomment-1111937404
 * to convert rem to px
 */
module.exports = {
  theme: {
    extend: {
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      colors: {
        ...colors
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

git add .
git commit -m "add tailwind preset"

# Add Material
#npm install @angular/cdk@"$MATERIAL_VERSION"
#npm install @angular/material@"$MATERIAL_VERSION"
npm install @angular/cdk
npm install @angular/material
npx nx g @angular/material:ng-add --project="$PROJECT_NAME" --theme=custom --typography=true --animations=enabled

git add .
git commit -m "add angular material with custom theme configuration"

# Install version of RxJS to support NgRX
# npm install rxjs@~7.5.0

# NOTE ngrx schematics do not support standalone components
#npx nx g @ngrx/store:ng-add --project="$PROJECT_NAME" --module=app.module.ts --force
#npx nx g @ngrx/store-devtools:ng-add --project="$PROJECT_NAME" --module=app.module.ts --force
#npx nx g @ngrx/component:ng-add --project="$PROJECT_NAME" --module=app.module.ts --force
#npx nx g @ngrx/effects:ng-add --project="$PROJECT_NAME" --module=app.module.ts --force




# FIREBASE
# FIREBASE
# FIREBASE

# BEGIN Create Private Repo for secrets
cd $CWD
mkdir "$SECRETS_WORKSPACE"
cd $SECRETS_WORKSPACE

#npm init -y

cat > index.ts << EOF
  export * from './lib/firebase';
EOF

mkdir lib
cd lib

cat > firebase.ts <<EOF
 export const firebaseConfig = {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      storageBucket: "...",
      messagingSenderId: "...",
      appId: "...",
      measurementId: "..."
      };
EOF


# BEGIN Create Private Repo for secrets

# Navigate to angular project repo
cd $WORKSPACE_PATH

## Create secretes library
npx nx generate @nx/angular:library --name=secrets --directory=shared --compilationMode=partial --importPath=@secrets --tags="domain:shared, type:util"
rm -rf /libs/shared/secrets/src/lib
echo '/libs/shared/secrets/src/lib/' >> .gitignore
echo '/libs/shared/secrets/src/index.ts' >> .gitignore

mkdir scripts;

cat > scripts/secrets.sh << EOF
#!/usr/bin/env bash

rm -rf libs/shared/secrets/src/lib
rm libs/shared/secrets/src/index.ts
rsync -av --exclude '.git' --exclude '.gitignore' --exclude '.idea' --exclude 'scripts' --exclude 'package.json' ../\$1/* libs/shared/secrets/src
EOF

# In root directory, add npm script to get secrets to package.json
npx npm-add-script \
  -k "secrets" \
  -v "bash scripts/secrets.sh $SECRETS_WORKSPACE" \
  --force

git add .
git commit -m "add secrets library"

npm run secrets

## Add mobile
if echo $ADD_MOBILE | grep '^[Yy]\?$'; then
  npx nx generate @ngpat/schematics:capacitor --appName="$APP_NAME" --domain="$DOMAIN_NAME"
fi

## Add Desktop
if echo $ADD_DESKTOP | grep '^[Yy]\?$'; then
  npx nx generate @ngpat/schematics:electron --appName="$APP_NAME-desktop" --domain="$DOMAIN_NAME"
  cd "apps/$DOMAIN_NAME/$APP_NAME-desktop"
  npm install
  cd CWD
fi


# BEGIN SETUP FIREBASE
if echo $INIT_FIREBASE | grep '^[Yy]\?$'; then

  # Firebase

  mkdir apps/firebase
  chmod 0777 apps/firebase
  cd apps/firebase

  firebase logout;
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

DEPLOYMENT_SCRIPT="deploy.$DOMAIN_NAME-$APP_NAME.prd.sh";

cat > scripts/$DEPLOYMENT_SCRIPT << EOF
#!/usr/bin/env bash

npx nx build $DOMAIN_NAME-$APP_NAME --configuration=production;

cd apps/firebase;
firebase use $WORKSPACE_NAME;

firebase deploy --only hosting;
EOF

# In root directory, add npm script to deploy firebase to package.json
npx npm-add-script \
-k "d.$DOMAIN_NAME-$APP_NAME.prd" \
-v "bash scripts/deploy.$DOMAIN_NAME-$APP_NAME.prd.sh" \
--force

npx npm-add-script \
-k "s.dev.$DOMAIN_NAME-$APP_NAME" \
-v "npx nx run $DOMAIN_NAME-$APP_NAME:serve:development" \
--force

fi
# END SETUP FIREBASE

npx npm-add-script \
-k "ci" \
-v "npm run clean.cache && rm -rf node_modules && npm install --pure-lockfile" \
--force

npx npm-add-script \
-k "clean.cache" \
-v "rm -rf .angular && rm -rf tmp && rm -rf node_modules/.cache && npm cache clean" \
--force

npx npm-add-script \
-k "clean.installers" \
-v "npx clear-npx-cache && npm cache clean --force && npm cache clean" \
--force

npx npm-add-script \
-k "update.install" \
-v "rm -rf node_modules && npm install" \
--force

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
