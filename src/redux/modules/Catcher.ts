type CatcherState = {
    caughtPokemons: number[];
};

const initialState: CatcherState = { caughtPokemons: [] };

export const catchPokemon = (id: number) => ({
    type: 'CATCH',
    payload: id,
});

export const releasePokemon = (id: number) => ({
    type: 'RELEASE',
    payload: id,
});

type CatcherActions = ReturnType<typeof catchPokemon | typeof releasePokemon>;

export function CatcherReducer(state = initialState, action: CatcherActions): CatcherState {
    switch (action.type) {
        case 'CATCH': {
            const caughtPokemons = [...state.caughtPokemons];
            caughtPokemons.push(action.payload);
            return { caughtPokemons };
        }
        case 'RELEASE': {
            const caughtPokemons = [...state.caughtPokemons].filter((pokemonId) => pokemonId !== action.payload);
            return { caughtPokemons };
        }
        default:
            return state;
    }
}
