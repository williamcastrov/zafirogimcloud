<?php

namespace App\Models\Costos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoCostoVariable extends Model
{
    use HasFactory;

    protected $table = "tipocostovariable_tcv";

    protected $primaryKey = "id_tcv";

    protected $fillable = [
        'descripcion_tcv',
        'estado_tcv',
    ];

    public $timestamps = false;
}
