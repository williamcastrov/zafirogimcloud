<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\ConceptosRentabilidad;
use App\Models\Parameters\Estados;

class ConceptosRentabilidadController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_rtb']     = $request['id_rtb'];
            $insert['nombre_rtb'] = $request['nombre_rtb'];
            $insert['estado_rtb'] = $request['estado_rtb'];
            $insert['tipo_rtb']   = $request['tipo_rtb'];
  
            ConceptosRentabilidad::insert($insert);
    
            $response['message'] = "Concepto Rentabilidad Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
        }

        public function listar_conceptosrentabilidad(){
          try {
            $data = DB::select("SELECT t0.*, t1.nombre_est
            FROM conceptosrentabilidad as t0 INNER JOIN estados as t1
            WHERE t0.estado_rtb = t1.id_est");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function get($id_rtb){
  
          try {
            $data = DB::select("SELECT t0.*, t1.nombre_est
            FROM conceptosrentabilidad as t0 INNER JOIN estados as t1
            WHERE t0.estado_rtb = t1.id_est and t0.id_rtb = $id_rtb");
            
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_rtb => $id_rtb";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_rtb){
  
          try {
            $data['id_rtb']     = $request['id_rtb'];
            $data['nombre_rtb'] = $request['nombre_rtb'];
            $data['estado_rtb'] = $request['estado_rtb'];
            $data['tipo_rtb']   = $request['tipo_rtb'];
            //Console::info('mymessage');
  
            $res = ConceptosRentabilidad::where("id_rtb",$id_rtb)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_rtb){
  
          try {
            $res = ConceptosRentabilidad::where("id_rtb",$id_rtb)->delete($id_rtb);
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
