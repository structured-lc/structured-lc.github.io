### Leetcode 1613 (Medium): Find the Missing IDs [Practice](https://leetcode.com/problems/find-the-missing-ids)

### Description  
Given a table with an ID column holding unique IDs from `1` to `n`, some IDs may be missing. Write a query to return the IDs missing from the table.

### Examples  
**Example 1:**  
Input: Table has IDs: `1,2,4,6`  
Output: `3,5`  
*Explanation: IDs 3 and 5 are the missing ones in the full range.*

**Example 2:**  
Input: Table has IDs: `2,3,5`  
Output: `1,4`  
*Explanation: IDs 1 and 4 are missing in sequence.*

**Example 3:**  
Input: Table has IDs: `1,2,3,4,5`  
Output: ``  
*Explanation: No IDs missing.*

### Thought Process (as if you’re the interviewee)  
We need to find the **gap(s)** in the ID sequence from 1 to n. If given only the IDs present, generate all IDs, then select those missing in the table.
- In SQL: Use a numbers or sequence table (or generate series from 1 to max ID), then LEFT JOIN to the IDs table and select those with no match.
- In Python: Use a set of 1..n, subtract given IDs, output what remains.
- Core: find difference between expected full set and observed IDs set.

### Corner cases to consider  
- No IDs missing (input has 1..n)
- All but one ID missing
- Only one ID present
- IDs out of order, or table is empty

### Solution (assume Python and SQL)

```python
# Python solution
# Suppose n is max ID, ids is list of IDs present
def find_missing_ids(ids, n):
    ids_set = set(ids)
    return [i for i in range(1, n+1) if i not in ids_set]
```

```sql
-- SQL solution (assuming your_table has column 'id' and you know n)
SELECT t1.id AS missing_id
FROM (
  SELECT generate_series(1, N) AS id  -- Or use a numbers table
) t1
LEFT JOIN your_table t2 ON t1.id = t2.id
WHERE t2.id IS NULL;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) for both Python and SQL approaches (scan/generate 1..n, compare to set or join).
- **Space Complexity:** O(n) to store sets or intermediate table (not counting output).

### Potential follow-up questions (as if you’re the interviewer)  
- What if the IDs can be any integer, not just 1..n, possibly negative?
  *Hint: Generalize set difference or adjust sequence table.*

- Can you do it without extra space?
  *Hint: Output stream or use on-the-fly comparison if sorted.*

- Find **consecutive ranges** of missing IDs.
  *Hint: Post-process differences into intervals or use window functions.*

### Summary
The question is a classic "find missing from full set" task. The **set difference** pattern is common in data problems, and easily translates between SQL and Python.