import { NavigationActions } from 'react-navigation';

let nav;

const setTopLevelNavigator = (navigatorRef) => {
    nav = navigatorRef;
}

const navigate = (routeName, params) => {
    nav.dispatch(NavigationActions.navigate({ routeName, params }))
}

export default {
    setTopLevelNavigator,
    navigate
}