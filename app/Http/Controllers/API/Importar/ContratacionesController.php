<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\Contrataciones;

class ContratacionesController extends Controller
{
    //
    public function importarcontrataciones(Request $request){

        try {
            $insert['id']           = $request['id'];
            $insert['anno']         = $request['anno'];
            $insert['mes']          = $request['mes'];
            $insert['periodo']      = $request['periodo'];
            $insert['cuenta']       = $request['cuenta'];
            $insert['nombrecuenta'] = $request['nombrecuenta'];
            $insert['nit']          = $request['nit'];
            $insert['nombrenit']    = $request['nombrenit'];
            $insert['documentoref'] = $request['documentoref'];
            $insert['codigo']       = $request['codigo'];
            $insert['fecha']        = $request['fecha'];
            $insert['documento']    = $request['documento'];
            $insert['detalle']      = $request['detalle'];
            $insert['centrocosto']  = $request['centrocosto'];
            $insert['costomtto']    = $request['costomtto'];
  
            Contrataciones::insert($insert);
    
            $response['message'] = "Contrataciones Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
      }
  
      public function listar_contrataciones(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM contrataciones as t0");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      
      public function listar_contratacionesperiodo($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM contrataciones as t0
            WHERE t0.periodo = $periodo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_consolidadocontra(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno, mes, documentoref, codigo, sum(costomtto) as valorcontratacion
            FROM contrataciones as t0
            GROUP BY anno, mes, documentoref, codigo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function paretoconsolidadocontra($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno, mes, codigo, periodo, documentoref, sum(costomtto) as paretovalorcontrataciones
            FROM contrataciones
            WHERE periodo = $periodo
            GROUP BY anno, mes, codigo, periodo, documentoref
            ORDER BY costomtto DESC ");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function consolidadocontrames($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno, mes, periodo,  sum(costomtto) as valorcontratacionmes
            FROM contrataciones
            WHERE periodo = $periodo
            GROUP BY anno, mes, periodo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_contratacionesmesequipo($codigo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno, mes, codigo, sum(costomtto) as valorcontratacionmesequipo
            FROM contrataciones
            where codigo = $codigo
            GROUP BY anno, mes, codigo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function get($id_inv){
    
          try {    
              //$data = Especialidades::find($id_esp);
              $data = DB::select("SELECT t0.*,  t1.descripcion_alm, t2.nombre_est, t3.descripcion_tprd, t4.descripcion_talm,
                                                t5.descripcion_tope
              FROM inventarios as t0 INNER JOIN almacenes      as t1 INNER JOIN estados     as t2 
                                     INNER JOIN tiposproductos as t3 INNER JOIN tipoalmacen as t4 INNER JOIN tipooperacion as t5 
              WHERE t0.almacen_inv      = t1.id_alm  and t0.estado_inv      = t2.id_est  and t0.tipooperacion_inv = t5.id_tope and
                    t0.tipoproducto_inv = t3.id_tprd and t1.tipoalmacen_alm = t4.id_talm and t0.id_inv = $id_inv");
      
              if ($data) {
                  $response['data'] = $data;
                  $response['message'] = "Load successful";
                  $response['success'] = true;
              }
              else {
                $response['data'] = null;
                $response['message'] = "Not found data id_inv => $id_inv";
                $response['success'] = false;
              }
      
          } catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_inv){
            try {
              $data['tipooperacion_inv']        = $request['tipooperacion_inv'];
              $data['almacen_inv']              = $request['almacen_inv'];
              $data['descripcion_inv']          = $request['descripcion_inv'];
              $data['referencia_inv']           = $request['referencia_inv'];
              $data['tipoproducto_inv']         = $request['tipoproducto_inv'];
              $data['fechaactualizacion_inv']   = $request['fechaactualizacion_inv'];
              $data['horaactualizacion_inv']    = $request['horaactualizacion_inv'];
              $data['existencia_inv']           = $request['existencia_inv'];
              $data['costounitponderado_inv']   = $request['costounitponderado_inv'];
              $data['costototalponderado_inv']  = $request['costototalponderado_inv'];
              $data['estado_inv']               = $request['estado_inv'];
    
              //Console::info('mymessage');
    
              $res = Contrataciones::where("id_inv",$id_inv)->update($data);
    
              $response['res'] = $res;
              $response['message'] = "Updated successful";
              $response['success'] = true;
      
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
            }
            return $response;
      
          }
    
          public function delete($id_inv){
    
            try {
              $res = Contrataciones::where("id_inv",$id_inv)->delete($id_inv);
              $response['res'] = $res;
    
              $response['message'] = "Deleted successful";
              $response['success'] = true; 
              
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
            }
      
            return $response;
      } 
}
