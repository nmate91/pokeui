import { Avatar, Button, Chip, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { CustomDialogContent, LeftColumnFormControl, RightColumnFormControl, TitleLabel } from './styles';
import { catchPokemon, releasePokemon } from '../redux/modules/Catcher';
import React from 'react';
import { useDispatch } from 'react-redux';

type CustomPokemon = {
    name: string;
    id: number;
    weight: number;
    height: number;
    abilities: [];
    image: string;
};

export default function PokemonDialog(props: {
    onCloseDialog: () => void;
    pokemon: CustomPokemon;
    buttonText: string;
}) {
    const dispatch = useDispatch();

    if (!props.pokemon) return null;

    return (
        <Dialog
            open={!!props.pokemon}
            onClose={props.onCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Pokemon details'}</DialogTitle>
            <CustomDialogContent>
                <LeftColumnFormControl>
                    <TitleLabel>{`Id: ${props.pokemon.id}`}</TitleLabel>
                    <TitleLabel>{`Name: ${props.pokemon.name}`}</TitleLabel>
                    <TitleLabel>{`Height: ${props.pokemon.height}`}</TitleLabel>
                    <TitleLabel>{`Weight: ${props.pokemon.weight}`}</TitleLabel>
                    <TitleLabel>{`Abilities: ${props.pokemon.abilities
                        .map((a: { ability: { name: string } }) => a.ability.name)
                        .reduce((prev: string, cur: string) => {
                            if (!prev) return cur;
                            return `${prev}, ${cur}`;
                        })}`}</TitleLabel>
                </LeftColumnFormControl>
                <RightColumnFormControl>
                    <Chip avatar={<Avatar alt={props.pokemon.name} src={props.pokemon.image} />} />
                </RightColumnFormControl>
            </CustomDialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        dispatch(
                            props.buttonText === 'Catch'
                                ? catchPokemon(props.pokemon.id)
                                : releasePokemon(props.pokemon.id)
                        );
                    }}
                    color={props.buttonText === 'Catch' ? 'secondary' : 'primary'}
                >
                    {props.buttonText}
                </Button>
                <Button onClick={props.onCloseDialog} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
