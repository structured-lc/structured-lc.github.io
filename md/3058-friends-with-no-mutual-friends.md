### Leetcode 3058 (Medium): Friends With No Mutual Friends [Practice](https://leetcode.com/problems/friends-with-no-mutual-friends)

### Description  
Given a list of friendship relationships between users, return all pairs of friends (user₁, user₂) such that user₁ and user₂ **do not have any mutual friends** except each other.  
Friendships are undirected (if A is a friend of B, B is a friend of A), and each pair is only listed once.  
A *mutual friend* for a pair (A, B) is someone who is friends with both A and B.

### Examples  

**Example 1:**  
Input:  
friends =  
| user_id1 | user_id2 |  
|----------|----------|  
|    6     |    7     |  

Output:  
`[[6,7]]`  
*Explanation:*
6 and 7 are only friends with each other and have no other friends, so there are no mutual friends who know them both.

**Example 2:**  
Input:  
friends =  
| user_id1 | user_id2 |  
|----------|----------|  
|   1      |   2      |  
|   2      |   3      |  
|   3      |   1      |  

Output:  
`[]`  
*Explanation:*
1 and 2 share a mutual friend (3), and so does every other pair—no pair qualifies.

**Example 3:**  
Input:  
friends =  
| user_id1 | user_id2 |  
|----------|----------|  
|   1      |   2      |  
|   1      |   3      |  
|   2      |   4      |  
|   3      |   5      |  

Output:  
`[[2,4],[3,5]]`  
*Explanation:*
- 2 and 4 are directly friends, and none of their other friends overlap.
- 3 and 5 are directly friends, and none of their other friends overlap.


### Thought Process (as if you’re the interviewee)  
First, understand the requirements:  
- We want all pairs of friends with **no mutual (shared) friends**.
- Friendships are bidirectional; we must consider both (A, B) and (B, A) as equivalent and only report once.

**Brute force approach:**  
- For every pair (A, B) in the list, find all friends of A (excluding B), and all friends of B (excluding A).
- If their friend lists do **not** overlap, add (A, B) to the answer.

This is O(n²) if implemented naively, where n = number of users.

**Optimized approach:**  
- First, build an adjacency list: for each user, keep a set of all their friends.
- For each unique friendship (u, v), check if set(friends[u]) ∩ set(friends[v]) (excluding v from friends[u] and u from friends[v]) is empty.
- If yes, strong candidate.

Why sets? Checking for intersection is O(min(degree)) and set lookups are fast.

**Edge cases:**  
- Mutual friendship can be stored as (u, v) and (v, u); handle only unique pairs.
- Users with no other friends: their only edge will have no mutuals by default.

Tradeoff: Space for adjacency storage; Time optimized due to sets.


### Corner cases to consider  
- Empty friends list ➔ Should return empty.
- All users have only one friend ➔ All pairs qualify.
- All users are mutual friends with each other ➔ No pair qualifies.
- Duplicate entries for friendship (e.g. both (A,B) and (B,A) present).
- Users with themselves as friends (self-loop) ➔ Exclude.

### Solution

```python
def friends_with_no_mutual_friends(friends):
    """
    friends: List[List[int]], where each element is [user_id1, user_id2]
    Returns: List[List[int]] of all [user_id1, user_id2] pairs with no mutual friends (user_id1 < user_id2)
    """

    # Build adjacency list: for each user, store a set of their friends
    adj = dict()
    for u, v in friends:
        if u == v:  # ignore self loops
            continue
        adj.setdefault(u, set()).add(v)
        adj.setdefault(v, set()).add(u)

    # To avoid duplicates, process only user_id1 < user_id2
    result = []
    for u in adj:
        for v in adj[u]:
            if u < v:
                # Exclude each other and check intersection
                u_friends = adj[u] - {v}
                v_friends = adj[v] - {u}
                if u_friends.isdisjoint(v_friends):
                    result.append([u, v])

    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × k), where m = number of edges (friendships), and k = average friends per user. For each friendship, we compute set differences and intersection (which is fast with sets). In sparse graphs, this is very efficient.
- **Space Complexity:** O(n + m), where n = number of users (for adjacency list), m = friendships (edges list). No extra heavy data structures are used except small sets per user.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you change if the data was massive and could not fit in memory?
  *Hint: Consider streaming, distributed storage, or database joins.*

- How would you return not just the pairs but also the count of non-mutual friends for each pair?
  *Hint: Slightly modify result structure, track set sizes instead.*

- How does your code handle duplicate entries or unordered pairs?
  *Hint: Did you deduplicate or order pairs?*

### Summary
This uses an **adjacency set + unique pairs** pattern, common in graph problems requiring neighbor lookups and set math.  
The approach is efficient by leveraging set intersection tests for fast detection of mutual friends, and is applicable in social network analysis, common friends counting, or problems involving direct vs. indirect connections.

### Tags
Database(#database)

### Similar Problems
