<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activos\NovedadesActivos;
use App\Models\Activos\Activos;

class NovedadesActivosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_nac']                 = $request['id_nac'];
          $insert['codigo_nac']             = $request['codigo_nac'];
          $insert['fechanovedad_nac']       = $request['fechanovedad_nac'];
          $insert['cuotadepreciacion_nac']  = $request['cuotadepreciacion_nac'];
          $insert['valornovedad_nac']       = $request['valornovedad_nac'];
          $insert['tiponovedad_nac']        = $request['tiponovedad_nac'];
          $insert['observacion_nac']        = $request['observacion_nac'];
              
          NovedadesActivos::insert($insert);
      
          $response['message'] = "Novedades Activo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_novedadesactivos($id_nac){  
        try {
          
          $data = DB::select("SELECT t0.*
          FROM novedadesactivos as t0
          WHERE t0.codigo_nac = $id_nac");
  
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
    
    public function get($id_nac){
        try { 
            $data = DB::select("SELECT t0.*
            FROM novedadesactivos as t0
            WHERE t0.id_nac = $id_nac");

            if ($data) {
                $response['data'] = $data;
                $response['message'] = "Load successful";
                $response['success'] = true;
            }
            else {
                $response['data'] = null;
                $response['message'] = "Not found data id_nac => $id_nac";
                $response['success'] = false;
            }
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
        }
        return $response;
    }
    
    public function update(Request $request, $id_nac){
        try {
            $data['id_nac']                 = $request['id_nac'];
            $data['codigo_nac']             = $request['codigo_nac'];
            $data['fechanovedad_nac']       = $request['fechanovedad_nac'];
            $data['cuotadepreciacion_nac']  = $request['cuotadepreciacion_nac'];
            $data['valornovedad_nac']       = $request['valornovedad_nac'];
            $data['tiponovedad_nac']        = $request['tiponovedad_nac'];
            $data['observacion_nac']        = $request['observacion_nac'];
    
          $res = NovedadesActivos::where("id_nac",$id_nac)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_nac){ 
        try {
          $res = NovedadesActivos::where("id_nac",$id_nac)->delete($id_nac);
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
