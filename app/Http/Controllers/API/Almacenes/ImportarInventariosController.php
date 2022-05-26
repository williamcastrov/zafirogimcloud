<?php

namespace App\Http\Controllers\API\Almacenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Almacenes\ImportarInventarios;

class ImportarInventariosController extends Controller
{
    //

    public function importarinventario(Request $request){

      try {
          $insert['item']        = $request['item'];
          $insert['description'] = $request['description'];
          $insert['um']          = $request['um'];
          $insert['productcode'] = $request['productcode'];

          ImportarInventarios::insert($insert);
  
          $response['message'] = "Inventario Grabado de forma correcta";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
         
        return $response;
    }

    public function listar_saldosalmacen(){
      try {
          //$data = Especialidades::with("empresa")->get();
          $data = DB::select("SELECT t0.*, t1.descripcion_alm, t2.nombre_est, t3.descripcion_tprd, t4.descripcion_talm,
                                           t5.descripcion_tope
          FROM inventarios as t0 INNER JOIN almacenes      as t1 INNER JOIN estados     as t2 
                                 INNER JOIN tiposproductos as t3 INNER JOIN tipoalmacen as t4 INNER JOIN tipooperacion as t5 
          WHERE t0.almacen_inv      = t1.id_alm  and t0.estado_inv  = t2.id_est      and t0.tipooperacion_inv = 1 and
                t0.tipoproducto_inv = t3.id_tprd and t1.tipoalmacen_alm = t4.id_talm and t0.tipooperacion_inv = t5.id_tope");

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
  
      } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
      }
      return $response;
    }
  
    public function get($id_inv){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*,  t1.descripcion_alm, t2.nombre_est, t3.descripcion_tprd, t4.descripcion_talm,
                                              t5.descripcion_tope
            FROM inventarios as t0 INNER JOIN almacenes      as t1 INNER JOIN estados     as t2 
                                   INNER JOIN tiposproductos as t3 INNER JOIN tipoalmacen as t4 INNER JOIN tipooperacion as t5 
            WHERE t0.almacen_inv      = t1.id_alm  and t0.estado_inv      = t2.id_est  and t0.tipooperacion_inv = t5.id_tope and
                  t0.tipoproducto_inv = t3.id_tprd and t1.tipoalmacen_alm = t4.id_talm and t0.id_inv = $id_inv");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_inv => $id_inv";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_inv){
          try {
            $data['tipooperacion_inv']        = $request['tipooperacion_inv'];
            $data['almacen_inv']              = $request['almacen_inv'];
	          $data['descripcion_inv']          = $request['descripcion_inv'];
	          $data['referencia_inv']           = $request['referencia_inv'];
	          $data['tipoproducto_inv']         = $request['tipoproducto_inv'];
            $data['fechaactualizacion_inv']   = $request['fechaactualizacion_inv'];
            $data['horaactualizacion_inv']    = $request['horaactualizacion_inv'];
	          $data['existencia_inv']           = $request['existencia_inv'];
            $data['costounitponderado_inv']   = $request['costounitponderado_inv'];
            $data['costototalponderado_inv']  = $request['costototalponderado_inv'];
            $data['estado_inv']               = $request['estado_inv'];
  
            //Console::info('mymessage');
  
            $res = Inventarios::where("id_inv",$id_inv)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_inv){
  
          try {
            $res = Inventarios::where("id_inv",$id_inv)->delete($id_inv);
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
