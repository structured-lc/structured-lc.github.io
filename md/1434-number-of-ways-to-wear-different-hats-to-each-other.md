### Leetcode 1434 (Hard): Number of Ways to Wear Different Hats to Each Other [Practice](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other)

### Description  
Given n people (numbered 0 to n-1), and 40 types of hats (numbered 1 to 40), where each person may own some subset of hats, compute the number of ways each person can wear a distinct hat (no two people have the same hat), such that they only wear hats they own. Return the result modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `hats = [[3,4],[4,5],[5]]`
Output: `1`
*Explanation: Person 0 can wear 3 or 4, person 1 can wear 4 or 5, and person 2 can wear 5. Only way: 0→3, 1→4, 2→5.*

**Example 2:**  
Input: `hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]`
Output: `0`
*Explanation: There are 12 people, all can wear hats 1-4 only. Since hats must be unique and there are not enough types for each person, answer is 0.*

### Thought Process (as if you’re the interviewee)  
Naive: Try _all_ permutations of hats. Too slow, as 40! is huge.
DP is key: Since people ≤ 10, but hats can be 40, model it as DP on bitmask: for each subset of people (mask), count the ways to assign hats 1..40 so that every person in mask wears a unique hat - only what they own. For each hat from 1-40, decide whether to assign it, and to whom among those who can wear it.

State: dp[hat][mask] = #ways up to hat 'hat' assigning hats to persons in mask.

For each hat, for every subset of assigned persons (mask), try assigning this hat to some person (if available) (and add to mask), or skip it.

### Corner cases to consider  
- Some people have empty lists (can't wear any hat).
- Some hats are not in any person's list.
- Empty hats input.
- All people own at least one hat.
- More people than hats (impossible).

### Solution

```python
MOD = 10**9 + 7

def numberWays(hats):
    n = len(hats)
    # People per hat: list of lists
    hat2people = [[] for _ in range(41)]
    for i, owned in enumerate(hats):
        for h in owned:
            hat2people[h].append(i)
    # DP: dp[mask], mask is n-bit number representing assigned people
    dp = [0] * (1 << n)
    dp[0] = 1
    for h in range(1, 41):
        ndp = dp[:]
        for mask in range(1 << n):
            for p in hat2people[h]:
                if not (mask & (1 << p)):
                    ndp[mask | (1 << p)] = (ndp[mask | (1 << p)] + dp[mask]) % MOD
        dp = ndp
    return dp[(1 << n) - 1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(40 × n × 2ⁿ), since we check each hat for each subset and each possible assignment.
- **Space Complexity:** O(2ⁿ), for DP states (n ≤ 10, so up to 1024 states).

### Potential follow-up questions (as if you’re the interviewer)  
- How would the solution change if people ≥ 20?  
  *Hint: Bitmask DP would not be feasible; try DP over hats instead, or model as bipartite matching.*

- What if some people must wear exactly k hats?  
  *Hint: You'd need to generalize mask state to track counts per person.*

- Is there a faster way if all hats are unique per person?  
  *Hint: Matching reduces to a counting problem/assignment problem.*

### Summary
This is a classic bitmask DP problem, modeling assignments similar to "Perfect Matching". The approach is broadly applicable to subset assignment ("assign unique X to Y under constraints") types of combinatorial problems.