<?php

    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Validation\Rule;

    class TransactionRequest extends FormRequest {
        public function authorize(): bool {
            return true;
        }

        public function rules(): array {
            $userId = $this->user()->user_id;

            return [
                'account_id' => [
                    'required', 
                    'uuid',
                    // Check that the account exists and belongs to the authenticated user
                    Rule::exists('accounts', 'account_id')->where('user_id', $userId)
                ],
                'category_id' => [
                    'required', 
                    'uuid',
                    // Check that the category exists and belongs to the authenticated user
                    Rule::exists('categories', 'category_id')->where('user_id', $userId)
                ],
                'amount' => 'required|numeric|min:0.01',
                'type' => 'required|in:income,expense', 
                'description' => 'nullable|string|max:500',
                'date' => 'required|date'
            ];
        }

        protected function prepareForValidation(){
            $this->merge([
                'type' => strtolower(trim($this->type)),
            ]);
        }
    }