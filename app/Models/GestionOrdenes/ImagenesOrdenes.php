<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenesOrdenes extends Model
{
    use HasFactory;

    protected $table = "imagenesordenes";

    protected $primaryKey = "id";

    protected $fillable = [
        'type',
        'name',
        'url',
        'date',
        'orden'
    ];

    public $timestamps = false;
}
