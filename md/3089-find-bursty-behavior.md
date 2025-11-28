### Leetcode 3089 (Medium): Find Bursty Behavior [Practice](https://leetcode.com/problems/find-bursty-behavior)

### Description  
Given a table of user-generated posts, we need to identify users who exhibited **bursty behavior** in February 2024. Bursty behavior is defined as follows:  
- For each user, in *any* 7-day (inclusive) period in February 2024, their number of posts within that window is at least twice their average weekly posting count for February.  
- The output is, for each such user:
  - `user_id`
  - The **maximum** number of posts in any such 7-day window during February 2024 (`max_7day_posts`)
  - Their **average weekly post** count over February 2024 as an integer (`avg_weekly_posts`).

February 2024 is from '2024-02-01' to '2024-02-28' (exactly 28 days).

### Examples  

**Example 1:**  
Input:  
`Posts` table:  
| post_id | user_id | post_date   |
|---------|---------|-------------|
| 1       | 101     | 2024-02-01  |
| 2       | 101     | 2024-02-02  |
| 3       | 101     | 2024-02-03  |
| 4       | 101     | 2024-02-04  |
| 5       | 101     | 2024-02-05  |
| 6       | 101     | 2024-02-06  |
| 7       | 101     | 2024-02-20  |
| 8       | 102     | 2024-02-01  |
| 9       | 102     | 2024-02-08  |

Output:  
| user_id | max_7day_posts | avg_weekly_posts |
|---------|----------------|------------------|
| 101     | 6              | 2                |

*Explanation:  
User 101 has 8 posts in Feb. 8/4 = 2 per week.  
From 2024-02-01 to 2024-02-06 is 6 consecutive days; 6 posts during this window.  
6 ≥ 2×2 ⇒ 6 ≥ 4, so this is bursty behavior.  
Their max_7day_posts is 6. User 102 posts only 2 times, doesn't qualify.*

**Example 2:**  
Input:  
`Posts` table:  
| post_id | user_id | post_date   |
|---------|---------|-------------|
| 1       | 200     | 2024-02-11  |
| 2       | 200     | 2024-02-12  |
| 3       | 200     | 2024-02-14  |
| 4       | 201     | 2024-02-15  |
| 5       | 201     | 2024-02-16  |
| 6       | 201     | 2024-02-23  |

Output:  
| user_id | max_7day_posts | avg_weekly_posts |
|---------|----------------|------------------|
|         |                |                  |

*Explanation:  
No user has any 7-day window with twice their (integer) average weekly posts (all users averaged <2 per week or didn’t reach bursty threshold).*

**Example 3:**  
Input:  
`Posts` table:  
| post_id | user_id | post_date   |
|---------|---------|-------------|
| 1       | 301     | 2024-02-10  |
| 2       | 301     | 2024-02-11  |
| 3       | 301     | 2024-02-12  |
| 4       | 301     | 2024-02-13  |
| 5       | 301     | 2024-02-14  |
| 6       | 301     | 2024-02-15  |
| 7       | 301     | 2024-02-16  |
| 8       | 301     | 2024-02-17  |
| 9       | 301     | 2024-02-18  |

Output:  
| user_id | max_7day_posts | avg_weekly_posts |
|---------|----------------|------------------|
| 301     | 7              | 2                |

*Explanation:  
User 301: 9 posts in Feb. 9/4 = 2 per week (integer division).  
There is at least one 7-day window (e.g. 2024-02-12 to 2024-02-18) with 7 posts.  
7 ≥ 2×2 ⇒ 7 ≥ 4, qualifies as bursty. max_7day_posts is the maximum (7) over all windows.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For each user, for each 7-day period in Feb 2024, count the number of posts in that window.
  - Compute the user's average weekly posts in February (integer division by 4).
  - If any 7-day window's post count ≥ 2×avg_weekly_posts, user is bursty; return user's id, max_7day_posts, avg_weekly_posts.
  - This is \(O(\text{users} \times \text{posts}^2)\), which can be slow for many posts.

- **Optimization:**  
  - For each user, extract their post dates in Feb 2024, sorted.
  - Use a sliding window approach over sorted post dates:
      - For left pointer l, move right pointer r as long as r's date ≤ l's date + 6.
      - Count posts in window [l, r], for all l.
      - Track max_7day_posts for the user.
  - This is O(posts) per user.
  - Computing avg_weekly_posts: total posts in Feb divided by 4 (integer division).

- **SQL/DB scenario:**  
  - Can self-join posts on user and date range.
  - Group by user, starting post, count posts in 7-day window.
  - Join with user's average weekly posts in the month.
  - Filter for those whose best 7-day streak ≥ 2 × avg_weekly_posts.

- **Trade-offs:**  
  - This approach is efficient and correct.
  - Handles overlapping 7-day windows efficiently.


### Corner cases to consider  
- No users or no posts
- User posts only once
- Users post in only one week
- All users' 7-day post max is less than 2× their weekly avg
- All posts just outside February should be ignored
- Integer division for average weekly posts
- Post dates are not sorted


### Solution

```python
from typing import List, Dict
from collections import defaultdict

def find_bursty_behavior(posts: List[Dict]) -> List[Dict]:
    # Step 1: Filter only posts in February 2024
    feb_start = '2024-02-01'
    feb_end   = '2024-02-28'

    # Helper to compare date strings (ISO format)
    def date_in_feb(date_s):
        return feb_start <= date_s <= feb_end

    # Step 2: Organize posts per user
    user_dates = defaultdict(list)
    for post in posts:
        user_id = post['user_id']
        post_date = post['post_date']
        if date_in_feb(post_date):
            user_dates[user_id].append(post_date)

    results = []
    for user_id, dates in user_dates.items():
        # Step 3: Sort the dates
        dates.sort()

        total_posts = len(dates)
        if total_posts == 0:
            continue

        avg_weekly_posts = total_posts // 4  # 4 weeks
        if avg_weekly_posts == 0:
            continue

        # Step 4: Sliding window to find max posts in any 7-day frame
        l = 0
        max_7day_posts = 0
        n = len(dates)

        # Convert to integer days to compare quickly
        from datetime import datetime, timedelta

        date_fmt = "%Y-%m-%d"
        days = [datetime.strptime(d, date_fmt) for d in dates]

        for l in range(n):
            r = l
            # Move r to cover up to 6 days difference from l to r
            while r < n and (days[r] - days[l]).days <= 6:
                r += 1
            window_count = r - l
            max_7day_posts = max(max_7day_posts, window_count)

        # Step 5: Check if user's max window is bursty
        if max_7day_posts >= 2 * avg_weekly_posts:
            results.append({
                "user_id": user_id,
                "max_7day_posts": max_7day_posts,
                "avg_weekly_posts": avg_weekly_posts
            })

    # Sort by user_id for output consistency
    results.sort(key=lambda x: x["user_id"])
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Let n be the number of posts.  
  - Filtering/organizing: O(n)  
  - Sorting per user: O(k log k), k is posts per user  
  - Sliding window per user: O(k)  
  - So, overall O(n log k) where k is the max posts by a user (often O(n) in worst case, but real data is more spread).
- **Space Complexity:**  
  - O(n): Need to store post dates per user and window counters (input size plus date structures)


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle leap years or different month lengths?
  *Hint: Make code parameterizable based on input dates, or count week windows based on first/last day*

- If every post also had a "topic", how would you identify bursty behavior per topic per user?
  *Hint: Group additionally by (user_id, topic), keeping logic same*

- What if the date field is not a string but a UNIX timestamp or is unsorted?
  *Hint: Convert/parse as needed; always sort before applying sliding window*


### Summary
This problem uses the **sliding window (two pointers)** technique applied to sorted time series to efficiently solve an interval-aggregation problem. This pattern is common for consecutive counts, max in window, or streak analysis (e.g., leetcode "longest substring" or "most active users" problems). The solution groups by user, sorts on time, and finds the tightest qualifying interval in O(n log k) time—very typical and adaptable for behavioral analytics on time series activity logs.


### Flashcard
For each user, extract posts from February 2024; compute average weekly posts (total posts ÷ 4); check if any 7-day window has posts ≥ 2× average.

### Tags
Database(#database)

### Similar Problems
