### Leetcode 1951 (Medium): All the Pairs With the Maximum Number of Common Followers [Practice](https://leetcode.com/problems/all-the-pairs-with-the-maximum-number-of-common-followers)

### Description  
Given a table of "Relations" where each row represents that `follower_id` follows `user_id`, find all unique pairs of users (user1, user2, with user1 < user2) who have the maximum number of **common followers**.  
A follower is "common" to both users if they both have the same `follower_id` in the table.  
Return all such user pairs with the maximum number of shared followers. The output excludes pairs where user1 = user2 and where user1 > user2.

### Examples  

**Example 1:**  
Input:  
```
Relations table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
|    1    |      3      |
|    2    |      3      |
|    7    |      3      |
|    1    |      4      |
|    2    |      4      |
|    7    |      4      |
|    1    |      5      |
|    2    |      6      |
|    7    |      5      |
+---------+-------------+
```
Output:  
```
+----------+----------+
| user1_id | user2_id |
+----------+----------+
|     1    |    7     |
+----------+----------+
```
Explanation.  
- Common followers for (1,2): 3,4 → 2  
- (1,7): 3,4,5 → 3  
- (2,7): 3,4 → 2  
The maximum number of common followers is 3 (for pair 1,7).

**Example 2:**  
Input:  
```
Relations table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
|    1    |      1      |
|    2    |      2      |
|    3    |      3      |
+---------+-------------+
```
Output:  
```
(empty)
```
Explanation.  
No two users share a common follower, so there are no pairs to return.

**Example 3:**  
Input:  
```
Relations table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
|    2    |      9      |
|    2    |      11     |
|    1    |      9      |
|    1    |      11     |
|    3    |      9      |
+---------+-------------+
```
Output:  
```
+----------+----------+
| user1_id | user2_id |
+----------+----------+
|    1     |    2     |
+----------+----------+
```
Explanation.  
- (1,2): Common followers = 9,11 (2 followers)  
- (1,3): 9 (1 follower)  
- (2,3): 9 (1 follower)  
Maximum is 2, so output is (1,2).


### Thought Process (as if you’re the interviewee)  
- **Brute Force:** For every unique pair of users, count how many follower IDs they have in common by joining their follower lists, and keep track of the maximum count.
- This suggests, for each user, collect their set of followers, then for every (user1,user2) with user1 < user2, compute the intersection size.
- However, in code or SQL, brute-force is O(u²×f), where u = number of users, f = average list length.
- **Optimized Plan:** Preprocess mapping user→set of followers. For each unordered user pair (u₁,u₂), compute size of intersection (use set operations).  
- Track the maximum intersection size while iterating, and collect all pairs with that count.

**Trade-offs:**  
- This approach is O(u²×f), which may not be fast for large user base, but the problem assumes reasonable data size.
- If user list is very large, could try to optimize using hash join or inverted index by follower (for each follower, store all users they follow, then enumerate all pairs from those who share one follower).

### Corner cases to consider  
- Only one user: No pairs possible
- All users have zero followers: No pairs
- All user pairs have 0 common followers: Should return empty set
- Duplicate entries in Relations table: Should not affect, sets handle this
- Large number of users, but all with unique followers
- All users share all followers: All pairs have same (maximum) count

### Solution

```python
def max_common_follower_pairs(relations):
    """
    relations: List of tuples (user_id, follower_id)
    Returns: List of [user1_id, user2_id], where user1_id < user2_id and
             this pair has the maximum number of common followers.
    """
    from collections import defaultdict

    # Map: user_id -> set of follower_ids
    user_to_followers = defaultdict(set)
    users = set()
    for user, follower in relations:
        user_to_followers[user].add(follower)
        users.add(user)

    users = sorted(users)
    n = len(users)

    max_common = 0
    pairs = []

    # Check all pairs (user1, user2) with user1 < user2
    for i in range(n):
        u1 = users[i]
        for j in range(i+1, n):
            u2 = users[j]
            # Find common followers using set intersection
            common = user_to_followers[u1] & user_to_followers[u2]
            cnt = len(common)
            if cnt > max_common:
                max_common = cnt
                pairs = [[u1, u2]]
            elif cnt == max_common and cnt > 0:
                pairs.append([u1, u2])

    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(u² × f), where u = number of users, f = average number of followers per user. For each pair: set intersection is O(f), and there are O(u²) pairs.
- **Space Complexity:** O(u × f), for storing user-to-followers sets. Also O(u²) for list of result pairs in worst case (if all pairs are max).

### Potential follow-up questions (as if you’re the interviewer)  

- If the number of users is extremely large, how would you optimize this process?
  *Hint: Leverage inverted index by follower (for each follower, get all users), then count pairs as you go.*

- What if the input were a continuous stream of follow/unfollow events?
  *Hint: Use dynamic data structures like counters/maps to update pairs incrementally.*

- How would you extend to top-K pairs with most common followers, not just all max?
  *Hint: Use a heap or sort all pairs by the count of common followers.*

### Summary
This problem involves pairing users based on shared relationships (followers), and is a classic example of set intersection and aggregation across pairs. The standard pattern is mapping users to sets, iterating all pairs, and using set intersection—this pattern can be applied to social network, recommendation, and friend suggestion problems. For large-scale data, further optimizations leveraging inverted indices or distributed computing may be necessary.