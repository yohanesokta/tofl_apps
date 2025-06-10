<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-center text-gray-900">Selamat Datang! 👋</h2>
        <p class="text-center text-gray-600">Silakan masuk untuk melanjutkan</p>
        <form class="space-y-6"  action="{{ url('auth/login') }}" method="POST">
            @csrf
            <div>
                <label for="email" class="text-sm font-medium text-gray-700">Alamat Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                >
            </div>

            <div>
                <label for="password" class="text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                >
            </div>
            @error("email")
                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
            @enderror
            <div>
                <button
                    type="submit"
                    class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Masuk
                </button>
            </div>
        </form>
         <p class="text-sm text-center text-gray-600">
            Belum punya akun?
            <a href="/auth/sign" class="font-medium text-indigo-600 hover:text-indigo-500">Daftar di sini</a>
        </p>
    </div>

</body>
</html>