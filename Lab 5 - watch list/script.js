const { useState } = React;

const styles = {
    page: {
        minHeight: "100vh",
        padding: "32px 16px",
        background:
            "linear-gradient(160deg, rgb(247, 239, 229), rgb(216, 233, 240))",
        fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
        color: "#152033"
    },
    app: {
        width: "min(960px, 100%)",
        margin: "0 auto"
    },
    hero: {
        padding: "24px",
        marginBottom: "18px",
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.88)",
        boxShadow: "0 18px 40px rgba(21, 32, 51, 0.14)"
    },
    heroTag: {
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "999px",
        background: "rgba(21, 32, 51, 0.08)",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.12em",
        textTransform: "uppercase"
    },
    title: {
        margin: "16px 0 10px",
        fontSize: "44px",
        lineHeight: "1"
    },
    subtitle: {
        margin: "0",
        color: "#526077",
        lineHeight: "1.6"
    },
    panel: {
        padding: "24px",
        marginBottom: "18px",
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 18px 40px rgba(21, 32, 51, 0.12)"
    },
    panelTitle: {
        margin: "0 0 8px",
        fontSize: "28px"
    },
    panelNote: {
        margin: "0 0 18px",
        color: "#526077",
        lineHeight: "1.6"
    },
    fieldWrap: {
        marginBottom: "14px"
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "700"
    },
    input: {
        width: "100%",
        padding: "13px 14px",
        border: "1px solid #d7dde8",
        borderRadius: "14px",
        font: "inherit"
    },
    textarea: {
        width: "100%",
        minHeight: "120px",
        padding: "13px 14px",
        border: "1px solid #d7dde8",
        borderRadius: "14px",
        font: "inherit",
        resize: "vertical"
    },
    starRow: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "8px"
    },
    starButton: {
        border: "none",
        borderRadius: "14px",
        padding: "10px 12px",
        background: "rgba(21, 32, 51, 0.07)",
        cursor: "pointer",
        fontSize: "22px"
    },
    starButtonActive: {
        background: "#fff1ec"
    },
    ratingCaption: {
        margin: "0 0 18px",
        color: "#526077"
    },
    submitButton: {
        border: "none",
        borderRadius: "16px",
        padding: "14px 16px",
        background: "#e76f51",
        color: "#ffffff",
        font: "inherit",
        fontWeight: "700",
        cursor: "pointer"
    },
    statsRow: {
        display: "flex",
        gap: "14px",
        flexWrap: "wrap",
        marginBottom: "18px"
    },
    statCard: {
        flex: "1 1 180px",
        padding: "16px",
        borderRadius: "18px",
        background: "#fff7f3",
        border: "1px solid rgba(21, 32, 51, 0.08)"
    },
    statNumber: {
        display: "block",
        marginBottom: "6px",
        fontSize: "28px",
        fontWeight: "700"
    },
    statLabel: {
        color: "#526077"
    },
    movieCard: {
        padding: "18px",
        marginBottom: "14px",
        borderRadius: "20px",
        border: "1px solid rgba(21, 32, 51, 0.08)",
        background: "#ffffff"
    },
    movieHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "10px"
    },
    movieTitle: {
        margin: "0",
        fontSize: "22px"
    },
    movieReview: {
        margin: "0 0 14px",
        color: "#526077",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap"
    },
    metaRow: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
    },
    metaPill: {
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: "999px",
        background: "rgba(42, 157, 143, 0.12)",
        color: "#17574f",
        fontWeight: "700"
    },
    deleteButton: {
        border: "none",
        borderRadius: "14px",
        padding: "11px 14px",
        background: "rgba(21, 32, 51, 0.08)",
        color: "#152033",
        font: "inherit",
        fontWeight: "700",
        cursor: "pointer"
    },
    emptyState: {
        padding: "24px",
        borderRadius: "18px",
        textAlign: "center",
        border: "1px dashed rgba(21, 32, 51, 0.18)",
        color: "#526077",
        background: "rgba(255, 255, 255, 0.7)"
    }
};

function createStarText(rating) {
    return "⭐".repeat(rating);
}

function StarPicker({ value, onChange }) {
    return (
        <div style={styles.starRow} aria-label="Choose a star rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    style={
                        star <= value
                            ? { ...styles.starButton, ...styles.starButtonActive }
                            : styles.starButton
                    }
                    onClick={() => onChange(star)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                    {star <= value ? "⭐" : "☆"}
                </button>
            ))}
        </div>
    );
}

function MovieCard({ movie, onDelete }) {
    return (
        <article style={styles.movieCard}>
            <div style={styles.movieHeader}>
                <div>
                    <h3 style={styles.movieTitle}>{movie.title}</h3>
                </div>

                <button
                    type="button"
                    style={styles.deleteButton}
                    onClick={() => onDelete(movie.id)}
                >
                    Remove
                </button>
            </div>

            <p style={styles.movieReview}>
                {movie.review || "No review added yet."}
            </p>

            <div style={styles.metaRow}>
                <span style={styles.metaPill}>Rating: {movie.rating}/5</span>
                <span style={styles.metaPill}>Stars: {createStarText(movie.rating)}</span>
            </div>
        </article>
    );
}

function App() {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(3);

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedReview = review.trim();

        if (!trimmedTitle) {
            return;
        }

        const newMovie = {
            id: Date.now() + Math.random(),
            title: trimmedTitle,
            review: trimmedReview,
            rating
        };

        setMovies((currentMovies) => [newMovie, ...currentMovies]);
        setTitle("");
        setReview("");
        setRating(3);
    }

    function handleDelete(movieId) {
        setMovies((currentMovies) =>
            currentMovies.filter((movie) => movie.id !== movieId)
        );
    }

    const totalMovies = movies.length;
    const totalStars = movies.reduce((sum, movie) => sum + movie.rating, 0);
    const averageRating = totalMovies ? (totalStars / totalMovies).toFixed(1) : "0.0";

    return (
        <main style={styles.page}>
            <div style={styles.app}>
                <section style={styles.hero}>
                    <span style={styles.heroTag}>Lab 5 React App</span>
                    <h1 style={styles.title}>Movie Watch List</h1>
                    <p style={styles.subtitle}>
                        Save the movies you watched, write a short review, give each
                        one a star rating, and see the rating again using star emojis.
                    </p>
                </section>

                <section style={styles.panel}>
                    <h2 style={styles.panelTitle}>Add a Movie</h2>
                    <p style={styles.panelNote}>
                        Enter a movie title, add your review comment, then choose how
                        many stars you want to give it.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={styles.fieldWrap}>
                            <label style={styles.label} htmlFor="movie-title">
                                Movie title
                            </label>
                            <input
                                id="movie-title"
                                type="text"
                                required
                                style={styles.input}
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Example: Interstellar"
                            />
                        </div>

                        <div style={styles.fieldWrap}>
                            <label style={styles.label} htmlFor="movie-review">
                                Review comment
                            </label>
                            <textarea
                                id="movie-review"
                                style={styles.textarea}
                                value={review}
                                onChange={(event) => setReview(event.target.value)}
                                placeholder="What did you like about this movie?"
                            />
                        </div>

                        <div style={styles.fieldWrap}>
                            <span style={styles.label}>Star rating</span>
                            <StarPicker value={rating} onChange={setRating} />
                            <p style={styles.ratingCaption}>
                                Selected rating: {rating}/5 {createStarText(rating)}
                            </p>
                        </div>

                        <button type="submit" style={styles.submitButton}>
                            Add to Watch List
                        </button>
                    </form>
                </section>

                <section style={styles.panel}>
                    <h2 style={styles.panelTitle}>Your Movies</h2>
                    <p style={styles.panelNote}>
                        This list updates instantly when you add or remove a movie.
                    </p>

                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <strong style={styles.statNumber}>{totalMovies}</strong>
                            <span style={styles.statLabel}>Total movies</span>
                        </div>
                        <div style={styles.statCard}>
                            <strong style={styles.statNumber}>{averageRating}</strong>
                            <span style={styles.statLabel}>Average rating</span>
                        </div>
                        <div style={styles.statCard}>
                            <strong style={styles.statNumber}>{totalStars} ⭐</strong>
                            <span style={styles.statLabel}>All stars given</span>
                        </div>
                    </div>

                    <div>
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div style={styles.emptyState}>
                                <strong>No movies added yet.</strong>
                                Add your first movie from the form to start building
                                your watch list.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
