<?php

namespace App\Models\Importar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentabilidadPeriodo extends Model
{
    use HasFactory;

    protected $table = "conceptosrentabilidadperiodo";

    protected $primaryKey = "id_rtb";

    protected $fillable = [
            'id_rtb',
            'periodo_rtb',
            'equipo_rtb',
            'equipoperiodo_rtb',
            'nombrefacturacion',
            'tipofacturacion',
            'valorfacturacion_rtb',
            'nombreconsumointerno',
            'tipoconsumointerno',
            'valorconsumointerno_rtb',
            'nombrerepuestos',
            'tiporepuestos',
            'valorrepuestos_rtb',
            'mttocorrectivo',
            'tipomttocorrectivo',
            'valormttocorrectivo_rtb',
            'nombremttopreventivo',
            'tipomttopreventivo',
            'valormttopreventivo_rtb',
            'nombreentregaequipo',
            'tipoentregaequipo',
            'valorentregaequipo_rtb',
            'nombredevolucionequipo',
            'tipodevolucionequipo',
            'valordevolucionequipo_rtb',
            'nombrediagnostico',
            'tipodiagnostico',
            'valordiagnostico_rtb',
            'nombredepreciacion',
            'tipodepreciacion',
            'valordepreciacion_rtb'
    ];

    public $timestamps = false;
}
