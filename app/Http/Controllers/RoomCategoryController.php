<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomCategoryRequest;
use App\Models\RoomCategory;
use Illuminate\Http\RedirectResponse;

class RoomCategoryController extends Controller
{
    public function store(RoomCategoryRequest $request): RedirectResponse
    {
        RoomCategory::create($request->validated());

        return redirect()->route('rooms.index')
            ->with('success', 'Category created.');
    }

    public function update(RoomCategoryRequest $request, RoomCategory $roomCategory): RedirectResponse
    {
        $roomCategory->update($request->validated());

        return redirect()->route('rooms.index')
            ->with('success', 'Category updated.');
    }

    public function destroy(RoomCategory $roomCategory): RedirectResponse
    {
        if ($roomCategory->rooms()->exists()) {
            return redirect()->route('rooms.index')
                ->with('error', 'Cannot delete a category that still has rooms.');
        }

        $roomCategory->delete();

        return redirect()->route('rooms.index')
            ->with('success', 'Category deleted.');
    }
}