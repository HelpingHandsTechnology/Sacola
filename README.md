> You probably will need a .env file with the following variables:

```.env
DATABASE_URL=
TONINHO_EMAIL=
TONINHO_PASS=
TONINHO_ID=
TONINHO_USERNAME=
ALTERNATIVE_TONINHO_ID=
JWT_SECRET=
```

### Mobile

The mobile package is a React Native app that uses Expo with the bare workflow. you can find more details about it on the [README](apps/mobile/README.md) file.

#### How to run ?

```bash
# Install dependencies
yarn

# Install pods in case of ios
cd apps/mobile/ios
pod install

# Install app on device
yarn ios
yarn android

# Run metro
yarn dev:expo
```
