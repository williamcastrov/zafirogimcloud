<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacionPendientes extends Model
{
    use HasFactory;

    protected $table = "notificacionpendientes";

    protected $primaryKey = "id";

    protected $fillable = [
        'descripcion',
        'fechanotificacion',
        'estado',
        'codigopendiente',
        'tiponotificacion'
    ];

    public $timestamps = false;
}
