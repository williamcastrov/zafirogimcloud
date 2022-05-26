<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activos extends Model
{
    use HasFactory;

    protected $table = "activos";

    protected $primaryKey = "id_act";

    protected $fillable = [
        'codigo_act',
        'codigocontable_act',
        'descripcion_act',
        'empresa_act',
        'propietario_act',
        'marca_act',
        'antiguedad_act',
        'valoradquisicion_act',
        'estadocontable_act',
        'ctacontable_act',
        'ctadepreciacion_act',
        'valorresidual_act',
        'costosiniva_act',
        'depreciacionacumulada_act',
        'valorneto_act',
        'valornovedad_act',
        'duracion_act',
        'depreciacionmensual_act',
        'fechainiciadepre_act',
        'fechaultimadepre_act',
        'valorenlibros_act',
        'numerocombo_act',
        'estadodepre_act',
        'observacion_act' 
    ];

    public $timestamps = false;
}
