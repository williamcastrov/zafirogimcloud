<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Ciudades;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\Equipos;
use App\Models\Interlocutores\Interlocutores_emp;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\DatosEquipos\Contratos;

class ContratosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_ctr']                 = $request['id_ctr'];
          $insert['codigocontrato_ctr']     = $request['codigocontrato_ctr'];
          $insert['cliente_ctr']            = $request['cliente_ctr'];
          $insert['asesorcomercial_ctr']    = $request['asesorcomercial_ctr'];
          $insert['duracion_ctr']           = $request['duracion_ctr'];
          $insert['fechainicio_ctr']        = $request['fechainicio_ctr'];
          $insert['fechafinal_ctr']         = $request['fechafinal_ctr'];
          $insert['ciudad_ctr']             = $request['ciudad_ctr'];
          $insert['valorcontrato_ctr']      = $request['valorcontrato_ctr'];
          $insert['estado_ctr']             = $request['estado_ctr'];
          $insert['observacion_ctr']        = $request['observacion_ctr'];
          $insert['valorrentames_ctr']      = $request['valorrentames_ctr'];
          $insert['valorfacturadomes_ctr']  = $request['valorfacturadomes_ctr'];
          $insert['numerodiasparo_ctr']     = $request['numerodiasparo_ctr'];
          $insert['fecharegistradiasparo_ctr'] = $request['fecharegistradiasparo_ctr'];
          $insert['fechaalza_ctr']          = $request['fechaalza_ctr'];
          $insert['diafacturacion_ctr']     = $request['diafacturacion_ctr'];
          $insert['controldiafactura_ctr']  = $request['controldiafactura_ctr'];
          $insert['controlalza_ctr']        = $request['controlalza_ctr'];
          $insert['horastrabajocontratadas_ctr'] = $request['horastrabajocontratadas_ctr']; 

          
         // $insert['diafacturacion_ctr']   = $request['diafacturacion_ctr'];

          Contratos::insert($insert);
      
          $response['message'] = "Datos Adicionales del Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
         
        }
        return $response;
    }
    
    public function listar_contratos(){  
        try {
          $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                           t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp, t3.codigo_equ,
                                           t4.email_cli
          FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                               INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5 INNER JOIN ubicaciones as t6
          WHERE t0.estado_ctr  = t2.id_est and t0.id_ctr = t3.id_equ and t3.tipo_equ = 8
            and t6.equipo_ubi  = t3.id_equ and t6.ciudad_ubi          = t1.id_ciu and t6.estado_ubi  = 31
            and t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and t0.estado_ctr != 60");
  
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

    public function listar_datosfacturacion($periodo){  
      try {
        $data = DB::select("SELECT t0.*, t1.primer_nombre_emp, t1.primer_apellido_emp, t2.razonsocial_cli, t3.nombre_ciu,
                                   t4.descripcion_tpf
        FROM facturacion AS t0 INNER JOIN interlocutores_emp AS t1 INNER JOIN interlocutores_cli AS t2
                               INNER JOIN ciudades           AS t3 INNER JOIN tipofacturacion    AS t4
        WHERE t0.asesorcomercial_ctr = t1.id_emp AND t0.cliente_ctr = t2.id_cli
          AND t0.ciudad_ctr  = t3.id_ciu and t0.periodo_fac = $periodo and t4.id_tpf = t0.tipofacturas_fac");

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

    public function listar_alertasestadoscontratos(){  
      try {
        $data = DB::select("SELECT t0.*, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                         t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp 
        FROM contratos as t0 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                             INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
        WHERE t0.estado_ctr  = t2.id_est and t0.id_ctr = t3.id_equ and
              t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp");

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

    public function sumatotalcontratos(){
      try {
        //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
        $data = DB::select("SELECT count(id_ctr) as totalcontratos
        FROM  contratos as t0 INNER JOIN equipos as t3
        WHERE t3.tipo_equ = 8 and t0.id_ctr = t3.id_equ");

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

    public function listar_consoestcontratos($totalcontratos){  
      try {
        $data = DB::select("SELECT t0.estado_ctr, t2.nombre_est, COUNT(*) as totalcontratosestados,
                                   (count(id_ctr)/$totalcontratos) * 100 as porcentaje
        FROM contratos as t0 INNER JOIN estados as t2 INNER JOIN equipos as t3
        WHERE t0.estado_ctr = t2.id_est and t3.tipo_equ = 8  and t0.id_ctr = t3.id_equ 
        GROUP BY t0.estado_ctr, t2.nombre_est");

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

    public function listar_vencimientofecha(){  
        try {
          $data = DB::select("SELECT COUNT(*) as totalvencimientofecha, fechaalza_ctr
          FROM  contratos
          WHERE fechaalza_ctr >= DATE_FORMAT(now(), '%Y-%m-01') and fechaalza_ctr <= LAST_DAY(NOW()) and
                controlalza_ctr != concat(EXTRACT(YEAR FROM DATE(NOW())),EXTRACT(MONTH FROM DATE(NOW())))
          GROUP BY fechaalza_ctr;");
  
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

    public function listar_vencimientocontratos($fecha){  
        try {
          $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                           t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp, t3.codigo_equ 
          FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                               INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
          WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and
                t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and fechaalza_ctr = $fecha and
                t0.controlalza_ctr != concat(EXTRACT(YEAR FROM DATE(NOW())),EXTRACT(MONTH FROM DATE(NOW())));");

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

    public function listar_vencimientofacturas(){  
      try {
        $data = DB::select("SELECT COUNT(*) as totalvencimientofacturas, t0.diafacturacion_ctr as dia ,
                                                                       EXTRACT(MONTH FROM DATE(NOW())) AS mes,
                                                                       EXTRACT(YEAR FROM DATE(NOW())) AS año
        FROM  contratos as t0 INNER JOIN equipos as t1
        WHERE t0.id_ctr = t1.id_equ and t1.tipo_equ = 8 and t0.estado_ctr != 60 and
              t0.controldiafactura_ctr != concat(EXTRACT(YEAR FROM DATE(NOW())),EXTRACT(MONTH FROM DATE(NOW())))
        GROUP BY t0.diafacturacion_ctr;");

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

    public function listar_detallevencimientofacturas($dia){  
      try {
        $data = DB::select("SELECT t0.*, EXTRACT(MONTH FROM DATE(NOW())) AS mes, EXTRACT(YEAR FROM DATE(NOW())) AS año,
                                         t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t3.codigo_equ, 
                                         t5.primer_nombre_emp,
                                         t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp 
        FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                             INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
        WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and t3.tipo_equ = 8 and 
              t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and t0.diafacturacion_ctr = $dia and
              t0.estado_ctr != 60 and
              t0.controldiafactura_ctr != concat(EXTRACT(YEAR FROM DATE(NOW())),EXTRACT(MONTH FROM DATE(NOW()))) ");

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
    
    public function get($id_ctr){
        try {
            $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                             t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp, t6.nombrealterno_dequ 
            FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                                 INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
                                 INNER JOIN datosadicionalequipos as t6
            WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and
                  t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and t0.id_ctr = t6.id_dequ and
                  t0.id_ctr = $id_ctr");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_ctr => $id_ctr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }

    public function listar_uncontrato($codigocontrato_ctr){
      try {
          $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                           t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp, t6.nombrealterno_dequ
          FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                               INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5 
                               INNER JOIN datosadicionalequipos as t6
          WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and
                t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and t0.id_ctr = t6.id_dequ and
                t0.codigocontrato_ctr = $codigocontrato_ctr");
        
        if ($data) {
            $response['data'] = $data;
            $response['message'] = "Load successful";
            $response['success'] = true;
        }
        else {
            $response['data'] = null;
            $response['message'] = "Not found data codigocontrato_ctr => $codigocontrato_ctr";
            $response['success'] = false;
        }
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }

    public function leevalorcontratomes($fechacodigomt){
      try {
        $resultado = substr($fechacodigomt, 1, 10);
        $fecha = '"'.$resultado.'"';  
        $codigo = substr($fechacodigomt, 12, 2);
        
//echo $codigo; // imprime "ue"
//exit;
          $data = DB::select("SELECT t0.*
          FROM contratos as t0 
          WHERE t0.id_ctr = $codigo and t0.fechainicio_ctr <= $fecha and t0.fechafinal_ctr >= $fecha ");
        
        if ($data) {
            $response['data'] = $data;
            $response['message'] = "Load successful";
            $response['success'] = true;
        }
        else {
            $response['data'] = null;
            $response['message'] = "Not found data fecha contrato => $codigocontrato_ctr";
            $response['success'] = false;
        }
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }

    public function contratofacturado($codigocontrato_ctr){
      try {

        $res = DB::update('update contratos set controldiafactura_ctr ='+20215+' where codigocontrato_ctr = ?', [$codigocontrato_ctr]);
  
        $response['res'] = $res;
        $response['message'] = "Updated successful";
        $response['success'] = true;
      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['success'] = false;
      }
      return $response;
    } 
    
    public function update(Request $request, $codigocontrato_ctr){
        try {
            $data['id_ctr']                 = $request['id_ctr'];
            $data['codigocontrato_ctr']     = $request['codigocontrato_ctr'];
            $data['cliente_ctr']            = $request['cliente_ctr'];
            $data['asesorcomercial_ctr']    = $request['asesorcomercial_ctr'];
            $data['duracion_ctr']           = $request['duracion_ctr'];
            $data['fechainicio_ctr']        = $request['fechainicio_ctr'];
            $data['fechafinal_ctr']         = $request['fechafinal_ctr'];
            $data['ciudad_ctr']             = $request['ciudad_ctr'];
            $data['valorcontrato_ctr']      = $request['valorcontrato_ctr'];
            $data['estado_ctr']             = $request['estado_ctr'];
            $data['observacion_ctr']        = $request['observacion_ctr'];
            $data['valorrentames_ctr']      = $request['valorrentames_ctr'];
            $data['valorfacturadomes_ctr']  = $request['valorfacturadomes_ctr'];
            $data['numerodiasparo_ctr']     = $request['numerodiasparo_ctr'];
            $data['fecharegistradiasparo_ctr'] = $request['fecharegistradiasparo_ctr'];
            $data['fechaalza_ctr']          = $request['fechaalza_ctr'];
            $data['diafacturacion_ctr']     = $request['diafacturacion_ctr'];           
            $data['controldiafactura_ctr']  = $request['controldiafactura_ctr'];
            $data['controlalza_ctr']        = $request['controlalza_ctr'];
            $data['horastrabajocontratadas_ctr'] = $request['horastrabajocontratadas_ctr']; 
           
            $res = Contratos::where("codigocontrato_ctr",$codigocontrato_ctr)->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
            return $response;
    }
    
    public function delete($codigocontrato_ctr){ 
        $isError = false;
        $message = 'Success';
      
        try {
          $res = Contratos::where("codigocontrato_ctr",$codigocontrato_ctr)->delete($codigocontrato_ctr);
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
