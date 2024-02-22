// https://github.com/expo/expo/issues/23104#issuecomment-1689566248
import "@expo/metro-runtime"
import { registerRootComponent } from "expo"

import App from "./App"

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
