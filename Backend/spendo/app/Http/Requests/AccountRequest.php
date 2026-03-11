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
            $account = $this->route('account');
            $accountId = is_object($account) ? $account->account_id : $account;

            return [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('accounts', 'name')
                        ->where('user_id', $userId)
                        ->ignore($accountId, 'account_id')
                ],
                'type' => 'required|in:cash,bank,credit card,savings,investment',
                'code_currency' => 'required|exists:currencies,code_currency',
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
            'name.unique' => 'You have an account with this name.',
            'code_currency.exists' => 'The selected currency code is not valid.',
            'code_currency.size' => 'The currency code must have exactly 3 letters (e.g., MXN, USD).',
            'type.in' => 'The account type must be: Cash, Savings, Credit or Checking.',
            'balance.min' => 'The initial balance cannot be negative.',
        ];
    }

}