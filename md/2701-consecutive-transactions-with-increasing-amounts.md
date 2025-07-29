### Leetcode 2701 (Hard): Consecutive Transactions with Increasing Amounts [Practice](https://leetcode.com/problems/consecutive-transactions-with-increasing-amounts)

### Description  
Given a table of transactions with columns: `transaction_id` (unique), `customer_id`, `transaction_date`, and `amount`, find all sets of at least three consecutive days for each customer where the transaction amounts are strictly increasing. Each set is represented by the `customer_id`, a `start_date`, and an `end_date` for the period.

You should return all such intervals ordered by customer_id (ascending), start_date, end_date.

### Examples  

**Example 1:**  
Input:  
Transactions table:  
```
+---------------+-------------+------------------+--------+
| transaction_id| customer_id | transaction_date | amount |
+---------------+-------------+------------------+--------+
|      1        |    101      |     2023-01-01   |  100   |
|      2        |    101      |     2023-01-02   |  150   |
|      3        |    101      |     2023-01-03   |  200   |
|      4        |    102      |     2023-01-01   |  700   |
|      5        |    102      |     2023-01-02   |  700   |
+---------------+-------------+------------------+--------+
```
Output:  
```
+-------------+------------+------------+
| customer_id | start_date |  end_date  |
+-------------+------------+------------+
|    101      | 2023-01-01 | 2023-01-03 |
+-------------+------------+------------+
```
*Explanation: For customer 101, the amounts increase strictly over three consecutive days (100 → 150 → 200). Customer 102 does not qualify due to the repeated amount.*

**Example 2:**  
Input:  
Transactions table:  
```
+---------------+-------------+------------------+--------+
| transaction_id| customer_id | transaction_date | amount |
+---------------+-------------+------------------+--------+
|      6        |    105      |   2023-01-01     |  100   |
|      7        |    105      |   2023-01-02     |  150   |
|      8        |    105      |   2023-01-03     |  200   |
|      9        |    105      |   2023-01-04     |  300   |
+---------------+-------------+------------------+--------+
```
Output:  
```
+-------------+------------+------------+
| customer_id | start_date |  end_date  |
+-------------+------------+------------+
|    105      | 2023-01-01 | 2023-01-04 |
+-------------+------------+------------+
```
*Explanation: Customer 105 has four consecutive days, all increasing amounts. The start date is 2023-01-01, end date is 2023-01-04.*

**Example 3:**  
Input:  
Transactions table:  
```
+---------------+-------------+------------------+--------+
| transaction_id| customer_id | transaction_date | amount |
+---------------+-------------+------------------+--------+
|     10        |    201      |   2023-01-05     | 7000   |
|     11        |    201      |   2023-01-06     | 6000   |
|     12        |    201      |   2023-01-07     | 8000   |
+---------------+-------------+------------------+--------+
```
Output:  
```
(empty set)
```
*Explanation: There are no three consecutive days for this customer, and no strictly increasing sequence. Output should be empty.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each customer, sort all transactions by date, and check every window of three (or more) consecutive days. For each window, check that dates are consecutive and amounts increase strictly. This is very inefficient as it requires checking all possible triplets, and repeated comparisons.

- **Optimized approach:**  
  - Use window functions to process the data efficiently.
  - Assign a row number per customer ordered by date.  
  - Use the LAG (or LEAD) window function to get previous values, compare for consecutiveness of dates and strictly increasing amounts.
  - Track sequences where both conditions are satisfied. Label the start of every new sequence.
  - For each sequence of length ≥ 3, output the customer_id, start_date, and end_date.

- **Why window functions?**  
  - They’re optimal for comparing adjacent rows, e.g., LAG for previous amount/date.
  - Row numbering helps identify sequences and group them.
  - The approach is linear per customer, so more efficient than brute force.

### Corner cases to consider  
- Empty table: Should return empty.
- Customer with less than 3 transactions.
- Amounts not strictly increasing (equal, or decrease at any step).
- Multiple qualifying sequences per customer.
- Non-consecutive dates (gaps in days break the sequence).
- Transactions for multiple customers interleaved.
- Same day multiple transactions (should only use each date once per customer in order).

### Solution

```python
# As this is a SQL-heavy logic, here's Python pseudocode to demonstrate:
# The real solution would use SQL window functions (LAG, ROW_NUMBER) for efficiency.

from collections import defaultdict
from datetime import datetime, timedelta

def find_consecutive_increasing(transactions):
    # transactions: list of dicts: {customer_id, transaction_date, amount}
    ans = []
    # Organize by customer, sort each by date
    by_customer = defaultdict(list)
    for txn in transactions:
        by_customer[txn['customer_id']].append((txn['transaction_date'], txn['amount']))
    
    for customer_id, txns in by_customer.items():
        # Sort by date
        txns.sort()
        n = len(txns)
        start = 0
        while start < n:
            end = start
            # Try to expand
            while (end + 1 < n and
                  (datetime.strptime(txns[end+1][0], "%Y-%m-%d") - datetime.strptime(txns[end][0], "%Y-%m-%d")).days == 1 and
                  txns[end+1][1] > txns[end][1]):
                end += 1
            if end - start + 1 >= 3:
                ans.append({
                    'customer_id': customer_id,
                    'start_date': txns[start][0],
                    'end_date': txns[end][0]
                })
            # Move start pointer forward
            if end == start:
                start += 1
            else:
                start = end
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N is the number of transactions total. The major cost is sorting the transactions per customer (logarithmic per-customer), plus linear scan per customer.
- **Space Complexity:** O(N), for storing transactions grouped by customer and output storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to handle cases where the increasing requirement is “non-decreasing” (can be equal amounts)?
  *Hint: Adjust the amount comparison from ">" to ">=" when checking.*

- How would you optimize this for extremely large datasets (hundreds of millions of transactions)?
  *Hint: Discuss distributed computing, pre-sorting, database window functions, and processing per-user partitions.*

- How can you detect overlapping intervals and merge them if they are consecutively adjacent?
  *Hint: Merge intervals when end_date of the previous group equals start_date of the next group minus one day.*

### Summary
This problem is a classic example of the **windowing/grouping pattern** with consecutive elements, which can be solved using window functions in SQL or pointer-based sweeps in code. The pattern of finding maximal runs (or streaks) matching certain rules occurs in analytics, time-series, and behavioral/event analysis. Such logic generalizes to activity streaks, consecutive wins/losses in games, or trend detection in finance/log data.