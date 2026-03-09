<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountRequest extends FormRequest
{
    public function authorize(): bool{
        return true; 
    }

    public function rules(): array {
        $userId = $this->user()->user_id;
        $accountId = $this->route('account') ?? $this->account_id;

        return [
            
            'code_currency' => [
                'required',
                'string',
                'size:3',
                'exists:currencies,code_currency',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('accounts', 'name')
                    ->where('user_id', $userId)
                    ->ignore($accountId, 'account_id')
            ],


            'type' => 'required|in:cash,bank,credit card,savings,investment',
            'balance' => 'required|numeric|min:0',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'code_currency' => strtoupper(trim($this->code_currency)),
            'name' => strip_tags(trim($this->name)),
            'type' => strtolower(trim($this->type)), 
            'balance' => $this->balance ? str_replace(',', '', $this->balance) : $this->balance,
        ]);
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

}