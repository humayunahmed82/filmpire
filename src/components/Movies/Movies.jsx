import { useGetMoviesQuery } from "../../services/TMBD";

const Movies = () => {
	const { data } = useGetMoviesQuery();

	console.log(data);

	return <h1>Movies</h1>;
};

export default Movies;
