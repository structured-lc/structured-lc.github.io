### Leetcode 2924 (Medium): Find Champion II [Practice](https://leetcode.com/problems/find-champion-ii)

### Description  
Given a tournament with `n` teams (numbered 0 to n-1), and a list of matches indicating which teams defeated which, find if there is a **unique champion**—a team that *no other team has defeated*. Each match is a pair `[a, b]` meaning "team a defeated team b". If exactly one team is *undefeated* (no incoming edges), return its index. If there is no unique champion (i.e., *no* undefeated teams or *multiple* undefeated teams), return -1.

### Examples  

**Example 1:**  
Input: `n = 3, edges = [[0,1],[1,2]]`  
Output: `0`  
*Explanation: 0 defeated 1, 1 defeated 2. Team 0 has no incoming edge (no one defeated 0), so 0 is the unique champion.*

**Example 2:**  
Input: `n = 3, edges = [[0,1],[1,2],[2,0]]`  
Output: `-1`  
*Explanation: Tournament forms a cycle: 0→1→2→0. Every team has an incoming edge, so there is no undefeated champion.*

**Example 3:**  
Input: `n = 4, edges = [[0,1],[2,3]]`  
Output: `-1`  
*Explanation: Both 0 and 2 are undefeated; each has no incoming edge. Since there isn't exactly one, return -1.*

### Thought Process (as if you’re the interviewee)  
The problem boils down to identifying a *unique root* in a directed acyclic graph (DAG) where an edge points from the winner to the loser. The root—the champion—would be the only node without incoming edges.

**Brute-force Approach:**  
Count, for each team, how many times they are defeated (number of matches where they show up as the second element). At the end, if there's exactly one team never defeated (count is zero), that's our champion.

**Optimized Approach:**  
- Track the "in-degree" (incoming edge count = number of times defeated) for each team.
- Only one team should have in-degree 0, all others ≥1.
- Return -1 if not exactly one such team.

This is efficient (linear with number of edges and teams), and it directly fits the problem structure.

Trade-offs: No need to build a full graph since only the in-degree matters for this problem.

### Corner cases to consider  
- n = 1, edges = [] ⇒ The only team is the champion (should return 0).
- n = 0 ⇒ No teams.
- Multiple teams with zero in-degree ⇒ No unique champion, return -1.
- All teams have at least one incoming edge (e.g., cycle) ⇒ return -1.
- Empty edges ⇒ All teams undefeated; if n = 1, answer is 0. If n > 1, answer is -1.

### Solution

```python
def findChampion(n, edges):
    # Track how many times each team has lost (in-degree)
    in_degree = [0] * n

    # Count in-degree for each team based on given matches
    for winner, loser in edges:
        in_degree[loser] += 1

    # Find all teams with in-degree 0 (undefeated teams)
    undefeated_teams = [i for i, degree in enumerate(in_degree) if degree == 0]

    # If exactly one, return its index; else, return -1
    if len(undefeated_teams) == 1:
        return undefeated_teams[0]
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the number of teams and m is the number of matches.   
  - Counting in-degrees across m edges (O(m)), iterating over n teams for final check (O(n)).
- **Space Complexity:** O(n) for the in-degree array (one entry per team).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matches are not acyclic (i.e., contain cycles)?  
  *Hint: Consider how cycles affect the unique undefeated team.*

- How would you modify the algorithm to return *all* teams with the maximum "win difference" instead of only undefeated?  
  *Hint: Track both wins (out-degree) and losses (in-degree) for each team.*

- If each match can be played more than once (multiple edges between same teams), how would the answer change?  
  *Hint: Consider if duplicate matches affect the notion of "undefeated".*

### Summary
This is a classic **indegree counting** problem in a directed graph context. The main technique is to identify a unique "root" (in-degree 0), used in other settings like finding the source of a DAG, topological sort, and tournament/competition winner analysis. This pattern is broadly applicable in graph problems involving hierarchies, dependencies, or tournament eliminations.


### Flashcard
Find the node with zero incoming edges in the graph (never defeated); if unique, that’s the champion.

### Tags
Graph(#graph)

### Similar Problems
