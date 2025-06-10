<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Registrasi</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen font-sans">

    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900">Buat Akun Baru 🚀</h1>
            <p class="mt-2 text-sm text-gray-600">
                Sudah punya akun? 
                <a href="{{ url('auth/login') }}" class="font-medium text-indigo-600 hover:text-indigo-500">Masuk di sini</a>
            </p>
        </div>

        <form class="space-y-4" action="{{ url('auth/sign') }}" method="POST">
            @csrf

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    autocomplete="name" 
                    required 
                    value="{{ old('name') }}" 
                    class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 @error('name') border-red-500 @else border-gray-300 @enderror" 
                    placeholder="Nama lengkap Anda">
                
                @error('name')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Alamat Email</label>
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autocomplete="email" 
                    required 
                    value="{{ old('email') }}" 
                    class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 @error('email') border-red-500 @else border-gray-300 @enderror" 
                    placeholder="nama@email.com">
                
                @error('email')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    autocomplete="new-password" 
                    required 
                    class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 @error('password') border-red-500 @else border-gray-300 @enderror" 
                    placeholder="Minimal 8 karakter">
                
                @error('password')
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                <input 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    type="password" 
                    autocomplete="new-password" 
                    required 
                    class="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Ulangi password Anda">
            </div>

            <div>
                <button 
                    type="submit" 
                    class="w-full px-4 py-3 mt-4 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                    Daftar Sekarang
                </button>
            </div>
        </form>
    </div>

</body>
</html>