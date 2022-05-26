<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosEquipos extends Model
{
    use HasFactory;

    protected $table = "datosadicionalequipos";

    protected $primaryKey = "id_dequ";

    protected $fillable = [
        'serie_dequ',
        'referencia_dequ',
        'modelo_dequ',
        'nombrealterno_dequ',
        'annofabricacion_dequ',
        'clasificacionABC_dequ',
        'centrodecosto_dequ',
        'tipomoneda_dequ',
        'direccion_dequ',
        'fechacreacion_dequ',
        'fechamodificacion_dequ',
    ];

    public $timestamps = false;
}
