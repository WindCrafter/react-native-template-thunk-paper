import {createNavigationContainerRef, StackActions} from '@react-navigation/native';

export let TIMESTAMP_LAST_SCREEN_OPENING = 0

namespace NavigationHelper{

  export const navigationRef = createNavigationContainerRef()

// @ts-ignore
  export const navigate = (name, params?) => {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  }

  export const push = (name, params?) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params))
    }
  }

  export const pop = (n = 1) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.pop(n))
    }
  }


  export const goBack = () => {
    if (navigationRef.isReady()) {
      try {
        // @ts-ignore
        navigationRef.goBack();
      } catch (error) {

      }
    }
  }

  export const canGoBack = () => {
    return navigationRef.canGoBack()
  }

  export const getRouteName = () => {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name
    }
    return ""
  }

  export const getActiveRouteName = (state) => {
    const route = state?.routes?.[state.index];

    if (route?.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route?.name;
  }

  export const replace = (name, params = {}) => {
    if (navigationRef.isReady() && getRouteName() !== name) {
      navigationRef.dispatch(StackActions.replace(name, params))
    }
  }

  /**
   * Variable to store the timestamp of screen opening
   */
  export function updateTimestampLastScreenOpening() {
    TIMESTAMP_LAST_SCREEN_OPENING = new Date().getTime()
  }
}

export default NavigationHelper