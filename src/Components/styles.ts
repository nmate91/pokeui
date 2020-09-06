import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import Select from 'react-select';

export const TablePaper = styled(Paper)`
    @media (min-width: 1625px) {
        width: 50%;
    }
    @media (max-width: 1625px) {
        width: 30%;
    }
    float: left;
    margin-bottom: 6px;
`;

export const DropDown = styled(Select)`
    box-shadow: none;
    margin-top: 10px;
    margin-bottom: 30px;
    @media (min-width: 1625px) {
        width: 50%;
    }
    @media (max-width: 1625px) {
        width: 30%;
    }
`;
