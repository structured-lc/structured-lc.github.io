### Leetcode 2412 (Hard): Minimum Money Required Before Transactions [Practice](https://leetcode.com/problems/minimum-money-required-before-transactions)

### Description  
You are given a list of transactions, where each transaction is represented by two integers `[cost, cashback]`. To perform a transaction, you must have at least `cost` money before starting it. After the transaction, you receive `cashback`, so your new balance is `money - cost + cashback`. The challenge is to determine the minimum amount of money you need before all transactions start so that, **no matter the order**, you can complete all transactions.

### Examples  

**Example 1:**  
Input: `transactions = [[2,1],[5,0],[4,2]]`  
Output: `10`  
*Explanation: Try doing the transactions in the order [2,1], [5,0], [4,2]:  
- Start with 10. After (2,1): 10-2+1=9  
- After (5,0): 9-5+0=4  
- After (4,2): 4-4+2=2  
If you start with less than 10, there's some order of transactions where you can't finish.*

**Example 2:**  
Input: `transactions = [[3,0],[0,3]]`  
Output: `3`  
*Explanation:  
- If you do [3,0] then [0,3], you need 3 upfront.  
- If you do [0,3] first, then [3,0], after the first you get 3, so you can do the second.  
With 3 upfront, any order is possible.*

**Example 3:**  
Input: `transactions = [[5,0]]`  
Output: `5`  
*Explanation: Only one transaction. Need at least 5 to start, after the transaction have 0 left.*

### Thought Process (as if you’re the interviewee)  
- Start by thinking about simulating every transaction order (brute-force). However, with up to 10⁵ transactions, this is impossible.
- Need a strategy that works for **any** transaction order.
- Notice that transactions with `cost > cashback` reduce your overall money, while `cost ≤ cashback` don’t decrease it even if done first or last.
- For `cost > cashback` transactions: If you do all such transactions first, you face the biggest risk, since each will decrease your money.
- The sum of all `(cost - cashback)` for transactions where `cost > cashback` is the minimum "loss" you might have to bear at any point.
- But if you’re forced to end with one of these "lossy" transactions (e.g., it needs the highest `cost` needed at once), you must account for not having the cashback yet.
- For "safe" transactions (`cost ≤ cashback`), the required upfront is less critical: you never dip below starting amount.
- Optimal answer = sum of losses (from lossy transactions) + the largest among:
    - the cashback from a lossy transaction, or
    - the cost from a safe transaction.
- We must check every transaction as the last one and guarantee the starting money handles this case.

### Corner cases to consider  
- Single transaction (either profit or loss).
- All transactions have `cost ≤ cashback` (no net loss).
- All transactions have `cost > cashback`.
- Zero-cost transactions.
- Large input sizes (must be O(n)).

### Solution

```python
def minimumMoney(transactions):
    # s: total sum of (cost - cashback) for cost > cashback 
    total_loss = 0
    # max_cost: maximum money needed at once (see below)
    max_needed = 0

    for cost, cashback in transactions:
        if cost > cashback:
            total_loss += (cost - cashback)

    for cost, cashback in transactions:
        if cost > cashback:
            # If this 'lossy' transaction goes last, need total_loss + cashback
            max_needed = max(max_needed, total_loss + cashback)
        else:
            # If this 'safe' transaction goes last, need total_loss + cost
            max_needed = max(max_needed, total_loss + cost)

    return max_needed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we make two passes over the transactions list.
- **Space Complexity:** O(1), only a few variables for sums and max; no extra data structures scaled with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you change if the order of transactions was fixed?
  *Hint: Can simulate directly, maintaining current money after each transaction.*

- How would you solve this if negative cashback was allowed?
  *Hint: Consider what happens with cashback < 0: must still guarantee never go below 0 at any transaction.*

- Can you reconstruct an order of transactions that attains the minimum starting money?
  *Hint: Try putting all 'lossy' transactions first, then the others.*

### Summary
This problem is a classic **greedy + simulation** challenge but optimized by careful analysis of the worst-case order. The pattern of splitting the input into two categories (lossy and safe) and accounting for the worst “last transaction” is useful in **interval covering** and **greedy minimization** problems. The approach is systematic, efficient, and commonly transferable to scenarios where you face resource consumption with both recoverable and non-recoverable steps.