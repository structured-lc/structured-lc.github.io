### Leetcode 2893 (Medium): Calculate Orders Within Each Interval [Practice](https://leetcode.com/problems/calculate-orders-within-each-interval)

### Description  
You are given an Orders table with two columns: `'minute'` (int, unique) and `'order_count'` (int). Each `minute` is guaranteed to appear exactly once, and the total number of rows is always a multiple of 6.  
An **interval** is defined as every group of 6 consecutive minutes:  
- Minutes 1–6 are interval 1, 7–12 are interval 2, and so on.
For each interval, **calculate the total number of orders received**.  
Return a table with columns: `interval_no` (interval number, starting from 1) and `total_orders` (number of orders in the interval), ordered by `interval_no` ascending.

### Examples  

**Example 1:**  
Input:  
Orders =  
```
| minute | order_count |
|--------|-------------|
|   1    |     0       |
|   2    |     2       |
|   3    |     4       |
|   4    |     6       |
|   5    |     1       |
|   6    |     4       |
|   7    |     1       |
|   8    |     2       |
|   9    |     4       |
|  10    |     1       |
|  11    |     4       |
|  12    |     6       |
```
Output:  
```
| interval_no | total_orders |
|-------------|-------------|
|      1      |      17     |
|      2      |      18     |
```
*Explanation: Minutes 1–6: 0+2+4+6+1+4 = 17; Minutes 7–12: 1+2+4+1+4+6 = 18.*

**Example 2:**  
Input:  
Orders =  
```
| minute | order_count |
|--------|-------------|
|   1    |     2       |
|   2    |     4       |
|   3    |     1       |
|   4    |     3       |
|   5    |     0       |
|   6    |     7       |
|   7    |     5       |
|   8    |     3       |
|   9    |     2       |
|  10    |     8       |
|  11    |     4       |
|  12    |     2       |
```
Output:  
```
| interval_no | total_orders |
|-------------|-------------|
|      1      |      17     |
|      2      |      24     |
```
*Explanation: Interval 1: 2+4+1+3+0+7 = 17; Interval 2: 5+3+2+8+4+2 = 24.*

**Example 3:**  
Input:  
Orders =  
```
| minute | order_count |
|--------|-------------|
|   1    |     1       |
|   2    |     1       |
|   3    |     1       |
|   4    |     1       |
|   5    |     1       |
|   6    |     1       |
```
Output:  
```
| interval_no | total_orders |
|-------------|-------------|
|      1      |      6      |
```
*Explanation: Only one interval (minutes 1–6), so total is 1×6 = 6.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Loop over all rows, and for each 6-minutes interval, sum up the `order_count`. For a SQL query, we would use grouping.

- **Efficient approach (SQL logic):**
  - Calculate the interval number for each row as `interval_no = ceil(minute / 6)`.
  - Group all the rows by `interval_no`, and for each group, sum `order_count`.
  - Sort results by `interval_no` ascending.
- **Trade-offs:**
  This is optimal given constraints: direct grouping eliminates the need for manual iteration. No intermediate array storage needed.

### Corner cases to consider  
- There is only one interval (exactly 6 rows)
- All `order_count` are zero (test correct aggregation)
- Input has large values for `minute`
- Sparse order counts (some minutes have zero orders)
- Multiple intervals, even if all intervals have same sum

### Solution

```python
def calculate_orders_within_each_interval(orders):
    # orders: List of [minute, order_count] pairs, minute starts at 1
    from collections import defaultdict
    interval_totals = defaultdict(int)
    
    for minute, order_count in orders:
        # Find interval: each interval is 6 minutes; interval_no starts at 1
        # interval_no = ceil(minute/6)
        interval_no = (minute - 1) // 6 + 1
        interval_totals[interval_no] += order_count
        
    # Build result: list of [interval_no, total_orders], sorted by interval_no
    result = []
    for interval_no in sorted(interval_totals):
        result.append([interval_no, interval_totals[interval_no]])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in orders; one pass to process, then sort by at most n/6 interval keys (which is negligible for small intervals).
- **Space Complexity:** O(n/6) in practice, or O(n) worst case if virtually all orders are in their own intervals; the mapping from interval number to total order count.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the interval size is not always 6?
  *Hint: Add a parameter for interval length and use it in the interval_no calculation.*

- What if there are missing minutes in the orders table?
  *Hint: You'll need to ensure all intervals are represented, possibly filling zeros where necessary.*

- How could you solve this in SQL?
  *Hint: Use CEIL(minute/6) (or FLOOR((minute-1)/6)+1) to compute interval_no, then GROUP BY that.*

### Summary
This problem applies the **group-by** or **bucketization** pattern, common in interval aggregation (windowing, histogram-bin counting, etc.).  
The approach can be applied whenever you need to group records by time, index, or value range and then summarize within those groups.  
This logic is routine in SQL and analytics, and optimizing the calculation of "interval buckets" generalizes to time-series, histogram, and sliding window statistics.