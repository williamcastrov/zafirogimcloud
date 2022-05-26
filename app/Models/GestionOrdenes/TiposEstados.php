<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposEstados extends Model
{
    use HasFactory;

    protected $table = "tiposdeestados";

    protected $primaryKey = "id_test";

    protected $fillable = [
        'descripcion_test',
        'empresa_test',
        'estado_test'
    ];

    public $timestamps = false;
}
