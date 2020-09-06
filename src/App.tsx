import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './redux';
import PokemonPage from './Components/PokemonPage';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <PokemonPage />
        </Provider>
    );
}

export default App;
