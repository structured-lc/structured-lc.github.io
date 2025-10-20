### Leetcode 1113 (Easy): Reported Posts [Practice](https://leetcode.com/problems/reported-posts)

### Description  
This problem works with a database table named `Actions`, which records user activities on an online forum. Each row includes columns: `user_id`, `post_id`, `action_date`, `action`, and `extra`. 

- Each time a user performs an action (such as 'view', 'like', or 'report') on a post, a record appears with the date and action type.
- The main task is to **write a SQL query to report the number of unique posts that were reported as spam (action='report') for every date (`action_date`)**. The output should have columns `action_date` and `reported_count`, sorted by date.

The goal is to output a list of dates, and for each date, show how many distinct posts were reported (i.e., had an action 'report') on that day.

### Examples  

**Example 1:**  
Input:  
Table Actions:
| user_id | post_id | action_date | action   | extra |
|---------|---------|-------------|----------|-------|
| 1       | 101     | 2022-07-01  | view     | ...   |
| 2       | 102     | 2022-07-01  | like     | ...   |
| 3       | 101     | 2022-07-01  | report   | ...   |
| 4       | 101     | 2022-07-01  | report   | ...   |
| 5       | 103     | 2022-07-02  | report   | ...   |

Output:  
| action_date | reported_count |
|-------------|----------------|
| 2022-07-01  | 1              |
| 2022-07-02  | 1              |

*Explanation: On 2022-07-01, post 101 was reported (once or more, still only counts as 1 unique post).  
On 2022-07-02, post 103 was reported.*

**Example 2:**  
Input:  
| user_id | post_id | action_date | action   | extra |
|---------|---------|-------------|----------|-------|
| 6       | 105     | 2022-08-01  | report   | ...   |
| 7       | 106     | 2022-08-01  | view     | ...   |
| 8       | 107     | 2022-08-01  | report   | ...   |
| 9       | 105     | 2022-08-01  | report   | ...   |

Output:  
| action_date | reported_count |
|-------------|----------------|
| 2022-08-01  | 2              |

*Explanation: On 2022-08-01, posts 105 and 107 were reported.*

**Example 3:**  
Input:  
| user_id | post_id | action_date | action   | extra |
|---------|---------|-------------|----------|-------|
| 1       | 201     | 2022-09-05  | view     | ...   |
| 2       | 202     | 2022-09-05  | view     | ...   |

Output:  
| action_date | reported_count |
|-------------|----------------|
|             |                |

*Explanation: No posts were reported, so output is empty.*

### Thought Process (as if you’re the interviewee)  
Start by focusing on the requirements:
- We only care about rows where `action='report'`.
- We count distinct post IDs reported on each date.
- We want to group by `action_date` and count the unique post_ids reported.
- Only output the date and the number of posts reported that day.

A brute-force (inefficient) approach would be to scan all actions row by row, keep an in-memory map of dates to sets of post_ids; but in SQL, we leverage GROUP BY and COUNT(DISTINCT ...).

So, a natural/final approach:
- Filter for action='report'
- Group by `action_date`
- For each group, count distinct `post_id`
- Return date and count, ordered by date ascending

### Corner cases to consider  
- Days where multiple users report the same post—should only count a post once per day.
- Day(s) with no reports (should *not* show in the result, as no reported_count).
- All reports happen on a single day.
- No 'report' actions at all: output should be empty.

### Solution

```sql
SELECT
    action_date,
    COUNT(DISTINCT post_id) AS reported_count
FROM
    Actions
WHERE
    action = 'report'
GROUP BY
    action_date
ORDER BY
    action_date ASC;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Actions table. Each row is read once, and the GROUP BY/COUNT uses indexes efficiently.
- **Space Complexity:** O(d × p), where d is the number of distinct dates with at least one report, and p is the number of unique post_ids reported per date (needed for grouping and counting).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the query if you wanted to include all dates, even those with zero reported posts?
  *Hint: Use a calendar/date table and LEFT JOIN Actions to preserve all dates.*
  
- What if we wanted to list the post_ids reported each day as a comma-separated string?
  *Hint: Use GROUP_CONCAT(post_id) to aggregate post IDs per date.*
  
- How would you compute the percentage of posts reported versus all posts per day?
  *Hint: Need a way to join with all posts per day and compute ratio.*

### Summary
This problem utilizes the **group by + count distinct** pattern in SQL, essential for common analytics like deduplication and daily aggregation. It's a classic database query frequently encountered in business reporting, monitoring reported/flagged content, and user activity summarization. This pattern generalizes to any situation where you need unique entity counts over time or categories.


### Flashcard
Filter rows where action = 'report', GROUP BY action_date, COUNT(DISTINCT post_id) for each date.

### Tags
Database(#database)

### Similar Problems
