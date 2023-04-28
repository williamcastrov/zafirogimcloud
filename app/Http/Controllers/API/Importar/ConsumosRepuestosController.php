<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\ConsumosRepuestos;

class ConsumosRepuestosController extends Controller
{
    //
    public function create(Request $request){
        try {
            $insert['id_cre']            = $request['id_cre'];
            $insert['idequipo_cre']      = $request['idequipo_cre'];
            $insert['concepto_cre']      = $request['concepto_cre'];
            $insert['proveedor_cre']     = $request['proveedor_cre'];
            $insert['cantidad_cre']      = $request['cantidad_cre']; 
            $insert['costounitario_cre'] = $request['costounitario_cre'];
            $insert['costototal_cre']    = $request['costototal_cre']; 
            
            ConsumosRepuestos::insert($insert);
    
            $response['message'] = "Grabado de forma correcta";
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
            $data = DB::select("SELECT t0.*, t1.id_actividad, t1.descripcion_cosv, t1.fechaprogramada_cosv, t1.fechainicia_cosv, 
		                                   t2.equipo_otr, t3.codigo_equ, t4.razonsocial_cli
                                FROM consumosrepuestos as t0
                                INNER JOIN cumplimientooserv as t1 INNER JOIN ordenservicio AS t2 INNER JOIN equipos AS t3
                                INNER JOIN interlocutores_cli AS t4
                                WHERE t0.ot_cre = t1.id_actividad
                                  AND t1.id_cosv = t2.id_otr
                                  AND t2.equipo_otr = t3.id_equ
                                  AND t4.id_cli = t2.cliente_otr");
  
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


      public function update(Request $request, $id_cre){
        try {
          $data['id_cre']            = $request['id_cre'];
          $data['idequipo_cre']      = $request['idequipo_cre'];
          $data['concepto_cre']      = $request['concepto_cre'];
          $data['proveedor_cre']     = $request['proveedor_cre'];
          $data['cantidad_cre']      = $request['cantidad_cre']; 
          $data['costounitario_cre'] = $request['costounitario_cre'];
          $data['costototal_cre']    = $request['costototal_cre']; 
    
          $res = CumplimientoOServ::where("id_cre",$id_cre)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_cre){ 
        try {
          $res = CumplimientoOServ::where("id_cre",$id_cre)->delete($id_cre);
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
