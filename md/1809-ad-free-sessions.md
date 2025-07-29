### Leetcode 1809 (Easy): Ad-Free Sessions [Practice](https://leetcode.com/problems/ad-free-sessions)

### Description  
Given two tables, `Playback` and `Ads`, identify all **sessions** in which a customer watched uninterrupted by any ads. Each row in `Playback` identifies a session (session_id), customer, and its start and end time (inclusive). Each row in `Ads` records an ad event (ad_id) for a customer and the time at which it was shown (timestamp). A session is "ad-free" if **no ad for that customer happened within the session’s time interval** (start_time ≤ timestamp ≤ end_time). Return all such session_ids.

### Examples  

**Example 1:**  
Input:  
Playback =  
| session_id | customer_id | start_time | end_time |
|------------|-------------|------------|----------|
| 1          | 1           | 1          | 5        |
| 2          | 1           | 15         | 23       |
| 3          | 2           | 10         | 12       |
| 4          | 2           | 17         | 28       |
| 5          | 2           | 2          | 8        |

Ads =  
| ad_id | customer_id | timestamp |
|-------|-------------|-----------|
| 1     | 1           | 5         |
| 2     | 2           | 17        |
| 3     | 2           | 20        |

Output: `2,3,5`  
*Explanation:*
- Session 1: user 1, times ⟦1,5⟧. Ad (id=1, time=5) falls into this session ⟹ not ad-free.
- Session 2: user 1, times ⟦15,23⟧. No ad for user 1 in this window ⟹ ad-free.
- Session 3: user 2, times ⟦10,12⟧. No ad for user 2 in this window ⟹ ad-free.
- Session 4: user 2, times ⟦17,28⟧. Ads at 17, 20 for user 2 fall in this session ⟹ not ad-free.
- Session 5: user 2, times ⟦2,8⟧. No ad for user 2 in this window ⟹ ad-free.

**Example 2:**  
Input:  
Playback = [[1, 1, 1, 10]]  
Ads = [[1, 1, 5], [2, 2, 8]]  
Output: `[]`  
*Explanation:* Only session 1. User 1 sees an ad at t=5 within session ⟦1,10⟧, so no ad-free sessions.

**Example 3:**  
Input:  
Playback = [[1, 10, 0, 20], [2, 12, 30, 40]]  
Ads = []  
Output: `1,2`  
*Explanation:* No ads at all, so both sessions are ad-free.

### Thought Process (as if you’re the interviewee)  
First, for *each session* in `Playback`, we want to verify if **any** ad for that customer falls inside its time window.  
A brute-force way is:  
- For each session, check every ad for that customer to see if its timestamp is within the session.
- This would be O(m×n) where m=#sessions, n=#ads.

But that's inefficient!  
Instead, I can leverage efficient filtering:
- For each session, see if any ad exists for the same user where the ad timestamp falls in the session's interval.
- In SQL, this is a classic `LEFT JOIN` (Playback + Ads), joining on customer_id and the ad’s timestamp being in range ⟦start_time, end_time⟧.
- If after the `LEFT JOIN`, the ad columns are NULL for a session, then no ad was shown during that session. Those sessions are our answer.

**Trade-offs:**  
- SQL JOINs are efficient with indexing.
- No nested scanning is needed, so it scales well.

### Corner cases to consider  
- Sessions without any ads table records at all (must be included as ad-free).
- Sessions where ads for other users happen within the time window (ignore, only matching customer_id).
- Ads that occur *exactly* at start_time or end_time (still count as ad).
- Sessions that start and end at same timestamp (single-moment session).
- No sessions or no ads at all (all sessions ad-free).
- Multiple overlapping sessions for different users.

### Solution

```python
# For clarity, here's a procedural take on the same SQL JOIN idea

def adFreeSessions(playback, ads):
    # Build a mapping from customer_id to sorted list of ad timestamps
    from collections import defaultdict

    ads_by_customer = defaultdict(list)
    for ad_id, customer_id, timestamp in ads:
        ads_by_customer[customer_id].append(timestamp)
    # Sorting can help if we want to use binary search (not strictly needed for brute-force)
    for ts_list in ads_by_customer.values():
        ts_list.sort()

    result = []
    for session_id, customer_id, start_time, end_time in playback:
        # Get all ads for this customer
        ad_timestamps = ads_by_customer.get(customer_id, [])
        # Is there any ad timestamp in [start_time, end_time]?
        ad_in_window = False
        for t in ad_timestamps:
            if start_time <= t <= end_time:
                ad_in_window = True
                break
        if not ad_in_window:
            result.append(session_id)
    return result

# Example call:
# playback = [[1, 1, 1, 5], [2, 1, 15, 23], [3, 2, 10, 12], [4, 2, 17, 28], [5, 2, 2, 8]]
# ads = [[1, 1, 5], [2, 2, 17], [3, 2, 20]]
# print(adFreeSessions(playback, ads))  # Output: [2, 3, 5]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building the ad lookup: O(A), where A = number of ads  
  - For each session (S), scan that user's ad timestamps (worst-case: all ads for user in session scanned).
  - In the naive form: O(S × K), K = average #ads per user.  
  - With sorting and binary search (if many ads per user): each lookup becomes O(log K), so O(S log K).
  - In practice, for most data, O(S + A).
- **Space Complexity:**  
  - O(A) to store ads by customer.

### Potential follow-up questions (as if you’re the interviewer)  

- What if sessions could overlap for the same customer?  
  *Hint: How would you avoid double-counting or misattributing ads?*

- What if each session also had a “device” or “region” attribute and we only want ad-free sessions *for that device/region*?  
  *Hint: Would you join on more attributes?*

- How would you efficiently scale to millions of ads and playback sessions, or if ads table is much larger?  
  *Hint: Can you batch process, use indexed lookups, or parallelize by customer?*

### Summary
This problem is a classic **anti-join** scenario, commonly seen in SQL (find entries in A not matched by B under some criteria). Translated to code: build a mapping for efficient access, check for any matching “violating” record, and include only sessions passing the check. This pattern is found in fraud detection, finding “clean runs” (e.g., no errors, no alerts), or event logs with/without specific incidents.