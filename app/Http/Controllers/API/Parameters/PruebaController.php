<?php

namespace App\Http\Controllers\API\Parameters;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Prueba;

class PruebaController extends Controller
{
    //
    public function create(Request $request){

        try {   
                $insert['codigo_pai'] = $request['codigo_pai'];
                $insert['nombre_pai'] = $request['nombre_pai'];
                $insert['valor'] = $request['valor'];
           
                Prueba::insert($insert);
    
                $response['message'] = "Grabado de forma correcta";
                $response['success'] = true;
            }   catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
        }       
        return $response;
    }
  
        public function listar_pruebas(){

          try {
  
            //$data = Prueba::get();
            $data = DB::select("SELECT t0.*
            FROM prueba as t0 ");

            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;

            
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
        
          return $response;
      }
  
        public function get($id_pai){
  
          try {
    
            $data = Prueba::find($id_pai);
    
            if ($data) {
             
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_pai => $id_pai";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_pai){
  
          try {
        
            $data['codigo_pai'] = $request['codigo_pai'];
            $data['nombre_pai'] = $request['nombre_pai'];
            $data['valor'] = $request['resultado'];
  
            //Console::info('mymessage');
            //console.log("VALIDAR : ",validar);
            $res = Prueba::where("id_pai",$id_pai)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_pai){
  
        try {
                $res = Prueba::where("id_pai",$id_pai)->delete($id_pai);
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
