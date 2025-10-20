### Leetcode 1661 (Easy): Average Time of Process per Machine [Practice](https://leetcode.com/problems/average-time-of-process-per-machine)

### Description  
Given a logs table, find the average processing time per machine. Each log entry has machine_id, process_id, and processing_time. Output a table with each machine_id and the corresponding average processing_time, rounded to 3 decimal places.

### Examples  

**Example 1:**  
Input:  
| machine_id | process_id | processing_time |
|------------|------------|----------------|
|     1      |     1      |      3         |
|     1      |     2      |      5         |
|     2      |     1      |      8         |
Output:  
| machine_id | processing_time |
|------------|----------------|
|     1      |     4.000      |
|     2      |     8.000      |
*Explanation: Machine 1 processes two jobs (average 4.0); machine 2 processes one (8.0).*

**Example 2:**  
Input:  
| machine_id | process_id | processing_time |
|------------|------------|----------------|
|     1      |     1      |      1         |
|     1      |     2      |      1         |
|     2      |     1      |      1         |
|     2      |     2      |      3         |
Output:  
| machine_id | processing_time |
|------------|----------------|
|     1      |     1.000      |
|     2      |     2.000      |
*Explanation: Each machine average is calculated over their rows.*

### Thought Process (as if you’re the interviewee)  
The problem is grouped aggregation: for each machine_id, calculate the average processing_time, then round to 3 decimals. In SQL: GROUP BY machine_id, then use ROUND(AVG(processing_time), 3).

### Corner cases to consider  
- Machine with only one process (average is value)
- Multiple machines
- Log with one entry
- Some machine_ids never appear (should not be in output)

### Solution

```sql
SELECT machine_id,
       ROUND(AVG(processing_time), 3) AS processing_time
FROM Activity
GROUP BY machine_id;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), scan all log rows once.
- **Space Complexity:** O(K), K = # of distinct machine_ids in output.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you calculate median instead of average?
  *Hint: Use window functions or rank/order inside group.*

- How to handle missing processing_time (nulls)?
  *Hint: Use AVG ignores nulls by default, but verify.*

- Suppose machine_ids are not consecutive; does it affect grouping?
  *Hint: No, GROUP BY works for any unique values.*

### Summary
The core is SQL aggregation pattern: GROUP BY + AVG + ROUND. This is common for log aggregates, report generation, and dashboard summary queries.


### Flashcard
Group by machine_id, compute average processing_time, and round to 3 decimals in SQL.

### Tags
Database(#database)

### Similar Problems
