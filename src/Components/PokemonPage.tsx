import React, { useState } from 'react';
import TypeSelect from './TypeSelect';
import PokemonTable from './PokemonTable';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@material-ui/core';
import { catchPokemon, releasePokemon } from '../redux/modules/Catcher';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { TablePaper, TitleLabel } from './styles';

const mapStateToProps = (state: RootState) => ({
    caughtPokemons: state.caughtPokemons,
});
const mapDispatchToProps = { catchPokemon };

function PokemonPage() {
    const [selectedPokemon, selectPokemon] = useState('');
    const [pokemon, setPokemon] = useState();
    const dispatch = useDispatch();

    const caughtPokemons = useSelector((state: RootState) => state.caughtPokemons.caughtPokemons);

    function onRowClick(pokemon: { name: string; url: string }) {
        if (pokemon.url) {
            selectPokemon(pokemon.url);
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
                    });
                });
        }
    }

    function onCloseDialog() {
        selectPokemon('');
        setPokemon(null);
    }

    const buttonText = pokemon && caughtPokemons.includes(pokemon.id) ? 'Release' : 'Catch';

    return (
        <React.Fragment>
            <TypeSelect />
            <PokemonTable onRowClick={onRowClick} />
            <Dialog
                open={!!pokemon && !!selectedPokemon}
                onClose={onCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Pokemon actions'}</DialogTitle>
                <DialogContent>
                    <TitleLabel>{`Id: ${pokemon && pokemon.id}`}</TitleLabel>
                    <TitleLabel>{`Name: ${pokemon && pokemon.name}`}</TitleLabel>
                    <TitleLabel>{`Height: ${pokemon && pokemon.height}`}</TitleLabel>
                    <TitleLabel>{`Weight: ${pokemon && pokemon.weight}`}</TitleLabel>
                    <TitleLabel>{`Abilities: ${
                        pokemon &&
                        pokemon.abilities
                            .map((a: { ability: { name: string } }) => a.ability.name)
                            .reduce((prev: string, cur: string) => {
                                if (!prev) return cur;
                                return `${prev}, ${cur}`;
                            })
                    }`}</TitleLabel>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            dispatch(buttonText === 'Catch' ? catchPokemon(pokemon.id) : releasePokemon(pokemon.id));
                        }}
                        color={buttonText === 'Catch' ? 'secondary' : 'primary'}
                    >
                        {buttonText}
                    </Button>
                    <Button onClick={onCloseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPage);
