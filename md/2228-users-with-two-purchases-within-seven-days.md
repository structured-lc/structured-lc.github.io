### Leetcode 2228 (Medium): Users With Two Purchases Within Seven Days [Practice](https://leetcode.com/problems/users-with-two-purchases-within-seven-days)

### Description  
Given a **Purchases** table with columns `purchase_id`, `user_id`, and `purchase_date`, find the **user_id**s of users who made any two purchases within a 7-day period (inclusive). That is, for each user, if there exist two purchases where the purchase dates are at most 7 days apart, include that user's ID in the output.

### Examples  

**Example 1:**  
Input:  
Purchases =  
```
+-------------+---------+---------------+
| purchase_id | user_id | purchase_date |
+-------------+---------+---------------+
|      1      |   5     | 2022-02-11    |
|      2      |   2     | 2022-06-08    |
|      3      |   7     | 2022-06-19    |
|      4      |   2     | 2022-03-13    |
|      5      |   7     | 2022-06-19    |
|      6      |   2     | 2022-03-20    |
+-------------+---------+---------------+
```
Output:  
```
+---------+
| user_id |
+---------+
|   2     |
|   7     |
+---------+
```
Explanation.  
- User 2 has purchases on 2022-03-13 and 2022-03-20, which are 7 days apart.  
- User 7 has two purchases on 2022-06-19 (same day, so 0 days apart).  
- User 5 only has one purchase, so is not included.

**Example 2:**  
Input:  
Purchases =  
```
+-------------+---------+---------------+
| purchase_id | user_id | purchase_date |
+-------------+---------+---------------+
|     10      |   1     | 2022-01-01    |
|     20      |   1     | 2022-01-10    |
|     30      |   1     | 2022-01-18    |
|     40      |   2     | 2022-07-01    |
|     50      |   2     | 2022-08-01    |
+-------------+---------+---------------+
```
Output:  
```
+---------+
| user_id |
+---------+
|   1     |
+---------+
```
Explanation.  
- User 1: 2022-01-01 and 2022-01-10 are 9 days apart (not included), 2022-01-10 and 2022-01-18 are 8 days apart (not included). No pair is ≤ 7 days apart, so no output.
- However, if same-day purchases occurred, they would be included.
- No user qualifies here, so output would be empty.

**Example 3:**  
Input:  
Purchases =  
```
+-------------+---------+---------------+
| purchase_id | user_id | purchase_date |
+-------------+---------+---------------+
|     11      |   1     | 2023-05-01    |
|     12      |   1     | 2023-05-08    |
|     13      |   1     | 2023-05-15    |
+-------------+---------+---------------+
```
Output:  
```
+---------+
| user_id |
+---------+
|   1     |
+---------+
```
Explanation.  
- User 1 has purchases on 2023-05-01 and 2023-05-08 (exactly 7 days apart).  
- So user 1 is included.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Compare every pair of purchases for each user, check if date difference is ≤ 7. This is O(n²) per user—not scalable for most interview scenarios.

- **Optimization:**  
  - Sort purchases for each user by date.
  - Iterate through the sorted list and compare adjacent purchases: if the date difference is ≤ 7, include user.
  - For non-consecutive pairs, a sliding window could be used, but since only two purchases are required, consecutive is sufficient.
  - Use a set or hash table to store qualifying user IDs (no duplicates).
  - This is O(n log n + n) per user due to sorting and linear scan, or overall O(N log N) if all purchases are sorted by user and then scanned.

- **SQL Implementation:**  
  - Use window functions (e.g., LAG) to compare each purchase date with the previous one, per user.
  - Return user IDs where the difference is ≤ 7.
  - Always DISTINCT the result to avoid duplicates.

### Corner cases to consider  
- Users with only one purchase (should not be included).
- Multiple purchases on the same day (date difference 0, should be included).
- Purchases out of chronological order (must sort before comparing).
- Users with multiple qualifying pairs (should only appear once).
- Empty Purchases table.
- Large gaps between some purchases (should not count unless some pair is ≤ 7 days apart).

### Solution

```python
from collections import defaultdict

def users_with_two_purchases_within_seven_days(purchases):
    # purchases: List of (purchase_id, user_id, purchase_date) tuples
    # purchase_date as datetime.date (or string 'YYYY-MM-DD')
    
    from datetime import datetime

    # Step 1: Group purchases by user_id
    user_purchases = defaultdict(list)
    for pid, uid, pdate in purchases:
        # Convert date string to datetime.date object
        if isinstance(pdate, str):
            pdate = datetime.strptime(pdate, "%Y-%m-%d").date()
        user_purchases[uid].append(pdate)
    
    result = set()

    # Step 2: For each user, sort their dates and check adjacent pairs
    for uid, dates in user_purchases.items():
        dates.sort()
        for i in range(1, len(dates)):
            diff = (dates[i] - dates[i-1]).days
            if diff <= 7:
                result.add(uid)
                break  # Only need to find one such pair
    
    # Step 3: Return sorted list (as per output requirement)
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N), where N is the number of purchases.  
  - Each user's purchases are sorted (potentially O(M log M) per user, M = #purchases for user).  
  - The rest is linear in total number of purchases.

- **Space Complexity:**  
  O(N) for storing all purchases in the grouping structure, plus O(U) for the result set (U = #users).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle three or more purchases within a 7-day window?
  *Hint: Try sliding window to check if there are k purchases in a 7-day span.*

- If purchase_date times are not unique per user (multiple per day), does the logic change?
  *Hint: Ensure same-day pairs are counted (diff = 0), treat all as valid pairs.*

- What if purchase_dates are not normalized (different formats/timezones)?
  *Hint: Consider canonicalizing date strings to date objects before comparisons.*

### Summary
This problem uses **group by**, **sorting**, and **adjacent element comparison**—a common interview pattern for interval-based or difference problems. The optimized approach reduces the brute-force O(n²) idea to O(n log n) for practical scalability and leverages data grouping and windowing, which are transferable to "find k events in d days", time series analytics, and similar data processing tasks.


### Flashcard
Sort each user’s purchases by date, then check consecutive pairs for ≤7 day difference.

### Tags
Database(#database)

### Similar Problems
- Biggest Window Between Visits(biggest-window-between-visits) (Medium)