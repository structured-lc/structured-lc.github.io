### Leetcode 2097 (Hard): Valid Arrangement of Pairs [Practice](https://leetcode.com/problems/valid-arrangement-of-pairs)

### Description  
You are given an array of pairs, where each pair [u, v] represents a directed edge from u to v. Your task is to rearrange the pairs so that for every consecutive pair, the end of the previous pair equals the start of the next — formally, for the output array of pairs, output[i-1][1] == output[i] for 1 ≤ i < n. There may be multiple valid orders; you are to return any valid arrangement. You are guaranteed that such an arrangement exists.

### Examples  

**Example 1:**  
Input: `pairs = [[5,1],[4,5],[11,9],[9,4]]`  
Output: `[[11,9],[9,4],[4,5],[5,1]]`  
*Explanation: The arrangement connects 11→9→4→5→1 — each next pair starts where the previous ended.*

**Example 2:**  
Input: `pairs = [[1,2],[2,3],[3,4],[4,1]]`  
Output: `[[1,2],[2,3],[3,4],[4,1]]`  
*Explanation: You can follow 1→2→3→4→1, forming a cycle.*

**Example 3:**  
Input: `pairs = [[100,200],[200,300],[300,400]]`  
Output: `[[100,200],[200,300],[300,400]]`  
*Explanation: A simple sequence: 100→200→300→400.*

### Thought Process (as if you’re the interviewee)  
First, I notice this problem asks me to organize directed pairs so that the end-node of one matches the start-node of the next — the signature of an **Eulerian path/circuit** in a directed graph.

Brute-force would be trying all permutations, but that's infeasible for large input (n! complexity). Instead, I recall that an Eulerian path exists in a directed graph if at most one node has out-degree - in-degree = 1 (start), one has in-degree - out-degree = 1 (end), and all others are balanced.

So, I should:
- Build a graph and count in/out degrees.
- Find a suitable start node (where out-degree = in-degree + 1). If none, pick any node from the first pair.
- Use **Hierholzer's algorithm** to construct the path efficiently:
  - Perform depth-first traversal, removing edges as I visit them, and record the path.
  - Reverse the recorded path at the end.

This approach is linear in the number of nodes and edges, which is crucial given constraints can reach 10⁵.

### Corner cases to consider  
- Only one pair: should trivially return the same pair.
- The graph forms a pure cycle.
- Multiple incoming edges to a node, or multiple outgoing edges.
- The pairs are already in valid order.
- Disconnected components cannot occur, since input guarantees a valid arrangement.
- Pairs with large numbers, negative numbers.

### Solution

```python
def validArrangement(pairs):
    # Step 1: Create a graph as adjacency list and count in/out degrees
    from collections import defaultdict, deque

    graph = defaultdict(deque)
    in_deg = defaultdict(int)
    out_deg = defaultdict(int)

    for u, v in pairs:
        graph[u].append(v)
        out_deg[u] += 1
        in_deg[v] += 1

    # Step 2: Find start node: node with out_deg - in_deg = 1, or default to pairs[0][0]
    start = pairs[0][0]
    for node in graph:
        if out_deg[node] - in_deg[node] == 1:
            start = node
            break

    # Step 3: Hierholzer's algorithm for Eulerian Path
    res = []

    def dfs(u):
        while graph[u]:
            v = graph[u].popleft()
            dfs(v)
            res.append([u, v])

    dfs(start)
    res.reverse()
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E + V), where E is number of pairs and V is number of unique nodes. Each edge and node is processed a constant number of times (building degrees, constructing graph, DFS).
- **Space Complexity:** O(E + V) for graph storage, in/out-degree maps, answer list (same order as input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could have disconnected components?
  *Hint: Check if the graph is weakly connected before trying to output a path.*

- How do you handle the case when not all pairs can be arranged in a valid sequence?
  *Hint: Validate Eulerian path degree conditions first and detect if such arrangement is possible.*

- Can you output all possible valid arrangements?
  *Hint: This reduces to listing all Eulerian paths, which is generally exponential in number — discuss tractability and implications.*

### Summary
This problem is a classic application of the Eulerian path algorithm (specifically Hierholzer's algorithm) in directed graphs. It's a useful pattern in graph sequencing/rearrangement problems and efficient for large input sizes. This elegant solution generalizes to problems like reconstructing itinerary, word ladder paths, and DNA sequence assembly from k-mers.