### Leetcode 2993 (Medium): Friday Purchases I [Practice](https://leetcode.com/problems/friday-purchases-i)

### Description  
Given a purchases table with columns: user_id, purchase_date, and amount_spend (with purchase dates strictly between November 1 and November 30, 2023), compute the **total amount spent by all users on each Friday, week by week**, for November 2023.

For each Friday with at least one purchase, return the **week of the month** (1-based, with the first week containing November 1), the purchase date (i.e., the Friday), and the summed amount spent that day. Output results ordered by week ascending.

### Examples  

**Example 1:**  
Input:  
Purchases table:
```
user_id | purchase_date | amount_spend
--------|--------------|--------------
    1   | 2023-11-03   |     50
    2   | 2023-11-03   |     30
    1   | 2023-11-10   |     10
    2   | 2023-11-24   |    100
```
Output:  
```
week_of_month | purchase_date | total_amount
--------------|--------------|-------------
      1       | 2023-11-03   |     80
      2       | 2023-11-10   |     10
      4       | 2023-11-24   |    100
```
*Explanation: Sum each Friday's amount by date; week 3 (Nov 17) had no purchases, so is skipped.*

**Example 2:**  
Input:  
Purchases table:
```
user_id | purchase_date | amount_spend
--------|--------------|--------------
    1   | 2023-11-10   |     20
    2   | 2023-11-10   |     35
    3   | 2023-11-17   |     45
```
Output:  
```
week_of_month | purchase_date | total_amount
--------------|--------------|-------------
      2       | 2023-11-10   |     55
      3       | 2023-11-17   |     45
```
*Explanation: Only Fridays with purchases appear, with amounts summed.*

**Example 3:**  
Input:  
Purchases table:
```
user_id | purchase_date | amount_spend
--------|--------------|--------------
    1   | 2023-11-03   |    25
    2   | 2023-11-24   |    35
    3   | 2023-11-24   |     5
```
Output:  
```
week_of_month | purchase_date | total_amount
--------------|--------------|-------------
      1       | 2023-11-03   |    25
      4       | 2023-11-24   |    40
```
*Explanation: Purchases are aggregated only for Fridays; other dates ignored.*

### Thought Process (as if you’re the interviewee)  
- First, clarify: We need, for November 2023, the total spending on each Friday (grouped by date), also showing which week-of-the-month the Friday falls in.
- **Brute-force idea:** For every row, check if purchase_date is a Friday, then figure out which week-of-the-month it belongs to, then sum purchases by (week_of_month, purchase_date).
- To optimize, we:
  - Use date manipulation to check if purchase_date is a Friday (in SQL: DAYOFWEEK = 6 for MySQL, as Sunday=1).
  - For the week-of-the-month: Subtract the "week number" of November 1 from the "week number" of this purchase date, add 1 for 1-based week index.
- We can do all this in one scan/group, so it's efficient.
- Choose this approach as it's both clear and efficient, and doesn't require extra data structures.
- In procedural code, filtering and grouping is just a matter of (a) date parsing, (b) date-to-week-of-month mapping, (c) aggregation.

### Corner cases to consider  
- No purchases on some Fridays: those Fridays don't appear in output.
- Purchases occur only on some Fridays: only list those.
- All purchases occur on a non-Friday: result is empty.
- Multiple purchases by different users on same Friday: must sum amounts correctly.
- November 1, 2023 is a Wednesday; week numbers must adjust accordingly.
- Rows with missing, out-of-November-2023, or invalid dates (should not exist as per constraints, but good to keep in mind in real settings).

### Solution

```python
from collections import defaultdict
from datetime import datetime, timedelta

def friday_purchases(purchases):
    """
    :param purchases: List of tuples (user_id, purchase_date:str, amount_spend:int)
    :return: List of tuples (week_of_month:int, purchase_date:str, total_amount:int)
    """
    # Define November 1, 2023
    NOV1 = datetime.strptime("2023-11-01", "%Y-%m-%d")
    result = defaultdict(int)  # key: (week_of_month, purchase_date), value: total_amount

    for user_id, date_str, amount_spend in purchases:
        date = datetime.strptime(date_str, "%Y-%m-%d")
        # Check if the date is a Friday (weekday: Monday=0,...,Friday=4,...,Sunday=6)
        if date.weekday() == 4:
            # Calculate ISO weekday week number, with Monday as the first day of the week
            week_of_month = ((date - NOV1).days // 7) + 1
            key = (week_of_month, date_str)
            result[key] += amount_spend

    # Sort by week_of_month ascending, as required
    output = sorted(
        [(week, date, total) for (week, date), total in result.items()],
        key=lambda x: x[0]
    )
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in purchases. Each purchase is visited once, with constant-time date math and hash insertion.
- **Space Complexity:** O(f), where f = number of unique (week_of_month, purchase_date) Fridays with purchases (at most 5 for November); plus input and normal function overhead.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the query spanned multiple months or years?
  *Hint: Think about generalizing the "week-of-the-month" formula beyond a fixed month/year.*
  
- How would you handle time zones or purchases registered at midnight UTC that are a different local date?
  *Hint: Talk about storing and converting timestamps correctly per user/timezone.*

- Suppose you need to report the data grouped by user as well?
  *Hint: Add user_id to the group-by key and adjust sum calculation accordingly.*

### Summary
This problem is an application of date manipulation, grouping, and aggregation—a classic data summarization pattern often used in analytics. The main patterns are hash-based aggregation and transforming dates into time buckets (weeks). This is common for sales analysis, scheduling, and reporting engines. Similar patterns arise in “group by week/day/month and sum values” scenarios, in both database queries and application code.