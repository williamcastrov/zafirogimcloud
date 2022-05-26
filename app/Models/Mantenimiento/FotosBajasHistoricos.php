<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotosBajasHistoricos extends Model
{
    use HasFactory;

    protected $table = "fotosbajashistoricos";

    protected $primaryKey = "id";

    protected $fillable = [
        'type',
        'name',
        'nombrefoto',
        'fechafoto',
        'url',
        'codigoequipo'
    ];

    public $timestamps = false;
}
