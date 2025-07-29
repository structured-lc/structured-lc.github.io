### Leetcode 2374 (Medium): Node With Highest Edge Score [Practice](https://leetcode.com/problems/node-with-highest-edge-score)

### Description  
Given a directed graph with `n` nodes labeled from 0 to n-1, where each node has exactly one outgoing edge (described by the array `edges` such that `edges[i]` is the node that node `i` points to), compute the **edge score** for every node:  
- The edge score for a node is the sum of the labels (indices) of all nodes that point to it.
Return the node with the **highest edge score**. If multiple nodes tie, return the smallest label among them.

### Examples  

**Example 1:**  
Input: `edges = [1,0,0,0,0,7,7,5]`  
Output: `7`  
*Explanation:*
- Node 0: incoming edges from 1, 2, 3, 4. Score = 1+2+3+4 = 10
- Node 7: incoming edges from 5, 6. Score = 5+6 = 11
- Node 1: from 0. Score = 0
- Node 5: from 7. Score = 7  
Node 7 has the highest edge score 11.

**Example 2:**  
Input: `edges = [2,0,0,2]`  
Output: `0`  
*Explanation:*
- Node 0: incoming from 1,2. Score = 1+2 = 3
- Node 2: incoming from 0,3. Score = 0+3 = 3  
Both nodes 0 and 2 score 3, so return the smaller index, 0.

**Example 3:**  
Input: `edges = [1,2,0]`  
Output: `0`  
*Explanation:*
- Node 0: incoming from 2. Score = 2
- Node 1: from 0. Score = 0
- Node 2: from 1. Score = 1  
Node 0 has the largest edge score.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each node, scan the entire `edges` array to sum the labels pointing to it, which is O(n²).
- **Optimized Approach:**  
  As each node points *to* exactly one other node, traverse the `edges` array once:
    - For each i, add i to the edge score of `edges[i]`.
    - After building all scores, scan for the maximum score; break ties by smaller node index.
  - This runs in O(n) time and is very space efficient (O(n) for the score array).

- **Trade-off:**  
  - We use an extra array of size n for edge scores, but overall performance is excellent for up to n=10⁵ nodes.

### Corner cases to consider  
- edges with all pointing to the same node, e.g. `[0,0,0]`
- symmetric graphs with ties (two or more nodes have the same highest edge score)
- single-element array
- empty edges array (though problem constraints likely prohibit n=0)
- each node pointing to itself: `[0,1,2]` (self-loops)

### Solution

```python
def edgeScore(edges):
    n = len(edges)
    # score[i]: sum of node labels that point to node i
    score = [0] * n

    for from_node, to_node in enumerate(edges):
        # Add edge's "from" node label to the score of the "to" node
        score[to_node] += from_node

    # Find the node with highest score, break ties by smallest index
    max_score = -1
    result_node = -1

    for node in range(n):
        if score[node] > max_score:
            max_score = score[node]
            result_node = node
        elif score[node] == max_score and node < result_node:
            result_node = node

    return result_node
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Single pass to build scores, single pass to find the max. Each step is O(n).
- **Space Complexity:** O(n)  
  - `score` array of size n; no recursion or other major allocations.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nodes could have more than one outgoing edge?
  *Hint: How would you represent such a graph? How would you accumulate the scores?*

- Could you do it in-place if mutation of the input is allowed?
  *Hint: Could you recycle the input array for edge scores, and what are trade-offs?*

- How would you handle very large graphs (n up to 10⁸)?
  *Hint: What if memory usage is a bottleneck?*

### Summary
This problem uses the **counting pattern**: scan the input to aggregate values into a summary structure (edge scores).  
Such in-/out-degree-based counting is common in graph problems, tournaments, and voting tallies, and the technique generalizes to other aggregation-by-index problems.  
All logic is O(n) with a minimal two-pass approach: one to record, one to decide the winner.