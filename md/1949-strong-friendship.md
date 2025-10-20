### Leetcode 1949 (Medium): Strong Friendship [Practice](https://leetcode.com/problems/strong-friendship)

### Description  
Given a friendship table where each row (user1\_id, user2\_id) indicates that the two users are friends (with user1\_id < user2\_id), a **strong friendship** exists between two friends x and y if they have **at least three common friends** (i.e., other users who are friends with both x and y).  
Return all pairs of friends whose friendship is strong. The output should not contain duplicates and all pairs must satisfy user1\_id < user2\_id.

### Examples  

**Example 1:**  
Input:  
```
Friendship table:
user1_id  user2_id
1         2
2         3
1         3
1         4
2         4
3         4
1         5
2         5
3         5
```
Output:  
```
user1_id  user2_id
1         2
1         3
2         3
1         4
2         4
3         4
```
*Explanation: Each of these pairs have at least 3 common friends, as counted by examining all users who appear as friends of both. For example, (1, 3) share friends 2, 4, and 5. Only pairs that are already friends in the input (i.e., present in the table) can be strong.*

**Example 2:**  
Input:  
```
Friendship table:
user1_id  user2_id
10        20
20        30
10        30
30        40
20        40
10        40
```
Output:  
```
user1_id  user2_id
10        20
10        30
20        30
10        40
20        40
30        40
```
*Explanation: All input pairs are strong friends since each pair shares at least 3 common friends when considering friends through their direct links.*

**Example 3:**  
Input:  
```
Friendship table:
user1_id  user2_id
1         2
2         3
3         4
4         5
```
Output:  
` ` (empty)
*Explanation: No pair has at least three common friends, so no strong friendships are returned.*

### Thought Process (as if you’re the interviewee)  
- Start with the brute-force idea: for each pair of direct friends (u, v), calculate the set of their common friends by checking all other users. If the pair has at least 3 common friends, include it in the output.
- To optimize, build a mapping from each user to their set of friends. For each friendship (u, v), find the intersection of friends[u] and friends[v].
- Only output (u, v) if it's an explicit friendship (they appear in the table) and user1\_id < user2\_id.
- This approach prevents O(n³) time, since checking the intersection between two friend sets can be done in O(min(f₁, f₂)) (where f₁, f₂ are their friend counts).
- In practice, since each friend only considers their own direct friends, the efficiency is acceptable unless the network is huge.
- Using Python sets, the intersection operation is efficient.

### Corner cases to consider  
- Friendship table is empty (no rows).
- No pairs have 3 or more common friends.
- There are users with no friends.
- Pairs who have common friends but are not themselves friends: such pairs should NOT be included.
- Friendships are always entered with user1 < user2 (input constraint).
- Self-friendship should not exist in the table.

### Solution

```python
def strong_friendship(friendships):
    # friendships: List of [user1, user2] pairs; user1 < user2 for all rows

    from collections import defaultdict

    # Build mapping from user to set of friends
    user_friends = defaultdict(set)
    actual_friend_pairs = set()

    for u, v in friendships:
        user_friends[u].add(v)
        user_friends[v].add(u)
        actual_friend_pairs.add((u, v))

    result = []

    # Only check explicit friendships, i.e., where u < v is in original pairs
    for u, v in actual_friend_pairs:
        # Common friends: intersection of u's and v's friends (excluding each other)
        common = user_friends[u].intersection(user_friends[v])
        # Exclude u and v themselves (to avoid self-counting)
        common.discard(u)
        common.discard(v)
        if len(common) >= 3:
            result.append([u, v])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(F × K),  
  where F is the number of friendship pairs (rows), and K is the maximum friend count per user (since intersection is O(min(f₁, f₂)) for each explicit friendship).
- **Space Complexity:** O(N + F),  
  for storage of the user-to-friends mapping and the set of pairs, where N is the number of unique users, and F is the number of pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the friendship table is extremely large and cannot fit into memory?  
  *Hint: Can you process in chunks or use a database join?*

- Can you modify the logic if the friendship is not symmetric (i.e., friendships are one-way)?  
  *Hint: Should both (u,v) and (v,u) count as valid friends?*

- How would you speed up the query further if asked for strong friendships with a higher minimum (e.g., ≥ k common friends) or for a huge list of (u, v) queries?  
  *Hint: Can you preprocess friend lists or use matrix multiplication ideas?*

### Summary
This problem applies the **hashtable & set intersection** pattern, commonly used for efficiently counting overlaps between user groups or connections in social graphs. The strategy of representing friendships as sets allows quick determination of common connections—an approach used in friend-of-friend recommendations, graph problems, and SQL-style joins. Pattern familiarity in set operations and association mapping can speed up development for social network or graph analytics tasks.


### Flashcard
For each friendship, count common friends by intersecting friend sets; output if ≥3 and user1 < user2.

### Tags
Database(#database)

### Similar Problems
- Page Recommendations(page-recommendations) (Medium)
- Page Recommendations II(page-recommendations-ii) (Hard)
- Leetcodify Friends Recommendations(leetcodify-friends-recommendations) (Hard)