<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentesEquipos extends Model
{
    use HasFactory;

    protected $table = "componentesxequipo";

    protected $primaryKey = "id_com";

    protected $fillable = [
        'equipo_com',
        'cliente_com',
        'camara_com',
        'idcamara_com',
        'sensordeimpacto_com',
        'idsensordeimpacto_com',
        'alarmadesplazamiento_com',
        'luzestrober_com',
        'lucespuntoazul_com',
        'lucesreflectoras_com',
        'estado_com'
    ];

    public $timestamps = false;
}
