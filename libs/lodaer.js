if (!localStorage.getItem("history")) {
    const data_setup =  JSON.stringify([
             { rank: 1, name: 'Baskara Putra', score: 118, date: '2025-06-10', avatar: 'https://i.pravatar.cc/100?img=12' },
            { rank: 2, name: 'Adinda Kirana', score: 115, date: '2025-06-08', avatar: 'https://i.pravatar.cc/100?img=11' },
            { rank: 3, name: 'Reza Mahendra', score: 114, date: '2025-06-09', avatar: 'https://i.pravatar.cc/100?img=15' },
            { rank: 4, name: 'Citra Lestari', score: 112, date: '2025-06-05', avatar: 'https://i.pravatar.cc/100?img=20' },
            { rank: 5, name: 'Farhan Azis', score: 110, date: '2025-06-01', avatar: 'https://i.pravatar.cc/100?img=30' },
            { rank: 6, name: 'Sinta Dewi', score: 109, date: '2025-05-28', avatar: 'https://i.pravatar.cc/100?img=25' },
            { rank: 7, name: 'Yoga Pratama', score: 900, date: '2025-06-04', avatar: 'https://i.pravatar.cc/100?img=35' },
            { rank: 8, name: 'Nadia Amalia', score: 800, date: '2025-05-25', avatar: 'https://i.pravatar.cc/100?img=45' },
            { rank: 9, name: 'Gilang Ramadhan', score: 105, date: '2025-06-07', avatar: 'https://i.pravatar.cc/100?img=55' },
            { rank: 10, name: 'Putri Ayu', score: 104, date: '2025-05-20', avatar: 'https://i.pravatar.cc/100?img=5' }
    ])
    localStorage.setItem("history",data_setup)
}