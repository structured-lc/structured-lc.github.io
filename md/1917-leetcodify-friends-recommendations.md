### Leetcode 1917 (Hard): Leetcodify Friends Recommendations [Practice](https://leetcode.com/problems/leetcodify-friends-recommendations)

### Description  
Given two tables:  
- **Listens:** Records each user’s song listens by day: `(user_id, song_id, day)` (duplicates possible).
- **Friendship:** Stores friendship pairs: `(user1_id, user2_id)`, with `user1_id < user2_id`.  
We are to recommend friends:  
Recommend user **x** to user **y** if:
- **x** and **y** *are not friends*, and  
- On at least one day, **x** and **y** both listened to **3 or more of the same songs** on that day.
Friend recommendations must be **bi-directional** (if x is recommended to y, also recommend y to x), but **not duplicate** (no two identical rows, e.g., (1,2) and (2,1), both are included).

### Examples  

**Example 1:**  
Input:  
Listens:  
```
user_id  song_id  day
1        10       2021-03-15
1        11       2021-03-15
1        12       2021-03-15
2        10       2021-03-15
2        11       2021-03-15
2        12       2021-03-15
3        10       2021-03-15
3        11       2021-03-15
3        12       2021-03-15
```
Friendship:  
```
user1_id  user2_id
1         2
```
Output:  
```
user_id  recommended_id
1        3
3        1
2        3
3        2
```
*Explanation:*
- User 1 and User 2 are friends; not recommended to each other.
- 1, 2, and 3 all listened to songs 10, 11, 12 on Mar 15.  
- 1 and 3, 2 and 3 are each not friends and share 3+ songs on the same day → mutual recommendations.

**Example 2:**  
Input:  
Listens:  
```
user_id  song_id  day
1        7        2022-01-01  
1        8        2022-01-01  
2        7        2022-01-01  
2        8        2022-01-01  
3        7        2022-01-01  
3        8        2022-01-01
```
Friendship:  
*(empty)*
Output:  
*(empty)*  
*Explanation:*  
No users listened to **3 or more** of the same songs on the same day. No recommendations.

**Example 3:**  
Input:  
Listens:  
```
user_id  song_id  day
1        100      2021-05-20
2        100      2021-05-20
1        200      2021-05-20
2        200      2021-05-20
1        300      2021-05-20
2        300      2021-05-20
3        100      2021-05-20
3        200      2021-05-20
3        300      2021-05-20
```
Friendship:  
```
user1_id  user2_id
2         3
```
Output:  
```
user_id  recommended_id
1        2
2        1
1        3
3        1
```
*Explanation:*  
- Users 1, 2, and 3 all listened to 100, 200, 300 on 2021-05-20.
- 2 and 3 are friends (so not recommended).
- 1 and 2, 1 and 3 are not friends and meet the requirement.

### Thought Process (as if you’re the interviewee)  

To solve this:
- Start by finding all pairs of users who, on the same day, listened to the **same songs**.
- For each user pair and day, count the distinct songs they both listened to.  
- For pairs who listened to **≥3** same songs (on the same day), and are **not already friends**, recommend each to the other.
- Since recommendations must be bi-directional and unique, ensure both (x, y) and (y, x) get output if needed, but no duplicates.

**Brute-force:**  
- For each pair of users, for each day, compare their song lists, count intersections ≥3, and check non-friendship.

**Optimized:**  
- Use a join on (song_id, day) to pair all users who listened to the same songs on the same day.
- Group by user pairs and day, count distinct songs.
- For pairs with count≥3, exclude pairs who are already friends (using a NOT EXISTS or LEFT JOIN with NULL).
- Output both (x, y) and (y, x) from the candidate pairs.

### Corner cases to consider  
- No friends at all in Friendship table.
- No Listen rows, or not enough overlaps for any pairing (output is empty).
- Users listened to ≥3 same songs but are already friends (should not appear in output).
- Duplicate listens in `Listens`.
- Users sharing ≥3 songs, but across different days (must be on *same day*).
- Users with self loops (should not recommend yourself).

### Solution

```python
# There is no actual function as this is an SQL/db problem,
# but let's represent the algorithm in readable code-like logic.

# INPUT: Listens = list of (user_id, song_id, day)
#        Friendship = list of (user1_id, user2_id) with user1_id < user2_id

def recommend_friends(Listens, Friendship):
    # Step 1: Build friendships set (bi-directional for quick lookup)
    friends = set()
    for u1, u2 in Friendship:
        friends.add((u1, u2))
        friends.add((u2, u1))

    # Step 2: Create mapping: (user_id, day) -> set of songs listened to that day
    from collections import defaultdict
    user_songs = defaultdict(lambda: defaultdict(set))
    for user, song, day in Listens:
        user_songs[user][day].add(song)
    
    # Step 3: For each day, for all user pairs, count shared songs
    recommendations = set()
    users = list(user_songs.keys())
    for day in set(d for user in users for d in user_songs[user]):
        # Build: for this day, which users are listening
        daily_users = [u for u in users if day in user_songs[u]]
        # Compare all user pairs
        n = len(daily_users)
        for i in range(n):
            for j in range(i+1, n):
                u1, u2 = daily_users[i], daily_users[j]
                shared = user_songs[u1][day] & user_songs[u2][day]
                if len(shared) >= 3 and (u1, u2) not in friends:
                    recommendations.add((u1, u2))
                    recommendations.add((u2, u1))
    # Output sorted list of (user_id, recommended_id)
    return sorted(list(recommendations))

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(D × U² × S), where D is number of days, U is unique users per day, S is song set intersection cost. Reason: for each day, all pairs of users are compared and their shared song sets intersected.
  - For SQL/relational DBs, the indexed join approach with grouping is practically much more efficient.

- **Space Complexity:**  
  - O(U × D × S), to store each user’s song set for each day.
  - O(F), where F is the number of friend pairs, for the friend lookup set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently scale this for millions of users?  
  *Hint: Consider pre-computed mappings, partitioning by date, or reducing user pairings.*

- How would your approach change if recommendations are required only once per user (not bidirectional)?  
  *Hint: Only output one direction, e.g., user with lower ID recommends higher.*

- What if we relax the “on the same day” requirement to “at any time in history”?  
  *Hint: Group by user pairs only, not (user, user, day).*

### Summary
This problem models a social graph + multi-dimensional intersection. The pattern is “find user pairs with overlapping activity satisfying some minimum threshold, excluding pairs with an explicit block (friends)”. This algorithm is applicable to recommendation engines, social network friend suggestions, and community detection. The essence is set intersection/grouping, a pattern common in link prediction and collaborative filtering problems.