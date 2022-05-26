<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activos\PlandeCuentas;

class PlandeCuentasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['cuenta_puc']        = $request['cuenta_puc'];
          $insert['nombrecuenta_puc']  = $request['nombrecuenta_puc'];
          $insert['vigencia_puc']      = $request['vigencia_puc'];
          $insert['tipo_puc']          = $request['tipo_puc'];
          $insert['movimiento_puc']    = $request['movimiento_puc'];
          $insert['centrocosto_puc']   = $request['centrocosto_puc'];
          $insert['ajuste_puc']        = $request['ajuste_puc'];
          $insert['tipoplazo_puc']     = $request['tipoplazo_puc'];
          $insert['nivel_puc']         = $request['nivel_puc'];
          $insert['baseretencion_puc'] = $request['baseretencion_puc'];
              
          PlandeCuentas::insert($insert);
      
          $response['message'] = "Cuenta Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_plandecuentas(){  
        try {
          
          $data = DB::select("SELECT t0.*
          FROM planunicocuentas_puc as t0 ");
  
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
    
    public function get($id_puc){
        try { 
          $data = DB::select("SELECT t0.*
          FROM planunicocuentas_puc as t0
          WHERE t0.id_puc = $id_puc");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_puc => $id_puc";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_puc){
        try {
            $data['cuenta_puc']        = $request['cuenta_puc'];
            $data['nombrecuenta_puc']  = $request['nombrecuenta_puc'];
            $data['vigencia_puc']      = $request['vigencia_puc'];
            $data['tipo_puc']          = $request['tipo_puc'];
            $data['movimiento_puc']    = $request['movimiento_puc'];
            $data['centrocosto_puc']   = $request['centrocosto_puc'];
            $data['ajuste_puc']        = $request['ajuste_puc'];
            $data['tipoplazo_puc']     = $request['tipoplazo_puc'];
            $data['nivel_puc']         = $request['nivel_puc'];
            $data['baseretencion_puc'] = $request['baseretencion_puc'];
    
          $res = PlandeCuentas::where("id_puc",$id_puc)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_puc){ 
        try {
          $res = PlandeCuentas::where("id_puc",$id_puc)->delete($id_puc);
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
