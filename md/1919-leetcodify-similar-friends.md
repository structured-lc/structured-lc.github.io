### Leetcode 1919 (Hard): Leetcodify Similar Friends [Practice](https://leetcode.com/problems/leetcodify-similar-friends)

### Description  
Given two tables—**Listens** and **Friendship**—find all pairs of friends (x, y) who listened to **at least three different songs on the same day**.  
- **Listens** records when each user listens to a song on a specific day (can have duplicates).
- **Friendship** states all undirected friendships, with user1_id < user2_id for each pair.
Return all friend pairs (user1_id, user2_id) who are **similar friends**:  
- They are friends,  
- Listened to the **same three or more different songs** on the same day.  
Output can be in any order.

### Examples  

**Example 1:**  
Input:  
Listens =  
| user_id | song_id | day       |  
|---------|---------|-----------|  
| 1       | 5       | 2024-06-01|  
| 2       | 5       | 2024-06-01|  
| 1       | 7       | 2024-06-01|  
| 2       | 7       | 2024-06-01|  
| 1       | 8       | 2024-06-01|  
| 2       | 8       | 2024-06-01|  
Friendship =  
| user1_id | user2_id |  
|----------|----------|  
| 1        | 2        |  

Output:  
| user1_id | user2_id |  
|----------|----------|  
| 1        | 2        |  
*Explanation: On 2024-06-01, both users 1 and 2 listened to exactly three of the same songs: 5, 7, and 8. Since they are friends, (1,2) qualifies.*

**Example 2:**  
Input:  
Listens =  
| user_id | song_id | day       |  
|---------|---------|-----------|  
| 1       | 1       | 2024-06-01|  
| 2       | 2       | 2024-06-01|  
| 1       | 3       | 2024-06-01|  
| 2       | 4       | 2024-06-01|  
| 1       | 5       | 2024-06-01|  
| 2       | 6       | 2024-06-01|  
Friendship =  
| user1_id | user2_id |  
|----------|----------|  
| 1        | 2        |  

Output:  
(no rows)  
*Explanation: Although they are friends, there’s no overlap of ≥3 songs listened on the same day.*

**Example 3:**  
Input:  
Listens =  
| user_id | song_id | day       |  
|---------|---------|-----------|  
| 3       | 9       | 2024-07-01|  
| 4       | 9       | 2024-07-01|  
| 3       | 10      | 2024-07-01|  
| 4       | 10      | 2024-07-01|  
| 3       | 11      | 2024-07-01|  
| 4       | 12      | 2024-07-01|  
Friendship =  
| user1_id | user2_id |  
|----------|----------|  
| 3        | 4        |  

Output:  
(no rows)  
*Explanation: On 2024-07-01, users 3 and 4 only both listened to 9 and 10 (2 songs in common), not enough to be considered similar friends.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force idea:**  
   - For each friend pair (x, y), for each day, check the set of songs both listened to, and count overlap.  
   - For every combination, if |overlap| ≥ 3, mark them as similar friends.  
   - This approach is computationally expensive as it involves iterating through all pairs, all days, and all songs.

2. **Optimization:**  
   - Since Listens table can be large and contain duplicates, we need an efficient way to get song overlaps.
   - Use a self-join on Listens to find all pairs (x, y) who both listened to the same song on the same day.
   - Group by (user1, user2, day) and count distinct songs where both listened.
   - Filter those with count ≥ 3.
   - Only include pairs that are present in the Friendship table.

3. **Decision:**  
   - Use SQL's GROUP BY and JOIN efficiently.
   - This reduces computational complexity by leveraging database set operations rather than explicit nested loops.

### Corner cases to consider  
- Users who are not friends but have high overlap: should be excluded.
- Listen records’ duplicates: only distinct songs count.
- Single user: irrelevant, must be friend pairs.
- Multiple days: make sure overlap is found *on the same day*.
- Friend pairs with multiple qualifying days: should only output the pair once.
- Friendship symmetry: always user1_id < user2_id.
- Song overlap exactly 3: should be included.

### Solution

```python
# This is a conceptual solution — in actual LeetCode, you'd write SQL for this problem.
# Below is a Python simulation you could use for interview prepping (with explanatory comments):

from collections import defaultdict

def leetcodify_similar_friends(listens, friendship):
    # Map: (user_id, day) -> set of songs
    listen_map = defaultdict(lambda: defaultdict(set))
    for user, song, day in listens:
        listen_map[user][day].add(song)
        
    # Friend pair set for fast lookup (user1 < user2)
    friend_set = set()
    for u1, u2 in friendship:
        friend_set.add((u1, u2))
        
    # Result set to avoid duplicate pairs
    res = set()
    
    # For each friend pair
    for u1, u2 in friend_set:
        # For each day they both have any songs
        shared_days = set(listen_map[u1].keys()) & set(listen_map[u2].keys())
        for day in shared_days:
            # Intersect the song sets for this day
            common_songs = listen_map[u1][day] & listen_map[u2][day]
            if len(common_songs) >= 3:
                res.add((u1, u2))
                break  # Only need one qualifying day
                
    # Return list of pairs (user1, user2)
    return [{"user1_id": x, "user2_id": y} for x, y in res]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(F × D),  
  - where F = total number of friend pairs, D = average number of shared days per pair.  
  - For each friend pair, we check intersection of days, and for each day, intersection of sets (max O(S), S = songs per day), but the average is low due to set operations.
- **Space Complexity:** O(U × D × S),  
  - U = total unique users, D = unique days per user, S = unique songs per user per day.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to know on **which day** they qualified as similar friends?  
  *Hint: Instead of breaking after the first qualifying day, collect all (u1, u2, day) into the result.*

- Can we extend this to more than two friends (e.g., groups of 3 who listened to ≥ k common songs)?  
  *Hint: It’s a group-by problem — can you generalize your set intersection logic?*

- How would you scale this if the data was too large to fit in RAM?  
  *Hint: Discuss distributed processing, chunked processing, and database-level aggregation.*

### Summary
The key idea is **intersection of sets with GROUP BY aggregation**, commonly used in SQL join/aggregation problems.  
Patterns:  
- Pairwise computation  
- Set intersection  
- Friend-graph queries  
This technique is widely useful in collaborative filtering, social network analytics, and co-occurrence problems.

### Tags
Database(#database)

### Similar Problems
- Leetcodify Friends Recommendations(leetcodify-friends-recommendations) (Hard)