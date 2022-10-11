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
        'motivollamada_rll',
        'contacto_rll',
        'equipo_rll',
        'fecha_rll',
        'observaciones_rll',
        'estado_rll'
      ];

    public $timestamps = false;
}
