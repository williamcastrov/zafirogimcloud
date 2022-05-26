<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\ConsumosRepuestos;

class ConsumosRepuestosController extends Controller
{
    //
    public function importarconsumosrepuestos(Request $request){

        try {
            $insert['id_cre']            = $request['id_cre'];
            $insert['anno_cre']          = $request['anno_cre'];
            $insert['mes_cre']           = $request['mes_cre'];
            $insert['periodo_cre']       = $request['periodo_cre'];
            $insert['tr_cre']            = $request['tr_cre']; 
            $insert['documento_cre']     = $request['documento_cre'];
            $insert['concepto_cre']      = $request['concepto_cre'];
            $insert['fecha_cre']         = $request['fecha_cre'];
            $insert['idequipo_cre']      = $request['idequipo_cre'];
            $insert['codigo_cre']        = $request['codigo_cre'];
            $insert['documentodest_cre'] = $request['documentodest_cre'];
            $insert['bodega_cre']        = $request['bodega_cre'];
            $insert['referencia_cre']    = $request['referencia_cre']; 
            $insert['descripcion_cre']   = $request['descripcion_cre'];
            $insert['centrocosto_cre']   = $request['centrocosto_cre'];
            $insert['cantidad_cre']      = $request['cantidad_cre']; 
            $insert['costounitario_cre'] = $request['costounitario_cre'];
            $insert['costototal_cre']    = $request['costototal_cre']; 
            $insert['valorbruto_cre']    = $request['valorbruto_cre'];

            ConsumosRepuestos::insert($insert);
    
            $response['message'] = "Consumos de repuestos Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
      }
  
      public function listar_consumosrepuestos(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM consumosrepuestos as t0");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      
      public function listar_consumosrepuestosperiodo($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*
            FROM consumosrepuestos as t0
            WHERE t0.periodo_cre = $periodo");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }


      public function listar_consolidaconsrep(){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno_cre, mes_cre, idequipo_cre, codigo_cre, sum(cantidad_cre) as cantidad_cre, 
                                       costounitario_cre, sum(costototal_cre) as costototal_cre, sum(valorbruto_cre) as valorbruto_cre
            FROM consumosrepuestos as t0
            GROUP BY anno_cre, mes_cre, idequipo_cre, codigo_cre, costounitario_cre");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function paretoconsolidadoconsumosrep($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno_cre, mes_cre, codigo_cre, idequipo_cre, sum(costototal_cre) as paretovalorconsumosrep
            FROM consumosrepuestos
            WHERE periodo_cre = $periodo
            GROUP BY anno_cre, mes_cre, codigo_cre, idequipo_cre
            ORDER BY costototal_cre DESC ");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function consolidadoconsumosrepmes($periodo){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno_cre, mes_cre, periodo_cre,  sum(costototal_cre) as valorconsumosrepmes
            FROM consumosrepuestos
            WHERE periodo_cre = $periodo
            GROUP BY anno_cre, mes_cre, periodo_cre");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_consumosmesequipo($codigo_cre){
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT anno_cre, mes_cre, codigo_cre, idequipo_cre, sum(costototal_cre) as valorconsumosrepmes
            FROM consumosrepuestos
            WHERE codigo_cre = $codigo_cre
            GROUP BY anno_cre, mes_cre, codigo_cre, idequipo_cre");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
      
}
