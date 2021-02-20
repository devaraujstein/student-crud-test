import React from 'react';

import Routes from './routes';

import NavigationService from './services/navigation';

const App = () => {
    const registerService = (ref) => {
        NavigationService.setTopLevelNavigator(ref);
    }

    return (
        <Routes ref={registerService} />
    );
};

export default App;