<?php

namespace App\Models\Imagenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagenes extends Model
{
    use HasFactory;

    protected $table = "imagenes";

    protected $primaryKey = "id";

    protected $fillable = [
        'type',
        'name',
        'url',
        'data',
        'orden',
    ];

    public $timestamps = false;
}
