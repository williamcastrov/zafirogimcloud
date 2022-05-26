<?php

namespace App\Http\Controllers\API\Costos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Estados;
use App\Models\Costos\TipoCostoVariable;

class TipoCostoVariableController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['descripcion_tcv'] = $request['descripcion_tcv'];
          $insert['estado_tcv']      = $request['estado_tcv'];
              
          TipoCostoVariable::insert($insert);
      
          $response['message'] = "Tipo de Costo Variable Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_tipocostovariable(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_est
          FROM tipocostovariable_tcv as t0 INNER JOIN estados as t1
          WHERE t0.estado_tcv = t1.id_est ");
  
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
    
    public function get($id_tcv){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_est
          FROM tipocostovariable_tcv as t0 INNER JOIN estados as t1
          WHERE t0.estado_tcv = t1.id_est and t0.id_tcv = $id_tcv");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tcv => $id_tcv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_tcv){
        try {
          $data['descripcion_tcv']  = $request['descripcion_tcv'];
          $data['estado_tcv']       = $request['estado_tcv'];
    
          $res = TipoCostoVariable::where("id_tcv",$id_tcv)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_tcv){ 
        try {
          $res = TipoCostoVariable::where("id_tcv",$id_tcv)->delete($id_tcv);
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
