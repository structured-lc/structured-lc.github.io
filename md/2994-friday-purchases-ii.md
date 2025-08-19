### Leetcode 2994 (Hard): Friday Purchases II  [Practice](https://leetcode.com/problems/friday-purchases-ii)

### Description  
Given a `Purchases` table recording each purchase in November 2023 (with columns: `user_id`, `purchase_date`, and `amount_spend`), write a SQL query to calculate the **total spending by users on each Friday** of **every week** in **November 2023**.  
For a Friday without any purchases, report `0` spent.
Output the **week of month** (starting from 1), the **date of the Friday**, and the **total amount spent** for each Friday, ordered by week.

### Examples  

**Example 1:**  
Input:  
Purchases:  
| user_id | purchase_date | amount_spend |
|---------|---------------|--------------|
| 11      | 2023-11-03    | 1126         |
| 15      | 2023-11-10    | 7473         |
| 17      | 2023-11-17    | 2414         |
| 12      | 2023-11-24    | 9692         |
| 8       | 2023-11-24    | 5117         |
| 1       | 2023-11-24    | 5241         |

Output:  
| week_of_month | purchase_date | total_amount |
|--------------|---------------|-------------|
| 1            | 2023-11-03    | 1126        |
| 2            | 2023-11-10    | 7473        |
| 3            | 2023-11-17    | 2414        |
| 4            | 2023-11-24    | 20050       |

*Explanation:  
Week 1: Only purchase on 2023-11-03 (Fri): 1126  
Week 2: Only purchase on 2023-11-10 (Fri): 7473  
Week 3: Only purchase on 2023-11-17 (Fri): 2414  
Week 4: Purchases on 2023-11-24 add up to 9692+5117+5241=20050*  

**Example 2:**  
Input:  
Purchases:  
| user_id | purchase_date | amount_spend |
|---------|---------------|--------------|

(Output assumed: no purchases in November)

Output:  
| week_of_month | purchase_date | total_amount |
|--------------|---------------|-------------|
| 1            | 2023-11-03    | 0           |
| 2            | 2023-11-10    | 0           |
| 3            | 2023-11-17    | 0           |
| 4            | 2023-11-24    | 0           |

*Explanation:  
All Fridays have no purchases, so total_amount is 0 for each.*  

**Example 3:**  
Input:  
Purchases:  
| user_id | purchase_date | amount_spend |
|---------|---------------|--------------|
| 21      | 2023-11-10    | 2500         |

Output:  
| week_of_month | purchase_date | total_amount |
|--------------|---------------|-------------|
| 1            | 2023-11-03    | 0           |
| 2            | 2023-11-10    | 2500        |
| 3            | 2023-11-17    | 0           |
| 4            | 2023-11-24    | 0           |

*Explanation:  
Only the second Friday (2023-11-10) has a purchase. Other Fridays reported as 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  For every day in November 2023, check if it’s a Friday, sum purchases for that date, and output even if there are none.
  This requires generating all Fridays in November and joining them with Purchases.

- **Optimization:**  
  - Generate all Fridays using a date generator (recursive CTE in SQL, or manual list if not SQL).  
  - Use `LEFT JOIN` so that missing Fridays appear with SUM 0.
  - For each Friday, sum the `amount_spend` for that day.
  - Calculate the “week of month” — either via date math (ceil(day_of_month/7)) or precompute.

- **Why this approach:**  
  - It provides results for all Fridays (including those with zero purchases).
  - Uses only simple joins and aggregation — efficient for a fixed month.
  - Avoids O(n²) or extra logic as number of Fridays in a month is always ≤5.

### Corner cases to consider  
- Purchases table is empty: Output must list all Fridays with `0`.
- Fridays with no purchases at all: Should appear with `0`.
- Multiple purchases on same Friday: Should sum for the day.
- November with 4 or 5 Fridays (Nov 2023 has 4).
- Purchases on other weekdays: Should not be counted.

### Solution

```python
# This is a SQL-focused question, but if we algorithmically generated the answer in Python:
from datetime import date, timedelta
from collections import defaultdict

def friday_purchases_ii(purchases):
    # purchases: list of tuples (user_id, purchase_date(str yyyy-mm-dd), amount_spend)
    # Step 1: Generate all Fridays in November 2023
    start = date(2023, 11, 1)
    end = date(2023, 11, 30)
    fridays = []
    d = start
    while d <= end:
        if d.weekday() == 4:  # Friday is weekday 4
            fridays.append(d)
        d += timedelta(days=1)
    # Step 2: Sum up purchases for each Friday
    date_to_sum = defaultdict(int)
    for _, purchase_date, amount_spend in purchases:
        pdate = date.fromisoformat(purchase_date)
        if pdate in fridays:
            date_to_sum[pdate] += amount_spend
    # Step 3: Format results: week_of_month, purchase_date, total_amount
    res = []
    for i, friday in enumerate(fridays):
        week_of_month = i+1
        total_amount = date_to_sum.get(friday, 0)
        res.append((week_of_month, friday.isoformat(), total_amount))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k + n),  
  where k = number of Friday dates (≤5),  
  n = number of purchases.  
  All work is linear in size of input.
- **Space Complexity:** O(k),  
  For storing Friday-to-sum map and the result list (k is a constant for November).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the month or year were dynamic (not always November 2023)?  
  *Hint: Make date generation dynamic—find first and last day, then scan for Fridays in that range.*

- What if we wanted to count unique users who made a purchase each Friday, not total amount?  
  *Hint: Instead of sum, aggregate using set or count distinct user_id per date.*

- Could you optimize this for a very large Purchases table?  
  *Hint: Index Purchases on purchase_date, use database-level batch aggregation, avoid scanning irrelevant dates.*

### Summary
This problem uses the **date generation + left join + group by** coding pattern, common in reporting and event-tracking databases.  
The core pattern—generating all required output records (dates), left joining facts (Purchases), and aggregating—appears in many analytic/reporting applications (attendance, sales reports, etc.), regardless of whether solving in SQL or a programming language.

### Tags
Database(#database)

### Similar Problems
