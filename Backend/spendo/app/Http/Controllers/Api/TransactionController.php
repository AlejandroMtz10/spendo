<?php

namespace App\Http\Controllers\Api;
use App\Models\Transaction;
use App\Models\Account;
use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Http\Resources\TransactionsResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TransactionController extends Controller{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(){
        // use with to eager load category and account relationships to avoid N+1 problem
        $transactions = Transaction::where('user_id', auth()->user()->user_id)
            ->with(['category', 'account']) 
            ->latest()
            ->get();

        return TransactionsResource::collection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request) {
        $user = $request->user();
        
        // Obtener datos validados
        $validated = $request->validated();

        return DB::transaction(function () use ($validated, $user) {
            // Crear la transaccion con el user_id del usuario autenticado
            $transaction = Transaction::create([
                ...$validated,
                'user_id' => $user->user_id
            ]);

            $account = Account::lockForUpdate()->findOrFail($validated['account_id']);

            if ($validated['type'] === 'income') {
                $account->balance += $validated['amount'];
            } else {
                $account->balance -= $validated['amount'];
            }

            $account->save();

            return new TransactionsResource($transaction);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction){
        $this->authorize('view', $transaction);
        return new TransactionsResource($transaction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionRequest $request, Transaction $transaction){
        $this->authorize('update', $transaction);
        $validated = $request->validated();

        return DB::transaction(function () use ($validated, $transaction) {
            // revert the old transaction effect
            $oldAccount = Account::lockForUpdate()->findOrFail($transaction->account_id);
            
            if ($transaction->type === 'income') {
                $oldAccount->balance -= $transaction->amount;
            } else {
                $oldAccount->balance += $transaction->amount;
            }
            $oldAccount->save();

            // update the transaction with new validated data
            $transaction->fill($validated);
            $transaction->save();

            // Apply the new transaction effect
            // Search for the new account (which could be the same or different)
            $newAccount = Account::lockForUpdate()->findOrFail($validated['account_id']);
            
            if ($validated['type'] === 'income') {
                $newAccount->balance += $validated['amount'];
            } else {
                $newAccount->balance -= $validated['amount'];
            }
            $newAccount->save();

            return new TransactionsResource($transaction);
        });
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction) {
        $this->authorize('delete', $transaction);

        DB::transaction(function () use ($transaction) {
            $account = Account::lockForUpdate()->findOrFail($transaction->account_id);

            //  Revertir el saldo según el tipo de transacción
            if ($transaction->type === 'income') {
                $account->balance -= $transaction->amount;
            } else {
                $account->balance += $transaction->amount;
            }

            $account->save();
            $transaction->delete();
        });

        return response()->json(['message' => 'Transaction deleted successfully']);
    }
    
}
