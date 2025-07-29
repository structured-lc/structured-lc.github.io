### Leetcode 1205 (Medium): Monthly Transactions II [Practice](https://leetcode.com/problems/monthly-transactions-ii)

### Description  
Given two tables, **Transactions** and **Chargebacks**, find for each month and country:
- the number and total amount of "approved" transactions,
- the number and total amount of chargebacks,
showing all month-country pairs where either occurs.

- The **Transactions** table provides transaction `id`, `country`, `state` ("approved"/"declined"), `amount`, and `trans_date`.
- The **Chargebacks** table lists chargebacks with `trans_id` (refers to Transactions.id) and `charge_date`.

Return, per (month, country):
- `month` (YYYY-MM)
- `country`
- `approved_count` (#approved transactions in that month and country)
- `approved_amount` (total for above)
- `chargeback_count` (#of chargebacks with charge_date in that month and country matching the original transaction country)
- `chargeback_amount` (sum of corresponding chargebacked transaction's amount)

If a month-country has chargebacks but no approved transactions (or vice versa), counts/amounts should be zero.

### Examples  

**Example 1:**  
Input:  
Transactions=
```
+-----+---------+----------+--------+------------+
| id  | country | state    | amount | trans_date |
+-----+---------+----------+--------+------------+
| 101 | US      | approved | 1000   | 2019-05-18 |
| 102 | US      | declined | 2000   | 2019-05-19 |
| 103 | US      | approved | 3000   | 2019-06-10 |
| 104 | US      | declined | 4000   | 2019-06-13 |
| 105 | US      | approved | 5000   | 2019-06-15 |
+-----+---------+----------+--------+------------+
```

Chargebacks=
```
+----------+------------+
| trans_id | charge_date|
+----------+------------+
| 102      | 2019-05-29 |
| 101      | 2019-06-30 |
| 105      | 2019-09-18 |
+----------+------------+
```

Output=
```
+---------+---------+----------------+-----------------+------------------+-------------------+
| month   | country | approved_count | approved_amount | chargeback_count | chargeback_amount |
+---------+---------+----------------+-----------------+------------------+-------------------+
| 2019-05 | US      | 1              | 1000            | 1                | 2000              |
| 2019-06 | US      | 2              | 8000            | 1                | 1000              |
| 2019-09 | US      | 0              | 0               | 1                | 5000              |
+---------+---------+----------------+-----------------+------------------+-------------------+
```
*Explanation: We group by year-month on date fields, and for each country, summarize both tables. June has 2 approveds (103, 105, totaling 8000), and a chargeback (101's amount, charged back in June).*

**Example 2:**  
Input:  
Transactions=
```
+-----+---------+----------+--------+------------+
| id  | country | state    | amount | trans_date |
+-----+---------+----------+--------+------------+
| 1   | US      | approved | 500    | 2020-01-03 |
+-----+---------+----------+--------+------------+
```
Chargebacks=
```
(empty)
```
Output=
```
+---------+---------+----------------+-----------------+------------------+-------------------+
| month   | country | approved_count | approved_amount | chargeback_count | chargeback_amount |
+---------+---------+----------------+-----------------+------------------+-------------------+
| 2020-01 | US      | 1              | 500             | 0                | 0                 |
+---------+---------+----------------+-----------------+------------------+-------------------+
```
*Explanation: Only approved transaction exists, no chargebacks.*

**Example 3:**  
Input:  
Transactions=
```
+-----+---------+----------+--------+------------+
| id  | country | state    | amount | trans_date |
+-----+---------+----------+--------+------------+
(empty)
```
Chargebacks=
```
+----------+------------+
| trans_id | charge_date|
+----------+------------+
| 999      | 2021-01-01 |
+----------+------------+
```
Output=
```
+---------+---------+----------------+-----------------+------------------+-------------------+
| month   | country | approved_count | approved_amount | chargeback_count | chargeback_amount |
+---------+---------+----------------+-----------------+------------------+-------------------+
| 2021-01 | <null>  | 0              | 0               | 1                | 0                 |
+---------+---------+----------------+-----------------+------------------+-------------------+
```
*Explanation: No transaction, but chargeback against unlisted transaction; country is unknown (could be output null or skip, depending on spec).*

### Thought Process (as if you’re the interviewee)  
- Start by **summarizing approved transactions** per (month, country):  
  - For each approved transaction, extract the month as yyyy-mm, group by month and country, count and sum amounts.

- Then **summarize chargebacks** per (month, country):  
  - For each chargeback, join back to Transactions (to get the country, amount), extract charge_date’s month, group by month and transaction country, count and sum.

- Now, combine both per (month, country):
  - Use **FULL OUTER JOIN** on (month, country) to get pairs present in either (since a month-country can have only approvals, only chargebacks, or both).
  - Nulls in number fields should be zero.

- **Why final approach?**
  - Brute-force: Keep two lookups, but output all month-country pairs.
  - Optimized: SQL with CTEs, grouping, FULL OUTER JOIN.
  - Trade-off: FULL OUTER JOIN is not always efficient, but required for completeness.

### Corner cases to consider  
- No chargebacks for a month-country (count, amount = 0)
- No approved transactions for a month-country (count, amount = 0)
- Multiple transactions with same month/country
- Chargebacks for transactions that do not exist (should not happen, but possible)
- Months or countries missing in either table
- Empty Transactions or Chargebacks table
- Countries with differing case/spelling (should group exactly by value)

### Solution

```python
# This is a SQL problem, but if asked in Python: 
# Imagine we are passed the transactions and chargebacks as lists of dicts.

from collections import defaultdict
from datetime import datetime

def monthly_transactions(transactions, chargebacks):
    # step 1: Approved transaction stats grouped by (month, country)
    approved = defaultdict(lambda: [0, 0])  # (approved_count, approved_amount)
    for t in transactions:
        if t['state'] == 'approved':
            month = t['trans_date'][:7]  # 'yyyy-mm'
            key = (month, t['country'])
            approved[key][0] += 1
            approved[key][1] += t['amount']
    
    # step 2: Chargeback stats grouped by (month, country)
    # Need transaction info for chargebacks
    id_to_trans = {t['id']: t for t in transactions}
    chargeback = defaultdict(lambda: [0, 0])  # (chargeback_count, chargeback_amount)
    for c in chargebacks:
        trans = id_to_trans.get(c['trans_id'])
        if not trans:
            continue  # ignoring chargeback to non-existent transaction
        month = c['charge_date'][:7]
        key = (month, trans['country'])
        chargeback[key][0] += 1
        chargeback[key][1] += trans['amount']
    
    # step 3: Union of all month-country keys
    all_keys = set(approved.keys()) | set(chargeback.keys())
    result = []
    for key in sorted(all_keys):
        month, country = key
        a_count, a_amt = approved.get(key, (0, 0))
        c_count, c_amt = chargeback.get(key, (0, 0))
        row = {
            "month": month,
            "country": country,
            "approved_count": a_count,
            "approved_amount": a_amt,
            "chargeback_count": c_count,
            "chargeback_amount": c_amt
        }
        result.append(row)
    return result

# Example usage:
transactions = [
    {"id": 101, "country": "US", "state": "approved", "amount": 1000, "trans_date": "2019-05-18"},
    {"id": 102, "country": "US", "state": "declined", "amount": 2000, "trans_date": "2019-05-19"},
    {"id": 103, "country": "US", "state": "approved", "amount": 3000, "trans_date": "2019-06-10"},
    {"id": 104, "country": "US", "state": "declined", "amount": 4000, "trans_date": "2019-06-13"},
    {"id": 105, "country": "US", "state": "approved", "amount": 5000, "trans_date": "2019-06-15"},
]
chargebacks = [
    {"trans_id": 102, "charge_date": "2019-05-29"},
    {"trans_id": 101, "charge_date": "2019-06-30"},
    {"trans_id": 105, "charge_date": "2019-09-18"},
]
print(monthly_transactions(transactions, chargebacks))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = #transactions, M = #chargebacks. Each input iterated in O(1) for search and aggregation due to hashmap.
- **Space Complexity:** O(K), where K = unique (month, country) pairs (could be up to N+M in degenerate case). Plus O(N) for the lookup map of transactions.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle chargebacks for missing transaction ids?
  *Hint: What if the data is dirty or incomplete? Should they be skipped, counted separately, or marked as unknown?*

- How to extend this for other transaction states? Or for daily (not monthly) aggregation?
  *Hint: Change the groupings and logic for flexible state handling.*

- How would you implement this efficiently in SQL if FULL OUTER JOIN is not supported?
  *Hint: Use UNION of LEFT and RIGHT JOINs, or simulate.*

### Summary
This problem is a classic example of **group-by aggregation and multi-table joins**, requiring a union of grouped statistics across two related tables and outputting all possible groups (even those present in only one source). The solution uses **hash maps/dictionaries** for O(1) aggregation and ensures every relevant (month, country) is output. The pattern is common in reporting, analytics, and data engineering, especially when blending transactional and event (chargeback) data. Similar SQL patterns include CTEs and FULL OUTER JOIN for combining summaries.