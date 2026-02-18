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

    public function rules(): array
    {
        $userId = $this->user()->user_id;
        
        // Obtener el ID ya sea que venga como objeto o como string
        $category = $this->route('category');
        $categoryId = is_object($category) ? $category->category_id : $category;

        return [
            'category_id' => 'sometimes|uuid', 
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')
                    ->where('user_id', $userId)
                    ->ignore($categoryId, 'category_id')
            ],
            // Aseguramos que solo aceptamos estos dos valores exactos
            'type' => 'required|in:Ingreso,Gasto',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'Ya tienes una categoría con ese nombre.',
            'type.in' => 'El tipo debe ser estrictamente: Ingreso o Gasto.',
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