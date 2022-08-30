<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facturacion extends Model
{
    use HasFactory;

    protected $table = "facturacion";

    protected $primaryKey = "id_fac";

    protected $fillable = [
        'id_fac',
        'anno_fac',
        'mes_fac',
        'periodo_fac',
        'id_ctr',
        'codigocontrato_ctr',
        'tipofacturas_fac',
        'equipo_fac',
        'asesorcomercial_ctr',
        'cliente_ctr',
        'ciudad_ctr',
        'diafacturacion_ctr',
        'valorrentames_ctr',
        'numerofactura_ctr',
        'datoscliente_ctr',
        'observacion_ctr',
        'facturada_ctr',
        'fechaalza_ctr',
        'cencosto_fac',
        'fechainicio_ctr',
        'fechafinal_ctr'
    ];

    public $timestamps = false;
}
