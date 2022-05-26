<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaTecnica extends Model
{
    use HasFactory;

    protected $table = "fichatecnica";

    protected $primaryKey = "id_fit";

    protected $fillable = [
		'id_fit',
		'peso_fit',
		'largo_fit',
		'ancho_fit',
		'capacidad_fit',
		'alturamaximaelevacion_fit',
		'alturamastilcolapsado_fit',
		'centrodecarga_fit',
		'tipodeoperacion_fit',
		'anchointerno_fit',
		'anchoexterno_fit',
		'altura_fit',
		'sideshift_fit',
		'bateriatraccion_fit',
		'cargador_fit',
		'medidacofrelargo_fit',
		'mediacofreancho_fit',
		'mediacofrealto_fit',
		'tipoderuedafrontal_fit',
		'tipoderuedatrasera_fit',
		'tipoderuedadegiro_fit'
    ];

    public $timestamps = false;
}
