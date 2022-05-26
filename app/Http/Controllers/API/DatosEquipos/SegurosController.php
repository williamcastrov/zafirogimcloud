<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\Seguros;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Mantenimiento\Equipos;
use App\Models\Parameters\Ciudades;
use App\Models\Parameters\Estados;

class SegurosController extends Controller
{
    //

    public function create(Request $request){

        try {
            $insert['numeroseguro_seg']           = $request['numeroseguro_seg'];
            $insert['equipo_seg']                 = $request['equipo_seg'];
            $insert['clienteubicacion_seg']       = $request['clienteubicacion_seg'];
            $insert['direccionubicacion_seg']     = $request['direccionubicacion_seg'];
            $insert['ciudad_seg']                 = $request['ciudad_seg'];
            $insert['declaracionimportacion_seg'] = $request['declaracionimportacion_seg'];
            $insert['fechainicia_seg']            = $request['fechainicia_seg'];
            $insert['fechafin_seg']               = $request['fechafin_seg'];
            $insert['estado_seg']                 = $request['estado_seg'];
            $insert['valorcomercial_seg']         = $request['valorcomercial_seg'];
            $insert['activo_seg']                 = $request['activo_seg'];
            
            Seguros::insert($insert);
    
            $response['message'] = "Seguros del Equipo Grabada de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_seguros(){
  
        try {
            //$data = Especialidades::with("empresa")->get();       
            $data = DB::select("SELECT t0.*,       t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                               t3.razonsocial_cli, t4.nombre_ciu
            FROM seguros as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                               INNER JOIN interlocutores_cli as t3 INNER JOIN ciudades as t4
            WHERE t0.estado_seg = t1.id_est and t0.equipo_seg = t2.id_equ and t0.clienteubicacion_seg = t3.id_cli 
              and t0.ciudad_seg = t4.id_ciu");
           
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($equipo_seg){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*,        t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                                t3.razonsocial_cli, t4.nombre_ciu
            FROM seguros as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                               INNER JOIN interlocutores_cli as t3 INNER JOIN ciudades as t4
            WHERE t0.estado_seg = t1.id_est and t0.equipo_seg = t2.id_equ and t0.clienteubicacion_seg = t3.id_cli 
              and t0.ciudad_seg = t4.id_ciu and t0.equipo_seg = $equipo_seg");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_seg => $equipo_seg";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_seg){
  
          try {
            $data['numeroseguro_seg']           = $request['numeroseguro_seg'];
            $data['equipo_seg']                 = $request['equipo_seg'];
            $data['clienteubicacion_seg']       = $request['clienteubicacion_seg'];
            $data['direccionubicacion_seg']     = $request['direccionubicacion_seg'];
            $data['ciudad_seg']                 = $request['ciudad_seg'];
            $data['declaracionimportacion_seg'] = $request['declaracionimportacion_seg'];
            $data['fechainicia_seg']            = $request['fechainicia_seg'];
            $data['fechafin_seg']               = $request['fechafin_seg'];
            $data['estado_seg']                 = $request['estado_seg'];
            $data['valorcomercial_seg']         = $request['valorcomercial_seg'];
            $data['activo_seg']                 = $request['activo_seg'];

            //Console::info('mymessage');
  
            $res = Seguros::where("id_seg",$id_seg)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_seg){
  
          try {
            $res = Seguros::where("id_seg",$id_seg)->delete($id_seg);
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
