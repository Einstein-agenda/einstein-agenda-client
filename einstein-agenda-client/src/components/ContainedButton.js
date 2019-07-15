import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        minWidth: theme.spacing(10)
    },
    input: {
        display: 'none',
    },
}));

export default function ContainedButtons() {
    const classes = useStyles();

    return (
        <div className= 'content'>
            <Link to="/medicoLogin">
                <Button variant="contained" color="primary" className={classes.button}>
                    Médico
                </Button>
            </Link>
           
            <Link to="/pacienteLogin">
                <Button variant="contained" color="secondary" className={classes.button}>
                Paciente
                </Button>
            </Link>
        </div>
       
    );
}