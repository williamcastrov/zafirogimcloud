<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsumosRepuestos extends Model
{
    use HasFactory;

    protected $table = "consumosrepuestos";

    protected $primaryKey = "id_cre";

    protected $fillable = [
        'idequipo_cre',
        'concepto_cre',
        'proveedor_cre',
        'cantidad_cre', 
        'costounitario_cre', 
        'costototal_cre' 
    ];

    public $timestamps = false;
}
