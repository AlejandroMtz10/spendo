<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Category;
use App\Http\Resources\CategoriesResource;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller{
    use AuthorizesRequests;

    public function index(Request $request){
        // Solo categorías del usuario logueado
        $categories = $request->user()->categories; 
        return CategoriesResource::collection($categories);
    }

    public function store(CategoryRequest $request){
        $category = $request->user()->categories()->create($request->validated());
        return new CategoriesResource($category);
    }

    public function show(Category $category){
        // Uso de Route Model Binding y autorizacion la vista
        $this->authorize('view', $category);
        return new CategoriesResource($category);
    }

    public function update(CategoryRequest $request, Category $category){
        $this->authorize('update', $category);
        $category->update($request->validated());
        
        return response()->json([
            'message' => 'Categoría actualizada correctamente', 
            'category' => new CategoriesResource($category)
        ]);
    }

    public function destroy(Category $category){
        $this->authorize('delete', $category);
        $category->delete();
        
        return response()->json([
            'message' => 'Categoría eliminada correctamente'
        ], 200);
    }
}
