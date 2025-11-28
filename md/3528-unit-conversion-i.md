### Leetcode 3528 (Medium): Unit Conversion I [Practice](https://leetcode.com/problems/unit-conversion-i)

### Description  
Given n types of units indexed from 0 to n-1 and an array `conversions` of length n-1 where each element is `[sourceUnit, targetUnit, conversionFactor]`, meaning 1 unit of `sourceUnit` is equivalent to `conversionFactor` units of `targetUnit`. Calculate, for each unit type i, how many units of type i are equivalent to a single unit of type 0. Return an array of length n, where the iᵗʰ value represents the total units of i corresponding to 1 unit of type 0, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `conversions = [[0,1,2],[1,2,3]]`  
Output: `[1,2,6]`  
*Explanation: 1 unit of 0 → 2 of 1. 1 unit of 1 → 3 of 2. So, 1 unit of 0 = 2 units of 1 = 2×3 = 6 units of 2.*

**Example 2:**  
Input: `conversions = [[0,1,4],[1,2,5],[2,3,10]]`  
Output: `[1,4,20,200]`  
*Explanation: 1 of 0 → 4 of 1; 1 of 1 → 5 of 2; 1 of 2 → 10 of 3. Chain multiplication:  
- To get to 2: 1 of 0 → 4 of 1 → 4×5=20 of 2  
- To get to 3: 4×5×10=200 of 3.*

**Example 3:**  
Input: `conversions = [[0,1,7]]`  
Output: `[1,7]`  
*Explanation: 1 unit of 0 = 7 units of 1.*

### Thought Process (as if you’re the interviewee)  
First, I need to model the conversion dependencies—notice each conversion is directional, forming a one-way graph from lower index to higher (since n-1 edges and n nodes form a tree rooted at 0).  
Brute-force would be, for each node, trying to recompute the conversion chain from 0, multiplying the conversion factors along the path.  
To optimize, notice this forms a tree so we can do a single DFS from 0, propagating the product of conversion factors along the way. At each node, store the cumulative value so far, modulo 10⁹+7.  
This is efficient, visiting each node/edge once (O(n) time, since tree) and producing the correct answer for all types.

### Corner cases to consider  
- Single node (n=1): Only base unit exists; output should be `[1]`.
- Large conversion factors: Make sure to do all operations modulo 10⁹+7 to avoid overflow.
- Unusual chain shapes: Confirm correct multiplication chaining in deeply nested trees.
- Missing unit indices or out-of-order `conversions`: The graph should always be connected; each node must be reachable from 0.

### Solution

```python
def baseUnitConversions(conversions):
    # Number of units = n = len(conversions) + 1 (since n-1 conversions for a tree)
    MOD = 10**9 + 7
    n = len(conversions) + 1
    
    # Build adjacency list: graph[i] = list of (neighbor, conversion factor)
    graph = [[] for _ in range(n)]
    for src, tgt, factor in conversions:
        graph[src].append((tgt, factor))
    
    result = [0] * n

    # DFS to propagate conversion product from 0 to each node
    def dfs(node, multiplier):
        result[node] = multiplier
        for neighbor, conv in graph[node]:
            dfs(neighbor, (multiplier * conv) % MOD)
    
    dfs(0, 1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each node is visited once and edges are traversed once.  
- **Space Complexity:** O(n), for result array and graph adjacency list. No recursion stack overflow since it’s a tree structure (deepest stack = n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle queries to convert between arbitrary unit pairs, not just from 0 to each?
  *Hint: Generalize to bidirectional graph; could use BFS or Floyd-Warshall to answer any-to-any.*

- Can you detect cycles in this conversion system?
  *Hint: Since n-1 edges, this is a tree; with more, we should check for cycles.*

- What if updates to conversion factors are allowed on-the-fly?
  *Hint: Consider segment trees or heavy-light decomposition for efficient updates/queries, or rerun DFS as needed.*

### Summary
This problem uses a classic tree/graph traversal pattern (DFS) to propagate and compute multiplicative relationships from a single starting node to all others. It’s a textbook use of recursive DFS on a tree, chaining products with modulo arithmetic. This approach commonly appears in problems involving computation along rooted tree paths, such as propagating weights, cumulative transformations, or costs.


### Flashcard
Model conversion dependencies as a tree rooted at 0; use single DFS to propagate conversion factors along the path, computing the product in O(n) instead of recomputing per query.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
