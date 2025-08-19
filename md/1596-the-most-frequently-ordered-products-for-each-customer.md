### Leetcode 1596 (Medium): The Most Frequently Ordered Products for Each Customer [Practice](https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer)

### Description  
Given three tables:  
- **Customers**: Contains customer_id and customer_name.
- **Orders**: Contains order_id, order_date, customer_id, and product_id.
- **Products**: Contains product_id and product_name.

For each customer who has placed at least one order, **find the product(s) they ordered the most times**. If there is a tie for most frequently ordered products, return all such products for that customer. Output columns: customer_id, product_id, product_name.

### Examples  

**Example 1:**  
Input:  
Customers =  
| customer_id | customer_name |
|-------------|---------------|
| 1           | Alice         |
| 2           | Bob           |

Orders =  
| order_id | order_date | customer_id | product_id |
|----------|------------|-------------|------------|
| 1        | 2020-07-01 | 1           | 1          |
| 2        | 2020-07-02 | 1           | 2          |
| 3        | 2020-07-03 | 1           | 1          |
| 4        | 2020-07-04 | 1           | 1          |
| 5        | 2020-07-10 | 2           | 2          |
| 6        | 2020-07-12 | 2           | 1          |
| 7        | 2020-07-13 | 2           | 3          |

Products =  
| product_id | product_name |
|------------|-------------|
| 1          | Mouse       |
| 2          | Keyboard    |
| 3          | Screen      |

Output:  
| customer_id | product_id | product_name |
|-------------|------------|--------------|
| 1           | 1          | Mouse        |
| 2           | 1          | Mouse        |
| 2           | 2          | Keyboard     |
| 2           | 3          | Screen       |

*Explanation:*
- Alice (customer 1) ordered 'Mouse' three times, 'Keyboard' once. So, 'Mouse' is her most frequently ordered product.
- Bob (customer 2) ordered 'Mouse', 'Keyboard', and 'Screen' once each, so all three are his most frequently ordered.

**Example 2:**  
Input:  
Customers =  
| customer_id | customer_name |
|-------------|---------------|
| 3           | Tom           |

Orders =  
| order_id | order_date | customer_id | product_id |
|----------|------------|-------------|------------|
| 8        | 2020-08-01 | 3           | 3          |
| 9        | 2020-08-02 | 3           | 3          |

Products =  
| product_id | product_name |
|------------|-------------|
| 3          | Screen      |

Output:  
| customer_id | product_id | product_name |
|-------------|------------|--------------|
| 3           | 3          | Screen       |

*Explanation:*  
Tom ordered only 'Screen' two times, so that is his most frequently ordered product.

**Example 3:**  
Input:  
Customers =  
| customer_id | customer_name |
|-------------|---------------|
| 4           | Jerry         |

Orders =  
| order_id | order_date | customer_id | product_id |
|----------|------------|-------------|------------|
| 10       | 2020-09-01 | 4           | 2          |

Products =  
| product_id | product_name |
|------------|-------------|
| 2          | Keyboard    |

Output:  
| customer_id | product_id | product_name |
|-------------|------------|--------------|
| 4           | 2          | Keyboard     |

*Explanation:*  
Jerry only ordered 'Keyboard' once.

### Thought Process (as if you’re the interviewee)  

- The **brute-force** approach: For each customer, count how many times they ordered each product, then find the maximum count and collect all products for each customer with that max count.
- This is naturally a **group-by** and aggregation problem: Group orders by customer and product, count the number of times each product is ordered per customer.
- Then, for each customer, determine the max count and filter to keep only the corresponding products.
- Optimal solution leverages a single pass of aggregations using a dictionary or nested dictionaries.
- After populating the counts, loop over each customer to extract the product(s) matching the max value per customer.
- This problem is often asked in SQL, but for interviews, you should be ready with an imperative approach as above.
- **Trade-offs**: This approach is efficient and straightforward in both coding and storage. It avoids nested loops by using dictionaries.  
- Time complexity is dominated by the number of orders.

### Corner cases to consider  
- Customers with no orders (should not be included in result).
- Customers with ties (two or more products with maximum count).
- Only one customer with one order.
- Only one product in the system.
- Products that are never ordered.
- Customers with all orders on the same product.

### Solution

```python
def most_frequent_products(customers, orders, products):
    # Map product_id to product_name for name lookup
    product_name = {}
    for prod in products:
        product_name[prod['product_id']] = prod['product_name']
    
    # Count how many times each customer ordered each product
    # Structure: counts[customer_id][product_id] = count
    counts = {}
    for order in orders:
        cust_id = order['customer_id']
        prod_id = order['product_id']
        if cust_id not in counts:
            counts[cust_id] = {}
        if prod_id not in counts[cust_id]:
            counts[cust_id][prod_id] = 0
        counts[cust_id][prod_id] += 1
    
    result = []
    # For each customer, find product(s) with max count
    for cust_id, prod_counts in counts.items():
        max_count = max(prod_counts.values())
        for prod_id, cnt in prod_counts.items():
            if cnt == max_count:
                result.append({
                    'customer_id': cust_id,
                    'product_id': prod_id,
                    'product_name': product_name[prod_id]
                })
    # Return in any order (sorted for deterministic testing)
    result.sort(key=lambda x: (x['customer_id'], x['product_id']))
    return result

# Example usage:
# customers = [{'customer_id': 1, 'customer_name': 'Alice'}, ...]
# orders = [{'order_id': 1, 'order_date': ..., 'customer_id': 1, 'product_id': 1}, ...]
# products = [{'product_id': 1, 'product_name': 'Mouse'}, ...]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M), where M = number of orders. Each order is processed once for counting, and at most all customers and products are iterated for the result.
- **Space Complexity:** O(C × P), where C = number of customers and P = number of products, as counts[cust_id][prod_id] can have at most C×P elements if all combinations exist. Also O(P) for the product name lookup.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the products table is very large (does not fit in memory)?  
  *Hint: Can you stream and only keep what's necessary for the orders being considered?*

- How to handle updates to the order table efficiently?  
  *Hint: Think of incremental counters or databases with triggers.*

- Return only the most popular product across all customers?  
  *Hint: Aggregate counts across all orders, not partitioned by customer.*

### Summary
This problem is a typical example of group-by aggregation and selecting items by max value (for each key). The pattern here is **map grouping + max extraction** (“top-k or most frequent per group”), commonly needed in analytics, logs, and recommendation systems. The imperative coding pattern (dictionary of counters per group) is broadly applicable in histogram and summary statistics tasks.

### Tags
Database(#database)

### Similar Problems
- The Most Recent Orders for Each Product(the-most-recent-orders-for-each-product) (Medium)