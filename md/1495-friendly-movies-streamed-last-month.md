### Leetcode 1495 (Easy): Friendly Movies Streamed Last Month [Practice](https://leetcode.com/problems/friendly-movies-streamed-last-month)

### Description  
You are given a table of movie streaming logs. Each log contains information about which user streamed which movie and when. Define a movie as "friendly" if every user who streamed that movie last month also streamed some other common movie last month. Return a list of all friendly movies streamed last month.

### Examples  
**Example 1:**  
Input: `[movie_id, user_id, timestamp]` with the last month logs  
Output: `[list of friendly movie_ids]`  
*Explanation: Each friendly movie must be such that all its viewers also share another movie in common for last month.*

**Example 2:**  
Input: `[log1, log2, log3, ...]`  
Output: `[]`  
*Explanation: If there is no movie where all its viewers have another movie in common, the output is empty.*

**Example 3:**  
Input: Users watched different movies, some overlap.  
Output: `[movie_id]`  
*Explanation: Return movie_ids where overlap conditions are satisfied.*


### Thought Process (as if you’re the interviewee)  
- I would start by filtering logs to those only from last month.
- For each movie, collect the set of users who watched it.
- For every user who watched a given movie, collect all other movies they watched last month.
- For a movie to be friendly, all its viewers must share a nonempty intersection of other movies watched last month (besides the movie itself).
- Brute-force involves checking the user sets and their intersections for all movies.
- I would optimize by using hashmaps for quick lookups and set intersections.


### Corner cases to consider  
- No logs for last month.
- Only one user watched a movie.
- Movies with only one watcher.
- All users watched all movies.
- Users have watched only one movie.


### Solution

```python
from collections import defaultdict

def find_friendly_movies(logs, last_month):
    # logs: list of (movie_id, user_id, timestamp)
    # last_month: date range (start, end)
    movie_to_users = defaultdict(set)
    user_to_movies = defaultdict(set)
    # filter logs for last month
    for movie_id, user_id, timestamp in logs:
        if last_month[0] <= timestamp <= last_month[1]:
            movie_to_users[movie_id].add(user_id)
            user_to_movies[user_id].add(movie_id)
    friendly_movies = []
    for movie, users in movie_to_users.items():
        # collect intersection of all users' watched movies except the current one
        other_movies_sets = [user_to_movies[user] - {movie} for user in users]
        if not other_movies_sets or not other_movies_sets[0]:
            continue
        common_movies = set.intersection(*other_movies_sets)
        if common_movies:
            friendly_movies.append(movie)
    return friendly_movies
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(U × M) where U is number of users and M is number of movies, for set intersections and hashmap lookups and insertions.
- **Space Complexity:** O(U × M) for storing user-to-movie and movie-to-user data.


### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle huge logs that cannot fit in memory?  
  *Hint: Consider streaming joins or map-reduce strategies.*
- What if movies can be streamed in multiple months and you need to optimize for repeated queries?  
  *Hint: Maintain time-indexed structures.*
- How to adapt your approach for real-time streaming logs?  
  *Hint: Incrementally update friendly status as new entries arrive.*

### Summary
This problem is solved using hashmaps and set intersections, which commonly arise in collaborative filtering, recommendations, or grouping tasks. Similar patterns can be applied to friendship recommendations, social graph clustering, or project collaboration filtering problems.

### Tags
Database(#database)

### Similar Problems
