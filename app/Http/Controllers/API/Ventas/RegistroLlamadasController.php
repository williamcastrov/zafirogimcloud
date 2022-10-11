<?php

namespace App\Http\Controllers\API\Ventas;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ventas\RegistroLlamadas;
use PDF;

class RegistroLlamadasController extends Controller
{
    //

    public function create(Request $request){
        try {
            $insert['cliente_rll']         = $request['cliente_rll'];
            $insert['motivollamada_rll']   = $request['motivollamada_rll'];
            $insert['contacto_rll']        = $request['contacto_rll'];
            $insert['fecha_rll']           = $request['fecha_rll'];
            $insert['equipo_rll']          = $request['equipo_rll'];
            $insert['observaciones_rll']   = $request['observaciones_rll'];
            $insert['estado_rll']   = $request['estado_rll'];

            RegistroLlamadas::insert($insert);
    
            $response['message'] = "Registro llamada a Cliente grabada!";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
        }

        public function generarPdf($id){  
          try {
            $data = DB::select("SELECT t0.*, t1.*
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1
            WHERE t0.cliente_rll = t1.id_cli and t0.id_rll = $id");
            
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
            
            PDF::SetMargins(15, 30, 15);
            PDF::SetTitle('Visita Comercial - Montacargas el Zafiro S.A.S.' );
            PDF::AddPage();
            PDF::SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
            // create some HTML content
            $subtable = '<table border="1" cellspacing="6" cellpadding="4"><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';
            setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
            $d = $data[0]->fecha_rll;
            $fecha = strftime("%d de %B de %Y", strtotime($d));
            //echo $fecha; // 09 de marzo de 2010
    
            PDF::Image('/var/www/zafiro.bc-gim/resources/js/server/server/src/images/logozafiro.jpg', 15, 5, 40, 20, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
            
            $html = '
            <br/>
            <table border="0" cellspacing="3" cellpadding="1" style="font-size: 11px !important;" >
            <tr >
              <th align="left"  >
                Itagui : '.$data[0]->fecha_rll.'
              </th>
            </tr>
            <tr>
              <th align="left" >
                Cliente: '.$data[0]->razonsocial_cli.'
              </th>
            </tr>
           
            <tr>
              <th align="left" >
                Atn : 
              </th>
            </tr>
            <tr>
              <th align="left" >
                Ciudad  : 
              </th>
            </tr>
           
    
          <p  style = "text-align: justify !important; font-size: 11px !important; " >
       
            Seguimiento a los servicios y equipos entregados en renta al cliente.
     
          </p>
            </table>';
            PDF::writeHTML($html, true, false, true, false, '');
    
            $html1 = '
            <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
             <br />
            <tr style="text-align: center !important; background-color: #F5F5F5"  >
              <td>ID INTERNO</td>
              <td>Referencia:</td>
              <td>Descripción:</td>
            </tr>';
            
    
            $html1 .='
            </table>
            ';
    
            PDF::writeHTML($html1, true, false, true, false, '');
    
            $html1 = '
            <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
             <br />
            <tr style="text-align: center !important; background-color: #F5F5F5"  >
              <td>Marca: </td>
              <td>Modelo: </td>
              <td>Serie: </td>
            </tr>';
            
            $html1 .= 
            '<tr>
              <td style = "text-align: center !important; font-size: 10px !important" > </td>
              <td style = "text-align: center !important; font-size: 10px !important" > XXXXXXX </td>
              <td style = "text-align: center !important; font-size: 10px !important" >XXXXXX </td>
            </tr>';
    
            $html1 .='
            </table>
            ';
    
            PDF::writeHTML($html1, true, false, true, false, '');
    
          
          PDF::writeHTML($html1, true, false, true, false, '');
    
          $html1 = '
           <br />
            <p  style = "text-align: justify !important; font-size: 11px !important; " >
            AQUI MOSTRAREMOS LOS COMENTARIOS DE LA VISITA.
            </p>
           <br />
         ';
          PDF::writeHTML($html1, true, false, true, false, '');
    
          $html1 = '
          <br />
           <p  style = "text-align: left !important; font-size: 11px !important; " >
           Coordialmente.
           </p>
    
           <p  style = "text-align: left !important; font-size: 11px !important; " >
            ELIANA CHAVERRA
            Coordinadora comercial
           </p>
           
          <br />
        ';
         PDF::writeHTML($html1, true, false, true, false, '');
    
    
    
          PDF::Output('Carta de Alza'.$id.'.pdf');
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            //$response['result'] = $path;
            $response['success'] = false;
        }
            return $response;
        }

        public function listar_iniciovisitacomercial(){
  
            try {
  
              $data = DB::select("SELECT t0.*, t1.*
              FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1 
              WHERE t0.cliente_rll = t1.id_cli ");
    
              $response['data'] = $data;
              $response['message'] = "load successful";
              $response['success'] = true;
      
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
            }
            return $response;
          }
  
        public function listar_registrollamadas(){
  
          try {

            $data = DB::select("SELECT t0.*, t1.*, t2.nombre_ciu, t4.direccion_dequ, t4.referencia_dequ, 
                                t4.modelo_dequ, t5.nombre_est,
                                concat(t3.primer_nombre_con,' ',t3.primer_apellido_con) as nombrecontacto
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1 INNER JOIN ciudades as t2
                                        INNER JOIN contactos as t3 INNER JOIN datosadicionalequipos as t4
                                        INNER JOIN estados as t5
            WHERE t0.cliente_rll = t1.id_cli and t1.ciudad_cli = t2.id_ciu and t3.id_con = t0.contacto_rll
              and t0.equipo_rll = t4.id_dequ and t0.motivollamada_rll = t5.id_est");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }

        public function listar_registrollamadascliente($cliente_rll){
          try {
    
            $data = DB::select("SELECT t0.*, t1.*, t4.direccion_dequ, t4.referencia_dequ, t4.modelo_dequ,
                                       t5.nombre_est,
                                       concat(t3.primer_nombre_con,' ',t3.primer_apellido_con) as nombrecontacto
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1 INNER JOIN datosadicionalequipos as t4
                                        INNER JOIN estados as t5 INNER JOIN contactos as t3
            WHERE t0.cliente_rll = t1.id_cli and t0.cliente_rll = $cliente_rll and t0.equipo_rll = t4.id_dequ
              and t0.motivollamada_rll = t5.id_est and t3.id_con = t0.contacto_rll
            ORDER BY t0.id_rll ASC ");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data cliente_rll => $cliente_rll";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function get($id_rll){
          try {
            $data = DB::select("SELECT t0.*, t1.*
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1
            WHERE t0.cliente_rll = t1.id_cli and t0.id_rll = $id_rll");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_rll => $id_rll";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_rll){
          try {
            $data['cliente_rll']       = $request['cliente_rll'];
            $data['motivollamada_rll'] = $request['motivollamada_rll'];
            $data['contacto_rll']      = $request['contacto_rll'];
            $data['fecha_rll']         = $request['fecha_rll'];
            $data['equipo_rll']        = $request['equipo_rll'];
            $data['observaciones_rll'] = $request['observaciones_rll'];
            $data['estado_rll']   = $request['estado_rll'];
            //Console::info('mymessage');
  
            $res = RegistroLlamadas::where("id_rll",$id_rll)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function delete($id_rll){
          try {
            $res = RegistroLlamadas::where("id_rll",$id_rll)->delete($id_rll);
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
