### Leetcode 1817 (Medium): Finding the Users Active Minutes [Practice](https://leetcode.com/problems/finding-the-users-active-minutes)

### Description  
You are given a log of user activities. Each log entry contains a user ID and the minute when they performed an action. You need to calculate how many users have exactly k active minutes for each possible value of k from 1 to a given maximum. An "active minute" is any minute during which a user performed at least one action.

### Examples  

**Example 1:**  
Input: `logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5`  
Output: `[0,2,0,0,0]`  
*Explanation: User 0 was active in minutes 2 and 5 (2 active minutes). User 1 was active in minutes 2 and 3 (2 active minutes). So we have 2 users with exactly 2 active minutes, and 0 users for other k values.*

**Example 2:**  
Input: `logs = [[1,1],[2,2],[2,3]], k = 4`  
Output: `[1,1,0,0]`  
*Explanation: User 1 has 1 active minute, user 2 has 2 active minutes. So result is [1,1,0,0].*

### Thought Process (as if you're the interviewee)  
This problem is about counting and grouping. First, I need to understand what constitutes an "active minute" - it's any minute where a user performed at least one action, regardless of how many actions.

My approach:
1. **Group by user**: For each user, collect all the unique minutes they were active
2. **Count active minutes per user**: For each user, count their distinct active minutes
3. **Build result array**: Create an array where index i represents how many users had exactly i+1 active minutes

The key insight is using a hash map to store sets of active minutes per user, then counting the sizes of these sets.

### Corner cases to consider  
- Empty logs array
- Single user with single action
- Multiple actions by same user in same minute (should count as 1 active minute)
- Users with 0 active minutes (shouldn't appear in logs)
- k = 1 (minimum possible)
- All users have same number of active minutes

### Solution

```python
def findingUsersActiveMinutes(logs, k):
    # Dictionary to store active minutes for each user
    user_minutes = {}
    
    # Process each log entry
    for user_id, minute in logs:
        if user_id not in user_minutes:
            user_minutes[user_id] = set()
        user_minutes[user_id].add(minute)
    
    # Count how many users have each number of active minutes
    result = [0] * k
    
    for user_id, minutes_set in user_minutes.items():
        active_count = len(minutes_set)
        # Only count if active_count is within our range [1, k]
        if 1 <= active_count <= k:
            result[active_count - 1] += 1
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + u) where n is the number of log entries and u is the number of unique users. We iterate through all logs once, then through all users once.
- **Space Complexity:** O(u × m) where u is the number of unique users and m is the average number of unique minutes per user. In worst case, this could be O(n) if all log entries are for different users and minutes.

### Potential follow-up questions (as if you're the interviewer)  

- What if we needed to handle very large datasets that don't fit in memory?  
  *Hint: Consider using external sorting or streaming algorithms to process data in chunks.*

- How would you optimize if k is much larger than the maximum possible active minutes?  
  *Hint: Instead of creating array of size k, use a hash map to store only non-zero counts.*

- What if we needed to support real-time updates as new logs arrive?  
  *Hint: Maintain the user_minutes structure and update the result array incrementally.*

### Summary
This problem demonstrates the hash map + set pattern for counting unique occurrences. The key insight is recognizing that we need to count distinct minutes per user, then group users by their active minute counts. This pattern is common in problems involving grouping, counting distinct elements, and building frequency distributions.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
