### Leetcode 1341 (Medium): Movie Rating [Practice](https://leetcode.com/problems/movie-rating)

### Description  
Given three tables:  
- **Users** (user_id, name)
- **Movies** (movie_id, title)
- **MovieRating** (movie_id, user_id, rating, created_at)

Find:
1. The name of the user who has rated the most number of movies (if tie, return the lex smallest name).
2. The movie title with the highest average rating in February 2020 (if tie, return the lex smallest title).

### Examples  

**Example 1:**  
Input:  
Users = `[{"user_id":1,"name":"Daniel"},{"user_id":2,"name":"Monica"},{"user_id":3,"name":"Maria"},{"user_id":4,"name":"James"}]`  
Movies = `[{"movie_id":1,"title":"Avengers"},{"movie_id":2,"title":"Frozen 2"},{"movie_id":3,"title":"Joker"}]`  
MovieRating = `[
  {"movie_id":1,"user_id":1,"rating":3,"created_at":"2020-01-12"},
  {"movie_id":1,"user_id":2,"rating":4,"created_at":"2020-02-11"},
  {"movie_id":1,"user_id":3,"rating":2,"created_at":"2020-02-12"},
  {"movie_id":1,"user_id":4,"rating":1,"created_at":"2020-01-01"},
  {"movie_id":2,"user_id":1,"rating":5,"created_at":"2020-02-17"},
  {"movie_id":2,"user_id":2,"rating":2,"created_at":"2020-02-01"},
  {"movie_id":2,"user_id":3,"rating":2,"created_at":"2020-03-01"},
  {"movie_id":3,"user_id":1,"rating":3,"created_at":"2020-02-22"},
  {"movie_id":3,"user_id":2,"rating":4,"created_at":"2020-02-25"}
]`  
Output:  
`[{"results":"Daniel"},{"results":"Frozen 2"}]`  
*Explanation: Daniel rated 3 movies (highest, ties broken lex order).  
"Frozen 2" has the highest average rating in Feb 2020.*

**Example 2:**  
Input:  
Users = `[{"user_id":5,"name":"Anna"},{"user_id":6,"name":"Bob"}]`  
Movies = `[{"movie_id":4,"title":"Inception"}]`  
MovieRating = `[{"movie_id":4,"user_id":5,"rating":4,"created_at":"2020-02-01"}]`  
Output:  
`[{"results":"Anna"},{"results":"Inception"}]`  
*Explanation: Anna rated 1 movie (only user), "Inception" had the highest average rating for specified month.*

**Example 3:**  
Input:  
Users = `[{"user_id":1,"name":"A"},{"user_id":2,"name":"B"}]`  
Movies = `[{"movie_id":1,"title":"M" }]`  
MovieRating = `[{"movie_id":1,"user_id":2,"rating":3,"created_at":"2021-03-10"}]`  
Output:  
`[{"results":"B"},{"results":"M"}]`  
*Explanation: B is the only one who rated, and only one movie exists for the tie.*

### Thought Process (as if you’re the interviewee)  
- First, break the problem into **two SQL subproblems**: max user by count, and max movie by average-rating for a month.
- For users: Group MovieRating by user_id, count ratings, join to Users, order by count descending and then name; limit 1 to break ties lexicographically.
- For movies: Filter MovieRating where date is in February 2020, group by movie_id, calculate average rating, join to Movies, order by avg descending and then title; limit 1 to break ties.
- Combine results using UNION ALL so that both are returned as one result set.
- Optimize by only selecting/aggregating the minimum fields needed, and using correct date filters (e.g., BETWEEN '2020-02-01' AND '2020-02-29' inclusive).
- Important trade-off: We need two queries which are totally separate in logic, but UNION is fine since LeetCode expects two rows.

### Corner cases to consider  
- No ratings at all: should return nothing or NULL (depends on specification).
- Multiple users/movies with same counts or averages: correctly resolve ties.
- Users/movies with special characters or empty names/titles.
- Ratings in other months/years that shouldn’t affect the February 2020 query.
- Users with 0 ratings (not to be considered).

### Solution

```python
# Simulates the SQL logic in Python for clarity

def most_active_user_and_highest_rated_movie(users, movies, movie_ratings):
    from collections import defaultdict
    from datetime import datetime

    # 1. Map user_id to name and movie_id to title for easy lookup
    user_id_to_name = {u['user_id']: u['name'] for u in users}
    movie_id_to_title = {m['movie_id']: m['title'] for m in movies}

    # 2. Count ratings by user
    rating_count = defaultdict(int)
    for r in movie_ratings:
        rating_count[r['user_id']] += 1

    max_count = max(rating_count.values()) if rating_count else 0
    # Find all users with max_count, return lex smallest name
    top_users = [user_id_to_name[uid] for uid, cnt in rating_count.items() if cnt == max_count]
    top_user_result = min(top_users) if top_users else None

    # 3. Filter ratings in February 2020
    feb_ratings = defaultdict(list)
    for r in movie_ratings:
        dt = datetime.strptime(r['created_at'], '%Y-%m-%d')
        if dt.year == 2020 and dt.month == 2:
            feb_ratings[r['movie_id']].append(r['rating'])

    # 4. Calculate average rating for each movie in Feb 2020
    avg_ratings = []
    for mid, ratings in feb_ratings.items():
        avg = sum(ratings) / len(ratings)
        avg_ratings.append((avg, movie_id_to_title[mid]))

    if avg_ratings:
        # Sort by average desc, then title lex
        avg_ratings.sort(key=lambda x: (-x[0], x[1]))
        top_movie_result = avg_ratings[0][1]
    else:
        top_movie_result = None

    return [{"results": top_user_result}, {"results": top_movie_result}]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = number of ratings, M = number of users/movies. Each rating is scanned once, and aggregation is linear in number of users/movies.
- **Space Complexity:** O(U + M), where U = unique users, M = unique movies, for the count and average calculations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to return the **top K** users or movies, not just the single top?
  *Hint: Replace LIMIT 1 with LIMIT K and sort accordingly.*

- Suppose the ratings table is huge and doesn't fit in memory. How can we scale this?
  *Hint: Can you stream, process in batches, or use database-side aggregation?*

- How to efficiently handle **multiple months** or **different time ranges** for average calculations?
  *Hint: Accept a date parameter and generalize the date filtering logic; possibly pre-calculate aggregates.*

### Summary
This problem combines **group-by aggregation**, **join logic**, **sorting**, and **tie-breaking**. The coding pattern is **top-N by group aggregate** with lexicographical tie-breaking, common in SQL/data engineering. Mastery here helps with leaderboard designs, analytics dashboards, and contest ranking logic.

### Tags
Database(#database)

### Similar Problems
