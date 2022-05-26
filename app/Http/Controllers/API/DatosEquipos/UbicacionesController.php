<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\Ubicaciones;
use App\Models\Parameters\Empresa;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Mantenimiento\Equipos;
use App\Models\Parameters\Ciudades;
use App\Models\Parameters\Estados;

class UbicacionesController extends Controller
{
    //

    public function create(Request $request){

        try {
            $insert['equipo_ubi']     = $request['equipo_ubi'];
            $insert['cliente_ubi']    = $request['cliente_ubi'];
            $insert['direccion_ubi']  = $request['direccion_ubi'];
            $insert['ciudad_ubi']     = $request['ciudad_ubi'];
            $insert['estado_ubi']     = $request['estado_ubi'];

            Ubicaciones::insert($insert);
    
            $response['message'] = "Ubicacion del Equipo Grabada de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_ubicaciones(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
             
            $data = DB::select("SELECT t0.*,       t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                               t3.razonsocial_cli, t4.nombre_ciu
            FROM ubicaciones as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                                   INNER JOIN interlocutores_cli as t3 INNER JOIN ciudades as t4
            WHERE t0.estado_ubi = t1.id_est and t0.equipo_ubi = t2.id_equ and t0.cliente_ubi = t3.id_cli 
              and t0.ciudad_ubi  = t4.id_ciu");
           
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($equipo_ubi){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*,        t1.nombre_est,  t2.descripcion_equ, t2.codigo_equ,
                                t3.razonsocial_cli, t4.nombre_ciu
            FROM ubicaciones as t0 INNER JOIN estados            as t1 INNER JOIN equipos  as t2 
                                   INNER JOIN interlocutores_cli as t3 INNER JOIN ciudades as t4
            WHERE t0.estado_ubi = t1.id_est and t0.equipo_ubi = t2.id_equ and t0.cliente_ubi = t3.id_cli 
              and t0.ciudad_ubi = t4.id_ciu and t0.equipo_ubi = $equipo_ubi");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tequ=> $equipo_ubi";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_ubi){
  
          try {
            $data['equipo_ubi']     = $request['equipo_ubi'];
            $data['cliente_ubi']    = $request['cliente_ubi'];
            $data['direccion_ubi']  = $request['direccion_ubi'];
            $data['ciudad_ubi']     = $request['ciudad_ubi'];
            $data['estado_ubi']     = $request['estado_ubi'];

            //Console::info('mymessage');
  
            $res = Ubicaciones::where("id_ubi",$id_ubi)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function delete($id_ubi){
  
          try {
            $res = Ubicaciones::where("id_ubi",$id_ubi)->delete($id_ubi);
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
