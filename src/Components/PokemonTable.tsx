import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Pokemon } from '../redux/modules/PokemonTypes';
import MaterialTable from 'material-table';
import { TablePaper } from './styles';

function PokemonTable(props: { onRowClick: (pokemon: { name: string; url: string }) => void }) {
    const selectedType = useSelector((state: RootState) => state.type.type);
    const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);
    const caughtPokemons = useSelector((state: RootState) => state.caughtPokemons.caughtPokemons);

    function createData(pokemon: Pokemon) {
        return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,
            status: caughtPokemons.includes(pokemon.pokemon.id) ? 'Caught' : 'Free',
        };
    }

    if (!selectedType) return null;

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'URL', field: 'url' },
        { title: 'Status', field: 'status' },
    ];

    const data = pokemons.map(createData);

    return (
        <TablePaper>
            <MaterialTable
                title={'Pokemons'}
                columns={columns}
                data={data}
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
                    selection: true,
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
