<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlandeCuentas extends Model
{
    use HasFactory;

    protected $table = "planunicocuentas_puc";

    protected $primaryKey = "id_puc";

    protected $fillable = [
	    'cuenta_puc',
	    'nombrecuenta_puc',
	    'vigencia_puc',
	    'tipo_puc',
	    'movimiento_puc',
	    'centrocosto_puc',
	    'ajuste_puc',
	    'tipoplazo_puc',
	    'nivel_puc',
	    'baseretencion_puc'
    ];

    public $timestamps = false;
}
