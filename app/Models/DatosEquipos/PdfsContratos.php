<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PdfsContratos extends Model
{
    use HasFactory;

    protected $table = "pdfscontratos";

    protected $primaryKey = "id";

    protected $fillable = [
        'type',
        'name',
        'mombrecontrato',
        'fechacontrato',
        'url',
        'contrato'
    ];

    public $timestamps = false;
}
