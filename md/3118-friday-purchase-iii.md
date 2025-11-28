### Leetcode 3118 (Medium): Friday Purchase III  [Practice](https://leetcode.com/problems/friday-purchase-iii)

### Description  
Given two tables: **Purchases** (user_id, purchase_date, amount_spend) and **Users** (user_id, membership), write a query to calculate, **for each Friday in November 2023**, the total amount spent on that Friday by Premium and VIP users (listed separately). If a Friday/week has no purchases for a membership type, output 0 for that entry. Output columns should be: week_of_month (1-based: 1 for 1st Fri, etc.), membership (Premium/VIP), and total_amount, sorted by week_of_month and then membership.

### Examples

**Example 1:**  
Input:  
Purchases =  
```
| user_id | purchase_date | amount_spend |
|---------|--------------|--------------|
| 11      | 2023-11-03   | 1126         |
| 15      | 2023-11-10   | 7473         |
| 17      | 2023-11-17   | 2414         |
| 12      | 2023-11-24   | 9692         |
| 8       | 2023-11-24   | 5117         |
| 1       | 2023-11-24   | 5241         |
```
Users =  
```
| user_id | membership |
|---------|------------|
| 11      | Premium    |
| 15      | VIP        |
| 17      | Standard   |
| 12      | VIP        |
| 8       | Premium    |
| 1       | VIP        |
```
Output:  
```
| week_of_month | membership | total_amount |
|--------------|------------|--------------|
| 1            | Premium    | 1126         |
| 1            | VIP        | 0            |
| 2            | Premium    | 0            |
| 2            | VIP        | 7473         |
| 3            | Premium    | 0            |
| 3            | VIP        | 0            |
| 4            | Premium    | 5117         |
| 4            | VIP        | 14933        |
```
*Explanation:  
- On Friday 2023-11-03 (week 1): Premium spent 1126; VIP spent 0.  
- On Friday 2023-11-10 (week 2): VIP spent 7473; Premium spent 0.*  
- On Friday 2023-11-17 (week 3): No Premium or VIP purchase ⇒ both are 0.  
- On Friday 2023-11-24 (week 4): Premium spent 5117; VIP users spent 9692 + 5241 = 14933.  

**Example 2:**  
Input:  
Purchases =  
```
| user_id | purchase_date | amount_spend |
|---------|--------------|--------------|
| 20      | 2023-11-10   | 1000         |
```
Users =  
```
| user_id | membership |
|---------|------------|
| 20      | VIP        |
```
Output:  
```
| week_of_month | membership | total_amount |
|--------------|------------|--------------|
| 1            | Premium    | 0            |
| 1            | VIP        | 0            |
| 2            | Premium    | 0            |
| 2            | VIP        | 1000         |
| 3            | Premium    | 0            |
| 3            | VIP        | 0            |
| 4            | Premium    | 0            |
| 4            | VIP        | 0            |
```
*Explanation:  
- Only a VIP purchase on week 2; all other cells are 0 (must output all weeks × both memberships).*

**Example 3:**  
Input:  
Purchases =  
(empty table for November Fridays)  
Users =  
(any, irrelevant since no purchases)  
Output:  
```
| week_of_month | membership | total_amount |
|--------------|------------|--------------|
| 1            | Premium    | 0            |
| 1            | VIP        | 0            |
| 2            | Premium    | 0            |
| 2            | VIP        | 0            |
| 3            | Premium    | 0            |
| 3            | VIP        | 0            |
| 4            | Premium    | 0            |
| 4            | VIP        | 0            |
```
*Explanation:  
- No Friday purchases for any membership ⇒ output all combinations with totals 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  The naive idea is to find, for each Friday in November 2023, all purchases, join to users, and sum amounts for each membership. But if a particular week has no purchases for some group, it won’t return those rows.

- For the missing combinations, need to **cross-join** all possible Fridays in November with the Premium/VIP types (even if there's no data for them). Then **LEFT JOIN** actual purchases to this template and replace missing sums with 0.

- **Steps:**  
  - Generate the list of all Fridays in November 2023 (i.e., 2023-11-03, 2023-11-10, 2023-11-17, 2023-11-24).
  - Map each to week_of_month (1–4).
  - Make all possible (week_of_month, membership) pairs (“Premium”, “VIP”).
  - For each Friday, join Purchases and Users, grouping by week and membership; sum amounts.
  - Outer-join the grouped results with the full list of pairs, fill NULL with 0.

- **Trade-offs:**  
  - This approach guarantees all weeks & both membership outputs (satisfies the leetcode output requirement).
  - It handles empty/weird data and produces the full cross-product.

### Corner cases to consider  
- Some Fridays have no purchases (`total_amount` should be 0 for both memberships).
- Only Standard members purchase (should not appear in final output).
- All purchases from Premium, none from VIP (and vice versa).
- Purchases on non-Friday dates in November (should be excluded).
- Purchases outside November 2023 (ignore).
- Multiple purchases per user per Friday.
- Multiple purchases by same membership per Friday (must sum together).
- Purchases or users tables being empty.

### Solution

```python
# Let's assume we are asked to implement this in Python with an in-memory representation of the tables.
# We'll use standard lists and dicts for an 'interview' style implementation.

from datetime import datetime, timedelta

def friday_purchase_iii(purchases, users):
    # purchases: List[Dict] with keys 'user_id', 'purchase_date', 'amount_spend'
    # users: List[Dict] with keys 'user_id', 'membership'
    
    # Step 1: Find all Fridays in November 2023
    fridays = []
    dt = datetime(2023, 11, 1)
    while dt.month == 11:
        if dt.weekday() == 4:  # 4 = Friday
            fridays.append(dt.date())
        dt += timedelta(days=1)
    week_of_month_for_date = {date: i+1 for i, date in enumerate(fridays)}
    
    # Step 2: Prepare membership mapping, only Premium and VIP
    membership_for_user = {}
    for u in users:
        if u['membership'] in ('Premium', 'VIP'):
            membership_for_user[u['user_id']] = u['membership']
    
    # Step 3: Aggregate purchases by week and membership
    agg = {(w, m): 0 for w in range(1, 5) for m in ('Premium', 'VIP')}
    for p in purchases:
        date = datetime.strptime(p['purchase_date'], '%Y-%m-%d').date()
        # Only count if it's a Friday in Nov 2023, by Premium or VIP
        if date in week_of_month_for_date:
            user_id = p['user_id']
            mem = membership_for_user.get(user_id)
            if mem:
                week = week_of_month_for_date[date]
                agg[(week, mem)] += p['amount_spend']
    
    # Step 4: Output the result as sorted list of rows
    result = []
    for week in range(1, 5):
        for mem in ('Premium', 'VIP'):
            result.append({
                "week_of_month": week,
                "membership": mem,
                "total_amount": agg[(week, mem)]
            })
    return result

# Example usage:
purchases = [
    {"user_id": 11, "purchase_date": "2023-11-03", "amount_spend": 1126},
    {"user_id": 15, "purchase_date": "2023-11-10", "amount_spend": 7473},
    {"user_id": 17, "purchase_date": "2023-11-17", "amount_spend": 2414},
    {"user_id": 12, "purchase_date": "2023-11-24", "amount_spend": 9692},
    {"user_id": 8,  "purchase_date": "2023-11-24", "amount_spend": 5117},
    {"user_id": 1,  "purchase_date": "2023-11-24", "amount_spend": 5241},
]
users = [
    {"user_id": 11, "membership": "Premium"},
    {"user_id": 15, "membership": "VIP"},
    {"user_id": 17, "membership": "Standard"},
    {"user_id": 12, "membership": "VIP"},
    {"user_id": 8,  "membership": "Premium"},
    {"user_id": 1,  "membership": "VIP"},
]
print(friday_purchase_iii(purchases, users))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + U), where N = #purchases, U = #users. Aggregation and membership mapping are linear; determining all Fridays is constant (at most 5).
- **Space Complexity:** O(U + 8), where U is for user_id→membership and 8 for (4 weeks × 2 membership) output aggregate cells.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to include "Standard" members too?  
  *Hint: The same aggregation, but cross-join with "Standard" as well.*

- How to adjust if the definition of "week" changes (ex: weeks start Sunday-Saturday)?  
  *Hint: Compute week_of_month dynamically for any given Friday date.*

- How would you handle months with 5 Fridays?  
  *Hint: Use a flexible "find all Fridays" approach and dynamically size output cross-join.*

### Summary
This problem is a classic example of **pivoting with grouping over a template/cross-product**, ensuring all (category, time) pairs appear—even if not present in the data. The aggregation and cross-join pattern appears in report queries, data cubes, and analytics generally. It's also common in SQL ("generate all combinations and outer join"), log analytics, or time-series summary dashboards.


### Flashcard
Cross-join all Fridays in November 2023 with membership types (Premium/VIP). LEFT JOIN actual purchases and aggregate amounts, replacing NULLs with 0.

### Tags
Database(#database)

### Similar Problems
