<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\CumplimientoOServ;
use App\Models\GestionOrdenes\Ordenes;
use App\Models\GestionOrdenes\TipoOperacion;
use App\Models\Parameters\Estados;

class CumplimientoOServController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id']                         = $request['id'];
          $insert['id_cosv']                    = $request['id_cosv'];
          $insert['id_actividad']               = $request['id_actividad'];
          $insert['descripcion_cosv']           = $request['descripcion_cosv'];
          $insert['tipooperacion_cosv']         = $request['tipooperacion_cosv'];
          $insert['tipofallamtto_cosv']         = $request['tipofallamtto_cosv'];
          $insert['referencia_cosv']            = $request['referencia_cosv']; 
          $insert['tipo_cosv']                  = $request['tipo_cosv'];
          $insert['fechaprogramada_cosv']       = $request['fechaprogramada_cosv'];
          $insert['fechainicia_cosv']           = $request['fechainicia_cosv'];
          $insert['fechafinal_cosv']            = $request['fechafinal_cosv'];
          $insert['cantidad_cosv']              = $request['cantidad_cosv'];
          $insert['valorunitario_cosv']         = $request['valorunitario_cosv'];
          $insert['valortotal_cosv']            = $request['valortotal_cosv'];
          $insert['servicio_cosv']              = $request['servicio_cosv'];
          $insert['observacion_cosv']           = $request['observacion_cosv'];
          $insert['tiempoactividad_cosv']       = $request['tiempoactividad_cosv'];
          $insert['operario_cosv']              = $request['operario_cosv'];
          $insert['operariodos_cosv']           = $request['operariodos_cosv'];
          $insert['resumenactividad_cosv']      = $request['resumenactividad_cosv'];
          $insert['iniciatransporte_cosv']      = $request['iniciatransporte_cosv'];
          $insert['combogrupo_cosv']            = $request['combogrupo_cosv'];
          $insert['tiempotransporte_cosv']      = $request['tiempotransporte_cosv'];
          $insert['estado_cosv']                = $request['estado_cosv'];
          $insert['horometro_cosv']             = $request['horometro_cosv'];
          $insert['horometro_cosv']             = $request['horometro_cosv'];
          $insert['idcomponente']               = $request['idcomponente'];
          $insert['seriecomponente']            = $request['seriecomponente'];
          $insert['voltajecomponente']          = $request['voltajecomponente'];
          $insert['voltajesalidasulfatacion']   = $request['voltajesalidasulfatacion'];
          $insert['amperajecomponente']         = $request['amperajecomponente'];
          $insert['celdasreferenciacomponente'] = $request['celdasreferenciacomponente'];
          $insert['cofreseriecomponentes']      = $request['cofreseriecomponentes'];
          $insert['estadocomponentes']          = $request['estadocomponentes'];
          $insert['estadooperacionequipo_cosv'] = $request['estadooperacionequipo_cosv'];
          $insert['comentarios_cosv']           = $request['comentarios_cosv'];
          $insert['placavehiculo_cosv']         = $request['placavehiculo_cosv'];

          CumplimientoOServ::insert($insert);
      
          $response['message'] = "Cumplimiento Orden de Servicio Grabada de forma correcta";
          $response['success'] = true;

          
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function getoser($id_cosv){  
        try {
          
            $data = DB::select("SELECT t0.*
            FROM  ordenservicio as t0
            WHERE t0.id_cosv = $id_cosv");
  
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
    
      public function listar_cumplimiento(){  
        try {
          
            $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are, t3.descripcion_fmt, t4.nombre_est
            FROM  cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2 
                                          INNER JOIN fallasdemtto  as t3 INNER JOIN estados  as t4
            WHERE t0.tipooperacion_cosv         = t1.id_tope and t0.servicio_cosv = t2.id_are and t0.tipofallamtto_cosv = t3.id_fmt and
                  t0.estadooperacionequipo_cosv = t4.id_est");
  
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

      public function listar_actividadesotrevision(){  
        try {
            $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are, t3.descripcion_fmt, t4.nombre_est,
                                       t5.*, t6.codigo_equ, concat(t7.primer_nombre_emp,' ',t7.primer_apellido_emp) as nombretecnico,
                                       t8.descripcion_tmt, t9.razonsocial_cli, t9.telefono_cli, t9.email_cli, t10.nombre_ciu,
                                       t13.primer_nombre_con, t13.primer_apellido_con, t13.telefono_con,
                                       t13.email_con, datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ,
                                       datosadicionalequipos.referencia_dequ, datosadicionalequipos.nombrealterno_dequ,
                                       t12.descripcion_mar, t11.nombre_emp
            FROM  cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2 
                                          INNER JOIN fallasdemtto  as t3 INNER JOIN estados  as t4
                                          INNER JOIN ordenservicio as t5 INNER JOIN equipos  as t6
                                          INNER JOIN interlocutores_emp as t7  INNER JOIN tiposmantenimiento as t8
                                          INNER JOIN interlocutores_cli as t9  INNER JOIN ciudades           as t10
                                          INNER JOIN empresa            as t11 INNER JOIN marcas             as t12
                                          INNER JOIN contactos          as t13
            left join datosadicionalequipos on (datosadicionalequipos.id_dequ = t5.equipo_otr)
            WHERE t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are and t0.id_cosv = t5.id_otr
              and t0.tipofallamtto_cosv = t3.id_fmt  and t0.estado_cosv   = 26     and t5.equipo_otr = t6.id_equ 
              and t0.estadooperacionequipo_cosv = t4.id_est and t0.operario_cosv = t7.id_emp and t0.tipo_cosv = t8.id_tmt
              and t5.cliente_otr        = t9.id_cli  and t9.ciudad_cli   = t10.id_ciu and t5.empresa_otr = t11.id_emp 
              and t6.marca_equ  	      = t12.id_mar and t5.contactocliente_otr = t13.id_con
              ORDER BY t0.id_actividad DESC");
  
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
    
      public function get($id_actividad){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are,  t3.descripcion_fmt, t4.descripcion_tfa,
                                           t5.nombre_est, concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico
          FROM cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
                                       INNER JOIN fallasdemtto  as t3 INNER JOIN tiposdefallas      as t4
                                       INNER JOIN estados       as t5 INNER JOIN interlocutores_emp as t6
          WHERE t0.id_actividad       = $id_actividad and t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are
            and t0.tipofallamtto_cosv = t3.id_fmt and t3.tipodefalla_fmt    = t4.id_tfa and  t0.estadooperacionequipo_cosv = t5.id_est
            and t0.operario_cosv   	  = t6.id_emp  ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leeractividadesot($id_cosv){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are,  t3.descripcion_fmt, t4.descripcion_tfa,
                                           t5.nombre_est, concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico
          FROM cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
                                       INNER JOIN fallasdemtto  as t3 INNER JOIN tiposdefallas      as t4
                                       INNER JOIN estados       as t5 INNER JOIN interlocutores_emp as t6
          WHERE t0.id_cosv            = $id_cosv and t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are
            and t0.tipofallamtto_cosv = t3.id_fmt and t3.tipodefalla_fmt   = t4.id_tfa and  t0.estadooperacionequipo_cosv = t5.id_est
            and t0.operario_cosv   	  = t6.id_emp  ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leeractividadesmaquina($equipo_otr){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are,  t3.descripcion_fmt, t4.descripcion_tfa,
                                           t5.nombre_est, t6.equipo_otr, pendienteoserv.fecha_pot, pendienteoserv.observacionrespuesta_pot, 
                                           pendienteoserv.descripcion_pot, t7.codigo_equ, t7.descripcion_equ
          FROM cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
                                       INNER JOIN fallasdemtto  as t3 INNER JOIN tiposdefallas      as t4
                                       INNER JOIN estados       as t5 INNER JOIN ordenservicio      as t6
                                       INNER JOIN equipos       as t7
                                       left join pendienteoserv on (t0.id_actividad = pendienteoserv.id_pot)
          WHERE t6.equipo_otr         = $equipo_otr  and t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are  
            and t0.tipofallamtto_cosv = t3.id_fmt and t3.tipodefalla_fmt    = t4.id_tfa  and t0.id_cosv       = t6.id_otr 
            and t0.estadooperacionequipo_cosv = t5.id_est and t6.equipo_otr = t7.id_equ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leerdatoshojadevida($equipo){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are,  t3.descripcion_fmt, t4.descripcion_tfa,
                                           t5.nombre_est, t6.equipo_otr, pendienteoserv.fecha_pot, pendienteoserv.observacionrespuesta_pot, 
                                           pendienteoserv.descripcion_pot, t7.codigo_equ, t7.descripcion_equ
          FROM cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
                                       INNER JOIN fallasdemtto  as t3 INNER JOIN tiposdefallas      as t4
                                       INNER JOIN estados       as t5 INNER JOIN ordenservicio      as t6
                                       INNER JOIN equipos       as t7
                                       left join pendienteoserv on (t0.id_actividad = pendienteoserv.id_pot)
          WHERE t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are and t6.equipo_otr = t7.id_equ
            and t0.tipofallamtto_cosv = t3.id_fmt and t3.tipodefalla_fmt    = t4.id_tfa  and t0.id_cosv       = t6.id_otr 
            and t0.estadooperacionequipo_cosv = t5.id_est and t7.id_equ = $equipo");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function actividadesactivasxot($id_cosv){
        try { 
          $data = DB::select("SELECT Count(*) as actividadesxotactivas
          FROM cumplimientooserv as t0 
          WHERE t0.id_cosv = $id_cosv and t0.estado_cosv = 23");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function calificacionot($id_actividad){
        try { 
          $data = DB::select("SELECT t0.*, t1.*, concat(t2.primer_nombre_emp,' ',t2.primer_apellido_emp) as nombreempleado,
                                     t3.razonsocial_cli
          FROM calificacionservicioot as t0 INNER JOIN cumplimientooserv as t1 INNER JOIN interlocutores_emp as t2
                                            INNER JOIN interlocutores_cli as t3 INNER JOIN ordenservicio as t4
          WHERE t0.ot_cse = t1.id_actividad and t1.operario_cosv = t2.id_emp and t1.id_cosv = t4.id_otr
            and t4.cliente_otr = t3.id_cli");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data ot_cse => $ot_cse";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }


      public function actividadestotalesxot($id_cosv){
        try { 
          $data = DB::select("SELECT Count(*) as actividadestotalesxot
          FROM cumplimientooserv as t0 
          WHERE t0.id_cosv = $id_cosv");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function cerraractividad(Request $request, $id_actividad){
        try {
          $tiempoactividad = $request->tiempoactividad;
          echo json_encode($tiempoactividad);

          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update cumplimientooserv set estado_cosv = 27, tiempoactividad_cosv = '.$tiempoactividad.
                             ' where id_actividad = ?', [$id_actividad]);

          //$res = DB::update('update ordenservicio set iniciatransporte_otr =  '."NOW()".' where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 
    
      public function update(Request $request, $id){
        try {
          $data['id']                         = $request['id'];
          $data['id_cosv']                    = $request['id_cosv'];
          $data['id_actividad']               = $request['id_actividad'];
          $data['descripcion_cosv']           = $request['descripcion_cosv'];
          $data['tipooperacion_cosv']         = $request['tipooperacion_cosv'];
          $data['tipofallamtto_cosv']         = $request['tipofallamtto_cosv'];
          $data['referencia_cosv']            = $request['referencia_cosv']; 
          $data['tipo_cosv']                  = $request['tipo_cosv'];
          $data['fechaprogramada_cosv']       = $request['fechaprogramada_cosv'];
          $data['fechainicia_cosv']           = $request['fechainicia_cosv'];
          $data['fechafinal_cosv']            = $request['fechafinal_cosv'];
          $data['cantidad_cosv']              = $request['cantidad_cosv'];
          $data['valorunitario_cosv']         = $request['valorunitario_cosv'];
          $data['valortotal_cosv']            = $request['valortotal_cosv'];
          $data['servicio_cosv']              = $request['servicio_cosv'];
          $data['observacion_cosv']           = $request['observacion_cosv'];
          $data['tiempoactividad_cosv']       = $request['tiempoactividad_cosv'];
          $data['operario_cosv']              = $request['operario_cosv'];
          $data['operariodos_cosv']           = $request['operariodos_cosv'];
          $data['resumenactividad_cosv']      = $request['resumenactividad_cosv'];
          $data['iniciatransporte_cosv']      = $request['iniciatransporte_cosv'];
          $data['finaltransporte_cosv']       = $request['finaltransporte_cosv'];
          $data['tiempotransporte_cosv']      = $request['tiempotransporte_cosv'];
          $data['estado_cosv']                = $request['estado_cosv'];
          $data['horometro_cosv']             = $request['horometro_cosv'];
          $data['combogrupo_cosv']            = $request['combogrupo_cosv'];
          $data['idcomponente']               = $request['idcomponente'];
          $data['seriecomponente']            = $request['seriecomponente'];
          $data['voltajecomponente']          = $request['voltajecomponente'];
          $data['voltajesalidasulfatacion']   = $request['voltajesalidasulfatacion'];
          $data['amperajecomponente']         = $request['amperajecomponente'];
          $data['celdasreferenciacomponente'] = $request['celdasreferenciacomponente'];
          $data['cofreseriecomponentes']      = $request['cofreseriecomponentes'];
          $data['estadocomponentes']          = $request['estadocomponentes'];
          $data['estadooperacionequipo_cosv'] = $request['estadooperacionequipo_cosv'];
          $data['comentarios_cosv']           = $request['comentarios_cosv'];
          $data['placavehiculo_cosv']         = $request['placavehiculo_cosv'];
    
          $res = CumplimientoOServ::where("id",$id)->update($data);
    
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
          $res = CumplimientoOServ::where("id",$id)->delete($id);
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
