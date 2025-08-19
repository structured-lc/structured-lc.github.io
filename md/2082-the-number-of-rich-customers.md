### Leetcode 2082 (Easy): The Number of Rich Customers [Practice](https://leetcode.com/problems/the-number-of-rich-customers)

### Description  
Given a table `Store` with (at minimum) columns: `customer_id` and `amount`, find the number of customers who have made at least one purchase with an amount **strictly greater than 500**.  
You need to count **unique customers** (not rows) where `amount > 500`.

### Examples  

**Example 1:**  
Input:  
Store =  
| customer_id | amount |
|-------------|--------|
|      1      | 600    |
|      2      | 400    |
|      3      | 501    |
|      1      | 200    |
Output: `2`  
*Explanation: Customers 1 and 3 made at least one purchase with amount > 500.*

**Example 2:**  
Input:  
Store =  
| customer_id | amount |
|-------------|--------|
|      1      | 500    |
|      2      | 400    |
|      3      | 200    |
Output: `0`  
*Explanation: No customer has a purchase with amount > 500.*

**Example 3:**  
Input:  
Store =  
| customer_id | amount |
|-------------|--------|
|      2      | 700    |
|      2      | 300    |
|      4      | 800    |
|      5      | 600    |
Output: `3`  
*Explanation: Customers 2, 4, and 5 each have at least one qualifying purchase.*

### Thought Process (as if you’re the interviewee)  
- Start by **filtering out** the records where `amount ≤ 500`.
- For the remaining, **find all unique customer_id**s—that is, customers who made > 500 purchase.
- **Count** how many unique customer_id values are present in this filtered set.
- This can be solved either by:
  - Keeping a set of seen customer_id while iterating through the list/rows.
  - In SQL: `SELECT COUNT(DISTINCT customer_id) FROM Store WHERE amount > 500;`
- The approach is O(n), where n is number of records—since you need to scan all entries once.

### Corner cases to consider  
- Store is empty ⇒ return 0.
- All purchase amounts ≤ 500 ⇒ return 0.
- Multiple purchases over 500 by same customer ⇒ only counted once.
- All customers qualify ⇒ return equals number of unique customers.
- Single record; test both over and under 500.
- Amount is exactly 500 (should *not* qualify).

### Solution

```python
def number_of_rich_customers(store):
    """
    store: List of (customer_id, amount)
    Returns: int - the number of rich customers (amount > 500 at least once)
    """
    rich_customers = set()
    for customer_id, amount in store:
        # Only add customer if purchase > 500
        if amount > 500:
            rich_customers.add(customer_id)
    return len(rich_customers)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of records in Store.  
  You iterate through each row once, and set operations (add, check) are O(1) on average.

- **Space Complexity:** O(k), where k is the number of unique customer_ids who qualify (`k ≤ n`).  
  The extra space is for the set of customer_ids who made a big purchase.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the amount threshold changes frequently?
  *Hint: Can you parameterize or make the code/SQL more flexible?*

- What if we want the exact list of rich customer_ids, not just the count?
  *Hint: Instead of count, return the set or a list.*

- What if the Store table is extremely large (millions of records)?
  *Hint: Discuss memory implications, potentially external or streaming solution.*

### Summary
This is a classic **set/build** or **filter and count distinct** problem.  
Patterns in use include building a set for deduplication and filtering based on some property.  
This type of logic is common in database queries and in-preprocessing data for analytics—whenever you need a unique count of something matching a criterion.

### Tags
Database(#database)

### Similar Problems
- The Winner University(the-winner-university) (Easy)