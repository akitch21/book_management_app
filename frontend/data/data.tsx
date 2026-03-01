
export const library_books = [
    {
        "id": 1,
        "record_user": 1,
        "book_info": {
            "book_title": "test book",
            "book_page": 300,
            "book_author": "akira",
            "genre": ["programming"],
            "image": "https://example.com/image.jpg"
        },
        "book_tag": ["programming"],
        "updated_at": "2026-02-25T12:00:00Z"
    },
    {
        "id": 2,
        "record_user": 2,
        "book_info": {
            "book_title": "python guide",
            "book_page": 450,
            "book_author": "john",
            "genre": ["programming"],
            "image": "https://example.com/image2.jpg"
        },

        "book_tag": ["programming"],
        "updated_at": "2026-02-26T12:00:00Z"
    },
    {
        "id": 3,
        "record_user": 3,
        "book_info": {
            "book_title": "web development",
            "book_page": 520,
            "book_author": "mary",
            "genre": ["web"],
            "image": "https://example.com/image3.jpg"
        },
        "book_tag": ["web"],
        "updated_at": "2026-02-27T12:00:00Z"
    },
    {
        "id": 4,
        "record_user": 4,
        "book_info": {
            "book_title": "data science",
            "book_page": 380,
            "book_author": "bob",
            "genre": ["data"],
            "image": "https://example.com/image4.jpg"
        },
        "book_tag": ["data"],
        "updated_at": "2026-02-28T12:00:00Z"
    },
    {
        "id": 5,
        "record_user": 1,
        "book_info": {
            "book_title": "machine learning",
            "book_page": 600,
            "book_author": "alice",
            "genre": ["ai"],
            "image": "https://example.com/image5.jpg"
        },
        "book_tag": ["ai"],
        "updated_at": "2026-02-29T12:00:00Z"
    }
]

export const record_book = [
    {
        "id": 1,
        "book_id": 1,
        "memo": {
            "page": 20,
            "content": "remind",
            "tag": "important",
            "updated_at": "2026-02-25T12:00:00Z"
        },
        "status": "reading"
    },
    {
        "id": 2,
        "book_id": 2,
        "memo": {
            "page": 50,
            "content": "review chapter 3",
            "tag": "urgent",
            "updated_at": "2026-02-26T12:00:00Z"
        },
        "status": "completed"
    },
    {
        "id": 3,
        "book_id": 3,
        "memo": [
            {
                "page": 100,
                "content": "implement example",
                "tag": "important",
                "updated_at": "2026-02-27T12:00:00Z"
            },
            {
                "page": 200,
                "content": "review example",
                "tag": "review",
                "updated_at": "2026-02-28T12:00:00Z"
            }
        ],
        "status": "paused"
    },
    {
        "id": 4,
        "book_id": 4,
        "memo": {
            "page": 75,
            "content": "study algorithms",
            "tag": "reference",
            "updated_at": "2026-02-29T12:00:00Z"
        },
        "status": "reading"
    },
    {
        "id": 5,
        "book_id": 5,
        "memo": {
            "page": 150,
            "content": "practice models",
            "tag": "important",
            "updated_at": "2026-03-01T12:00:00Z"
        },
        "status": "completed"
    }
]
