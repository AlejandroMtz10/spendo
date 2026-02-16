<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurrencyRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Si hay roles, aquí se podria poner: return $this->user()->is_admin;
        return true; 
    }

    public function rules(): array
    {
        return [
            'code_currency' => [
                'required',
                'string',
                'size:3',        // Exactamente 3 caracteres
                'alpha',         // Solo letras
                'uppercase',     
                Rule::unique('currencies', 'code_currency')->ignore($this->code_currency, 'code_currency') 
                // La línea anterior evita duplicados, pero permite actualizar el mismo registro
            ],
            'currency' => 'required|string|max:255|unique:currencies,currency,' . $this->code_currency . ',code_currency',
        ];
    }

    public function messages(): array
    {
        return [
            'code_currency.required' => 'El código de moneda es obligatorio (ej. USD).',
            'code_currency.size'     => 'El código debe tener exactamente 3 caracteres.',
            'code_currency.alpha'    => 'El código solo puede contener letras.',
            'code_currency.unique'   => 'Este código de moneda ya está registrado.',
            'currency.required'      => 'El nombre de la moneda es obligatorio.',
            'currency.unique'        => 'Este nombre de moneda ya existe.',
        ];
    }

    // Limpiar los datos antes de validar
    protected function prepareForValidation()
    {
        $this->merge([
            'code_currency' => strtoupper($this->code_currency),
        ]);
    }
}