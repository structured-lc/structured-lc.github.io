### Leetcode 2720 (Hard): Popularity Percentage [Practice](https://leetcode.com/problems/popularity-percentage)

### Description  
You are given a table representing friendship relationships between users on a social platform. Each row in the `Friends` table represents a friendship: one user is `user1`, the other is `user2`. Friendships are bidirectional (if A is friends with B, so is B with A), but may appear as only one record.  

For each user, calculate their **popularity percentage** — defined as:  
(Number of unique friends the user has) ÷ (Total users on the platform) × 100 — rounded to 2 decimal places.  
Return the results as a list (`user_id`, `percentage_popularity`), ordered by `user_id` ascending.

### Examples  

**Example 1:**  
Input:  
Friends table =  
| user1 | user2 |  
|-------|-------|  
|   1   |   2   |  
|   1   |   3   |  
|   3   |   4   |  

Output:  
```
+--------+----------------------+
| user_id | percentage_popularity|
+--------+----------------------+
|   1    |      0.67            |
|   2    |      0.33            |
|   3    |      0.67            |
|   4    |      0.33            |
+--------+----------------------+
```  
Explanation:  
- Unique users = {1,2,3,4}, total = 4  
- User 1's friends: 2, 3 ⇒ 2/4 × 100 = 50, but since rounding and requirements specify dividing by total users (not excluding self), 2/3 = 0.67  
- Each cell: count of unique friends / total users, rounded to 2 decimals.

**Example 2:**  
Input:  
Friends table =  
| user1 | user2 |  
|-------|-------|  
|   1   |   2   |  
|   2   |   3   |  
|   3   |   1   |  

Output:  
```
+--------+----------------------+
| user_id | percentage_popularity|
+--------+----------------------+
|   1    |     0.67             |
|   2    |     0.67             |
|   3    |     0.67             |
+--------+----------------------+
```  
Explanation:  
Each user is friends with 2 of the 3 users; popularity percentage is 2 ÷ 3 = 0.67.

**Example 3:**  
Input:  
Friends table =  
| user1 | user2 |  
|-------|-------|  
|   5   |   6   |  
|   6   |   7   |  

Output:  
```
+--------+----------------------+
| user_id | percentage_popularity|
+--------+----------------------+
|   5    |     0.33             |
|   6    |     0.67             |
|   7    |     0.33             |
+--------+----------------------+
```  
Explanation:  
Unique users = {5,6,7}, total = 3  
- User 5’s friend: 6 ⇒ 1 ÷ 3 = 0.33  
- User 6’s friends: 5,7 ⇒ 2 ÷ 3 = 0.67  
- User 7’s friend: 6 ⇒ 1 ÷ 3 = 0.33

### Thought Process (as if you’re the interviewee)  
- Start by reading the friendship table and recognize that each pair (user1, user2) means both are friends with each other, so make the relationships bidirectional even if only one direction is present.
- For each user, count the number of unique friends (ensure no self-counting and deduplicate).  
- Compute the total number of distinct users.
- For each user, compute (number of friends)/(total users), then round to 2 decimals.
- The brute-force way: scan all rows for each user and count, but that's inefficient—it's better to:
  - Build a friendship map in which every adjacent user is counted.
  - Use set structures or SQL select distinct to get unique friends per user efficiently.
  - Rounding and output formatting should be handled carefully for two decimals.

### Corner cases to consider  
- Self-friendship records (should not happen, but if present: should skip).
- Users with zero friends (should appear in output as 0).
- Duplicate friendship pairs or redundant edges.
- Unidirectional records (needing to count as bidirectional).
- Multiple users but some with no connection at all.
- Rounding exactly at .005 (test for rounding correctness).
- Large user IDs, non-contiguous IDs.

### Solution

```python
# Assume input is a list of [user1, user2] friendships.
# No libraries like pandas; use collections and sets.

def popularity_percentage(friends):
    # Step 1: Gather all unique users
    users = set()
    for u, v in friends:
        users.add(u)
        users.add(v)
    total_users = len(users)

    # Step 2: Build bidirectional friendship map
    from collections import defaultdict
    friend_map = defaultdict(set)
    for u, v in friends:
        if u != v:  # Ignore self-friendship if exists
            friend_map[u].add(v)
            friend_map[v].add(u)

    # Step 3: Prepare result for every user (even those with zero friends)
    result = []
    for user in sorted(users):
        friend_count = len(friend_map[user]) if user in friend_map else 0
        percentage = round(friend_count / total_users, 2)
        result.append([user, "{:.2f}".format(percentage)])

    return result

# Example usage:
# friends = [[1,2],[1,3],[3,4]]
# print(popularity_percentage(friends))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + U log U), where N = number of friendship records, U = number of unique users. Building maps and preparing output are linear; final sorting of users is O(U log U).  
- **Space Complexity:** O(N + U²) in the worst case due to bidirectional mapping and storing friends, but usually much less if friendship graph is sparse.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the table is very large and cannot fit in memory?  
  *Hint: Think about streaming, chunking, MapReduce, or database/SQL approaches.*

- How would you update the popularity percentage efficiently after adding/removing a friendship?  
  *Hint: Update only for the affected users, not for everyone.*

- How would you handle users with no friends so they are included in the output?  
  *Hint: Track all distinct users and return zero for those not in the friend_map.*

### Summary
This problem is a variant of the "graph degree" pattern, where for each node, we track unique neighbor counts and then aggregate using a formula. The core idea is to transform unidirectional friendship data into a bidirectional mapping, then aggregate per user. This pattern can be applied in popularity scoring, connectivity analysis, and as a fundamental operation in social graphs or recommendation systems.


### Flashcard
Build a bidirectional friendship map, count each user's unique friends, and compute their percentage of all users.

### Tags
Database(#database)

### Similar Problems
