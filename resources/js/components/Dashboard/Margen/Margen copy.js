import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem, } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

//Leer Api
import facturacionServices from "../../../services/Importar/Facturacion";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import rentabilidadperiodoServices from "../../../services/Importar/RentabilidadPeriodo";

const TAX_RATE = 0.07;

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    inputMaterial: {
        width: '100%'
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
        maxWidth: 300,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);


const StyledTableCell2 = withStyles((theme) => ({
    head: {
        fontSize: 16,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

function ccyFormat(value) {
    return `${value.toLocaleString('en-US')}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Margen() {
    const classes = useStyles();
    const [listFacturas, setListFacturas] = useState([]);
    const [listRentabilidadPeriodo, setListRentabilidadPeriodo] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [equipo, setEquipo] = useState(0);
    const [contrataciones, setContrataciones] = useState(0);
    const [listarEquipos, setListarEquipos] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
    }

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await equiposServices.listEquiposMontacargas();
            setListarEquipos(res.data);
        }
        fetchDataEquipos();
    }, [])

    const leerFacturacion = () => {
        let codigo_fac = anno + mes + equipo;
        console.log("CODIGO FAC : ", codigo_fac)

        async function fetchDataFacturas() {
            const res = await facturacionServices.listarfactmesequipo("'"+codigo_fac+"'");
            console.log("FACTURAS : ", res.data);
            setListFacturas(res.data);
        }
        fetchDataFacturas();

        async function fetchDataRentabilidadPeriodo() {
            const res = await rentabilidadperiodoServices.listarrentabilidadperiodoequipo("'"+codigo_fac+"'");
            console.log("RENTABILIDAD PERIODO : ", res.data);
            setListarRentabilidadPeriodo(res.data);
        }
        fetchDataRentabilidadPeriodo();

    }

    return (
        <div>
            <Typography align="center" className={classes.typography} variant="button" display="block"> Indicador de Rentabilidad </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Año" name="anno" fullWidth onChange={handleChange}
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Mes" name="mes" fullWidth onChange={handleChange}
                        onChange={(e) => setMes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="idselectequipo">Equipo</InputLabel>
                        <Select
                            labelId="selectequipo"
                            name="equipo"
                            id="idselectequipo"
                            fullWidth
                            onChange={handleChange}
                            onClick={(e) => setEquipo(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                listarEquipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.codigo_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div align="right">
                <Button className={classes.button} color="primary" onClick={() => leerFacturacion()} >Confirmar</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" colSpan={4}>
                                Concepto
                            </StyledTableCell>
                            <StyledTableCell align="left">Unitario</StyledTableCell>
                            <StyledTableCell align="left">Valor</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell2>Facturación </StyledTableCell2>
                            <StyledTableCell2>Contratación </StyledTableCell2>
                            <StyledTableCell2>Consumo Repuestos </StyledTableCell2>
                            <StyledTableCell2>Mtto Correctivo </StyledTableCell2>
                            <StyledTableCell2>Mtto Preventivo </StyledTableCell2>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listFacturas && listFacturas.map((factura) => (

                            <TableRow key={factura.id_fac}>
                                <StyledTableCell2>{ccyFormat(factura.valorfactura)}</StyledTableCell2>
                                <StyledTableCell2>{ccyFormat(factura.valorcontratacion)}</StyledTableCell2>
                                <StyledTableCell2>{ccyFormat(factura.valorrepuesto)}</StyledTableCell2>
                                <StyledTableCell2>{ccyFormat(factura.valorcorrectivo)}</StyledTableCell2> 
                                <StyledTableCell2>{ccyFormat(factura.valorpreventivo)}</StyledTableCell2> 
                            </TableRow>
                        ))}

                        {listFacturas && listFacturas.map((factura) => (
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>ROI</TableCell>
                            <TableCell align="right">{ccyFormat(factura.roi)}</TableCell>
                        </TableRow>
                        ))}
                                  
                        <TableRow>
                            <TableCell>ROA</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>RENTABILIDAD</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
