<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class RoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roomId = $this->route('room')?->id;

        return [
            'room_category_id' => ['required', 'exists:room_categories,id'],
            'name'             => ['required', 'string', 'max:150'],
            'slug'             => ['required', 'string', 'unique:rooms,slug' . ($roomId ? ",$roomId" : '')],
            'capacity'         => ['required', 'integer', 'min:1'],
            'available'        => ['required', 'integer', 'min:0'],
            'tour'             => ['required', 'array', 'min:1'],
            'tour.*'           => ['string'],
            'base_price'       => ['required', 'numeric', 'min:0'],
            'amenities'        => ['required', 'array', 'min:1'],
            'amenities.*'      => ['string'],
            'inclusions'       => ['nullable', 'array'],
            'inclusions.*'     => ['string'],
            'is_featured'      => ['boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['slug' => Str::slug($this->name)]);
    }
}
