<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountsResource extends JsonResource{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
public function toArray(Request $request): array
{
        return [
            'account_id'    => $this->account_id,
            'user_id'       => $this->user_id,
            'code_currency' => $this->code_currency,
            'name'          => $this->name,
            'type'          => $this->type,
            // Balance se devuelve como float para evitar problemas de precisión en el frontend
            'balance'       => (float) $this->balance, 
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}