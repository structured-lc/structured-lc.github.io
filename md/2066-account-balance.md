### Leetcode 2066 (Medium): Account Balance [Practice](https://leetcode.com/problems/account-balance)

### Description  
Given a table of user transactions with columns: `account_id`, `day`, `type` (either `'Deposit'` or `'Withdraw'`), and `amount`, report the **balance of each user after each transaction**.  
Assume every account starts with a balance of 0, and the balance never drops below 0 after a transaction.  
Return the results ordered by `account_id` and `day`.

### Examples  

**Example 1:**  
Input:  
Transactions table:  
| account_id | day | type      | amount |
|------------|-----|-----------|--------|
| 1          | 1   | Deposit   | 100    |
| 1          | 2   | Withdraw  | 50     |
| 1          | 3   | Withdraw  | 20     |
| 2          | 1   | Deposit   | 200    |

Output:  
| account_id | day | balance |
|------------|-----|---------|
| 1          | 1   | 100     |
| 1          | 2   | 50      |
| 1          | 3   | 30      |
| 2          | 1   | 200     |

*Explanation:  
- Account 1: After day 1, 100 (deposit 100); after day 2, 50 (withdraw 50); after day 3, 30 (withdraw 20)  
- Account 2: After day 1, 200 (deposit 200)*

**Example 2:**  
Input:  
Transactions table:  
| account_id | day | type      | amount |
|------------|-----|-----------|--------|
| 1          | 1   | Deposit   | 20     |
| 1          | 2   | Deposit   | 10     |
| 1          | 3   | Withdraw  | 5      |

Output:  
| account_id | day | balance |
|------------|-----|---------|
| 1          | 1   | 20      |
| 1          | 2   | 30      |
| 1          | 3   | 25      |

*Explanation:  
- Add and subtract running deposit/withdrawal per transaction, per account, ordered by day.*

**Example 3:**  
Input:  
Transactions table:  
| account_id | day | type      | amount |
|------------|-----|-----------|--------|
| 5          | 10  | Deposit   | 200    |

Output:  
| account_id | day | balance |
|------------|-----|---------|
| 5          | 10  | 200     |

*Explanation:  
- Only one transaction, so balance is simply the deposit on that day.*

### Thought Process (as if you’re the interviewee)  

- At first look, the question requires **calculating a running sum** for each user's transactions, applying `+amount` for deposits and `-amount` for withdrawals, sorted by day.
- **Brute-force idea:** For each row, manually sum all previous transactions for the same account up to and including the current row. Nested queries or iteration would be needed; this would be very inefficient (O(n²) if implemented naively).
- **Optimized:** Use a **window (running/cumulative sum)**, partitioned by `account_id` and ordered by `day`. For each transaction, treat ‘Deposit’ as `+amount` and ‘Withdraw’ as `-amount` to get the running balance after each transaction.
- SQL supports window functions like `SUM(...) OVER (PARTITION BY account_id ORDER BY day ...)`, which efficiently solves this in a single scan.
- The choice: use the window function for efficiency and clarity.

### Corner cases to consider  
- No transactions for an account (should not appear in output)
- Multiple transactions by the same user on the same day (require clear rules for ordering, possibly tie-breaker by unique transaction id if present)
- Only withdrawals (should never go below 0, but per prompt that does not happen)
- Sequence of deposits and withdrawals that brings the balance back to 0
- Large number of users and transactions (test performance)
- Only one account

### Solution

```python
# This is a SQL-based LeetCode problem, but let's translate the logic to Python for interview prep

from collections import defaultdict

def account_balance(transactions):
    # transactions: List of dictionaries with keys: account_id, day, type, amount
    # Sort by account_id, then by day
    transactions.sort(key=lambda x: (x['account_id'], x['day']))
    # Collect running balances per account
    result = []
    balances = defaultdict(int)
    for tx in transactions:
        acc = tx['account_id']
        day = tx['day']
        amt = tx['amount'] if tx['type'] == 'Deposit' else -tx['amount']
        balances[acc] += amt
        result.append({
            'account_id': acc,
            'day': day,
            'balance': balances[acc]
        })
    return result

# Example usage:
transactions = [
    {'account_id': 1, 'day': 1, 'type': 'Deposit', 'amount': 100},
    {'account_id': 1, 'day': 2, 'type': 'Withdraw', 'amount': 50},
    {'account_id': 1, 'day': 3, 'type': 'Withdraw', 'amount': 20},
    {'account_id': 2, 'day': 1, 'type': 'Deposit', 'amount': 200}
]
print(account_balance(transactions))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting transactions; O(n) to process each transaction. So, overall O(n log n).
- **Space Complexity:** O(n) for the result list; O(k) for where k is the number of accounts (for balances tracking).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to return only the final balance for each account?
  *Hint: You only need the last transaction per account, or accumulate in a single pass without tracking per-transaction state.*

- How would you handle transactions that could bring the balance below 0?
  *Hint: Check balance before applying withdrawal; reject or adjust transaction as per rule.*

- How would you handle very large data sets, possibly in distributed systems?
  *Hint: Consider partitioning logic, distributed aggregate computation, or batch/stream solutions.*

### Summary
This problem is a classic use-case for the **running sum/cumulative sum pattern** via window functions (in SQL) or prefix sums (in Python).  
Common in financial, log, or ledger problems, this approach efficiently tracks real-time state after ordered events.  
The solution pattern applies broadly to any scenario where a running total—partitioned/grouped and sorted—is required.


### Flashcard
Calculate running sums for each user's transactions efficiently.

### Tags
Database(#database)

### Similar Problems
