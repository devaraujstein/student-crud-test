import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Menu from './pages/Menu';
import Main from './pages/Main';
import Edit from './pages/Edit';

export default createAppContainer(
    createSwitchNavigator({
        Menu,
        Main,
        Edit
    }, {
        initialRouteName: 'Menu'
    })
);
