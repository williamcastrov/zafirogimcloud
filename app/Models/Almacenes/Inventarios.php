<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventarios extends Model
{
    use HasFactory;

    protected $table = "inventarios";

    protected $primaryKey = "id_inv";

    protected $fillable = [
		'tipooperacion_inv',
	    'almacen_inv',
	    'descripcion_inv',
	    'referencia_inv',
	    'tipoproducto_inv',
	    'fechaactualizacion_inv',
	    'horaactualizacion_inv',
	    'existencia_inv',
	    'costounitponderado_inv',
	    'costototalponderado_inv',
	    'estado_inv'
    ];

    public $timestamps = false;
}
