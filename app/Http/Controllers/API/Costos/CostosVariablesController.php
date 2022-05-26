<?php

namespace App\Http\Controllers\API\Costos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Costos\CostosVariables;
use App\Models\Costos\TipoCostoVariable;

class CostosVariablesController extends Controller
{
    //

    public function create(Request $request){
        try { 
          $insert['id_cvp']         = $request['id_cvp'];
          $insert['tipocosto_cvp']  = $request['tipocosto_cvp'];
          $insert['valorcosto_cvp'] = $request['valorcosto_cvp'];
          $insert['anno_cvp']       = $request['anno_cvp'];
          $insert['mes_cvp']        = $request['mes_cvp'];
          $insert['periodo_cvp']    = $request['periodo_cvp'];
              
          CostosVariables::insert($insert);
      
          $response['message'] = "Costos Variables Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_costosvariables(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.descripcion_tcv
          FROM costosvariableperiodo as t0 INNER JOIN tipocostovariable_tcv as t1
          WHERE t0.tipocosto_cvp = t1.id_tcv");
  
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
    
    public function get($id_cvp){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tcv
          FROM costosvariableperiodo as t0 INNER JOIN tipocostovariable_tcv as t1
          WHERE t0.tipocosto_cvp = t1.id_tcv and t0.id_cvp = $id_cvp");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cvp => $id_cvp";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_cvp){
        try {
          $data['id_cvp']         = $request['id_cvp'];
          $data['tipocosto_cvp']  = $request['tipocosto_cvp'];
          $data['valorcosto_cvp'] = $request['valorcosto_cvp'];
          $data['anno_cvp']       = $request['anno_cvp'];
          $data['mes_cvp']        = $request['mes_cvp'];
          $data['periodo_cvp']    = $request['periodo_cvp'];
    
          $res = CostosVariables::where("id_cvp",$id_cvp)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_cvp){ 
        try {
          $res = CostosVariables::where("id_cvp",$id_cvp)->delete($id_cvp);
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
