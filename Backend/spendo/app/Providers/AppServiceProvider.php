<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate; // <--- Importante
use App\Models\Account;
use App\Policies\AccountPolicy;

class AppServiceProvider extends ServiceProvider
{
    // Esta propiedad por sí sola no hace nada en Laravel 11
    protected $policies = [
        Account::class => AccountPolicy::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // REGISTRA LAS POLÍTICAS AQUÍ
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}