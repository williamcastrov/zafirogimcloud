<?php

namespace App\Http\Controllers\API\Almacenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Almacenes\TipoAlmacen;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TipoAlmacenController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_talm']          = $request['id_talm'];
            $insert['descripcion_talm'] = $request['descripcion_talm'];
            $insert['empresa_talm']     = $request['empresa_talm'];
            $insert['estado_talm']      = $request['estado_talm'];

            TipoAlmacen::insert($insert);
    
            $response['message'] = "Tipo de Almace Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_tiposalmacenes(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipoalmacen as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_talm = t1.id_emp and t0.estado_talm = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_talm){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipoalmacen as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_talm = $id_talm and t0.empresa_talm = t1.id_emp and t0.estado_talm = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_talm=> $id_talm";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_talm){
  
          try {
            $data['id_talm']          = $request['id_talm'];
            $data['descripcion_talm'] = $request['descripcion_talm'];
            $data['empresa_talm']     = $request['empresa_talm'];
            $data['estado_talm']      = $request['estado_talm'];
  
            //Console::info('mymessage');
  
            $res = TipoAlmacen::where("id_talm",$id_talm)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_talm){
  
          try {
            $res = TipoAlmacen::where("id_talm",$id_talm)->delete($id_talm);
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
