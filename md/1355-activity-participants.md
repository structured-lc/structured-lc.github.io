### Leetcode 1355 (Medium): Activity Participants [Practice](https://leetcode.com/problems/activity-participants)

### Description  
You are given a table of `activities` representing different activities (id, name), and a table `friends` for a social network. You need to output the ids of all friends who participated in **at least one activity every day**.

### Examples  

**Example 1:**  
Input:
Activity table:
```
| id | activity | day |
|----|----------|-----|
| 1  | Reading  | 1   |
| 2  | Hiking   | 1   |
| 3  | TV       | 2   |
| 4  | Yoga     | 2   |
| 5  | Running  | 3   |
```
Friends table:
```
| id | name |
|----|------|
| 1  | Alice|
| 2  | Bob  |
| 3  | Carol|
```
Participation table:
```
| activity_id | friend_id |
|-------------|-----------|
| 1           | 1         |
| 2           | 2         |
| 3           | 1         |
| 4           | 2         |
| 5           | 1         |
```
Output: `[1]`
*Explanation: Alice (id=1) participated on days 1,2,3. No other friend participated every day.*

**Example 2:**  
Input (no one participates all days):
Output: `[]`


### Thought Process (as if you’re the interviewee)  
This is a SQL-style GROUP BY problem. For each friend, count the unique days in which that friend has participated in any activity. Then, compare that count to the total number of distinct activity days. If counts match, the friend participated every day.

### Corner cases to consider  
- No activities at all (empty answer)
- Activities all on a single day
- Friends who never participated
- Multiple friends who participated every day
- Friends with multiple participations in the same day (should not double-count days)

### Solution

```python
# Assuming input: activities, friends, participation as described above.

def activity_participants(activities, friends, participation):
    # Map activity_id to its day
    activity_day = {act['id']: act['day'] for act in activities}
    # Get all the days
    activity_days = set(act['day'] for act in activities)
    total_days = len(activity_days)

    # friend_id -> set of days participated
    from collections import defaultdict
    friend_days = defaultdict(set)
    for entry in participation:
        act_id = entry['activity_id']
        friend_id = entry['friend_id']
        day = activity_day.get(act_id)
        if day is not None:
            friend_days[friend_id].add(day)

    # return friend ids who participated every day
    return [fid for fid, days in friend_days.items() if len(days) == total_days]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(A + P) where A = #activities, P = #participation records. Looking up and grouping is linear.
- **Space Complexity:** O(F + A) for storing participation days per friend and mapping activity_ids.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you write this efficiently in SQL?
  *Hint: COUNT(DISTINCT ...), GROUP BY friend_id, HAVING = total days.*

- What if activities can run on the same day (duplicated activities per day)?
  *Hint: Only unique days matter for each friend, not unique activities per day.*

- What if you need names not ids?
  *Hint: Join with the friends table for names.*

### Summary
Classic group-by counting pattern, especially in SQL/reporting interviews. This approach covers aggregation, deduplication (unique days), and filtering. Useful in attendance, streaks, and analytics problems.
