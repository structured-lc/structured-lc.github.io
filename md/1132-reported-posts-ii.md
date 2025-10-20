### Leetcode 1132 (Medium): Reported Posts II [Practice](https://leetcode.com/problems/reported-posts-ii)

### Description  
Given two tables, **Actions** and **Removals**, write a SQL query to find the average daily percentage of posts that got removed *after* being reported as spam for each day.  
- The **Actions** table keeps track of user interactions with posts (view, like, share, report).  
- Each *report* action has an *extra* field which could be types like "spam" or "racism".  
- The **Removals** table indicates posts that were actually removed and the date of removal.  

For each day, calculate:
- The percentage of posts reported as *spam* that were later removed (regardless of removal date).
- Finally, return the **average** of these daily percentages, rounded to two decimal places.

### Examples  

**Example 1:**  
Input:  
Actions table:  
|user_id|post_id|action_date|action|extra|
|---|---|---|---|---|
|2|2|2019-07-04|report|spam|
|3|4|2019-07-04|report|spam|
|4|3|2019-07-02|report|spam|
|5|2|2019-07-03|report|racism|

Removals table:  
|post_id|remove_date|
|---|---|
|2|2019-07-20|
|3|2019-07-18|

Output:  
`75.00`  
*Explanation:  
- **2019-07-02**: only post 3 was reported as spam, and post 3 was removed ⇒ 100%.  
- **2019-07-04**: posts 2 and 4 were reported as spam (post 2 was later removed, post 4 was not) ⇒ (1/2) × 100 = 50%.  
- Average percentage = (100 + 50) / 2 = 75.00.*

**Example 2:**  
Input:  
Actions table:  
|user_id|post_id|action_date|action|extra|
|---|---|---|---|---|
(empty)

Removals table:  
|post_id|remove_date|
|---|---|
(empty)

Output:  
`null`  
*Explanation: No posts reported as spam, so no average to compute.*

**Example 3:**  
Input:  
Actions table:  
|user_id|post_id|action_date|action|extra|
|---|---|---|---|---|
|1|10|2020-01-01|report|spam|

Removals table:  
|post_id|remove_date|
|---|---|
|10|2020-01-10|

Output:  
`100.00`  
*Explanation:  
On 2020-01-01, one post was reported as spam and it was removed, so daily percentage is 100%. Average is 100.00.*

### Thought Process (as if you’re the interviewee)  

- Begin by filtering **Actions** for rows where action = 'report' and extra = 'spam'.
- For each reporting action, consider only the first report per post per day (use DISTINCT on action_date and post_id).
- For each day:
  - **Denominator:** The count of unique posts reported as spam.
  - **Numerator:** Number of those posts that exist in the **Removals** table (were eventually removed, regardless of when).
- For each day, calculate the daily percentage: numerator / denominator × 100.
- At the end, compute the average of these percentages across days, rounded to two decimals.
- Watch for edge cases: days with no spam reports (shouldn't be included), possible duplicate reports on same post, posts removed on a different date.

### Corner cases to consider  
- Actions table is empty.
- No reports with extra = 'spam'.
- Posts reported as spam, but none ever removed.
- Multiple reports for same post on the same day (should only count post once per day).
- All posts reported as spam are eventually removed.
- Posts removed *before* or *after* action_date.

### Solution

```python
# Note: For SQL, but Python pseudocode here for illustration.

def average_daily_percentage_reported_removed(actions, removals):
    # Step 1: Find all (action_date, post_id) pairs where a post is reported as spam
    reported_spam = set()
    for row in actions:
        if row['action'] == 'report' and row['extra'] == 'spam':
            reported_spam.add( (row['action_date'], row['post_id']) )
    
    # Build set of removed post_ids
    removed_posts = set()
    for row in removals:
        removed_posts.add(row['post_id'])
    
    # Step 2: Group reported_spam by action_date.
    from collections import defaultdict
    daily_posts = defaultdict(set)
    for dt, pid in reported_spam:
        daily_posts[dt].add(pid)
    
    # Step 3: For each day, calculate percentage of reported posts that were removed
    percentages = []
    for d, posts in daily_posts.items():
        total = len(posts)
        removed = sum(1 for pid in posts if pid in removed_posts)
        percent = removed * 100 / total
        percentages.append(percent)
    
    # Step 4: Return the average rounded to 2 decimals, or None if no percentages
    if not percentages:
        return None
    avg = sum(percentages) / len(percentages)
    return round(avg, 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of Actions rows, m = number of Removals rows.  
  - We iterate through both tables once.
  - Set lookups are O(1) average.
- **Space Complexity:** O(n + m), for storing sets and groupings by date.

### Potential follow-up questions (as if you’re the interviewer)  

- What if removals had a date field and we only care about posts removed *after* the report date?  
  *Hint: Compare remove_date and action_date for each report.*

- How would you return the daily percentages for each day instead of just the average?  
  *Hint: Output per-date rows: action_date, percentage.*

- What if there are multiple spam reports for the same post on the same day from different users? Should it affect the count?  
  *Hint: Use DISTINCT on (action_date, post_id) instead.*

### Summary
This problem primarily tests **grouping**, **join**, and **aggregate** SQL/querying skills, and how to *dedupe* per unique key (action_date, post_id). The pattern — filter, deduplicate, join, group by, aggregate — is common in reporting/analytics queries, useful for churn/retention stats, event monitoring, etc.


### Flashcard
For each day, count unique posts reported as spam, then count how many were removed; daily percentage = removed / reported.

### Tags
Database(#database)

### Similar Problems
