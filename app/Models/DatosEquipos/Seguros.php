<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguros extends Model
{
    use HasFactory;

    protected $table = "seguros";

    protected $primaryKey = "IDinterno_seg";

    protected $fillable = [
        'numeroseguro_seg',
        'equipo_seg',
        'clienteubicacion_seg',
        'direccionubicacion_seg',
        'ciudad_seg',
        'declaracionimportacion_seg',
        'fechainicia_seg',
        'fechafin_seg',
        'estado_seg',
        'valorcomercial_seg'
    ];

    public $timestamps = false;
}
