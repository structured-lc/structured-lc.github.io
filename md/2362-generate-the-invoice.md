### Leetcode 2362 (Hard): Generate the Invoice [Practice](https://leetcode.com/problems/generate-the-invoice)

### Description  
Given two tables, **Products** (`product_id`, `price`) and **Purchases** (`invoice_id`, `product_id`, `quantity`), generate the detail of the *single invoice* with the highest total price.  
For each product in that invoice, show `product_id`, `quantity`, and `quantity × price`.  
If multiple invoices have the same highest price, select the invoice with the smallest `invoice_id`.  
The tables can have multiple products and invoices and may contain repeated `invoice_id`s.

### Examples  

**Example 1:**  
Input:   
Products =  
| product_id | price |  
|------------|-------|  
| 1          | 100   |  
| 2          | 200   |  

Purchases =  
| invoice_id | product_id | quantity |  
|------------|------------|----------|  
| 1          | 1          | 2        |  
| 3          | 2          | 1        |  
| 2          | 2          | 3        |  
| 2          | 1          | 4        |  
| 4          | 1          | 10       |  

Output:  
| product_id | quantity | price |  
|------------|----------|-------|  
| 2          | 3        | 600   |  
| 1          | 4        | 400   |  

*Explanation:  
Invoice 2 has (2,3) ⇒ 3\*200=600 and (1,4) ⇒ 4\*100=400, total = 1000 (highest),  
So output its product breakdown.  
400 and 600 are individual product totals, not the invoice sum.*

**Example 2:**  
Input:  
Products =  
| product_id | price |  
|------------|-------|  
| 1          | 90    |  
| 2          | 120   |  

Purchases =  
| invoice_id | product_id | quantity |  
|------------|------------|----------|  
| 2          | 1          | 5        |  
| 2          | 2          | 1        |  
| 3          | 1          | 5        |  
| 3          | 2          | 1        |  

Output:  
| product_id | quantity | price |  
|------------|----------|-------|  
| 1          | 5        | 450   |  
| 2          | 1        | 120   |  

*Explanation:  
Invoice 2 and invoice 3 have identical products and amounts (5\*90+1\*120=570 for both),  
but smallest invoice_id is 2, so output invoice 2 details.*

**Example 3:**  
Input:  
Products =  
| product_id | price |  
|------------|-------|  
| 1          | 20    |  
| 2          | 50    |  

Purchases =  
| invoice_id | product_id | quantity |  
|------------|------------|----------|  
| 1          | 1          | 2        |  
| 2          | 2          | 1        |  

Output:  
| product_id | quantity | price |  
|------------|----------|-------|  
| 1          | 2        | 40    |  

*Explanation:  
Invoice 1: 2\*20=40  
Invoice 2: 1\*50=50  
Only invoice 2 has a higher price, so output invoice 2 details:  
| 2 | 1 | 50 |*

### Thought Process (as if you’re the interviewee)  

- First, the problem is about *joining* purchases with product data and grouping by `invoice_id`.
- For each invoice, calculate the total invoice price as sum of quantity × price for each purchased product.
- Find the highest invoice price; in case of ties, pick the smallest invoice_id.
- Once the target invoice is identified, output for each product in that invoice: product_id, quantity, and quantity × price.
- **Brute-force:** Go through all invoices, group by invoice_id, sum their price. Choose the right invoice, then list its purchases.  
  Not very efficient, but feasible as SQL query or with some Python grouping logic.
- **Optimal:**  
    - Step 1: INNER JOIN Purchases and Products to get price for each purchase.
    - Step 2: GROUP BY invoice_id, sum quantity×price.
    - Step 3: Pick invoice_id with highest total sum (if tie, pick smallest id).
    - Step 4: For that invoice_id, output each product's detail.

SQL is an ideal fit, but we can simulate the same with dicts in code.
  
### Corner cases to consider  
- Multiple invoices with same highest price (need to pick smallest id).
- An invoice with only 1 product (should still output that).
- Quantities or prices being zero.
- Empty Purchases (no output).
- Purchases for a product not in Products (should not happen per schema, but handle gracefully).
- Product purchased multiple times per invoice (need to sum correctly if grouping at product level).

### Solution

```python
# Simulate JOIN, aggregation, and selection manually, as in SQL.
# Assume input tables are given as lists of dicts or similar Python structures.

from typing import List, Dict

def generate_invoice(products: List[Dict], purchases: List[Dict]) -> List[Dict]:
    # Build product_id to price mapping
    product_price = {row['product_id']: row['price'] for row in products}
    
    # Build invoice_id -> list of purchases [(product_id, quantity)]
    invoices = {}
    for pur in purchases:
        inv = pur['invoice_id']
        invoices.setdefault(inv, []).append(pur)
    
    # For each invoice, sum up total
    invoice_totals = []
    for inv_id, items in invoices.items():
        total = 0
        # Sum up for this invoice
        for pur in items:
            pid = pur['product_id']
            qty = pur['quantity']
            price = product_price.get(pid, 0)
            total += qty * price
        invoice_totals.append((total, inv_id))
    
    # Find target invoice: max total, then min invoice_id
    if not invoice_totals:
        return []
    max_total = max(invoice_totals)[0]
    candidates = [inv_id for total, inv_id in invoice_totals if total == max_total]
    target_id = min(candidates)
    
    # Collect all product purchases for target_id
    result = []
    for pur in invoices[target_id]:
        pid = pur['product_id']
        qty = pur['quantity']
        price = product_price.get(pid, 0)
        result.append({
            'product_id': pid,
            'quantity': qty,
            'price': qty * price
        })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n + m), where n = #products, m = #purchases. Each step (dict building, grouping, summing) is linear in data size.  
  Sorting to get the invoice with smallest id, but since invoice_ids are limited, still ≈ O(m).

- **Space Complexity:**  
  O(n + m) for mapping products and collecting per-invoice purchases. Output size is at most m.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this if you needed to show *all* invoices, not just the highest-priced?
  *Hint: Return per-invoice breakdown, grouped by invoice_id.*

- What if you need to split by product category, or support multi-currency products?
  *Hint: Add extra columns in joins, group by more keys.*

- What if the input is streaming (i.e., purchases arrive in real time)?
  *Hint: Maintain a running sum per invoice, heap/priority queue for top invoice tracking.*

### Summary
This approach uses the common **relational grouping, sum-aggregation, and join pattern**, which is fundamental in SQL analytics and backend data aggregation. The core coding pattern is:  
- joining two tables by key,  
- aggregating by a group id,  
- and then filtering the "best" (max/min/tied) aggregate row for details.

This pattern is widely used for reporting, leaderboards, and summary statistics in business data applications.

### Tags
Database(#database)

### Similar Problems
