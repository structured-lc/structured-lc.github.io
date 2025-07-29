### Leetcode 1583 (Medium): Count Unhappy Friends [Practice](https://leetcode.com/problems/count-unhappy-friends)

### Description  
You have n friends (n even), and each has a preference list ranking all others. Everyone is paired with one other friend (pairs are exclusive). A friend x is "unhappy" if there is some u whom x prefers more than x's current partner y, and u also prefers x more than u's current partner v. Count how many friends are unhappy.

### Examples  
**Example 1:**  
Input: `n = 4, preferences = [[1,2,3],[3,2,0],[3,1,0],[1,2,0]], pairs = [[0,1],[2,3]]`  
Output: `2`  
*Explanation: 0 pairs with 1, 2 with 3. For 1 and 2, there exist friends they'd rather be with (and vice versa) — both are unhappy.*

**Example 2:**  
Input: `n = 2, preferences = [[1],], pairs = [[1,0]]`  
Output: `0`  
*Explanation: With just 2 friends, no one can be unhappy.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to, for every person x, check all friends u that x prefers to their partner y. If u also prefers x to their own partner v, x is unhappy.
- To optimize, use two maps:
    - One (say `pair`) storing for each friend their partner.
    - Another (say `prefer`) mapping every (person, their target) to rank (order in that friend's preferences).
- Iterate over each friend x. For all friends u that x ranks higher than their own partner y, check if u would rather be with x than their own partner.
- Count such people.

### Corner cases to consider  
- n = 2 or everyone happy: result 0.
- Multiple unhappy per pair.
- All permutations of preferences.
- Repeating pairs/order does not matter for output order.

### Solution

```python
def unhappyFriends(n, preferences, pairs):
    # who each person is partnered with
    partner = [0]*n
    for x, y in pairs:
        partner[x] = y
        partner[y] = x
    # friend ranking: prefer[x][u] = rank of u in x's list
    prefer = [dict() for _ in range(n)]
    for i in range(n):
        for rank, friend in enumerate(preferences[i]):
            prefer[i][friend] = rank
    ans = 0
    for x in range(n):
        y = partner[x]
        # iterate over friends ranked higher than y in x's list
        for u in preferences[x][:prefer[x][y]]:
            v = partner[u]
            # check if u also prefers x over their own partner
            if prefer[u][x] < prefer[u][v]:
                ans += 1
                break
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), since we may touch all preferences per person.
- **Space Complexity:** O(n²) for preference ranks lookup.

### Potential follow-up questions (as if you’re the interviewer)  
- What if preferences list is incomplete (not all friends listed)?  
  *Hint: How would you handle missing ranking?*

- How would you optimize for large n where most people are happy?  
  *Hint: Early stopping/break as soon as someone is unhappy.*

### Summary
This is a pairing stability/unhappiness check drawing on the stable marriage problem. The main patterns involve preference order mapping and two-sided mutual ranking checks. This applies to many problems on assignments, rankings, or matching.