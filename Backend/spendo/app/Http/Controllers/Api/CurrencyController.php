<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use Illuminate\Http\Request;
use App\Http\Resources\CurrenciesResource;
use App\Http\Requests\CurrencyRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CurrencyController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(){
        return CurrenciesResource::collection(Currency::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CurrencyRequest $request){
        $currency = Currency::create($request->validated());
        return new CurrenciesResource($currency);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        $currency = Currency::findOrFail($id);
        return new CurrenciesResource($currency);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CurrencyRequest $request, Currency $currency){
        $this->authorize('update', $currency); // Verificar permisos (opcional)
        $currency->update($request->validated());
        return response() -> json($currency);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency){
        $this->authorize('delete', $currency); // Verificar permisos (opcional)
        $currency->delete();
        return response()->json(['message' => 'Currency deleted successfully']);
        
    }
}
