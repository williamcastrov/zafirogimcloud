<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garantias extends Model
{
    use HasFactory;

    protected $table = "garantias";

    protected $primaryKey = "id_gar";

    protected $fillable = [
        'equipo_gar',
        'tipogarantia_gar',
        'IDgarantia_gar',
        'proveedor_gar',
        'cliente_gar',
        'empresa_gar',
        'fechainicial_gar',
        'fechafinal_gar',
        'estado_gar',
        'observacion_gar'
    ];

    public $timestamps = false;
}
