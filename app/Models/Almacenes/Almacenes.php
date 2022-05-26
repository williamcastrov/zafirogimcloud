<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacenes extends Model
{
    use HasFactory;

    protected $table = "almacenes";

    protected $primaryKey = "id_alm";

    protected $fillable = [
        'tipoalmacen_alm',
        'descripcion_alm',
        'consignacion_alm',
        'interlocutor_alm',
        'fechacreacion_alm',
        'estado_alm',
        'observacion_alm'
    ];

    public $timestamps = false;
}
