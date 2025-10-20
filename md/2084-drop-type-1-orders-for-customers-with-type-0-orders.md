### Leetcode 2084 (Medium): Drop Type 1 Orders for Customers With Type 0 Orders [Practice](https://leetcode.com/problems/drop-type-1-orders-for-customers-with-type-0-orders)

### Description  
Given a table representing customer orders, where each row has a `customer_id` and an `order_type` (either 0 or 1), drop all type 1 orders for any customer who has at least one order of type 0. Only keep type 1 orders for those customers who never placed type 0 orders. The output should be the `order_id`, `customer_id`, and `order_type` for the remaining orders.

### Examples  

**Example 1:**  
Input:  
Orders =  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    1     |      1      |     1      |
|    2     |      2      |     0      |
|    3     |      1      |     0      |
|    4     |      3      |     1      |
|    5     |      2      |     1      |
  
Output:  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    2     |      2      |     0      |
|    3     |      1      |     0      |
|    4     |      3      |     1      |

*Explanation:*
- Customer 1 and 2 both have type 0 orders, so their type 1 orders (order_id=1,5) are dropped.
- Customer 3 has only type 1 orders, so those are kept.

**Example 2:**  
Input:  
Orders =  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    1     |      1      |     1      |
|    2     |      2      |     1      |
  
Output:  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    1     |      1      |     1      |
|    2     |      2      |     1      |

*Explanation:*
- No customer has order_type 0, so keep all.

**Example 3:**  
Input:  
Orders =  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    1     |      1      |     0      |
|    2     |      1      |     1      |
|    3     |      2      |     1      |
|    4     |      1      |     1      |

Output:  
| order_id | customer_id | order_type |
|----------|-------------|------------|
|    1     |      1      |     0      |
|    3     |      2      |     1      |

*Explanation:*
- Customer 1 has a type 0 order, so their type 1 orders (order_id=2,4) are dropped.
- Customer 2 has only type 1 orders, so keep them.

### Thought Process (as if you’re the interviewee)  
- Naive approach: For each order, check if the customer has a type 0 order. If yes, only keep type 0 orders for that customer.
- This is inefficient if we re-scan the list for each order.
- To optimize, first collect all customers with at least one type 0 order (e.g., store their ids in a set).
- Then process the orders:
  - If the order_type is 0, always keep it.
  - If the order_type is 1, keep it only if the customer_id is not in the found set.

### Corner cases to consider  
- All orders are type 0.
- All orders are type 1.
- Some customers with both type 0 and 1, some with only 1.
- No orders in the input (empty list).
- Multiple orders of same type for a customer.

### Solution

```python
def drop_type1_orders(orders):
    """
    orders: List[Dict] with keys 'order_id', 'customer_id', 'order_type'
    Returns: List[Dict], filtered based on problem criteria.
    """
    # Step 1: Find all customers who have at least one type 0 order
    customers_with_type0 = set()
    for order in orders:
        if order['order_type'] == 0:
            customers_with_type0.add(order['customer_id'])

    # Step 2: Filter orders based on the rules
    result = []
    for order in orders:
        if order['order_type'] == 0:
            result.append(order)
        elif order['customer_id'] not in customers_with_type0:
            result.append(order)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of orders. Each order is scanned twice (once to build the set, once to filter).
- **Space Complexity:** O(k), where k = number of unique customers with type 0 orders (for the set); plus the result list (up to O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if the data does not fit in memory?  
  *Hint: Group or process in batches; use external sorting; streaming.*

- What if there are more than two types, and the rule becomes: Only keep the smallest type order per customer?  
  *Hint: Use grouping by customer, and select orders with order_type = min(type) for each customer.*

- How do you implement this in SQL?  
  *Hint: Use subquery or WITH to find customers with type 0, then filter accordingly.*

### Summary
This problem uses the *hash set* or *grouping* pattern: build a lookup set in a first pass, then filter in a second. It’s common in problems involving global group-based rules, e.g., “filter by property across group.” This approach can be used for similar problems in SQL, Python, or any language, and scales to streaming or database join scenarios.


### Flashcard
First collect all customer_ids with type 0 orders; then keep only type 0 orders for those customers, and all orders for others.

### Tags
Database(#database)

### Similar Problems
