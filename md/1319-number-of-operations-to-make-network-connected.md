### Leetcode 1319 (Medium): Number of Operations to Make Network Connected [Practice](https://leetcode.com/problems/number-of-operations-to-make-network-connected)

### Description  
Given `n` computers labeled from `0` to `n - 1` and a list of `connections` where each connection is a direct bidirectional link between two computers, determine the minimum number of operations you need to perform so that all computers are connected (directly or indirectly). You can only reconnect a cable between two different computers (i.e., you may re-use an existing cable to connect any two computers). If it is impossible to connect all computers, return `-1`.

### Examples  

**Example 1:**  
Input: `n = 4, connections = [[0,1],[0,2],[1,2]]`  
Output: `1`  
*Explanation: Computer 3 is disconnected. We remove one extra connection, such as [1,2], and connect [2,3], which makes the network connected.*

**Example 2:**  
Input: `n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]`  
Output: `2`  
*Explanation: Computers 4 and 5 are disconnected. Two separate operations are needed to connect them into the network using redundant cables.*

**Example 3:**  
Input: `n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]`  
Output: `-1`  
*Explanation: Not enough cables. 5 cables minimum needed for 6 computers (⌊n-1⌋). Only 4 provided, hence impossible.*

### Thought Process (as if you’re the interviewee)  
- The network must be fully connected using the existing cables, possibly by rearranging them.
- To connect `n` computers, need at least `n-1` cables — think of a tree.
- If connections < n-1, it's immediately impossible ⇒ return `-1`.
- Use Union-Find (Disjoint Set Union):
    - Each time we see two computers in the same group already, mark the cable as redundant.
    - Otherwise, join them, merging two separate groups.
- In the end, the number of operations required is the number of disconnected groups minus 1 (so everything becomes one group).
- Return number of operations required if there are enough redundant cables, else return `-1`.

### Corner cases to consider  
- No computers: n = 0
- No connections
- All already connected
- Not enough cables to ever connect
- Multiple redundant cables
- Disconnected clusters with no way to join

### Solution

```python
# Union-Find to group computers, track redundant cables
def makeConnected(n, connections):
    # If not enough cables, impossible
    if len(connections) < n - 1:
        return -1
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # Path compression
            x = parent[x]
        return x
    num_components = n
    for a, b in connections:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb  # Union
            num_components -= 1
    # Number of ops: (components - 1)
    return num_components - 1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n + m) where n is the number of nodes and m is the number of connections. Union-Find with path compression is nearly constant amortized per operation.
- **Space Complexity:** O(n) because of the parent array storing root for each node.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list of connections is extremely large (millions of nodes)?  
  *Hint: Can you make Union-Find scale? Consider path compression and union by rank.*

- Can you return the actual list of operations (cable moves)?  
  *Hint: Track redundant cables and components explicitly.*

- What if the network isn’t bidirectional?  
  *Hint: Directed graph — would you need a different approach?*

### Summary
This is a classic union-find (DSU) application to track connectivity and redundant edges in a network graph. The algorithm finds the number of connected components and checks if enough cables exist to connect everything, making it a template for similar connectivity and clustering problems.


### Flashcard
If connections < n-1, return -1; otherwise, use Union-Find to count connected components, answer is components-1.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
