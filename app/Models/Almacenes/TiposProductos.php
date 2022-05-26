<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposProductos extends Model
{
    use HasFactory;

    protected $table = "tiposproductos";

    protected $primaryKey = "id_tprd";

    protected $fillable = [
        'descripcion_tprd',
        'empresa_tprd',
        'estado_tprd'
    ];

    public $timestamps = false;
}
