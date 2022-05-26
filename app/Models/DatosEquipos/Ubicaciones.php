<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ubicaciones extends Model
{
    use HasFactory;

    protected $table = "ubicaciones";

    protected $primaryKey = "equipo_ubi";

    protected $fillable = [
        'cliente_ubi',
        'direccion_ubi',
        'ciudad_ubi',
        'estado_ubi'
    ];

    public $timestamps = false;
}
