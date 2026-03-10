<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\User;

class AccountPolicy
{
    // Just the owner can view it
    public function view(User $user, Account $account): bool
    {
        return $user && $account && (string)$user->user_id === (string)$account->user_id;
    }

    // Just the owner can update it
    public function update(User $user, Account $account): bool
    {
        return $user && $account && (string)$user->user_id === (string)$account->user_id;
    }

    // Just the owner can delete it
    public function delete(User $user, Account $account): bool
    {
        return $user && $account && (string)$user->user_id === (string)$account->user_id;
    }
}