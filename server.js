const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const movies = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Science Fiction",
        year: 2014
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        genre: "Action",
        year: 2019
    },
    {
        id: 3,
        title: "Coco",
        genre: "Animation",
        year: 2017
    },
    {
        id: 4,
        title: "Inception",
        genre: "science fiction",
        year: 2010
    }
];

app.get("/api/movies", (req, res) => {
    res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
    const id = Number(req.params.id);
    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
});

app.post("/api/movies", (req, res) => {
    const { title, genre, year } = req.body;

    if (!title || !genre || year === undefined || year === "") {
        return res.status(400).json({
            message: "Title, genre, and year are required"
        });
    }

    const movie = {
        id: movies.length === 0 ? 1 : Math.max(...movies.map(movie => movie.id)) + 1,
        title: String(title).trim(),
        genre: String(genre).trim(),
        year: Number(year)
    };

    if (!movie.title || !movie.genre || !Number.isInteger(movie.year)) {
        return res.status(400).json({
            message: "Title, genre, and year must be valid"
        });
    }

    movies.push(movie);
    res.status(201).json(movie);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});