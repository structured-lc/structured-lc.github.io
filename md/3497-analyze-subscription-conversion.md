### Leetcode 3497 (Medium): Analyze Subscription Conversion  [Practice](https://leetcode.com/problems/analyze-subscription-conversion)

### Description  
Given a user activity log, where each activity contains:
- **user_id**: unique integer ID for a user
- **activity_date**: date of activity
- **activity_type**: one of 'free_trial', 'paid', or 'cancelled'
- **activity_duration**: time (in minutes) spent on the service that day

Every user may have a 7-day free trial. Afterwards, the user can either pay to subscribe or cancel. For users who have had both 'free_trial' and 'paid' activities, find:
- their average daily activity duration during the free trial (rounded to 2 decimals),
- their average daily activity duration during their paid subscription (rounded to 2 decimals).

Return the results as:  
(*user_id*, trial_avg_duration, paid_avg_duration), ordered by user_id.

### Examples  

**Example 1:**  
Input:  
UserActivity =  
| user_id | activity_date | activity_type | activity_duration |
|---------|--------------|---------------|------------------|
|   1     | 2024-05-01   | free_trial    | 30               |
|   1     | 2024-05-02   | paid          | 50               |
|   2     | 2024-05-05   | free_trial    | 40               |
|   3     | 2024-05-10   | paid          | 60               |
|   3     | 2024-05-09   | free_trial    | 80               |
|   3     | 2024-05-08   | free_trial    | 70               |
|   3     | 2024-05-11   | paid          | 65               |

Output:  
| user_id | trial_avg_duration | paid_avg_duration |
|---------|-------------------|-------------------|
|   1     | 30.00             | 50.00             |
|   3     | 75.00             | 62.50             |

*Explanation:*
- User 1 has both types. Free_trial mean = 30, paid mean = 50.
- User 2 has only trial activity (excluded).
- User 3: trial = (70+80)/2 = 75.00, paid = (60+65)/2 = 62.50.

**Example 2:**  
Input:  
UserActivity =  
| user_id | activity_date | activity_type | activity_duration |
|---------|--------------|---------------|------------------|
| 4       | 2024-06-01   | paid          | 15               |
| 4       | 2024-06-02   | paid          | 20               |
| 4       | 2024-06-03   | paid          | 30               |

Output:  
| user_id | trial_avg_duration | paid_avg_duration |
(empty result: no user with both trials and paid activities.)

*Explanation:*  
User 4 only has paid activity, so isn't included.

**Example 3:**  
Input:  
UserActivity =  
| user_id | activity_date | activity_type | activity_duration |
|---------|--------------|---------------|------------------|
| 2       | 2024-07-01   | free_trial    | 10               |
| 2       | 2024-07-02   | free_trial    | 30               |
| 2       | 2024-07-10   | cancelled     | 10               |

Output:  
(empty)

*Explanation:*  
User 2 only had a free trial and cancelled, so is excluded.

### Thought Process (as if you’re the interviewee)  

- Brute-force:  
  For every user, check if they have both 'free_trial' and 'paid' records. If so, collect all their trial and paid record durations, calculate averages.

- Optimization:  
  Use two groupings: one for free_trial and one for paid, grouped by user_id, to calculate user-wise averages.
  
  Select only those user_ids that exist in **both** groups (these are converters). Combine the averages for output.

- Trade-offs:  
  This approach is efficient because it leverages grouping and joining--no need to scan the entire dataset multiple times. Memory and time are both optimized, as unnecessary users (no conversion) are automatically excluded early.

### Corner cases to consider  
- Users with only free_trial (should not be included).
- Users with only paid activity (should not be included).
- Users with neither activity (not possible under constraints, but safe).
- Users with one free_trial and one paid activity (should be included).
- Users with days of cancelled but not paid (should not be included).
- Users with zero-duration activities.
- Users with multiple free_trial and/or paid records—averages must be properly computed.

### Solution

```python
# The table is usually a pandas DataFrame or a SQL table, but for interviews, let's assume a list of dicts for each row.

def analyze_subscription_conversion(user_activity):
    # Step 1: Group activities by user and type
    trial_durations = {}
    paid_durations = {}

    for row in user_activity:
        uid = row['user_id']
        typ = row['activity_type']
        duration = row['activity_duration']
        if typ == 'free_trial':
            if uid not in trial_durations:
                trial_durations[uid] = []
            trial_durations[uid].append(duration)
        elif typ == 'paid':
            if uid not in paid_durations:
                paid_durations[uid] = []
            paid_durations[uid].append(duration)

    # Step 2: For users who have both trial and paid, calculate averages
    result = []
    for uid in sorted(trial_durations):
        if uid in paid_durations:
            trial_avg = round(sum(trial_durations[uid]) / len(trial_durations[uid]), 2)
            paid_avg = round(sum(paid_durations[uid]) / len(paid_durations[uid]), 2)
            result.append({
                'user_id': uid,
                'trial_avg_duration': trial_avg,
                'paid_avg_duration': paid_avg
            })
    return result

# Example input format:
# user_activity = [
#     {'user_id': 1, 'activity_date': '2024-05-01', 'activity_type': 'free_trial', 'activity_duration': 30},
#     ...
# ]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in user_activity. Each row is processed once; calculating averages is O(1) per user due to totals and counts.
- **Space Complexity:** O(m), where m is the number of unique users with free or paid records. We store at most two lists per user_id.

### Potential follow-up questions (as if you’re the interviewer)  

- What if users can have multiple free_trial periods over time?  
  *Hint: Consider trial "windows" or session concept.*

- How would you handle activity records with missing or corrupted data?  
  *Hint: Data sanitation, skip or imputation.*

- How would you extend this to include users who downgraded after subscribing (i.e., went from paid back to cancelled)?  
  *Hint: Need more state tracking for user journey.*

### Summary
This problem is a classic **group and join** scenario based on user_id, common in SQL analytics and ETL interviews. The pattern of grouping by ID and aggregating (mean) while filtering on a business conversion event is seen in subscription analytics, e-commerce conversion funnels, and retention analysis. The solution uses dictionaries for efficient group-by and can be extended and optimized for very large datasets using SQL window or CTE queries.

### Tags
Database(#database)

### Similar Problems
