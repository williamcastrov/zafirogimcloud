<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Activos\Depreciacion;

class DepreciacionController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_dpr']                 = $request['id_dpr'];
          $insert['activo_dpr']             = $request['activo_dpr'];
          $insert['anno_dpr']               = $request['anno_dpr'];
          $insert['mes_dpr']                = $request['mes_dpr'];
          $insert['descripcion_dpr']        = $request['descripcion_dpr'];
          $insert['empresa_dpr']            = $request['empresa_dpr'];
          $insert['valordepreciacion_dpr']  = $request['valordepreciacion_dpr'];
          $insert['observacion_dpr']        = $request['observacion_dpr'];
          $insert['annomes_dpr']            = $request['annomes_dpr'];
              
          Depreciacion::insert($insert);
      
          $response['message'] = "Depreciación Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_depreciacion(){  
        try {
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.descripcion_act, t2.ctacontable_act, t2.ctadepreciacion_act,
                                            t3.codigo_equ,  t2.valorresidual_act
            FROM depreciacion as t0 INNER JOIN empresa as t1 INNER JOIN activos as t2 INNER JOIN equipos as t3
            WHERE t0.empresa_dpr = t1.id_emp and t0.activo_dpr = t2.id_act and t2.codigo_act = t3.id_equ");
  
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

    public function validaperiododepreciacion($annomes_dpr){  
        try {
            $data = DB::select("SELECT t0.*
            FROM  depreciacion as t0
            WHERE t0.annomes_dpr = $annomes_dpr");
     
            if ($data) {
                $response['data'] = $data;
                $response['message'] = "Load successful";
                $response['success'] = true;
            }
            else {
                $response['data'] = null;
                $response['message'] = "Not found data id_dpr => $id_dpr";
                $response['success'] = false;
            }
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
          return $response;
    }
    
    public function get($annomes_dpr){
        try { 
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.descripcion_act, t2.ctacontable_act, t2.ctadepreciacion_act,
                                       t3.codigo_equ,  t2.valoradquisicion_act, t2.depreciacionacumulada_act,
                                       t2.codigocontable_act
            FROM depreciacion as t0 INNER JOIN empresa as t1 INNER JOIN activos as t2 INNER JOIN equipos as t3
            WHERE t0.empresa_dpr = t1.id_emp and t0.activo_dpr = t2.id_act and t2.codigo_act = t3.id_equ and            
                  t0.annomes_dpr = $annomes_dpr");
         
            if ($data) {
                $response['data'] = $data;
                $response['message'] = "Load successful";
                $response['success'] = true;
            }
            else {
                $response['data'] = null;
                $response['message'] = "Not found data annomes_dpr => $annomes_dpr";
                $response['success'] = false;
            }
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
        }
        return $response;
    }

    public function update(Request $request, $id_dpr){
        try {
          $data['id_dpr']                 = $request['id_dpr'];
          $data['activo_dpr']             = $request['activo_dpr'];
          $data['anno_dpr']               = $request['anno_dpr'];
          $data['mes_dpr']                = $request['mes_dpr'];
          $data['descripcion_dpr']        = $request['descripcion_dpr'];
          $data['empresa_dpr']            = $request['empresa_dpr'];
          $data['valordepreciacion_dpr']  = $request['valordepreciacion_dpr'];
          $data['observacion_dpr']        = $request['observacion_dpr'];
          $data['annomes_dpr']            = $request['annomes_dpr'];
    
          $res = Depreciacion::where("id_dpr",$id_dpr)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }

    public function delete($annomes_dpr){ 
        try {
          $res = Depreciacion::where("annomes_dpr",$annomes_dpr)->delete($annomes_dpr);
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
