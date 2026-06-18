<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,direction,commercial,chef_chantier',
        ]);

        $data['password'] = bcrypt($data['password']);
        $data['is_active'] = true;

        return response()->json(User::create($data), 201);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->only(['name', 'email', 'role']));

        return $user;
    }

    public function toggleActive(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);

        return $user;
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}