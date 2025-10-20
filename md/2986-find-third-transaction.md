### Leetcode 2986 (Medium): Find Third Transaction [Practice](https://leetcode.com/problems/find-third-transaction)

### Description  
Given a table of user transaction data, for each user who has made at least three transactions, return the user’s third transaction **if and only if** the third transaction’s amount is strictly greater than both of the previous two amounts.
The result should include the user_id, the spend of the third transaction (alias as third_transaction_spend), and the third transaction date (alias as third_transaction_date).  
If a user has fewer than three transactions, they should not appear in the result.

### Examples  

**Example 1:**  
Input: `user_id=1, spend=[7.44, 49.78, 65.56], date=[2023-11-02, 2023-11-12, 2023-11-18]`
Output: `user_id=1, third_transaction_spend=65.56, third_transaction_date=2023-11-18`
*Explanation: User 1 has three transactions. The third spend (65.56) is greater than both previous spends (7.44 and 49.78), so it qualifies.*

**Example 2:**  
Input: `user_id=2, spend=[31.93, 94.28], date=[2023-11-14, 2023-11-17]`
Output:  
*Explanation: User 2 only has two transactions – they are not included.*

**Example 3:**  
Input: `user_id=3, spend=[8.0, 12.0, 7.0], date=[2023-11-01, 2023-11-11, 2023-11-16]`
Output:  
*Explanation: User 3’s third transaction (7.0) is not greater than both previous spends (8.0, 12.0), so they are not included.*

### Thought Process (as if you’re the interviewee)  
- Start by grouping transactions by user and ordering them by date.
- For each user’s list, identify the third transaction (if present).
- For each third transaction, check if its spend is greater than both of the previous two spends.
    - Brute force: Iterate for every user, sort their transactions, and for position i=2 (third transaction), compare with i=1 and i=0.
    - Optimized: 
        - If using SQL/window functions: Use RANK or ROW_NUMBER to number transactions within each user, and LAG to access previous spends for comparison.
        - In Python/pandas, sort, and for each user with ≥3 transactions, do a single pass, comparing directly.
- Time complexity is dominated by the need to sort transactions by date per user.
- Edge: Make sure to return nothing for users with <3 transactions or where the third transaction does not satisfy the condition.

### Corner cases to consider  
- Users with <3 transactions (should not be in result)
- The third transaction is equal to (not strictly greater than) either of the previous
- Multiple users
- Spend values with decimals
- Transaction dates are not in order in input (need to sort)
- Users with more than three transactions (only third considered)
- Duplicate transaction dates (does not affect correctness as long as sorted properly)

### Solution

```python
# Assume the data is given as a list of dicts:
# transactions = [
#   {"user_id": 1, "spend": 7.44, "transaction_date": "2023-11-02 12:15:23"},
#   {"user_id": 1, "spend": 49.78, "transaction_date": "2023-11-12 00:13:46"},
#   {"user_id": 1, "spend": 65.56, "transaction_date": "2023-11-18 13:49:42"},
#   ... 
# ]
from collections import defaultdict

def find_third_transaction(transactions):
    # Step 1: Group by user_id
    by_user = defaultdict(list)
    for t in transactions:
        by_user[t["user_id"]].append(t)
    
    result = []
    for user_id, user_txns in by_user.items():
        # Step 2: Sort this user's transactions by transaction_date (lex order is safe for ISO strings)
        user_txns.sort(key=lambda t: t["transaction_date"])
        # Step 3: Only process if user has at least 3 transactions
        if len(user_txns) >= 3:
            t2 = user_txns[2]
            t1 = user_txns[1]
            t0 = user_txns[0]
            # Step 4: Check if 3rd spend > both 1st and 2nd
            if t2["spend"] > t1["spend"] and t2["spend"] > t0["spend"]:
                result.append({
                    "user_id": user_id,
                    "third_transaction_spend": t2["spend"],
                    "third_transaction_date": t2["transaction_date"]
                })
    # Step 5: Sort result by user_id ascending (optional)
    result.sort(key=lambda x: x["user_id"])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — grouping is O(n), sorting for each user might be O(k log k) where k is transactions per user, so in total O(n log n) if one user has all.
- **Space Complexity:** O(n) — extra lists for grouped transactions and result output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if we wanted the 4ᵗʰ, 5ᵗʰ, ... transaction with a similar rule?
  *Hint: Consider parameterizing the logic, perhaps use a sliding window approach.*

- How would you adjust if transactions had to be strictly ascending (each transaction larger than the one before)?
  *Hint: Can compare current spend with previous in a loop.*

- How would you do this in SQL?  
  *Hint: Use window functions like ROW_NUMBER and LAG.*

### Summary
This problem highlights the **windowing** pattern, common in both SQL and Python for time-series or sequential record analysis. The key technique is sorting (for sequence), then using a window of fixed size (three transactions) to compare values. Variations of this arise in fraud detection, sales trend analysis, and leaderboard rankings. The solution emphasizes clear grouping, ordering, and fixed-window logic—widely applicable in analytics.


### Flashcard
Use window functions (ROW_NUMBER or RANK) to number each user's transactions by date. Filter for row_number = 3, then check if that transaction's spend exceeds both previous transactions using self-joins or LAG functions.

### Tags
Database(#database)

### Similar Problems
