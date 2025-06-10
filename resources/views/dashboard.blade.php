<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 font-sans">

    <div class="flex h-screen">
        <div class="w-64 bg-gray-800 text-white p-5">
            <h1 class="text-2xl font-bold mb-10">Dashboard</h1>
            <nav>
                <a href="{{ route('dashboard') }}" class="block py-2.5 px-4 rounded transition duration-200 bg-gray-700">Dashboard</a>
                <a " class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Lakukan Test</a>
                <a href="{{ route('profile.edit') }}" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Edit Profil</a>
                 <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full text-left block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Logout
                    </button>
                </form>
            </nav>
        </div>

        <div class="flex-1 p-10 overflow-y-auto">
            <h1 class="text-3xl font-bold mb-2">Selamat Datang, {{ Auth::user()->name }}!</h1>
            <p class="text-gray-600 mb-8">Ini adalah ringkasan histori test semua</p>

            <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-xl font-semibold mb-4">Daftar Pengguna</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2">Nama</th>
                                <th class="px-4 py-2">Email</th>
                                <th class="px-4 py-2">Tanggal Bergabung</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($users as $user)
                            <tr class="border-b">
                                <td class="px-4 py-2">{{ $user->name }}</td>
                                <td class="px-4 py-2">{{ $user->email }}</td>
                                <td class="px-4 py-2">{{ $user->created_at->format('d M Y') }}</td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="text-center py-4">Tidak ada data pengguna.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
                
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold mb-4">Riwayat Tes Pengguna</h2>
                 <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2">Email Pengguna</th>
                                <th class="px-4 py-2">Skor</th>
                                <th class="px-4 py-2">Tanggal Tes</th>
                            </tr>
                        </thead>
                        <tbody>
                             @forelse ($histories as $history)
                            <tr class="border-b">
                                <td class="px-4 py-2">{{ $history->email }}</td>
                                <td class="px-4 py-2 font-bold">{{ $history->score }}</td>
                                <td class="px-4 py-2">{{ \Carbon\Carbon::parse($history->date)->format('d M Y') }}</td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="text-center py-4">Tidak ada riwayat tes.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
                 <div class="mt-4">
                    {{ $histories->links() }}
                </div>
            </div>
        </div>
    </div>

</body>
</html>