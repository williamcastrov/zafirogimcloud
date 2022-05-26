<?php

namespace App\Http\Controllers\API\Activos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\Marcas;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Activos\Activos;

class ActivosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_act']                     = $request['id_act'];
          $insert['codigo_act']                 = $request['codigo_act'];
          $insert['codigocontable_act']         = $request['codigocontable_act'];
          $insert['descripcion_act']            = $request['descripcion_act'];
          $insert['empresa_act']                = $request['empresa_act'];
          $insert['propietario_act']            = $request['propietario_act'];
          $insert['marca_act']                  = $request['marca_act'];
          $insert['antiguedad_act']             = $request['antiguedad_act'];
          $insert['valoradquisicion_act']       = $request['valoradquisicion_act'];
          $insert['estadocontable_act']         = $request['estadocontable_act'];
          $insert['ctacontable_act']            = $request['ctacontable_act'];
          $insert['ctadepreciacion_act']        = $request['ctadepreciacion_act'];
          $insert['valorresidual_act']          = $request['valorresidual_act'];
          $insert['costosiniva_act']            = $request['costosiniva_act'];
          $insert['depreciacionacumulada_act']  = $request['depreciacionacumulada_act'];
          $insert['valorneto_act']              = $request['valorneto_act'];
          $insert['valornovedad_act']           = $request['valornovedad_act'];
          $insert['duracion_act']               = $request['duracion_act'];
          $insert['depreciacionmensual_act']    = $request['depreciacionmensual_act'];
          $insert['fechainiciadepre_act']       = $request['fechainiciadepre_act'];
          $insert['fechaultimadepre_act']       = $request['fechaultimadepre_act'];
          $insert['valorenlibros_act']          = $request['valorenlibros_act'];
          $insert['numerocombo_act']            = $request['numerocombo_act'];
          $insert['estadodepre_act']            = $request['estadodepre_act'];
          $insert['observacion_act']            = $request['observacion_act'];
              
          Activos::insert($insert);
      
          $response['message'] = "Activo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_activos(){  
        try {
          
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.razonsocial_int, t3.descripcion_mar,
                                             t4.nombre_est, t5.codigo_equ
            FROM activos as t0 INNER JOIN empresa as t1 INNER JOIN interlocutores as t2 INNER JOIN equipos as t5
                               INNER JOIN marcas  as t3 INNER JOIN estados        as t4
            WHERE t0.empresa_act = t1.id_emp and t0.propietario_act    = t2.id_int  and t0.codigo_act = t5.id_equ and
                  t0.marca_act   = t3.id_mar and t0.estadocontable_act = t4.id_est");
  
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
    
    public function get($id_act){
        try { 
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.razonsocial_int, t3.descripcion_mar,
                                             t4.nombre_est
            FROM activos as t0 INNER JOIN empresa as t1 INNER JOIN interlocutores as t2
                               INNER JOIN marcas  as t3 INNER JOIN estados        as t4
            WHERE t0.empresa_act = t1.id_emp and t0.propietario_act    = t2.id_int and
                  t0.marca_act   = t3.id_mar and t0.estadocontable_act = t4.id_est and t0.id_act = $id_act");
         
            if ($data) {
                $response['data'] = $data;
                $response['message'] = "Load successful";
                $response['success'] = true;
            }
            else {
                $response['data'] = null;
                $response['message'] = "Not found data id_act => $id_act";
                $response['success'] = false;
            }
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
        }
        return $response;
    }

    public function leeactivo($id_equ){
      try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.razonsocial_int, t3.descripcion_mar,
                                           t4.nombre_est
          FROM activos as t0 INNER JOIN empresa as t1 INNER JOIN interlocutores as t2
                             INNER JOIN marcas  as t3 INNER JOIN estados        as t4
          WHERE t0.empresa_act = t1.id_emp and t0.propietario_act    = t2.id_int and
                t0.marca_act   = t3.id_mar and t0.estadocontable_act = t4.id_est and t0.codigo_act = $id_equ");
       
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data codigo_equ => $codigo_equ";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
      }
      return $response;
    }

    public function validadepreciacionacumulada($fecha){
      try { 
          $data = DB::select("SELECT t0.*
          FROM activos as t0 
          WHERE t0.fechaultimadepre_act >= DATE_FORMAT($fecha, '%Y-%m-01')
            AND t0.fechaultimadepre_act <= LAST_DAY($fecha);");
       
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data fechaultimadepre_act => $fecha";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
      }
      return $response;
    }

    public function actualizadepreactivos($annomes_dpr){
      /*
        $res = DB::update('update activos set depreciacionacumulada_act = (depreciacionacumulada_act + depreciacionmensual_act),
                                                                          fechaultimadepre_act = NOW()
                          where (depreciacionacumulada_act + valorresidual_act) < valoradquisicion_act');

        $res = DB::update('update activos set valorneto_act = valoradquisicion_act - depreciacionacumulada_act                                
                           where (depreciacionacumulada_act + valorresidual_act) < valoradquisicion_act');
      */
      try {
        $res = DB::update('update activos set depreciacionacumulada_act = (depreciacionacumulada_act + depreciacionmensual_act),
                                                                          fechaultimadepre_act = NOW()
                                        where (depreciacionacumulada_act + valorresidual_act) < valoradquisicion_act');

        $res = DB::update('update activos set valorneto_act = valoradquisicion_act - depreciacionacumulada_act');

        $response['res'] = $res;
        $response['message'] = "Updated successful";
        $response['success'] = true;
      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['success'] = false;
      }
      return $response;
    } 

    public function leeactivodepreciar($periodo){
      try { 
         /*
         $data = DB::select("SELECT t0.id_act as activo_dpr, year(now()) as anno_dpr, month(now()) as mes_dpr, 
                                     t0.descripcion_act as descripcion_dpr, 1 as empresa_dpr, 
                                     depreciacionmensual_act as valordepreciacion_dpr,
                                     'Calculo Depreciación' as observacion_dpr,
                                     CONCAT(year(now()),month(now())) as annomes_dpr
          */
          $data = DB::select("SELECT t0.id_act as activo_dpr, CAST(LEFT($periodo,4) AS SIGNED) as anno_dpr,
                                                              CAST(RIGHT($periodo,2) AS SIGNED) as mes_dpr, 
          t0.descripcion_act as descripcion_dpr, 1 as empresa_dpr, 
          depreciacionmensual_act as valordepreciacion_dpr,
          'Calculo Depreciación' as observacion_dpr,
          $periodo as annomes_dpr
          FROM  activos as t0 
          WHERE (t0.depreciacionacumulada_act + t0.valorresidual_act) < t0.valoradquisicion_act;");
       
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
    
    public function update(Request $request, $id_act){
        try {
            $data['codigo_act']                 = $request['codigo_act'];
            $data['codigocontable_act']         = $request['codigocontable_act'];
            $data['descripcion_act']            = $request['descripcion_act'];
            $data['empresa_act']                = $request['empresa_act'];
            $data['propietario_act']            = $request['propietario_act'];
            $data['marca_act']                  = $request['marca_act'];
            $data['antiguedad_act']             = $request['antiguedad_act'];
            $data['valoradquisicion_act']       = $request['valoradquisicion_act'];
            $data['estadocontable_act']         = $request['estadocontable_act'];
            $data['ctacontable_act']            = $request['ctacontable_act'];
            $data['ctadepreciacion_act']        = $request['ctadepreciacion_act'];
            $data['valorresidual_act']          = $request['valorresidual_act'];
            $data['costosiniva_act']            = $request['costosiniva_act'];
            $data['depreciacionacumulada_act']  = $request['depreciacionacumulada_act'];
            $data['valorneto_act']              = $request['valorneto_act'];
            $data['valornovedad_act']           = $request['valornovedad_act'];
            $data['duracion_act']               = $request['duracion_act'];
            $data['depreciacionmensual_act']    = $request['depreciacionmensual_act'];
            $data['fechainiciadepre_act']       = $request['fechainiciadepre_act'];
            $data['fechaultimadepre_act']       = $request['fechaultimadepre_act'];
            $data['valorenlibros_act']          = $request['valorenlibros_act'];
            $data['numerocombo_act']            = $request['numerocombo_act'];
            $data['estadodepre_act']            = $request['estadodepre_act'];
            $data['observacion_act']            = $request['observacion_act'];
    
          $res = Activos::where("id_act",$id_act)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_act){ 
        try {
          $res = Activos::where("id_act",$id_act)->delete($id_act);
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
