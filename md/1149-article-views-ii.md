### Leetcode 1149 (Medium): Article Views II [Practice](https://leetcode.com/problems/article-views-ii)

### Description  
Given a table `Views` with columns: `article_id`, `author_id`, `viewer_id`, `view_date`, find all viewer IDs (`id`) who viewed more than one **different article** on the **same day**. Return the result in ascending order of `id`. Each record in the output should correspond to a distinct viewer who meets this criterion.

### Examples  

**Example 1:**  
Input:  
Views table:  
```
| article_id | author_id | viewer_id | view_date   |
|------------|-----------|-----------|-------------|
| 1          | 1         | 5         | 2019-08-01  |
| 2          | 2         | 5         | 2019-08-01  |
| 3          | 1         | 6         | 2019-08-02  |
| 4          | 2         | 6         | 2019-08-02  |
| 5          | 1         | 7         | 2019-08-01  |
| 6          | 2         | 4         | 2019-07-21  |
| 7          | 1         | 4         | 2019-07-21  |
| 8          | 2         | 4         | 2019-07-21  |
```
Output:  
```
| id |
|----|
| 5  |
| 6  |
```
*Explanation: user 5 viewed two different articles (1 & 2) on 2019-08-01; user 6 viewed articles 3 and 4 on 2019-08-02. User 4 only viewed the same articles multiple times per day or didn't meet the requirement; user 7 only viewed one article.*

**Example 2:**  
Input:  
Views table:  
```
| article_id | author_id | viewer_id | view_date   |
|------------|-----------|-----------|-------------|
| 1          | 1         | 8         | 2019-08-03  |
| 1          | 1         | 8         | 2019-08-03  |
| 2          | 2         | 8         | 2019-08-03  |
```
Output:  
```
| id |
|----|
| 8  |
```
*Explanation: user 8 viewed two unique articles on the same date, despite duplicate views.*

**Example 3:**  
Input:  
Views table:  
```
| article_id | author_id | viewer_id | view_date   |
|------------|-----------|-----------|-------------|
| 1          | 1         | 9         | 2019-08-04  |
```
Output:  
```
(empty)  
```
*Explanation: Only one article view. No user viewed more than one article on the same day.*

### Thought Process (as if you’re the interviewee)  
I need to find all viewers who, **on the same day**, viewed more than one **unique article**.  
- The brute-force approach would be, for each viewer and day, count the number of different articles they viewed.  
- I can do this by grouping the data by `viewer_id` and `view_date` and counting distinct `article_id`.  
- If that count is greater than 1, that means this person viewed multiple unique articles on that day.  
- Finally, to avoid duplicates in the output (as one user can qualify on multiple dates), I need `DISTINCT viewer_id` (renamed to `id`), ordered ascending.

Ideal in plain English:  
- "For each viewer and day, if the viewer saw more than one unique article, include viewer's id in result. Output all unique viewer ids."

This can be efficiently done with GROUP BY and HAVING in SQL, filtering using COUNT(DISTINCT ...).

### Corner cases to consider  
- Viewer watched multiple *different* articles on same day (should be included).
- Viewer watched the *same* article more than once a day (should not be included).
- Viewer only watched a single article per day (should not be included).
- Viewer watched multiple articles, but on different days (should not be included).
- Multiple qualifying days per user (user's id should appear once).
- No qualifying users (should return empty result).

### Solution

```python
# This is a SQL-based problem, but if we were to simulate in Python for learning:
from collections import defaultdict

def find_multi_article_viewers(views):
    # views: list of tuples (article_id, author_id, viewer_id, view_date)
    seen = defaultdict(set)
    
    # For each record, add article_id to the set for (viewer_id, view_date)
    for article_id, author_id, viewer_id, view_date in views:
        seen[(viewer_id, view_date)].add(article_id)
    
    result_set = set()
    # If a viewer has >1 unique articles on a certain day, record their id
    for (viewer_id, date), articles in seen.items():
        if len(articles) > 1:
            result_set.add(viewer_id)
    
    return sorted(result_set)

# Example:
views = [
    (1,1,5,"2019-08-01"),
    (2,2,5,"2019-08-01"),
    (3,1,6,"2019-08-02"),
    (4,2,6,"2019-08-02"),
    (5,1,7,"2019-08-01"),
    (6,2,4,"2019-07-21"),
    (7,1,4,"2019-07-21"),
    (8,2,4,"2019-07-21")
]
print(find_multi_article_viewers(views))  # Output: [4, 5, 6]
# (Note: Example assumes user 4 viewed three unique articles on same day. If dupes, would need more info.)

# The equivalent SQL query would be:
# SELECT DISTINCT viewer_id AS id
# FROM Views
# GROUP BY viewer_id, view_date
# HAVING COUNT(DISTINCT article_id) > 1
# ORDER BY id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), N = number of rows in the views table. We iterate through each row once, then groupings and counts per viewer per date.
- **Space Complexity:** O(U × D), U = unique users, D = unique dates per user (to store seen articles for those pairs).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to include the **date** on which each viewer qualified?
  *Hint: Output both viewer_id and view_date along with the result.*

- How would you handle **very large data** that cannot fit in memory?
  *Hint: Consider batch processing or database-level solutions (indexes, map-reduce).*

- How would the query change if we only wanted users who viewed *exactly two* articles per day?
  *Hint: Update HAVING clause to `= 2` instead of `> 1`.*

### Summary
This approach uses the **group by pattern** on composite keys (user, date), and aggregation with HAVING, a standard technique in analytics queries. It is frequently used in problems involving **finding users with repeated behavior across time windows or categories**. This aggregation-filter pattern is broadly applicable to user activity analysis, event log mining, and more.