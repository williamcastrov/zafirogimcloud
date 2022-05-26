import React from 'react';
import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";

const style = {
    container: {
        paddingTop: "8px"
    },
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5"
    },
    link: {
        display: "flex"
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: "4px"
    },
    submit: {
        marginTop: 15,
        marginBottom: 10
    },
    foto: {
        height: "100px"
    }
};

function PrincipalPDF() {
    return (
        <Container>
            <Paper>
                <Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            name="direccion"
                            label="Direccion del inmueble"
                            fullWidth
                        />

                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                            style={style.submit}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default PrincipalPDF;