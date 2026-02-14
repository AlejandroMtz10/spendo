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
    public function index()
    {
        return TransactionsResource::collection(Transaction::where('user_id', auth('api')->user()->user_id)->get());
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
    public function show(string $id)
    {
        $transaction = Transaction::findOrFail($id);

        return new TransactionsResource($transaction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction){
        $this->authorize('update', $transaction);
        $transaction->update($request->only(['user_id','account_id', 'category_id', 'amount', 'type', 'description', 'date']));
        return new TransactionsResource($transaction);
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

        return response()->json(['message' => 'Transacción eliminada y saldo actualizado']);
    }
}
