<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientosAlmacen extends Model
{
    use HasFactory;

    protected $table = "movimientosalmacen";

    protected $primaryKey = "id_mov";

    protected $fillable = [
		'id_mov',
        'tipooperacion_mov',
        'almacen_mov',
        'tipodesembolso_mov',
        'ordendecompra_mov',
        'proveedor_mov',
        'descripcion_mov',
        'referencia_mov',
        'maquina_mov',
        'ciudad_mov',
        'aprobo_mov',
        'cantidad_mov',
        'costounitario_mov',
        'valormovimiento_mov',
        'fecha_mov',
        'estado_mov'

    ];

    public $timestamps = false;

}
