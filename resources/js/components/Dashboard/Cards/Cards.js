import React  from 'react';
import { Card, Typography, CardContent, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Componentes de Conexion con el Backend
import facturacionServices from "../../../services/Importar/Facturacion";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        backgroundColor: 'rgba(73,155,234,1)'
    },
    texto: {
        fontSize: 18,
        color: 'white'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
}));

function Cards(props) {
    const classes = useStyles();
    const { titulo, texto } = props;
    //console.log("TITULO - TEXTO : ", titulo, texto);

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.titulo}>
                        {props.titulo}
                    </Typography>

                    <Typography className={classes.texto}>
                        {props.texto}
                    </Typography>

                </CardContent>
            </Card>
        </div>

    );
}

export default Cards;