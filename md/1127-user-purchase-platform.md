### Leetcode 1127 (Hard): User Purchase Platform [Practice](https://leetcode.com/problems/user-purchase-platform)

### Description  
Given a `Spending` table that tracks users' purchase amounts on either `desktop` or `mobile` platforms, for each unique `spend_date` and for each platform (`desktop`, `mobile`, or `both`), calculate:
- the **total amount spent** on that platform that day,
- and the **number of unique users** who only used *that* platform that day  
(all per date and per platform).  
A user who purchases on both desktop *and* mobile on the same day is only counted under the `both` platform on that date.  

### Examples  

**Example 1:**  
Input:  

Spending table:  
```
+---------+------------+----------+--------+
| user_id | spend_date | platform | amount |
+---------+------------+----------+--------+
| 1       | 2019-07-01 | mobile   | 100    |
| 1       | 2019-07-01 | desktop  | 100    |
| 2       | 2019-07-01 | mobile   | 100    |
| 2       | 2019-07-02 | mobile   | 100    |
| 3       | 2019-07-01 | desktop  | 100    |
| 3       | 2019-07-02 | mobile   | 100    |
+---------+------------+----------+--------+
```

Output:  
```
+------------+----------+-------------+------------+
| spend_date | platform | total_users | total_amount|
+------------+----------+-------------+------------+
| 2019-07-01 | both     | 1           | 200        |
| 2019-07-01 | desktop  | 1           | 100        |
| 2019-07-01 | mobile   | 1           | 100        |
| 2019-07-02 | mobile   | 2           | 200        |
+------------+----------+-------------+------------+
```
*Explanation:  
- On 2019-07-01:
    - User 1 used both platforms (counted under `both`: amount=200, users=1).
    - User 2 used only mobile (under `mobile`: amount=100, users=1).
    - User 3 used only desktop (under `desktop`: amount=100, users=1).
- On 2019-07-02:
    - User 2 and 3 used only mobile (under `mobile`: amount=200, users=2).*

**Example 2:**  
Input:  
```
+---------+------------+----------+--------+
| user_id | spend_date | platform | amount |
+---------+------------+----------+--------+
| 10      | 2024-05-10 | desktop  | 40     |
| 10      | 2024-05-10 | desktop  | 60     |
| 15      | 2024-05-10 | mobile   | 80     |
+---------+------------+----------+--------+
```
Output:  
```
+------------+----------+-------------+------------+
| spend_date | platform | total_users | total_amount|
+------------+----------+-------------+------------+
| 2024-05-10 | desktop  | 1           | 100        |
| 2024-05-10 | mobile   | 1           | 80         |
+------------+----------+-------------+------------+
```
*Explanation:  
- User 10 used only desktop, total=100, users=1.
- User 15 used only mobile, total=80, users=1.*

**Example 3:**  
Input:  
```
+---------+------------+----------+--------+
| user_id | spend_date | platform | amount |
+---------+------------+----------+--------+
| 1       | 2021-10-11 | desktop  | 10     |
| 1       | 2021-10-11 | mobile   | 30     |
| 2       | 2021-10-11 | desktop  | 10     |
+---------+------------+----------+--------+
```
Output:  
```
+------------+----------+-------------+------------+
| spend_date | platform | total_users | total_amount|
+------------+----------+-------------+------------+
| 2021-10-11 | both     | 1           | 40         |
| 2021-10-11 | desktop  | 1           | 10         |
+------------+----------+-------------+------------+
```
*Explanation:  
- User 1 used both == `both` (amount=40, users=1).
- User 2 used only desktop (amount=10, users=1).*

### Thought Process (as if you’re the interviewee)  
- Start by grouping the data by `user_id`, `spend_date`, and `platform` to know where and when users made purchases.
- For each `spend_date` and `user_id`, determine if they made purchases on:
    - Only one platform (counted under that platform)
    - Both platforms (counted under `both`)
- Use an aggregation to count desktop/mobile purchases per user per day:
    - If a user has entries for both platforms on a day, they belong to "both".
    - Else, "mobile" or "desktop".
- For each group of (spend_date, platform), count users and sum amounts:
    - Group and aggregate: sum of amount and count of unique user_id for each required platform.
- Combine these grouped results into the final result.

This problem is mostly about **correct grouping**, careful categorization, and aggregation.  
Brute-force would iterate over each user-date, collect all purchases, tag them to the right platform class, then aggregate.

Optimized approach uses:
- A subquery to categorize each (user_id, spend_date) as "mobile", "desktop", or "both".
- An outer query to aggregate and output per date and platform.

### Corner cases to consider  
- User makes no purchases: ignore in output.
- User makes purchases only on a single day.
- Multiple purchases on each platform in a day for a user (should sum up amounts).
- A day with only "both", only "mobile", only "desktop", or all combinations.
- No users in the input.

### Solution

```python
from collections import defaultdict

def user_purchase_platform(spending):
    # spending: List of dicts/tuples with keys: user_id, spend_date, platform, amount

    user_date_purchases = defaultdict(lambda: {"mobile": 0, "desktop": 0, "amounts": defaultdict(int)})

    # Step 1: For each purchase, aggregate per user_id per spend_date per platform
    for entry in spending:
        user_id = entry['user_id']
        date = entry['spend_date']
        platform = entry['platform']
        amount = entry['amount']
        user_date_purchases[(user_id, date)][platform] += amount
        user_date_purchases[(user_id, date)]["amounts"][platform] += amount

    # Step 2: Classify per user-date into 'mobile', 'desktop', or 'both'
    # For each (user_id, date), track type and amount
    platform_users = defaultdict(set)   # (date, platform) -> set of users
    platform_amounts = defaultdict(int) # (date, platform) -> total amount

    for (user_id, date), platforms in user_date_purchases.items():
        has_mobile = platforms.get('mobile', 0) > 0
        has_desktop = platforms.get('desktop', 0) > 0
        total_amount = sum(platforms["amounts"].values())
        if has_mobile and has_desktop:
            platform_key = 'both'
        elif has_mobile:
            platform_key = 'mobile'
        elif has_desktop:
            platform_key = 'desktop'
        else:
            continue # Defensive, but should not occur

        platform_users[(date, platform_key)].add(user_id)
        platform_amounts[(date, platform_key)] += total_amount

    # Step 3: Prepare and sort final output
    result = []
    for (date, platform) in sorted(platform_users.keys()):
        result.append({
            "spend_date": date,
            "platform": platform,
            "total_users": len(platform_users[(date, platform)]),
            "total_amount": platform_amounts[(date, platform)]
        })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of purchase records.  
  Each record is touched a constant number of times for aggregation and classification.
- **Space Complexity:** O(n), for storage in grouping dictionaries (in worst case: each purchase is by a unique user-date-platform).

### Potential follow-up questions (as if you’re the interviewer)  

- **What if we want the average spent per user per platform per day instead of the sum?**  
  *Hint: Track both sum and count, then output average as sum // count (integer division if required).*
  
- **How would you handle additional platforms, such as "tablet"?**  
  *Hint: Use sets to count how many unique platforms per user-day, label as "both" if >1 or enumerate all used platforms.*

- **What if user purchases are recorded in different timezones?**  
  *Hint: Consider normalizing times to UTC or user's preferred timezone before grouping.*

### Summary
This problem is about **grouping, classification, and aggregation**—core data summarization work, common in analytics and reporting systems.  
The approach generalizes to any case where you want to classify grouped transactions into exclusive buckets and aggregate them, seen often in SQL/report generation and data engineering.