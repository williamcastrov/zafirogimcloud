<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquiposUsuarios extends Model
{
    use HasFactory;

    protected $table = "equiposporusuario";

    protected $primaryKey = "id_eus";

    protected $fillable = [
        'usuario_eus',
        'equipo_eus',
        'proveedor_eus',
        'estado_eus'
    ];

    public $timestamps = false;
}
