### Leetcode 2359 (Medium): Find Closest Node to Given Two Nodes [Practice](https://leetcode.com/problems/find-closest-node-to-given-two-nodes)

### Description  
Given a directed graph with n nodes numbered from 0 to n−1, where each node has at most one outgoing edge, the graph is represented by the array edges of size n. For each i, edges[i] is the node that i points to, or -1 if there is no outgoing edge.  
Given two nodes node1 and node2, your task is to find a node that is reachable from both node1 and node2, minimizing the maximum of the distances from node1 and node2 to that node. If multiple valid nodes exist, return the one with the smallest index. If no such node exists, return -1.  
Note: The graph may contain cycles.

### Examples  

**Example 1:**  
Input: `edges = [2,2,3,-1]`, `node1 = 0`, `node2 = 1`  
Output: `2`  
*Explanation:  
Paths from node1 (0): 0 → 2 → 3  
Paths from node2 (1): 1 → 2 → 3  
Node 2 is the first node they both can reach. The max distance to node 2 is 1. No other node is better.*

**Example 2:**  
Input: `edges = [1,2,-1]`, `node1 = 0`, `node2 = 2`  
Output: `2`  
*Explanation:  
0 → 1 → 2  
2 is reached by node2 in 0 steps, node1 in 2 steps.  
No other node is reachable from both.*

**Example 3:**  
Input: `edges = [4,4,4,5,1,2,-1]`, `node1 = 1`, `node2 = 6`  
Output: `1`  
*Explanation:  
Paths from node1 (1): 1 → 4 → 1 (cycle)  
node2 (6) only: 6.  
No common reachable node except 1 (by node1 only), but 1 is not reachable from node2, so output is `-1`.*

### Thought Process (as if you’re the interviewee)  
Brute-force idea: For each node, check if both node1 and node2 can reach it, and compute the longest distance among node1→node and node2→node. Return the node with the smallest such maximum, breaking ties by index.

But brute-force BFS/DFS from both nodes for each node is inefficient (O(n²)). Instead:
- For each source node, perform a simple traversal (since outdegree ≤1) and record distance to every other reachable node in an array.
- For each node, if both distances are not inf, take the max. Track the minimum max-distance found, and corresponding index.
- If multiple candidates have the same min max-distance, pick the smallest index.

Cycles can be handled by not revisiting nodes.

This approach ensures O(n) time and space as each node is traversed at most once per source.

### Corner cases to consider  
- Graph contains cycles.
- node1 and node2 are the same node.
- No node is reachable from both node1 and node2.
- Disconnected subgraphs.
- edges contains lots of -1 (many isolated nodes).
- Only one node in the graph (n=1).
- Both nodes cannot reach any other node (or themselves).

### Solution

```python
def closestMeetingNode(edges, node1, node2):
    # Helper to record distances from a source to every node
    def get_distances(start):
        n = len(edges)
        dist = [float('inf')] * n
        step = 0
        node = start
        while node != -1 and dist[node] == float('inf'):
            dist[node] = step
            step += 1
            node = edges[node]
        return dist

    dist1 = get_distances(node1)
    dist2 = get_distances(node2)
    min_dist = float('inf')
    res = -1
    for i in range(len(edges)):
        if dist1[i] != float('inf') and dist2[i] != float('inf'):
            maxd = max(dist1[i], dist2[i])
            if maxd < min_dist or (maxd == min_dist and i < res):
                min_dist = maxd
                res = i
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each traversal from node1 and node2 visits each node at most once. The final loop is O(n).
- **Space Complexity:** O(n).  
  For storing two distance arrays of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this for multiple (k > 2) source nodes?  
  *Hint: Precompute distance arrays for each source, then for each node, take the max distance from any source and minimize that.*

- What if edges could have weights?  
  *Hint: Dijkstra's algorithm from each source instead of simple pointer hopping.*

- How would you do this if each node could have multiple outgoing edges (i.e., arbitrary DAG or graph)?  
  *Hint: Use BFS or Dijkstra per source, or multi-source BFS if unweighted.*

### Summary
This problem leverages the pattern of distance-of-each-node-from-source precomputation using DFS/BFS or simple traversal due to the “one or zero outgoing edge” property. This approach is efficient for chain or cycle-like graphs, which avoids the overhead of generic BFS. The node-by-node comparison for the joint reachability and minimizing max distance is common in union path or meeting point problems (like minimal meeting node, shortest common ancestor, etc.). The pattern of “minimum value of the maximum distance” also appears often in collaborative path or rendezvous problems.