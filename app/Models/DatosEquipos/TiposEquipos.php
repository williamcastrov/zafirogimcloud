<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposEquipos extends Model
{
    use HasFactory;

    protected $table = "tiposequipos";

    protected $primaryKey = "id_tequ";

    protected $fillable = [
        'descripcion_tequ',
        'observacion_tequ',
        'empresa_tequ',
        'estado_tequ'
    ];

    public $timestamps = false;
}
