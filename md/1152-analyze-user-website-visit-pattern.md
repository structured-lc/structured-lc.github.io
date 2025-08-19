### Leetcode 1152 (Medium): Analyze User Website Visit Pattern [Practice](https://leetcode.com/problems/analyze-user-website-visit-pattern)

### Description  
Given three arrays: **username**, **timestamp**, and **website**, each describing a user’s activity such that username[i] visited website[i] at time timestamp[i], the task is to find the **3-sequence** (an ordered list of three website names) that is visited by the largest number of users.  
The 3-sequence should record websites in the order they were visited by a user (not necessarily distinct). If multiple 3-sequences have the same maximum user count, return the lexicographically smallest one.

### Examples  

**Example 1:**  
Input:  
username = `["joe","joe","joe","james","james","james","james","mary","mary","mary"]`,  
timestamp = `[1,2,3,4,5,6,7,8,9,10]`,  
website = `["home","about","career","home","cart","maps","home","home","about","career"]`  
Output: `["home","about","career"]`  
Explanation:  
- Joe visited: home → about → career  
- James visited: home → cart → maps → home  
- Mary visited: home → about → career  
- The 3-sequence ("home", "about", "career") was visited by 2 users (joe and mary), more than any other 3-sequence.

**Example 2:**  
Input:  
username = `["u1", "u1", "u1", "u2", "u2", "u2"]`,  
timestamp = `[1,2,3,4,5,6]`,  
website = `["a", "b", "a", "a", "b", "c"]`  
Output: `["a","b","a"]`  
Explanation:  
- u1: a → b → a  
- u2: a → b → c  
- The 3-sequence ("a", "b", "a") and ("a", "b", "c") are both visited by 1 user, but ("a", "b", "a") comes first lexicographically.

**Example 3:**  
Input:  
username = `["u1","u1","u2","u2"]`,  
timestamp = `[1,2,3,4]`,  
website = `["a","b","a","b"]`  
Output: `["a","b","a"]`  
Explanation:  
- u1: a → b  
- u2: a → b  
- No user visited three websites, so no 3-sequence; your code should handle this gracefully (may return empty or handle as required by the platform).

### Thought Process (as if you’re the interviewee)  
First, map each user to their website visit history ordered by timestamp.  
For each user, generate all unique possible 3-sequences from their ordered website visits.  
Use a **set** per user so we do not double-count the same pattern for the same user.  
Next, count how many users visited each unique 3-sequence.  
Finally, select the 3-sequence visited by the most users; if there are ties, return the lexicographically smallest one.

The brute-force is O(n³) for each user, but since n is small (≤ 50), it's acceptable. To optimize, ensure:
- We sort each user’s visits by timestamp.
- Use a set to avoid counting the same user for the same sequence multiple times.
- Compare all candidate patterns for count and lexicographical order.

### Corner cases to consider  
- Users with fewer than 3 visits (can't form a 3-sequence).
- Multiple users visiting the same 3-sequence.
- Duplicate 3-sequences per user (should count once per user only).
- Multiple sequences with the same max user count; must pick the lexicographically smallest.
- Inputs with only one user or no valid 3-sequence possible.

### Solution

```python
from collections import defaultdict
from itertools import combinations

def mostVisitedPattern(username, timestamp, website):
    # 1. Combine all info and sort by timestamp
    records = sorted(zip(timestamp, username, website))
    
    # 2. Group visits for each user, in time order
    user_visits = defaultdict(list)
    for time, user, site in records:
        user_visits[user].append(site)
    
    # 3. For each user, find all unique 3-sequences in their visit order
    seq_count = defaultdict(set)  # seq: set of users
    for user, sites in user_visits.items():
        if len(sites) < 3:
            continue
        seen = set()
        for seq in set(combinations(sites, 3)):  # use set to avoid duplicates for one user
            seq_count[seq].add(user)
    
    # 4. Find max user coverage, breaking ties lex
    max_count = 0
    result_seq = tuple()
    for seq, users in seq_count.items():
        count = len(users)
        if count > max_count or (count == max_count and seq < result_seq):
            max_count = count
            result_seq = seq
            
    return list(result_seq)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - Sorting the n records: O(n log n)
    - Grouping visits by user: O(n)
    - For each user's k visits, generating all 3-combinations: O(k³) per user, total still bounded as n ≤ 50.
    - Final tally: proportional to possible unique 3-sequences (limited as above).
    - **Overall:** O(n³) in worst case, but acceptable for n=50.

- **Space Complexity:**  
    - O(n): for mapping users and storing all records.
    - O(u × p): For storing each unique 3-sequence and users who visited them (u=number of users, p=unique patterns).
    - Bounded since n is small.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale your solution if n was very large (say, 10⁶)?
  *Hint: What if you only tracked the top-K sequences, or limited yourself to frequency without user histories?*

- What if you wanted patterns of length k, not just 3?
  *Hint: How does the combination logic change, and is it still feasible?*

- If the data stream was real time, could you update your answer online?
  *Hint: Can you incrementally update user histories and sequence counts on each new event?*

### Summary
This approach:  
- Maps user activity, sorts, and processes visit order,
- Uses set logic to avoid double counting and combinations to generate all candidate patterns,
- Relies on classic frequency counting combined with lexicographical tiebreaking.  
It’s a common pattern for **pattern analysis**, **sliding window combinations**, and **frequency analysis in logs**—relevant for web analytics and behavioral sequence mining.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
