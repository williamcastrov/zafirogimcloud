<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/employee/listar_empleados', 'App\Http\Controllers\API\EmployeeController@list');

Route::get('/pruebas/listar_pruebas', 'App\Http\Controllers\API\Parameters\PruebaController@listar_pruebas');
Route::post('/pruebas/create', 'App\Http\Controllers\API\Parameters\PruebaController@create');
Route::get('/pruebas/get/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@get');
Route::delete('/pruebas/delete/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@delete');
Route::put('/pruebas/update/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@update');

// Rutas definidas para los Parametros del Sistema
Route::get('/pruebas/listar_pruebas', 'App\Http\Controllers\API\Parameters\PruebaController@listar_pruebas');
Route::post('/pruebas/create', 'App\Http\Controllers\API\Parameters\PruebaController@create');
Route::get('/pruebas/get/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@get');
Route::delete('/pruebas/delete/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@delete');
Route::put('/pruebas/update/{id}', 'App\Http\Controllers\API\Parameters\PruebaController@update');

// Rutas definidas para los Parametros del Sistema
Route::get('/paises/listar_paises', 'App\Http\Controllers\API\Parameters\PaisesController@listar_paises');
Route::post('/paises/create', 'App\Http\Controllers\API\Parameters\PaisesController@create');
Route::get('/paises/get/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@get');
Route::delete('/paises/delete/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@delete');
Route::put('/paises/update/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@update');

Route::get('/regiones/listar_regiones', 'App\Http\Controllers\API\Parameters\RegionesController@listar_regiones');
Route::post('/regiones/create', 'App\Http\Controllers\API\Parameters\RegionesController@create');
Route::get('/regiones/get/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@get');
Route::delete('/regiones/delete/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@delete');
Route::put('/regiones/update/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@update');

Route::get('/departamentos/listar_departamentos', 'App\Http\Controllers\API\Parameters\DepartamentosController@listar_departamentos');
Route::post('/departamentos/create', 'App\Http\Controllers\API\Parameters\DepartamentosController@create');
Route::get('/departamentos/get/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@get');
Route::delete('/departamentos/delete/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@delete');
Route::put('/departamentos/update/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@update');

Route::get('/ciudades/listar_ciudades', 'App\Http\Controllers\API\Parameters\CiudadesController@listar_ciudades');
Route::post('/ciudades/create', 'App\Http\Controllers\API\Parameters\CiudadesController@create');
Route::get('/ciudades/get/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@get');
Route::delete('/ciudades/delete/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@delete');
Route::put('/ciudades/update/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@update');

Route::get('/unidades/listar_unidades', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_unidades');
Route::get('/unidades/listar_tipopartes', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipopartes');
Route::get('/unidades/listar_tipoequipos', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipoequipos');
Route::get('/unidades/listar_tipousuarios', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_tipousuarios');
Route::post('/unidades/create', 'App\Http\Controllers\API\Parameters\UnidadesController@create');
Route::get('/unidades/get/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@get');
Route::delete('/unidades/delete/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@delete');
Route::put('/unidades/update/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@update');

Route::get('/estados/listar_estados', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estados');
Route::get('/estados/listar_estadosgenerales', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosgenerales');
Route::get('/estados/listar_estadospendientes', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadospendientes');
Route::get('/estados/listar_estadosOT', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosOT');
Route::get('/estados/listar_estadoscontratos', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadoscontratos');
Route::get('/estados/listar_estadosseguros', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosseguros');
Route::get('/estados/listar_estadosequipos', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosequipos');
Route::get('/estados/listar_estadosequipooperacion', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estadosequipooperacion');
Route::post('/estados/create', 'App\Http\Controllers\API\Parameters\EstadosController@create');
Route::get('/estados/get/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@get');
Route::delete('/estados/delete/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@delete');
Route::put('/estados/update/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@update');

Route::get('/monedas/listar_monedas', 'App\Http\Controllers\API\Parameters\MonedasController@listar_monedas');
Route::post('/monedas/create', 'App\Http\Controllers\API\Parameters\MonedasController@create');
Route::get('/monedas/get/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@get');
Route::delete('/monedas/delete/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@delete');
Route::put('/monedas/update/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@update');

Route::get('/empresa/listar_empresa', 'App\Http\Controllers\API\Parameters\EmpresaController@listar_empresa');
Route::post('/empresa/create', 'App\Http\Controllers\API\Parameters\EmpresaController@create');
Route::get('/empresa/get/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@get');
Route::delete('/empresa/delete/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@delete');
Route::put('/empresa/update/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@update');

// Rutas Gestión Interlocutores
Route::get('/tipointerlocutor/listar_tipointerlocutor', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@listar_tipointerlocutor');
Route::post('/tipointerlocutor/create', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@create');
Route::get('/tipointerlocutor/get/{id}', 'App\Http\Controllers\API\v\TipoInterlocutoresController@get');
Route::delete('/tipointerlocutor/delete/{id}', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@delete');
Route::put('/tipointerlocutor/update/{id}', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@update');

Route::get('/especialidad/listar_especialidades', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@listar_especialidades');
Route::post('/especialidad/create', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@create');
Route::get('/especialidad/get/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@get');
Route::delete('/especialidad/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@delete');
Route::put('/especialidad/update/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@update');

Route::get('/proveedores/listar_proveedores', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@listar_proveedores');
Route::get('proveedores/listar_prestadoresservmtto', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@listar_prestadoresservmtto');
Route::post('/proveedores/create', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@create');
Route::get('/proveedores/get/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@get');
Route::delete('/proveedores/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@delete');
Route::put('/proveedores/update/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@update');

Route::get('/clientes/listar_clientes', 'App\Http\Controllers\API\Interlocutores\ClientesController@listar_clientes');
Route::post('/clientes/create', 'App\Http\Controllers\API\Interlocutores\ClientesController@create');
Route::get('/clientes/get/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@get');
Route::delete('/clientes/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@delete');
Route::put('/clientes/update/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@update');

Route::get('/empleados/listar_empleados', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleados');
Route::get('/empleados/listar_empleadosOT', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleadosOT');
Route::get('/empleados/listar_empleadoscomercial', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleadoscomercial');
Route::post('/empleados/create', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@create');
Route::get('/empleados/get/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@get');
Route::delete('/empleados/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@delete');
Route::put('/empleados/update/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@update');

Route::get('/contactos/listar_contactos', 'App\Http\Controllers\API\Interlocutores\ContactosController@listar_contactos');
Route::post('/contactos/create', 'App\Http\Controllers\API\Interlocutores\ContactosController@create');
Route::get('/contactos/get/{id}', 'App\Http\Controllers\API\Interlocutores\ContactosController@get');
Route::get('/contactos/contactosinterlocutor/{id}', 'App\Http\Controllers\API\Interlocutores\ContactosController@contactosinterlocutor');
Route::get('/contactos/contactosclientes/{id}', 'App\Http\Controllers\API\Interlocutores\ContactosController@contactosclientes');
Route::delete('/contactos/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ContactosController@delete');
Route::put('/contactos/update/{id}', 'App\Http\Controllers\API\Interlocutores\ContactosController@update');

// Rutas Gestión Usuarios
Route::get('/usuarios/listar_usuarios', 'App\Http\Controllers\API\UsuariosController@listar_usuarios');
Route::get('/usuarios/listar_usuariosservicios', 'App\Http\Controllers\API\UsuariosController@listar_usuariosservicios');
Route::get('/usuarios/leer_usuario/{id}', 'App\Http\Controllers\API\UsuariosController@leer_usuario');
Route::post('/usuarios/create', 'App\Http\Controllers\API\UsuariosController@create');
Route::get('/usuarios/get/{id}', 'App\Http\Controllers\API\UsuariosController@get');
Route::get('/usuarios/habilitaralertas/{id}', 'App\Http\Controllers\API\UsuariosController@habilitaralertas');
Route::get('/usuarios/habilitarindicadores/{id}', 'App\Http\Controllers\API\UsuariosController@habilitarindicadores');
Route::put('/usuarios/update/{id}', 'App\Http\Controllers\API\UsuariosController@update');
Route::delete('/usuarios/delete/{id}', 'App\Http\Controllers\API\UsuariosController@delete');

Route::get('/dashboard/listar_dashboard', 'App\Http\Controllers\API\DashboardController@listar_dashboard');

// Rutas Gestión Almacenes
Route::get('/tiposalmacenes/listar_tiposalmacenes', 'App\Http\Controllers\API\Almacenes\TipoAlmacenController@listar_tiposalmacenes');
Route::post('/tiposalmacenes/create', 'App\Http\Controllers\API\Almacenes\TipoAlmacenController@create');
Route::get('/tiposalmacenes/get/{id}', 'App\Http\Controllers\API\Almacenes\TipoAlmacenController@get');
Route::delete('/tiposalmacenes/delete/{id}', 'App\Http\Controllers\API\Almacenes\TipoAlmacenController@delete');
Route::put('/tiposalmacenes/update/{id}', 'App\Http\Controllers\API\Almacenes\TipoAlmacenController@update');

Route::get('/tiposproductos/listar_tiposproductos', 'App\Http\Controllers\API\Almacenes\TiposProductosController@listar_tiposproductos');
Route::post('/tiposproductos/create', 'App\Http\Controllers\API\Almacenes\TiposProductosController@create');
Route::get('/tiposproductos/get/{id}', 'App\Http\Controllers\API\Almacenes\TiposProductosController@get');
Route::delete('/tiposproductos/delete/{id}', 'App\Http\Controllers\API\Almacenes\TiposProductosController@delete');
Route::put('/tiposproductos/update/{id}', 'App\Http\Controllers\API\Almacenes\TiposProductosController@update');

Route::get('/almacenes/listar_almacenes', 'App\Http\Controllers\API\Almacenes\AlmacenesController@listar_almacenes');
Route::post('/almacenes/create', 'App\Http\Controllers\API\Almacenes\AlmacenesController@create');
Route::get('/almacenes/get/{id}', 'App\Http\Controllers\API\Almacenes\AlmacenesController@get');
Route::delete('/almacenes/delete/{id}', 'App\Http\Controllers\API\Almacenes\AlmacenesController@delete');
Route::put('/almacenes/update/{id}', 'App\Http\Controllers\API\Almacenes\AlmacenesController@update');

Route::get('/inventarios/listar_saldosalmacen', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_saldosalmacen');
Route::get('/inventarios/listar_referenciainventarios', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_referenciainventarios');
Route::get('/inventarios/listar_inventarios', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_inventarios');
Route::post('/inventarios/create', 'App\Http\Controllers\API\Almacenes\InventariosController@create');
Route::get('/inventarios/get/{id}', 'App\Http\Controllers\API\Almacenes\InventariosController@get');
Route::delete('/inventarios/delete/{id}', 'App\Http\Controllers\API\Almacenes\InventariosController@delete');
Route::put('/inventarios/update/{id}', 'App\Http\Controllers\API\Almacenes\InventariosController@update');

//Importar Inventarios
Route::post('/inventarios/importarinventario', 'App\Http\Controllers\API\Almacenes\ImportarInventariosController@importarinventario');

Route::post('/contrataciones/importarcontrataciones', 'App\Http\Controllers\API\Importar\ContratacionesController@importarcontrataciones');
Route::get('/contrataciones/listar_contrataciones', 'App\Http\Controllers\API\Importar\ContratacionesController@listar_contrataciones');
Route::get('/contrataciones/listar_consolidadocontra', 'App\Http\Controllers\API\Importar\ContratacionesController@listar_consolidadocontra');
Route::get('/contrataciones/listar_contratacionesmesequipo/{id}', 'App\Http\Controllers\API\Importar\ContratacionesController@listar_contratacionesmesequipo');
Route::get('/contrataciones/paretoconsolidadocontra/{id}', 'App\Http\Controllers\API\Importar\ContratacionesController@paretoconsolidadocontra');
Route::get('/contrataciones/consolidadocontrames/{id}', 'App\Http\Controllers\API\Importar\ContratacionesController@consolidadocontrames');
Route::get('/contrataciones/get/{id}', 'App\Http\Controllers\API\Importar\ContratacionesController@get');
Route::get('/contrataciones/listar_contratacionesperiodo/{id}', 'App\Http\Controllers\API\Importar\ContratacionesController@listar_contratacionesperiodo');

Route::post('/consumos/importarconsumosrepuestos', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@importarconsumosrepuestos');
Route::get('/consumos/listar_consumosrepuestos', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@listar_consumosrepuestos');
Route::get('/consumos/listar_consolidaconsrep', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@listar_consolidaconsrep');
Route::get('/consumos/paretoconsolidadoconsumosrep/{id}', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@paretoconsolidadoconsumosrep');
Route::get('/consumos/consolidadoconsumosrepmes/{id}', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@consolidadoconsumosrepmes');
Route::get('/consumos/listar_consumosmesequipo/{id}', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@listar_consumosmesequipo');
Route::get('/consumos/get/{id}', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@get');
Route::get('/consumos/listar_consumosrepuestosperiodo/{id}', 'App\Http\Controllers\API\Importar\ConsumosRepuestosController@listar_consumosrepuestosperiodo');

Route::post('/facturacion/importarfacturacion', 'App\Http\Controllers\API\Importar\FacturacionController@importarfacturacion');
Route::get('/facturacion/listar_facturacion', 'App\Http\Controllers\API\Importar\FacturacionController@listar_facturacion');
Route::get('/facturacion/listar_factconsoequipo', 'App\Http\Controllers\API\Importar\FacturacionController@listar_factconsoequipo');
Route::get('/facturacion/listar_factconsomes', 'App\Http\Controllers\API\Importar\FacturacionController@listar_factconsomes');
Route::get('/facturacion/listar_factmesequipo/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@listar_factmesequipo');
Route::get('/facturacion/listar_factperiodo/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@listar_factperiodo');
Route::get('/facturacion/leerfactcodigomes/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@leerfactcodigomes');
Route::get('/facturacion/listar_factmes/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@listar_factmes');
Route::get('/facturacion/get/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@get');
Route::put('/facturacion/update/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@update');
Route::post('/facturacion/create', 'App\Http\Controllers\API\Importar\FacturacionController@create');
Route::put('/facturacion/itemfacturado/{id}', 'App\Http\Controllers\API\Importar\FacturacionController@itemfacturado');

// Rutas Gestión Mantenimiento
Route::get('/marcas/listar_marcas', 'App\Http\Controllers\API\Mantenimiento\MarcasController@listar_marcas');
Route::post('/marcas/create', 'App\Http\Controllers\API\Mantenimiento\MarcasController@create');
Route::get('/marcas/get/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@get');
Route::delete('/marcas/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@delete');
Route::put('/marcas/update/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@update');

Route::get('/componentes/listar_componentesxequipos', 'App\Http\Controllers\API\Mantenimiento\ComponentesEquiposController@listar_componentesxequipos');
Route::post('/componentes/create', 'App\Http\Controllers\API\Mantenimiento\ComponentesEquiposController@create');
Route::get('/componentes/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ComponentesEquiposController@get');
Route::delete('/componentes/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ComponentesEquiposController@delete');
Route::put('/componentes/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ComponentesEquiposController@update');

Route::get('/inventarioequipo/listar_inventarioequipo', 'App\Http\Controllers\API\Mantenimiento\InventarioEquipoController@listar_inventarioequipo');
Route::post('/inventarioequipo/create', 'App\Http\Controllers\API\Mantenimiento\InventarioEquipoController@create');
Route::get('/inventarioequipo/get/{id}', 'App\Http\Controllers\API\Mantenimiento\InventarioEquipoController@get');
Route::delete('/inventarioequipo/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\InventarioEquipoController@delete');
Route::put('/inventarioequipo/update/{id}', 'App\Http\Controllers\API\Mantenimiento\InventarioEquipoController@update');

Route::get('/datoshorometro/listar_datoshorometro', 'App\Http\Controllers\API\Mantenimiento\DatosHorometroController@listar_datoshorometro');
Route::post('/datoshorometro/create', 'App\Http\Controllers\API\Mantenimiento\DatosHorometroController@create');
Route::get('/datoshorometro/get/{id}', 'App\Http\Controllers\API\Mantenimiento\DatosHorometroController@get');
Route::delete('/datoshorometro/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\DatosHorometroController@delete');
Route::put('/datoshorometro/update/{id}', 'App\Http\Controllers\API\Mantenimiento\DatosHorometroController@update');

Route::get('/estadosclientes/listar_estadosclientes', 'App\Http\Controllers\API\Mantenimiento\EstadosClienteController@listar_estadosclientes');
Route::post('/estadosclientes/create', 'App\Http\Controllers\API\Mantenimiento\EstadosClienteController@create');
Route::get('/estadosclientes/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosClienteController@get');
Route::delete('/estadosclientes/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosClienteController@delete');
Route::put('/estadosclientes/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosClienteController@update');

Route::get('/estadoscalidad/listar_estadoscalidad', 'App\Http\Controllers\API\Mantenimiento\EstadosCalidadController@listar_estadoscalidad');
Route::post('/estadoscalidad/create', 'App\Http\Controllers\API\Mantenimiento\EstadosCalidadController@create');
Route::get('/estadoscalidad/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosCalidadController@get');
Route::delete('/estadoscalidad/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosCalidadController@delete');
Route::put('/estadoscalidad/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosCalidadController@update');

Route::get('/estadosmtto/listar_estadosmtto', 'App\Http\Controllers\API\Mantenimiento\EstadosMttoController@listar_estadosmtto');
Route::post('/estadosmtto/create', 'App\Http\Controllers\API\Mantenimiento\EstadosMttoController@create');
Route::get('/estadosmtto/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosMttoController@get');
Route::delete('/estadosmtto/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosMttoController@delete');
Route::put('/estadosmtto/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EstadosMttoController@update');

Route::get('/gruposequipos/listar_gruposequipos', 'App\Http\Controllers\API\Mantenimiento\GruposEquiposController@listar_gruposequipos');
Route::post('/gruposequipos/create', 'App\Http\Controllers\API\Mantenimiento\GruposEquiposController@create');
Route::get('/gruposequipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\GruposEquiposController@get');
Route::delete('/gruposequipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\GruposEquiposController@delete');
Route::put('/gruposequipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\GruposEquiposController@update');

Route::get('/subgrupospartes/listar_subgrupospartes', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@listar_subgrupospartes');
Route::get('/subgrupospartes/listar_subgrupospartesequipos', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@listar_subgrupospartesequipos');
Route::get('/subgrupospartes/listar_subgrupospartescomponentes', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@listar_subgrupospartescomponentes');
Route::get('/subgrupospartes/listar_consecutivocontratos', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@listar_consecutivocontratos');
Route::get('/subgrupospartes/listar_consecutivoseguros', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@listar_consecutivoseguros');
Route::post('/subgrupospartes/create', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@create');
Route::get('/subgrupospartes/get/{id}', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@get');
Route::delete('/subgrupospartes/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@delete');
Route::put('/subgrupospartes/update/{id}', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@update');
Route::put('/subgrupospartes/actualizaconsecutivo/{id}', 'App\Http\Controllers\API\Mantenimiento\SubGruposPartesController@actualizaconsecutivo');

Route::get('/tiposfallas/listar_tiposfallas', 'App\Http\Controllers\API\Mantenimiento\TiposFallasController@listar_tiposfallas');
Route::post('/tiposfallas/create', 'App\Http\Controllers\API\Mantenimiento\TiposFallasController@create');
Route::get('/tiposfallas/get/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposFallasController@get');
Route::delete('/tiposfallas/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposFallasController@delete');
Route::put('/tiposfallas/update/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposFallasController@update');

Route::get('/fallasmtto/listar_fallasmtto', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@listar_fallasmtto');
Route::get('/fallasmtto/leerfallatipo/{id}', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@leerfallatipo');
Route::post('/fallasmtto/create', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@create');
Route::get('/fallasmtto/get/{id}', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@get');
Route::delete('/fallasmtto/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@delete');
Route::put('/fallasmtto/update/{id}', 'App\Http\Controllers\API\Mantenimiento\FallasMttoController@update');

Route::get('/frecuencias/listar_frecuencias', 'App\Http\Controllers\API\Mantenimiento\FrecuenciasController@listar_frecuencias');
Route::post('/frecuencias/create', 'App\Http\Controllers\API\Mantenimiento\FrecuenciasController@create');
Route::get('/frecuencias/get/{id}', 'App\Http\Controllers\API\Mantenimiento\FrecuenciasController@get');
Route::delete('/frecuencias/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\FrecuenciasController@delete');
Route::put('/frecuencias/update/{id}', 'App\Http\Controllers\API\Mantenimiento\FrecuenciasController@update');

Route::get('/clasificacionabc/listar_clasificacionabc', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@listar_clasificacionabc');
Route::post('/clasificacionabc/create', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@create');
Route::get('/clasificacionabc/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@get');
Route::delete('/clasificacionabc/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@delete');
Route::put('/clasificacionabc/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@update');

Route::get('/remision/listar_remision', 'App\Http\Controllers\API\Mantenimiento\RemisionController@listar_remision');
Route::post('/remision/create', 'App\Http\Controllers\API\Mantenimiento\RemisionController@create');
Route::get('/remision/get/{id}', 'App\Http\Controllers\API\Mantenimiento\RemisionController@get');
Route::delete('/remision/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\RemisionController@delete');
Route::put('/remision/update/{id}', 'App\Http\Controllers\API\Mantenimiento\RemisionController@update');

Route::get('/cambioelementos/listar_cambioelementos', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@listar_cambioelementos');
Route::post('/cambioelementos/create', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@create');
Route::get('/cambioelementos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@get');
Route::delete('/cambioelementos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@delete');
Route::put('/cambioelementos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@update');
Route::get('/cambioelementos/generarPdf/{id}', 'App\Http\Controllers\API\Mantenimiento\CambioElementosController@generarPdf');

Route::get('/incremento/listar_incrementocanon', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@listar_incrementocanon');
Route::post('/incremento/create', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@create');
Route::get('/incremento/get/{id}', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@get');
Route::delete('/incremento/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@delete');
Route::put('/incremento/update/{id}', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@update');

Route::get('/referencias/listar_referencias', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@listar_referencias');
Route::post('/referencias/create', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@create');
Route::get('/referencias/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@get');
Route::delete('/referencias/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@delete');
Route::put('/referencias/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@update');

Route::get('/equipos/listar_equipos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_equipos');
Route::get('/equipos/leerultimoequipo', 'App\Http\Controllers\API\Mantenimiento\EquiposController@leerultimoequipo');
Route::get('/equipos/listar_reporteequipos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_reporteequipos');
Route::get('/equipos/listar_bajasequiposhistoricos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_bajasequiposhistoricos');
Route::get('/equipos/listar_equiposmontacargas', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_equiposmontacargas');
Route::get('/equipos/listar_equiposmontacargasusuario', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_equiposmontacargasusuario');
Route::get('/equipos/listar_alertasestadosequipos/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_alertasestadosequipos');
Route::get('/equipos/sumatotalequipos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@sumatotalequipos');
Route::get('/equipos/detalleequipos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@detalleequipos');
Route::get('/equipos/listar_activosrenta', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_activosrenta');
Route::get('/equipos/listar_activosasegurados', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_activosasegurados');
Route::get('/equipos/listar_equiposaccesorios', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_equiposaccesorios');
Route::post('/equipos/create', 'App\Http\Controllers\API\Mantenimiento\EquiposController@create');
Route::get('/equipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@get');
Route::get('/equipos/fecharetornaequipo/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@fecharetornaequipo');
Route::delete('/equipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@delete');
Route::put('/equipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@update');
Route::get('/equipos/informecomfiabilidad', 'App\Http\Controllers\API\Mantenimiento\EquiposController@informecomfiabilidad');
Route::get('/equipos/totalcorrectivomtperiodo', 'App\Http\Controllers\API\Mantenimiento\EquiposController@totalcorrectivomtperiodo');
Route::get('/equipos/listar_combogrupoequipo/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_combogrupoequipo');

Route::get('/extrasequipos/listar_extrasequipos', 'App\Http\Controllers\API\Mantenimiento\ExtrasEquiposController@listar_extrasequipos');
Route::post('/extrasequipos/create', 'App\Http\Controllers\API\Mantenimiento\ExtrasEquiposController@create');
Route::get('/extrasequipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ExtrasEquiposController@get');
Route::delete('/extrasequipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ExtrasEquiposController@delete');
Route::put('/extrasequipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ExtrasEquiposController@update');

// Rutas Gestión Datos Adicionales de los Equipos
Route::get('/datosequipos/listar_datosequipos', 'App\Http\Controllers\API\DatosEquipos\DatosEquiposController@listar_datosequipos');
Route::post('/datosequipos/create', 'App\Http\Controllers\API\DatosEquipos\DatosEquiposController@create');
Route::get('/datosequipos/get/{id}', 'App\Http\Controllers\API\DatosEquipos\DatosEquiposController@get');
Route::delete('/datosequipos/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\DatosEquiposController@delete');
Route::put('/datosequipos/update/{id}', 'App\Http\Controllers\API\DatosEquipos\DatosEquiposController@update');

Route::get('/tipogarantia/listar_tipogarantia', 'App\Http\Controllers\API\DatosEquipos\TipoGarantiaController@listar_tipogarantia');
Route::post('/tipogarantia/create', 'App\Http\Controllers\API\DatosEquipos\TipoGarantiaController@create');
Route::get('/tipogarantia/get/{id}', 'App\Http\Controllers\API\DatosEquipos\TipoGarantiaController@get');
Route::delete('/tipogarantia/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\TipoGarantiaController@delete');
Route::put('/tipogarantia/update/{id}', 'App\Http\Controllers\API\DatosEquipos\TipoGarantiaController@update');

Route::get('/garantias/listar_garantias', 'App\Http\Controllers\API\DatosEquipos\GarantiasController@listar_garantias');
Route::post('/garantias/create', 'App\Http\Controllers\API\DatosEquipos\GarantiasController@create');
Route::get('/garantias/get/{id}', 'App\Http\Controllers\API\DatosEquipos\GarantiasController@get');
Route::delete('/garantias/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\GarantiasController@delete');
Route::put('/garantias/update/{id}', 'App\Http\Controllers\API\DatosEquipos\GarantiasController@update');

Route::get('/contratos/listar_contratos', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_contratos');
Route::get('/contratos/listar_datosfacturacion/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_datosfacturacion');
Route::get('/contratos/listar_alertasestadoscontratos', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_alertasestadoscontratos');
Route::get('/contratos/listar_consoestcontratos/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_consoestcontratos');
Route::get('/contratos/listar_vencimientofecha', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_vencimientofecha');
Route::get('/contratos/listar_vencimientofacturas', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_vencimientofacturas');
Route::get('/contratos/listar_uncontrato/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_uncontrato');
Route::get('/contratos/leevalorcontratomes/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@leevalorcontratomes');
Route::post('/contratos/create', 'App\Http\Controllers\API\DatosEquipos\ContratosController@create');
Route::get('/contratos/get/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@get');
Route::get('/contratos/sumatotalcontratos', 'App\Http\Controllers\API\DatosEquipos\ContratosController@sumatotalcontratos');
Route::get('/contratos/listar_vencimientocontratos/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_vencimientocontratos');
Route::get('/contratos/listar_detallevencimientofacturas/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@listar_detallevencimientofacturas');
Route::delete('/contratos/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@delete');
Route::put('/contratos/contratofacturado/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@contratofacturado');
Route::put('/contratos/update/{id}', 'App\Http\Controllers\API\DatosEquipos\ContratosController@update');

Route::get('/fichatecnica/listar_fichatecnica', 'App\Http\Controllers\API\DatosEquipos\FichaTecnicaController@listar_fichatecnica');
Route::post('/fichatecnica/create', 'App\Http\Controllers\API\DatosEquipos\FichaTecnicaController@create');
Route::get('/fichatecnica/get/{id}', 'App\Http\Controllers\API\DatosEquipos\FichaTecnicaController@get');
Route::delete('/fichatecnica/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\FichaTecnicaController@delete');
Route::put('/fichatecnica/update/{id}', 'App\Http\Controllers\API\DatosEquipos\FichaTecnicaController@update');

Route::get('/tiposllantas/listar_tiposllantas', 'App\Http\Controllers\API\DatosEquipos\TiposLlantasController@listar_tiposllantas');
Route::post('/tiposllantas/create', 'App\Http\Controllers\API\DatosEquipos\TiposLlantasController@create');
Route::get('/tiposllantas/get/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposLlantasController@get');
Route::delete('/tiposllantas/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposLlantasController@delete');
Route::put('/tiposllantas/update/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposLlantasController@update');

Route::get('/tiposequipos/listar_tiposequipos', 'App\Http\Controllers\API\DatosEquipos\TiposEquiposController@listar_tiposequipos');
Route::post('/tiposequipos/create', 'App\Http\Controllers\API\DatosEquipos\TiposEquiposController@create');
Route::get('/tiposequipos/get/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposEquiposController@get');
Route::delete('/tiposequipos/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposEquiposController@delete');
Route::put('/tiposequipos/update/{id}', 'App\Http\Controllers\API\DatosEquipos\TiposEquiposController@update');

Route::get('/ubicaciones/listar_ubicaciones', 'App\Http\Controllers\API\DatosEquipos\UbicacionesController@listar_ubicaciones');
Route::post('/ubicaciones/create', 'App\Http\Controllers\API\DatosEquipos\UbicacionesController@create');
Route::get('/ubicaciones/get/{id}', 'App\Http\Controllers\API\DatosEquipos\UbicacionesController@get');
Route::delete('/ubicaciones/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\UbicacionesController@delete');
Route::put('/ubicaciones/update/{id}', 'App\Http\Controllers\API\DatosEquipos\UbicacionesController@update');

Route::get('/seguros/listar_seguros', 'App\Http\Controllers\API\DatosEquipos\SegurosController@listar_seguros');
Route::post('/seguros/create', 'App\Http\Controllers\API\DatosEquipos\SegurosController@create');
Route::get('/seguros/get/{id}', 'App\Http\Controllers\API\DatosEquipos\SegurosController@get');
Route::delete('/seguros/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\SegurosController@delete');
Route::put('/seguros/update/{id}', 'App\Http\Controllers\API\DatosEquipos\SegurosController@update');

// Rutas Gestión Ordenes de Servicio
Route::get('/firmarot/listar_firmasOT/{id}', 'App\Http\Controllers\API\GestionOrdenes\FirmarOTController@listar_firmasOT');
Route::post('/firmarot/create', 'App\Http\Controllers\API\GestionOrdenes\FirmarOTController@create');
Route::delete('/firmarot/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\FirmarOTController@delete');
Route::put('/firmarot/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\FirmarOTController@update');

Route::get('/imagenesot/listar_imagenesot/{id}', 'App\Http\Controllers\API\GestionOrdenes\ImagenesOrdenesController@listar_imagenesot');
Route::post('/imagenesot/create', 'App\Http\Controllers\API\GestionOrdenes\ImagenesOrdenesController@create');
Route::delete('/imagenesot/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\ImagenesOrdenesController@delete');
Route::put('/imagenesot/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\ImagenesOrdenesController@update');

Route::get('/tiposmtto/listar_tiposmtto', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@listar_tiposmtto');
Route::get('/tiposmtto/listar_tiposmttoOT', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@listar_tiposmttoOT');
Route::get('/tiposmtto/listar_tiposmttoalistamiento', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@listar_tiposmttoalistamiento');
Route::post('/tiposmtto/create', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@create');
Route::get('/tiposmtto/get/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@get');
Route::delete('/tiposmtto/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@delete');
Route::put('/tiposmtto/update/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposmttoController@update');

Route::get('/tiposestados/listar_tiposestados', 'App\Http\Controllers\API\GestionOrdenes\TiposEstadosController@listar_tiposestados');
Route::post('/tiposestados/create', 'App\Http\Controllers\API\GestionOrdenes\TiposEstadosController@create');
Route::get('/tiposestados/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposEstadosController@get');
Route::delete('/tiposestados/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposEstadosController@delete');
Route::put('/tiposestados/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposEstadosController@update');

Route::get('/tipooperacion/listar_tipooperacion', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@listar_tipooperacion');
Route::get('/tipooperacion/listar_tipooperacionestados', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@listar_tipooperacionestados');
Route::get('/tipooperacion/listar_tipooperacionchequeo', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@listar_tipooperacionchequeo');
Route::post('/tipooperacion/create', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@create');
Route::get('/tipooperacion/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@get');
Route::delete('/tipooperacion/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@delete');
Route::put('/tipooperacion/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\TipoOperacionController@update');

Route::get('/actividadrealizada/listar_actividadrealizada', 'App\Http\Controllers\API\GestionOrdenes\ActividadRealizadaController@listar_actividadrealizada');
Route::post('/actividadrealizada/create', 'App\Http\Controllers\API\GestionOrdenes\ActividadRealizadaController@create');
Route::get('/actividadrealizada/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\ActividadRealizadaController@get');
Route::delete('/actividadrealizada/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\ActividadRealizadaController@delete');
Route::put('/actividadrealizada/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\ActividadRealizadaController@update');

Route::get('/tiposservicio/listar_tiposservicio', 'App\Http\Controllers\API\GestionOrdenes\TiposServicioController@listar_tiposservicio');
Route::post('/tiposservicio/create', 'App\Http\Controllers\API\GestionOrdenes\TiposServicioController@create');
Route::get('/tiposservicio/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposServicioController@get');
Route::delete('/tiposservicio/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposServicioController@delete');
Route::put('/tiposservicio/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\TiposServicioController@update');

Route::get('/ordenesserv/listar_ordenesserv', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesserv');
Route::get('/ordenesserv/listar_ordenesservcumplimiento', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservcumplimiento');
Route::get('/ordenesserv/listar_ordenesservusuario', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservusuario');
Route::get('/ordenesserv/listar_listarot', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_listarot');
Route::get('/ordenesserv/generarPdf/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@generarPdf');
Route::get('/mantenimiento/generarPdfAlza/{id}', 'App\Http\Controllers\API\Mantenimiento\IncrementoCanonController@generarPdfAlza');
Route::get('/ordenesserv/listar_ordenesservactivas', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservactivas');
Route::get('/ordenesserv/listar_ordenesservactivasusuario', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservactivasusuario');
Route::get('/ordenesserv/totalotactivas', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@totalotactivas');
Route::get('/ordenesserv/totalotprogramadas', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@totalotprogramadas');
Route::get('/ordenesserv/totalotrevision', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@totalotrevision');
Route::get('/ordenesserv/totalotmes/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@totalotmes');
Route::get('/ordenesserv/totalotterminadasmes', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@totalotterminadasmes');
Route::get('/ordenesserv/cumplimientotalotmes/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@cumplimientotalotmes');
Route::get('/ordenesserv/cumplimientootterminadasmes/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@cumplimientootterminadasmes');
Route::get('/ordenesserv/listar_ordenesservterminadas', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservterminadas');
Route::get('/ordenesserv/listar_ordenesservactivasrevision', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservactivasrevision');
Route::get('/ordenesserv/listar_ordenesservactivasrevisionusuario', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordenesservactivasrevisionusuario');
Route::get('/ordenesserv/listar_ordeneschequeo', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordeneschequeo');
Route::get('/ordenesserv/listar_ordeneschequeoactivas', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@listar_ordeneschequeoactivas');
Route::post('/ordenesserv/create', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@create');
Route::get('/ordenesserv/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@get');
Route::get('/ordenesserv/leerot/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@leerot');
Route::get('/ordenesserv/leeotmaquina/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@leeotmaquina');

Route::get('/ordenesserv/leeordentecnico/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@leeordentecnico');
Route::get('/ordenesserv/leetodasordentecnico/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@leetodasordentecnico');
Route::delete('/ordenesserv/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@delete');
Route::put('/ordenesserv/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@update');
Route::put('/ordenesserv/cancelar/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@cancelar');
Route::put('/ordenesserv/ordenprogramada/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@ordenprogramada');
Route::put('/ordenesserv/pasararevision/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@pasararevision');
Route::put('/ordenesserv/sumartiempoactividades/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@sumartiempoactividades');
Route::put('/ordenesserv/cerrarOT/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@cerrarOT');
Route::put('/ordenesserv/updateestadoasignado/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@updateestadoasignado');
Route::put('/ordenesserv/updatiempoparo/{id}', 'App\Http\Controllers\API\GestionOrdenes\OrdenesController@updatiempoparo');

Route::get('/cumplimiento/listar_cumplimiento', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@listar_cumplimiento');
Route::get('/cumplimiento/leerdatoshojadevida/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@leerdatoshojadevida');
Route::post('/cumplimiento/create', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@create');
Route::get('/cumplimiento/get/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@get');
Route::get('/cumplimiento/leeractividadesot/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@leeractividadesot');
Route::get('/cumplimiento/leeractividadesmaquina/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@leeractividadesmaquina');
Route::get('/cumplimiento/actividadesactivasxot/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@actividadesactivasxot');
Route::get('/cumplimiento/actividadestotalesxot/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@actividadestotalesxot');
Route::get('/cumplimiento/getoser/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@getoser');
Route::get('/cumplimiento/listar_actividadesotrevision', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@listar_actividadesotrevision');
Route::delete('/cumplimiento/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@delete');
Route::put('/cumplimiento/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@update');
Route::put('/cumplimiento/cerraractividad/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@cerraractividad');
Route::get('/cumplimiento/calificacionot/{id}', 'App\Http\Controllers\API\GestionOrdenes\CumplimientoOServController@calificacionot');

Route::get('/pendienteot/listar_pendienteOT/{id}', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@listar_pendienteOT');
Route::get('/pendienteot/listar_pendientes', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@listar_pendientes');
Route::post('/pendienteot/create', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@create');
Route::delete('/pendienteot/delete/{id}', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@delete');
Route::put('/pendienteot/update/{id}', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@update');
Route::get('/pendienteot/listar_pendientesinot', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@listar_pendientesinot');
Route::get('/pendienteot/listar_pendientesactivos', 'App\Http\Controllers\API\GestionOrdenes\PendienteOTController@listar_pendientesactivos');

// Rutas Administración Lista de Chequeo
Route::get('/inventarios/listar_chequeorecepcion', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_chequeorecepcion');
Route::get('/inventarios/listar_recepcionalmacen', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_recepcionalmacen');
Route::get('/inventarios/listar_chequeoentrega', 'App\Http\Controllers\API\Almacenes\InventariosController@listar_chequeoentrega');

// Rutas Administración Activos
Route::get('/areas/listar_areas', 'App\Http\Controllers\API\Activos\AreasController@listar_areas');
Route::post('/areas/create', 'App\Http\Controllers\API\Activos\AreasController@create');
Route::get('/areas/get/{id}', 'App\Http\Controllers\API\Activos\AreasController@get');
Route::delete('/areas/delete/{id}', 'App\Http\Controllers\API\Activos\AreasController@delete');
Route::put('/areas/update/{id}', 'App\Http\Controllers\API\Activos\AreasController@update');

Route::get('/cencostos/listar_cencostos', 'App\Http\Controllers\API\Activos\CencostoController@listar_cencostos');
Route::post('/cencostos/create', 'App\Http\Controllers\API\Activos\CencostoController@create');
Route::get('/cencostos/get/{id}', 'App\Http\Controllers\API\Activos\CencostoController@get');
Route::delete('/cencostos/delete/{id}', 'App\Http\Controllers\API\Activos\CencostoController@delete');
Route::put('/cencostos/update/{id}', 'App\Http\Controllers\API\Activos\CencostoController@update');

Route::get('/plandecuentas/listar_plandecuentas', 'App\Http\Controllers\API\Activos\PlandeCuentasController@listar_plandecuentas');
Route::post('/plandecuentas/create', 'App\Http\Controllers\API\Activos\PlandeCuentasController@create');
Route::get('/plandecuentas/get/{id}', 'App\Http\Controllers\API\Activos\PlandeCuentasController@get');
Route::delete('/plandecuentas/delete/{id}', 'App\Http\Controllers\API\Activos\PlandeCuentasController@delete');
Route::put('/plandecuentas/update/{id}', 'App\Http\Controllers\API\Activos\PlandeCuentasController@update');

Route::get('/usuariosequipos/listar_usuariosporequipo', 'App\Http\Controllers\API\Mantenimiento\EquiposUsuariosController@listar_usuariosporequipo');
Route::post('/usuariosequipos/create', 'App\Http\Controllers\API\Mantenimiento\EquiposUsuariosController@create');
Route::get('/usuariosequipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposUsuariosController@get');
Route::delete('/usuariosequipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposUsuariosController@delete');
Route::put('/usuariosequipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposUsuariosController@update');

Route::get('/activos/listar_activos', 'App\Http\Controllers\API\Activos\ActivosController@listar_activos');
Route::get('/activos/leeactivodepreciar/{id}', 'App\Http\Controllers\API\Activos\ActivosController@leeactivodepreciar');
Route::post('/activos/create', 'App\Http\Controllers\API\Activos\ActivosController@create');
Route::get('/activos/get/{id}', 'App\Http\Controllers\API\Activos\ActivosController@get');
Route::get('/activos/leeactivo/{id}', 'App\Http\Controllers\API\Activos\ActivosController@leeactivo');
Route::delete('/activos/delete/{id}', 'App\Http\Controllers\API\Activos\ActivosController@delete');
Route::put('/activos/update/{id}', 'App\Http\Controllers\API\Activos\ActivosController@update');
Route::put('/activos/actualizadepreactivos/{id}', 'App\Http\Controllers\API\Activos\ActivosController@actualizadepreactivos');
Route::get('/activos/validadepreciacionacumulada/{id}', 'App\Http\Controllers\API\Activos\ActivosController@validadepreciacionacumulada');

Route::get('/novedadesactivos/listar_novedadesactivos/{id}', 'App\Http\Controllers\API\Activos\NovedadesActivosController@listar_novedadesactivos');
Route::post('/novedadesactivos/create', 'App\Http\Controllers\API\Activos\NovedadesActivosController@create');
Route::put('/novedadesactivos/update/{id}', 'App\Http\Controllers\API\Activos\NovedadesActivosController@update');
Route::get('/novedadesactivos/get/{id}', 'App\Http\Controllers\API\Activos\NovedadesActivosController@get');
Route::delete('/novedadesactivos/delete/{id}', 'App\Http\Controllers\API\Activos\NovedadesActivosController@delete');

Route::get('/depreciacion/listar_depreciacion', 'App\Http\Controllers\API\Activos\DepreciacionController@listar_depreciacion');
Route::post('/depreciacion/create', 'App\Http\Controllers\API\Activos\DepreciacionController@create');
Route::get('/depreciacion/get/{id}', 'App\Http\Controllers\API\Activos\DepreciacionController@get');
Route::get('/depreciacion/validaperiododepreciacion/{id}', 'App\Http\Controllers\API\Activos\DepreciacionController@validaperiododepreciacion');
Route::delete('/depreciacion/delete/{id}', 'App\Http\Controllers\API\Activos\DepreciacionController@delete');
Route::put('/depreciacion/update/{id}', 'App\Http\Controllers\API\Activos\DepreciacionController@update');

Route::get('/rentabilidad/listar_conceptosrentabilidad', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@listar_conceptosrentabilidad');
Route::post('/rentabilidad/create', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@create');
Route::post('/rentabilidad/addconceprentabilidadperiodo', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@addconceprentabilidadperiodo');
Route::get('/rentabilidad/generarperiodorentabilidad/{id}', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@generarperiodorentabilidad');
Route::get('/rentabilidad/get/{id}', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@get');
Route::delete('/rentabilidad/delete/{id}', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@delete');
Route::put('/rentabilidad/update/{id}', 'App\Http\Controllers\API\Importar\ConceptosRentabilidadController@update');
Route::post('/rentabilidad/create', 'App\Http\Controllers\API\Importar\DatosFactContratosConsumosController@create');

Route::get('/rentabilidadperiodo/listar_rentabilidadperiodo', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@listar_rentabilidadperiodo');
Route::post('/rentabilidadperiodo/create', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@create');
Route::get('/rentabilidadperiodo/listar_rentabilidadperiodoequipo/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@listar_rentabilidadperiodoequipo');
Route::get('/rentabilidadperiodo/get/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@get');
Route::delete('/rentabilidadperiodo/delete/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@delete');
Route::put('/rentabilidadperiodo/consumorptorentabilidadperiodo/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@consumorptorentabilidadperiodo');
Route::put('/rentabilidadperiodo/update/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@update');
Route::get('/rentabilidadperiodo/listar_factcontratacionrepuestosperiodo/{id}', 'App\Http\Controllers\API\Importar\RentabilidadPeriodoController@listar_factcontratacionrepuestosperiodo');

// RUtas para administrar Costos Variables
Route::get('/costosvariables/listar_costosvariables', 'App\Http\Controllers\API\Costos\CostosVariablesController@listar_costosvariables');
Route::post('/costosvariables/create', 'App\Http\Controllers\API\Costos\CostosVariablesController@create');
Route::get('/costosvariables/get/{id}', 'App\Http\Controllers\API\Costos\CostosVariablesController@get');
Route::delete('/costosvariables/delete/{id}', 'App\Http\Controllers\API\Costos\CostosVariablesController@delete');
Route::put('/costosvariables/update/{id}', 'App\Http\Controllers\API\Costos\CostosVariablesController@update');

Route::get('/tipocostovariable/listar_tipocostovariable', 'App\Http\Controllers\API\Costos\TipoCostoVariableController@listar_tipocostovariable');
Route::post('/tipocostovariable/create', 'App\Http\Controllers\API\Costos\TipoCostoVariableController@create');
Route::get('/tipocostovariable/get/{id}', 'App\Http\Controllers\API\Costos\TipoCostoVariableController@get');
Route::delete('/tipocostovariable/delete/{id}', 'App\Http\Controllers\API\Costos\TipoCostoVariableController@delete');
Route::put('/tipocostovariable/update/{id}', 'App\Http\Controllers\API\Costos\TipoCostoVariableController@update');

Route::get('/informecostoreal/get/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@get');
Route::get('/informecostoreal/costosvariableanno/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@costosvariableanno');
Route::get('/informecostoreal/numeroequiposmes/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@numeroequiposmes');
Route::get('/informecostoreal/equipostotalesrenta', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@equipostotalesrenta');
Route::get('/informecostoreal/equipostotales', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@equipostotales');
Route::get('/informecostoreal/leeinformacionequipos/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@leeinformacionequipos');
Route::get('/informecostoreal/leeinformacionequiposmes/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@leeinformacionequiposmes');
Route::get('/informecostoreal/leeinformacionacumuladaequipos/{id}', 'App\Http\Controllers\API\Costos\InformesCostosRealesController@leeinformacionacumuladaequipos');

// RUtas para administrar Imagenes
Route::get('/imagenes/listar_imagenes/', 'App\Http\Controllers\API\Imagenes\ImagenesController@listar_imagenes');
Route::post('/imagenes/create', 'App\Http\Controllers\API\Imagenes\ImagenesController@create');
Route::get('/unidades/get/{id}', 'App\Http\Controllers\API\Parameters\ImagenesControllerController@get');
Route::delete('/unidades/delete/{id}', 'App\Http\Controllers\API\Parameters\ImagenesControllerController@delete');
Route::put('/unidades/update/{id}', 'App\Http\Controllers\API\Parameters\ImagenesControllerController@update');

Route::get('/pdfscontratos/listar_pdfscontratos/{id}', 'App\Http\Controllers\API\DatosEquipos\PdfsContratosController@listar_pdfscontratos');
Route::post('/pdfscontratos/create', 'App\Http\Controllers\API\DatosEquipos\PdfsContratosController@create');
Route::get('/pdfscontratos/get/{id}', 'App\Http\Controllers\API\DatosEquipos\PdfsContratosController@get');
Route::delete('/pdfscontratos/delete/{id}', 'App\Http\Controllers\API\DatosEquipos\PdfsContratosController@delete');
Route::put('/pdfscontratos/update/{id}', 'App\Http\Controllers\API\DatosEquipos\PdfsContratosController@update');

Route::get('/fotosequipos/listar_fotosequipos/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosEquiposController@listar_fotosequipos');
Route::post('/fotosequipos/create', 'App\Http\Controllers\API\Mantenimiento\FotosEquiposController@create');
Route::get('/fotosequipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosEquiposController@get');
Route::delete('/fotosequipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosEquiposController@delete');
Route::put('/fotosequipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosEquiposController@update');

Route::get('/fotosbajashistoricos/listar_fotosequipos/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosBajasHistoricosController@listar_fotosequipos');
Route::post('/fotosbajashistoricos/create', 'App\Http\Controllers\API\Mantenimiento\FotosBajasHistoricosController@create');
Route::get('/fotosbajashistoricos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosBajasHistoricosController@get');
Route::delete('/fotosbajashistoricos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosBajasHistoricosController@delete');
Route::put('/fotosbajashistoricos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\FotosBajasHistoricosController@update');

Route::get('/notificacionpendientes/listar_notificacionpendientes', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@listar_notificacionpendientes');
Route::get('/notificacionpendientes/listar_solicitonotificacionpendientes', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@listar_solicitonotificacionpendientes');
Route::get('/notificacionpendientes/listar_ingresonotificacionpendientes', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@listar_ingresonotificacionpendientes');
Route::get('/notificacionpendientes/listar_notificacionpendiente/{id}', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@listar_notificacionpendiente');
Route::post('/notificacionpendientes/create', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@create');
Route::delete('/notificacionpendientes/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@delete');
Route::put('/notificacionpendientes/update/{id}', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@update');
Route::put('/notificacionpendientes/actualizanotificacion/{id}', 'App\Http\Controllers\API\Mantenimiento\NotificacionPendientesController@actualizanotificacion');