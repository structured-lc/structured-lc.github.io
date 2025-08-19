### Leetcode 614 (Medium): Second Degree Follower [Practice](https://leetcode.com/problems/second-degree-follower)

### Description  
Given a table `follow` with columns **followee** and **follower**, each row represents that "follower" follows "followee" in a social network.  
A **second-degree follower** is defined as a user who:
- Follows at least one other user (i.e. appears in the "follower" column)
- Is also followed by at least one user (i.e. appears in the "followee" column)

Your task: 
Report each user who is a "second-degree follower" and the count of their followers. Output should have columns (`follower`, `num`), ordered by follower alphabetically.

### Examples  

**Example 1:**  
Input:  
```
follow
+----------+----------+
| followee | follower |
+----------+----------+
| Alice    | Bob      |
| Bob      | Cena     |
| Bob      | Donald   |
| Donald   | Edward   |
+----------+----------+
```
Output:  
```
+----------+-----+
| follower | num |
+----------+-----+
| Bob      | 2   |
| Donald   | 1   |
+----------+-----+
```
*Explanation:*
- **Bob**: Follows Alice, and is followed by Cena and Donald → Appears as both follower and followee; number of followers = 2.
- **Donald**: Follows Bob, and is followed by Edward → Appears as both follower and followee; number of followers = 1.
- Others (Alice, Cena, Edward) are not both follower and followee.

**Example 2:**  
Input:  
```
follow
+----------+----------+
| followee | follower |
+----------+----------+
| A        | B        |
| B        | C        |
| B        | D        |
| D        | E        |
+----------+----------+
```
Output:  
```
+----------+-----+
| follower | num |
+----------+-----+
| B        | 2   |
| D        | 1   |
+----------+-----+
```
*Explanation:*
- **B**: Follows A, followed by C and D → appears as both follower and followee.
- **D**: Follows B, followed by E.
- **A, C, E** do not meet “both roles” criterion.

**Example 3:**  
Input:  
```
follow
+----------+----------+
| followee | follower |
+----------+----------+
| Alex     | Ben      |
| Ben      | Clara    |
| Clara    | Darin    |
+----------+----------+
```
Output:  
```
+----------+-----+
| follower | num |
+----------+-----+
| Ben      | 1   |
| Clara    | 1   |
+----------+-----+
```
*Explanation:*
- **Ben**: Follows Alex and is followed by Clara.
- **Clara**: Follows Ben and is followed by Darin.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: For each user in the table, check if they appear as both follower and followee. If so, count how many times they appear as followee (i.e., how many users follow them).  
- **Optimization**:  
  - Use sets (or dictionaries) to quickly check if a given user is both a follower and a followee.
  - As we scan through `follow`, create a set for all `followee`s and all `follower`s.
  - Next, for each unique `followee`, if they also appear in the follower set, count the number of times they are a followee.
  - This avoids nested loops, providing O(n) lookup and aggregation.
- **Why this approach**:  
  - Efficient — one pass for sets, one aggregation; sorts only at the end.
  - No complex joins or triple-nested iterations.

### Corner cases to consider  
- Table is **empty**: Output should be empty.
- No user appears in both columns: Output is empty.
- A user follows multiple users but isn’t followed by anyone: Not included.
- A user is followed by many, but follows no one: Not included.
- Users with only one record.
- Duplicate records: The count uses all rows.

### Solution

```python
def second_degree_follower(follow):
    # follow: List[Tuple[str, str]] where each tuple is (followee, follower)
    
    from collections import defaultdict

    # Sets for fast lookup
    followees = set()
    followers = set()
    
    # Step 1: collect all unique followees and followers
    for followee, follower in follow:
        followees.add(followee)
        followers.add(follower)
    
    # Step 2: Only users who are both followee (has followers) and follower (follows someone else)
    candidate = followees & followers  # set intersection
    
    # Step 3: Count number of followers for each candidate
    follower_count = defaultdict(int)
    for followee, follower in follow:
        if followee in candidate:
            follower_count[followee] += 1
    
    # Step 4: Compose result as (follower, num) ordered alphabetically
    result = []
    for user in sorted(follower_count):
        result.append({'follower': user, 'num': follower_count[user]})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k log k), where n = number of rows and k = number of distinct candidate users.
  - O(n): To collect followees/followers and count for candidate users.
  - O(k log k): To sort the output alphabetically by follower.
- **Space Complexity:** O(n), for storing sets and counting dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you write this as an **SQL query**?  
  *Hint: Use `GROUP BY`, `HAVING`, and subqueries to check membership in both columns.*

- Could you handle **self-following** if the rules changed?  
  *Hint: Add a check for `followee != follower` or adjust data filtering logic.*

- What if the **follower network is extremely large**?  
  *Hint: Discuss indexing, distributed computation, or limiting memory usage.*

### Summary

This problem uses the **set intersection** and **dictionary aggregation** patterns: find intersection between two roles, then aggregate associated counts.  
It’s a classic example of **graph degree counting** or “users by activity pattern,” commonly found in social network analysis, recommendation systems, or whenever participation criteria are “must be both source and target.”

### Tags
Database(#database)

### Similar Problems
