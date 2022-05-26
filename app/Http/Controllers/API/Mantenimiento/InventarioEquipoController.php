<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mantenimiento\InventarioEquipo;
use App\Models\Mantenimiento\Equipos;


class InventarioEquipoController extends Controller
{
    //
    public function create(Request $request){

        try {   
                $insert['id_inve']              = $request['id_inve'];
                $insert['equipo_inve']          = $request['equipo_inve'];
                $insert['fechainventario_inve'] = $request['fechainventario_inve'];
                $insert['serieequipo_inve']     = $request['serieequipo_inve'];
                $insert['estado_inve']          = $request['estado_inve'];
  
                InventarioEquipo::insert($insert);
    
                $response['message'] = "Inventario Grabado de forma correcta";
                $response['success'] = true;
            }   catch (\Exception $e) {
                $response['message'] = $e->getMessage();
                $response['success'] = false;
        }       
        return $response;
    }
  
        public function listar_inventarioequipo(){
  
          try {
  
            $data = InventarioEquipo::get();
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
      }
  
        public function get($id_inve){
  
          try {
    
            $data = InventarioEquipo::find($id_inve);
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_inve => $id_inve";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_inve){
  
          try {
            $data['id_inve']              = $request['id_inve'];
            $data['equipo_inve']          = $request['equipo_inve'];
            $data['fechainventario_inve'] = $request['fechainventario_inve'];
            $data['serieequipo_inve']     = $request['serieequipo_inve'];
            $data['estado_inve']          = $request['estado_inve'];

            $res = InventarioEquipo::where("id_inve", $id_inve)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_inve){
  
        try {
                $res = InventarioEquipo::where("id_inve",$id_inve)->delete($id_inve);
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
