<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\TiposEquipos;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposEquiposController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_tequ']          = $request['id_tequ'];
            $insert['descripcion_tequ'] = $request['descripcion_tequ'];
            $insert['observacion_tequ'] = $request['observacion_tequ'];
            $insert['empresa_tequ']     = $request['empresa_tequ'];
            $insert['estado_tequ']      = $request['estado_tequ'];

            TiposEquipos::insert($insert);
    
            $response['message'] = "El tipo de Equipo Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_tiposequipos(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposequipos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_tequ = t1.id_emp and t0.estado_tequ = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_tequ){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposequipos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_tequ = $id_tequ and t0.empresa_tequ = t1.id_emp and t0.estado_tequ = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tequ=> $id_tequ";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_tequ){
  
          try {
            $data['id_tequ']          = $request['id_tequ'];
            $data['descripcion_tequ'] = $request['descripcion_tequ'];
            $data['observacion_tequ'] = $request['observacion_tequ'];
            $data['empresa_tequ']     = $request['empresa_tequ'];
            $data['estado_tequ']      = $request['estado_tequ'];
  
            //Console::info('mymessage');
  
            $res = TiposEquipos::where("id_tequ",$id_tequ)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_tequ){
  
          try {
            $res = TiposEquipos::where("id_tequ",$id_tequ)->delete($id_tequ);
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
