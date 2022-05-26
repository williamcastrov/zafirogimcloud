<?php

namespace App\Models\Costos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostosVariables extends Model
{
    use HasFactory;

    protected $table = "costosvariableperiodo";

    protected $primaryKey = "id_cvp";

    protected $fillable = [
        'id_cvp',
        'tipocosto_cvp',
        'valorcosto_cvp',
        'anno_cvp',
        'mes_cvp',
        'periodo_cvp'
    ];

    public $timestamps = false;
}
