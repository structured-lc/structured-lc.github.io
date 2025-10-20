### Leetcode 1587 (Easy): Bank Account Summary II [Practice](https://leetcode.com/problems/bank-account-summary-ii)

### Description  
Given two tables:  
- **Users(account, name)**: Each user has a unique account.
- **Transactions(trans_id, account, amount, transacted_on)**: Each transaction affects an account (amount may be positive for credits or negative for debits).

Every account starts at balance 0. You need to report the **name** and **balance** for all users whose balance (sum of transaction amounts for their account) is **greater than 10000**.

### Examples  

**Example 1:**  
Input:  
Users =  
| account | name   |
|---------|--------|
| 9001    | Alice  |
| 9002    | Bob    |
| 9003    | Charlie|

Transactions =  
| trans_id | account | amount | transacted_on |
|----------|---------|--------|---------------|
| 1        | 9001    | 7000   | 2020-08-01    |
| 2        | 9001    | 7000   | 2020-09-01    |
| 3        | 9001    | -3000  | 2020-09-02    |
| 4        | 9002    | 10000  | 2020-08-01    |
| 5        | 9003    | 6000   | 2020-08-01    |
Output:  
| name  | balance |
|-------|---------|
| Alice | 11000   |
Explanation:  
- Alice: 7000 + 7000 - 3000 = 11000 (>10000)  
- Bob: 10000 (not >10000)  
- Charlie: 6000 (not >10000)


**Example 2:**  
Input:  
Users =  
| account | name |
|---------|------|
| 1001    | Sam  |
Transactions =  
| trans_id | account | amount | transacted_on |
|----------|---------|--------|---------------|
| 1        | 1001    | 9500   | 2020-08-01    |
| 2        | 1001    | 700    | 2020-09-01    |
Output:  
| name | balance |
|------|---------|
| Sam  | 10200   |
Explanation:  
- Sam: 9500 + 700 = 10200 (>10000)

**Example 3:**  
Input:  
Users =  
| account | name |
|---------|------|
| 2002    | Tom  |
Transactions =  
| trans_id | account | amount | transacted_on |
|----------|---------|--------|---------------|
| 1        | 2002    | 3000   | 2022-01-01    |
| 2        | 2002    | 4000   | 2022-02-01    |
Output:  
| name | balance |
|------|---------|
(no rows)
Explanation:  
- Tom: 3000 + 4000 = 7000 (not >10000), so not included


### Thought Process (as if you’re the interviewee)  
- First, I want to compute each user’s total balance by summing all their transaction amounts grouped by account.
- Then, I join the balances back to the user names using the Users table.
- Finally, I filter to only include users whose balance > 10000.
- This is a classic **aggregate grouping and filtering** task in SQL.
- For implementation, an SQL query can be used to group Transactions by account, SUM the amounts, JOIN on Users.account, and filter using HAVING.

- Brute-force in procedural code: For each user, scan all transactions, sum amounts if account matches, then check the threshold. Not optimal—grouping in SQL is much faster.
- Group-by SQL is optimal. If using Python, I would still use a dict to accumulate sums by account, map back to user, filter, and output.

### Corner cases to consider  
- No users have a balance > 10000 ⇒ should return zero rows.
- Users with no transactions should be ignored (their sum is 0, not >10000).
- Amounts can be negative, leading to less than zero balances.
- Multiple users with the exact same qualifying balance (tie at output).
- Users table contains accounts missing in Transactions ⇒ sum = 0, not included.
- Users with only a single transaction amount >10000.

### Solution

```python
# Assume: users = List[Tuple[int, str]], transactions = List[Tuple[int, int, int, str]]
# users: List of (account, name)
# transactions: List of (trans_id, account, amount, transacted_on)

def bank_account_summary_ii(users, transactions):
    # Create a mapping from account to user name
    account_to_name = {}
    for account, name in users:
        account_to_name[account] = name

    # Accumulate total amount per account
    account_balance = {}
    for _, account, amount, _ in transactions:
        if account in account_balance:
            account_balance[account] += amount
        else:
            account_balance[account] = amount

    # Prepare result: names and balances where balance > 10000
    result = []
    for account, balance in account_balance.items():
        if balance > 10000:
            # map to user name (guaranteed unique account)
            name = account_to_name.get(account)
            if name is not None:
                result.append((name, balance))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = number of users, M = number of transactions.  
  - Building account-to-name: O(N)  
  - Iterating transactions and summing: O(M)  
  - Final filtering: Up to O(N)

- **Space Complexity:** O(N) for account_to_name and O(N) for account_balance (N = number of unique accounts).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties if you needed to order by balance and name?
  *Hint: Discuss order by and lexicographical ordering.*

- What if amount could be float or decimal instead of integer?  
  *Hint: Think about precision and rounding in handling balances.*

- How to efficiently answer this if the data grows very large (millions of transactions and accounts)?  
  *Hint: Consider database indexing, batched aggregation, or streaming approaches.*

### Summary
This is a typical **aggregate and join** database problem.  
It maps to the SQL GROUP BY pattern for sum aggregation, filtering with HAVING, and joining user info. In code, the common pattern is **hash map accumulation** followed by filtering, which is broadly useful for summarizing or reducing data across categories. Variants of this approach apply in many analytics and financial domain tasks.


### Flashcard
Group transactions by account, sum amounts, join with Users, and filter for balances > 10000; classic SQL aggregation.

### Tags
Database(#database)

### Similar Problems
