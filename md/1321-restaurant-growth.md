### Leetcode 1321 (Medium): Restaurant Growth [Practice](https://leetcode.com/problems/restaurant-growth)

### Description  
You’re given a table of daily customer visits to a restaurant. Each entry records the visit's day and the customer count on that day. The task is to output another table showing, for each day, the cumulative total number of customer visits for that restaurant up to and including that day.

### Examples  

**Example 1:**  
Input: `day = [1,2,3], customer = [3,5,2]`  
Output: `[(1, 3), (2, 8), (3, 10)]`  
*Explanation: On day 1, 3 total customers; on day 2, 3+5=8; on day 3, 8+2=10.*

**Example 2:**  
Input: `day = [2,3,6], customer = [2,4,6]`  
Output: `[(2, 2), (3, 6), (6, 12)]`  
*Explanation: Each row shows cumulative customer total up to that day.*

**Example 3:**  
Input: `day = [1], customer = `  
Output: `[(1, 100)]`  
*Explanation: Only one day, cumulative is just the day's count.*

### Thought Process (as if you’re the interviewee)  
- Need to compute a running sum per day.
- For SQL: Use window functions (SUM OVER ORDER BY day).
- For Python lists: Iterate through sorted days, maintain running total.
- If days can be unordered, sort before accumulation.

### Corner cases to consider  
- Days are not consecutive
- Only one record
- Customer counts are zero or very large
- Data not sorted by day
- Multiple entries per day

### Solution

```python
# Running sum per day, assumes (day, customer) as list of tuples
def restaurantGrowth(records):
    # records: list of (day, customer)
    records.sort()  # ensure sorted by day
    res = []
    total = 0
    for day, cust in records:
        total += cust
        res.append((day, total))
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) for sorting, O(n) for accumulation.
- **Space Complexity:** O(n) for result list.

### Potential follow-up questions (as if you’re the interviewer)  
- What if multiple records are present for a single day?  
  *Hint: Aggregate counts per day first.*

- What if daily records come as a stream?  
  *Hint: Maintain and update running total as data arrives.*

- Can you do this with constant space?  
  *Hint: Print as you go, avoid storing all output.*

### Summary
This problem is an instance of the prefix sum pattern, which is common for running totals and cumulative aggregations in both SQL and code. It is foundational for time-series and data summarization problems.

### Tags
Database(#database)

### Similar Problems
