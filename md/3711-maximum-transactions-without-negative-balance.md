### Leetcode 3711 (Medium): Maximum Transactions Without Negative Balance [Practice](https://leetcode.com/problems/maximum-transactions-without-negative-balance)

### Description  
You are given an array of transactions, where each element represents the change to an account balance after a transaction (positive for deposit, negative for withdrawal, zero for neutral). Execute transactions in order but can skip any of them. Return the **maximum number of transactions** you can include **without ever making the running balance negative** at any point.

You must process transactions in order—skipping is allowed but you can't reorder. The initial balance is zero.

### Examples  

**Example 1:**  
Input: `transactions = [3, -2, 2, -1]`  
Output: `4`  
Explanation: All can be processed.  
0 → 3 → 1 → 3 → 2 (never negative).

**Example 2:**  
Input: `transactions = [-1, -1, 3, 1, -1]`  
Output: `4`  
Explanation: Must skip the first transaction:
- Skip -1. Start at 0, take second -1: 0 → -1 (would be negative, can't).
- Instead, skip first, take -1: 0 → 0 (skip, stay at 0),
- Take 3: 0 → 3, take 1: 3 → 4, take -1: 4 → 3.
- One possible set: [3, 1, -1, -1] (in input order, but not all picked). Four transactions total.

**Example 3:**  
Input: `transactions = [1, -2, -3, 4]`  
Output: `3`  
Explanation: Several possible choices, e.g. pick [1, 4, -2] or [1, 4, -3]. If you try all, you get negative at some point.
 
### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all subsets in order (2ⁿ possibilities). For each, simulate the running balance and count the number of transactions if the balance stays non-negative. Too slow, exponential.
- **DP Optimization:**  
  Let’s use dynamic programming:  
  - `dp[i][b]`: process up to i-th transaction, current balance b, what's the max number of transactions.
  - But `b` can be large (no cap on balance), so that's infeasible.
- **Greedy + Heap:**  
  Instead, always add deposits and withdrawals greedily, but if a withdrawal causes negative, we might try to replace a "worst withdrawal" processed so far.  
  - Maintain a min-heap of withdrawals taken.
  - If a negative balance occurs, replace the largest withdrawal taken so far with the current, smaller withdrawal, if possible.
  - Each replacement makes balance less negative.
  - Intuition: Always skip the largest negative processed so far if you must skip anyone.
- **Rationale:**  
  This is similar to the classic "maximize the number of non-overlapping intervals" or "lecture schedule with constraints" greedy pattern. The heap gives efficiency.

### Corner cases to consider  
- Empty transactions array: output is 0.
- All positive: pick all.
- All negative: only 0 can be picked.
- Transactions sum less than 0, but when picked selectively, result in non-negative at all points.
- Large negative followed by large positive: Only positive can make up for earlier deficit.
- Transactions at 0 do not affect balance but do count.
- Skipping in the middle/anywhere.

### Solution

```python
import heapq

def max_transactions_without_negative_balance(transactions):
    # Current running balance, initialized to 0
    balance = 0
    # Number of included transactions
    count = 0
    # Min-heap to keep the negative (withdrawal) transactions we've accepted
    min_heap = []
    
    for t in transactions:
        balance += t
        count += 1
        # If t is negative, add to heap
        if t < 0:
            heapq.heappush(min_heap, t)
        # If the balance ever goes negative, we must "skip" one negative transaction:
        while balance < 0 and min_heap:
            # Pop the biggest negative (smallest abs value) we took so far
            worst = heapq.heappop(min_heap)
            balance -= worst  # Remove its effect (balance increases)
            count -= 1        # As if we skipped this transaction
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n), where n is the number of transactions.  
  Looping through transactions is O(n); each heap push/pop is O(log n), worst-case all are negatives.
- **Space Complexity:**  
  O(n) — in the worst case, all transactions are negative and in the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- If the **initial balance is not zero**, how would you modify your approach?  
  *Hint: Change the starting value of balance from 0 to the given.*

- How do you recover the actual list of **included transactions**?  
  *Hint: Keep track of which indices are included vs. popped from the heap.*

- If **each transaction can only be skipped at most once overall** (no two skips of same type), what changes?  
  *Hint: Now you may need to keep occurrence counts or indices.*

### Summary
This problem uses a **greedy with min-heap** approach, choosing withdrawals optimally to maximize accepted transactions while maintaining a non-negative running total at each step. It's a variant on greedy scheduling/sequence problems (see "Subarray Sum ≥ K", longest valid parentheses, or "scheduling lectures with capacity"). Patterns like this (greedy, skip/replace worst-so-far) appear in interval scheduling, maximizing elements under running sum constraints, and problems involving subarray or sequence with monotonic conditions.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Make the Prefix Sum Non-negative(make-the-prefix-sum-non-negative) (Medium)