# How to run ?

> You probably will need a .env file with the following variables:

```.env
DATABASE_URL=
TONINHO_EMAIL=
TONINHO_PASS=
JWT_SECRET=
```

### Mobile

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
