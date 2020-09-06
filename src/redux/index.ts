import { SelectedPokemonTypeReducer } from './modules/SelectedPokemonType';
import { combineReducers } from 'redux';
import { PokemonListReducer } from './modules/PokemonTypes';
import { CatcherReducer } from './modules/Catcher';

export const rootReducer = combineReducers({
    type: SelectedPokemonTypeReducer,
    pokemons: PokemonListReducer,
    caughtPokemons: CatcherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
