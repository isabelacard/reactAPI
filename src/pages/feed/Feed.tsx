import { Navigate } from "react-router";
import { useEffect, useState } from "react";

import { useAuth } from "../../layout/Auth/Auth";
import { getMovies } from "../../services/moviesService";
import type { Movie } from "../../types/MoviesType";
import MovieCard from "../../components/MovieCard";

export default function Feed() {
    const { user, isAuthenticated } = useAuth();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovies();
            setMovies(data.movies ?? []);
        };
        fetchData();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div id="feed-page">
            <h1>Feed Page</h1>
            <p>Welcome, {user?.username}!</p>{" "}
            <div>
                {movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
