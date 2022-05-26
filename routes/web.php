<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
   // return view('welcome');
   return redirect('gim');
});

Route::get('/gim', function () {
    return view('gim');
});

// Rutas de Logueo y Registro de Usuarios
Route::get('/login', 'App\Http\Controllers\GimController@index');
Route::get('/auth/registrarusuario', 'App\Http\Controllers\GimController@index');

Route::get('/auth/recuperarcontraseña', 'App\Http\Controllers\GimController@index');
Route::get('/auth/registrarusuario', 'App\Http\Controllers\GimController@index');
Route::get('/auth/usuarios', 'App\Http\Controllers\GimController@index');
Route::get('/auth/activarusuario', 'App\Http\Controllers\GimController@index');

Route::get('/parametros/pruebas', 'App\Http\Controllers\GimController@index');
Route::get('/components/loading', 'App\Http\Controllers\GimController@index');

// Rutas de las Opciones de Maestros del sistema
Route::get('/parametros/paises', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/empresa', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/regiones', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/departamentos', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/ciudades', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/unidades', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/monedas', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Interlocutores
Route::get('/interlocutores/tipointerlocutores', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/especialidades', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/proveedores', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/clientes', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/empleados', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/contactos', 'App\Http\Controllers\GimController@index');

// Rutas Gestion de Almacenes
Route::get('/almacenes/tiposalmacenes', 'App\Http\Controllers\GimController@index');
Route::get('/almacenes/crearalmacenes', 'App\Http\Controllers\GimController@index');
Route::get('/almacenes/lineasproductos', 'App\Http\Controllers\GimController@index');
Route::get('/almacenes/inventarios', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Mantenimiento
Route::get('/mantenimiento/marcas', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/datoshorometro', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/estadosclientes', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/inventarioequipo', 'App\Http\Controllers\API\GimController@index');
Route::get('/mantenimiento/estadosmtto', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/estadoscalidad', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/frecuencias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/gruposequipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/subgrupospartes', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/clasificacionABC', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposfallas', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/referencias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/equipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/bajasequiposhistoricos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/accesorios', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/extrasequipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/componentes', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/usuariosequipos', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo Gestion de Ordenes de Servicio
Route::get('/gestionordenes/ordenes', 'App\Http\Controllers\GimController@index');
Route::get('/gestionordenes/crearordenes', 'App\Http\Controllers\GimController@index');
Route::get('/gestionordenes/actividadrealizada', 'App\Http\Controllers\GimController@index');
Route::get('/gestionordenes/registroactividadoperario', 'App\Http\Controllers\GimController@index');
Route::get('/gestionordenes/gestionarpendientes', 'App\Http\Controllers\GimController@index');
Route::get('/gestionordenes/notificacionpendientes', 'App\Http\Controllers\GimController@index');

Route::get('/mantenimiento/tiposmtto', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/fallasmtto', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposestados', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tipooperacion', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposservicio', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/remisiones', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/cambioelementos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/contrataciones', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/repuestos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/incrementocanon', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/repuestos', 'App\Http\Controllers\GimController@index');


// Rutas de Datos Adicionales de los Equipos
Route::get('/mantenimiento/tipogarantia', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/garantias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/contratos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/fichatecnica', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposllantas', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposequipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/ubicaciones', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/seguros', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Lista de Chequeo Equipos
Route::get('/listachequeo/entregaequipos', 'App\Http\Controllers\GimController@index');
Route::get('/listachequeo/recepcionequipos', 'App\Http\Controllers\GimController@index');
Route::get('/listachequeo/recepcionalmacen', 'App\Http\Controllers\GimController@index');
Route::get('/listachequeo/panellistachequeo', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Activos
Route::get('/activos/areas', 'App\Http\Controllers\GimController@index');
Route::get('/activos/cencostos', 'App\Http\Controllers\GimController@index');
Route::get('/activos/plandecuentas', 'App\Http\Controllers\GimController@index');
Route::get('/activos/activos', 'App\Http\Controllers\GimController@index');
Route::get('/activos/novedadesactivos', 'App\Http\Controllers\GimController@index');
Route::get('/activos/depreciacion', 'App\Http\Controllers\GimController@index');
Route::get('/activos/exportardepreciacion', 'App\Http\Controllers\GimController@index');
Route::get('/activos/exportaractivos', 'App\Http\Controllers\GimController@index');

// Rutas Impresión de PDF
Route::get('/pdf/imprimirot', 'App\Http\Controllers\GimController@index');
Route::get('/pdf/imprimirotcliente', 'App\Http\Controllers\GimController@index');
Route::get('/pdf/imprimirotchequeo', 'App\Http\Controllers\GimController@index');
Route::get('/pdf/PrincipalPDF', 'App\Http\Controllers\GimController@index');
Route::get('pdf/imprimirremision', 'App\Http\Controllers\GimController@index');
Route::get('pdf/imprimircambioelemento', 'App\Http\Controllers\GimController@index');
Route::get('pdf/imprimirincrementocanon', 'App\Http\Controllers\GimController@index');

// Rutas Envio Emails
Route::get('/email/enviaremailotcliente', 'App\Http\Controllers\GimController@index');

// Rutas Importación de Archivos
Route::get('/importar/inventariosalmacen', 'App\Http\Controllers\GimController@index');
Route::get('/importar/contrataciones', 'App\Http\Controllers\GimController@index');
Route::get('/importar/repuestos', 'App\Http\Controllers\GimController@index');
Route::get('/importar/facturacion', 'App\Http\Controllers\GimController@index');
Route::get('/importar/datosfacturacion', 'App\Http\Controllers\GimController@index');
Route::get('/importar/subirfacturacion', 'App\Http\Controllers\GimController@index');

// Rutas Informes
Route::get('/flotarenta/activosrenta', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informeseguros', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informeequipos', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informeot', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informependientes', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/controlalzas', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informehojavidaequipos', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/informeubicacionesequipos', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/confiabilidadMT', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/calificacionot', 'App\Http\Controllers\GimController@index');
Route::get('/flotarenta/ListarMT', 'App\Http\Controllers\GimController@index');

Route::get('/rentabilidad/conceptosrentabilidad', 'App\Http\Controllers\GimController@index');
Route::get('/rentabilidad/conceptosrentabilidadperiodo', 'App\Http\Controllers\GimController@index');

// Rutas Costos
Route::get('/costos/costosvariables', 'App\Http\Controllers\GimController@index');
Route::get('/costos/tipocostovariable', 'App\Http\Controllers\GimController@index');
Route::get('/costos/costorealperiodo', 'App\Http\Controllers\GimController@index');
Route::get('/costos/costorealequipoacumulado', 'App\Http\Controllers\GimController@index');
Route::get('/costos/consumosrepuestos', 'App\Http\Controllers\GimController@index');
Route::get('/costos/contrataciones', 'App\Http\Controllers\GimController@index');

// Rutas Dashboard
Route::get('/dashboard/rentabilidad', 'App\Http\Controllers\GimController@index');

// Rutas Imagenes
Route::get('/images/images', 'App\Http\Controllers\GimController@index');

// Rutas Enviar Emails
Route::get('/email/enviaremail', 'App\Http\Controllers\GimController@index');

// Error 404
Route::get('/error/error404', 'App\Http\Controllers\GimController@index');



