<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomRequest;
use App\Models\Room;
use App\Models\RoomCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Room::with('category')->orderBy('created_at', 'desc');

        if ($request->filled('category')) {
            $query->where('room_category_id', $request->category);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Rooms/Index', [
            'rooms'      => $query->paginate(12)->withQueryString(),
            'categories' => RoomCategory::orderBy('name')->get(['id', 'name', 'slug']),
            'filters'    => $request->only(['category', 'search']),
        ]);
    }

    public function show(Room $room): Response
    {
        return Inertia::render('Rooms/Show', [
            'room' => $room->load('category'),
            'categories' => RoomCategory::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(RoomRequest $request): RedirectResponse
    {
        Room::create($request->validated());

        return redirect()->route('rooms.index')
            ->with('success', 'Room created.');
    }

    public function update(RoomRequest $request, Room $room): RedirectResponse
    {
        $room->update($request->validated());

        return redirect()->route('rooms.index')
            ->with('success', 'Room updated.');
    }

    public function destroy(Room $room): RedirectResponse
    {
        $room->delete();

        return redirect()->route('rooms.index')
            ->with('success', 'Room deleted.');
    }
}