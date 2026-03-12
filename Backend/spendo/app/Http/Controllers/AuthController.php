<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AuthController extends Controller {

    // Get user profile
    public function profile(Request $request) {
        return response()->json($request->user());
    }

    // Update user profile
    public function updateProfile(Request $request) {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->user_id . ',user_id',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    // Register
    public function register(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // Login
    public function login(Request $request) {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // Logout
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    // Delete account user
    public function destroy(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = auth()->user();

        // validate credentials before deleting account
        if ($request->email !== $user->email || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials do not match our records.'
            ], 422);
        }

        return DB::transaction(function () use ($user) {

            $user->transactions()->delete();
            $user->categories()->delete();
            $user->accounts()->delete();

            // delete tokens access
            $user->tokens()->delete();
            
            // delete user
            $user->delete();

            return response()->json(['message' => 'Account deleted successfully']);
        });
    }

    public function updatePassword(Request $request) {
        $user = $request->user();

        $validated = $request->validate([
            'email' => 'required|email',
            'last_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        // Validate that the provided email matches the authenticated user's email
        if ($validated['email'] !== $user->email) {
            return response()->json([
                'message' => 'The provided email does not match your account.'
            ], 422);
        }

        // 2. Verify that the previous password is correct
        if (!Hash::check($validated['last_password'], $user->password)) {
            return response()->json([
                'message' => 'The current password you entered is incorrect.'
            ], 422);
        }

        // 3. Update to the new password
        $user->update([
            'password' => Hash::make($validated['new_password'])
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }
}