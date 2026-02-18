<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Account;
use App\Http\Resources\AccountsResource;
use App\Http\Requests\AccountRequest;

class AccountController extends Controller
{
    use AuthorizesRequests;

    /**
     * Mostrar solo las cuentas del usuario autenticado.
     */
    public function index(Request $request)
    {
        // Obtener solo las cuentas que pertenecen al usuario
        $accounts = $request->user()->accounts; 
        return AccountsResource::collection($accounts);
    }

    /**
     * Mostrar una cuenta específica asegurando la pertenencia.
     */
    public function show(Account $account)
    {
        $this->authorize('view', $account); 
        return new AccountsResource($account);
    }

    /**
     * Crear una cuenta vinculada al usuario
     */
    public function store(AccountRequest $request)
    {
        // Usar la relación para insertar automáticamente el user_id
        $account = $request->user()->accounts()->create($request->validated());
        
        return (new AccountsResource($account))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Actualizar la cuenta usando el Request validado.
     */
    public function update(AccountRequest $request, Account $account)
    {
        $this->authorize('update', $account);
        
        // Usar solo los datos validados y limpios
        $account->update($request->validated());
        
        return new AccountsResource($account);
    }

    /**
     * Eliminar cuenta
     */
    public function destroy(Account $account)
    {
        $this->authorize('delete', $account);
        
        $account->delete();
        
        return response()->json([
            'message' => 'Cuenta eliminada correctamente'
        ], 200);
    }
}
