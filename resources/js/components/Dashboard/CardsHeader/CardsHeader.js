import React from 'react';
import { Card, Typography, CardContent, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function CardsHeader(props) {

    const useStyles = makeStyles(() => ({
        root: {
            textAlign: 'center',
            background: props.color
        },
        texto: {
            fontSize: 18,
            color: props.font
        },
        titulo: {
            fontWeight: 'bold',
            fontSize: 22,
            color: props.font
        }
    }));

    const prueba = () => {
        alert("PRUEBA")
    }

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                {props.icono}
                <Typography className={classes.titulo}>
                    {props.titulo}
                </Typography>

                <Typography className={classes.texto}>
                    {props.totalotactivas}
                </Typography>
                <Button size="small" > </Button>
            </CardContent>
        </Card>
    );
}

export default CardsHeader;