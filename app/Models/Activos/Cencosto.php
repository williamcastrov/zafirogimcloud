<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cencosto extends Model
{
    use HasFactory;

    protected $table = "centrodecosto";

    protected $primaryKey = "id_cco";

    protected $fillable = [
        'codigo_cco',
        'descripcion_cco',
        'area_cco',
        'empresa_cco',
        'estado_cco',
    ];

    public $timestamps = false;
}
