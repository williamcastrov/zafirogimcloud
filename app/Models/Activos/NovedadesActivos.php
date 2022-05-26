<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NovedadesActivos extends Model
{
    use HasFactory;

    protected $table = "novedadesactivos";

    protected $primaryKey = "id_nac";

    protected $fillable = [
        'id_nac',
        'codigo_nac',
        'fechanovedad_nac',
        'cuotadepreciacion_nac',
        'valornovedad_nac',
        'tiponovedad_nac',
        'observacion_nac' 
    ];

    public $timestamps = false;
}
