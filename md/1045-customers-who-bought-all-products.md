### Leetcode 1045 (Medium): Customers Who Bought All Products [Practice](https://leetcode.com/problems/customers-who-bought-all-products)

### Description  
Given two tables:  
- **Customer(customer_id, product_key)** indicates which customer bought which product (with possible duplicates).
- **Product(product_key)** lists all available products.

Return the customer_id(s) for all customers who've bought *every* product available in the Product table — not just some, but all. That is, for each customer, if their set of purchased products covers the whole Product table, include their customer_id.

### Examples  

**Example 1:**  
Input:  
Customer =  
| customer_id | product_key |
|-------------|-------------|
| 1           | 5           |
| 2           | 6           |
| 3           | 5           |
| 3           | 6           |
| 1           | 6           |

Product =  
| product_key |
|-------------|
| 5           |
| 6           |

Output: `1, 3`  
*Explanation:*
- Customer 1 bought 5 and 6.
- Customer 3 bought 5 and 6.
- Customer 2 bought only 6.
- Products available: 5, 6.
- Customers 1 and 3 bought **all products**.

**Example 2:**  
Input:  
Customer =  
| customer_id | product_key |
|-------------|-------------|
| 2           | 6           |
| 5           | 7           |

Product =  
| product_key |
|-------------|
| 6           |
| 7           |

Output: (empty)  
*Explanation:*
- Customer 2 bought only product 6.
- Customer 5 bought only product 7.
- No customer bought both (all) products.

**Example 3:**  
Input:  
Customer =  
| customer_id | product_key |
|-------------|-------------|
| 1           | 1           |
| 1           | 2           |
| 1           | 3           |

Product =  
| product_key |
|-------------|
| 1           |
| 2           |
| 3           |

Output: `1`  
*Explanation:*
- Only customer 1 exists.
- Customer 1 bought all 3 products.

### Thought Process (as if you’re the interviewee)  
- First, understand the goal: find all customers who have purchased **each** product in the Product table.
- Brute-force idea: For each customer, collect the set of `product_key` they've bought, and compare it against the full set from the Product table. If their set matches, they qualify.
- Optimization:
  - Since Product is typically small in SQL problems, count the number of *distinct* products in the Product table, say `k`.
  - For each customer_id, count the number of *distinct* products they've purchased.
  - If a customer's distinct product count matches the total from Product, they must have purchased all products.
  - This avoids set comparisons and can be done efficiently with GROUP BY and HAVING.
- This is efficient, avoids explicit joins, and leverages SQL's aggregation.

### Corner cases to consider  
- Customer table is empty.
- Product table is empty (in practice, result should be empty).
- One customer has duplicate purchases for the same product.
- Customer who bought extra (non-existent) product_key (shouldn’t occur, but if so, ignore).
- All customers have bought none or only some products.
- Product table with only one product.
- Large number of customers, small number of products.

### Solution

```python
# Since this is natively a SQL problem, here's how you'd simulate the logic in Python

def customers_who_bought_all_products(customers, products):
    # Create a set of all product_keys
    product_keys = set(products)
    total_products = len(product_keys)
    
    # Map customer_id -> set of purchased product_keys
    from collections import defaultdict
    cust_products = defaultdict(set)
    for cust_id, prod_key in customers:
        cust_products[cust_id].add(prod_key)
    
    # Collect customer_id where purchased set == product set
    result = []
    for cust_id, keys in cust_products.items():
        if len(keys & product_keys) == total_products:  # Only count products in Product table
            result.append(cust_id)
    
    # Return in any order
    return result

# Example usage:
# customers = [(1,5), (2,6), (3,5), (3,6), (1,6)]
# products = [5,6]
# print(customers_who_bought_all_products(customers, products))  # Output: [1,3]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k)
  - n = number of rows in Customer table
  - k = number of product_keys in Product table
  - Scanning products: O(k). Building customer→products mapping: O(n). Final per-customer scan: O(#customers).
- **Space Complexity:** O(n + k)
  - O(k) for storing product_keys
  - O(n) in the worst case for per-customer sets (if each customer buys many products).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the product list grows to thousands of products?
  *Hint: Could the intermediate data structures become too large? How to optimize query plans for scale?*

- How can we include more customer statistics, e.g., number of products bought, or "bought all except one" customers?
  *Hint: Additional columns or modifications in the HAVING clause or including counts in SELECT.*

- How to extend for a time window, e.g., only consider purchases in the last year?
  *Hint: Require additional columns (like purchase_date) and filtering (WHERE clause) before grouping.*

### Summary
This problem uses the common SQL pattern of GROUP BY, COUNT(DISTINCT ...), and HAVING to solve set-completeness queries. The key insight is converting the "all products" requirement into a simple count comparison for each customer. This idiom can be applied to many similar business questions—e.g., users who completed all required steps, students who finished all assignments, etc.