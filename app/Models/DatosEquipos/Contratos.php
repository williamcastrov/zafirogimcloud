<?php

namespace App\Models\DatosEquipos;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contratos extends Model
{
    use HasFactory;

    protected $table = "contratos";

    protected $primaryKey = "codigocontrato_ctr";

    protected $fillable = [
        'id_ctr',
        'codigocontrato_ctr',
        'cliente_ctr',
        'asesorcomercial_ctr',
        'duracion_ctr',
        'fechainicio_ctr',
        'fechafinal_ctr',
        'ciudad_ctr',
        'valorcontrato_ctr',
        'estado_ctr',
        'observacion_ctr',
        'valorrentames_ctr',
        'valorfacturadomes_ctr',
        'numerodiasparo_ctr',
        'fecharegistradiasparo_ctr',
        'fechaalza_ctr',
        'diafacturacion_ctr',
        'controldiafactura_ctr',
        'controlalza_ctr',
        'horastrabajocontratadas_ctr'
    ];

    public $timestamps = false;
}
