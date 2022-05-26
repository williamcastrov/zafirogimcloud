<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Activos\Areas;

class AreasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_are']       = $request['codigo_are'];
          $insert['descripcion_are']  = $request['descripcion_are'];
          $insert['empresa_are']      = $request['empresa_are'];
          $insert['estado_are']       = $request['estado_are'];
              
          Areas::insert($insert);
      
          $response['message'] = "Area Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }

    public function listar_areas(){  
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM areas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.empresa_are = t1.id_emp and t0.estado_are = t2.id_est ");
  
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
    
    public function get($id_are){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est
          FROM areas as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2
          WHERE t0.id_are = $id_are and t0.empresa_are = t1.id_emp and t0.estado_are = t2.id_est");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_are => $id_are";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_are){
        try {
          $data['codigo_are']       = $request['codigo_are'];
          $data['descripcion_are']  = $request['descripcion_are'];
          $data['empresa_are']      = $request['empresa_are'];
          $data['estado_are']       = $request['estado_are'];
    
          $res = Areas::where("id_are",$id_are)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_are){ 
        try {
          $res = Areas::where("id_are",$id_are)->delete($id_are);
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
