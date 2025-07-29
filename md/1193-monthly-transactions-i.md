### Leetcode 1193 (Medium): Monthly Transactions I [Practice](https://leetcode.com/problems/monthly-transactions-i)

### Description  
Given a table of transactions with columns:  
- `id` (INT): the transaction ID  
- `country` (VARCHAR): country where the transaction happened  
- `state` (VARCHAR): either 'approved' or 'declined'  
- `amount` (INT): the transaction's amount  
- `trans_date` (DATE): when the transaction occurred  

For each **(month, country)** pair, report:  
- The month in 'YYYY-MM' format  
- The country  
- The total number of transactions  
- The number of approved transactions  
- Total amount for all transactions  
- Total amount for approved transactions  

**Output table** should have columns:  
- month, country, trans_count, approved_count, trans_total_amount, approved_total_amount  

The output can be in any order.

### Examples  

**Example 1:**  
Input:  
```
+-----+---------+---------+--------+------------+
| id  | country | state   | amount | trans_date |
+-----+---------+---------+--------+------------+
| 1   | US      | approved| 1000   | 2019-05-18 |
| 2   | US      | declined| 2000   | 2019-05-19 |
| 3   | US      | approved| 2000   | 2019-06-23 |
| 4   | DE      | approved| 2000   | 2019-06-23 |
| 5   | US      | approved| 2000   | 2019-06-10 |
+-----+---------+---------+--------+------------+
```
Output:  
```
+-------+---------+-------------+----------------+---------------------+----------------------+
| month | country |trans_count  |approved_count  |trans_total_amount   |approved_total_amount |
+-------+---------+-------------+----------------+---------------------+----------------------+
|2019-05| US      |      2      |       1        |        3000         |      1000            |
|2019-06| US      |      2      |       2        |        4000         |      4000            |
|2019-06| DE      |      1      |       1        |        2000         |      2000            |
+-------+---------+-------------+----------------+---------------------+----------------------+
```
*Explanation: For 2019-05 and US, there are 2 transactions (1 approved), total amount = 1000+2000=3000, and approved total = 1000. For 2019-06/US, both are approved, so the sub-totals reflect that.*

**Example 2:**  
Input:  
```
+-----+---------+---------+--------+------------+
| id  | country | state   | amount | trans_date |
+-----+---------+---------+--------+------------+
| 10  | FR      | declined|  500   | 2021-07-10 |
+-----+---------+---------+--------+------------+
```
Output:  
```
+-------+---------+-------------+----------------+---------------------+----------------------+
| month | country |trans_count  |approved_count  |trans_total_amount   |approved_total_amount |
+-------+---------+-------------+----------------+---------------------+----------------------+
|2021-07|  FR     |     1       |      0         |      500            |        0             |
+-------+---------+-------------+----------------+---------------------+----------------------+
```
*Explanation: Single transaction, but not approved.*

**Example 3:**  
Input:  
```
(empty table)
```
Output:  
```
(empty result)
```
*Explanation: No transactions, so output is empty.*

### Thought Process (as if you’re the interviewee)  
- First, for each row, extract the month from `trans_date` in 'YYYY-MM' format.  
- We need to **group by** month and country, and compute aggregate values:
  - Total number of transactions (count)
  - Approved count: count rows where state is 'approved'
  - Total amounts: sum amounts
  - Approved amount: sum(amount) where state is 'approved'
- The brute-force way would be to scan the rows and for each (month, country) maintain counters.
- In SQL, it's straightforward with `GROUP BY`, using `COUNT(*)` and `SUM(CASE WHEN ...)`.
- The main trick is formatting dates and filtering conditionally for 'approved'.

### Corner cases to consider  
- Transaction table empty  
- All transactions declined (approved count and amount should be zero)  
- All in one month/country  
- Multiple countries in one month  
- Amounts are zero  
- Only 'approved' or only 'declined' records in a group

### Solution

```python
# Since this is a SQL-style aggregation, let's imagine how it would be done in Python:

from collections import defaultdict
from datetime import datetime

def monthly_transactions(transactions):
    # transactions: list of dicts, each dict with keys: id, country, state, amount, trans_date
    result = defaultdict(lambda: {
        "trans_count": 0,
        "approved_count": 0,
        "trans_total_amount": 0,
        "approved_total_amount": 0
    })
    
    for tx in transactions:
        # Extract year-month
        month = datetime.strptime(tx["trans_date"], "%Y-%m-%d").strftime("%Y-%m")
        country = tx["country"]
        key = (month, country)
        
        result[key]["trans_count"] += 1
        result[key]["trans_total_amount"] += tx["amount"]
        if tx["state"] == "approved":
            result[key]["approved_count"] += 1
            result[key]["approved_total_amount"] += tx["amount"]
    
    # Convert result to the requested output format
    output = []
    for (month, country), stats in result.items():
        output.append({
            "month": month,
            "country": country,
            "trans_count": stats["trans_count"],
            "approved_count": stats["approved_count"],
            "trans_total_amount": stats["trans_total_amount"],
            "approved_total_amount": stats["approved_total_amount"]
        })
    
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of transactions, since we process each row once.
- **Space Complexity:** O(m), where m is the number of unique (month, country) pairs—each stored as an entry in the aggregation.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle time zones or different date formats?  
  *Hint: Consider cleaning or standardizing dates before aggregation.*

- What if more transaction states are introduced?  
  *Hint: Your logic assumes state is only 'approved' or 'declined'. Think of schema changes.*

- Could this be efficiently done if the data was much larger, say billions of rows?  
  *Hint: Discuss indexing, distributed processing, or incremental aggregation.*

### Summary
This problem leverages the **group by and conditional aggregation** pattern, very common in data analysis and SQL. The same approach can be applied for sales reports, user activity summaries, or any time-series+category breakdown scenario. This is a fundamental analytics pattern seen across data engineering and reporting tasks.