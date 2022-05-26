import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import Loading from "../../../../components/Loading";

import equiposServices from "../../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    button2: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: red[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

function InformeEquipos() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchDataEquipos() {
            setLoading(true);
            const res = await equiposServices.listReporteEquipos();
            setListarEquipos(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
            setLoading(false);
        }
        fetchDataEquipos();
    }, [])

    return (
        <div>
            {
                loading ? <Loading /> : null
            }
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="seguros"
                        filename="Informacion Flota de Equipos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="seguros" className="table">
                <thead>
                    <tr>
                        <th>No. SEGURO</th>
                        <th>ESTADO SEGURO</th>
                        <th>No. IMPORTACIÓN</th>
                        <th>PROPIETARIO</th>
                        <th>DATO AUXILIAR PROPIETARIO</th>
                        <th>ESTADO CLIENTE</th>
                        <th>ID EQUIPO</th>
                        <th>ESTADO MMTO</th>
                        <th>FRECUENCIA</th>
                        <th>NIT</th>
                        <th>CLIENTE/UBICACIÓN</th>
                        <th>NOMBRE COMERCIAL</th>
                        <th>DIRECCIÓN  CONTRATO</th>
                        <th>MUNICIPIO</th>
                        <th>DEPARTAMENTO</th>
                        <th>REFERENCIA</th>
                        <th>DESCRIPCIÓN</th>
                        <th>MARCA</th>
                        <th>DATOS EXTRACCION RPTO/MEJORA</th>
                        <th>MATRICULA</th>
                        <th>MARCACIÓN</th>
                        <th>MODELO</th>
                        <th>SERIE</th>
                        <th>AÑO DE FABRICACIÓN</th>
                        <th>CAMARA</th>
                        <th>ID CAMARA</th>
                        <th>SENSOR DE IMPACTO</th>
                        <th>ID SENSOR DE IMPACTO</th>
                        <th>ALARMA DESPLAZAMIENTO</th>
                        <th>LUZ ESTROBER</th>
                        <th>LUCES PUNTO AZUL</th>
                        <th>LUCES REFLECTORAS</th>
                        <th>INVENTARIO 2021</th>
                        <th>ESTADO CALIDAD</th>
                        <th>DATO AUXILIAR CALIDAD</th>
                        <th>CUENTA CONTABLE</th>
                        <th>CUENTA DEPRECIACIÓN</th>
                        <th>DATO AUXILIAR CUENTAS</th>
                        <th>DOCUMENTO  MOVIMIENTO</th>
                        <th>COSTO  SIN IVA</th>
                        <th>COSTO CON IVA</th>
                        <th>DEPRECIACIÓN ACUMULADA</th>
                        <th>VENTA PARCIAL ACTIVO</th>
                        <th>VENTA PARCIAL DEPRECIACIÓN</th>
                        <th>DOCUMENTO MEJORA DEL ACTIVO</th>
                        <th>VALOR MEJORA (CON IVA)</th>
                        <th>DOCUMENTO MEJORA DEL ACTIVO</th>
                        <th>VALOR MEJORA (CON IVA)</th>
                        <th>DURACIÓN DEL ACTIVO</th>
                        <th>CUOTA DE PRECIACIÓN MENSUAL</th>
                        <th>FECHA INICIO DEPRECIACIÓN</th>
                        <th>VALOR COMERCIAL</th>
                        <th>VALOR EN LIBROS</th>
                        <th>COMBO #</th>
                        <th>CUOTA MENSUAL FINANCIERA</th>
                        <th>ESTADO DEPRECIACION</th>
                        <th>CENTRO DE COSTO</th>
                        <th>DATO AUXILIAR ADMON</th>
                        <th>DATO AUXILIAR CONTABILIDAD</th>
                        <th>ESTADO EQUIPO</th>
                        <th>ESTADO DEL CONTRATO</th>
                        <th>HORAS DE TRABAJO CONTRADAS</th>
                        <th>VALOR RENTA MES</th>
                        <th>DURACIÓN  DEL CONTRATO</th>
                        <th>COMENTARIOS VALOR COMERCIAL</th>
                        <th>FECHA TERMINACIÓN CONTRATO</th>
                        <th>FECHA DE ALZA</th>
                        <th>DATO AUXILIAR ALZA</th>
                        <th>DIA FACTURA</th>
                        <th>DATO AUXILIAR FACTURACIÓN</th>
                        <th>ASESOR COMERCIAL</th>
                        <th>OBSERVACIÓN CONTRATO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((seguros, index) => {
                            return (
                                <tr>
                                    <td>{seguros.numeroseguro_seg}</td>
                                    <td>{seguros.nombreestado_seg}</td>
                                    <td>{seguros.declaracionimportacion_seg}</td>
                                    <td>{seguros.razonsocial_int}</td>
                                    <td>{seguros.datoauxiliarpropietario_equ}</td>
                                    <td>{seguros.nombre_estcli}</td>
                                    <td>{seguros.codigo_equ}</td>
                                    <td>{seguros.nombre_estmtto}</td>
                                    <td>{seguros.frecuencia_equ}</td>
                                    <td>{seguros.nit_cli}</td>
                                    <td>{seguros.razonsocial_cli}</td>
                                    <td>{seguros.razonsocial_cli}</td>
                                    <td>{seguros.direccion_ubi}</td>
                                    <td>{seguros.nombre_ciu}</td>
                                    <td>{seguros.nombre_dep}</td>
                                    <td>{seguros.referencia_dequ}</td>
                                    <th>{seguros.descripcion_equ}</th>
                                    <th>{seguros.descripcion_mar}</th>
                                    <th>{seguros.datoauxiliaraquimejora_equ}</th>
                                    <th>{seguros.manejamatricula_equ}</th>
                                    <th>{seguros.manejamarcacion_equ}</th>
                                    <th>{seguros.modelo_dequ}</th>
                                    <th>{seguros.serie_dequ}</th>
                                    <th>{seguros.annofabricacion_dequ}</th>

                                    <td>{seguros.camara_com}</td>
                                    <td>{seguros.idcamara_com}</td>
                                    <td>{seguros.sensordeimpacto_com}</td>
                                    <td>{seguros.idsensordeimpacto_com}</td>
                                    <td>{seguros.alarmadesplazamiento_com}</td>
                                    <td>{seguros.luzestrober_com}</td>
                                    <td>{seguros.lucespuntoazul_com}</td>
                                    <td>{seguros.lucesreflectoras_com}</td>

                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.nombre_estcal}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.ctacontable_equ}</td>
                                    <td>{seguros.ctadepreciacion_equ}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <th>{seguros.valoradquisicion_equ}</th>
                                    <th>{seguros.costosiniva_act}</th>
                                    <th>{seguros.depreciacionacumulada_act}</th>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <th>{seguros.depreciacionmensual_act}</th>
                                    <th>{seguros.fechainiciadepre_act}</th>
                                    <th>{seguros.valorcomercial_seg}</th>
                                    <th>{seguros.valoradquisicion_act}</th>
                                    <th>{seguros.numerocombo_act}</th>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.estadodepreciacion}</td>
                                    <td>{seguros.codigo_cco}</td>
                                    <td>{seguros.datoauxiliaradmon_equ}</td>
                                    <td>{seguros.datoauxiliarcontabilidad_equ}</td>
                                    <td>{seguros.nombre_est}</td>
                                    <td>{seguros.estadocontrato}</td>
                                    <td>{seguros.horastrabajocontratadas_ctr}</td>
                                    <td>{seguros.valorrentames_ctr}</td>
                                    <td>{seguros.duracion_ctr}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.fechafinal_ctr}</td>
                                    <td>{seguros.fechaalza_ctr}</td>
                                    <td>{seguros.datoauxiliaralza_equ}</td>
                                    <td>{seguros.diafacturacion_ctr}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.asesorcomercial}</td>
                                    <td>{seguros.blanco}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformeEquipos;