### Leetcode 1633 (Easy): Percentage of Users Attended a Contest [Practice](https://leetcode.com/problems/percentage-of-users-attended-a-contest)

### Description  
Given two tables: **users** (user_id, user_name, mail) and **register** (user_id, contest_id), calculate the percentage of users who attended at least one contest, rounded to two decimal places. Attendance means having at least one record in the register table.

### Examples  

**Example 1:**  
Input: (`users` and `register` tables as below)  
Output: `33.33`  
*Explanation: If there are 3 users and 1 has a register entry, then 1/3 × 100 = 33.33.*

**Example 2:**  
Input: (`users` with 2 users, neither in register)  
Output: `0.00`  
*Explanation: Nobody attended any contest, so result is 0.00.*

**Example 3:**  
Input: (`users` with 5 users, register contains all)  
Output: `100.00`  
*Explanation: All attended at least one contest, so 100.00.*

### Thought Process (as if you’re the interviewee)  
- Find the number of unique users in the users table.
- Count how many unique user_ids appear in the register table.
- Compute: (number attended) / (total users) × 100.
- Watch out for cases where division by zero could occur (no users).
- Ensuring two decimal places, handle rounding according to SQL/logic.

### Corner cases to consider  
- Zero users in the users table.
- No entries in the register table.
- Register table includes user_id not in users (should be ignored).
- Users who registered multiple times, only count once.

### Solution

```python
# Usually done as an SQL query.
# But for illustration, here is a Python approach.
def percentage_attended(users, register):
    user_ids = set(user['user_id'] for user in users)
    attended = set(r['user_id'] for r in register if r['user_id'] in user_ids)
    if not user_ids:
        return '0.00'
    percentage = len(attended) / len(user_ids) * 100
    return format(percentage, '.2f')
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N+M)
  - Where N is the number of users and M the number of register entries.
- **Space Complexity:** O(N+M) 
  - Sets used to store user ids.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle users with invalid or missing ids?  
  *Hint: Data cleaning step for user_id integrity.*
- If users can have multiple emails/accounts, how to deduplicate?  
  *Hint: Join logic on user_name or mail instead of user_id.*
- Write the SQL equivalent of your solution.  
  *Hint: Use COUNT(DISTINCT...).* 

### Summary
A simple **set** and **division** problem often posed as an SQL data query—common in analytics and business dashboard scenarios.