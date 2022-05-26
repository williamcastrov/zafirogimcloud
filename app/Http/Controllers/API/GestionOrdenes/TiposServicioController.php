<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\GestionOrdenes\TiposServicio;

class TiposServicioController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['descripcion_tser']  = $request['descripcion_tser'];
          $insert['empresa_tser']      = $request['empresa_tser'];
          $insert['estado_tser']       = $request['estado_tser'];
              
          TiposServicio::insert($insert);
      
          $response['message'] = "Tipo de Servicio Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_tiposservicio(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM tiposservicio as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.empresa_tser = t1.id_emp and t0.estado_tser = t2.id_est ");
  
          $response['data'] = $data;
          // $response['data'] = $data1;
          $response['message'] = "load successful";
          $response['success'] = true;
      
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
          return $response;
      }
    
      public function get($id_tser){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM tiposservicio as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.id_tser = $id_tser and t0.empresa_tser = t1.id_emp and t0.estado_tser = t2.id_est");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tser => $id_tser";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_tser){
        try {
          $data['descripcion_tser']  = $request['descripcion_tser'];
          $data['empresa_tser']      = $request['empresa_tser'];
          $data['estado_tser']       = $request['estado_tser'];
    
          $res = TiposServicio::where("id_tser",$id_tser)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_tser){ 
        try {
          $res = TiposServicio::where("id_tser",$id_tser)->delete($id_tser);
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
