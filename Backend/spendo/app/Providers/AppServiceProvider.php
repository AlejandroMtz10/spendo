<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate; // <--- Importante
use App\Models\Account;
use App\Policies\AccountPolicy;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Account::class => AccountPolicy::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void{
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}