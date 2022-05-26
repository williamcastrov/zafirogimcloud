<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrataciones extends Model
{
    use HasFactory;

    protected $table = "contrataciones";

    protected $primaryKey = "id";

    protected $fillable = [
        'id',
        'anno',
        'mes',
        'periodo',
        'cuenta',
        'nombrecuenta',
        'nit',
        'nombrenit',
        'documentoref',
        'codigo',
        'fecha',
        'documento',
        'detalle',
        'centrocosto',
        'costomtto',
    ];

    public $timestamps = false;
}
