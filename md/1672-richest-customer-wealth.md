### Leetcode 1672 (Easy): Richest Customer Wealth [Practice](https://leetcode.com/problems/richest-customer-wealth)

### Description  
Given a list of customers and their bank accounts, where `accounts[i][j]` represents the amount customer i has in bank j, find the maximum wealth of any customer. A customer's wealth is the sum of all their bank account balances. Return the wealth of the richest customer.

### Examples  

**Example 1:**  
Input: `accounts = [[1,2,3],[3,2,1]]`  
Output: `6`  
*Explanation: 1ᵗʰ customer: 1+2+3=6, 2ⁿᵈ customer: 3+2+1=6. Both have equal max wealth, return 6.*

**Example 2:**  
Input: `accounts = [[1,5],[7,3],[3,5]]`  
Output: `10`  
*Explanation: Customer wealths are 6, 10, and 8. Richest is 10.*

**Example 3:**  
Input: `accounts = [[2,8,7],[7,1,3],[1,9,5]]`  
Output: `17`  
*Explanation: Customer wealths are 17, 11, and 15. Richest is 17.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to compute the wealth of each customer by summing their balances. Then, just keep track of the maximum. This is efficient because there are only m × n entries (max 2500, given constraints). We can do this in a single iteration.

### Corner cases to consider  
- Only one customer or one bank
- All customers with same wealth
- All account balances are equal
- Customers have a balance of 1 in every bank (minimum case)
- Large values near 100 per account (maximum case)

### Solution

```python
from typing import List

def maximumWealth(accounts: List[List[int]]) -> int:
    max_wealth = 0
    for customer_accounts in accounts:
        curr_wealth = sum(customer_accounts)
        if curr_wealth > max_wealth:
            max_wealth = curr_wealth
    return max_wealth
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n), where m = number of customers, n = number of banks. We check every account.
- **Space Complexity:** O(1), no extra space used other than variables for sums.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the list of all the richest customers if more than one have the same wealth?  
  *Hint: Track indices while calculating maximums.*

- How does your method change if the accounts are extremely large (millions of customers)?  
  *Hint: Could require streaming instead of storing, or parallel processing.*

- Can you do this with a single line in Python?  
  *Hint: Use max and sum directly in a generator expression.*

### Summary
This problem is a classic array/traversal pattern (row-by-row). It's common in interview screens, and the same logic extends to maximums in grids, accumulators, or streaming scenarios. Pattern: row-reduction followed by aggregation.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
