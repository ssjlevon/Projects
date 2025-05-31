from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the movies DataFrame
movies_df = pd.read_csv('horror_movies.csv')

@app.route('/movies', methods=['GET'])
def get_movies():
    # Get query parameters
    genre = request.args.get('genre') 
    
    year = request.args.get('year')
    popularity = request.args.get('popularity')

    # Debug: Print incoming query parameters
    print(f"Genre: {genre}, Year: {year}, Popularity: {popularity}")
    print("release_date column values:")
    print(movies_df['release_date'].head())

    filtered_movies = movies_df

   
    
    if genre:
        filtered_movies = filtered_movies[filtered_movies['genre_names'].str.contains(genre, case=False, na=False)]

    if year:
        filtered_movies = filtered_movies[filtered_movies['release_date'].str.startswith(year)]
       

    if popularity:
    # Convert the 'popularity' query parameter to a numeric type
        try:
            popularity = float(popularity)
        except ValueError:
            return jsonify({"error": "Invalid popularity value. Must be a number."}), 400

    # Clean the 'popularity' column if needed and filter the DataFrame
        filtered_movies['popularity'] = pd.to_numeric(filtered_movies['popularity'], errors='coerce')
        filtered_movies = filtered_movies.dropna(subset=['popularity'])

    # Apply the popularity filter
        filtered_movies = filtered_movies[filtered_movies['popularity'] >= popularity]

    # Debug: Check the filtered data
        print(f"Data after applying popularity filter (>= {popularity}):")
        print(filtered_movies[['title', 'popularity']].head())

    # Debug: Check the filtered DataFrame
        print("Filtered DataFrame:")
        print(filtered_movies.head())

    # Convert to JSON
    result = filtered_movies[['id', 'title', 'genre_names', 'release_date', 'poster_path']].to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)