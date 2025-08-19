### Leetcode 1607 (Easy): Sellers With No Sales [Practice](https://leetcode.com/problems/sellers-with-no-sales)

### Description  
You are given a table of sellers and a table of orders. Each seller has an id. Each order has a seller_id. Return all seller ids who made **zero sales**, i.e., whose id is not present in the orders table.

### Examples  

**Example 1:**  
Input: `Sellers = [{1, James}, {2, John}, {3, Jack}]`, `Orders = [{2, 50}, {2, 100}]`  
Output: `[1, 3]`  
*Explanation: Sellers 1 and 3 did not appear in any Orders.*

**Example 2:**  
Input: `Sellers = [{1, Alice}, {2, Bob}]`, `Orders = []`  
Output: `[1, 2]`  
*Explanation: With no orders, all sellers have zero sales.*

**Example 3:**  
Input: `Sellers = [{1, Eve}]`, `Orders = [{1, 70}]`  
Output: `[]`  
*Explanation: Eve is present in the Orders, so no output.*

### Thought Process (as if you’re the interviewee)  
- This is a typical "find items in one list not present in another" problem.
- Use a set to record seller_ids that are in Orders.
- Iterate through Sellers and include those whose id is not in the Orders set.

### Corner cases to consider  
- Sellers table is empty (output: empty list)
- Orders table is empty (all sellers output)
- All sellers have at least one order (output: empty list)

### Solution

```python
def sellers_with_no_sales(sellers, orders):
    # sellers: List of dicts/lists with id
    # orders: List of dicts/lists with seller_id
    if not sellers:
        return []
    order_seller_ids = set(order[0] for order in orders)
    return [seller[0] for seller in sellers if seller[0] not in order_seller_ids]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m + n), where m = number of sellers, n = number of orders (due to set building and seller iteration)
- **Space Complexity:** O(n), for the orders seller_id set

### Potential follow-up questions (as if you’re the interviewer)  
- What if the input tables are huge and cannot be fully loaded in memory?   
  *Hint: Stream over orders, or use a database join to filter sellers not in orders efficiently.*

- How to return sellers with less than X sales?   
  *Hint: Count occurrences per seller and compare with threshold.*

- Can this be done with SQL?   
  *Hint: LEFT JOIN sellers to orders ON seller id; WHERE order seller_id IS NULL.*

### Summary
This is the classic set subtraction problem, where the goal is to find entities in one group not present in another. Very commonly solved using sets, hash-maps, or anti-joins. Pattern applies anywhere group membership and exclusions are needed.

### Tags
Database(#database)

### Similar Problems
- Customer Who Visited but Did Not Make Any Transactions(customer-who-visited-but-did-not-make-any-transactions) (Easy)