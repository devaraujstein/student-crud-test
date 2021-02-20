import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Menu from './pages/Menu';
import Main from './pages/Main';

export default createAppContainer(
    createSwitchNavigator({
        Menu,
        Main,
    })
);
 