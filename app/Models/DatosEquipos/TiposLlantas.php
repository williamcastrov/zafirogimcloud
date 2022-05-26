<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposLlantas extends Model
{
    use HasFactory;

    protected $table = "tiposdellantas";

    protected $primaryKey = "id_llan";

    protected $fillable = [
        'descripcion_llan',
        'observacion_llan',
        'empresa_llan',
        'estado_llan'
    ];

    public $timestamps = false;
}
