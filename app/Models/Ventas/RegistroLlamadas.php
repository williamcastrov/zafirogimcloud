<?php

namespace App\Models\Ventas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroLlamadas extends Model
{
    use HasFactory;
    protected $table = "seguimientoclientes";

    protected $primaryKey = "id_rll";

    protected $fillable = [
        'cliente_rll',
        'nombrecliente',
        'motivollamada_rll',
        'contacto_rll',
        'equipo_rll',
        'fecha_rll',
        'estado_rll',
        'temauno',
        'comentariostemauno',
        'temados',
        'comentariostemados',
        'tematres',
        'comentariostematres',
        'temacuatro',
        'comentariostemacuatro',
        'temacinco',
        'comentariostemacinco',
        'asistentes'
      ];

    public $timestamps = false;
}
