### Leetcode 3220 (Medium): Odd and Even Transactions [Practice](https://leetcode.com/problems/odd-and-even-transactions)

### Description  
Given a table `transactions` with columns `transaction_id`, `amount`, and `transaction_date`, calculate for each date:
- the sum of all **odd** amounts (`amount % 2 == 1`)
- the sum of all **even** amounts (`amount % 2 == 0`)

If there are no odd or even transactions for a date, display `0` for that sum. Output should be **grouped by transaction_date and ordered by transaction_date ascending**.

### Examples  

**Example 1:**  
Input:  
`transactions` =  
```
+----------------+--------+------------------+
| transaction_id | amount | transaction_date |
+----------------+--------+------------------+
| 1              | 150    | 2024-07-01       |
| 2              | 200    | 2024-07-01       |
| 3              | 75     | 2024-07-01       |
| 4              | 300    | 2024-07-02       |
| 5              | 50     | 2024-07-02       |
| 6              | 120    | 2024-07-03       |
+----------------+--------+------------------+
```
Output:  
```
+------------------+---------+----------+
| transaction_date | odd_sum | even_sum |
+------------------+---------+----------+
| 2024-07-01       | 75      | 350      |
| 2024-07-02       | 0       | 350      |
| 2024-07-03       | 0       | 120      |
+------------------+---------+----------+
```
*Explanation:  
On 2024-07-01: odd amounts = 75, even amounts = 150+200=350.  
2024-07-02: all even, so odd_sum=0, even_sum=300+50=350.  
2024-07-03: all even, so odd_sum=0, even_sum=120.*

**Example 2:**  
Input:  
`transactions` =  
```
+----------------+--------+------------------+
| transaction_id | amount | transaction_date |
+----------------+--------+------------------+
| 1              | 51     | 2024-07-21       |
| 2              | 13     | 2024-07-21       |
| 3              | 8      | 2024-07-22       |
| 4              | 9      | 2024-07-23       |
+----------------+--------+------------------+
```
Output:  
```
+------------------+---------+----------+
| transaction_date | odd_sum | even_sum |
+------------------+---------+----------+
| 2024-07-21       | 64      | 0        |
| 2024-07-22       | 0       | 8        |
| 2024-07-23       | 9       | 0        |
+------------------+---------+----------+
```
*Explanation:  
2024-07-21: only odd (51+13=64), even_sum=0.  
2024-07-22: only even (8), odd_sum=0.  
2024-07-23: only odd (9), even_sum=0.*

**Example 3:**  
Input:  
`transactions` =  
```
+----------------+--------+------------------+
| transaction_id | amount | transaction_date |
+----------------+--------+------------------+
| 1              | 2      | 2024-07-30       |
| 2              | 3      | 2024-07-30       |
+----------------+--------+------------------+
```
Output:  
```
+------------------+---------+----------+
| transaction_date | odd_sum | even_sum |
+------------------+---------+----------+
| 2024-07-30       | 3       | 2        |
+------------------+---------+----------+
```
*Explanation:  
Both odd and even exist for the date. Just sum accordingly.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about grouping data by `transaction_date`. For each group (each date), I need two sums: one where `amount` is odd, and one where `amount` is even.  
- **Brute-force:** Scan the table, filter by date, calculate two sums for every date. This is inefficient in code.
- **Optimized (SQL-like/grouped):** Group by date. For each row in the group, check if amount is odd or even, and aggregate accordingly—this can be done with conditional sums.

For each date:
- Odd sum: sum(amount) where amount mod 2 = 1 else 0
- Even sum: sum(amount) where amount mod 2 = 0 else 0

No need for extra passes.  
Also, make sure if a group has no odd or even value, return 0.

### Corner cases to consider  
- Day with all odd or all even transactions (other sum is 0)
- Date with only one transaction (odd or even)
- Empty transaction table → output is empty
- Amount is 0 (counts as even)
- Large numbers, duplicate dates

### Solution

```python
from collections import defaultdict

def oddEvenTransactions(transactions):
    # Map of transaction_date -> {"odd": sum, "even": sum}
    grouped = defaultdict(lambda: {"odd": 0, "even": 0})
    
    for t in transactions:
        tr_date = t["transaction_date"]
        amount = t["amount"]
        if amount % 2 == 0:
            grouped[tr_date]["even"] += amount
        else:
            grouped[tr_date]["odd"] += amount

    # Prepare final sorted result
    result = []
    for tr_date in sorted(grouped):
        result.append({
            "transaction_date": tr_date,
            "odd_sum": grouped[tr_date]["odd"],
            "even_sum": grouped[tr_date]["even"]
        })
    return result

# Example usage:
transactions = [
    {"transaction_id": 1, "amount": 150, "transaction_date": "2024-07-01"},
    {"transaction_id": 2, "amount": 200, "transaction_date": "2024-07-01"},
    {"transaction_id": 3, "amount": 75,  "transaction_date": "2024-07-01"},
    {"transaction_id": 4, "amount": 300, "transaction_date": "2024-07-02"},
    {"transaction_id": 5, "amount": 50,  "transaction_date": "2024-07-02"},
    {"transaction_id": 6, "amount": 120, "transaction_date": "2024-07-03"},
]
print(oddEvenTransactions(transactions))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + d log d), where n is number of transactions and d is number of unique dates (grouping then sorting keys).
- **Space Complexity:** O(d), for storing the datewise result mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to do this for a very big dataset; can you do it streaming?  
  *Hint: Only keep aggregate per date in memory; sorts may require more space.*

- How would you handle amounts that are not integers?  
  *Hint: Odd/even is only defined for integers, so check data validity first.*

- What if you wanted to return top-k transaction dates with maximum odd_sum?  
  *Hint: After grouping, use a heap or sort the results by odd_sum descending.*

### Summary
This problem is a direct **group by + conditional sum** aggregation, commonly seen in database and data analysis work. Recognizing how to split a sum between odd and even on each group (date) is key. This pattern is common in SQL analytics and in applications needing summary statistics—for example, financial reports, data dashboards. The coding patterns are **grouping, aggregation, and conditional sum**.


### Flashcard
Group transactions by date; for each date, sum amounts where amount % 2 == 1 (odd) and where amount % 2 == 0 (even).

### Tags
Database(#database)

### Similar Problems
