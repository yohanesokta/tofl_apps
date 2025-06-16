if (!localStorage.getItem("history")) {
    const data_setup =  JSON.stringify([
             { rank: 1, name: 'Oinatko Senahoy', score: 118, date: '2025-06-10', avatar: 'https://avatars.githubusercontent.com/u/111877508?v=4' },
            { rank: 2, name: 'Adinda Kirana', score: 115, date: '2025-06-08', avatar: 'https://i.pravatar.cc/100?img=11' },
            { rank: 3, name: 'Reza Mahendra', score: 114, date: '2025-06-09', avatar: 'https://i.pravatar.cc/100?img=15' },
    ])
    localStorage.setItem("history",data_setup)
}