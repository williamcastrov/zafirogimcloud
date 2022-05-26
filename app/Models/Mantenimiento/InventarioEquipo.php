<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventarioEquipo extends Model
{
    use HasFactory;

    protected $table = "inventarioequipo";

    protected $primaryKey = "id_inve";

    protected $fillable = [
        'equipo_inve',
        'fechainventario_inve',
        'serieequipo_inve',
        'estado_inve'
    ];

    public $timestamps = false;
}
