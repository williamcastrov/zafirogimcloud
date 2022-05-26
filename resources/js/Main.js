import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import firebase from "./server/firebase";
import "firebase/auth";
import "./app.scss";

import usuariosServices from "./services/Usuarios";

// Componentes Menu Bar
import AppNavbar from "./layouts/AppNavbar/";
import theme from "./theme";

// Componentes de Logueo
import Login from './components/Auth/Login';
import RegistrarUsuario from "./components/Auth/RegistrarUsuario";
import RecuperarContraseña from "./components/Auth/RecuperarContraseña";
import Usuarios from './pages/Usuarios/Usuarios';
import ActivarUsuario from './pages/Usuarios/ActivarUsuario';
import Auth from "./pages/Auth";
import Management from './components/Management/Management';
import Loading from './components/Loading';

// Componentes Modulo Parametros Genrales
import Paises from './pages/Parameters/Paises';
import Regiones from './pages/Parameters/Regiones';
import Empresa from './pages/Parameters/Empresa';
import Departamentos from './pages/Parameters/Departamentos';
import Ciudades from './pages/Parameters/Ciudades';
import Estados from './pages/Parameters/Estados';
import Unidades from './pages/Parameters/Unidades';
import Monedas from './pages/Parameters/Monedas';

// Componentes Modulo Gestión Mantenimiento
import DatosHorometro from './pages/Mantenimiento/DatosHorometro';
import Frecuencias from './pages/Mantenimiento/Frecuencias';
import Equipos from './pages/Mantenimiento/Equipos';
import BajasEquiposHistoricos from './pages/Mantenimiento/BajasEquiposHistoricos';
import Accesorios from './pages/Mantenimiento/Accesorios';
import ExtrasEquipos from './pages/Mantenimiento/ExtrasEquipos';
import Gruposequipos from './pages/Mantenimiento/Gruposequipos';
import SubGrupospartes from './pages/Mantenimiento/SubGrupospartes';
import Referencias from './pages/Mantenimiento/Referencias';
import Marcas from './pages/Mantenimiento/Marcas';
import TiposFallas from './pages/Mantenimiento/TiposFallas';
import FallasMtto from './pages/Mantenimiento/FallasMtto';
import Remisiones from './pages/Mantenimiento/Remisiones';
import CambioElementos from './pages/Mantenimiento/CambioElementos';
import IncrementoCanon from './pages/Mantenimiento/IncrementoCanon';
import ContratacionesMtto from './pages/Mantenimiento/Contrataciones';
import RepuestosMtto from './pages/Mantenimiento/Repuestos';
import ClasificacionABC from './pages/Mantenimiento/ClasificacionABC';
import EstadosClientes from './pages/Mantenimiento/EstadosClientes';
import EstadosMtto from './pages/Mantenimiento/EstadosMtto';
import EstadosCalidad from './pages/Mantenimiento/EstadosCalidad/EstadosCalidad';
import UsuariosEquipos from "./pages/Mantenimiento/UsuariosEquipos";

// Componentes Modulo Gestión Ordenes de Servicios
import Tiposmtto from './pages/GestionOrdenes/Parameters/Tiposmtto';
import TipoOperacion from './pages/GestionOrdenes/Parameters/TipoOperacion';
import TiposEstados from './pages/GestionOrdenes/Parameters/TiposEstados';
import TiposServicio from './pages/GestionOrdenes/Parameters/TiposServicio';
import TiposActividad from './pages/GestionOrdenes/Parameters/ActividadRealizada';
import GestionarPendientes from './pages/GestionOrdenes/GestionarPendientes';

import LeeUsuarioOrdenes from './pages/GestionOrdenes/Ordenes/LeeUsuarioOrdenes';
import CrearOrdenes from './pages/GestionOrdenes/CrearOrdenes';
import ActividadRealizada from "./pages/GestionOrdenes/ActividadesOserv";
import RegistroActividadOperario from "./pages/GestionOrdenes/ActividadesOserv/RegistroActividadesOperario";
import ActividadesPendiente from "./pages/GestionOrdenes/ActividadesOserv/ActividadesPendiente";

// Componentes Modulo Datos Adicionales Equipos
import TipoGarantia from './pages/DatosEquipos/TipoGarantia';
import Garantias from './pages/DatosEquipos/Garantias';
import Contratos from './pages/DatosEquipos/Contratos';
import FichaTecnica from './pages/DatosEquipos/FichaTecnica';
import TiposLlantas from './pages/DatosEquipos/TiposLlantas';
import TiposEquipos from './pages/DatosEquipos/TiposEquipos';
import Ubicaciones from './pages/DatosEquipos/Ubicaciones';
import Seguros from './pages/DatosEquipos/Seguros';
import ComponentesxEquipo from './pages/DatosEquipos/ComponentesxEquipo';

// Componentes Modulo Gestión de Almacenes
import TiposAlmacenes from './pages/Almacenes/TiposAlmacenes';
import LineasProductos from './pages/Almacenes/LineasProductos';
import Inventarios from './pages/Almacenes/Inventarios';
import CrearAlmacenes from './pages/Almacenes/CrearAlmacenes';

// Componentes Modulo Lista de Chequeo de Equipos
import EntregaEquipos from './pages/ListaChequeo/EntregaEquipos';
import RecepcionEquipos from './pages/ListaChequeo/RecepcionEquipos';
import RecepcionAlmacen from './pages/ListaChequeo/RecepcionAlmacen';
import PanelListaChequeo from './pages/ListaChequeo/PanelListaChequeo';

//Componentes Modulo Interlocutores
import TipoInterlocutores from './pages/Interlocutores/Parameters/TipoInterlocutores';
import Especialidades from './pages/Interlocutores/Parameters/Especialidades';
import Proveedores from './pages/Interlocutores/Proveedores';
import Clientes from './pages/Interlocutores/Clientes';
import Empleados from './pages/Interlocutores/Empleados';
import Contactos from './pages/Interlocutores/Contactos';

//Componentes Modulo Activos
import Areas from './pages/Activos/Areas';
import Cencostos from './pages/Activos/Cencostos';
import PlandeCuentas from './pages/Activos/PlandeCuentas';
import Activos from './pages/Activos/Activos';
import Depreciacion from './pages/Activos/Depreciacion';
import ExportarDepreciacion from './pages/Activos/ExportarExcel/Depreciacion';
import ExportarActivos from './pages/Activos/ExportarExcel/Activos';

//Impresión PDF
import ImprimirOT from './pages/Listar/Ordenes/OrdenesPdf';
import ImprimirOTCliente from './pages/Listar/Ordenes/OrdenesPdfCliente';
import ImprimirOTChequeo from './pages/Listar/Ordenes/OrdenChequeoPdf';
import PrincipalPDF from './components/Pdf/VisualizarPDF/PrincipalPDF.js';
import Pdf from './components/Pdf/VisualizarPDF/Pdf';

import ImprimirRemision from './pages/Mantenimiento/Listar/Remisiones';
import ImprimirCambioElemento from './pages/Mantenimiento/Listar/CambioElementos';
import ImprimirIncrementoCanon from './pages/Mantenimiento/Listar/IncrementoCanon';

//Importar Archivos
import InventariosAlmacen from './pages/Importar/Inventarios/InventariosAlmacen';
import Contrataciones from './pages/Importar/Contrataciones';
import Repuestos from './pages/Importar/ConsumosRepuestos';
import ConceptosRentabilidad from './pages/Informes/Parameters/ConceptosRentabilidad';
import ConceptosRentabilidadPeriodo from './pages/Informes/Parameters/ConceptosRentabilidadPeriodo';
import InformePendientes from './pages/Informes/FlotaRenta/InformePendientes';
import ControlAlzas from './pages/Informes/FlotaRenta/ControlAlzas';

//Impresión PDF
import ActivosRenta from "./pages/Informes/FlotaRenta/ActivosRenta/ActivosRenta";
import InformeSeguros from "./pages/Informes/FlotaRenta/InformeSeguros";
import InformeEquipos from "./pages/Informes/FlotaRenta/InformeEquipos";
import InformeOT from "./pages/Informes/FlotaRenta/InformeOT";
import InformeHojaVidaEquipos from "./pages/Informes/FlotaRenta/HojaVidaEquipo";
import InformeUbicacionesEquipos from "./pages/Informes/FlotaRenta/UbicacionesEquipos";
import InformeCalificacionOT from "./pages/Informes/FlotaRenta/CalificacionOT";
import ConfiabilidadMT from "./pages/Informes/FlotaRenta/ConfiabilidadMT";
import ListarMT from "./pages/Informes/FlotaRenta/ListarMT";

//Imagenes
import Images from "./pages/Images";

//Visualizar PDF's
import PdfContratos from "./pages/Pdfs/PdfContratos";

//Enviar Emails
import EnviarEmail from "./pages/EnviarEmail";
import EnviarEmailOTCliente from "./pages/EnviarEmail/EmailOTCliente";

//Error 404
import Error404 from "./pages/Error404";

//Rutas Dashboard
import Rentabilidad from "./pages/Dashboard/Rentabilidad";
import Facturacion from "./pages/Dashboard/Facturacion";
import DatosFacturacion from "./pages/Importar/ExportarDatosFacturacion";
import SubirFacturacion from "./pages/Importar/DatosFactContratosConsumos";
import CardsHeader from "./components/Dashboard/CardsHeader";
import Cards from "./components/Dashboard/Cards";
import Graphics from "./components/Dashboard/Graphics";
import GroupedBar from "./components/Dashboard/GroupedBar";

//Rutas Costos
import CostosVariables from "./pages/Costos/CostosVariables";
import TipoCostoVariable from "./pages/Costos/TipoCostoVariable";
import CostosRealesEquipos from "./pages/Costos/Informes/CostosRealesEquipos";
import CostosRealEquipoAcumulado from "./pages/Costos/Informes/CostosRealesEquipos/CostosRealEquipoAcumulado";
import ConsumosRepuestos from "./pages/Informes/FlotaRenta/InformeConsumosRepuestos";
import CostosContrataciones from "./pages/Informes/FlotaRenta/InformeContrataciones";

function Main(props) {
  const { metadata, componente, tipousuario, user, idUsu } = props;
  console.log("TIPO DE USUARIO EN MAIN : ", tipousuario)

  return (
    <>
      {
      (idUsu === 47 || idUsu === 48) ?
        <Error404 />
      :
      (
      !user
        ? <Auth />
        :
        <Router >
          <ThemeProvider theme={theme}>
            <AppNavbar metadata={metadata} />
            <Switch>
              {componente === "1" ?
                <Route path="/gim" component={Management} />
                :
                (
                  componente === "2" ?
                    <Route path="/gim" component={Rentabilidad} />
                    :
                    <Route path="/login" component={Login} />
                )
              }

              <Route path="/auth/registrarusuario" component={RegistrarUsuario} />
              <Route path="/auth/recuperarcontraseña" component={RecuperarContraseña} />
              <Route path="/login" component={Login} />
              <Route path="/auth/usuarios" component={Usuarios} />
              <Route path="/auth/activarusuario" component={ActivarUsuario} />
              <Route path="/components/loading" component={Loading} />

              <Route path="/parametros/paises" component={Paises} />
              <Route path="/parametros/regiones" component={Regiones} />
              <Route path="/parametros/empresa" component={Empresa} />
              <Route path="/parametros/departamentos" component={Departamentos} />
              <Route path="/parametros/ciudades" component={Ciudades} />
              <Route path="/parametros/estados" component={Estados} />
              <Route path="/parametros/unidades" component={Unidades} />
              <Route path="/parametros/monedas" component={Monedas} />

              <Route path="/interlocutores/tipointerlocutores" component={TipoInterlocutores} />
              <Route path="/interlocutores/especialidades" component={Especialidades} />
              <Route path="/interlocutores/proveedores" component={Proveedores} />
              <Route path="/interlocutores/clientes" component={Clientes} />
              <Route path="/interlocutores/empleados" component={Empleados} />
              <Route path="/interlocutores/contactos" component={Contactos} />

              <Route path="/almacenes/tiposalmacenes" component={TiposAlmacenes} />
              <Route path="/almacenes/lineasproductos" component={LineasProductos} />
              <Route path="/almacenes/crearalmacenes" component={CrearAlmacenes} />
              <Route path="/almacenes/inventarios" component={Inventarios} />

              <Route path="/mantenimiento/marcas" component={Marcas} />
              <Route path="/mantenimiento/tiposllantas" component={TiposLlantas} />
              <Route path="/mantenimiento/tiposequipos" component={TiposEquipos} />
              <Route path="/mantenimiento/estadosclientes" component={EstadosClientes} />
              <Route path="/mantenimiento/estadosmtto" component={EstadosMtto} />
              <Route path="/mantenimiento/estadoscalidad" component={EstadosCalidad} />
              <Route path="/mantenimiento/tiposfallas" component={TiposFallas} />
              <Route path="/mantenimiento/fallasmtto" component={FallasMtto} />
              <Route path="/mantenimiento/cambioelementos" component={CambioElementos} />
              <Route path="/mantenimiento/incrementocanon" component={IncrementoCanon} />
              <Route path="/mantenimiento/remisiones" component={Remisiones} />
              <Route path="/mantenimiento/contrataciones" component={ContratacionesMtto} />
              <Route path="/mantenimiento/repuestos" component={RepuestosMtto} />
              <Route path="/mantenimiento/gruposequipos" component={Gruposequipos} />
              <Route path="/mantenimiento/subgrupospartes" component={SubGrupospartes} />
              <Route path="/mantenimiento/clasificacionABC" component={ClasificacionABC} />
              <Route path="/mantenimiento/referencias" component={Referencias} />
              <Route path="/mantenimiento/frecuencias" component={Frecuencias} />
              <Route path="/mantenimiento/componentes" component={ComponentesxEquipo} />
              
              <Route path="/mantenimiento/equipos">
                <Equipos  metadata={metadata} idUsu={idUsu} />
              </Route>

              <Route path="/mantenimiento/accesorios">
                <Accesorios  metadata={metadata} idUsu={idUsu} />
              </Route>

              <Route path="/mantenimiento/bajasequiposhistoricos">
                <BajasEquiposHistoricos metadata={metadata} idUsu={idUsu} />
              </Route>
              <Route path="/mantenimiento/extrasequipos" component={ExtrasEquipos} />
              
              <Route path="/mantenimiento/tipogarantia" component={TipoGarantia} />
              <Route path="/mantenimiento/garantias" component={Garantias} />
              <Route path="/mantenimiento/contratos" component={Contratos} />
              <Route path="/mantenimiento/fichatecnica" component={FichaTecnica} />
              <Route path="/mantenimiento/ubicaciones" component={Ubicaciones} />
              <Route path="/mantenimiento/seguros" component={Seguros} />
              <Route path="/mantenimiento/datoshorometro" component={DatosHorometro} />
              <Route path="/mantenimiento/usuariosequipos" component={UsuariosEquipos} />

              <Route path="/gestionordenes/ordenes" component={LeeUsuarioOrdenes} />
              <Route path="/gestionordenes/crearordenes" component={CrearOrdenes} />
              <Route path="/gestionordenes/actividadrealizada" component={ActividadRealizada} />
              <Route path="/gestionordenes/registroactividadoperario" component={RegistroActividadOperario} />
              <Route path="/gestionordenes/actividadespendiente" component={ActividadesPendiente} />
              <Route path="/gestionordenes/gestionarpendientes">
                <GestionarPendientes  metadata={metadata} idUsu={idUsu} />
              </Route>

              <Route path="/mantenimiento/tiposmtto" component={Tiposmtto} />
              <Route path="/mantenimiento/tiposestados" component={TiposEstados} />
              <Route path="/mantenimiento/tipooperacion" component={TipoOperacion} />
              <Route path="/mantenimiento/tiposservicio" component={TiposServicio} />
              <Route path="/mantenimiento/topoactividad" component={TiposActividad} />

              <Route path="/listachequeo/panellistachequeo" component={PanelListaChequeo} />
              <Route path="/listachequeo/entregaequipos" component={EntregaEquipos} />
              <Route path="/listachequeo/recepcionequipos" component={RecepcionEquipos} />
              <Route path="/listachequeo/recepcionalmacen" component={RecepcionAlmacen} />

              <Route path="/activos/areas" component={Areas} />
              <Route path="/activos/cencostos" component={Cencostos} />
              <Route path="/activos/plandecuentas" component={PlandeCuentas} />
              <Route path="/activos/activos">
                <Activos  metadata={metadata} idUsu={idUsu} />
              </Route>
              <Route path="/activos/depreciacion" component={Depreciacion} />
              <Route path="/activos/exportardepreciacion" component={ExportarDepreciacion} />
              <Route path="/activos/exportaractivos" component={ExportarActivos} />

              <Route path="/pdf/imprimirotcliente">
                <ImprimirOTCliente  metadata={metadata} idUsu={idUsu} />
              </Route>
              <Route path="/pdf/imprimirotchequeo" component={ImprimirOTChequeo} />
              <Route path="/pdf/PrincipalPDF" component={PrincipalPDF} />
              <Route path="/pdf/Pdf" component={Pdf} />

              <Route path="/pdf/imprimirremision" component={ImprimirRemision} />
              <Route path="/pdf/imprimircambioelemento" component={ImprimirCambioElemento} />
              <Route path="/pdf/imprimirincrementocanon" component={ImprimirIncrementoCanon} />

              <Route path="/importar/inventariosalmacen" component={InventariosAlmacen} />
              <Route path="/importar/contrataciones" component={Contrataciones} />
              <Route path="/importar/repuestos" component={Repuestos} />

              <Route path="/rentabilidad/conceptosrentabilidad" component={ConceptosRentabilidad} />
              <Route path="/rentabilidad/conceptosrentabilidadperiodo" component={ConceptosRentabilidadPeriodo} />

              <Route path="/costos/costosvariables" component={CostosVariables} />
              <Route path="/costos/tipocostovariable" component={TipoCostoVariable} />
              <Route path="/costos/costorealperiodo" component={CostosRealesEquipos} />
              <Route path="/costos/costorealequipoacumulado" component={CostosRealEquipoAcumulado} />
              <Route path="/costos/consumosrepuestos" component={ConsumosRepuestos} />
              <Route path="/costos/contrataciones" component={CostosContrataciones} />
              
              <Route path="/flotarenta/activosrenta" component={ActivosRenta} />
              <Route path="/flotarenta/informeseguros" component={InformeSeguros} />
              <Route path="/flotarenta/informeequipos" component={InformeEquipos} />
              <Route path="/flotarenta/informeot" component={InformeOT} />
              <Route path="/flotarenta/informependientes" component={InformePendientes} />
              <Route path="/flotarenta/informehojavidaequipos" component={InformeHojaVidaEquipos} />
              <Route path="/flotarenta/informeubicacionesequipos" component={InformeUbicacionesEquipos} />
              <Route path="/flotarenta/calificacionot" component={InformeCalificacionOT} />
              <Route path="/flotarenta/controlalzas" component={ControlAlzas} />
              <Route path="/flotarenta/confiabilidadMT" component={ConfiabilidadMT} />
              <Route path="/flotarenta/listarMT" component={ListarMT } />

              <Route path="/rentabilidad/cardsheader" component={CardsHeader} />
              <Route path="/rentabilidad/cards" component={Cards} />
              <Route path="/rentabilidad/graphics" component={Graphics} />
              <Route path="/rentabilidad/groupedbar" component={GroupedBar} />

              <Route path="/rentabilidad/facturacion" component={Facturacion} />
              <Route path="/importar/datosfacturacion" component={DatosFacturacion} />
              <Route path="/importar/subirfacturacion" component={SubirFacturacion} />
              <Route path="/images/images" component={Images} />
              <Route path="/pdfs/pdfcontratos" component={PdfContratos} />

              <Route path="/email/enviaremail" component={EnviarEmail} />
              <Route path="/email/enviaremailotcliente" component={EnviarEmailOTCliente} />

            </Switch>
          </ThemeProvider>
        </Router>
      )
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        puaseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default Main;

//  <Route path="/parametros/paises" component={Paises}/>
