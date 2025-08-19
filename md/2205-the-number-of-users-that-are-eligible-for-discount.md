### Leetcode 2205 (Easy): The Number of Users That Are Eligible for Discount [Practice](https://leetcode.com/problems/the-number-of-users-that-are-eligible-for-discount)

### Description  
Given a table of purchases (columns: user_id, time_stamp, amount), determine how many **unique users** are eligible for a discount.  
A user is **eligible** if they made at least one purchase:
- During a specific **time window** `[startDate, endDate]` (inclusive),  
- With an **amount** greater than or equal to `minAmount`.

Your task: Given the parameters `startDate`, `endDate`, and `minAmount`, count the number of users who qualify.

### Examples  

**Example 1:**  
Input:  
Purchases table:  
```
+---------+---------------------+--------+
| user_id | time_stamp          | amount |
+---------+---------------------+--------+
|    1    | 2022-04-20 09:03:00 |  4416 |
|    2    | 2022-03-19 19:24:02 |   678 |
|    3    | 2022-03-18 12:03:09 |  4523 |
|    3    | 2022-03-30 09:43:42 |   626 |
+---------+---------------------+--------+
```
startDate = `2022-03-08`, endDate = `2022-03-20`, minAmount = `1000`  
Output: `1`  
*Explanation:*
- User 1: Purchase is outside the date range.
- User 2: In range but amount is too low.
- User 3: Has a qualifying purchase (`2022-03-18`, amount `4523`).

**Example 2:**  
Input:  
Purchases table:  
```
+---------+---------------------+--------+
| user_id | time_stamp          | amount |
+---------+---------------------+--------+
|    4    | 2023-01-12 08:16:10 | 2000  |
|    5    | 2023-01-19 15:00:00 | 500   |
|    4    | 2023-01-23 18:00:00 | 1500  |
+---------+---------------------+--------+
```
startDate = `2023-01-10`, endDate = `2023-01-20`, minAmount = `1500`  
Output: `1`  
*Explanation:*
- Only user 4 has a qualifying purchase on `2023-01-12` (amount `2000`).

**Example 3:**  
Input:  
Purchases table:  
(empty)  
startDate = `2022-01-01`, endDate = `2022-12-31`, minAmount = `1000`  
Output: `0`  
*Explanation:*
- No purchases made; so no eligible users.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For every user, check all of their purchases.  
  - If at least one purchase is within the time window **and** has an amount ≥ minAmount, mark user as eligible.
  - Count unique eligible users.

- **Efficient approach:**  
  - Iterate through each purchase.
  - Check if the purchase date is within the window and amount ≥ minAmount.
  - Add user_id to a set when the conditions are satisfied, to keep the count unique.
  - At the end, the size of the set will be the answer.

- **Why this approach:**  
  - It’s simple, linear in the number of purchases, and set data structure efficiently eliminates repeated users.

### Corner cases to consider  
- Purchases table is empty
- All purchases out of the date range
- All purchases have amount < minAmount
- Multiple qualifying purchases by the same user (only count user once)
- startDate == endDate (single-day window)
- minAmount = 0 (all purchases in range eligible)
- Same user with only non-qualifying purchases in range

### Solution

```python
from typing import List, Dict
from datetime import datetime

def eligible_user_count(purchases: List[Dict], start_date: str, end_date: str, min_amount: int) -> int:
    # Parse the date range once
    start_dt = datetime.strptime(start_date, '%Y-%m-%d')
    end_dt = datetime.strptime(end_date, '%Y-%m-%d')

    eligible_users = set()
    for purchase in purchases:
        # Parse purchase date
        purchase_dt = datetime.strptime(purchase['time_stamp'], '%Y-%m-%d %H:%M:%S')
        # Check time window and amount
        if start_dt <= purchase_dt <= end_dt and purchase['amount'] >= min_amount:
            eligible_users.add(purchase['user_id'])
    return len(eligible_users)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of purchases (each purchase is processed once).
- **Space Complexity:** O(u), where u = number of unique eligible users (space for the set).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of records efficiently in a database?
  *Hint: (Think about using SQL queries, indexes on time_stamp and amount, and counting DISTINCT user_ids)*

- What if the table is very large and cannot fit in memory?
  *Hint: (Consider streaming data, on-disk processing, or database streaming tools)*

- How would you find which users are eligible, not just how many?
  *Hint: (Return set of user_ids instead of just the count)*

### Summary
This problem is a classic example of using **set data structure** for unique counting and **filtering by conditions**.  
The approach is linear and can be directly mapped to a SQL **SELECT DISTINCT** query, or solved efficiently in code.  
This pattern applies wherever we need to count unique keys subject to specific filters, such as fraud analysis or user segmentation.

### Tags
Database(#database)

### Similar Problems
- Nth Highest Salary(nth-highest-salary) (Medium)
- The Users That Are Eligible for Discount(the-users-that-are-eligible-for-discount) (Easy)