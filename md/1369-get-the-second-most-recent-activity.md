### Leetcode 1369 (Hard): Get the Second Most Recent Activity [Practice](https://leetcode.com/problems/get-the-second-most-recent-activity)

### Description  
Given a table **UserActivity** storing each user's activity with columns: `username`, `activity`, `startDate`, and `endDate`, return the **second most recent activity** for each user (the activity with the second latest `endDate`).  
If a user only has one activity, return that activity as the second most recent as well.  
There are no two activities for a user with the same `endDate` (activities are non-overlapping for a user).

### Examples  

**Example 1:**  
Input:  
UserActivity =  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| Alice    | Travel   | 2020-02-12  | 2020-02-20  |  
| Alice    | Dancing  | 2020-02-21  | 2020-02-23  |  
| Alice    | Travel   | 2020-02-24  | 2020-02-28  |  
| Bob      | Travel   | 2020-02-11  | 2020-02-18  |  

Output:  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| Alice    | Dancing  | 2020-02-21  | 2020-02-23  |  
| Bob      | Travel   | 2020-02-11  | 2020-02-18  |  

*Explanation: For Alice, her activities ordered by endDate are Travel (28th), Dancing (23rd), Travel (20th). So "Dancing" (endDate 23rd) is the 2ⁿᵈ most recent. For Bob, only one activity is present, so that's returned.*

**Example 2:**  
Input:  
UserActivity =  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| Eve      | Chess    | 2021-01-01  | 2021-01-10  |  

Output:  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| Eve      | Chess    | 2021-01-01  | 2021-01-10  |  

*Explanation: Eve only has one activity, so it is taken as the second most recent.*

**Example 3:**  
Input:  
UserActivity =  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| John     | Run      | 2023-11-01  | 2023-11-01  |  
| John     | Swim     | 2023-11-02  | 2023-11-02  |  
| John     | Dance    | 2023-11-03  | 2023-11-03  |  

Output:  
| username | activity | startDate   | endDate     |  
|----------|----------|-------------|-------------|  
| John     | Swim     | 2023-11-02  | 2023-11-02  |  

*Explanation: Ordered by endDate: Dance (3rd), Swim (2nd), Run (1st). So "Swim" is second most recent for John.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each user, sort all activities by `endDate` descending, and pick the second entry. If only one entry, return it.
- Implementing this in SQL: For each user, we need to rank their activities by `endDate` (descending order).
- To get the second most recent, we want the row where the rank is 2 for each user.  
- But if a user has only one activity, we should return that (rank 1).  
- So we need to either:
  - Use window functions (`RANK()` or `ROW_NUMBER()` with `PARTITION BY username`) and also get the COUNT of activities for each user.
  - Or do a self-join to find, per user, the row which has exactly **one** other row with a more recent endDate (making it the second most recent).
- The window function approach is most readable and maintainable.
- **Trade-offs:** Window functions are efficient and expressive. A self-join (without window functions) is less readable and can be less efficient for large tables.

### Corner cases to consider  
- User has only one activity (should still get it in result).
- Users with exactly two activities (should get the older one, not the latest).
- Users with more than two activities (pick the correct one).
- Multiple users (all result rows present).
- Large ranges in endDate.
- Tied endDates for same user (problem states this doesn't happen).
- Table contains activities for only one user.
- Table is empty (no rows returned).

### Solution

```python
# Note: This is a Python simulation of the SQL logic for interview purposes.
# We'll build the logic step-by-step as you would in an onsite/coding round.
# In practice, use SQL window functions for this problem.

def get_second_most_recent_activity(user_activity):
    # user_activity: list of records, each is [username, activity, startDate, endDate]
    from collections import defaultdict

    user_acts = defaultdict(list)
    # Group all activities per user
    for rec in user_activity:
        username, activity, startDate, endDate = rec
        user_acts[username].append((activity, startDate, endDate))
    
    result = []
    for username, acts in user_acts.items():
        # Sort activities by endDate descending
        acts_sorted = sorted(acts, key=lambda x: x[2], reverse=True)
        # If only one activity, select that, else take the second entry (index 1)
        if len(acts_sorted) == 1:
            chosen = acts_sorted[0]
        else:
            chosen = acts_sorted[1]
        # Output in format: [username, activity, startDate, endDate]
        result.append([username, chosen[0], chosen[1], chosen[2]])
    return result

# Example usage:
user_activity = [
    ['Alice', 'Travel', '2020-02-12', '2020-02-20'],
    ['Alice', 'Dancing', '2020-02-21', '2020-02-23'],
    ['Alice', 'Travel', '2020-02-24', '2020-02-28'],
    ['Bob', 'Travel', '2020-02-11', '2020-02-18']
]

print(get_second_most_recent_activity(user_activity))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is total activity records; each user's activities are sorted (typically very few per user, so practically fast).
- **Space Complexity:** O(n), for grouping activities per user and collecting results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where two activities for the same user have the same endDate?  
  *Hint: Think about using both startDate and endDate, or another tie-breaker.*

- What if the input table is too large to fit in memory?  
  *Hint: External sorting, stream processing, or database-level windowing.*

- Could you extend this to return the kᵗʰ most recent activity per user?  
  *Hint: Generalize rank logic and parameterize k.*

### Summary
This problem is a classic example of **grouping and ranking within groups**.  
The core SQL window function pattern (using RANK or ROW_NUMBER) can be reused for similar queries requiring nth-most (or least) selection per category, such as the kᵗʰ highest salary per department, or the second best score per student.  
This pattern is widely useful across analytics and business reporting scenarios.


### Flashcard
Use SQL window function (ROW_NUMBER or RANK) to rank activities by endDate per user; select rank 2 if exists, else rank 1.

### Tags
Database(#database)

### Similar Problems
