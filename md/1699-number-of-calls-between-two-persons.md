### Leetcode 1699 (Medium): Number of Calls Between Two Persons [Practice](https://leetcode.com/problems/number-of-calls-between-two-persons)

### Description  
Given a table `Calls` with columns:  
- **from_id** (int): The person making the call  
- **to_id** (int): The person receiving the call  
- **duration** (int): The duration of the call in seconds  

Write an SQL query to report, for each distinct pair of people, the **total number of calls** and their **total duration**. A pair (person1, person2) should always be reported with person1 < person2 (that is, the smaller id comes first), and calls in both directions (from_id→to_id and to_id→from_id) should be considered the same.  

The result table should have columns:
- person1
- person2
- call_count
- total_duration

### Examples  

**Example 1:**  
Input:  
Calls =  
| from_id | to_id | duration |
|---------|-------|----------|
|     1   |   2   |    59    |
|     2   |   1   |    11    |
|     1   |   3   |    20    |
|     3   |   4   |   100    |
|     4   |   3   |   200    |
|     3   |   4   |   200    |
|     4   |   3   |   499    |

Output:  
| person1 | person2 | call_count | total_duration |
|---------|---------|------------|---------------|
|    1    |    2    |     2      |      70       |
|    1    |    3    |     1      |      20       |
|    3    |    4    |     4      |     999       |

*Explanation:  
- 1–2 had 2 calls: 59 (1→2) + 11 (2→1) = 70.  
- 1–3 had 1 call: 20.  
- 3–4 had 4 calls: 100 + 200 + 200 + 499 = 999.*

**Example 2:**  
Input:  
Calls =  
| from_id | to_id | duration |
|---------|-------|----------|
|   10    |  15   |   60     |

Output:  
| person1 | person2 | call_count | total_duration |
|---------|---------|------------|---------------|
|   10    |   15    |     1      |      60       |

*Explanation:  
Only one call between 10 and 15 (10 < 15).*

**Example 3:**  
Input:  
Calls =  
| from_id | to_id | duration |
|---------|-------|----------|
|   5     |  7    |   10     |
|   7     |  5    |   10     |
|   8     |  9    |   5      |
|   9     |  8    |   25     |
|   5     |  7    |   20     |

Output:  
| person1 | person2 | call_count | total_duration |
|---------|---------|------------|---------------|
|   5     |   7     |     3      |      40       |
|   8     |   9     |     2      |      30       |

*Explanation:  
- 5–7: three calls (two by 5→7 and one by 7→5), total duration 10+10+20=40.  
- 8–9: one call each direction, total 5+25=30.*


### Thought Process (as if you’re the interviewee)  
- The main challenge is to consider both directions (from_id→to_id and to_id→from_id) as one pair and **always present the smaller id first**.
- Brute-force way: For every possible pair, count calls in both directions and sum durations. But since each row is already a call between two persons, we can process the table directly.
- To group bidirectional calls together, use `LEAST(from_id, to_id)` as person1 and `GREATEST(from_id, to_id)` as person2. This ensures (1,2) and (2,1) are grouped.
- For each group, count the number of calls and sum the duration.
- No complex window or join logic needed, straightforward aggregation after normalization.

**Trade-offs:** This approach is optimal for the size of the Calls table (full scan with group by is needed anyway). Simpler logic also avoids missing pairs.


### Corner cases to consider  
- No calls in table: output is empty.
- All calls are in one direction only.
- Calls only between one pair: output table with one row.
- Duplicate calls (same direction): all must be counted.
- Large ids, not sequential.
- Both person1 and person2 must be distinct (from_id ≠ to_id by table definition).
- Duplicates in table (allowed): must sum appropriately.


### Solution

```sql
SELECT 
    LEAST(from_id, to_id) AS person1,
    GREATEST(from_id, to_id) AS person2,
    COUNT(*) AS call_count,
    SUM(duration) AS total_duration
FROM Calls
GROUP BY person1, person2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Calls table. Each row is processed once and grouped.
- **Space Complexity:** O(u), where u is the number of unique unordered pairs (person1, person2). Storage for the aggregation results.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to show the average duration per call for each pair?  
  *Hint: Add an AVG(duration) aggregation.*

- What if you only wanted to return pairs with at least k calls?  
  *Hint: Use HAVING COUNT(\*) ≥ k for filtering.*

- How would you produce an output for each unique id: its total outbound calls and total inbound calls?  
  *Hint: Use CASE statements, group by from_id and group by to_id separately.*


### Summary
This problem utilizes **aggregation and pair normalization** in SQL. The pattern (`LEAST`, `GREATEST`, then `GROUP BY`) is common for **undirected relationships** in data (e.g., bidirectional friends, undirected edges). Useful in scenarios with relationship symmetry where (A,B) ≡ (B,A).

### Tags
Database(#database)

### Similar Problems
