<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Activos\Areas;
use App\Models\Activos\Cencosto;

class CencostoController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_cco']  = $request['codigo_cco'];
          $insert['descripcion_cco']  = $request['descripcion_cco'];
          $insert['area_cco']    = $request['area_cco'];
          $insert['empresa_cco'] = $request['empresa_cco'];
          $insert['estado_cco']  = $request['estado_cco'];
              
          Cencosto::insert($insert);
      
          $response['message'] = "Centro de costo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_cencostos(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.descripcion_are
          FROM centrodecosto as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN areas as t3
          WHERE t0.empresa_cco = t1.id_emp and t0.estado_cco = t2.id_est and t0.area_cco = t3.codigo_are ");
  
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
    
    public function get($id_cco){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.descripcion_are
          FROM centrodecosto as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN areas as t3
          WHERE t0.id_cco = $id_cco and t0.empresa_cco = t1.id_emp and t0.estado_cco = t2.id_est and t0.area_cco = t3.codigo_are");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cco => $id_cco";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_cco){
        try {
          $data['codigo_cco']   = $request['codigo_cco'];
          $data['descripcion_cco']   = $request['descripcion_cco'];
          $data['area_cco']     = $request['area_cco'];
          $data['empresa_cco']  = $request['empresa_cco'];
          $data['estado_cco']   = $request['estado_cco'];
    
          $res = Cencosto::where("id_cco",$id_cco)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_cco){ 
        try {
          $res = Cencosto::where("id_cco",$id_cco)->delete($id_cco);
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
