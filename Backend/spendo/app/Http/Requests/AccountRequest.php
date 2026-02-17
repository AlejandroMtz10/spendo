<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountRequest extends FormRequest
{
    public function authorize(): bool{
        return true; 
    }

    public function rules(): array{
        $userId = $this->user()->user_id; // Obtener el ID del usuario autenticado
        
        // Obtener el ID de la cuenta desde la ruta (para el ignore en el update)
        $accountId = $this->route('account') ?? $this->account_id;

        return [
            'account_id' => 'sometimes|uuid', 
            
            // Validar que el código de moneda exista en tu tabla de currencies
            'code_currency' => [
                'required',
                'string',
                'size:3',
                'exists:currencies,code_currency', // Importante: que la moneda exista
            ],

            // El nombre debe ser único, pero solo para este usuario.
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('accounts', 'name')
                    ->where('user_id', $userId)
                    ->ignore($accountId, 'account_id')
            ],

            'type' => 'required|in:Cheques,Ahorros,Credito,Efectivo',
            'balance' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array{
        return [
            'name.unique' => 'Ya tienes una cuenta registrada con este nombre.',
            'code_currency.exists' => 'El código de moneda seleccionado no es válido.',
            'code_currency.size' => 'El código de moneda debe tener exactamente 3 letras (ej. MXN).',
            'type.in' => 'El tipo de cuenta debe ser: Cheques, Ahorros, Credito o Efectivo.',
            'balance.min' => 'El saldo inicial no puede ser negativo.',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            // 1. Limpiar espacios en blanco (trim) y convertir a mayúsculas
            'code_currency' => strtoupper(trim($this->code_currency)),

            // 2. Limpiar etiquetas HTML y espacios en el nombre (evita XSS básico)
            'name' => strip_tags(trim($this->name)),

            // 3. Normalizar el tipo a minúsculas para que coincida con la regla 'in:checking,...'
            'type' => strtolower(trim($this->type)),

            // 4. Asegurar que el balance no tenga comas (común en inputs de dinero)
            // Ejemplo: "1,250.50" -> "1250.50"
            'balance' => $this->balance ? str_replace(',', '', $this->balance) : $this->balance,
        ]);
    }
}