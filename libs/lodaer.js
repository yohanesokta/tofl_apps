if (!localStorage.getItem("history") || !localStorage.getItem('databaru_01')) {

    const data_setup = JSON.stringify([
        {
            "rank": 1,
            "name": "Oinatko Senah OY",
            "listening": 35,
            "structure": 12,
            "reading": 45,
            "score": 251,
            "date": "2025-06-15",
            "avatar": "https://avatars.githubusercontent.com/u/111877508?v=4"
        },
        {
            "rank": 2,
            "name": "Siti Aminah",
            "listening": 38,
            "structure": 14,
            "reading": 48,
            "score": 273,
            "date": "2025-06-14",
            "avatar": "https://i.pravatar.cc/100?img=2"
        },
        {
            "rank": 3,
            "name": "Agus Salim",
            "listening": 30,
            "structure": 10,
            "reading": 40,
            "score": 218,
            "date": "2025-06-13",
            "avatar": "https://i.pravatar.cc/100?img=3"
        },
        {
            "rank": 4,
            "name": "Dewi Lestari",
            "listening": 39,
            "structure": 15,
            "reading": 49,
            "score": 281,
            "date": "2025-06-12",
            "avatar": "https://i.pravatar.cc/100?img=4"
        }
    ]
    )
    localStorage.setItem("history", data_setup)
    localStorage.setItem("databaru_01", "terrru");
}