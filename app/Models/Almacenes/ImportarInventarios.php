<?php

namespace App\Models\Almacenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportarInventarios extends Model
{
    use HasFactory;

    protected $table = "inventariosimportacion";

    protected $primaryKey = "item";

    protected $fillable = [
        'item',
        'description',
        'um',
        'productcode'
    ];

    public $timestamps = false;
}
