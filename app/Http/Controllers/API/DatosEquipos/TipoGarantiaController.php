<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DatosEquipos\TipoGarantia;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;


class TipoGarantiaController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_tga']          = $request['id_tga'];
            $insert['descripcion_tga'] = $request['descripcion_tga'];
            $insert['empresa_tga']     = $request['empresa_tga'];
            $insert['estado_tga']      = $request['estado_tga'];

            TipoGarantia::insert($insert);
    
            $response['message'] = "El tipo de Garantia Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_tipogarantia(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipogarantia as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_tga = t1.id_emp and t0.estado_tga = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_tga){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM tipogarantia as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_tga = $id_tga and t0.empresa_tga = t1.id_emp and t0.estado_tga = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tga=> $id_tga";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_tga){
  
          try {
            $data['id_tga']          = $request['id_tga'];
            $data['descripcion_tga'] = $request['descripcion_tga'];
            $data['empresa_tga']     = $request['empresa_tga'];
            $data['estado_tga']      = $request['estado_tga'];
  
            //Console::info('mymessage');
  
            $res = TipoGarantia::where("id_tga",$id_tga)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_tga){
  
          try {
            $res = TipoGarantia::where("id_tga",$id_tga)->delete($id_tga);
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
