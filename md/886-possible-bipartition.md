### Leetcode 886 (Medium): Possible Bipartition [Practice](https://leetcode.com/problems/possible-bipartition)

### Description  
Given **n** people labeled from 1 to n and a list of pairs called "dislikes", where each pair [a, b] indicates that person a and person b dislike each other, determine if it's possible to split all people into **two groups** such that no pair of people in the same group dislike each other. In other words, can everyone be partitioned into two groups with no internal conflicts? This is equivalent to checking if the "dislike" graph is **bipartite**.

### Examples  

**Example 1:**  
Input: `n=4, dislikes=[[1,2],[1,3],[2,4]]`  
Output: `True`  
Explanation: It's possible to split the group into [1,4] and [2,3]. No pair in any group dislikes each other.

**Example 2:**  
Input: `n=3, dislikes=[[1,2],[1,3],[2,3]]`  
Output: `False`  
Explanation: Any split will put 2 and 3 together in at least one group, but they dislike each other.

**Example 3:**  
Input: `n=5, dislikes=[[1,2],[2,3],[3,4],[4,5],[1,5]]`  
Output: `False`  
Explanation: The graph forms an odd-length cycle, so no bipartition is possible.

### Thought Process (as if you’re the interviewee)  

First, I’d notice this is a classic **graph coloring** problem.  
Each person is a node, edges are the "dislikes".  
We are asked if we can assign everyone to one of two groups, such that no one dislikes someone in their own group.

**Brute-force:**  
Try every possible way to split people, but there are 2ⁿ possibilities—impractical for n up to 2000.

**Optimized (Graph Approach):**  
- Model the problem as a graph. Each dislike creates an edge.
- Can we color the graph with two colors so that every edge connects nodes of different colors?
- A graph that can be 2-colored is called **bipartite**.
- We can check bipartiteness with either BFS or DFS: Start from a node, give it color A, all its neighbors are color B, and so on. If we ever find a neighbor with the same color as the current node, it’s not bipartite.

**Trade-offs:**  
- BFS and DFS are both fine here; BFS is sometimes easier to follow and stack overflows aren’t a concern (n is small).

### Corner cases to consider  
- Empty dislikes (always possible to bipartition)
- n = 1 (trivially possible)
- Multiple disconnected subgraphs (need to check every component)
- Odd cycles (can’t bipartition)
- No dislikes (everyone can be in any group)

### Solution

```python
def possibleBipartition(n, dislikes):
    # Build adjacency list
    graph = [[] for _ in range(n + 1)]
    for a, b in dislikes:
        graph[a].append(b)
        graph[b].append(a)

    # 0: uncolored, 1: color 1, -1: color 2
    color = [0] * (n + 1)
    
    # BFS for each unvisited node (accounts for disconnected components)
    from collections import deque
    for i in range(1, n + 1):
        if color[i] == 0:
            queue = deque([i])
            color[i] = 1  # Assign first color

            while queue:
                node = queue.popleft()
                for neighbor in graph[node]:
                    if color[neighbor] == 0:
                        color[neighbor] = -color[node]
                        queue.append(neighbor)
                    elif color[neighbor] == color[node]:
                        # Neighbor has the same color, not bipartite
                        return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E), where V = n and E = len(dislikes). We traverse every node and edge once.
- **Space Complexity:** O(V + E), for the adjacency list and color array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you detect and return one possible grouping if bipartition exists?  
  *Hint: Store which group each person is assigned to during BFS/DFS.*

- What if people can dislike more than one person in the same dislike pair?  
  *Hint: No impact, as all dislike edges are represented in the adjacency list.*

- Could you do this without explicitly building the adjacency list?  
  *Hint: Not efficiently—as you need fast neighbor lookups.*

### Summary
This problem uses the **bipartite graph** checking pattern, common whenever you must split nodes into two sets under mutual exclusion constraints. BFS (or DFS) graph coloring is a classic technique here. The same technique applies to problems about checking two-colorability or scheduling tasks under pairwise conflicts.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
