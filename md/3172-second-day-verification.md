### Leetcode 3172 (Easy): Second Day Verification [Practice](https://leetcode.com/problems/second-day-verification)

### Description  
Given two database tables:  
- **Emails**: Contains columns `email_id`, `user_id`, `signup_date` (datetime).
- **Texts**: Contains columns `email_id`, `signup_action` (string: either 'Verified' or 'Not Verified'), `action_date` (datetime).

Find all user_id values where the user **performed the "Verified" action exactly on the second day after their signup date**, that is, where the action occurred 1 day after the signup.  
Return the list of such user_id, sorted by user_id.

### Examples  

**Example 1:**  
Input:  
`Emails = [ [7005, 100, '2022-08-20 10:00:00'], [7771, 200, '2022-06-14 09:30:00'] ]`  
`Texts  = [ [7005, 'Verified', '2022-08-21 10:00:00'], [7771, 'Verified', '2022-06-15 09:30:00'] ]`  
Output:  
`[100, 200]`  
*Explanation: For both users, the Verified action happened exactly one day after signup (the "second" day).*

**Example 2:**  
Input:  
`Emails = [ [1, 10, '2023-01-01 08:00:00'] ]`  
`Texts  = [ [1, 'Verified', '2023-01-03 08:00:00'] ]`  
Output:  
`[]`  
*Explanation: Verified happened after 2 days. Not on the second day.*

**Example 3:**  
Input:  
`Emails = [ [2, 20, '2023-02-28 23:45:00'] ]`  
`Texts  = [ [2, 'Not Verified', '2023-03-01 23:45:00'] ]`  
Output:  
`[]`  
*Explanation: Action was not 'Verified'.*

### Thought Process (as if you’re the interviewee)  
First, relate **emails** (user signup events) to **texts** (verification activity) by matching on `email_id`.  
For each such joined pair:
- Check that `signup_action` is 'Verified'.
- Compute the difference (in days) between `action_date` and `signup_date`; require it to be exactly 1, i.e., "second day".

Brute-force (not SQL-optimized):  
- For each email, scan all texts; for each, if `email_id` matches, if action is 'Verified', check difference.  
- Optimization: Use SQL to join on `email_id`, filter by `signup_action='Verified'` and `DATEDIFF(action_date, signup_date)=1`.  
- Sort user_id in result.

This approach is efficient because we use indexes (on email_id, dates), and the select-join where clause does the filtering directly in one query.

### Corner cases to consider  
- Multiple records for the same user or email_id; user only included if at least one action meets criteria.
- Signup and action occurred across months or years (date calculation should still be based on whole days).
- Time component in datetime values (should not matter if DATEDIFF only counts days).
- No verified action at all.
- Action is not exactly on the second day (earlier or later).
- Action is 'Not Verified'.

### Solution

```python
# Since this is a database problem (SQL), let's mimic as a function:
# We assume emails and texts are lists of lists (records).

from datetime import datetime
from typing import List

def second_day_verification(emails: List[List], texts: List[List]) -> List[int]:
    # Build a mapping from email_id to (user_id, signup_date)
    email_map = {}
    for email_id, user_id, signup_date in emails:
        email_map[email_id] = (user_id, datetime.strptime(signup_date, "%Y-%m-%d %H:%M:%S"))
        
    result = set()
    # For each text action
    for email_id, signup_action, action_date in texts:
        # Only process if email_id is in emails table
        if email_id in email_map and signup_action == 'Verified':
            user_id, signup_dt = email_map[email_id]
            action_dt = datetime.strptime(action_date, "%Y-%m-%d %H:%M:%S")
            # Check for difference exactly 1 day
            if (action_dt.date() - signup_dt.date()).days == 1:
                result.add(user_id)
    # Return sorted list of user_ids
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the number of emails and m is the number of texts. Each email/text is visited once. Lookups in the map are O(1).
- **Space Complexity:** O(n) for the email_id map, plus up to O(m) for result set (worst-case each text gives a unique user).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a large dataset where data does not fit in memory?  
  *Hint: Consider streaming/joining via database or map-reduce.*

- What if a user signs up multiple times with different email_ids? Should we dedupe by user_id or count all occurrences?  
  *Hint: Clarify requirements; change grouping logic if needed.*

- Suppose we want users who verified strictly after 24 hours (not just next day). How would you write the date diff check?  
  *Hint: Compare exact time deltas.*

### Summary
This problem follows the classic **table join and filter** pattern, which is fundamental in both SQL and data processing (pandas, map-reduce, etc.).  
The join relates transactional data (signup events) to actions; filtering applies relational and date-based logic.  
This coding pattern is common for "event X happened exactly Y time after event Z" problems, e.g., checking follow-ups, reminders, or time-bound activities.