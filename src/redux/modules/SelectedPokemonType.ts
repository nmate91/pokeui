type SelectedPokemonTypeState = {
    type: number;
};

const initialState: SelectedPokemonTypeState = { type: -1 };

export const setType = (type: number) => ({
    type: 'SET_TYPE',
    payload: type,
});

type SelectedPokemonTypeActions = ReturnType<typeof setType>;

export function SelectedPokemonTypeReducer(
    state = initialState,
    action: SelectedPokemonTypeActions
): SelectedPokemonTypeState {
    switch (action.type) {
        case 'SET_TYPE':
            return { type: action.payload };
        default:
            return state;
    }
}
