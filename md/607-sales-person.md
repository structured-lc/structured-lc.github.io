### Leetcode 607 (Easy): Sales Person [Practice](https://leetcode.com/problems/sales-person)

### Description  
Given three tables:
- **SalesPerson:** info about each salesperson (columns: sales_id, name, ...).
- **Company:** info about each company (company_id, name, ...).
- **Orders:** each order contains company_id, sales_id, and amount.

Task: *Find the names of salespeople who have not made any sales to the company named "RED".*  
That means, return all salespeople who have zero orders that link to any company called "RED".  
If a salesperson has orders, but never to "RED", include them.  
If a salesperson has no orders at all, also include them.

### Examples  

**Example 1:**  
Input:  
SalesPerson = `[{"sales_id": 1, "name": "Alice"}, {"sales_id": 2, "name": "Bob"}]`  
Company = `[{"company_id": 1, "name": "RED"}, {"company_id": 2, "name": "BLUE"}]`  
Orders = `[{"order_id": 1, "company_id": 2, "sales_id": 1, "amount": 300}]`  
Output: `["Alice", "Bob"]`  
*Explanation: Alice has only sold to BLUE, never to RED. Bob has no orders at all.*

**Example 2:**  
Input:  
SalesPerson = `[{"sales_id": 1, "name": "Alice"}, {"sales_id": 2, "name": "Bob"}]`  
Company = `[{"company_id": 1, "name": "RED"}, {"company_id": 2, "name": "BLUE"}]`  
Orders = `[{"order_id": 1, "company_id": 1, "sales_id": 1, "amount": 400}]`  
Output: `["Bob"]`  
*Explanation: Alice sold to RED, so she is not in the output. Bob has no orders, so he is included.*

**Example 3:**  
Input:  
SalesPerson = `[{"sales_id": 1, "name": "Alice"}]`  
Company = `[{"company_id": 1, "name": "RED"}]`  
Orders = `[]`  
Output: `["Alice"]`  
*Explanation: Alice has no orders, so she appears in the result.*

### Thought Process (as if you’re the interviewee)  

Start by understanding relationships:
- Each **Order** links a **SalesPerson** and a **Company**.
- We need salespeople who have **no orders with any company called "RED"**.

**Brute-force approach:**  
- For each salesperson, check all their orders.
- For each order, find its company — if it's "RED", exclude this salesperson.
- This would be slow for large datasets since it repeatedly scans orders and companies.

**Optimized approach:**  
- First, **precompute** the set of company_ids where the name is "RED".
- Then, scan the **Orders** table: for any order involving a "RED" company, mark that salesperson.
- At the end, output all salespeople whose id is **not** in the set of salespeople who have sold to "RED" companies.

**Why this way?**
- Only need to scan each data structure once.
- Set-based filtering is O(n + m + p), with n salespeople, m companies, p orders.
- Fast and readable.

### Corner cases to consider  
- No salespeople: output empty list.
- No companies: anyone with no orders is included.
- More than one company with name "RED".
- No orders at all: all salespeople included.
- Some salespeople have orders, others don’t.
- A salesperson made orders only to non-"RED" companies.

### Solution

```python
def sales_person_no_red(sales_person_list, company_list, orders_list):
    # Build a set of company_ids where the company name is "RED"
    red_company_ids = set()
    for company in company_list:
        if company["name"] == "RED":
            red_company_ids.add(company["company_id"])

    # Build set of sales_ids who have made *any* sale to "RED" company
    sales_with_red = set()
    for order in orders_list:
        if order["company_id"] in red_company_ids:
            sales_with_red.add(order["sales_id"])

    # Output: names for all salespeople not in sales_with_red
    result = []
    for person in sales_person_list:
        if person["sales_id"] not in sales_with_red:
            result.append(person["name"])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + p)  
  - n = number of salespeople  
  - m = number of companies  
  - p = number of orders  
  - Each step is a single pass over one of the lists.

- **Space Complexity:** O(n + m)  
  - O(m) for holding "RED" company ids.  
  - O(n) for storing the set of sales_ids and result.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return other attributes (like sales_id) instead of name?  
  *Hint: Adjust the result construction.*

- What if "RED" is case-insensitive, or could have trailing spaces?  
  *Hint: Use .strip().lower() for normalization.*

- What if companies are renamed and have audit logs?  
  *Hint: Would need a history/temporal join for companies’ names over time.*

### Summary
This is a classic “anti-join” problem: return records from one table not connected by a join to another table with a specific property.  
Pattern used: set filtering with precomputation.  
Common for SQL, analytics, and data-wrangling.  
The set-based pattern is broadly applicable in problems needing "who *hasn’t* done X", "exclude who matches Y" scenarios.

### Tags
Database(#database)

### Similar Problems
