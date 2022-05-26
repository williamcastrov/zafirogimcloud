<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\PdfsContratos;
use App\Models\DatosEquipos\Contratos;

class PdfsContratosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id']             = $request['id'];
          $insert['type']           = $request['type'];
          $insert['name']           = $request['name'];
          $insert['nombrecontacto'] = $request['nombrecontacto'];
          $insert['fechacontrato']  = $request['fechacontrato'];
          $insert['url']            = $request['url'];
          $insert['contrato']       = $request['contrato'];
              
          PdfsContratos::insert($insert);
      
          $response['message'] = "Contrato OT Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_pdfscontratos($contrato){  
        try {

            $data = DB::select("SELECT t0.*
            FROM  pdfscontratos as t0
            WHERE t0.contrato = $contrato");
  
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
            $data['id']             = $request['id'];
            $data['type']           = $request['type'];
            $data['name']           = $request['name'];
            $data['nombrecontacto'] = $request['nombrecontacto'];
            $data['fechacontrato']  = $request['fechacontrato'];
            $data['url']            = $request['url'];
            $data['contrato']       = $request['contrato'];
       
          $res = PdfsContratos::where("id",$id)->update($data);
    
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
          $res = PdfsContratos::where("id",$id)->delete($id);
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
