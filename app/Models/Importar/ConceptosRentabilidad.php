<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConceptosRentabilidad extends Model
{
    use HasFactory;

    protected $table = "conceptosrentabilidad";

    protected $primaryKey = "id_rtb";

    protected $fillable = [
        'nombre_rtb',
        'estado_rtb',
        'tipo_rtb'      
    ];

    public $timestamps = false;
}
