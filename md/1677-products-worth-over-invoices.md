### Leetcode 1677 (Easy): Product's Worth Over Invoices [Practice](https://leetcode.com/problems/products-worth-over-invoices)

### Description  
Given two tables, **Product** and **Invoice**:
- Product(product_id, name)
- Invoice(invoice_id, product_id, rest, paid, cancelled, refunded)

Write a SQL query to display for each product name:
- the total sum of 'rest', 'paid', 'cancelled', and 'refunded' values over all related invoices,
- group results by product name,
- return zero if a product has no corresponding invoices,
- order the results by product name.

### Examples  

**Example 1:**  
Input: 
Product: 
| product_id | name  |
|---|---|
| 0 | Ham  |
| 1 | Bacon |

Invoice: 
| invoice_id | product_id | rest | paid | cancelled | refunded |
|---|---|---|---|---|---|
| 101 | 0 | 10 | 3 | 1 | 2 |
| 102 | 1 | 2  | 1 | 1 | 1 |
| 103 | 1 | 5  | 2 | 0 | 2 |

Output: 
| name  | rest | paid | cancelled | refunded |
|---|---|---|---|---|
| Bacon | 7 | 3 | 1 | 3 |
| Ham   | 10| 3 | 1 | 2 |
*Explanation: 'Bacon' (id=1): sum of invoices (2+5 rest, 1+2 paid, 1+0 cancelled, 1+2 refunded). 'Ham' only has one invoice.*

**Example 2:**  
Input: 
Product: 
| product_id | name  |
|---|---|
| 0 | Ham  |
| 1 | Bacon |
| 2 | Cheese |

Invoice: 
| invoice_id | product_id | rest | paid | cancelled | refunded |
|---|---|---|---|---|---|
| 101 | 0 | 7 | 2 | 0 | 2 |
| 107 | 1 | 1 | 1 | 0 | 0 |

Output: 
| name  | rest | paid | cancelled | refunded |
|---|---|---|---|---|
| Bacon | 1 | 1 | 0 | 0 |
| Cheese| 0 | 0 | 0 | 0 |
| Ham   | 7 | 2 | 0 | 2 |
*Explanation: 'Cheese' has no invoice, so all sums are zero. Output is ordered by name.*

**Example 3:**  
Input: 
Product: 
| product_id | name  |
|---|---|
| 0 | Banana |
Invoice: (empty)

Output:
| name   | rest | paid | cancelled | refunded |
|---|---|---|---|---|
| Banana| 0   | 0 | 0 | 0 |
*Explanation: No invoices at all – output zeros for the product.*


### Thought Process (as if you’re the interviewee)  
- Need to join Product and Invoice tables to sum up the four invoice fields grouped by product name.
- **LEFT JOIN** Product to Invoice: ensures products with no invoices are included with zeros.
- Use **COALESCE()** to convert NULL sums to 0 (for products with no invoices).
- GROUP BY product name; SUM the invoice fields. 
- ORDER BY product name for lex order.


### Corner cases to consider  
- Products with no invoices (should get zeros).  
- Invoice table can be empty.  
- Multiple invoices for the same product (aggregate sums correctly).  
- All values for invoice columns are zero.  
- Product names with same or mixed case.


### Solution

```sql
SELECT
    p.name AS name,
    COALESCE(SUM(i.rest), 0) AS rest,
    COALESCE(SUM(i.paid), 0) AS paid,
    COALESCE(SUM(i.cancelled), 0) AS cancelled,
    COALESCE(SUM(i.refunded), 0) AS refunded
FROM Product p
LEFT JOIN Invoice i
    ON p.product_id = i.product_id
GROUP BY p.name
ORDER BY p.name;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of rows in Invoice. SINGLE pass with grouping per product.
- **Space Complexity:** O(M), where M is the number of unique product names (for grouping output).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you return only products with non-zero totals?
  *Hint: Add a HAVING clause after aggregation.*

- What if you need both product_id and name in output?
  *Hint: Select p.product_id in SELECT and GROUP BY.*

- How would you optimize for very large tables?
  *Hint: Use indexes on product_id.*

### Summary
Uses classic SQL aggregation and JOINs, useful for any data summarization tasks. Common GROUP BY and LEFT JOIN anti-pattern for including rows with no relationship in the secondary table. Also illustrates COALESCE for null handling, important in reporting scenarios.


### Flashcard
Product's Worth Over Invoices

### Tags
Database(#database)

### Similar Problems
