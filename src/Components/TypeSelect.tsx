import React, { useEffect, useState } from 'react';
import { ValueType } from 'react-select';
import { RootState } from '../redux';
import { setType } from '../redux/modules/SelectedPokemonType';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../redux';
import { useDispatch } from 'react-redux';
import { setPokemons } from '../redux/modules/PokemonTypes';
import { makeStyles } from '@material-ui/core/styles';
import { DropDown } from './styles';

const store = createStore(rootReducer, applyMiddleware(thunk));

const mapStateToProps = (state: RootState) => ({
    type: state.type,
});
const mapDispatchToProps = { setType };

function TypeSelect() {
    const onChange = (selectedOption: ValueType<OptionType>) => {
        if (selectedOption) {
            const optionObject = selectedOption as OptionType;
            dispatch(setType(optionObject && optionObject.value));
            if (optionObject.value !== -1)
                fetch(`https://pokeapi.co/api/v2/type/${optionObject.value}`)
                    .then((result) => {
                        return result.json();
                    })
                    .then((json) => {
                        dispatch(setPokemons(json.pokemon));
                    });
        }
    };

    type OptionType = { label: string; value: number };
    const [types, getTypes] = useState();
    const dispatch = useDispatch();
    const useStyles = makeStyles({
        select: {
            minWidth: 640,
            maxWidth: 1024,
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
    });

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                getTypes(
                    data.results.map((x: { name: string; url: string }) => {
                        const matches = x.url.match(/(\d+)(?!.*\d)/);
                        const int = Number.parseInt(matches ? matches[0] : '-1');
                        return {
                            label: x.name,
                            value: int,
                        };
                    })
                );
            });
    }, [getTypes]);

    const classes = useStyles();

    if (!types) {
        return null;
    }

    return (
        <Provider store={store}>
            <h1>Select a pokemon type:</h1>
            <DropDown
                menuPosition={'fixed'}
                menuPlacement={'bottom'}
                options={types}
                className={classes.select}
                onChange={onChange}
            />
        </Provider>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeSelect);
