### Leetcode 1169 (Medium): Invalid Transactions [Practice](https://leetcode.com/problems/invalid-transactions)

### Description  
Given a list of credit card transactions, each in the format `"name,time,amount,city"`, identify all transactions that are possibly invalid.  
A transaction is **possibly invalid** if either:
- The amount is greater than \$1000, **or**
- It occurs within 60 minutes (inclusive) of another transaction with the **same name** but in a **different city**.

Return all transactions that meet these criteria, in any order.

### Examples  

**Example 1:**  
Input: `["alice,20,800,mtv","alice,50,100,beijing"]`  
Output: `["alice,20,800,mtv","alice,50,100,beijing"]`  
*Explanation: Both transactions belong to "alice", are within 30 minutes of each other, but cities are different. Both are invalid.*

**Example 2:**  
Input: `["alice,20,800,mtv","alice,50,1200,mtv"]`  
Output: `["alice,50,1200,mtv"]`  
*Explanation: Only the second has amount > 1000. No cross-city transaction within 60 minutes, so only second is invalid.*

**Example 3:**  
Input: `["alice,20,800,mtv","bob,50,1200,mtv"]`  
Output: `["bob,50,1200,mtv"]`  
*Explanation: Only bob's transaction is invalid due to amount > 1000.*

### Thought Process (as if you’re the interviewee)  
To solve this, I'll break down the problem:
- Parse each transaction to extract the relevant fields: name, time, amount, and city.
- A transaction is invalid if:
  - Amount > 1000, or
  - There's another transaction with the same name, in a different city, and within 60 minutes.

#### Brute-force:
- For each transaction, compare it to *every other* transaction with the same name.
- If they're within 60 minutes and cities differ, mark both invalid.
- This is O(n²), but n ≤ 1000, so it's feasible.

#### Optimization:
- Build a mapping from name → list of that user's transactions.
- For each user's transactions, do a pairwise comparison only within each user's group.
- Still O(n²) in the worst case, but practically reduces comparisons.

Final tradeoff: The O(n²) approach is sufficient due to small n, avoids complicating code for slight speedup.

### Corner cases to consider  
- No transactions at all (`[]`)
- Only transactions with amount ≤ 1000, no invalid
- Only *one* transaction (should only be invalid if amount > 1000)
- Multiple invalid transactions for the same user in different cities
- Transactions at the same time but different cities
- Multiple transactions with the *exact* same details (duplicate transactions)
- Time differences *exactly* 60 minutes

### Solution

```python
def invalidTransactions(transactions):
    # Parse transactions to [name, time(int), amount(int), city, raw, index]
    parsed = []
    for idx, t in enumerate(transactions):
        name, time, amount, city = t.split(',')
        parsed.append({
            "name": name,
            "time": int(time),
            "amount": int(amount),
            "city": city,
            "raw": t,
            "idx": idx
        })
        
    # Group all transactions by name
    from collections import defaultdict
    grouped = defaultdict(list)
    for record in parsed:
        grouped[record["name"]].append(record)
    
    # Set to store indices of invalid transactions
    invalid = set()
    
    for records in grouped.values():
        n = len(records)
        # Compare amount
        for i in range(n):
            if records[i]["amount"] > 1000:
                invalid.add(records[i]["idx"])
        
        # O(n^2) scan for invalid due to proximity/different city
        for i in range(n):
            for j in range(n):
                if i == j:
                    continue
                time_i, time_j = records[i]["time"], records[j]["time"]
                city_i, city_j = records[i]["city"], records[j]["city"]
                # If within 60 minutes and cities differ, both invalid
                if abs(time_i - time_j) <= 60 and city_i != city_j:
                    invalid.add(records[i]["idx"])
    
    # Return the transaction strings in any order
    return [transactions[idx] for idx in invalid]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case (all transactions are from one user), but usually less due to grouping. Each pair with the same name is checked once.
- **Space Complexity:** O(n) for storing parsed transactions and indices.

### Potential follow-up questions (as if you’re the interviewer)  

- If the list of transactions is huge (millions), how would you improve performance further?  
  *Hint: Can you use time-sorted lists, or a windowed scan with sorting?*

- How would you report *which* rule was violated for each invalid transaction?  
  *Hint: Maintain metadata or a data structure mapping indices to rule violations.*

- Suppose transactions could have missing or corrupt fields. How would you handle parsing errors?  
  *Hint: Add error checking/robust parsing for malformed lines.*

### Summary
This problem uses **grouping** related by a key (user name), and **pairwise window comparison** within each group — patterns common when handling transactions or logs. It combines parsing, hash-based grouping, and indexing to efficiently solve the problem. Similar logic appears in fraud detection, duplicate detection, and log audit scenarios.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
