<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\PendienteOT;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\NotificacionPendientes;

class NotificacionPendientesController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id']                 = $request['id'];
          $insert['descripcion']        = $request['descripcion'];
          $insert['fechanotificacion']  = $request['fechanotificacion'];
          $insert['estado']             = $request['estado'];
          $insert['codigopendiente']    = $request['codigopendiente'];
          $insert['tiponotificacion']   = $request['tiponotificacion'];
              
          NotificacionPendientes::insert($insert);
      
          $response['message'] = "Notificación Pendientes Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_notificacionpendientes(){  
        try {

            $data = DB::select("SELECT t0.*, t1.descripcion_pot, t2.nombre_est
            FROM  notificacionpendientes as t0 INNER JOIN pendienteoserv as t1 INNER JOIN estados as t2 
            WHERE t0.codigopendiente = t1.id and t0.estado = t2.id_est
            ORDER BY t0.id ASC ");
  
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

      public function listar_solicitonotificacionpendientes(){  
        try {

            $data = DB::select("SELECT t0.*, t1.descripcion_pot, t2.nombre_est
            FROM  notificacionpendientes as t0 INNER JOIN pendienteoserv as t1 INNER JOIN estados as t2 
            WHERE t0.codigopendiente = t1.id and t0.estado = t2.id_est and t0.tiponotificacion = 90
            ORDER BY t0.id ASC ");
  
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

      public function listar_ingresonotificacionpendientes(){  
        try {

            $data = DB::select("SELECT t0.*, t1.descripcion_pot, t2.nombre_est
            FROM  notificacionpendientes as t0 INNER JOIN pendienteoserv as t1 INNER JOIN estados as t2 
            WHERE t0.codigopendiente = t1.id and t0.estado = t2.id_est and t0.tiponotificacion = 91
            ORDER BY t0.id ASC ");
  
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

      public function listar_notificacionpendiente($pendiente){  
        try {

            $data = DB::select("SELECT t0.*, t1.descripcion_pot, t2.nombre_est
            FROM  notificacionpendientes as t0 INNER JOIN pendienteoserv as t1 INNER JOIN estados as t1
            WHERE t0.id = t1.id and t0.estado = t2.id_est and t0.codigopendiente = $pendiente
            ORDER BY t0.id ASC ");
  
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
    
      public function update(Request $request, $id){
        try {
            $data['id']                 = $request['id'];
            $data['descripcion']        = $request['descripcion'];
            $data['fechanotificacion']  = $request['fechanotificacion'];
            $data['estado']             = $request['estado'];
            $data['codigopendiente']    = $request['codigopendiente'];
            $data['tiponotificacion']   = $request['tiponotificacion'];
       
          $res = NotificacionPendientes::where("id",$id)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function actualizanotificacion($id){
        try {
          $res = DB::update('update notificacionpendientes set estado = 33 where id = ?', [$id]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 
    
      public function delete($id){ 
        try {
          $res = NotificacionPendientes::where("id",$id)->delete($id);
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
