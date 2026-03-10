<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate; // <--- Importante
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use App\Policies\AccountPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\TransactionPolicy;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Account::class => AccountPolicy::class,
        Category::class => CategoryPolicy::class,
        Transaction::class => TransactionPolicy::class,
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