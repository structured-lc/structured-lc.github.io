### Leetcode 1791 (Easy): Find Center of Star Graph [Practice](https://leetcode.com/problems/find-center-of-star-graph)

### Description  
Given an undirected **star graph** (one central node connected to every other node, and no other edges), you’re given a 2D array `edges` where each subarray `[u, v]` represents an edge between nodes `u` and `v`. Return the label of the **center node**—the one present in every edge.

### Examples  

**Example 1:**  
Input: `edges = [[1,2],[2,3],[4,2]]`  
Output: `2`  
*Explanation: 2 is the only node present in every edge: 2–1, 2–3, 2–4.*

**Example 2:**  
Input: `edges = [[1,3],[2,3],[3,4]]`  
Output: `3`  
*Explanation: 3 is the central node, appearing in every given edge.*

**Example 3:**  
Input: `edges = [[5,1],[1,2],[1,3],[1,4]]`  
Output: `1`  
*Explanation: node 1 is the only node that appears in every edge.*

### Thought Process (as if you’re the interviewee)  
To find the center in a star graph:
- **Brute-force:** Count how many times each node appears and return the one that appears `n-1` times for `n` nodes. This uses a counter/dictionary.
- **Optimized observation:** In a star graph, the center must appear in **every edge**. Specifically, the center node will appear in both of the *first two* edges, since every edge contains it. Thus, comparing the first two edges, the node that exists in both must be the center. This drastically simplifies the solution.
- **Tradeoff:** Brute-force works for any undirected graph but is unnecessary here; using the property of a star graph yields a solution in constant time and space.

### Corner cases to consider  
- The input always describes a valid star graph (per problem statement), so:
- No empty edges input.
- Edges may be in any order.
- Nodes may be labeled with any integers (not necessarily 1 to n in order).
- Only two edges: The center is the common node between them.

### Solution

```python
def findCenter(edges):
    # In a star graph, the center appears in every edge.
    # It's guaranteed to appear in both of the first two edges.
    # So just find the common node between edges[0] and edges[1].
    if edges[0][0] in edges[1]:
        return edges[0][0]
    else:
        return edges[0][1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Only constant time checks are performed for the first two edges.
- **Space Complexity:** O(1)  
  No extra storage beyond a few local variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is not guaranteed to be a valid star graph?  
  *Hint: Try counting node degrees and verifying one node appears in every edge.*

- How would you handle extremely large graphs where edges can’t fit into memory?  
  *Hint: Process edges in a streaming fashion—track the most frequent node seen so far.*

- What if the nodes are labeled with arbitrary large or negative integers?  
  *Hint: Your algorithm doesn’t depend on node values, only on set membership.*

### Summary
The pattern is to leverage the **uniqueness of the center in a star graph**, allowing you to check just the first two edges' overlap for the answer. This type of reasoning—**exploit graph/topology constraints for O(1) logic**—is common in "find the special node" or signature property problems, and appears in trees/graphs with similar characteristics elsewhere.