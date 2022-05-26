<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\ClasificacionABC;
use App\Models\Activos\Cencosto;
use App\Models\Parameters\Monedas;
use App\Models\DatosEquipos\DatosEquipos;

class DatosEquiposController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_dequ']                = $request['id_dequ'];
          $insert['serie_dequ']             = $request['serie_dequ'];
          $insert['referencia_dequ']        = $request['referencia_dequ'];
          $insert['modelo_dequ']            = $request['modelo_dequ'];
          $insert['nombrealterno_dequ']     = $request['nombrealterno_dequ'];
          $insert['annofabricacion_dequ']   = $request['annofabricacion_dequ'];
          $insert['clasificacionABC_dequ']  = $request['clasificacionABC_dequ'];
          $insert['centrodecosto_dequ']     = $request['centrodecosto_dequ'];
          $insert['tipomoneda_dequ']        = $request['tipomoneda_dequ'];
          $insert['direccion_dequ']         = $request['direccion_dequ'];
          $insert['fechacreacion_dequ']     = $request['fechacreacion_dequ'];  
          $insert['fechamodificacion_dequ'] = $request['fechamodificacion_dequ'];          

          DatosEquipos::insert($insert);
      
          $response['message'] = "Datos Adicionales del Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_datosequipos(){  
        try {
          $data = DB::select("SELECT t0.*, t1.descripcion_abc, t2.descripcion_cco, t3.descripcion_mon
          FROM datosadicionalequipos as t0 INNER JOIN clasificacionABC as t1 INNER JOIN centrodecosto t2 
                                            INNER JOIN monedas          as t3
          WHERE t0.clasificacionABC_dequ = t1.id_abc  and t0.centrodecosto_dequ = t2.id_cco 
            and t0.tipomoneda_dequ       = t3.id_mon");
  
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
    
      public function get($id_dequ){
        try { 
          //$data = Frecuencias::find($id_fre);
         
          $data = DB::select("SELECT t0.*, t1.descripcion_abc, t2.descripcion_cco, t3.descripcion_mon
          FROM datosadicionalequipos as t0 INNER JOIN clasificacionABC as t1 INNER JOIN centrodecosto t2 
                                            INNER JOIN monedas         as t3
          WHERE t0.clasificacionABC_dequ = t1.id_abc and t0.centrodecosto_dequ = t2.id_cco 
            and t0.tipomoneda_dequ       = t3.id_mon and t0.id_dequ = $id_dequ ");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_dequ => $id_dequ";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_dequ){
        try {
            $data['id_dequ']                  = $request['id_dequ'];
            $data['serie_dequ']               = $request['serie_dequ'];
            $data['referencia_dequ']          = $request['referencia_dequ'];
            $data['modelo_dequ']              = $request['modelo_dequ'];
            $data['nombrealterno_dequ']       = $request['nombrealterno_dequ'];
            $data['annofabricacion_dequ']     = $request['annofabricacion_dequ'];
            $data['clasificacionABC_dequ']    = $request['clasificacionABC_dequ'];
            $data['centrodecosto_dequ']       = $request['centrodecosto_dequ'];
            $data['tipomoneda_dequ']          = $request['tipomoneda_dequ'];
            $data['direccion_dequ']           = $request['direccion_dequ'];
            $data['fechacreacion_dequ']       = $request['fechacreacion_dequ'];  
            $data['fechamodificacion_dequ']   = $request['fechamodificacion_dequ'];       
            
          $res = DatosEquipos::where("id_dequ",$id_dequ)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_dequ){ 
        try {
          $res = DatosEquipos::where("id_dequ",$id_dequ)->delete($id_dequ);
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
