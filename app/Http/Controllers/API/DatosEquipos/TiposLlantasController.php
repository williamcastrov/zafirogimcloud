<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\TiposLlantas;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposLlantasController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_llan']          = $request['id_llan'];
            $insert['descripcion_llan'] = $request['descripcion_llan'];
            $insert['observacion_llan'] = $request['observacion_llan'];
            $insert['empresa_llan']     = $request['empresa_llan'];
            $insert['estado_llan']      = $request['estado_llan'];

            TiposLlantas::insert($insert);
    
            $response['message'] = "El tipo de Llanta Grabada de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_tiposllantas(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposdellantas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_llan = t1.id_emp and t0.estado_llan = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_llan){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposdellantas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_llan = $id_llan and t0.empresa_llan = t1.id_emp and t0.estado_llan = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_llan=> $id_llan";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_llan){
  
          try {
            $data['id_llan']          = $request['id_llan'];
            $data['descripcion_llan'] = $request['descripcion_llan'];
            $data['observacion_llan'] = $request['observacion_llan'];
            $data['empresa_llan']     = $request['empresa_llan'];
            $data['estado_llan']      = $request['estado_llan'];
  
            //Console::info('mymessage');
  
            $res = TiposLlantas::where("id_llan",$id_llan)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_llan){
  
          try {
            $res = TiposLlantas::where("id_llan",$id_llan)->delete($id_llan);
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
