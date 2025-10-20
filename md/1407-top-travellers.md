### Leetcode 1407 (Easy): Top Travellers [Practice](https://leetcode.com/problems/top-travellers)

### Description  
Given tables `Users` and `Rides`, report the total distance travelled by each user. The output should list each user's `name` and their corresponding `travelled_distance`. Users who have not taken any rides should be included with a travelled distance of 0. Results should be ordered by travelled distance in descending order, and by name in ascending order for ties.

### Examples  
**Example 1:**  
Input: 
Users = `[ {id:1, name:"Alice"}, {id:2, name:"Bob"}, {id:3, name:"Charlie"} ]` 
Rides = `[ {user_id:1, distance:50}, {user_id:2, distance:30}, {user_id:1, distance:20} ]` 
Output: 
`Alice | 70`  
`Bob | 30`  
`Charlie | 0`  
*Explanation: Alice took two rides (50+20=70), Bob took one ride (30), Charlie took none (0).*  

**Example 2:**  
Input: 
Users = `[ {id:4, name:"Donald"} ]` 
Rides = `[]`
Output: 
`Donald | 0`  
*Explanation: Donald is in the users table but took no rides.*

**Example 3:**  
Input: 
Users = `[ {id:5, name:"Eve"}, {id:6, name:"Frank"} ]`  
Rides = `[ {user_id:5, distance:10}, {user_id:6, distance:10} ]`
Output:  
`Eve | 10`  
`Frank | 10`  
*Explanation: Both users travelled the same distance. Ordered by name.*

### Thought Process (as if you’re the interviewee)  
First, we need to join both tables so we can get the list of all users regardless of whether they have rides. A LEFT JOIN from Users to Rides ensures this: every user is listed, with ride data if it exists. Then, we aggregate the total distance per user using SUM, and use IFNULL (or COALESCE in some dialects) to convert NULLs to 0 for users with no rides. Finally, we order by travelled distance (descending), and by name (ascending) for tie-breakers. This covers the requirements and edge cases.

### Corner cases to consider  
- No rides at all (all users have a travelled distance of 0).
- Multiple users with the same total distance, requiring alphabetical ordering by name.
- Users in the Users table with no corresponding rides.
- Null values in the distance column.

### Solution

```python
# SQL solution -- shown for clarity, as this problem is SQL-native
# For interview coding (e.g., with Python), you would use an ORM or process list-of-dicts.

SELECT u.name, 
       IFNULL(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N + M), where N = number of users, M = number of rides. The join and aggregation scan all records once.
- **Space Complexity:** O(N), since the result must report one row per user, plus any temporary storage needed for the join and aggregation.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you optimize this query for very large datasets?  
  *Hint: Indexes on user_id in Rides, and consider summary tables for frequent queries.*

- What if we want the average ride length per user instead?  
  *Hint: Use AVG(r.distance) in the SELECT clause, and handle users with no rides by returning 0 or NULL.*

- How would you count the number of rides per user?  
  *Hint: Use COUNT(r.distance) or COUNT(r.id) in the SELECT clause, with the same LEFT JOIN approach.*

### Summary
This is a classic SQL aggregation and join pattern: LEFT JOIN to capture all users, SUM to total distances, and IFNULL/COALESCE to handle users with no rides. Ordering and tie-breaking are also common requirements for leaderboard or ranking queries.


### Flashcard
Perform a LEFT JOIN on Users and Rides tables, then aggregate total distance per user using SUM and IFNULL for NULL values. Sort results by distance in descending order and name in ascending order.

### Tags
Database(#database)

### Similar Problems
