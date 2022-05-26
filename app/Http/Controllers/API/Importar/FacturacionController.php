<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\Facturacion;


class FacturacionController extends Controller
{
    //
    public function importarfacturacion(Request $request){

        try {
            $insert['id_fac']       = $request['id_fac'];
            $insert['anno_fac']     = $request['anno_fac'];
            $insert['mes_fac']      = $request['mes_fac'];
            $insert['periodo_fac']  = $request['periodo_fac'];
            $insert['equipo_fac']   = $request['equipo_fac'];
            $insert['valor_fac']    = $request['valor_fac'];
  
            Contrataciones::insert($insert);
    
            $response['message'] = "Factura Grabada de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
      }
  
      public function listar_facturacion(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.descripcion_equ, cliente_ctr, razonsocial_cli
            FROM  facturacion as t0 INNER JOIN equipos as t1 INNER JOIN contratos as t2 INNER JOIN interlocutores_cli as t3
            WHERE t0.equipo_fac = t1.codigo_equ and t1.id_equ = t2.id_ctr and t2.cliente_ctr = t3.id_cli");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_factconsoequipo(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT equipo_fac, sum(valor_fac) AS ventatotal
            FROM facturacion 
            GROUP BY equipo_fac");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      
      public function listar_factconsomes(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT mes_fac, sum(valor_fac) AS ventatotal, nombremes_nme
            FROM facturacion, nombremes
            where facturacion.mes_fac = nombremes.numeromes_nme
            GROUP BY mes_fac, nombremes_nme");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_factmes($mes_fac){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT equipo_fac, sum(valor_fac) AS ventatotal, nombremes_nme
            FROM facturacion, nombremes
            where facturacion.mes_fac = nombremes.numeromes_nme and  facturacion.mes_fac = $mes_fac
            GROUP BY equipo_fac, nombremes_nme");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_factmesequipo($codigo_fac){
        try {
            $data = DB::select("SELECT t0.equipo_fac, t0.valor_fac as valorfactura, t1.nombremes_nme, consolidadocontrataciones.valorcontratacion_ctrt as valorcontratacion,
                                       consolidadoconsurepuestos.costototal_cre as valorrepuesto, consolidadomttocorrectivo.valorcorrectivo_corr as valorcorrectivo,
                                       consolidadomttopreventivo.valorpreventivo_pre as valorpreventivo,
                                       (t0.valor_fac -(consolidadocontrataciones.valorcontratacion_ctrt + consolidadoconsurepuestos.costototal_cre +
                                                       consolidadomttocorrectivo.valorcorrectivo_corr + consolidadomttopreventivo.valorpreventivo_pre )
                                       ) as roi
            FROM facturacion as t0 INNER JOIN nombremes     as t1 
                                   left join consolidadocontrataciones on (consolidadocontrataciones.codigo_ctrt = t0.codigo_fac)
                                   left join consolidadoconsurepuestos on (consolidadoconsurepuestos.codigo_cre = t0.codigo_fac) 
                                   left join consolidadomttocorrectivo on (consolidadomttocorrectivo.codigo_corr = t0.codigo_fac)
                                   left join consolidadomttopreventivo on (consolidadomttopreventivo.codigo_pre = t0.codigo_fac)           
            where t0.mes_fac     = t1.numeromes_nme and
                  t0.codigo_fac = $codigo_fac");
            
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }

        public function listar_factperiodo($periodo_fac){
          try {
              $data = DB::select("SELECT t0.equipo_fac, t0.periodo_fac, t0.codigo_fac, t0.valor_fac as valorfactura
               FROM facturacion as t0 
              WHERE t0.periodo_fac = $periodo_fac");
              
              $response['data'] = $data;
              $response['message'] = "load successful";
              $response['success'] = true;
      
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
            }
            return $response;
          }
    
        public function leerfactcodigomes($codigo_fac){
        try {
            $data = DB::select("SELECT t0.*
            FROM  datoscostoscontratacionesconsumos as t0      
            where t0.codigoperiodo = $codigo_fac");
            
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function get($id_inv){
    
          try {    
              //$data = Especialidades::find($id_esp);
              $data = DB::select("SELECT t0.*,  t1.descripcion_alm, t2.nombre_est, t3.descripcion_tprd, t4.descripcion_talm,
                                                t5.descripcion_tope
              FROM inventarios as t0 INNER JOIN almacenes      as t1 INNER JOIN estados     as t2 
                                     INNER JOIN tiposproductos as t3 INNER JOIN tipoalmacen as t4 INNER JOIN tipooperacion as t5 
              WHERE t0.almacen_inv      = t1.id_alm  and t0.estado_inv      = t2.id_est  and t0.tipooperacion_inv = t5.id_tope and
                    t0.tipoproducto_inv = t3.id_tprd and t1.tipoalmacen_alm = t4.id_talm and t0.id_inv = $id_inv");
      
              if ($data) {
                $response['data'] = $data;
                $response['message'] = "Load successful";
                $response['success'] = true;
              }
              else {
                $response['data'] = null;
                $response['message'] = "Not found data id_inv => $id_inv";
                $response['success'] = false;
              }
      
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_inv){
            try {
              $data['tipooperacion_inv']        = $request['tipooperacion_inv'];
              $data['almacen_inv']              = $request['almacen_inv'];
              $data['descripcion_inv']          = $request['descripcion_inv'];
              $data['referencia_inv']           = $request['referencia_inv'];
              $data['tipoproducto_inv']         = $request['tipoproducto_inv'];
              $data['fechaactualizacion_inv']   = $request['fechaactualizacion_inv'];
              $data['horaactualizacion_inv']    = $request['horaactualizacion_inv'];
              $data['existencia_inv']           = $request['existencia_inv'];
              $data['costounitponderado_inv']   = $request['costounitponderado_inv'];
              $data['costototalponderado_inv']  = $request['costototalponderado_inv'];
              $data['estado_inv']               = $request['estado_inv'];
    
              //Console::info('mymessage');
    
              $res = Contrataciones::where("id_inv",$id_inv)->update($data);
    
              $response['res'] = $res;
              $response['message'] = "Updated successful";
              $response['success'] = true;
      
            } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
            }
            return $response;
      
          }
    
          public function delete($id_inv){
    
            try {
              $res = Contrataciones::where("id_inv",$id_inv)->delete($id_inv);
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
