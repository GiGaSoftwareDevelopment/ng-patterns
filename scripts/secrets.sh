#!/usr/bin/env bash

rm -rf libs/patterns/secrets/src/lib
rsync -av --exclude '.git' --exclude '.gitignore' --exclude '.idea' --exclude 'scripts' --exclude 'package.json' ../$1/*  libs/patterns/secrets/src/lib
