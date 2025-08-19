### Leetcode 1501 (Medium): Countries You Can Safely Invest In [Practice](https://leetcode.com/problems/countries-you-can-safely-invest-in)

### Description  
Given a set of countries and the investments between them (as edges), where an edge means investments may be subject to risk through that path, find all countries which are "safe" — meaning, starting your investment from there, it is not possible for your investment to reach a cycle (i.e., you won't fall into endless loops of risky investments).

Essentially, return all nodes in a directed graph that are not part of or can reach a cycle. These "safe" countries are those from which all possible investment paths ultimately terminate, never forming a cycle.

### Examples  
**Example 1:**  
Input: `graph = [[1,2],[2,3],[5],,[5],[],[]]`
Output: `[2,4,5,6]`
*Explanation:*
- Countries 5 and 6 have no outgoing edges, so are always safe.
- Country 4 points to 5, which is safe, so 4 is safe.
- Country 2 points to 3 (which points to 0, which points to 1, which points to 2), so countries 0,1,2,3 are in a cycle. But, since 2's only outgoing edge is to 3 (not itself), need further DFS to check safety (cycle check ultimately needed).
- So the safe countries are those that do not participate in cycles.

**Example 2:**  
Input: `graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]`
Output: `[4]`
*Explanation:*
- Only country 4 has no outgoing paths; all other nodes can participate in cycles.

### Thought Process (as if you’re the interviewee)  
The "safe countries" are nodes not in a cycle and do not reach a cycle. This is a variant of the "eventual safe nodes" idea (topological sort/directed graph cycle detection).
- For each country, do a DFS to check if starting from it could reach a cycle. If not, it's safe.
- States for each node: UNKNOWN, VISITING, SAFE, UNSAFE.
  - If a node is currently visiting, and we see it again, we've found a cycle.
  - If a node is SAFE, no need to check again.
- For efficiency, memoize/check safety status so no repeated DFS for already-checked nodes.

Final answer is all nodes marked SAFE.

### Corner cases to consider  
- Disconnected graphs (some isolated nodes).
- Multiple cycles, separate or overlapping.
- All nodes in cycle (no safe countries).
- Graph where all nodes have zero out-edges (all are safe).

### Solution

```python
class Solution:
    def eventualSafeNodes(self, graph):
        n = len(graph)
        state = [0] * n  # 0=UNKNOWN, 1=VISITING, 2=SAFE

        def dfs(node):
            if state[node] == 1:  # In current stack, found a cycle
                return False
            if state[node] == 2:  # Already proven safe
                return True
            state[node] = 1  # Mark as visiting
            for nei in graph[node]:
                if not dfs(nei):
                    return False
            state[node] = 2
            return True

        return [i for i in range(n) if dfs(i)]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n + e), where n = countries, e = edges. Each edge and node visited at most once per DFS.
- **Space Complexity:** O(n) for state tracking, plus O(n) recursion stack (worst-case).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle investment flows that can be reversed dynamically?  
  *Hint: Think about recalculation and dynamic graph changes.*
- Can you use BFS instead of DFS for this problem?  
  *Hint: Topological sort via reversed graph (Kahn's algorithm).* 
- How would you efficiently recompute safe countries if new edges are added?  
  *Hint: Update only affected nodes, not the whole graph.*

### Summary
Uses the **DFS cycle-detection** and **topological sorting** pattern typical for problems finding safe nodes or terminals in directed graphs. Pattern is broadly useful in dependency resolution, deadlock detection, and other graph-cycle analysis tasks.

### Tags
Database(#database)

### Similar Problems
- Average Salary: Departments VS Company(average-salary-departments-vs-company) (Hard)