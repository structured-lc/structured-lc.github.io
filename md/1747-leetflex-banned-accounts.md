### Leetcode 1747 (Medium): Leetflex Banned Accounts [Practice](https://leetcode.com/problems/leetflex-banned-accounts)

### Description  
Given a log table (`LogInfo`) with records for account logins and logouts across IP addresses, **find all `account_id`s that should be banned**.  
**Ban criteria:** An account should be banned if it was logged in at some moment from **two different IP addresses simultaneously** (the session times overlapped).   
You are given `account_id`, `ip_address`, `login`, and `logout`. Each `login` is before its corresponding `logout`.  
Return all such `account_id`s (duplicates and order don't matter).  
 
### Examples  

**Example 1:**  
Input:  
LogInfo =  
```
| account_id | ip_address | login                | logout               |
|------------|------------|----------------------|----------------------|
|     1      |    123     | 2021-04-01 10:00:00  | 2021-04-01 11:00:00  |
|     1      |    456     | 2021-04-01 10:30:00  | 2021-04-01 10:45:00  |
```
Output:  
`[1]`  
*Explanation: Account 1 was logged in from two different IPs (123 and 456) with overlap (10:30–10:45).*

**Example 2:**  
Input:  
LogInfo =  
```
| account_id | ip_address | login                | logout               |
|------------|------------|----------------------|----------------------|
|     2      |    123     | 2021-04-01 12:00:00  | 2021-04-01 12:10:00  |
|     2      |    123     | 2021-04-01 12:15:00  | 2021-04-01 12:30:00  |
```
Output:  
`[]`  
*Explanation: Account 2 logs in twice from the **same IP** (not banned, as no overlap across different IPs).*

**Example 3:**  
Input:  
LogInfo =  
```
| account_id | ip_address | login                | logout               |
|------------|------------|----------------------|----------------------|
|     3      |    9       | 2021-04-01 10:00:00  | 2021-04-01 10:15:00  |
|     3      |    13      | 2021-04-01 10:16:00  | 2021-04-01 10:30:00  |
```
Output:  
`[]`  
*Explanation: No overlapping session (session 2 starts after session 1 ends), so no ban.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For every user, check each pair of their sessions; for each pair with different IPs, check if their intervals overlap.
    - Time: O(n²) per user—very slow for lots of records.
- **Optimizing:**  
    - For each account, group all their sessions, sort by time, use a "sweep" algorithm or compare all intervals for overlap only between different IP addresses.
    - Use two pointers or interval tree per account for overlap comparisons, but for daily interview, a map per `(account_id, ip_address)` is a good start.
    - If data is in SQL, **self-join** on same account, different IPs, and compare intervals for overlap.
- **Trade-offs:**  
    - In code, complexity is O(n²) in worst-case for many overlapping intervals for an account, but generally feasible due to smaller session counts per account.
    - The more efficient solution leverages data grouping and only checks necessary pairs.

### Corner cases to consider  
- Accounts with only one login record.
- Same account_id but all sessions from same ip_address.
- Exactly-touching intervals (logout one equals login next): not overlapping (unless explicitly specified).
- Duplicate records (should not affect the logic).
- Input table is empty.
- Sessions nested within each other across different IPs (should be banned).
- Overlap across different days.

### Solution

```python
from typing import List, Dict, Tuple

def banned_accounts(logs: List[Dict]) -> List[int]:
    # logs is a list of dicts with keys: 'account_id', 'ip_address', 'login', 'logout'
    from collections import defaultdict

    # Step 1: Group sessions by account_id
    account_sessions = defaultdict(list)
    for log in logs:
        account_id = log['account_id']
        ip_addr = log['ip_address']
        login = log['login']
        logout = log['logout']
        account_sessions[account_id].append((ip_addr, login, logout))

    banned_ids = set()
    for account_id, sessions in account_sessions.items():
        # Compare every pair of sessions for different IPs and overlapping times
        n = len(sessions)
        for i in range(n):
            for j in range(i+1, n):
                ip1, start1, end1 = sessions[i]
                ip2, start2, end2 = sessions[j]
                if ip1 == ip2:
                    continue
                # Check overlap: start1 < end2 and start2 < end1
                if start1 < end2 and start2 < end1:
                    banned_ids.add(account_id)
                    break  # No need to check other pairs for this account
            else:
                continue
            break

    return list(banned_ids)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) per account for comparing each pair of sessions (with n = number of sessions of an account).  
  Overall, total sessions = m, so in the worst case (one account, all sessions), O(m²). Average case is faster if session count per account is small.
- **Space Complexity:** O(m) to store all sessions grouped by account; O(k) extra for the banned set (k = #banned accounts).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large tables (big data)?
  *Hint: Consider distributed (MapReduce/SQL) solutions or chunk-by-chunk processing per account.*
- If the definition of "overlap" is changed (e.g., overlaps at a millisecond), what code changes?
  *Hint: Adjust the overlap comparison logic (strictly < or ≤, depending on problem statement).*
- How to optimize when there are millions of users but very few bans?
  *Hint: Use early stopping when a ban is detected for an account.*

### Summary
This problem demonstrates the **interval overlap pattern** (pairwise comparison of session intervals within buckets) and can be solved via grouping and double-loop scan per account. The approach is similar to many "detect overlap/time conflict" interview questions, and generalizes to booking systems and meeting scheduler problems. It can also be solved efficiently in SQL via JOINs.


### Flashcard
For each account, group sessions by (login_time, logout_time, ip_address); check if any two sessions with different IPs have overlapping time intervals.

### Tags
Database(#database)

### Similar Problems
