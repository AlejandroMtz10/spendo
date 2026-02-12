<?php

namespace App\Http\Controllers\Api;
use App\Models\Transaction;
use App\Models\Account;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_id' => 'required|uuid|exists:accounts,account_id',
            'category_id' => 'required|uuid|exists:categories,category_id',
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string'
        ]);

        $transaction = Transaction::create([
            ...$validated,
            'user_id' => $request->user()->user_id
        ]);

        $account = Account::findOrFail($validated['account_id']);

        if ($validated['type'] === 'income') {
            $account->balance += $validated['amount'];
        } else {
            $account->balance -= $validated['amount'];
        }

        $account->save();

        return response()->json($transaction, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
