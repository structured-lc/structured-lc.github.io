### Leetcode 2043 (Medium): Simple Bank System [Practice](https://leetcode.com/problems/simple-bank-system)

### Description  
Design a simple bank system that manages **n** accounts (numbered 1 to n), each with some initial balance. You need to implement these operations:
- **Transfer(account₁, account₂, money):** Move `money` from account₁ to account₂ if both accounts are valid and account₁ has at least `money`.
- **Deposit(account, money):** Add `money` to the balance of `account` if it exists.
- **Withdraw(account, money):** Deduct `money` from the balance of `account` if it exists and has at least `money`.

Each operation should return `True` (successfully done) or `False` (operation invalid or not possible).

### Examples  

**Example 1:**  
Input:  
Initialize `Bank([10, 100, 20, 50, 30])`  
`bank.transfer(3, 5, 20)`  
`bank.deposit(5, 20)`  
`bank.withdraw(5, 30)`  
`bank.transfer(5, 3, 60)`  
`bank.withdraw(3, 40)`  
Output:  
`True, True, True, False, True`  
*Explanation:*
- Transfer 20 from acc 3 (now 0) to acc 5 (now 50); valid.
- Deposit 20 to acc 5 (now 70); valid.
- Withdraw 30 from acc 5 (now 40); valid.
- Try to transfer 60 from acc 5 (only 40 now); invalid, returns False.
- Withdraw 40 from acc 3 (has 0); invalid, returns False.

**Example 2:**  
Input:  
Initialize `Bank([5, 20])`  
`bank.withdraw(1, 6)`  
Output:  
`False`  
*Explanation:*
- Try to withdraw 6 from acc 1 (has 5); invalid, returns False.

**Example 3:**  
Input:  
Initialize `Bank()`  
`bank.transfer(1, 2, 10)`  
Output:  
`False`  
*Explanation:*
- Try to transfer to acc 2 (does not exist); operation is invalid.

### Thought Process (as if you’re the interviewee)  

First, realize that balancing and validation dominate every operation.  
- We must check valid account indices **every time**: 1 ≤ account ≤ n, since accounts are 1-based but stored as 0-based array.
- For each operation:
    - **Transfer:** Both accounts valid; enough money in source.
    - **Deposit:** Valid account only.
    - **Withdraw:** Valid account; enough money.

Brute-force would be to just check conditions for each, and update balances directly.

Optimizations:  
- Use a list to store balances for O(1) indexing.
- No need for hash map because account IDs are 1-based and continuous.
- O(1) time for all operations.

Trade-offs:
- Using a list is fast for lookups and updates.
- Array size is `n`, initialized once; simple index math handles the 1-based account numbers.

### Corner cases to consider  
- Transfer/deposit/withdraw to/from an invalid account number (e.g., 0 or n+1).
- Transfer/withdraw when source does not have enough balance.
- Transfer from/to same account (allowed?).
- Deposit or withdraw zero amount.
- Negative amounts (not possible per constraints).
- Large values, integer overflow (problem says money is within limits).

### Solution

```python
class Bank:
    def __init__(self, balance):
        # Store balances, 0-based internally but operations are 1-based
        self.balance = balance
        self.n = len(balance)

    def _valid(self, account):
        # Check account validity: Account numbers are 1-based
        return 1 <= account <= self.n

    def transfer(self, account1, account2, money):
        # Check account validity and sufficient funds
        if not self._valid(account1) or not self._valid(account2):
            return False
        if self.balance[account1 - 1] < money:
            return False
        # Do the transfer
        self.balance[account1 - 1] -= money
        self.balance[account2 - 1] += money
        return True

    def deposit(self, account, money):
        if not self._valid(account):
            return False
        self.balance[account - 1] += money
        return True

    def withdraw(self, account, money):
        if not self._valid(account):
            return False
        if self.balance[account - 1] < money:
            return False
        self.balance[account - 1] -= money
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per operation. Each operation (transfer, deposit, withdraw) includes only index checking and direct access/update of balances.
- **Space Complexity:** O(n) for storing the balances array, with n = number of accounts.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle concurrent operations (multiple clients updating simultaneously)?  
  *Hint: Consider thread safety, locks, or atomic transactions.*

- What if account numbers were sparse and not continuous?
  *Hint: Would a hash map be more suitable than an array in such case?*

- How to add a transaction history for each account?
  *Hint: Maintain an extra data structure mapping accounts to lists of actions.*

### Summary
This problem leverages **array-based account management** with simple O(1) operations for checking and updating balances. The design pattern is a classic example of **state simulation** using an array, and is widely applicable in scenarios where entities (users, assets, resources) are indexed and updated frequently with validation required. Similar patterns appear in system simulations, inventory, and ledger applications.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Simulation(#simulation)

### Similar Problems
- Design an ATM Machine(design-an-atm-machine) (Medium)