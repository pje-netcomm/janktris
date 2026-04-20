#!/bin/sh
# build.sh: Injects git version into version.js
VERSION=$(git describe --tags --always --dirty)
sed "s/__VERSION__/$VERSION/" version.js > version.tmp.js && mv version.tmp.js version.js
