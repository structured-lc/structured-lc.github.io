### Leetcode 1843 (Medium): Suspicious Bank Accounts [Practice](https://leetcode.com/problems/suspicious-bank-accounts)

### Description  
Given two tables, **Accounts** (with `account_id`, `max_income`) and **Transactions** (with `transaction_id`, `account_id`, `type` ['Creditor', 'Debtor'], `amount`, and `day`), report the IDs of all **suspicious** bank accounts.

A bank account is **suspicious** if its **total income** (sum of all 'Creditor' type transactions) exceeds `max_income` in **two or more consecutive months**.

Write an SQL query (or algorithm) to find such accounts.

### Examples  

**Example 1:**  
Input:  
Accounts =  
```
| account_id | max_income |
|------------|------------|
|      1     |   5000     |
|      2     |   6000     |
```
Transactions =  
```
| transaction_id | account_id | type      | amount | day        |
|----------------|------------|-----------|--------|------------|
|       100      |     1      | Creditor  | 3000   | 2023-07-01 |
|       101      |     1      | Creditor  | 2500   | 2023-07-15 |
|       102      |     2      | Creditor  | 5000   | 2023-07-01 |
|       103      |     2      | Creditor  | 1500   | 2023-08-01 |
|       104      |     1      | Creditor  | 5100   | 2023-08-01 |
|       105      |     1      | Debtor    | 1000   | 2023-08-02 |
```
Output: `1`  
*Explanation: account 1 exceeds max_income in July (3000+2500 = 5500 > 5000) and August (5100 > 5000), and these are consecutive months, so account 1 is suspicious.*

**Example 2:**  
Input: see above, if in Transactions, all 'Creditor' income per month ≤ max_income  
Output: (empty)  
*Explanation: If no account exceeds max_income two consecutive months, return nothing.*

**Example 3:**  
Input:  
Only one month exceeds for an account.  
Output: (empty)  
*Explanation: Exceeding only in a single month or in non-consecutive months does **not** make the account suspicious.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each account, group the transactions by month, sum the 'Creditor' amounts, check if any month's total exceeds max_income. Track months; check if it happens in two (or more) consecutive months.
- Optimization:  
  - Use SQL or a map to summarize monthly incomes for each account.
  - Mark months where sum exceeds max_income.
  - Sort months, check for at least one pair of consecutive 'exceeded' months.  
  - Return those account_id's.
- This is basically "find accounts with at least two consecutive months where monthly income > max_income". The main trick is grouping by month and checking consecutiveness.

### Corner cases to consider  
- Account never has a 'Creditor' transaction.
- Transactions only in one month.
- Exceeding max_income in non-consecutive months (should **not** count).
- Month represented as different string formats (always standardize to 'YYYYMM' or similar).
- Accounts with max_income = 0 or lots of months with only 'Debtor'.
- Multiple accounts; some meet, some don't.
- Year boundary: Dec-Jan is consecutive months (only if year increments by 1).
- Months with no transactions (must be skipped).

### Solution

```python
from collections import defaultdict

def suspiciousBankAccounts(accounts, transactions):
    # Build account_id to max_income mapping
    max_income_map = {}
    for account_id, max_income in accounts:
        max_income_map[account_id] = max_income

    # For each account, store income per month (YYYYMM -> total)
    income = defaultdict(lambda: defaultdict(int))
    for txn_id, acc_id, ttype, amount, day in transactions:
        if ttype == 'Creditor':
            # Extract month as integer YYYYMM
            year, month, *_ = map(int, day.split('-'))
            ym = year * 100 + month
            income[acc_id][ym] += amount

    suspicious_accounts = set()

    for acc_id in income:
        # Extract max_income for this account
        max_income = max_income_map[acc_id]
        # Find all months where income exceeds max_income
        months_exceeded = [month for month, total in income[acc_id].items() if total > max_income]
        # Sort months to detect consecutiveness
        months_exceeded.sort()
        count = 0
        for i in range(1, len(months_exceeded)):
            # If two months are consecutive, i.e., year and month difference is 1
            prev = months_exceeded[i-1]
            curr = months_exceeded[i]
            # Check for consecutive month: 
            prev_y, prev_m = divmod(prev, 100)
            curr_y, curr_m = divmod(curr, 100)
            # handle December to January
            is_consecutive = (curr_y == prev_y and curr_m == prev_m+1) or (curr_y == prev_y+1 and prev_m == 12 and curr_m == 1)
            if is_consecutive:
                suspicious_accounts.add(acc_id)
                break  # Only need to find one pair

    return sorted(suspicious_accounts)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M log M), where N = number of transactions, M = number of (months \* accounts). Each account's months list is sorted, and each transaction is processed once.
- **Space Complexity:** O(M), for storing monthly income mapping (accounts × months).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large datasets that don't fit in memory?  
  *Hint: Is it possible to stream or chunk by account, or use a DB?*

- What if months are not always continuous or there are missing months?  
  *Hint: Does it affect your 'consecutive months' logic? (Year boundaries?)*

- How would you extend this logic to suspicious windows of 3 or more consecutive months?  
  *Hint: Sliding window over the months where the income exceeded max_income.*

### Summary
This problem uses the **group by** pattern and a consecutive sequence detection in time-series per group. It's a classic use case for SQL window functions or aggregations with maps/dictionaries. The consecutive months logic generalizes to rolling windows (n months) or other anomaly-detection in time-series datasets grouped by IDs.


### Flashcard
For each account, sum monthly credits, mark months over max_income, check for ≥2 consecutive flagged months.

### Tags
Database(#database)

### Similar Problems
