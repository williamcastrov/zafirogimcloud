<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAlmacen extends Model
{
    use HasFactory;

    protected $table = "tipoalmacen";

    protected $primaryKey = "id_talm";

    protected $fillable = [
        'descripcion_talm',
        'empresa_talm',
        'estado_talm'
    ];

    public $timestamps = false;
}
