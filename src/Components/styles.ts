import { DialogContent, FormControl, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Select from 'react-select';

export const TablePaper = styled(Paper)`
    @media (min-width: 1625px) {
        width: 70%;
    }
    @media (max-width: 1625px) {
        width: 50%;
    }
    float: left;
    margin-bottom: 6px;
`;

export const CustomDialogContent = styled(DialogContent)`
    width: 500px;
    height: auto;
`;

export const DropDown = styled(Select)`
    box-shadow: none;
    margin-top: 10px;
    margin-bottom: 30px;
    @media (min-width: 1625px) {
        width: 30%;
    }
    @media (max-width: 1625px) {
        width: 20%;
    }
`;

export const TitleLabel = styled(Typography)`
    font-size: 18px !important;
    margin-bottom: 8px !important;
`;

export const ToolbarDiv = styled.div`
    display: flex;
`;

export const ToggleDiv = styled.div`
    margin-left: auto;
    padding-top: 12px;
    padding-right: 25px;
`;

export const TableTitle = styled(Typography)`
    font-size: 18px !important;
    padding-top: 20px !important;
    padding-left: 5px !important;
    padding-bottom: 10px !important;
`;

export const LeftColumnFormControl = styled(FormControl)`
    display: inline-block !important;
    width: 39%;
    margin-right: 10% !important;
`;

export const RightColumnFormControl = styled(FormControl)`
    display: inline-block !important;
    width: 39%;
    margin-left: 10% !important;
    margin-right: 1% !important;
`;
