<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoGarantia extends Model
{
    use HasFactory;

    use HasFactory;

    protected $table = "tipogarantia";

    protected $primaryKey = "id_tga";

    protected $fillable = [
        'descripcion_tga',
        'empresa_tga',
        'estado_tga'
    ];

    public $timestamps = false;
}
