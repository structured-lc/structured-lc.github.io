### Leetcode 180 (Medium): Consecutive Numbers [Practice](https://leetcode.com/problems/consecutive-numbers)

### Description  
Given a table `Logs` with at least columns `Id` (integer, unique, can have gaps) and `Num` (integer), **find all numbers that appear at least 3 times consecutively by `Id` order**.  
Return those numbers in a result with a single column named `ConsecutiveNums` (order does not matter).  
Imagine scanning logs and wanting to find values that repeat in a “streak” of three or more in a row.

### Examples  

**Example 1:**  
Input:  
Logs  
```
Id | Num
---|---
1  |  1
2  |  1
3  |  1
4  |  2
5  |  1
6  |  2
7  |  1
```
Output: `1`  
*Explanation: 1 appears at Ids 1,2,3, which are consecutive. No other number has 3 in a row.*

**Example 2:**  
Input:  
Logs  
```
Id | Num
---|---
1  | 2
2  | 2
3  | 2
4  | 2
5  | 3
6  | 4
7  | 5
```
Output: `2`  
*Explanation: 2 appears consecutively at Ids 1-4, which is more than 3 in a row. 3, 4, 5 do not appear in such a streak.*

**Example 3:**  
Input:  
Logs  
```
Id | Num
---|---
1  | 7
2  | 8
3  | 7
4  | 7
5  | 7
6  | 8
7  | 8
8  | 8
```
Output:  
`7`  
`8`  
*Explanation: 7 appears consecutively at Ids 3-5, so output 7. 8 appears consecutively at Ids 6-8, so output 8.*

### Thought Process (as if you’re the interviewee)  
Start by clarifying we want numbers that appear *at least* 3 times in a row — that is, read the table in order by Id, and look for runs where Num is the same for 3+ consecutive Ids (even if Ids are not gapless, order is determined by Id).

**Brute-force idea:**  
- For each row, check whether the current Num, the previous Num, and the next Num are all equal.  
- This would require a scan over the data, comparing each entry with its neighbors.

**Optimized:**  
- Since we need at least 3 consecutive, if we can, build (Id, Num) tuples and for each, check its previous and next row's Num.
- In SQL this is usually done by self-joining the table 3 times offset by Id, but in Python or procedural code, we’d sort rows by Id and use a sliding window.

**Why this approach?**  
- It’s efficient (just a single forward scan with a window of size 3).
- It guarantees we capture all “streaks” of length ≥3.

### Corner cases to consider  
- Empty table: output nothing.
- No number occurs three times in a row: output nothing.
- Same number appears in multiple non-overlapping streaks: output that number only once.
- Table has only one or two rows: output nothing.
- Ids are not strictly sequential: logic must be based on row order, not on Id arithmetic.

### Solution

```python
def find_consecutive_nums(logs):
    # Assume logs is a list of (Id, Num), and must be ordered by Id!
    logs.sort()  # sort by Id if not already

    result = set()
    n = len(logs)
    
    # Use a sliding window of size 3
    for i in range(n - 2):
        n1 = logs[i][1]
        n2 = logs[i+1][1]
        n3 = logs[i+2][1]
        
        # If all three are the same, we found a streak
        if n1 == n2 and n2 == n3:
            result.add(n1)  # only add once (set avoids duplicates)

    # Return as sorted list for consistency in tests
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) if sorting is needed (because we must process in Id order), otherwise O(n) for the single scan.
- **Space Complexity:** O(k), where k is the number of unique numbers that appear in such streaks (the result set); otherwise, only O(1) extra for window pointers while scanning.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle if the consecutive streak is longer than 3?  
  *Hint: The window approach will still catch any streak ≥3 as the window slides across.*

- What if Ids are not guaranteed unique?  
  *Hint: In real SQL, unique Id is needed for precise order. Duplicate Ids make order ambiguous.*

- How would you generalize for k consecutive numbers, where k can vary?  
  *Hint: Replace the fixed window of 3 with a sliding window of size k, or count repeated Num until it changes.*

### Summary
This problem is a classic example of the **sliding window** pattern, widely used for sequence analysis (finding streaks, subarrays, subsequences).  
It's useful in log analysis, stream processing, and wherever you need to detect “runs” of repeated values.  
SQL solutions often use window functions (e.g., LAG/LEAD) or self-joins, but programmatically the window approach is simple and efficient.