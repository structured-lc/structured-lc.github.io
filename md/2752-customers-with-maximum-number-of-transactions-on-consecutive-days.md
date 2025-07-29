### Leetcode 2752 (Hard): Customers with Maximum Number of Transactions on Consecutive Days [Practice](https://leetcode.com/problems/customers-with-maximum-number-of-transactions-on-consecutive-days)

### Description  
Given a list of transactions with customer\_id and transaction\_date, find **the customer(s) who had the maximum number of transactions on consecutive days**. Each transaction is on a date (YYYY-MM-DD format), and dates can be repeated in input, but only one transaction per day per customer. The output is the list of customer\_ids who had the longest streak of consecutive days with at least one transaction.

### Examples  

**Example 1:**  
Input:  
transactions =  
```python
[
    {"customer_id": 101, "transaction_date": "2023-07-01"},
    {"customer_id": 101, "transaction_date": "2023-07-02"},
    {"customer_id": 101, "transaction_date": "2023-07-03"},
    {"customer_id": 102, "transaction_date": "2023-07-01"},
    {"customer_id": 102, "transaction_date": "2023-07-02"},
]
```
Output: ``  
Explanation:  
Customer 101 has 3 consecutive transaction days (2023-07-01, 02, 03).  
Customer 102 has a streak of 2 days.

**Example 2:**  
Input:  
transactions =  
```python
[
    {"customer_id": 201, "transaction_date": "2022-09-09"},
    {"customer_id": 201, "transaction_date": "2022-09-12"},
    {"customer_id": 201, "transaction_date": "2022-09-13"},
    {"customer_id": 202, "transaction_date": "2022-09-07"},
    {"customer_id": 202, "transaction_date": "2022-09-08"},
    {"customer_id": 202, "transaction_date": "2022-09-09"},
]
```
Output: ``  
Explanation:  
Customer 202 has 3 consecutive days (07, 08, 09).  
Customer 201 only has at most 2 consecutive days (12, 13).

**Example 3:**  
Input:  
transactions =  
```python
[
    {"customer_id": 301, "transaction_date": "2021-12-01"},
    {"customer_id": 302, "transaction_date": "2021-12-01"},
]
```
Output: `[301, 302]`  
Explanation:  
Each has only 1 day. Both tie for max streak.

### Thought Process (as if you’re the interviewee)  
First, for each customer, we need to find the **maximum streak of consecutive days** they made a transaction.  
- The brute force approach would be, for each customer, sort their transaction dates and scan to find the longest consecutive sequence.
- Sorting by date per customer is O(k log k) for k transactions, then a single scan to find the streak is O(k).
- We'll need to track the global max streak length and find all customers who reached this.

To optimize, we could preprocess the data using a dictionary keyed by customer\_id mapping to a sorted list of unique dates. For each customer, iterate their sorted date list and track current streak. Update max streak and corresponding customers list as we go.

Trade-offs:  
- Brute-force is simple and clear; as transaction volume grows per customer, date sorting may add up.  
- The above method is fairly optimal—date sorting is required, and streak finding is linear per customer.
- Memory: Requires storing unique dates per customer; acceptable for typical transaction data.

### Corner cases to consider  
- Empty input (no transactions)  
- Single customer, single day  
- Customers with non-overlapping streak lengths (multiple max streaks, need all customers)  
- Non-consecutive but repeated transaction dates (only count consecutive dates)  
- Customers with multiple streaks; only the longest counts  
- Input dates not sorted  
- Dates possibly duplicated (should only count unique date per day per customer)

### Solution

```python
from collections import defaultdict

def customers_with_max_consecutive_transactions(transactions):
    # customer_id => set of unique dates for that customer
    customer_dates = defaultdict(set)
    for t in transactions:
        customer_id = t['customer_id']
        customer_dates[customer_id].add(t['transaction_date'])

    # Helper to convert "YYYY-MM-DD" to integer days
    from datetime import datetime, timedelta

    def to_daynum(date_str):
        return (datetime.strptime(date_str, "%Y-%m-%d") - datetime(1970, 1, 1)).days

    # Find max streak per customer
    max_streak = 0
    customer_to_streak = dict()

    for customer, dates in customer_dates.items():
        # Sort days as integer for easy comparison
        day_nums = sorted(to_daynum(d) for d in dates)
        streak = 1
        longest = 1
        for i in range(1, len(day_nums)):
            if day_nums[i] == day_nums[i-1] + 1:
                streak += 1
            else:
                streak = 1
            longest = max(longest, streak)
        customer_to_streak[customer] = longest
        max_streak = max(max_streak, longest)

    # Find all customers with the max_streak
    result = [cid for cid, s in customer_to_streak.items() if s == max_streak]
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of transactions.  
  - Each customer's dates are sorted (for k dates per customer, sorting takes O(k log k)), but total sum of all customer transactions is n, so total sorting cost across all customers is O(n log n).
  - The streak finding loop is O(n) overall.
- **Space Complexity:** O(n), to store unique dates per customer and the per-customer streak mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of transactions efficiently?  
  *Hint: Think about pre-sorting, streaming the data, and external storage if customer count is huge.*

- How could you adapt this for streaming transactions (real-time updates rather than static input)?  
  *Hint: Incremental updating of streaks as new transactions arrive.*

- What if the requirement changed to "at least K consecutive days", rather than *maximum* days?  
  *Hint: Modify the streak measuring logic to count all customers exceeding K.*

### Summary
This problem is a classic **sliding window / sequence streak** recognition problem that relies on sorting and scanning per group (per customer).  
Patterns used: grouping, sorting, and simple streak traversal—common in sequence processing and log/data analysis.  
Approach is widely reusable anywhere you need to compute consecutive streaks in event timelines per user/entity.