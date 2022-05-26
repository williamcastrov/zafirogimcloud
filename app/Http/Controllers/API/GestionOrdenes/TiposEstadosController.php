<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\TiposEstados;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposEstadosController extends Controller
{
    //
      public function create(Request $request){

        try {
            $insert['id_test']          = $request['id_test'];
            $insert['descripcion_test'] = $request['descripcion_test'];
            $insert['empresa_test']     = $request['empresa_test'];
            $insert['estado_test']      = $request['estado_test'];

            TiposEstados::insert($insert);
    
            $response['message'] = "Tipos de Estados OTR Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
      }
  
      public function listar_tiposestados(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposdeestados as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_test = t1.id_emp and t0.estado_test = t2.id_est");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
 
      public function get($id_test){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposdeestados as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_test = $id_test and t0.empresa_test = t1.id_emp and t0.estado_test = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_test=> $id_test";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
  
      public function update(Request $request, $id_test){
  
          try {
            $data['id_test']          = $request['id_test'];
            $data['descripcion_test'] = $request['descripcion_test'];
            $data['empresa_test']     = $request['empresa_test'];
            $data['estado_test']      = $request['estado_test'];
  
            //Console::info('mymessage');
  
            $res = TiposEstados::where("id_test",$id_test)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_test){
  
          try {
            $res = TiposEstados::where("id_test",$id_test)->delete($id_test);
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
