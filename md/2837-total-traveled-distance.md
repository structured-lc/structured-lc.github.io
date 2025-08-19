### Leetcode 2837 (Easy): Total Traveled Distance [Practice](https://leetcode.com/problems/total-traveled-distance)

### Description  
Given two tables: **Users** (user_id, name) and **Rides** (ride_id, user_id, distance), return a list for *each user* showing their user_id, name, and the total traveled distance across all their rides.  
If a user hasn't completed any rides, show their traveled distance as **0**.  
Results should be ordered by user_id ascending.

### Examples  

**Example 1:**  
Input:  
Users =  
[ [1, "Alice"],  
  [2, "Bob"],  
  [3, "Charlie"] ]  

Rides =  
[ [1, 1, 12],  
  [2, 1, 8],  
  [3, 2, 3] ]  

Output:  
[  
 [1, "Alice", 20],  
 [2, "Bob", 3],  
 [3, "Charlie", 0]  
]  
*Explanation: Alice has two rides (12 + 8 → 20). Bob has one ride (3). Charlie has no rides, so distance is 0.*

**Example 2:**  
Input:  
Users =  
[ [7, "Dan"],  
  [8, "Eve"] ]  

Rides =  
[ [10, 7, 15] ]  

Output:  
[  
 [7, "Dan", 15],  
 [8, "Eve", 0]  
]  
*Explanation: Dan completed one 15km ride. Eve has no rides, so her distance is 0.*

**Example 3:**  
Input:  
Users =  
[ [1, "Nick"] ]  
Rides = [ ]  

Output:  
[ [1, "Nick", 0] ]  
*Explanation: Nick has no rides, so distance is 0.*


### Thought Process (as if you’re the interviewee)  
First, I want to show each user's total traveled distance.  
- The **main issue** is that users with *no rides* must have "traveled distance" as 0, but joining the tables normally omits those users.
- I need to include all users. I'll use a **LEFT JOIN** from Users to Rides on user_id.
- For users with no rides, Rides.distance will be NULL, so I'll use **IFNULL(Rides.distance, 0)** in the sum.
- Group the result by user_id to sum up rides per user.
- Order results by user_id as required.

**Brute-force idea:**  
- For each user, scan all rides, sum if the user_id matches.
- But a set-based join and aggregate is more efficient in SQL.

This is a classic "aggregation with possible missing joins" pattern.

### Corner cases to consider  
- Users with zero rides (ensure distance = 0)
- Users with multiple rides (sum all distances)
- Ties in user_id? (shouldn't happen as user_id is unique)
- Rides with distance 0 (should be summed as 0)
- Input tables could be empty

### Solution

```sql
SELECT
    Users.user_id,
    Users.name,
    SUM(IFNULL(Rides.distance, 0)) AS traveled_distance
FROM
    Users
LEFT JOIN
    Rides
ON
    Users.user_id = Rides.user_id
GROUP BY
    Users.user_id, Users.name
ORDER BY
    Users.user_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N + M), where N = number of users and M = number of rides.  
  The join step scans both tables; group by and sum visit each user’s rides.

- **Space Complexity:**  
  O(N), for storing the result (one row per user).  
  No extra space except for join/grouping buffers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this to show the *average* ride distance per user (0 if no rides)?
  *Hint: Use AVG and handle NULL similarly to how SUM was used.*

- What if users could also have "pending" rides (not yet traveled), and we only want to sum "completed" rides?
  *Hint: Add a ride status column, filter for completed rides in WHERE or ON.*

- How would you find, for each user, the ride with the *longest* distance?
  *Hint: Use MAX(Rides.distance) with the same join pattern, handle NULL.*

### Summary
This is a straightforward SQL *aggregation with LEFT JOIN* problem, where we avoid missing users with no rides by joining from Users and using IFNULL (COALESCE can also be used).  
This pattern is common for "compute roll-up metrics per entity even if no events/data exist" and applies to sales, transactions, etc.  
Handling NULLs in aggregates after joins is a core SQL skill.

### Tags
Database(#database)

### Similar Problems
