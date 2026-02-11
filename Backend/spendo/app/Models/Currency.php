<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $primaryKey = 'code_currency';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'code_currency',
        'currency'
    ];

    /* ================= Relationships ================= */

    public function accounts()
    {
        return $this->hasMany(Account::class, 'code_currency', 'code_currency');
    }
}
