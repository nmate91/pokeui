import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Pokemon } from '../redux/modules/PokemonTypes';
import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePaper, ToggleDiv, ToolbarDiv, TableTitle } from './styles';
import { Switch } from '@material-ui/core';

function PokemonTable(props: { onRowClick: (pokemon: { name: string; url: string }) => void }) {
    const selectedType = useSelector((state: RootState) => state.type.type);
    const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);
    const caughtPokemons = useSelector((state: RootState) => state.caughtPokemons.caughtPokemons);

    const [showOnlyCaught, setCaughtSwitch] = useState(false);

    function createData(pokemon: Pokemon) {
        const caught = caughtPokemons.includes(pokemon.pokemon.id);
        return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,
            status: caught ? 'Caught' : 'Free',
        };
    }

    if (!selectedType) return null;

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'URL', field: 'url' },
        { title: 'Status', field: 'status' },
    ];

    const components = {
        Toolbar: (props: any) => (
            <ToolbarDiv>
                <TableTitle variant="body1">{`${'Pokemons'}`}</TableTitle>
                <ToggleDiv>
                    <React.Fragment>
                        <Switch onChange={() => setCaughtSwitch(!showOnlyCaught)} checked={showOnlyCaught} />
                        {`${'Show only caught'}`}
                    </React.Fragment>
                </ToggleDiv>
                <MTableToolbar {...props} showTextRowsSelected={false} />
            </ToolbarDiv>
        ),
    };

    const data = pokemons
        .filter((p) => {
            const caught = caughtPokemons.includes(p.pokemon.id);
            return !showOnlyCaught || caught;
        })
        .map(createData);

    return (
        <TablePaper>
            <MaterialTable
                title={''}
                columns={columns}
                data={data}
                components={components}
                onRowClick={(event, rowData) => {
                    if (event && rowData && !event.isDefaultPrevented()) props.onRowClick(rowData);
                }}
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF',
                        borderBottom: '2px solid rgba(189, 189, 189, 0.5)',
                    },
                    showFirstLastPageButtons: true,
                    selection: false,
                    paging: true,
                    loadingType: 'linear',
                    pageSizeOptions: [5, 10, 20, 30, 50],
                    searchFieldAlignment: 'right',
                }}
            />
        </TablePaper>
    );
}

export default PokemonTable;
