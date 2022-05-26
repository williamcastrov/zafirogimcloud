<?php

namespace App\Http\Controllers\API\Almacenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Almacenes\TiposProductos;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class TiposProductosController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_tprd']          = $request['id_tprd'];
            $insert['descripcion_tprd'] = $request['descripcion_tprd'];
            $insert['empresa_tprd']     = $request['empresa_tprd'];
            $insert['estado_tprd']      = $request['estado_tprd'];

            TiposProductos::insert($insert);
    
            $response['message'] = "Tipo de Producto Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_tiposproductos(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposproductos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_tprd = t1.id_emp and t0.estado_tprd = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_tprd){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tiposproductos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_tprd = $id_tprd and t0.empresa_tprd = t1.id_emp and t0.estado_tprd = t2.id_est");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tprd=> $id_tprd";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_tprd){
  
          try {
            $data['id_tprd']          = $request['id_tprd'];
            $data['descripcion_tprd'] = $request['descripcion_tprd'];
            $data['empresa_tprd']     = $request['empresa_tprd'];
            $data['estado_tprd']      = $request['estado_tprd'];
  
            //Console::info('mymessage');
  
            $res = TiposProductos::where("id_tprd",$id_tprd)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_tprd){
  
          try {
            $res = TiposProductos::where("id_tprd",$id_tprd)->delete($id_tprd);
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
