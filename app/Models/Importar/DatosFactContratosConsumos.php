<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosFactContratosConsumos extends Model
{
    use HasFactory;

    protected $table = "datoscostoscontratacionesconsumos";

    protected $primaryKey = "id";

    protected $fillable = [
        'idequipo',
        'codigomt',
        'descripcionmt',
        'anno',
        'mes',
        'periodo',
        'codigomtanno',
        'codigoperiodo',
        'valorconsumo',
        'valorcontratos',
        'valorrentames'
    ];

    public $timestamps = false;
}
