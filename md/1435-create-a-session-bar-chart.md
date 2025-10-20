### Leetcode 1435 (Easy): Create a Session Bar Chart [Practice](https://leetcode.com/problems/create-a-session-bar-chart)

### Description  
Given a table `Sessions` with columns `session_id` (unique int) and `duration` (int, in seconds), report how many sessions fall into each of these bins based on duration:

- "[0-5>" minutes: 0 ≤ duration < 300 seconds
- "[5-10>" minutes: 300 ≤ duration < 600 seconds
- "[10-15>" minutes: 600 ≤ duration < 900 seconds
- "15 or more" minutes: duration ≥ 900 seconds

Return a table with columns (bin, total) representing the bin description and number of sessions in it. Return rows for all bins (even if some bins have 0 sessions). Order does not matter.

### Examples  

**Example 1:**  
Input: Sessions =
```
+------------+----------+
| session_id | duration |
+------------+----------+
| 1          |     30   |
| 2          |    299   |
| 3          |    340   |
| 4          |    580   |
| 5          |   1000   |
+------------+----------+
```
Output: 
```
+--------------+-------+
| bin          | total |
+--------------+-------+
| [0-5>        | 3     |
| [5-10>       | 1     |
| [10-15>      | 0     |
| 15 or more   | 1     |
+--------------+-------+
```
*Explanation: Durations 30, 299, 340 are < 5min ⇒ [0-5> bin. 580 is 580/60≈9.7min ⇒ [5-10> bin. 1000 is > 15min ⇒ "15 or more" bin.*

### Thought Process (as if you’re the interviewee)  
The key is grouping durations into the required bins. Since the ranges are rigid and there are only four bins, I'd use each bin's lower and upper bounds (in seconds) to define the groupings. In SQL, this is best achieved using separate SELECT statements counting sessions that fall into each bin, combined with UNION ALL to ensure all bins are present, even if empty. In an actual SQL schema, this avoids missing bins with zero counts.

Alternatively, if grouped by a CASE WHEN statement, all bins with data would appear, but bins with 0 entries would be omitted — which is not acceptable for this problem.

### Corner cases to consider  
- Sessions at exact bin boundaries (exactly 300, 600, 900 seconds)
- No sessions for a given bin (should still return 0)
- All sessions fall outside defined bins
- Empty Sessions table

### Solution

```sql
-- For SQL interviews
SELECT '[0-5>' AS bin, COUNT(*) AS total FROM Sessions WHERE duration >= 0 AND duration < 300
UNION ALL
SELECT '[5-10>' AS bin, COUNT(*) FROM Sessions WHERE duration >= 300 AND duration < 600
UNION ALL
SELECT '[10-15>' AS bin, COUNT(*) FROM Sessions WHERE duration >= 600 AND duration < 900
UNION ALL
SELECT '15 or more' AS bin, COUNT(*) FROM Sessions WHERE duration >= 900;
```


### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — each session is scanned once per bin (total O(n) with four bins is still linear).
- **Space Complexity:** O(1) for SQL, since only result rows for four bins are stored.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the solution to N bins with arbitrary ranges?  
  *Hint: Consider adding a lookup (bin definition) table and joining with Sessions.*

- How would you visualize the bin counts in Python?  
  *Hint: Use a bar chart with matplotlib or seaborn.*

- How to handle sessions overlap with multiple features, e.g., by user or time of day?
  *Hint: Consider grouping by user or adding an extra GROUP BY/WHERE clause.*

### Summary
This problem is a classic example of data binning and summarizing with range conditions. The solution uses the SQL UNION ALL pattern with WHERE clauses for fixed bins, a pattern common in Analytics SQL and reporting interview questions.


### Flashcard
Use UNION ALL to combine four SELECTs, each counting sessions in a fixed duration bin; ensures all bins appear, even with zero counts.

### Tags
Database(#database)

### Similar Problems
- Count Salary Categories(count-salary-categories) (Medium)