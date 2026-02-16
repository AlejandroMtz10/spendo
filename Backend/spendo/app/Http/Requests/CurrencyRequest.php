<php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class CurrencyRequest extends FormRequest{

    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return [
            'code_currency' => 'required|string|max:3',
            'currency' => 'required|string|max:255',
        ];
    }

    public function messages(): array{
        return [
            'code_currency.required' => 'The code_currency field is required.',
            'code_currency.string' => 'The code_currency field must be a string.',
            'code_currency.max' => 'The code_currency field must not exceed 3 characters.',
            'currency.required' => 'The currency field is required.',
            'currency.string' => 'The currency field must be a string.',
            'currency.max' => 'The currency field must not exceed 255 characters.',
        ];
    }
}