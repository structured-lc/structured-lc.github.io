### Leetcode 2687 (Easy): Bikes Last Time Used  [Practice](https://leetcode.com/problems/bikes-last-time-used)

### Description  
Given a table Bikes with columns: ride_id (unique integer), bike_number (string or integer), start_time (datetime), and end_time (datetime). Each row represents a ride (from start_time to end_time) for a specific bike.  
**Task:** For each bike, find the last time (latest end_time) it was used, i.e., for every unique bike_number, select the latest end_time.  
Return one row per bike (bike_number, end_time), ordered by end_time descending (most recently used bikes first).

### Examples  

**Example 1:**  
Input:  
Bikes =  
| ride_id | bike_number | start_time          | end_time            |
|---------|-------------|---------------------|---------------------|
| 1       | W00576      | 2012-03-27 22:00:00 | 2012-03-27 22:30:00 |
| 2       | W00300      | 2012-03-25 10:00:00 | 2012-03-25 10:50:00 |
| 3       | W00455      | 2012-03-26 17:00:00 | 2012-03-26 17:40:00 |
| 4       | W00576      | 2012-03-27 23:00:00 | 2012-03-27 23:01:00 |
| 5       | W00455      | 2012-03-25 12:00:00 | 2012-03-25 12:30:00 |
| 6       | W00576      | 2012-03-28 02:00:00 | 2012-03-28 02:50:00 |

Output:  
| bike_number | end_time            |
|-------------|---------------------|
| W00576      | 2012-03-28 02:50:00 |
| W00455      | 2012-03-26 17:40:00 |
| W00300      | 2012-03-25 10:50:00 |

*Explanation: For each bike_number, pick the latest (max) end_time. Sort descending by that value.*


**Example 2:**  
Input:  
Bikes =  
| ride_id | bike_number | start_time          | end_time            |
|---------|-------------|---------------------|---------------------|
| 10      | B1          | 2022-01-01 09:00:00 | 2022-01-01 09:15:00 |
| 11      | B2          | 2022-01-01 09:10:00 | 2022-01-01 09:55:00 |
| 12      | B1          | 2022-01-02 08:00:00 | 2022-01-02 09:00:00 |

Output:  
| bike_number | end_time            |
|-------------|---------------------|
| B1          | 2022-01-02 09:00:00 |
| B2          | 2022-01-01 09:55:00 |

*Explanation: For bike B1, the last ride ended at 2022-01-02 09:00:00; for B2, it was 2022-01-01 09:55:00. Order by end_time descending.*


**Example 3:**  
Input:  
Bikes =  
| ride_id | bike_number | start_time          | end_time            |
|---------|-------------|---------------------|---------------------|
| 21      | X1          | 2022-06-05 10:00:00 | 2022-06-05 10:10:00 |

Output:  
| bike_number | end_time            |
|-------------|---------------------|
| X1          | 2022-06-05 10:10:00 |

*Explanation: Only one bike and one ride; output is the end_time of that ride.*

### Thought Process (as if you’re the interviewee)  
First, for each unique bike_number, I need to find the latest time (end_time) that bike was used. This means, for every bike_number, pick max(end_time).

- Brute-force idea: For each bike_number, scan the whole table and find the max end_time. This is inefficient if the table is large.
- Optimal in SQL: Use GROUP BY bike_number and compute MAX(end_time) for each group. This gives the latest end_time efficiently.
- Then, since the question wants bikes with most recent usage on top, I need to order by end_time descending.

Trade-off: Using aggregate functions with GROUP BY is optimal and standard for this kind of problem. Scales well, minimal computation.

### Corner cases to consider  
- The table Bikes is empty ⇒ should return no rows.
- Some bike_number appears only once ⇒ correct, output that entry’s end_time.
- Duplicate rides for same bike at the same end_time ⇒ both are fine; max is that shared value.
- Overlapping time ranges for the same bike.
- Multiple bikes share the same last end_time ⇒ ordering between them does not matter.
- Large number of bikes and rides.

### Solution

```sql
SELECT
    bike_number,
    MAX(end_time) AS end_time
FROM
    Bikes
GROUP BY
    bike_number
ORDER BY
    end_time DESC
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of rows in the Bikes table. Each row is processed once in the GROUP BY aggregation.
- **Space Complexity:** O(M), where M is the number of unique bike_number entries (size of result set).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties if two bikes have the exact same last end_time?  
  *Hint: Add ORDER BY bike_number to secondary sort.*

- What if you wanted to include the ride_id of the last ride for each bike?  
  *Hint: Use a subquery or window functions (ROW_NUMBER/PARTITION BY) to select the row with max end_time per bike.*

- What if the end_time column can be null?  
  *Hint: Decide if it should be ignored (use WHERE end_time IS NOT NULL), or if NULL should be treated as the “latest” or “earliest”.*

### Summary
This problem is a classic SQL aggregation and grouping task: “group by key and aggregate.” It uses the GROUP BY + MAX pattern, and then sorts for reporting order.  
This pattern applies broadly to “last event per entity,” “most recent record per key,” or “top N by group” business logic in analytics and reporting.


### Flashcard
GROUP BY bike_number, compute MAX(end_time) for each bike, then order by end_time DESC to list bikes from most recently used to least.

### Tags
Database(#database)

### Similar Problems
