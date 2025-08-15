<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory; //, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'image',
        'link',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
