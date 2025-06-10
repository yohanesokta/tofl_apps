<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profil</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">
    <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-6">Edit Profil</h1>

            @if (session('status'))
                <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span class="block sm:inline">{{ session('status') }}</span>
                </div>
            @endif

            <form method="post" action="{{ route('profile.update') }}" class="space-y-6">
                @csrf
                @method('patch')

                <div>
                    <label for="name" class="block  text-sm font-medium text-gray-700">Nama</label>
                    <input id="name" name="name" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" value="{{ old('name', $user->name) }}" required autofocus>
                    @error('name')<p class="text-sm text-red-600 mt-2">{{ $message }}</p>@enderror
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" name="email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" value="{{ old('email', $user->email) }}" required>
                     @error('email')<p class="text-sm text-red-600 mt-2">{{ $message }}</p>@enderror
                </div>
                
                <hr>
                
                 <div>
                    <label for="current_password" class="block text-sm font-medium text-gray-700">Password Saat Ini</label>
                    <input id="current_password" name="current_password" type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                     @error('current_password')<p class="text-sm text-red-600 mt-2">{{ $message }}</p>@enderror
                </div>
                
                 <div>
                    <label for="new_password" class="block text-sm font-medium text-gray-700">Password Baru</label>
                    <input id="new_password" name="new_password" type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                     @error('new_password')<p class="text-sm text-red-600 mt-2">{{ $message }}</p>@enderror
                </div>
                
                 <div>
                    <label for="new_password_confirmation" class="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                    <input id="new_password_confirmation" name="new_password_confirmation" type="password" class="p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                </div>

                <div class="flex items-center gap-4">
                    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Simpan Perubahan</button>
                    <a href="{{ route('dashboard') }}" class="text-gray-600 hover:text-gray-900">Kembali ke Dashboard</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>