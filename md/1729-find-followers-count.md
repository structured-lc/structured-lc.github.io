### Leetcode 1729 (Easy): Find Followers Count [Practice](https://leetcode.com/problems/find-followers-count)

### Description  
We are given a table called `Followers` with columns `user_id` and `follower_id`. Each row represents a "follow" relationship (i.e., follower_id follows user_id). Our task is to write a query that returns, for each user, their user_id and the count of their followers as `followers_count`. The answer must be sorted by user_id in ascending order. If a user has no followers, they should not appear in the output.

### Examples  

**Example 1:**  
Input:  
`Followers` table:  
| user_id | follower_id |
| ------- | ----------- |
| 0       | 1           |
| 1       | 2           |
| 2       | 0           |
| 2       | 1           |

Output:  
| user_id | followers_count |
| ------- | --------------- |
| 0       | 1               |
| 1       | 1               |
| 2       | 2               |

Explanation:  
- User 0 is followed by 1 user: follower_id=1  
- User 1 is followed by 1 user: follower_id=2  
- User 2 is followed by 2 users: follower_id=0 and 1

**Example 2:**  
Input:  
| user_id | follower_id |
| ------- | ----------- |
| 3       | 4           |
| 3       | 2           |

Output:  
| user_id | followers_count |
| ------- | --------------- |
| 3       | 2               |

Explanation:  
- User 3 is followed by 2 users: follower_id=4, follower_id=2

**Example 3:**  
Input:  
| user_id | follower_id |
| ------- | ----------- |
| 5       | 7           |

Output:  
| user_id | followers_count |
| ------- | --------------- |
| 5       | 1               |

Explanation:  
- User 5 is followed by 1 user: follower_id=7

### Thought Process (as if you’re the interviewee)  
To solve this, we need to count how many times each user_id appears in the Followers table as a target of a follow. The brute-force approach is to scan the table and, for each unique user_id, count the number of rows with that user_id. A more optimal way (and standard in SQL) is grouping the records by user_id and counting the number of rows per group.  
- We'll use GROUP BY user_id to aggregate by each user.
- Count the number of followers by counting the follower_id.
- If a user_id does not appear in the table, they are not followed by anyone, and thus should not be in the result (matches requirements).
- Finally, sort by user_id ascending for the output.

### Corner cases to consider  
- Users with **zero followers** are not included in the output.
- **Multiple entries** for the same user_id (multiple followers are correctly counted by GROUP BY).
- The **same follower_id** can follow multiple user_ids; irrelevant for counting.
- Table with **no rows** returns empty output.
- All followers are **unique** due to the table's constraints.
- Only one user in the table, with or without followers.

### Solution

```python
# Since this is a SQL problem, here's the standard SQL solution with detailed comments

SELECT 
    user_id,                         -- The ID of the user being followed
    COUNT(follower_id) AS followers_count   -- Number of followers for this user
FROM 
    Followers                        -- From the Followers table
GROUP BY 
    user_id                          -- Grouped to count per user
ORDER BY 
    user_id ASC                      -- Ordered as per problem statement
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Followers table. Each row is processed once during grouping and aggregation.
- **Space Complexity:** O(k), where k is the number of unique user_ids. The main storage is the hash map/dictionary that counts followers per user for the result set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to see users who have zero followers too?  
  *Hint: Think about outer joins with a Users table if available.*

- Can we show for each follower how many users they are following?  
  *Hint: Change the GROUP BY to follower_id and count user_id instead.*

- How to handle duplicate or invalid rows if the Followers table did allow them?  
  *Hint: Use COUNT(DISTINCT follower_id) or add validation constraints.*

### Summary
This problem uses the **SQL GROUP BY and aggregate pattern** to quickly process counting/grouping problems. It’s a standard frequency/counts question that also commonly appears in interview questions on user engagement, logs statistics, or social media analytics. Variations can include showing zeros using OUTER JOINs, reversing the aggregation, or deduplicating with DISTINCT.

### Tags
Database(#database)

### Similar Problems
