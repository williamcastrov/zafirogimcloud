<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\ComponentesEquipos;
use App\Models\Parameters\Estados;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Mantenimiento\Equipos;

class ComponentesEquiposController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_com']                   = $request['id_com'];
            $insert['equipo_com']               = $request['equipo_com'];
            $insert['cliente_com']              = $request['cliente_com'];
            $insert['camara_com']               = $request['camara_com'];
            $insert['idcamara_com']             = $request['idcamara_com'];
            $insert['sensordeimpacto_com']      = $request['sensordeimpacto_com'];
            $insert['idsensordeimpacto_com']    = $request['idsensordeimpacto_com'];
            $insert['alarmadesplazamiento_com'] = $request['alarmadesplazamiento_com'];
            $insert['luzestrober_com']          = $request['luzestrober_com'];
            $insert['lucespuntoazul_com']       = $request['lucespuntoazul_com'];
            $insert['lucesreflectoras_com']     = $request['lucesreflectoras_com'];
            $insert['estado_com']               = $request['estado_com'];

            ComponentesEquipos::insert($insert);
    
            $response['message'] = "Componente del Equipo Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_componentesxequipos(){
  
        try {
            $data = DB::select("SELECT t0.*, t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                                             t3.razonsocial_cli
            FROM componentesxequipo as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                                          INNER JOIN interlocutores_cli as t3
            WHERE t0.estado_com = t1.id_est and t0.equipo_com = t2.id_equ and t0.cliente_com = t3.id_cli");
           
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($equipo_com){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                                             t3.razonsocial_cli
            FROM componentesxequipo as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                                          INNER JOIN interlocutores_cli as t3
            WHERE t0.estado_com = t1.id_est and t0.equipo_com = t2.id_equ and t0.cliente_com = t3.id_cli 
              and t0.equipo_com = $equipo_com");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_com => $equipo_com";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_com){
  
          try {
            $data['id_com']                   = $request['id_com'];
            $data['equipo_com']               = $request['equipo_com'];
            $data['cliente_com']              = $request['cliente_com'];
            $data['camara_com']               = $request['camara_com'];
            $data['idcamara_com']             = $request['idcamara_com'];
            $data['sensordeimpacto_com']      = $request['sensordeimpacto_com'];
            $data['idsensordeimpacto_com']    = $request['idsensordeimpacto_com'];
            $data['alarmadesplazamiento_com'] = $request['alarmadesplazamiento_com'];
            $data['luzestrober_com']          = $request['luzestrober_com'];
            $data['lucespuntoazul_com']       = $request['lucespuntoazul_com'];
            $data['lucesreflectoras_com']     = $request['lucesreflectoras_com'];
            $data['estado_com']               = $request['estado_com'];

            //Console::info('mymessage');
  
            $res = ComponentesEquipos::where("id_com",$id_com)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function delete($id_com){
  
          try {
            $res = ComponentesEquipos::where("id_com",$id_com)->delete($id_com);
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
