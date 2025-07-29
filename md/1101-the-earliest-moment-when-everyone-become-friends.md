### Leetcode 1101 (Medium): The Earliest Moment When Everyone Become Friends [Practice](https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends)

### Description  
Given a list of friendship logs where `logs[i] = [timestamp, personA, personB]`, each log entry records when `personA` and `personB` become friends at a specific time. There are `n` people labeled from `0` to `n-1`. Friendship is both **symmetric** (if A is friends with B, B is friends with A) and **transitive** (if A is friends with B and B is friends with C, then A is friends with C). Return the earliest timestamp at which everyone in the group is acquainted with each other — meaning there's only one friendship group connecting all people. If no such time exists, return `-1`.

### Examples  

**Example 1:**  
Input: `logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6`  
Output: `20190301`  
*Explanation:  
- Process friendships by time:  
  - After 20190104: groups are [0,1], [2], [3,4], [5]
  - 20190107: [0,1], [2,3,4], [5]
  - 20190211: [0,1,5], [2,3,4]
  - 20190224: [0,1,5], [2,3,4]
  - 20190301: all merged into one group  
  So, on 20190301, everyone is connected.*

**Example 2:**  
Input: `logs = [[1,0,1],[2,2,3]], n = 4`  
Output: `-1`  
*Explanation:  
After all logs, groups remain: [0,1], [2,3]. Not all are connected, so return -1.*

**Example 3:**  
Input: `logs = [[1,0,1],[2,1,2],[3,2,3]], n = 4`  
Output: `3`  
*Explanation:  
After processing all logs by time, there is a single group at time 3.*

### Thought Process (as if you’re the interviewee)  
The key idea is that the problem translates to a **dynamic connectivity** problem: we want to know the earliest time when all nodes are merged into a single connected component.

Brute-force:  
- Build a graph, process each log in order of timestamp, and after each step, check if the graph is fully connected (e.g., via DFS or BFS from node 0).
- However, for every log entry, running a full graph traversal is too slow for higher `n` or for many logs.

Optimized idea:  
- We need a data structure that can efficiently manage connectivity and merging groups: **Union-Find** (Disjoint Set Union, DSU).
- Sort logs by timestamp and apply unions for each friendship.
- Whenever the number of connected components drops to 1, we've found the time when everyone is connected.

The Union-Find approach is fast and well-suited for this type of dynamic graph connectivity check.

### Corner cases to consider  
- Only one person (`n=1`) — return the earliest timestamp or 0.
- Not enough logs to connect all people (`n>1` but only `n-2` logs).
- Multiple logs for the same pair; only first matters for connectivity.
- Duplicate connections; should be ignored by the union-find structure.
- Out-of-order logs; must process them ordered by timestamp.
- Empty logs or `n=0`; return -1.

### Solution

```python
def earliestAcq(logs, n):
    # Sort logs by timestamp
    logs.sort()
    
    # Union-Find data structure
    parent = [i for i in range(n)]
    rank = [1] * n
    groups = n  # Number of connected components

    # Find with path compression
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    # Union with union by rank
    def union(x, y):
        rootX = find(x)
        rootY = find(y)
        nonlocal groups
        if rootX == rootY:
            return False
        # Union by rank
        if rank[rootX] < rank[rootY]:
            parent[rootX] = rootY
        elif rank[rootX] > rank[rootY]:
            parent[rootY] = rootX
        else:
            parent[rootY] = rootX
            rank[rootX] += 1
        groups -= 1
        return True

    for time, x, y in logs:
        if union(x, y):
            if groups == 1:
                return time
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting logs: O(m log m), where m is number of logs.
  - Union-Find operations: O(m × α(n)), with α(n) being the inverse Ackermann function (almost constant).
  - Total: O(m log m)

- **Space Complexity:**  
  - O(n) for parent and rank arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to output the actual connection path or order of connections?
  *Hint: Track the parents or merge history in the union-find.*

- How would you modify the code to handle dynamic add/removal of friendships?
  *Hint: Classic union-find can't handle deletions efficiently; might need dynamic connectivity or link-cut trees.*

- If timestamps can be tied and are not unique, does this change your approach?
  *Hint: Process all logs with the same timestamp before checking connectivity.*

### Summary
This problem uses the **Union-Find (Disjoint Set Union)** pattern, a classic approach for dynamic graph connectivity questions. By sorting the logs and merging groups as friendships form, we can efficiently find the earliest timestamp where everyone is in one group. This coding pattern is widely applicable in network connectivity, Kruskal’s algorithm for Minimum Spanning Tree, and dynamic component queries in graphs.