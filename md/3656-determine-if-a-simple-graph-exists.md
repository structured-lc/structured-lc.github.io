### Leetcode 3656 (Medium): Determine if a Simple Graph Exists [Practice](https://leetcode.com/problems/determine-if-a-simple-graph-exists)

### Description  
Given an integer array `degrees` where `degrees[i]` is the required degree of the iᵗʰ node, determine if there exists a **simple undirected graph** (no self-loops, no multiple edges) whose node degrees match the input exactly.  
Return `True` if such a graph exists, otherwise `False`.  
This is equivalent to verifying if a given degree sequence is *graphical*.

### Examples  

**Example 1:**  
Input: `degrees = [2,2,2]`  
Output: `True`  
Explanation:  
All nodes can be connected to each other, forming a triangle:  
```
   0
  / \
 1---2
```
Degrees: [2,2,2]

**Example 2:**  
Input: `degrees = [3,2,2,1]`  
Output: `True`  
Explanation:  
A valid graph:  
```
0---1
|\  |
| \ |
3   2
```
Node 0 connects to 1, 2, 3  
Node 1 connects to 0, 2  
Node 2 connects to 0, 1  
Node 3 connects to 0  
Degrees: [3,2,2,1]

**Example 3:**  
Input: `degrees = [3,3,1]`  
Output: `False`  
Explanation:  
Sum of degrees is odd (3+3+1=7), so impossible. No simple undirected graph matches.

### Thought Process (as if you’re the interviewee)  
- Brute-force approach: Try to make every possible adjacency list and check for a valid degree sequence. This is exponential and infeasible for even modest n.
- Observations:  
  - The sum of degrees must be even. (Handshaking lemma: each edge increases degree count by 2.)  
  - No degree can exceed n-1 (you can’t connect a node to itself or have multiple connections).
- Efficient approach:  
  - Use the Havel-Hakimi algorithm:
    1. While nonzero degrees remain:
       - Sort degrees descending.
       - Remove the largest degree `d` (node 0).
       - Subtract 1 from the next `d` nodes (since node 0 must connect to that many nodes of greatest degree).
       - If any degree drops below 0, or if `d` exceeds remaining length, fail.
    2. If degrees can all be reduced to zero, success.
  - This greedy reduction is correct for degree sequence graphicality, and is efficient.

### Corner cases to consider  
- Empty array: Should return `True` (trivial empty graph).
- Single 0: Should return `True` (single isolated node).
- Negative or greater-than-n-1 degrees: Return `False`.
- Odd sum of degrees: Return `False`.
- Degrees with zeroes mixed in: Should still work.
- Large single degree (e.g., `[n-1, 1, ..., 1]`): Valid for star graphs.

### Solution

```python
def isPossible(degrees):
    n = len(degrees)
    # Edge-case: Empty graph
    if n == 0:
        return True

    # Any negative or too-large degrees instantly invalid
    for d in degrees:
        if d < 0 or d >= n:
            return False

    # Degree sum must be even (handshaking lemma)
    if sum(degrees) % 2 != 0:
        return False

    # Havel-Hakimi algorithm
    deg = degrees[:]
    while True:
        # Remove zeros
        deg = [d for d in deg if d > 0]
        if not deg:
            return True

        # Biggest degree: pick and remove
        deg.sort(reverse=True)
        d = deg.pop(0)
        if d > len(deg):
            return False

        # Subtract 1 from next d degrees
        for i in range(d):
            deg[i] -= 1
            if deg[i] < 0:
                return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting deg each round: worst case O(n²) total (since number of rounds is ≤ n).
  - Each reduction costs O(1) per item, repeated ≤ n times.
  - Overall: O(n²).
- **Space Complexity:**  
  - O(n) for degree list copies and sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you construct a valid graph explicitly, not just decide existence?  
  *Hint: Modify the algorithm to build adjacencies as you connect nodes with highest degrees.*

- Can you solve this faster than O(n²) time?  
  *Hint: Use a more efficient selection algorithm than sorting (e.g., priority queue/max-heap).*

- What if the graph can have self-loops or multi-edges?  
  *Hint: Which constraints from the Havel-Hakimi algorithm break down?*

### Summary
This problem is a direct application of the Havel-Hakimi algorithm—a greedy method for testing degree sequence graphicality. It's a classic greedy/graph theoretical question. The approach and its edge-case checks are standard and also useful in problems about graph construction from given constraints, scheduling, or network design.

### Tags

### Similar Problems
