export type Pokemon = {
    pokemon: {
        name: string;
        url: string;
        id: number;
    };
    slot: number;
};

type PokemonListState = {
    pokemons: Pokemon[];
};

const initialState: PokemonListState = { pokemons: [] };

export const setPokemons = (pokemons: Pokemon[]) => ({
    type: 'SET_POKEMONS',
    payload: pokemons.map((p) => {
        const matches = p.pokemon.url.match(/(\d+)(?!.*\d)/);
        const int = Number.parseInt(matches ? matches[0] : '-1');
        return { ...p, pokemon: { ...p.pokemon, id: int } };
    }),
});

type PokemonListActions = ReturnType<typeof setPokemons>;

export function PokemonListReducer(state = initialState, action: PokemonListActions): PokemonListState {
    switch (action.type) {
        case 'SET_POKEMONS':
            return { pokemons: action.payload };
        default:
            return state;
    }
}
