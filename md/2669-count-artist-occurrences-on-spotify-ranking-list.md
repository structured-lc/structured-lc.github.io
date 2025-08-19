### Leetcode 2669 (Easy): Count Artist Occurrences On Spotify Ranking List [Practice](https://leetcode.com/problems/count-artist-occurrences-on-spotify-ranking-list)

### Description  
Given a Spotify ranking list in a table with columns `id`, `track_name`, and `artist`, count how many times each artist appears on this list. The output should show the artist name and their count, ordered by the count in **descending** order. If multiple artists have the same count, they should be ordered by artist name in **ascending** (alphabetical) order.

### Examples  

**Example 1:**  
Input:  
Spotify =  
| id      | track_name           | artist     |
|---------|---------------------|------------|
| 303651  | Heart Won't Forget  | Sia        |
| 1046089 | Shape of you        | Ed Sheeran |
| 33445   | I'm the one         | DJ Khalid  |
| 811266  | Young Dumb & Broke  | DJ Khalid  |
| 505727  | Happier             | Ed Sheeran |

Output:  
| artist     | occurrences |
|------------|-------------|
| DJ Khalid  | 2           |
| Ed Sheeran | 2           |
| Sia        | 1           |

*Explanation:  
DJ Khalid and Ed Sheeran each appear twice. Sia appears once. Sorted by count descending, then name ascending.*

**Example 2:**  
Input:  
Spotify =  
| id      | track_name  | artist      |
|---------|-------------|-------------|
| 1       | x           | A           |
| 2       | y           | B           |
| 3       | z           | B           |
| 4       | w           | C           |
| 5       | v           | A           |

Output:  
| artist | occurrences |
|--------|-------------|
| A      | 2           |
| B      | 2           |
| C      | 1           |

*Explanation:  
A and B each appear twice; A comes before B alphabetically.*

**Example 3:**  
Input:  
Spotify =  
| id  | track_name     | artist   |
|-----|---------------|----------|
| 1   | aa            | Taylor   |

Output:  
| artist | occurrences |
|--------|-------------|
| Taylor | 1           |

*Explanation:  
Taylor appears once.*

### Thought Process (as if you’re the interviewee)  
First, I can scan the Spotify list and count, for each artist, how many times they appear. The brute-force idea is to use a dictionary to record artist counts: for every row, increment the count for that artist.  
After counting, I need to create a list of (artist, count) pairs. Since the result must be sorted by occurrences descending, and by artist name ascending when tied, I'll sort first by negative occurrence count, then by artist name.  

This approach is O(n log n) due to the sorting, where n is the number of tracks. Counting has O(n) time and O(m) space for m unique artists. This is optimal given the sorting requirement.

### Corner cases to consider  
- Empty Spotify table ⇒ return empty result.
- All artists unique ⇒ all have occurrence 1.
- All tracks from a single artist.
- Ties for artist occurrence counts.
- Long or unusual artist names (sorting correctness).

### Solution

```python
def count_artist_occurrences(spotify):
    # spotify: List[Dict], where each dict has 'id', 'track_name', 'artist'

    # Step 1: Count occurrences for each artist
    artist_counts = {}
    for row in spotify:
        artist = row['artist']
        if artist not in artist_counts:
            artist_counts[artist] = 0
        artist_counts[artist] += 1

    # Step 2: Convert to (artist, count) list and sort
    result = []
    for artist, count in artist_counts.items():
        result.append({"artist": artist, "occurrences": count})

    # Step 3: Sort by descending occurrences, then ascending artist name
    result.sort(key=lambda x: (-x["occurrences"], x["artist"]))

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log m), where n is the number of tracks and m is the unique artists. Counting is O(n), sorting is O(m log m).
- **Space Complexity:** O(m), where m = number of unique artists, due to the artist_counts dictionary and result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the table was in a database, not in Python?
  *Hint: Think about GROUP BY and ORDER BY in SQL.*

- What if you only needed the top k artists?
  *Hint: After sorting, just return the first k results.*

- How to handle case insensitivity in artist names?
  *Hint: Normalize artist names before counting (e.g., lowercasing).*

### Summary
This problem follows the common "frequency counting" and "custom sorting" coding pattern, seen in problems like word-frequency counters and leaderboard rankings. It demonstrates basic use of hashmaps for aggregation, and applying custom sorting for output format. This pattern is frequently encountered in analytics, logs, and real-world reporting scenarios.

### Tags
Database(#database)

### Similar Problems
