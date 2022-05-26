<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\Equipos;
use App\Models\DatosEquipos\Garantias;

class GarantiasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['equipo_gar']       = $request['equipo_gar'];
          $insert['tipogarantia_gar'] = $request['tipogarantia_gar'];
          $insert['IDgarantia_gar']   = $request['IDgarantia_gar'];
          $insert['proveedor_gar']    = $request['proveedor_gar'];
          $insert['cliente_gar']      = $request['cliente_gar']; 
          $insert['empresa_gar']      = $request['empresa_gar'];
          $insert['fechainicial_gar'] = $request['fechainicial_gar'];
          $insert['fechafinal_gar']   = $request['fechafinal_gar'];
          $insert['estado_gar']       = $request['estado_gar'];
          $insert['observacion_gar']  = $request['observacion_gar'];

          Garantias::insert($insert);
      
          $response['message'] = "Garantia del Equipo Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_garantias(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp,  t2.nombre_est, t3.descripcion_equ, t4.descripcion_tga,
                                           t5.razonsocial_cli
          FROM garantias as t0 INNER JOIN empresa      as t1 INNER JOIN estados as t2 INNER JOIN equipos as t3
                               INNER JOIN tipogarantia as t4 INNER JOIN interlocutores_cli as t5
          WHERE t0.empresa_gar      = t1.id_emp and t0.estado_gar  = t2.id_est and t0.equipo_gar = t3.id_equ 
            and t0.tipogarantia_gar = t4.id_tga and t0.cliente_gar = t5.id_cli");
  
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
    
    public function get($equipo_gar){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp,  t2.nombre_est, t3.descripcion_equ, t4.descripcion_tga,
                                     t5.razonsocial_cli
          FROM garantias as t0 INNER JOIN empresa      as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3 
                               INNER JOIN tipogarantia as t4 INNER JOIN interlocutores_cli as t5
          WHERE t0.equipo_gar = $equipo_gar and t0.empresa_gar      = t1.id_emp and t0.estado_gar  = t2.id_est 
            and t0.equipo_gar = t3.id_equ   and t0.tipogarantia_gar = t4.id_tga and t0.cliente_gar = t5.id_cli");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_gar => $equipo_gar";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_gar){
        try {
            $data['equipo_gar']       = $request['equipo_gar'];
            $data['tipogarantia_gar'] = $request['tipogarantia_gar'];
            $data['IDgarantia_gar']   = $request['IDgarantia_gar'];
            $data['proveedor_gar']    = $request['proveedor_gar'];
            $data['cliente_gar']      = $request['cliente_gar']; 
            $data['empresa_gar']      = $request['empresa_gar'];
            $data['fechainicial_gar'] = $request['fechainicial_gar'];
            $data['fechafinal_gar']   = $request['fechafinal_gar'];
            $data['estado_gar']       = $request['estado_gar'];
            $data['observacion_gar']  = $request['observacion_gar'];
    
            $res = Garantias::where("id_gar",$id_gar )->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
            return $response;
    }
    
    public function delete($id_gar){ 
        try {
          $res = Garantias::where("id_gar",$id_gar)->delete($id_gar);
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
