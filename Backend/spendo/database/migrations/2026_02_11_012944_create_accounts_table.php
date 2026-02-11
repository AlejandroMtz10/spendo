<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('account_id')->primary();
            $table->uuid('user_id');
            $table->char('code_currency', 3);

            $table->string('name', 100);
            $table->enum('type', ['bank', 'cash', 'wallet', 'crypto']);
            $table->decimal('balance', 15, 2)->default(0);
            $table->string('color', 20)->nullable();

            $table->timestamps();

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('code_currency')
                ->references('code_currency')
                ->on('currencies');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};

