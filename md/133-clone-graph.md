### Leetcode 133 (Medium): Clone Graph [Practice](https://leetcode.com/problems/clone-graph)

### Description  
Given a reference to a node in a **connected, undirected graph**, return a **deep copy** (clone) of the graph.  
- Each node contains a value (int) and a list of its neighbors.
- The clone must be a new set of node objects, but connected in exactly the same way as the original.
- You are only given one reference node—must traverse and clone the entire graph using this.

### Examples  

**Example 1:**  
Input:  
```  
Graph: 
   1
 /   \
2 --- 4
 \ 
  3
Adjacency list: [ [2,4],[1,3],[2,4],[1,3] ]
Node: 1
```  
Output:  
```  
Cloned graph:
   1'
 /    \
2' --- 4'
 \ 
  3'
Adjacency: [2',4'], [1',3'], [2',4'], [1',3']
```
*Explanation: Each node and its neighbors are cloned as new objects. The connections mirror the original.*

**Example 2:**  
Input:  
```
Node = None
```
Output:  
```
None
```
*Explanation: Empty graph, so the clone is also empty (`None`).*

**Example 3:**  
Input:  
```
Single node graph: [1, []]
```
Output:  
```
Single node clone: [1', []]
```
*Explanation: One node, no neighbors; the clone is a separate node with no neighbors.*

### Thought Process (as if you’re the interviewee)  
- The goal is to create a true **deep copy**: no shared nodes between original and clone.
- Cannot simply copy the input node's value; must traverse and recursively (or iteratively) clone all reachable nodes.
- Must handle **cycles** and **self-loops**, so a visited map (original node → cloned node) is required to avoid infinite recursion and ensure each node is only cloned once.
- **Brute-force idea:** Traverse nodes recursively, but without a visited map, would get stuck in cycles or produce duplicate nodes for the same value.
- **Optimized (correct) approach:**  
  - Use DFS (recursive) or BFS (iterative).
  - Maintain a dictionary: original node → cloned node.
  - For each node:
    - If not cloned, create the clone and add to the map.
    - Recursively clone all neighbors and connect them.

### Corner cases to consider  
- The input node is `None` (empty graph).
- The graph is a single node.
- The graph contains cycles or self-loops.
- Multiple nodes with the same value (but different objects).
- Disconnected components? (Unlikely by problem statement—assume connected as per description.)

### Solution

```python
# Definition for a Node in the graph.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        # Dictionary to track cloned nodes (original node -> cloned node)
        visited = {}

        def dfs(curr):
            # If already cloned, return its clone
            if curr in visited:
                return visited[curr]

            # Clone the current node
            clone = Node(curr.val)
            visited[curr] = clone

            # Clone all the neighbors recursively
            for neighbor in curr.neighbors:
                clone.neighbors.append(dfs(neighbor))

            return clone

        return dfs(node)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E), where V is the number of nodes and E is the number of edges.  
  Each node and each edge are traversed exactly once during the deep copy.

- **Space Complexity:** O(V), for the visited dictionary storing one entry per node and the recursion call stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this iteratively using BFS?  
  *Hint: Replace recursion with a queue and process nodes level by level.*

- What if the graph is directed instead of undirected?  
  *Hint: The same algorithm applies, but connections are only one-way.*

- How would you handle cloning a graph with arbitrarily large values or other attributes?  
  *Hint: Extend the Node class's constructor and copy fields as needed.*

### Summary
This is a classic **graph traversal + hashmap** pattern, commonly used in situations where we must track copies of already visited nodes to avoid duplication and infinite loops.  
The solution uses recursive DFS for simplicity; the same idea applies to BFS.  
This pattern appears in many problems involving deep copying or traversing possibly cyclic graphs, and is also foundational for serializing/deserializing graphs and dealing with complex pointer structures.