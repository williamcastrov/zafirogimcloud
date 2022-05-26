<?php

namespace App\Http\Controllers\API\Almacenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Almacenes\Almacenes;
use App\Models\Almacenes\TipoAlmacen;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Parameters\Estados;

class AlmacenesController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_alm']             = $request['id_alm'];
            $insert['tipoalmacen_alm']    = $request['tipoalmacen_alm'];
            $insert['descripcion_alm']    = $request['descripcion_alm'];
            $insert['consignacion_alm']   = $request['consignacion_alm'];
            $insert['interlocutor_alm']   = $request['interlocutor_alm'];
            $insert['fechacreacion_alm']  = $request['fechacreacion_alm'];
            $insert['estado_alm']         = $request['estado_alm'];
            $insert['observacion_alm']    = $request['observacion_alm'];

            Almacenes::insert($insert);
    
            $response['message'] = "Almacen Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_almacenes(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.descripcion_talm, t2.nombre_est, t3.razonsocial_int
            FROM almacenes as t0 INNER JOIN tipoalmacen as t1 INNER JOIN estados as t2 INNER JOIN interlocutores as t3
            WHERE t0.tipoalmacen_alm = t1.id_talm and t0.estado_alm = t2.id_est and t0.interlocutor_alm = t3.id_int");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_alm){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.descripcion_talm, t2.nombre_est, t3.razonsocial_int
            FROM almacenes as t0 INNER JOIN tipoalmacen as t1 INNER JOIN estados as t2 INNER JOIN interlocutores as t3
            WHERE t0.tipoalmacen_alm = t1.id_talm and t0.estado_alm = t2.id_est and t0.interlocutor_alm = t3.id_int and 
                  t0.id_alm = $id_alm");

            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_alm=> $id_alm";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_alm){
  
          try {
            $data['tipoalmacen_alm']    = $request['tipoalmacen_alm'];
            $data['descripcion_alm']    = $request['descripcion_alm'];
            $data['consignacion_alm']   = $request['consignacion_alm'];
            $data['interlocutor_alm']   = $request['interlocutor_alm'];
            $data['fechacreacion_alm']  = $request['fechacreacion_alm'];
            $data['estado_alm']         = $request['estado_alm'];
            $data['observacion_alm']    = $request['observacion_alm'];
  
            //Console::info('mymessage');
  
            $res = Almacenes::where("id_alm",$id_alm)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_alm){
  
          try {
            $res = Almacenes::where("id_alm",$id_alm)->delete($id_alm);
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
