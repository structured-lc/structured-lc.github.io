### Leetcode 1322 (Easy): Ads Performance [Practice](https://leetcode.com/problems/ads-performance)

### Description  
Given advertiser performance logs with columns `ads_id`, `action`, and `time`, where `action` can be 'Clicked', 'Viewed', or 'Ignored', write a query or function to output the `ads_id` and the proportion of 'Clicked' actions among all 'Clicked' and 'Viewed' actions for each ad, rounded to 2 decimal places and displayed as a decimal fraction (not per 100).

### Examples  

**Example 1:**  
Input:  
`ads_id | action  | time`
`-------|---------|------`
`1      | Clicked | 10   `
`1      | Viewed  | 15   `
`2      | Viewed  | 12   `
`2      | Clicked | 17   `
`3      | Ignored | 11   `
`3      | Viewed  | 21   `
Output:`
`ads_id | ctr  `
`-------|------`
`1      | 0.50 `
`2      | 0.50 `
`3      | 0.00 `
*Explanation: For each ads_id, compute number of 'Clicked' actions divided by ('Clicked' + 'Viewed'). If no clicks and only views, ctr = 0.00. Ignore 'Ignored'.*

**Example 2:**  
Input:  
`ads_id | action  | time`
`-------|---------|------`
`4      | Clicked | 31   `
`4      | Viewed  | 40   `
`5      | Ignored | 20   `
Output:`
`ads_id | ctr  `
`-------|------`
`4      | 0.50 `
`5      | 0.00 `
*Explanation: Only ad 4 had a click and view; ad 5 had no clicks or views, so ctr = 0.*

**Example 3:**  
Input:  
`ads_id | action  | time`
`-------|---------|------`
`7      | Clicked | 10   `
Output:`
`ads_id | ctr  `
`-------|------`
`7      | 1.00 `
*Explanation: Only click, so ctr = 1.0.*

### Thought Process (as if you’re the interviewee)  
- Group records by ads_id.
- For each group, count 'Clicked' and 'Viewed'.
- Compute ctr = Clicked / (Clicked + Viewed), rounded to two decimals.
- If denominator is 0 (no clicks or views), set ctr = 0.
- Ignore rows with 'Ignored' in the calculation.

### Corner cases to consider  
- ads_id with only 'Viewed', only 'Clicked', or only 'Ignored'.
- No records present.
- Multiple identical actions.
- Division by zero (must return 0.00).

### Solution

```python
from collections import defaultdict
def adsPerformance(logs):
    ctrs = defaultdict(lambda: [0,0])  # [clicked, viewed]
    for row in logs:
        ad, act, t = row
        if act == 'Clicked':
            ctrs[ad][0] += 1
        elif act == 'Viewed':
            ctrs[ad][1] += 1
    res = []
    for ad in ctrs:
        clicked, viewed = ctrs[ad]
        denom = clicked + viewed
        ctr = round(clicked / denom, 2) if denom > 0 else 0.00
        res.append((ad, ctr))
    # To order results by ads_id
    res.sort()
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), one pass through all logs.
- **Space Complexity:** O(n), for storing per-ads_id counters.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want to include the 'Ignored' actions in the denominator?  
  *Hint: Just add ignored to count.*

- How to show only ads with at least one 'Viewed'?  
  *Hint: Filter out ads where viewed == 0.*

- How would you write this as a SQL query?  
  *Hint: Use GROUP BY, COUNT and CASE WHEN aggregation.*

### Summary
This question is an example of grouped aggregation and fraction calculation, similar to online analytics tasks. Patterns here are widely used in click-through-rate, A/B testing, and data summarization interviews.


### Flashcard
Group by ads_id, count 'Clicked' and 'Viewed', then compute ctr = Clicked / (Clicked + Viewed), rounded to two decimals.

### Tags
Database(#database)

### Similar Problems
