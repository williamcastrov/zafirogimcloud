<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prueba extends Model
{
    use HasFactory;

    protected $table = "prueba";

    protected $primaryKey = "id_pai";

    protected $fillable = [
        'codigo_pai',
        'nombre_pai',
        'valor'
    ];

    public $timestamps = false;
}
