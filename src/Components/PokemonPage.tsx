import React, { useState } from 'react';
import PokemonTypeSelector from './PokemonTypeSelector';
import PokemonTable from './PokemonTable';
import { catchPokemon } from '../redux/modules/Catcher';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../redux';
import PokemonDialog from './PokemonDialog';

const mapStateToProps = (state: RootState) => ({
    caughtPokemons: state.caughtPokemons,
});
const mapDispatchToProps = { catchPokemon };

function PokemonPage() {
    const [pokemon, setPokemon] = useState();

    const caughtPokemons = useSelector((state: RootState) => state.caughtPokemons.caughtPokemons);

    function onRowClick(pokemon: { name: string; url: string }) {
        if (pokemon.url) {
            fetch(pokemon.url)
                .then((data) => {
                    return data.json();
                })
                .then((attributes) => {
                    setPokemon({
                        abilities: attributes.abilities.filter((x: { is_hidden: boolean }) => !x.is_hidden),
                        name: attributes.name,
                        weight: attributes.weight,
                        height: attributes.height,
                        id: attributes.id,
                        image: attributes.sprites.other.dream_world.front_default,
                    });
                });
        }
    }

    function onCloseDialog() {
        setPokemon(null);
    }

    const buttonText = pokemon && caughtPokemons.includes(pokemon.id) ? 'Release' : 'Catch';

    return (
        <React.Fragment>
            <PokemonTypeSelector />
            <PokemonTable onRowClick={onRowClick} />
            {pokemon && <PokemonDialog onCloseDialog={onCloseDialog} pokemon={pokemon} buttonText={buttonText} />}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPage);
