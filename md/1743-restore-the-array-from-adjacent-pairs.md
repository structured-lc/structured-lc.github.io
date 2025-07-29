### Leetcode 1743 (Medium): Restore the Array From Adjacent Pairs [Practice](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)

### Description  
Given a list of pairs where each pair contains two integers that are adjacent in some unique array, restore and return the original array. All elements in the array are unique, and each adjacent pair is listed in either order. The adjacent pairs can appear in any order.

### Examples  

**Example 1:**  
Input: `adjacentPairs = [[2,1],[3,4],[3,2]]`  
Output: `[1,2,3,4]`  
*Explanation: The pairs tell us 2 is next to 1, 3 is next to 4, and 3 is next to 2. The only arrangement that works is 1-2-3-4 (or reversed).*

**Example 2:**  
Input: `adjacentPairs = [[4,-2],[1,4],[-3,1]]`  
Output: `[-2,4,1,-3]`  
*Explanation: 4 is next to -2 and next to 1. 1 is also next to -3. Start from -2: -2-4-1-(-3).*

**Example 3:**  
Input: `adjacentPairs = [[100000,-100000]]`  
Output: `[100000,-100000]`  
*Explanation: Only two elements, so only this ordering (or reversed) is valid.*


### Thought Process (as if you’re the interviewee)  
- The **brute-force** idea would be to try every permutation of all numbers and check if all input pairs are adjacent somewhere in the arrangement, but that is factorial time and clearly infeasible.
- Since every element is unique, and each ADJACENT pair is provided, **we can view this as a skinny graph (a chain)**:  
  - Each number links to two others (except for the two ends, which each link to only one; the endpoints of the list).
- My approach:
  - Build a mapping (dictionary) `adj` from each element to its neighbors.
  - Find a node with only one neighbor: that corresponds to an endpoint.
  - Start from one endpoint, and iterate—at each step, go to the next neighbor that isn't the previous value. This reconstructs the array efficiently.
- This is optimal (linear) and handles arbitrary integer values.

### Corner cases to consider  
- Only two numbers (e.g., one pair).
- Negative values, zeros, large magnitude numbers.
- Input pairs are not sorted or are in arbitrary order.
- List given in reverse order is also valid (problem accepts any correct order).
- No duplicate elements in `adjacentPairs`.
- Multiple valid outputs (reverse order is also correct).

### Solution

```python
def restoreArray(adjacentPairs):
    # Build an adjacency map where each value points to its list of "neighbors"
    adj = {}
    for a, b in adjacentPairs:
        if a not in adj:
            adj[a] = []
        if b not in adj:
            adj[b] = []
        adj[a].append(b)
        adj[b].append(a)

    # Find an endpoint (it will have only ONE neighbor)
    for node in adj:
        if len(adj[node]) == 1:
            start = node
            break

    # Start from the endpoint and build the array
    n = len(adjacentPairs) + 1
    res = [0] * n
    res[0] = start
    res[1] = adj[start][0]
    for i in range(2, n):
        neighbors = adj[res[i - 1]]
        # Choose the neighbor that is NOT equal to the previous element
        res[i] = neighbors[0] if neighbors[0] != res[i - 2] else neighbors[1]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the original array (≈ len(adjacentPairs)), because each element and edge is visited a constant number of times.
- **Space Complexity:** O(n), for the adjacency map (`adj`) and the result array (`res`).

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if elements are not guaranteed to be unique?  
  *Hint: How does that affect your ability to reconstruct the path unambiguously?*

- How to handle if only some, but not all, adjacent pairs are provided?  
  *Hint: Would there always be enough information to reconstruct the full chain?*

- How would you adapt for a **cyclic array** (where first and last are also adjacent)?  
  *Hint: What happens to the degree of each node?*

### Summary
This problem is a **graph path reconstruction** problem, where each input pair encodes an edge, and the underlying structure is always a simple path. The key insight is mapping node degrees to endpoints, then walking through neighbors. This linear technique is similar to problems like sequence reconstruction from pairs or "find Eulerian path/circuit" in graphs, and the "double-link" trick is a common coding interview pattern.