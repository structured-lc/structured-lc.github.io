### Leetcode 586 (Easy): Customer Placing the Largest Number of Orders [Practice](https://leetcode.com/problems/customer-placing-the-largest-number-of-orders)

### Description  
Given an `orders` table containing order data, your task is to find the `customer_number` of the customer who has placed **the largest number of orders**. If there are multiple customers with the same largest order count, the test cases are generated such that exactly one customer will have more orders than any other customer. You are required to output only that customer’s number.

**The schema for the orders table:**  
| order_number | customer_number | order_date | required_date | shipped_date | status | comment |
|:------------:|:--------------:|:----------:|:-------------:|:------------:|:------:|:-------:|


### Examples  

**Example 1:**  
Input:  
| order_number | customer_number |
|--------------|----------------|
|      1       |       1        |
|      2       |       2        |
|      3       |       3        |
|      4       |       3        |

Output: `3`  
*Explanation: Customer 3 appears twice while customers 1 and 2 have only one order each. So the answer is 3.*

**Example 2:**  
Input:  
| order_number | customer_number |
|--------------|----------------|
|      1       |       7        |
|      2       |       9        |
|      3       |       7        |
|      4       |       5        |
|      5       |       7        |

Output: `7`  
*Explanation: Customer 7 has 3 orders. Customers 5 and 9 have only 1 each.*

**Example 3:**  
Input:  
| order_number | customer_number |
|--------------|----------------|
|      1       |      12        |

Output: `12`  
*Explanation: Only one order from customer 12, so they have the max.*

### Thought Process (as if you’re the interviewee)  
First, we need to determine which customer has the most orders. The brute-force way is:
- For each customer, count how many times they appear in the orders table.
- Keep track of the maximum count and find which customer(s) have that count.

Optimized:
- Iterate through each order and use a hash map (dictionary) to count the number of times each customer appears.
- Once completed, scan through the map to find the customer with the maximum count.
- Since the problem guarantees only one top customer, we don’t need to handle ties.

This is efficient and scans the table a fixed number of times.

### Corner cases to consider  
- No orders (should not occur as per LeetCode, but in a real-world case we should check).
- Exactly one order in the table.
- All customers have only one order (test data guarantee avoids ambiguous output).
- Large number of orders for a single customer and only a few for others.
- The table has non-consecutive customer numbers.

### Solution

```python
def customer_with_most_orders(orders):
    # Edge case: empty orders list
    if not orders:
        return None

    # Step 1: Count orders for each customer
    order_counts = {}
    for order in orders:
        customer = order['customer_number']
        if customer not in order_counts:
            order_counts[customer] = 0
        order_counts[customer] += 1

    # Step 2: Find the customer with the highest count
    max_count = -1
    top_customer = None
    for customer, count in order_counts.items():
        if count > max_count:
            max_count = count
            top_customer = customer

    return top_customer

# Example usage:
orders1 = [
    {"order_number": 1, "customer_number": 1},
    {"order_number": 2, "customer_number": 2},
    {"order_number": 3, "customer_number": 3},
    {"order_number": 4, "customer_number": 3}
]
print(customer_with_most_orders(orders1))  # Output: 3
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of orders. We scan through all orders once to count them, and then through the hashmap’s keys (customer numbers) which is at most n but likely much less.
- **Space Complexity:** O(k), where k is the number of unique customers (due to the dictionary for counting).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if there could be a tie for the highest number of orders?  
  *Hint: Instead of tracking one top customer, track a list of customers with the current highest count.*

- Suppose the order table is extremely large and doesn’t fit in memory. How would you scale your solution?  
  *Hint: Count customers in chunks (batch processing or streaming), or use a database aggregate query.*

- What if there are additional filters (e.g., only count ‘Closed’ orders)?  
  *Hint: Filter each row as you process it, considering order status.*

### Summary
We used a common “group-by and count” hash map approach—efficient and simple for frequency problems. This counting pattern is broadly applicable, for example: finding the most frequent element, user activity peaks, or any sort stat aggregation grouped by a key. It works well for problems with uniqueness constraints or where you need to return a key/value based on maximum frequency.

### Tags
Database(#database)

### Similar Problems
