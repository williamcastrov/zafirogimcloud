<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Mantenimiento\CambioElementos;
use PDF; // at the top of the file

class CambioElementosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['cliente_cel']        = $request['cliente_cel'];
          $insert['ciudad_cel']         = $request['ciudad_cel'];
          $insert['direccion_cel']      = $request['direccion_cel'];
          $insert['fechacreacion_cel']  = $request['fechacreacion_cel'];
          $insert['estado_cel']         = $request['estado_cel'];
          $insert['equipoentrega1_cel'] = $request['equipoentrega1_cel'];
          $insert['equiporecibe1_cel']  = $request['equiporecibe1_cel'];
          $insert['equipoentrega2_cel'] = $request['equipoentrega2_cel'];
          $insert['equiporecibe2_cel']  = $request['equiporecibe2_cel'];
          $insert['equipoentrega3_cel'] = $request['equipoentrega3_cel'];
          $insert['equiporecibe3_cel']  = $request['equiporecibe3_cel'];

          CambioElementos::insert($insert);
      
          $response['message'] = "Cambio de Elementos Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_cambioelementos(){  
        try {   
          $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.*, t4.nombre_dep, t5.codigo_equ, t5.marca_equ
          FROM cambioelementos as t0 INNER JOIN ciudades      as t1 INNER JOIN estados as t2 INNER JOIN interlocutores_cli as t3
                                     INNER JOIN departamentos as t4 INNER JOIN equipos as t5
          WHERE t0.ciudad_cel = t1.id_ciu and t0.estado_cel = t2.id_est and t0.cliente_cel = t3.id_cli 
            and t4.id_dep = t1.departamento_ciu and t0.equipoentrega1_cel = t5.id_equ");

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
        $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.*, t4.nombre_dep
        FROM cambioelementos as t0 INNER JOIN ciudades      as t1 INNER JOIN estados as t2 INNER JOIN interlocutores_cli as t3
                                   INNER JOIN departamentos as t4
        WHERE t0.ciudad_cel = t1.id_ciu and t0.estado_cel = t2.id_est and t0.cliente_cel = t3.id_cli 
          and t4.id_dep = t1.departamento_ciu and t0.id_cel = $id");

        $data0 = DB::select("SELECT t0.equipoentrega1_cel, t1.codigo_equ, t1.marca_equ, t2.serie_dequ, t2.referencia_dequ,
                                    t2.modelo_dequ, t3.descripcion_mar, t1.descripcion_equ
        FROM cambioelementos as t0 INNER JOIN equipos as t1 INNER JOIN datosadicionalequipos as t2 INNER JOIN marcas as t3
        WHERE t0.equipoentrega1_cel = t1.id_equ and t0.id_cel = $id and t2.id_dequ = t1.id_equ and t3.id_mar = t1.marca_equ");
        
        $data1 = DB::select("SELECT t0.equipoentrega2_cel, t1.codigo_equ, t1.marca_equ, t2.serie_dequ, t2.referencia_dequ,
        t2.modelo_dequ, t3.descripcion_mar, t1.descripcion_equ
        FROM cambioelementos as t0 INNER JOIN equipos as t1 INNER JOIN datosadicionalequipos as t2 INNER JOIN marcas as t3
        WHERE t0.equipoentrega2_cel = t1.id_equ and t0.id_cel = $id  and t2.id_dequ = t1.id_equ and t3.id_mar = t1.marca_equ");

        $data2 = DB::select("SELECT t0.equiporecibe1_cel, t1.codigo_equ, t1.marca_equ, t2.serie_dequ, t2.referencia_dequ,
        t2.modelo_dequ, t3.descripcion_mar, t1.descripcion_equ
        FROM cambioelementos as t0 INNER JOIN equipos as t1 INNER JOIN datosadicionalequipos as t2 INNER JOIN marcas as t3
        WHERE t0.equiporecibe1_cel = t1.id_equ and t0.id_cel = $id and t2.id_dequ = t1.id_equ and t3.id_mar = t1.marca_equ");

        $data3 = DB::select("SELECT t0.equiporecibe2_cel, t1.codigo_equ, t1.marca_equ, t2.serie_dequ, t2.referencia_dequ,
        t2.modelo_dequ, t3.descripcion_mar, t1.descripcion_equ
        FROM cambioelementos as t0 INNER JOIN equipos as t1 INNER JOIN datosadicionalequipos as t2 INNER JOIN marcas as t3
        WHERE t0.equiporecibe2_cel = t1.id_equ and t0.id_cel = $id and t2.id_dequ = t1.id_equ and t3.id_mar = t1.marca_equ");

        $actividad1 = "Primera";
        $fechainicia1 = "2022-03-21";
        $fechafinal1= "2022-03-21";

        PDF::SetMargins(7, 10, 7);
        PDF::SetTitle('OT Cliente - LOGISTRAL S.A.' );
        PDF::AddPage();
        PDF::SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        // create some HTML content
        
        $subtable = '<table border="1" cellspacing="6" cellpadding="4"><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>';
   
        PDF::Image('/var/www/bc-gim/resources/js/server/server/src/images/logologistral.jpeg', 5, 5, 40, 20, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
        $html = '
          <br/>
          <h4 align="center" > LOGISTRAL S.A. Nit 900.161.726-3 - ACTIVIDAD #  '.$data[0]->id_cel.'</h4>
          <br/>
          <h4 align="left" > La Estrella, '.date('d-m-Y').'  </h4>
          
          <div >
          De Logística Estructural S.A. con NIT. 900.161.726-3, les notificamos de manera formal
          que de acuerdo al contrato de renta que tenemos vigente a la fecha, se hace cambio de
          los siguientes elementos:
          </div>

          <h4>
          ELEMENTO(S) ENTREGADO(S): 
          </h4>
          
          <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
          
          
          <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important " >
            
            <td width="50px">ID</td>
            <td>Referencia</td>
            <td width="150px">Descripción</td>
            <td>Marca</td>
            <td width="90px">Modelo</td>
            <td>Serie</td>
          </tr>
          <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important" >
            <td  width="50px">
              '.$data0[0]->codigo_equ.'
            </td>  
            <td >
              '.$data0[0]->referencia_dequ.'
            </td>
            <td >
              '.$data0[0]->descripcion_equ.'
            </td>
            <td >
              '.$data0[0]->descripcion_mar.'
            </td>
            <td >
              '.$data0[0]->modelo_dequ.'
            </td>
            <td >
              '.$data0[0]->serie_dequ.'
            </td>
          </tr>
            
            <br/>

          <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important" >
            <td  width="50px">
              '.$data1[0]->codigo_equ.'
            </td>  
            <td >
              '.$data1[0]->referencia_dequ.'
            </td>
            <td >
              '.$data1[0]->descripcion_equ.'
            </td>
            <td >
              '.$data1[0]->descripcion_mar.'
            </td>
            <td >
              '.$data1[0]->modelo_dequ.'
            </td>
            <td >
              '.$data1[0]->serie_dequ.'
            </td>
          </tr>

        </table>
        <h4>
          ELEMENTO(S) RECIBIDOS(S): 
        </h4>

        <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
          
          
        <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important " >
          
          <td width="50px">ID</td>
          <td>Referencia</td>
          <td width="150px">Descripción</td>
          <td>Marca</td>
          <td width="90px">Modelo</td>
          <td>Serie</td>
        </tr>
        <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important" >
          <td  width="50px">
            '.$data2[0]->codigo_equ.'
          </td>  
          <td >
            '.$data2[0]->referencia_dequ.'
          </td>
          <td >
            '.$data2[0]->descripcion_equ.'
          </td>
          <td >
            '.$data2[0]->descripcion_mar.'
          </td>
          <td >
            '.$data2[0]->modelo_dequ.'
          </td>
          <td >
            '.$data2[0]->serie_dequ.'
          </td>
        </tr>
          
          <br/>

        <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 9px !important" >
          <td  width="50px">
            '.$data3[0]->codigo_equ.'
          </td>  
          <td >
            '.$data3[0]->referencia_dequ.'
          </td>
          <td >
            '.$data3[0]->descripcion_equ.'
          </td>
          <td >
            '.$data3[0]->descripcion_mar.'
          </td>
          <td >
            '.$data3[0]->modelo_dequ.'
          </td>
          <td >
            '.$data3[0]->serie_dequ.'
          </td>
          </tr>
        </table>

        <br/>
        <br/>

        <div >
          Este comunicado hace parte integral del contrato de renta, para lo cual solicitamos
          por favor anexarlo al mismo.
        </div>
        <br/>

        <table border="0" cellspacing="1" cellpadding="1" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10px !important;">
          <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 12px !important " >
            <td width="250px"> Firma Responsable de Entrega</td>
            <td width="250px"> Firma Responsable Recibo</td>
          </tr>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <tr style="text-align: center !important; background-color: white; font-size: 12px !important " >
          <td width="250px"> ___________________________________</td>
          <td width="250px"> ___________________________________</td>
        </tr>
          <tr style="text-align: center !important; background-color: #F5F5F5; font-size: 12px !important " >
            <td width="250px"> LOGISTRAL S.A.</td>
            <td width="250px"> '.$data[0]->razonsocial_cli.' </td>
          </tr>
          <tr style="text-align: center !important; background-color: white; font-size: 12px !important " >
          <td width="250px"> Nombre Funcionario Logistral</td>
          <td width="250px"> Nombre Funcionario Cliente</td>
          </tr>
        </table>
          
        ';
  
        PDF::writeHTML($html, true, false, true, false, '');
        PDF::Output('CambioElemento '.$id.'.pdf' );
        //PDF::Output('OtCliente.pdf', $data[0]->orden );

      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        //$response['result'] = $path;
        $response['success'] = false;
      }
      return $response;
    }

    public function get($id_cel){
        try { 
            $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.razonsocial_cli
            FROM cambioelementos as t0 INNER JOIN ciudades as t1 INNER JOIN estados as t2 INNER JOIN interlocutores_cli as t3
            WHERE t0.ciudad_cel = t1.id_ciu and t0.estado_cel = t2.id_est and t0.cliente_cel = t3.id_cli and
                  t0.id_cel = $id_cel");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cel => $id_cel";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_cel){
        try {
            $data['cliente_cel']        = $request['cliente_cel'];
            $data['ciudad_cel']         = $request['ciudad_cel'];
            $data['direccion_cel']      = $request['direccion_cel'];
            $data['fechacreacion_cel']  = $request['fechacreacion_cel'];
            $data['estado_cel']         = $request['estado_cel'];
            $data['equipoentrega1_cel'] = $request['equipoentrega1_cel'];
            $data['equiporecibe1_cel']  = $request['equiporecibe1_cel'];
            $data['equipoentrega2_cel'] = $request['equipoentrega2_cel'];
            $data['equiporecibe2_cel']  = $request['equiporecibe2_cel'];
            $data['equipoentrega3_cel'] = $request['equipoentrega3_cel'];
            $data['equiporecibe3_cel']  = $request['equiporecibe3_cel'];

    
          $res = CambioElementos::where("id_cel",$id_cel)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_cel){ 
        try {
          $res = CambioElementos::where("id_cel",$id_cel)->delete($id_cel);
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
