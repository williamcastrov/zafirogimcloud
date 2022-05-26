<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\EquiposUsuarios;

class EquiposUsuariosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['usuario_eus']  = $request['usuario_eus'];
          $insert['equipo_eus'] = $request['equipo_eus'];
          $insert['proveedor_eus'] = $request['proveedor_eus'];
          $insert['estado_eus'] = $request['estado_eus'];
              
          EquiposUsuarios::insert($insert);
      
          $response['message'] = "Equipo por USuario Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_usuariosporequipo(){  
        try {
          
          $data = DB::select("SELECT t0.*, t2.nombre_est, nombre_usu, t4.codigo_equ, t5.razonsocial_int 
          FROM equiposporusuario as t0 INNER JOIN estados as t2 INNER JOIN usuarios as t3
                                       INNER JOIN equipos as t4 INNER JOIN interlocutores as t5
          WHERE t0.estado_eus = t2.id_est and t3.id_usu = t0.usuario_eus and t4.id_equ = t0.equipo_eus 
            and t0.proveedor_eus = t5.id_int");
  
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
    
    public function get($id_eus){
        try { 
          $data = DB::select("SELECT t0.*, t2.nombre_est
          FROM tiposdefallas as t0 INNER JOIN estados as t2
          WHERE t0.id_eus = $id_eus and t0.estado_eus = t2.id_est");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_eus => $id_eus";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_eus){
        try {
          $data['usuario_eus']  = $request['usuario_eus'];
          $data['equipo_eus'] = $request['equipo_eus'];
          $data['proveedor_eus'] = $request['proveedor_eus'];
          $data['estado_eus'] = $request['estado_eus'];
    
          $res = EquiposUsuarios::where("id_eus",$id_eus)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_eus){ 
        try {
          $res = EquiposUsuarios::where("id_eus",$id_eus)->delete($id_eus);
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
