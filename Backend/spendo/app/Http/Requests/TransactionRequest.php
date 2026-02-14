<?php

    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Validation\Rule;

    class TransactionRequest extends FormRequest {
        public function authorize(): bool {
            return true;
        }

        public function rules(): array {
            $userId = $this->user()->user_id; // Obtener el ID del usuario autenticado

            return [
                // No validar user_id aquí porque se tomara de la sesión/token
                'account_id' => [
                    'required', 'uuid',
                    Rule::exists('accounts', 'account_id')->where('user_id', $userId)
                ],
                'category_id' => [
                    'required', 'uuid',
                    Rule::exists('categories', 'category_id')->where('user_id', $userId)
                ],
                'amount' => 'required|numeric|min:0.01',
                'type' => 'required|in:income,expense',
                'description' => 'nullable|string',
                'date' => 'required|date'
            ];
        }
    }