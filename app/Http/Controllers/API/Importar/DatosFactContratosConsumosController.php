<?php

namespace App\Http\Controllers\API\Importar;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Importar\DatosFactContratosConsumos;

class DatosFactContratosConsumosController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['idequipo']      = $request['idequipo'];
            $insert['codigomt']      = $request['codigomt'];
            $insert['descripcionmt'] = $request['descripcionmt'];
            $insert['anno']          = $request['anno'];
            $insert['mes']           = $request['mes'];
            $insert['periodo']       = $request['periodo'];
            $insert['codigomtanno']  = $request['codigomtanno'];
            $insert['codigoperiodo'] = $request['codigoperiodo'];
            $insert['valorconsumo']  = $request['valorconsumo'];
            $insert['valorcontratos']= $request['valorcontratos'];
            $insert['valorrentames'] = $request['valorrentames'];
            
            DatosFactContratosConsumos::insert($insert);
    
            $response['message'] = "Datos Facturación Consumos Contrataciones Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }  
          return $response;
      }  
}
