### Leetcode 465 (Hard): Optimal Account Balancing [Practice](https://leetcode.com/problems/optimal-account-balancing)

### Description

You are given an array of transactions where `transactions[i] = [fromi, toi, amounti]` indicates that `fromi` gave `toi` an amount of `amounti`. Return the minimum number of transactions required to settle all debts.

### Examples

**Example 1:**
Input:
`transactions = [,]`
Output: `2`
*Explanation:*
Person 0 gave person 1 \$10.
Person 2 gave person 0 \$5.
The debts can be settled in two transactions:

- Person 1 pays Person 2 \$5
- Person 1 pays Person 0 \$5

**Example 2:**
Input:
`transactions = [,,,]`
Output: `1`
*Explanation:*
All debts can be settled with a single transaction:

- person 0 pays person 2 \$5


### Thought Process (as if you're the interviewee)

We want to find the minimum number of transactions to settle all debts. First, we calculate each person’s net balance from incoming and outgoing amounts.

Key Observations:

- Only people with non-zero balances need to be involved in transactions.
- Equivalent problem: minimum number of zero-sum partitions of these balances.

Naive DFS would try all combinations, which is too slow. The better idea is to use backtracking and recursively try to cancel debts between people.

### Algorithm

1. Compute the net amount (balance) for each person.
2. Remove people with zero balances (already settled).
3. Use DFS/backtracking to settle balances with minimal number of transactions:
    - At index `start`, try to settle it with later people
    - Skip zeros
    - Prune with early stopping when possible

### Corner Cases to Consider

- All balances are already settled → return 0
- Repeated transactions between people
- Debts perfectly cancel out in smaller groups


### Solution

```python
def minTransfers(transactions):
    from collections import defaultdict

    # Step 1: Calculate net balance for each person
    balance = defaultdict(int)
    for f, t, amt in transactions:
        balance[f] -= amt
        balance[t] += amt

    # Step 2: Filter out zero balances
    debts = [amount for amount in balance.values() if amount != 0]

    def dfs(start):
        # Skip settled balances
        while start < len(debts) and debts[start] == 0:
            start += 1
        if start == len(debts):
            return 0

        min_tx = float('inf')
        for i in range(start + 1, len(debts)):
            if debts[start] * debts[i] < 0:
                # Settle debts[start] with debts[i]
                debts[i] += debts[start]
                min_tx = min(min_tx, 1 + dfs(start + 1))
                debts[i] -= debts[start]  # Backtrack

                # Optimization: skip duplicates
                if debts[i] + debts[start] == 0:
                    break
        
        return min_tx

    return dfs(0)
```


### Time and Space Complexity Analysis

- **Time Complexity:** O(n!) in the worst case where n is number of people with non-zero debts; the algorithm tries all permutations (pruned with pruning).
- **Space Complexity:** O(n) for the `debts` list and recursion stack.


### Potential Follow-Up Questions

- What if you wanted to return the actual list of transactions, not just the count?
*Hint: Record each transaction during DFS and backtrack accordingly.*
- Can you solve this optimally if the data set is large?
*Hint: Use memoization or state caching with bitmasks to reduce redundant search.*
- What if there are fees or interest rates applied to each transaction?
*Hint: The problem becomes a weighted graph optimization variant.*


### Summary

This problem is a classic example of using backtracking to explore subsets under constraints. The goal is to minimize the number of transactions to settle all debts using recursive pairing of people with opposite balances. The central insight is to eliminate intermediate steps by directly settling debts between individuals, minimizing transaction count through optimal pairing. This approach demonstrates a blend of DFS and greedy pruning to efficiently reduce exponential search space.