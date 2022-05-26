<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depreciacion extends Model
{
    use HasFactory;

    protected $table = "depreciacion";

    protected $primaryKey = "id_pre";

    protected $fillable = [
        'activo_dpr',
        'anno_dpr',
        'mes_dpr',
        'descripcion_dpr',
        'empresa_dpr',
        'valordepreciacion_dpr',
        'observacion_act',
        'annomes_dpr'
    ];

    public $timestamps = false;
}
