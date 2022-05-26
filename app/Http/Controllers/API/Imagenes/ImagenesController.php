<?php

namespace App\Http\Controllers\API\Imagenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Imagenes\Imagenes;

class ImagenesController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['type']  = $request['type'];
          $insert['name']  = $request['name'];
          $insert['url']   = $request['url'];
          $insert['data']  = $request['data'];
          $insert['orden'] = $request['orden'];
              
          Unidades::insert($insert);
      
          $response['message'] = "Imagen Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_imagenes(){  
        try {
          
          $data = DB::select("SELECT t0.*
          FROM imagenes as t0  ");
  
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

      public function get($id_und){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM unidades as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.id_und = $id_und and t0.empresa_und = t1.id_emp and t0.estado_und = t2.id_est");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_und => $id_und";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_und){
        try {
          $data['descripcion_und'] = $request['descripcion_und'];
          $data['tipo_und']        = $request['tipo_und'];
          $data['empresa_und']     = $request['empresa_und'];
          $data['estado_und']      = $request['estado_und'];
    
          $res = Unidades::where("id_und",$id_und)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_und){ 
        try {
          $res = Unidades::where("id_und",$id_und)->delete($id_und);
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
