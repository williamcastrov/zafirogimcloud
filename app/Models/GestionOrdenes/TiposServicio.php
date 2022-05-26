<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposServicio extends Model
{
    use HasFactory;

    protected $table = "tiposservicio";

    protected $primaryKey = "id_tser";

    protected $fillable = [
        'descripcion_tser',
        'empresa_tser',
        'estado_tser',
    ];

    public $timestamps = false;
}
