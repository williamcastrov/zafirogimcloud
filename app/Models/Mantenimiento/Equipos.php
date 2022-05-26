<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipos extends Model
{
    use HasFactory;

    protected $table = "equipos";

    protected $primaryKey = "id_equ";

    protected $fillable = [
        'codigo_equ',
        'tipo_equ',
        'descripcion_equ',
        'empresa_equ',
        'frecuencia_equ',
        'propietario_equ',
        'marca_equ',
        'antiguedad_equ',
        'grupoequipo_equ',
        'subgrupoparte_equ',
        'valoradquisicion_equ',
        'estadocontable_equ',
        'estadocliente_equ',
        'estadomtto_equ',
        'estadocalidad_equ',
        'ctacontable_equ',
        'manejamatricula_equ',
        'manejamarcacion_equ',
        'fecharetornaequipo_equ',
        'combogrupo_equ',
        'datoauxiliarpropietario_equ',
        'datoauxiliaradmon_equ',
        'datoauxiliarcontabilidad_equ',
        'datoauxiliaralza_equ',
        'datoauxiliaraquimejora_equ',
        'datoauxiliarcalidad_equ'
    ];

    public $timestamps = false;
}
