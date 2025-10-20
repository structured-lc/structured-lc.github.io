### Leetcode 1393 (Medium): Capital Gain/Loss [Practice](https://leetcode.com/problems/capital-gainloss)

### Description  
Given a table of stock transactions, each row recording a stock name, whether it was bought or sold, the day, and the price, compute the **net capital gain or loss** for each stock. Buying a stock is treated as negative (money spent), and selling as positive (money received). For each stock, sum all transactions (sell - buy) to get total gain/loss.

### Examples  

**Example 1:**  
Input:  
Stocks table:  
```
+---------------+-----------+---------------+--------+
| stock_name    | operation | operation_day | price  |
+---------------+-----------+---------------+--------+
| Leetcode      | Buy       | 1             | 1000   |
| Corona Masks  | Buy       | 2             | 10     |
| Leetcode      | Sell      | 5             | 9000   |
| Handbags      | Buy       | 17            | 30000  |
| Corona Masks  | Sell      | 3             | 1010   |
| Corona Masks  | Buy       | 4             | 1000   |
| Corona Masks  | Sell      | 5             | 500    |
| Corona Masks  | Buy       | 6             | 1000   |
| Handbags      | Sell      | 29            | 7000   |
| Corona Masks  | Sell      | 10            | 10000  |
+---------------+-----------+---------------+--------+
```
Output:  
```
+---------------+------------------+
| stock_name    | capital_gain_loss|
+---------------+------------------+
| Leetcode      | 8000             |
| Corona Masks  | 9500             |
| Handbags      | -23000           |
+---------------+------------------+
```
*Explanation:*
- Leetcode: Sell(9000) - Buy(1000) = 8000  
- Corona Masks: Sell(1010+500+10000) - Buy(10+1000+1000) = (1010+500+10000)-(10+1000+1000) = 11510 - 2010 = 9500  
- Handbags: Sell(7000) - Buy(30000) = -23000  


### Thought Process (as if you’re the interviewee)  
First, I’d clarify the requirements:  
- For each stock, sum all “Buy” operations as negative and all “Sell” operations as positive.  
- Final result should return the total for each stock.

**Brute-force idea:**  
Loop through all records, keep a running sum per stock name:  
- If buy, add -price.  
- If sell, add +price.  
Collect the result for each stock.

**Optimization:**  
Since all we do is sum prices with sign based on operation, this can be done in a single pass through the data using a hash map.  
No need to sort or worry about days, as we only sum net movement for each stock.

**SQL Equivalent**:
GROUP BY stock_name, summing with CASE on operation.

**Why this approach:**  
- One pass, O(n) (where n = number of records).  
- Clean and space-efficient; only need storage per unique stock name.

Trade-offs: None significant for described input size.


### Corner cases to consider  
- No transactions at all → output is empty  
- Only buy or only sell for a stock (should properly show negative or positive total)  
- Multiple identical transactions  
- Zero price transactions  
- Stock names with case sensitivity (“AAPL” vs “aapl”)  
- Only one transaction for a stock  
- Negative price (if allowed, though not likely in realistic data)


### Solution

```python
def capital_gain_loss(stocks):
    """
    stocks: List of dicts, each dict contains:
        - 'stock_name' (str)
        - 'operation'  (str, 'Buy' or 'Sell')
        - 'price'      (int)
        - 'operation_day' (int)  # unused here
    Returns: Dict mapping stock_name -> capital gain/loss (int)
    """
    gain_loss = {}
    
    for txn in stocks:
        name = txn['stock_name']
        op = txn['operation']
        price = txn['price']
        
        if name not in gain_loss:
            gain_loss[name] = 0

        # Treat Buy as negative, Sell as positive
        if op == 'Buy':
            gain_loss[name] -= price
        elif op == 'Sell':
            gain_loss[name] += price
        # If unknown operation, ignore (or could raise)

    return gain_loss
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows/transactions. Each row is read once.
- **Space Complexity:** O(m), where m is the number of unique stock names (dictionary for output).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle transactions with other operations besides 'Buy' and 'Sell'?  
  *Hint: Think about input validation or extending logic for new types.*

- What if you had very large data: streaming GBs of transaction data—how would you compute gain/loss efficiently?  
  *Hint: Can this be parallelized, or handled in chunks?*

- Could you write this in SQL for direct execution on a database table?  
  *Hint: Use GROUP BY and CASE WHEN for sign switching.*

### Summary
This problem is a classic example of a **running sum/group-by pattern**, widely applied in any financial or aggregation-related data processing. It highlights how even real-world calculations like capital gain/loss reduce to a simple sum with correct sign handling and grouping; this pattern is very common in both programming (hash maps/dictionaries) and SQL (GROUP BY + CASE). The core approach is efficient, both for coding interviews and real systems.


### Flashcard
For each stock, sum buys as negative and sells as positive—aggregate in one pass using a dictionary.

### Tags
Database(#database)

### Similar Problems
