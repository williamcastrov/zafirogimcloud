import React, { Fragment, useEffect, useState } from 'react';
import MaterialTable from "material-table";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import img from "../../../assets/img/montacarga.jpg";
import "./facturacion.css";
import swal from 'sweetalert';

import contratosServices from "../../../services/DatosEquipos/Contratos";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import clientesServices from "../../../services/Interlocutores/Clientes";
import facturacionServices from "../../../services/Importar/Facturacion";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modaldetalle: {
        position: 'absolute',
        width: 1000,
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
        minWidth: 410,
    },
    formControlDos: {
        margin: theme.spacing(0),
        minWidth: 200,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    button2: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    button3: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}));

function Facturacion(props) {
    const styles = useStyles();
    const [facturacionEquipos, setFacturacionEquipos] = useState([]);
    const [listVariantesProductoSeleccionada, setListVariantesProductosSeleccionada] = useState([]);
    const [idequipo, setIdequipo] = useState(0);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [modalPeriodoDuplicar, setModalPeriodoDuplicar] = useState(false);
    const [modalFacturacion, setModalFacturacion] = useState(false);
    const [listarCiudades, setListarCiudades] = useState([]);
    const [listarClientes, setListarClientes] = useState([]);
    const [contador, setContador] = useState(0);

    const [ciudad, setCiudad] = useState(0);
    const [cliente, setCliente] = useState(0);
    const [valorFactura, setValorFactura] = useState(0);
    const [diaFactura, setDiaFactura] = useState(0);
    const [datosFacturacion, setDatosFacturacion] = useState(0);
    const [observacion, setObservacion] = useState(0);
    const [numeroFactura, setNumeroFactura] = useState("");
    const [facturadoMes, setFacturadoMes] = useState(0);
    const [pendienteMes, setPendienteMes] = useState(0);

    const [botonGrabar, setBotonGrabar] = useState(false);
    const [editarEquipo, setEditarEquipo] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [annodestino, setAnnoDestino] = useState(0);
    const [mesdestino, setMesDestino] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        async function fetchDataCiudades() {
            const res = await ciudadesServices.listCiudades();
            setListarCiudades(res.data)
            //console.log(res.data);
        }
        fetchDataCiudades();
    }, [])

    useEffect(() => {
        async function fetchDataClientes() {
            const res = await clientesServices.listClientes();
            setListarClientes(res.data)
            console.log(res.data);
        }
        fetchDataClientes();
    }, [])

    const handleChangeCiudad = e => {
        const { name, value } = e.target;
        setCiudad(value)
    }

    const handleChangeCliente = e => {
        const { name, value } = e.target;
        setCliente(value)
    }

    const handleChangeValorRenta = e => {
        const { name, value } = e.target;
        setValorFactura(value)
    }

    const handleChangeDiaFactura = e => {
        const { name, value } = e.target;
        setDiaFactura(value)
    }

    const handleChangeNumeroFactura = e => {
        const { name, value } = e.target;
        setNumeroFactura(value)
    }

    const handleChangeDatosFacturacion = e => {
        const { name, value } = e.target;
        setDatosFacturacion(value)
    }

    const handleChangeObservacion = e => {
        const { name, value } = e.target;
        setObservacion(value)
    }


    const periodoConsultar = () => {
        setModalPeriodo(!modalPeriodo);
    }

    const facturacionModal = () => {
        setModalFacturacion(!modalFacturacion);
    }

    const facturacionDuplicar = () => {
        setModalPeriodoDuplicar(!modalPeriodoDuplicar);
    }

    const cambioDato = () => {
        /*console.log("Ciudad : ", ciudad);
        console.log("Cliente : ", cliente);
        console.log("Valor Renta : ", valorFactura);
        console.log("Día Factura : ", diaFactura);
*/
        const newDet = [];
        let item = {
            id_fac: editarEquipo.id_fac,
            anno_fac: editarEquipo.anno_fac,
            mes_fac: editarEquipo.mes_fac,
            periodo_fac: editarEquipo.periodo_fac,
            id_ctr: editarEquipo.id_ctr,
            codigocontrato_ctr: editarEquipo.codigocontrato_ctr,
            equipo_fac: editarEquipo.equipo_fac,
            asesorcomercial_ctr: editarEquipo.asesorcomercial_ctr,
            cliente_ctr: cliente,
            ciudad_ctr: ciudad,
            diafacturacion_ctr: diaFactura,
            valorrentames_ctr: valorFactura,
            tipofacturas_fac: editarEquipo.tipofacturas_fac,
            numerofactura_ctr: numeroFactura,
            datoscliente_ctr: datosFacturacion,
            observacion_ctr: observacion,
            facturada_ctr: 0,
            fechaalza_ctr: editarEquipo.fechaalza_ctr,
            fechafinal_ctr: editarEquipo.fechafinal_ctr,
            fechainicio_ctr: editarEquipo.fechainicio_ctr
        };

        newDet.push(item);
        //console.log("Equipo : ", newDet[0]);

        if (newDet.length > 0) {
            const grabar = async () => {
                const res = await facturacionServices.update(newDet[0]);

                if (res.success) {
                    swal("Facturación", "Registro Facturación actualizado de forma Correcta!", "success", { button: "Aceptar" });
                    console.log(res.message)
                    facturacionModal();
                    periodoConsultar();
                    procesarPeriodo();
                } else {
                    swal("Facturación", "Error Actualizando registro facturación!", "error", { button: "Aceptar" });
                    console.log(res.message);
                    facturacionModal();
                }
            }
            grabar();
        }
        else {
            swal("Facturación", "Debe Actualizar los datos de facturación!", "warning", { button: "Aceptar" });
            console.log(res.message);
            facturacionModal();
        }
        //actualizadatos();
    }

    const porFacturar = () => {
        const newDet = [];

        facturacionEquipos && facturacionEquipos.forEach((row) => {
            if (
                (Number.parseInt(row.facturada_ctr) ===
                    Number.parseInt(0)) &&
                (Number.parseInt(row.valorrentames_ctr) >
                    Number.parseInt(0))
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    anno_fac: row.anno_fac,
                    mes_fac: row.mes_fac,
                    periodo_fac: row.periodo_fac,
                    id_ctr: row.id_ctr,
                    codigocontrato_ctr: row.codigocontrato_ctr,
                    equipo_fac: row.equipo_fac,
                    asesorcomercial_ctr: row.asesorcomercial_ctr,
                    cliente_ctr: row.cliente_ctr,
                    ciudad_ctr: row.ciudad_ctr,
                    diafacturacion_ctr: row.diafacturacion_ctr,
                    valorrentames_ctr: row.valorrentames_ctr,
                    tipofacturas_fac: row.tipofacturas_fac,
                    numerofactura_ctr: row.numerofactura_ctr,
                    datoscliente_ctr: row.datoscliente_ctr,
                    observacion_ctr: row.observacion_ctr,
                    facturada_ctr: row.facturada_ctr,
                    fechaalza_ctr: row.fechaalza_ctr,
                    fechafinal_ctr: row.fechafinal_ctr,
                    fechainicio_ctr: row.fechainicio_ctr
                };
                newDet.push(item);
            }
        });
        setFacturacionEquipos(newDet);
    }

    const facturadoPeriodo = () => {
        const newDet = [];

        facturacionEquipos && facturacionEquipos.forEach((row) => {
            if (
                (Number.parseInt(row.facturada_ctr) ===
                    Number.parseInt(1)) &&
                (Number.parseInt(row.valorrentames_ctr) >
                    Number.parseInt(0))
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    anno_fac: row.anno_fac,
                    mes_fac: row.mes_fac,
                    periodo_fac: row.periodo_fac,
                    id_ctr: row.id_ctr,
                    codigocontrato_ctr: row.codigocontrato_ctr,
                    equipo_fac: row.equipo_fac,
                    asesorcomercial_ctr: row.asesorcomercial_ctr,
                    cliente_ctr: row.cliente_ctr,
                    ciudad_ctr: row.ciudad_ctr,
                    diafacturacion_ctr: row.diafacturacion_ctr,
                    tipofacturas_fac: row.tipofacturas_fac,
                    valorrentames_ctr: row.valorrentames_ctr,
                    numerofactura_ctr: row.numerofactura_ctr,
                    datoscliente_ctr: row.datoscliente_ctr,
                    observacion_ctr: row.observacion_ctr,
                    facturada_ctr: row.facturada_ctr,
                    fechaalza_ctr: row.fechaalza_ctr,
                    fechafinal_ctr: row.fechafinal_ctr,
                    fechainicio_ctr: row.fechainicio_ctr
                };
                newDet.push(item);
            }
        });
        setFacturacionEquipos(newDet);
    }

    const procesarPeriodo = async () => {

        let periodo = anno + mes;
        console.log("PERIODO : ", periodo);
        let pendiente = 0;
        let facturado = 0;
        let contador = 0;
        let longitud = 0;

        async function fetchDataPeriodo() {
            const res = await contratosServices.listdatosfacturacion(periodo);
            setFacturacionEquipos(res.data);
            console.log("FACTURACION EQUIPOS : ", res.data);
            longitud = res.data.length;

            if (res.data.length > 0) {
                res.data && res.data.forEach((row) => {
                    contador = contador + 1;
                    if (Number.parseInt(row.facturada_ctr) ===
                        Number.parseInt(0)) {
                        pendiente = pendiente + row.valorrentames_ctr
                    } else {
                        facturado = facturado + row.valorrentames_ctr
                    }
                    if (longitud === (contador)) {
                        setFacturadoMes(facturado)
                        setPendienteMes(pendiente)
                    }
                });
                console.log("VALORES : ", pendiente, facturado);
            }
        }
        fetchDataPeriodo();
        //periodoConsultar();
    }

    const marcaComoFacturada = async (id) => {
        //console.log("ID ITEM : ", id)
        swal({
            title: "Facturación El Zafiro.",
            text: "Oprima OK para confirmar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const actualiza = async (fac) => {
                        //console.log("ID ITEM : ", id)
                        const res = await facturacionServices.itemfacturado(fac);

                        if (res.success) {
                            swal("Marca Facturación", "Item marcado de Correctamente!", "success", { button: "Aceptar" });
                            procesarPeriodo();
                        } else
                            swal("Marca Facturación", "Error al marcar el item!", "success", { button: "Aceptar" });
                    }
                    actualiza(id);
                } else {
                    console.log("Falso")
                }
            });
    }

    const actualizadatos = async () => {
        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        async function fetchDataPeriodo() {
            const res = await contratosServices.listdatosfacturacion(periodo);
            setFacturacionEquipos(res.data);
            //console.log("FACTURACION EQUIPOS : ", res.data);
        }
        fetchDataPeriodo();
    }

    const duplicarPeriodo = async () => {
        let periodo = anno + mes;
        let periododestino = annodestino + mesdestino;
        //console.log("PERIODO : ", periodo);
        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            const res = await contratosServices.listdatosfacturacion(periodo);
            setFacturacionEquipos(res.data);
            newDet.push(res.data);

            if (newDet.length > 0) {
                //console.log("FACTURACION EQUIPOS  NEW DET: ", newDet);
              
                let longitud = newDet[0].length;
                //console.log("LONGITUD : ", longitud);

                newDet[0] &&
                    newDet[0].forEach((row, index) => {
                        //console.log("EQUIPO : ", row.equipo_fac)
                        let val = row.equipo_fac.substr(0, 3)
                        let otr = parseInt(val)
                        
                        if (isNaN(parseInt(otr)))
                            otr = 0
                        //console.log("VALOR : ", otr);

                        contador = contador + 1;
                        let item = {
                            anno_fac: annodestino,
                            mes_fac: mesdestino,
                            periodo_fac: periododestino,
                            id_ctr: row.id_ctr,
                            codigocontrato_ctr: row.codigocontrato_ctr,
                            equipo_fac: row.equipo_fac,
                            cencosto_fac: otr,
                            asesorcomercial_ctr: row.asesorcomercial_ctr,
                            cliente_ctr: row.cliente_ctr,
                            ciudad_ctr: row.ciudad_ctr,
                            tipofacturas_fac: 1,
                            diafacturacion_ctr: 0, //row.diafacturacion_ctr,
                            valorrentames_ctr: 0, //row.valorrentames_ctr,
                            numerofactura_ctr: 0, //row.numerofactura_ctr,
                            datoscliente_ctr: 0, //row.datoscliente_ctr,
                            observacion_ctr: 0, //row.observacion_ctr,
                            facturada_ctr: 0,
                            fechaalza_ctr: row.fechaalza_ctr,
                            fechafinal_ctr: row.fechafinal_ctr,
                            fechainicio_ctr: row.fechainicio_ctr
                        };

                        const duplicar = async () => {
                            const res = await facturacionServices.save(item);

                            if (res.success) {
                                console.log(ok)
                                //procesarPeriodo();
                            } else {
                                ok = false;
                            }
                        }
                        duplicar();

                        if (contador === longitud) {
                            swal("Facturación", "Registro Facturación Duplicados forma Correcta!", "success", { button: "Aceptar" });
                        }
                    });

            }
        }
        fetchDataPeriodo();

    }

    const serviciosEsporadicos = async () => {
        let date = new Date();
        let anno = String(date.getFullYear());
        let mes = String(date.getMonth() + 1);
        mes = "0" + mes;

        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            contador = contador + 1;
            let item = {
                anno_fac: anno,
                mes_fac: mes,
                periodo_fac: periodo,
                id_ctr: 1,
                codigocontrato_ctr: 1,
                equipo_fac: "SESP",
                asesorcomercial_ctr: 4,
                cliente_ctr: 0,
                ciudad_ctr: 167,
                tipofacturas_fac: 2,
                diafacturacion_ctr: 0,
                valorrentames_ctr: 0,
                numerofactura_ctr: 0,
                datoscliente_ctr: 0, //row.datoscliente_ctr,
                observacion_ctr: 0, //row.observacion_ctr,
                facturada_ctr: 0,
                fechaalza_ctr: fechaactual,
                fechafinal_ctr: fechaactual,
                fechainicio_ctr: fechaactual
            };

            const crearconcepto = async () => {
                const res = await facturacionServices.save(item);

                if (res.success) {
                    swal("Facturación", "Registro Servicios Esporadicos Correcto!", "success", { button: "Aceptar" });
                    procesarPeriodo();
                } else {
                    console.log("ERROR Creando Servicio")
                }
            }
            crearconcepto();
        }
        fetchDataPeriodo();
    }

    const serviciosGrua = async () => {
        let date = new Date();
        let anno = String(date.getFullYear());
        let mes = String(date.getMonth() + 1);
        mes = "0" + mes;

        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            contador = contador + 1;
            let item = {
                anno_fac: anno,
                mes_fac: mes,
                periodo_fac: periodo,
                id_ctr: 3,
                codigocontrato_ctr: 2,
                equipo_fac: "SGRU",
                asesorcomercial_ctr: 4,
                cliente_ctr: 0,
                ciudad_ctr: 167,
                tipofacturas_fac: 3,
                diafacturacion_ctr: 0,
                valorrentames_ctr: 0,
                numerofactura_ctr: 0,
                datoscliente_ctr: 0, //row.datoscliente_ctr,
                observacion_ctr: 0, //row.observacion_ctr,
                facturada_ctr: 0,
                fechaalza_ctr: fechaactual,
                fechafinal_ctr: fechaactual,
                fechainicio_ctr: fechaactual
            };

            const crearconcepto = async () => {
                const res = await facturacionServices.save(item);

                if (res.success) {
                    swal("Facturación", "Registro Servicios de Grua Correcto!", "success", { button: "Aceptar" });
                    procesarPeriodo();
                } else {
                    console.log("ERROR Creando Servicio")
                }
            }
            crearconcepto();
        }
        fetchDataPeriodo();
    }

    const ventaMontaCargas = async () => {
        let date = new Date();
        let anno = String(date.getFullYear());
        let mes = String(date.getMonth() + 1);
        mes = "0" + mes;

        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            contador = contador + 1;
            let item = {
                anno_fac: anno,
                mes_fac: mes,
                periodo_fac: periodo,
                id_ctr: 3,
                codigocontrato_ctr: 3,
                equipo_fac: "VTMT",
                asesorcomercial_ctr: 3,
                cliente_ctr: 0,
                ciudad_ctr: 167,
                tipofacturas_fac: 4,
                diafacturacion_ctr: 0,
                valorrentames_ctr: 0,
                numerofactura_ctr: 0,
                datoscliente_ctr: 0, //row.datoscliente_ctr,
                observacion_ctr: 0, //row.observacion_ctr,
                facturada_ctr: 0,
                fechaalza_ctr: fechaactual,
                fechafinal_ctr: fechaactual,
                fechainicio_ctr: fechaactual
            };

            const crearconcepto = async () => {
                const res = await facturacionServices.save(item);

                if (res.success) {
                    swal("Facturación", "Registro Servicios Venta Montacargas Correcto!", "success", { button: "Aceptar" });
                    procesarPeriodo();
                } else {
                    console.log("ERROR Creando Servicio")
                }
            }
            crearconcepto();
        }
        fetchDataPeriodo();
    }

    const ventaCertificados = async () => {
        let date = new Date();
        let anno = String(date.getFullYear());
        let mes = String(date.getMonth() + 1);
        mes = "0" + mes;

        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            contador = contador + 1;
            let item = {
                anno_fac: anno,
                mes_fac: mes,
                periodo_fac: periodo,
                id_ctr: 4,
                codigocontrato_ctr: 4,
                equipo_fac: "VCER",
                asesorcomercial_ctr: 4,
                cliente_ctr: 0,
                ciudad_ctr: 167,
                tipofacturas_fac: 5,
                diafacturacion_ctr: 0,
                valorrentames_ctr: 0,
                numerofactura_ctr: 0,
                datoscliente_ctr: 0, //row.datoscliente_ctr,
                observacion_ctr: 0, //row.observacion_ctr,
                facturada_ctr: 0,
                fechaalza_ctr: fechaactual,
                fechafinal_ctr: fechaactual,
                fechainicio_ctr: fechaactual
            };

            const crearconcepto = async () => {
                const res = await facturacionServices.save(item);

                if (res.success) {
                    swal("Facturación", "Registro Servicios Venta Certificados Correcto!", "success", { button: "Aceptar" });
                    procesarPeriodo();
                } else {
                    console.log("ERROR Creando Servicio")
                }
            }
            crearconcepto();
        }
        fetchDataPeriodo();
    }

    const ventaOtros = async () => {
        let date = new Date();
        let anno = String(date.getFullYear());
        let mes = String(date.getMonth() + 1);
        mes = "0" + mes;

        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        const newDet = [];
        let ok = true;
        let contador = 0;

        async function fetchDataPeriodo() {
            contador = contador + 1;
            let item = {
                anno_fac: anno,
                mes_fac: mes,
                periodo_fac: periodo,
                id_ctr: 6,
                codigocontrato_ctr: 6,
                equipo_fac: "VOTR",
                asesorcomercial_ctr: 6,
                cliente_ctr: 0,
                ciudad_ctr: 167,
                tipofacturas_fac: 7,
                diafacturacion_ctr: 0,
                valorrentames_ctr: 0,
                numerofactura_ctr: 0,
                datoscliente_ctr: 0, //row.datoscliente_ctr,
                observacion_ctr: 0, //row.observacion_ctr,
                facturada_ctr: 0,
                fechaalza_ctr: fechaactual,
                fechafinal_ctr: fechaactual,
                fechainicio_ctr: fechaactual
            };

            const crearconcepto = async () => {
                const res = await facturacionServices.save(item);

                if (res.success) {
                    swal("Facturación", "Registro Ventas Otros Servicios Correcto!", "success", { button: "Aceptar" });
                    procesarPeriodo();
                } else {
                    console.log("ERROR Creando Servicio")
                }
            }
            crearconcepto();
        }
        fetchDataPeriodo();
    }
    /*
{
            title: 'Imagen',
            field: 'imageUrl',
            render: rowData => <img src={img} style={{ width: 50, height: 50 }} />
        },
        
    */

    const columnas = [
        {
            title: 'Tipo',
            field: 'descripcion_tpf'
        },
        {
            title: 'Periodo',
            field: 'periodo_fac'
        },
        {
            title: 'Montacarga',
            field: 'equipo_fac'
        },
        {
            title: 'Cliente',
            field: 'razonsocial_cli'
        },
        {
            title: 'Información',
            field: 'datoscliente_ctr'
        },
        {
            title: 'Observación',
            field: 'observacion_ctr'
        },
        {
            title: 'Ciudad',
            field: 'nombre_ciu'
        },
        {
            title: 'Valor Mes',
            field: 'valorrentames_ctr'
        },
        {
            title: '#Factura',
            field: 'numerofactura_ctr'
        },
        {
            title: 'Día Facturación',
            field: 'diafacturacion_ctr'
        }
    ]

    const columnasvar = [
        {
            title: 'Montacarga',
            field: 'equipo_fac'
        },
        {
            title: 'Cliente',
            field: 'razonsocial_cli'
        },
        {
            title: 'Ciudad',
            field: 'nombre_ciu'
        },
        {
            title: 'Valor Mes',
            field: 'valorrentames_ctr'
        },
        {
            title: 'Día Facturación',
            field: 'diafacturacion_ctr'
        },
    ]

    const actualizarFacturacion = async () => {


    }

    const periodoFacturacion = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo de Facturación a Consultar </Typography>
            <Grid xl={12} lg={12} xs={12} md={12}>
                <FormControl className={styles.formControl}>
                    <TextField type="numeric" label="Año" name="annodepreciar"
                        onChange={(e) => setAnno(e.target.value)} />
                </FormControl>
            </Grid>
            <Grid xl={12} lg={12} xs={12} md={12}>
                <FormControl className={styles.formControl}>
                    <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar"
                        onChange={(e) => setMes(e.target.value)} />
                </FormControl>
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarPeriodo()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => periodoConsultar()} >Cancelar</Button>
            </div>
        </div>
    )

    const periodoFacturacionDuplicar = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Duplicar Periodo de Facturación </Typography>
            <Grid container spacing={2} >
                <Grid xl={6} lg={6} xs={6} md={6}>
                    <FormControl className={styles.formControlDos}>
                        <TextField type="numeric" label="Año Base" name="annodepreciar"
                            onChange={(e) => setAnno(e.target.value)} />
                    </FormControl>
                </Grid>
                <Grid xl={6} lg={6} xs={6} md={6}>
                    <FormControl className={styles.formControlDos}>
                        <TextField type="numeric" className={styles.inputMaterial} label="Mes Base" name="mesdepreciar"
                            onChange={(e) => setMes(e.target.value)} />
                    </FormControl>
                </Grid>
            </Grid>
            <br />
            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo Destino </Typography>
            <br />
            <Grid container spacing={2} >
                <Grid xl={6} lg={6} xs={6} md={6}>
                    <FormControl className={styles.formControlDos}>
                        <TextField type="numeric" label="Año Destino" name="annodestino"
                            onChange={(e) => setAnnoDestino(e.target.value)} />
                    </FormControl>
                </Grid>
                <Grid xl={6} lg={6} xs={6} md={6}>
                    <FormControl className={styles.formControlDos}>
                        <TextField type="numeric" className={styles.inputMaterial} label="Mes Destino" name="mesdestino"
                            onChange={(e) => setMesDestino(e.target.value)} />
                    </FormControl>
                </Grid>
            </Grid>
            <br />
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => duplicarPeriodo()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => facturacionDuplicar()} >Cancelar</Button>
            </div>
        </div>
    )


    const facturaEditar = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Registro</Typography>
            <br />
            <Grid container spacing={2} >
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="idselectCiudad" className='amanotexto'>Ciudad</InputLabel>
                        <Select
                            labelId="selectCiudad"
                            name="ciudad_ctr"
                            id="idselectCiudad"
                            //defaultValue={editarEquipo && editarEquipo.ciudad_ctr}
                            onChange={handleChangeCiudad}
                        >
                            <MenuItem value="">  <em>None</em> </MenuItem>
                            {
                                listarCiudades && listarCiudades.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="idselectCiudad" className='amanotexto'>Cliente</InputLabel>
                        <Select
                            labelId="selectCiudad"
                            name="ciudad_ctr"
                            id="idselectCiudad"
                            //defaultValue={editarEquipo && editarEquipo.cliente_ctr}
                            onChange={handleChangeCliente}
                        >
                            <MenuItem value="">  <em>None</em> </MenuItem>
                            {
                                listarClientes && listarClientes.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <TextField className={styles.formControl} label="Valor Renta"
                        name="codigogrupo_grp" onChange={handleChangeValorRenta}
                        /*defaultValue={editarEquipo && editarEquipo.valorrentames_ctr}*/ />
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <TextField className={styles.formControl} label="Número Factura"
                        name="numerofactura_ctr" onChange={handleChangeNumeroFactura}
                        /*defaultValue={editarEquipo && editarEquipo.valorrentames_ctr}*/ />
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <br />
                    <TextField className={styles.formControl} label="Día Facturación"
                        name="diafacturacion_ctr" onChange={handleChangeDiaFactura}
                        /*defaultValue={editarEquipo && editarEquipo.diafacturacion_ctr}*/ />
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <br />
                    <TextField className={styles.formControl} label="Datos Cliente"
                        name="datoscliente_ctr" onChange={handleChangeDatosFacturacion}
                        /*defaultValue={editarEquipo && editarEquipo.diafacturacion_ctr}*/ />
                </Grid>
                <Grid item xl={12} lg={12} xs={12} md={12}>
                    <br />
                    <TextField className={styles.formControl} label="Observación"
                        name="observacion_ctr" onChange={handleChangeObservacion}
                        /*defaultValue={editarEquipo && editarEquipo.diafacturacion_ctr}*/ />
                </Grid>
            </Grid>
            <br /><br />
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => cambioDato()} >Guardar</Button>
                <Button className={styles.button2} onClick={() => facturacionModal()}>Cancelar</Button>
            </div>
        </div>
    )

    // Codigo Original Actualiza el Linea
    const detalleFacturacion = (
        <div className={styles.modaldetalle}>
            <MaterialTable
                title="Facturación el Zafiro"
                columns={columnasvar}
                data={facturacionEquipos}
                editable={{

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...facturacionEquipos];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setListVariantesProductosSeleccionada([...dataUpdate]);
                                if (dataUpdate) {
                                    cambioDato()
                                } else
                                    console.log("NADA")
                                resolve();
                            }, 1000)
                        }),

                }}
                options={{
                    actionsColumnIndex: 11,
                    headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                    rowStyle: {
                        fontSize: 14,
                    }
                }}
            />
        </div>
    )

    const seleccionarProducto = (maquina, caso) => {
        //console.log("EQUIPO SELECT : ", maquina)
        if (caso === "Editar") {
            setIdequipo(maquina.id_ctr);
            setEditarEquipo(maquina);
            facturacionModal();
        } else
            if (caso === "Actualiza") {
                marcaComoFacturada(maquina.id_fac);
            }
    }

    return (
        <Fragment>
            <div>
                <Grid container spacing={2} >
                    <Grid item lg={1} xl={1} xs={1} md={1}></Grid>
                    <Grid item lg={1} xl={1} xs={1} md={1} className="textofacturado">
                        Facturado : {facturadoMes}
                    </Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button2} onClick={() => periodoConsultar()}>Seleccionar Periodo</Button>
                        </div>
                    </Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button} onClick={() => facturacionDuplicar()}>Duplicar Periodo</Button>
                        </div>
                    </Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button3} onClick={() => porFacturar()}>Por Facturar</Button>
                        </div>
                    </Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button3} onClick={() => facturadoPeriodo()}>Facturado</Button>
                        </div>
                    </Grid>
                    <Grid item lg={1} xl={1} xs={1} md={1} className="textofacturado">
                        Pendiente : {pendienteMes}
                    </Grid>
                </Grid>
                <div className='espacios'>
                    <Grid container spacing={2} >
                        <Grid item lg={2} xl={2} xs={2} md={2}>
                            <div align="center" >
                                <Button className="espaciosuperior" onClick={() => serviciosEsporadicos()}>Servicios Esporadicos</Button>
                            </div>
                        </Grid>
                        <Grid item lg={2} xl={2} xs={2} md={2}>
                            <div align="center" >
                                <Button className="espaciosuperior" onClick={() => serviciosGrua()}>Servicios de Grua</Button>
                            </div>
                        </Grid>
                        <Grid item lg={2} xl={2} xs={2} md={2}>
                            <div align="center" >
                                <Button className="espaciosuperior" onClick={() => ventaMontaCargas()}>Venta de Montacargas</Button>
                            </div>
                        </Grid>
                        <Grid item lg={2} xl={2} xs={2} md={2}>
                            <div align="center" >
                                <Button className="espaciosuperior" onClick={() => ventaCertificados()}>Venta de Certificados</Button>
                            </div>
                        </Grid>
                        <Grid item lg={2} xl={2} xs={2} md={2}>
                            <div align="center" >
                                <Button className="espaciosuperior" onClick={() => ventaOtros()}>Otros Servicios</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <MaterialTable
                    title="FACTURACION EL ZAFIRO"
                    columns={columnas}
                    data={facturacionEquipos}
                    actions={[
                        {
                            icon: EditIcon,
                            tooltip: 'Editar Item',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Editar")
                        },
                        {
                            icon: EditAttributesIcon,
                            tooltip: 'Facturada',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Actualiza")
                        }
                    ]}
                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.id_fac))}
                    options={{
                        actionsColumnIndex: 11,
                        headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                        rowStyle: rowData => ({
                            backgroundColor: (1 === rowData.facturada_ctr) ? '#4FFF33' : '#FFF'
                        })
                    }}
                />

                <Modal
                    open={modalPeriodo}
                    onClose={periodoConsultar}
                >
                    {periodoFacturacion}
                </Modal>

                <Modal
                    open={modalFacturacion}
                    onClose={facturacionModal}
                >
                    {facturaEditar}
                </Modal>

                <Modal
                    open={modalPeriodoDuplicar}
                    onClose={facturacionDuplicar}
                >
                    {periodoFacturacionDuplicar}
                </Modal>



            </div>
        </Fragment>
    );
}

export default Facturacion;