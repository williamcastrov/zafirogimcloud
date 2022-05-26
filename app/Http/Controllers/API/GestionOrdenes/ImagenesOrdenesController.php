<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\ImagenesOrdenes;
use App\Models\GestionOrdenes\Ordenes;

class ImagenesOrdenesController extends Controller
{
    //

    public function create(Request $request){
        try { 
          $insert['id']     = $request['id'];
          $insert['type']   = $request['type'];
          $insert['name']   = $request['name'];
          $insert['url']    = $request['url'];
          $insert['data']   = $request['data'];
          $insert['orden']  = $request['orden'];
              
          ImagenesOrdenes::insert($insert);
      
          $response['message'] = "Imagen OT Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function listar_imagenesot($actividad){  
        try {

            $data = DB::select("SELECT t0.id, t0.type, t0.name, t0.url, t0.orden
            FROM  imagenesordenes as t0
            WHERE t0.orden = $actividad");
  
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
    
      public function update(Request $request, $id){
        try {
            $data['id']    = $request['id'];
            $data['type']  = $request['type'];
            $data['name']  = $request['name'];
            $data['url']   = $request['url'];
            $data['data']  = $request['data'];
            $data['orden'] = $request['orden'];
       
          $res = ImagenesOrdenes::where("id",$id)->update($data);
    
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
          $res = ImagenesOrdenes::where("id",$id)->delete($id);
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
