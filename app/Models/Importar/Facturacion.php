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
        'equipo_fac',
        'valor_fac'
    ];

    public $timestamps = false;
}
