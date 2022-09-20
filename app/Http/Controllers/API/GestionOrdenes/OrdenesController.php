<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Interlocutores\Interlocutores_emp;
use App\Models\GestionOrdenes\Conceptososerv;
use App\Models\Mantenimiento\SubGruposPartes;
use App\Models\Mantenimiento\GruposEquipos;
use App\Models\Mantenimiento\Equipos;
use App\Models\Mantenimiento\ClasificacionABC;
use App\Models\Mantenimiento\Tiposmtto;
use App\Models\GestionOrdenes\Ordenes;
use App\Models\GestionOrdenes\TipoOperacion;
use PDF; // at the top of the file

class OrdenesController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['estado_otr']           = $request['estado_otr'];
          $insert['tipo_otr']             = $request['tipo_otr'];
          $insert['tipooperacion_otr']    = $request['tipooperacion_otr'];
          $insert['tiposervicio_otr']     = $request['tiposervicio_otr'];
          $insert['fechaprogramada_otr']  = $request['fechaprogramada_otr'];
          $insert['fechainicia_otr']      = $request['fechainicia_otr'];
          $insert['fechafinal_otr']       = $request['fechafinal_otr'];
          $insert['diasoperacion_otr']    = $request['diasoperacion_otr'];
          $insert['equipo_otr']           = $request['equipo_otr'];
          $insert['proveedor_otr']        = $request['proveedor_otr'];
          $insert['cliente_otr']          = $request['cliente_otr'];
          $insert['operario_otr']         = $request['operario_otr'];
          $insert['operariodos_otr']      = $request['operariodos_otr'];
          $insert['contactocliente_otr']  = $request['contactocliente_otr'];
          $insert['nitcliente_otr']       = $request['nitcliente_otr'];
          $insert['subgrupoequipo_otr']   = $request['subgrupoequipo_otr'];
          $insert['ciudad_otr']           = $request['ciudad_otr'];
          $insert['resumenorden_otr']     = $request['resumenorden_otr'];
          $insert['prioridad_otr']        = $request['prioridad_otr'];
          $insert['empresa_otr']          = $request['empresa_otr'];
          $insert['horometro_otr']        = $request['horometro_otr'];
          $insert['iniciatransporte_otr'] = $request['iniciatransporte_otr'];
          $insert['finaltransporte_otr']  = $request['finaltransporte_otr'];
          $insert['tiempotransporte_otr'] = $request['tiempotransporte_otr'];
          $insert['tiempoorden_otr']      = $request['tiempoorden_otr'];
          $insert['iniciaparomaquina_otr'] = $request['iniciaparomaquina_otr'];
          $insert['finalparomaquina_otr']  = $request['finalparomaquina_otr'];
          $insert['tiempoparo_otr']        = $request['tiempoparo_otr'];

          Ordenes::insert($insert);
      
          $response['message'] = "Orden de Servicio Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_listarot(){  
        try {
          $data = DB::select("SELECT t0.* FROM  ordenservicio as t0");

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

      public function generarPdf($id){  
        try {
          $data = DB::select("SELECT t0.id, t0.type, t0.name, t0.url, t0.orden, t0.data
          FROM  imagenesordenes as t0
          WHERE t0.orden = $id");

 //echo json_encode($data);
 //exit;
 
          $data1 = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are,  t3.descripcion_fmt, t4.descripcion_tfa,
                                           t5.nombre_est, t6.descripcion_tmt
          FROM cumplimientooserv   as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
          INNER JOIN fallasdemtto  as t3 INNER JOIN tiposdefallas as t4 INNER JOIN estados            as t5
          INNER JOIN tiposmantenimiento as t6
          WHERE t0.id_actividad = $id and t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are  
            and t0.tipofallamtto_cosv = t3.id_fmt and t3.tipodefalla_fmt = t4.id_tfa 
            and t0.estadooperacionequipo_cosv = t5.id_est and t0.tipo_cosv = t6.id_tmt");
 
 $orden = $data1[0]->id_cosv;
 //echo json_encode($orden);
 //exit;

$data2 = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
datosadicionalequipos.nombrealterno_dequ
FROM  ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
INNER JOIN tipooperacion  as t16
left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
left join contactos on (contactos.nitinterlocutor_con = ordenservicio.nitcliente_otr)
WHERE ordenservicio.id_otr             = $orden    and 
ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
t5.ciudad_cli                    = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
ordenservicio.tipooperacion_otr  = t16.id_tope
ORDER BY id_otr DESC");

//echo json_encode($data2);
//exit;

          $data3 = DB::select("SELECT t0.*
          FROM  firmarot as t0
          WHERE t0.id_fir = $id");

//echo json_encode($data3);
//exit;

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
         
          //echo $data2;
          //exit;
          $longitud = sizeof($data1);
        
          $fecha1 = 0;
          $fecha2 = 0;
          $palabra = 0;
          $actividad1 = 0;
          $actividad2 = 0;
          $fechainicia1 = 0;
          $fechainicia2 = 0;
          $fechafinal1 = 0;
          $fechafinal2 = 0;
          
          if($longitud === 1){
              $fecha1 = $data1[0]->fechafinal_cosv;
              $actividad1 = substr($data1[0]->descripcion_cosv, 0, 500);
              $palabra = substr($data1[0]->observacion_cosv, 0, 500); 
              $fechainicia1 = $data1[0]->fechainicia_cosv;
              $fechafinal1  = $data1[0]->fechafinal_cosv;
          }

          if($longitud === 2){
            $fecha2 = $data1[1]->fechafinal_cosv;
            $actividad2 = substr($data1[1]->descripcion_cosv, 0, 500);
            //echo $data1[0]->descripcion_cosv;
            //exit;
            $fechainicia2 = $data1[1]->fechainicia_cosv;
            $fechafinal2  = $data1[1]->fechafinal_cosv;
          }
         
          PDF::SetMargins(7, 10, 7);
          PDF::SetTitle('OT Cliente - Montacargas el Zafiro' );
          PDF::AddPage();
          PDF::SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
          // create some HTML content
           
          $subtable = '<table border="1" cellspacing="6" cellpadding="4"><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';
   
          PDF::Image('/var/www/zafiro.bc-gim/resources/js/server/server/src/images/logozafiro.jpg', 5, 5, 40, 20, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
          $html = '
          <br/>
          <h4  align="right" > MONTACARGAS EL ZAFIRO Nit 811016729-2 - ACTIVIDAD #  '.$data1[0]->id_actividad.'</h4>
         
          <table border="0" cellspacing="3" cellpadding="1" style="font-size: 10px !important;" >
          <tr >
            <br/>
            <th align="left"  >
              CLIENTE: '.$data2[0]->razonsocial_cli.'
            </th>
            <th align="left" >
             TELEFONO: '.$data2[0]->telefono_con.'
            </th>
          </tr>
          <tr>
            <th align="left" >
              CONTACTO: '.$data2[0]->primer_nombre_con.' '.$data2[0]->primer_apellido_con.'  
            </th>
            <th  style="text-align: left !important;" >
              CIUDAD: '.$data2[0]->nombre_ciu.'
            </th>
          </tr>
          <tr>
            <th align="left">
              CORREO: '.$data2[0]->email_con.'
            </th>
            <th align="left" >
              FECHA: '.$data1[0]->fechaprogramada_cosv.'
            </th>
          </tr>
 
          <tr>
            <th width="267px"  colspan="3" >
              TIPO DE SERVICIO: '.$data2[0]->descripcion_tser.'
            </th>
            <th align="left">
              ESTADO EQUIPO: '.$data1[0]->nombre_est.'
            </th>
          </tr>
 
          <tr>
            <th width="271px" align="left" >
              ID INTERNO: '.$data2[0]->codigo_equ.'
            </th>
            <th width="200px"  align="left">
            '.$data1[0]->descripcion_tmt.'
            </th>
          </tr>
          <tr>
            <th align="left"  width="271px"  >
              MODELO: '  .$data2[0]->modelo_dequ.'</th>
            <th align="left"  width="200px" >
              SERIE:  '.$data2[0]->serie_dequ.' 
            </th>
          </tr>
          <tr>
            <th align="left" width="271px">
              MARCA: '.$data2[0]->descripcion_mar.'</th>
            <th align="left"  width="200px">
              HOROMETRO: '.$data1[0]->horometro_cosv.'
            </th>
          </tr>
          <tr>
          <br/>
          
            <th style="text-align: right !important; background-color: #F5F5F5; font-size: 9px !important" width="400px" >
              TIEMPOS DE LA ACTIVIDAD
            </th> 
            </tr>
          </table>
          
          <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
          
            <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important " >
              <td width="210px">ACTIVIDAD REALIZADA</td>
              <td>FECHA_HORA_INICIAL</td>
              <td>FECHA_HORA_FINAL</td>
            </tr>
            <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important" >
              <td  width="210px">
                '.$actividad1.'
              </td>  
              <td >
                '.$fechainicia1.'
                </td>
              <td >
                '.$fechafinal1.'
              </td>
              <td>FECHA_HORA_INICIAL</td>
              <td>FECHA_HORA_FINAL</td>
            </tr>
            
          </table>
          <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 9px !important;">
           <br />
          <tr style="text-align: center !important; background-color: #F5F5F5"  >
            <td >HORA INICIA EL SERVICIO</td>
            <td>HORA DE LLEGADA CLIENTE</td>
            <td>TIEMPO TRANSPORTE</td>
            <td>TIEMPO ACTIVIDAD</td>
          </tr>';

          $html .= 
          '<tr>
            <td style = "text-align: center !important; font-size: 10px !important" >'.$data1[0]->iniciatransporte_cosv.'</td>
            <td style = "text-align: center !important; font-size: 10px !important" >'.$data1[0]->fechainicia_cosv.'</td>
            <td style = "text-align: center !important; font-size: 10px !important" >'.$data1[0]->tiempotransporte_cosv.'</td>
            <td style = "text-align: center !important; font-size: 10px !important" >'.$data1[0]->tiempoactividad_cosv.'</td>
          </tr>';
          
          $html .='
          </table>
          ';
          
         //PDF::Write(0, 'Hello World'.$id);
         // PDF::Write(0, "<img style='display:block; width:100px;height:100px;' src='http://localhost:9000/487f7b22f-gimcloud.jpeg' />");
         
         PDF::writeHTML($html, true, false, true, false, '');
         
         if(isset($data[0]->name)){
         PDF::Image('/var/www/zafiro.bc-gim/public/images/'.$data[0]->name, 5, 130, 45, 45, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
         }

         if(isset($data[1]->name)){
         PDF::Image('/var/www/zafiro.bc-gim/public/images/'.$data[1]->name, 58, 130, 45, 45, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
         }

         if(isset($data[2]->name)){
         PDF::Image('/var/www/zafiro.bc-gim/public/images/'.$data[2]->name, 107, 130, 45, 45, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
         }

         if(isset($data[3]->name)){
          PDF::Image('/var/www/zafiro.bc-gim/public/images/'.$data[3]->name, 155, 130, 45, 45, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
          }
 

         $html1 = '
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <Grid container spacing={2} >
         <Grid item xs={12} md={12}>
           <Typography align="center" className={styles.typography2} display="block" >
             Observaciones: '.$palabra.' 
           </Typography>
         </Grid>
         <Grid item xs={12} md={12}>
           <Typography align="center" className={styles.typography2} display="block" >
            .
           </Typography>
         </Grid>
         <br />
         <Grid item xs={12} md={12}>
           <div style="font-size: 9px !important; text-align: justify; text-indent: 0;"  display="block" >
             Al firmar este documento el cliente expresa haber recibido a satisfacción el servicio y/o repuestos suministrados por
             MONTACARGAS EL ZAFIRO S.A.S. y acusa de haber recibido una copia de la presente orden. Este documento sirve de soporte
             para el cobro del servicio si es VENTA, en caso de servicio de RENTA, no aplica siempre y cuando corresponda a un caso
             especial sujeto a revisión.
           </div>
         </Grid>
       </Grid>
       <br />
       <br />
       <table border="0" cellspacing="3" cellpadding="1" style="font-size: 10px !important;" >
       <tr >
    
         <th align="left">
           FIRMA CLIENTE : 
         </th>
         <th align="left">
          FIRMA TECNICO : 
         </th>
       </tr>
       </table>
       ';
       
       if(isset($data3[0])){
          $b64 = explode(";base64,",$data3[0]->imagen_fir);
          $ext = explode("/",$b64[0]);
 
          $data = base64_decode($b64[1]);
          $url = "/var/www/zafiro.bc-gim/public/public/images/firmaOTCliente.".$ext[1];
          $ifp = fopen($url, "w");
          fwrite($ifp, $data);
          fclose($ifp);
       }
      
        if(isset($url)){
          PDF::Image($url, 40, 245, 25, 25, 'PNG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
        }
/*
        if(isset($data3[0])){
           $b64t = explode(";base64,",$data3[0]->firmatecnico_fir);
           $extt = explode("/",$b64t [0]);

           $datax = base64_decode($b64t[1]);
           $urlx = "/var/www/bc-gim/public/images/firmaOTTecnico.".$ext[1];
           $ifpx = fopen($urlx, "w");
           fwrite($ifpx, $datax);
           fclose($ifpx);
        }

        if(isset($urlx)){
          PDF::Image($urlx, 150, 245, 25, 25, 'PNG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
        }
*/
        PDF::writeHTML($html1, true, false, true, false, '');
        PDF::Output('OTCliente '.$id.'.pdf' );
        //PDF::Output('OtCliente.pdf', $data[0]->orden );
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          //$response['result'] = $path;
          $response['success'] = false;
      }
          return $response;
      }

      public function listar_ordenesservactivas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp, concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (21,22,23,25,34 ))
                              ORDER BY id_otr DESC");

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

      public function listar_ordenescreadas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp, concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (21, 23)) 
                              ORDER BY id_otr DESC");

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

      public function listar_ordenesservactivasusuario(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp, concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16 INNER JOIN equiposporusuario  as t17
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (21,22,23,25,34 )) and
                                      t10.id_equ                       = t17.equipo_eus");

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

      public function totalotactivas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT count(*) as totalotactivas
                              FROM   ordenservicio
                              WHERE  ordenservicio.estado_otr IN (21,22,23,25,26,34)");

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

      public function totalotprogramadas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT count(*) as totalotprogramadas
                              FROM   ordenservicio
                              WHERE  ordenservicio.estado_otr IN (21,34)");

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

      public function totalotrevision(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT count(*) as totalotrevision
                              FROM   ordenservicio
                              WHERE  ordenservicio.estado_otr IN (26)");

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
      
      public function totalotmes(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT COUNT(*) as totalotmes
                    FROM   ordenservicio
                    WHERE  fechaprogramada_otr >= DATE_FORMAT(now(), '%Y-%m-01') AND fechaprogramada_otr <= LAST_DAY(NOW())");

          $response['data'] = $data;  

          //WHERE  fechaprogramada_otr >= DATE_FORMAT(now(), '%Y-%m-01') AND
          //fechaprogramada_otr <= LAST_DAY(NOW());");
          //fechaprogramada_otr >= '2021/04/01' and fechaprogramada_otr <= '2021/04/30'");

          // $response['data'] = $data1;
          $response['message'] = "load successful";
          $response['success'] = true;
    
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
         $response['success'] = false;
        }
         return $response;
      }

      public function totalotterminadasmes(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT count(*) as totalotterminadasmes
                              FROM   ordenservicio
                              WHERE  ordenservicio.estado_otr IN (27)");
//WHERE  fechafinal_otr >= DATE_FORMAT(now(), '%Y-%m-01') and fechafinal_otr <= LAST_DAY(NOW())
                              
// fechafinal_otr >= DATE_FORMAT(now(), '%Y-%m-01') and fechafinal_otr <= LAST_DAY(NOW())
//fechafinal_otr >= DATE_FORMAT('2021/04/01', '%Y-%m-01') and fechafinal_otr <= LAST_DAY('2021/04/30')
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
      
      public function cumplimientotalotmes($periodo){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          //$mes = substr($periodo, 6, 2);
          //$anno = substr($periodo, 1, 4);
          $data = DB::select("SELECT COUNT(*) as cumplimientototalotmes
          FROM   ordenservicio
          WHERE  fechaprogramada_otr >= DATE_FORMAT($periodo, '%Y-%m-01') AND fechaprogramada_otr <= LAST_DAY($periodo)
            AND  estado_otr != 32");

          $response['data'] = $data;  

          $response['message'] = "load successful";
          $response['success'] = true;
    
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
         $response['success'] = false;
        }
         return $response;
      }

      public function cumplimientootterminadasmes($periodo){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT COUNT(*) as cumplimientototalotterminadasmes
                              FROM   ordenservicio
                              WHERE  fechaprogramada_otr >= DATE_FORMAT($periodo, '%Y-%m-01') 
                                AND  fechaprogramada_otr <= LAST_DAY($periodo)
                                AND  estado_otr IN (26, 27)");

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

      public function listar_ordenesservactivasrevision(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (26))
                              ORDER BY id_otr DESC");

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

      public function ordenesasignadas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (23))
                              ORDER BY id_otr DESC");

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

      public function listar_ordenesservactivasrevisionusuario(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados     as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16 INNER JOIN equiposporusuario  as t17
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.id_con = ordenservicio.contactocliente_otr)
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))       and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (26))              and
                                      t10.id_equ                        = t17.equipo_eus
                              ORDER BY id_otr DESC");

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
    
      public function listar_ordenesserv(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,    t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ, t18.id_actividad
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados       as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores   as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes   as t8
                                     INNER JOIN equipos            as t10 INNER JOIN clasificacionABC as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas           as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion      as t16 INNER JOIN ubicaciones      as t17
                                     INNER JOIN cumplimientooserv  as t18
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr and 
                                                             estado_con = 31 )
                              WHERE ordenservicio.id_otr = t18.id_cosv and 
                                    ((ordenservicio.tipooperacion_otr != 3)         and (ordenservicio.tipooperacion_otr != 4))         and  
                                      ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr          = t2.id_est   and
                                      t17.ciudad_ubi                   = t3.id_ciu  and ordenservicio.proveedor_otr       = t4.id_int   and
                                      ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	    = t6.id_emp   and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr          = t10.id_equ  and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	    = t12.id_tmt  and
                                      t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and t17.equipo_ubi = t10.id_equ and t17.estado_ubi = 31
                              ORDER BY id_otr DESC");

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

      public function listar_ordenesservcumplimiento(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,    t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
          t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
          t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
          t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
          contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
          t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
          datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
          datosadicionalequipos.nombrealterno_dequ, t17.*, t18.descripcion_fmt, ' ' as blanco,
          CONCAT(vista_empleados1.primer_nombre_emp,' ',
          vista_empleados1.primer_apellido_emp) as nombretecnicodos,
          pendienteoserv.*, t19.*
   FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados        as t2 
          INNER JOIN ciudades           as t3  INNER JOIN interlocutores    as t4  INNER JOIN interlocutores_cli as t5
          INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes    as t8
          INNER JOIN equipos            as t10 INNER JOIN clasificacionABC  as t11
          INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas            as t13 INNER JOIN tiposservicio as t15
          INNER JOIN tipooperacion      as t16 INNER JOIN cumplimientooserv as t17 INNER JOIN fallasdemtto  as t18
          INNER JOIN tiposdefallas      as t19
          left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
          left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr and estado_con = 31 )
          LEFT JOIN vista_empleados1 ON (t17.operariodos_cosv = vista_empleados1.id_emp)
          LEFT JOIN pendienteoserv ON (t17.id_actividad = pendienteoserv.id_pot)
   WHERE ((ordenservicio.tipooperacion_otr != 3)         and (ordenservicio.tipooperacion_otr != 4))         and  
           ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr          = t2.id_est   and
           ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr       = t4.id_int   and
           ordenservicio.cliente_otr        = t5.id_cli  and t17.operario_cosv           	    = t6.id_emp   and
           ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr          = t10.id_equ  and
           ordenservicio.prioridad_otr 	   = t11.id_abc and t17.tipo_cosv      	    = t12.id_tmt  and
           t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr    = t15.id_tser and
           ordenservicio.tipooperacion_otr  = t16.id_tope and ordenservicio.id_otr             = t17.id_cosv and
           t17.tipofallamtto_cosv           = t18.id_fmt AND t18.tipodefalla_fmt = t19.id_tfa 
   ORDER BY id_otr DESC");

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

      public function listar_ordenesservterminadas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,    t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope
               FROM   ordenservicio  INNER JOIN empresa            as t1  INNER JOIN estados            as t2 INNER JOIN ciudades as t3
                                     INNER JOIN interlocutores     as t4  INNER JOIN interlocutores_cli as t5 INNER JOIN interlocutores_emp as t6
                                     INNER JOIN subgrupopartes     as t8  INNER JOIN equipos            as t10 INNER JOIN clasificacionABC  as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas             as t13 INNER JOIN tiposservicio     as t15
                                     INNER JOIN tipooperacion  as t16   
                              WHERE ((ordenservicio.tipooperacion_otr != 3)         and (ordenservicio.tipooperacion_otr != 4))         and  
                                      ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr          = t2.id_est   and
                                      ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr       = t4.id_int   and
                                      ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	    = t6.id_emp   and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr          = t10.id_equ  and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	    = t12.id_tmt  and
                                      t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and  ordenservicio.estado_otr IN (27)
                              ORDER BY id_otr DESC");

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

      public function listar_ordenesservusuario(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,    t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio  INNER JOIN empresa as t1 INNER JOIN estados       as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores   as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes   as t8
                                     INNER JOIN equipos            as t10 INNER JOIN clasificacionABC as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas           as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16 INNER JOIN equiposporusuario  as t17
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)        
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr and 
                                                             estado_con = 31 )
                              WHERE ((ordenservicio.tipooperacion_otr != 3)          and (ordenservicio.tipooperacion_otr != 4))         and  
                                      ordenservicio.empresa_otr        = t1.id_emp   and ordenservicio.estado_otr          = t2.id_est   and
                                      ordenservicio.ciudad_otr         = t3.id_ciu   and ordenservicio.proveedor_otr       = t4.id_int   and
                                      ordenservicio.cliente_otr        = t5.id_cli   and ordenservicio.operario_otr   	   = t6.id_emp   and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre  and ordenservicio.equipo_otr          = t10.id_equ  and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc  and ordenservicio.tipo_otr      	     = t12.id_tmt  and
                                      t10.marca_equ  	                 = t13.id_mar  and ordenservicio.tiposervicio_otr    = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope and t10.id_equ                        = t17.equipo_eus
                              ORDER BY id_otr DESC");

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

      public function listar_ordeneschequeo(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE (ordenservicio.tipooperacion_otr IN ( 3, 4, 6))    and  
                                      ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr        = t2.id_est   and
                                      ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr     = t4.id_int   and
                                      ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	  = t6.id_emp   and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr        = t10.id_equ  and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	  = t12.id_tmt  and
                                      t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr  = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope
                              ORDER BY id_otr DESC");

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

      public function listar_ordeneschequeoactivas(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                     t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                     t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                     t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                     contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                     t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                     datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                     datosadicionalequipos.nombrealterno_dequ
                              FROM   ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                     INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                     INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes as t8
                                     INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                     INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                     INNER JOIN tipooperacion  as t16
                                     left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                     left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE  (ordenservicio.tipooperacion_otr IN ( 3, 4, 6 ))   and (ordenservicio.estado_otr   IN (21,22,23,25,26,34)) and 
                                      ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
                                      ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
                                      ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
                                      ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
                                      ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
                                      t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
                                      ordenservicio.tipooperacion_otr  = t16.id_tope
                              ORDER BY id_otr DESC");

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
    
      public function get($id_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
         $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                    t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                    t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                    t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                    contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                    t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                    datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                    datosadicionalequipos.nombrealterno_dequ
                              FROM  ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                    INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                    INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
                                    INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                    INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                    INNER JOIN tipooperacion  as t16
                                    left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                    left join contactos on (contactos.nitinterlocutor_con = ordenservicio.nitcliente_otr)
                              WHERE ordenservicio.id_otr             = $id_otr    and 
                                    ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
                                    ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
                                    ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
                                    ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
                                    ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
                                    t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
                                    ordenservicio.tipooperacion_otr  = t16.id_tope
                              ORDER BY id_otr DESC");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leerot($id_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
         $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                    t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                    t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                    t8.descripcion_sgre, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                    t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                    datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                    datosadicionalequipos.nombrealterno_dequ, t17.primer_nombre_con, t17.primer_apellido_con, 
                                    t17.telefono_con, t17.email_con
                              FROM  ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                    INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                    INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
                                    INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                    INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                    INNER JOIN tipooperacion  as t16 INNER JOIN contactos  as t17
                                    left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                              WHERE ordenservicio.id_otr             = $id_otr    and 
                                    ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
                                    ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
                                    ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
                                    ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
                                    ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
                                    t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
                                    ordenservicio.tipooperacion_otr  = t16.id_tope and ordenservicio.contactocliente_otr = t17.id_con
                              ORDER BY id_otr DESC");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_otr => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leeordentecnico($operario_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
         $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                    t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                    t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                    t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                    contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                    t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                    datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                    datosadicionalequipos.nombrealterno_dequ
                              FROM  ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                    INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                    INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
                                    INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                    INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                    INNER JOIN tipooperacion  as t16
                                    left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                    left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ordenservicio.operario_otr       = $operario_otr  and 
                                    ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
                                    ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
                                    ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
                                    ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
                                    ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
                                    t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
                                    ordenservicio.tipooperacion_otr  = t16.id_tope and (ordenservicio.estado_otr IN (21,22,23,25,26,34 ))
                              ORDER BY id_otr DESC");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leetodasordentecnico($operario_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
         $data = DB::select("SELECT ordenservicio.*,     t1.nombre_emp,       t2.nombre_est,       t3.nombre_ciu, t4.razonsocial_int,
                                    t5.razonsocial_cli,  t5.razonsocial_cli,  t5.telefono_cli,     t5.email_cli,  t6.primer_nombre_emp,
                                    t6.primer_apellido_emp,  concat(t6.primer_nombre_emp,' ',t6.primer_apellido_emp) as nombretecnico,
                                    t8.descripcion_sgre, contactos.primer_nombre_con, contactos.primer_apellido_con, contactos.telefono_con,
                                    contactos.email_con, t10.codigo_equ,      t10.antiguedad_equ,  t10.marca_equ,  t11.descripcion_abc,
                                    t12.descripcion_tmt, t13.descripcion_mar, t15.descripcion_tser,t16.descripcion_tope,
                                    datosadicionalequipos.modelo_dequ, datosadicionalequipos.serie_dequ, datosadicionalequipos.referencia_dequ,
                                    datosadicionalequipos.nombrealterno_dequ
                              FROM  ordenservicio INNER JOIN empresa as t1 INNER JOIN estados      as t2 
                                    INNER JOIN ciudades           as t3  INNER JOIN interlocutores as t4  INNER JOIN interlocutores_cli as t5
                                    INNER JOIN interlocutores_emp as t6  INNER JOIN subgrupopartes     as t8
                                    INNER JOIN equipos        as t10 INNER JOIN clasificacionABC   as t11
                                    INNER JOIN tiposmantenimiento as t12 INNER JOIN marcas         as t13 INNER JOIN tiposservicio      as t15
                                    INNER JOIN tipooperacion  as t16
                                    left join datosadicionalequipos on (datosadicionalequipos.id_dequ = ordenservicio.equipo_otr)
                                    left join contactos on (contactos.identificacion_con = ordenservicio.nitcliente_otr)
                              WHERE ordenservicio.operario_otr       = $operario_otr  and 
                                    ordenservicio.empresa_otr        = t1.id_emp  and ordenservicio.estado_otr       = t2.id_est   and
                                    ordenservicio.ciudad_otr         = t3.id_ciu  and ordenservicio.proveedor_otr    = t4.id_int   and
                                    ordenservicio.cliente_otr        = t5.id_cli  and ordenservicio.operario_otr   	 = t6.id_emp   and
                                    ordenservicio.subgrupoequipo_otr = t8.id_sgre and ordenservicio.equipo_otr       = t10.id_equ  and
                                    ordenservicio.prioridad_otr 	   = t11.id_abc and ordenservicio.tipo_otr      	 = t12.id_tmt  and
                                    t10.marca_equ  	                 = t13.id_mar and ordenservicio.tiposervicio_otr = t15.id_tser and
                                    ordenservicio.tipooperacion_otr  = t16.id_tope
                              ORDER BY id_otr DESC");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function leeotmaquina($equipo_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
         $data = DB::select("SELECT ordenservicio.*, t1.codigo_equ, t1.descripcion_equ
                              FROM  ordenservicio INNER JOIN equipos as t1
                              WHERE ordenservicio.equipo_otr = $equipo_otr and ordenservicio.equipo_otr = t1.id_equ
                              ORDER BY ordenservicio.id_otr DESC");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }

      public function update(Request $request, $id_otr){
        try {
          $data['estado_otr']           = $request['estado_otr'];
          $data['tipo_otr']             = $request['tipo_otr'];
          $data['tipooperacion_otr']    = $request['tipooperacion_otr'];
          $data['tiposervicio_otr']     = $request['tiposervicio_otr'];
          $data['fechaprogramada_otr']  = $request['fechaprogramada_otr'];
          $data['fechainicia_otr']      = $request['fechainicia_otr'];
          $data['fechafinal_otr']       = $request['fechafinal_otr'];
          $data['diasoperacion_otr']    = $request['diasoperacion_otr'];
          $data['equipo_otr']           = $request['equipo_otr'];
          $data['proveedor_otr']        = $request['proveedor_otr'];
          $data['cliente_otr']          = $request['cliente_otr'];
          $data['operario_otr']         = $request['operario_otr'];
          $data['operariodos_otr']      = $request['operariodos_otr'];
          $data['contactocliente_otr']  = $request['contactocliente_otr'];
          $data['nitcliente_otr']       = $request['nitcliente_otr'];
          $data['subgrupoequipo_otr']   = $request['subgrupoequipo_otr'];
          $data['ciudad_otr']           = $request['ciudad_otr'];
          $data['resumenorden_otr']     = $request['resumenorden_otr'];
          $data['prioridad_otr']        = $request['prioridad_otr'];
          $data['empresa_otr']          = $request['empresa_otr'];
          $data['horometro_otr']        = $request['horometro_otr'];
          $data['iniciatransporte_otr'] = $request['iniciatransporte_otr'];
          $data['finaltransporte_otr']  = $request['finaltransporte_otr'];
          $data['tiempotransporte_otr'] = $request['tiempotransporte_otr'];
          $data['tiempoorden_otr']      = $request['tiempoorden_otr'];
          $data['iniciaparomaquina_otr'] = $request['iniciaparomaquina_otr'];
          $data['finalparomaquina_otr']  = $request['finalparomaquina_otr'];
          $data['tiempoparo_otr']        = $request['tiempoparo_otr'];


          $res = Ordenes::where("id_otr",$id_otr)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function cancelar($id_otr){
        try {
          $data['estado_otr'] = 32;
          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update ordenservicio set estado_otr = 32 where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function ordenprogramada($id_otr){
        try {
          $data['estado_otr'] = 34;
          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update ordenservicio set estado_otr = 34 where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function pasararevision($id_actividad){
        try {
          $data['estado_otr'] = 26;
          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update ordenservicio set estado_otr = 26 where id_actividad = ?', [$id_actividad]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function sumartiempoactividades($id_otr){
        try {
          //$data['estado_otr'] = 26;
          $res = DB::update('update ordenservicio set tiempoorden_otr = (select sum(tiempoactividad_cosv)  
                             from cumplimientooserv where ordenservicio.id_otr = cumplimientooserv.id_cosv)
                             where ordenservicio.id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function cerrarOT($id_otr){
        try {
          $data['estado_otr'] = 27;
          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update ordenservicio set estado_otr = 27 where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function actualizafinaltransporte($id_otr){
        try {
          $data['finaltransporte_otr'] = NOW();
          $res = DB::update('update ordenservicio set finaltransporte_otr =  '."NOW()".' where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
      
      public function actualizainiciatransporte($id_otr){
        try {
          $data['finaltransporte_otr'] = NOW();
          $res = DB::update('update ordenservicio set iniciatransporte_otr =  '."NOW()".' where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function updatiempoparo(Request $request, $id_otr){
        try {
          $data['tiempoparo_otr'] = $request->tiempoparo;
          //echo $id_otr;
          //echo json_encode($request->tiempoparo);
          //echo json_encode($request);
          
          $res = Ordenes::where("id_otr",$id_otr)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function otasignada($id_otr){
        try {
          $data['estado_otr'] = 23;
          //$res = Ordenes::where("id_otr",$id_otr)->update($id_otr);
          //$res = DB::select('update estado_otr = 32 where id_otr = ?', [$id_otr]);
          $res = DB::update('update ordenservicio set estado_otr = 23 where id_otr = ?', [$id_otr]);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      } 

      public function updateestadoasignado(Request $request, $id_otr){
        try {
          $data['estado_otr']           = $request['estado_otr'];
          $data['tipo_otr']             = $request['tipo_otr'];
          $data['tipooperacion_otr']    = $request['tipooperacion_otr'];
          $data['tiposervicio_otr']     = $request['tiposervicio_otr'];
          $data['fechaprogramada_otr']  = $request['fechaprogramada_otr'];
          $data['fechainicia_otr']      = $request['fechainicia_otr'];
          $data['fechafinal_otr']       = $request['fechafinal_otr'];
          $data['diasoperacion_otr']    = $request['diasoperacion_otr'];
          $data['equipo_otr']           = $request['equipo_otr'];
          $data['proveedor_otr']        = $request['proveedor_otr'];
          $data['cliente_otr']          = $request['cliente_otr'];
          $data['operario_otr']         = $request['operario_otr'];
          $data['operariodos_otr']      = $request['operariodos_otr'];
          $data['contactocliente_otr']  = $request['contactocliente_otr'];
          $data['nitcliente_otr']       = $request['nitcliente_otr'];
          $data['subgrupoequipo_otr']   = $request['subgrupoequipo_otr'];
          $data['ciudad_otr']           = $request['ciudad_otr'];
          $data['resumenorden_otr']     = $request['resumenorden_otr'];
          $data['prioridad_otr']        = $request['prioridad_otr'];
          $data['empresa_otr']          = $request['empresa_otr'];
          $data['horometro_otr']        = $request['horometro_otr'];
          $data['iniciatransporte_otr'] = $request['iniciatransporte_otr'];
          $data['finaltransporte_otr']  = $request['finaltransporte_otr'];
          $data['tiempotransporte_otr'] = $request['tiempotransporte_otr'];
          $data['tiempoorden_otr']      = $request['tiempoorden_otr'];
          $data['iniciaparomaquina_otr'] = $request['iniciaparomaquina_otr'];
          $data['finalparomaquina_otr']  = $request['finalparomaquina_otr'];
          $data['tiempoparo_otr']        = $request['tiempoparo_otr'];
          
          $res = Ordenes::where("id_otr",$id_otr)->update($data);
      
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) 
        {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function delete($id_otr){ 
        try {
          $res = Ordenes::where("id_otr",$id_otr)->delete($id_otr);
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