<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array{
        $userId = $this->user()->user_id;
        $category = $this->route('category');
        $categoryId = is_object($category) ? $category->category_id : $category;

        return [
            'category_id' => 'nullable|uuid', 
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')
                    ->where('user_id', $userId)
                    ->ignore($categoryId, 'category_id')
            ],
            'type' => 'required|in:Income,Expense',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'You have a category with that name.',
            'type.in' => 'The type must be strictly: Income or Expense.',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            // Limpiar espacios y poner la primera letra en mayúscula (opcional pero estético)
            'name' => ucfirst(trim(strip_tags($this->name))),
            
            // Normalizacion del tipo para que siempre coincida con la regla 'in'
            'type' => ucfirst(strtolower(trim($this->type))), 
        ]);
    }
}