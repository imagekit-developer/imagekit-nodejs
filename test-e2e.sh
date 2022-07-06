npm pack
cd tests/e2e/node-js
yarn install
echo "Installing local bundle from TAR in NodeJS project"
yarn add ../../../imagekit*.tgz
node index.js;test_result=$?
if ((test_result != 0)); then
  printf '%s\n' "Final bundle not working in NodeJS project" >&2
  exit 1                                
fi
echo "Final bundle working in NodeJS project"

cd ../typescript
yarn install
echo "Installing local bundle from TAR in Typescript project"
yarn add ../../../imagekit*.tgz
npx tsc && node index.js;test_result=$?
if ((test_result != 0)); then
  printf '%s\n' "Final bundle not working in Typescript project" >&2
  exit 1                                
fi
echo "Final bundle working in Typescript project"

rm -rf ../../../imagekit*.tgz