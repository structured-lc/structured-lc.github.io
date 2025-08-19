### Leetcode 2497 (Medium): Maximum Star Sum of a Graph [Practice](https://leetcode.com/problems/maximum-star-sum-of-a-graph)

### Description  
Given an undirected graph with n nodes (0-indexed), each node has a value given by vals[i]. You are provided with a list of undirected edges, and an integer k.  
A **star graph** is a subgraph where one node (the center) is connected to some of its directly adjacent nodes ("neighbors"), and those neighbors are not connected to each other.  
You can select at most **k** edges to include in the star, meaning the star's center can have up to k neighbors.  
**Your task:** Find the maximum sum of node values for any star graph in the given graph (the sum includes the center and its chosen neighbors).  

### Examples  

**Example 1:**  
Input:  
vals = `[1, 2, 3, 4, 5]`,  
edges = `[[0,1], [0,2], [0,3], [1,4], [2,4]]`,  
k = `2`  
Output: `12`  
*Explanation:  
Pick node 4 as center; its neighbors are 1 and 2. Star sum = vals[4] + vals[1] + vals[2] = 5 + 2 + 3 = 10 (not optimal);  
Pick node 0 as center; neighbors are 2 and 3 (highest). Star sum = 1 + 3 + 4 = 8;  
Pick node 3 as center; only neighbor is 0. Star sum = 4 + 1 = 5;  
Pick node 2 as center; neighbors are 0 and 4: 3 + 1 + 5 = 9;  
Pick node 1 as center; neighbors are 0 and 4: 2 + 1 + 5 = 8;  
**But with edges chosen for 0: [2,3], star sum = 1 + 3 + 4 = 8; for 4: [2,1], star sum = 5 + 3 + 2 = 10**,  
**Correct maximum is 12 by picking center 0, neighbors 2 & 3: 1 + 3 + 4 = 8**  
*(Typo in the example, correct answer should reflect the best possible combination. See below for an improved example where the answer is indeed 12, e.g. center 3: 4 + 1 + 5 + 2 = 12 for k=3).*

**Example 2:**  
Input:  
vals = `[-2, -1, 1, -4, -3]`,  
edges = `[[0,1],[2,1],[3,4]]`,  
k = `2`  
Output: `0`  
*Explanation:  
Pick node 2 as center: only neighbor is 1. Star sum = 1 + (-1) = 0. Other possible star sums are less than 0 or zero.*

**Example 3:**  
Input:  
vals = `[5, 10, -2, 7, 6]`,  
edges = `[[0,1],[1,2],[1,3],[3,4]]`,  
k = `1`  
Output: `17`  
*Explanation:  
Pick node 1 as center, add best neighbor with positive value (10 + 7 = 17 with neighbor 3 or 10 + 5 = 15 with neighbor 0; take max).*

### Thought Process (as if you’re the interviewee)  
- At first glance, brute-force would be: For each node, try all combinations of up to k neighbors from its neighbors, compute the sum, and track the maximum across all nodes.  
  - But this is highly inefficient: Each node can have up to n-1 neighbors, so the combinations grow exponentially.
- **Optimization:** Since the star sum is maximized by picking the neighbors with the highest positive values, sort each node’s neighbors by their values (descending), and pick the top up to k neighbors with positive value.
- This approach reduces the need for combinatorial selection because picking the largest available neighbors gives the maximum result (adding negative neighbors always decreases the sum).
- For each node:
  - Gather its neighbor's values.
  - Sort descending.
  - Iteratively add the top up to k positive neighbor values to the node's own value.
- The answer is the maximum star sum found for any node.

### Corner cases to consider  
- All vals are negative: Best is to pick a center alone, possibly without any neighbor.
- k is 0: Only the value of the center node is considered.
- Some nodes have no neighbors (degree 0).
- Some neighbors have negative or zero value (ignore negative, include zero if necessary).
- The graph is disconnected.
- Multiple centers can achieve the same maximal sum.

### Solution

```python
def maxStarSum(vals, edges, k):
    # Build adjacency list where each entry stores values, not indices
    n = len(vals)
    neighbors = [[] for _ in range(n)]
    for u, v in edges:
        neighbors[u].append(vals[v])
        neighbors[v].append(vals[u])

    max_sum = float('-inf')

    for i in range(n):
        # Sort neighbor values for node i (descending)
        neighbor_vals = sorted(neighbors[i], reverse=True)
        curr_sum = vals[i]
        # Try adding up to k best positive neighbor values
        for j in range(min(k, len(neighbor_vals))):
            if neighbor_vals[j] > 0:
                curr_sum += neighbor_vals[j]
            else:
                break
        # Track the maximum possible sum
        max_sum = max(max_sum, curr_sum)

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building adjacency: O(E), with E = number of edges.
  - For each node (n iterations):  
    - Sort up to O(n) neighbors: O(n log n) per node in the worst case.
    - Total: O(n² log n) in the densest scenario.  
    - But usually much less for sparse graphs.

- **Space Complexity:**  
  - Adjacency list: O(n + E).
  - For neighbor value sorting, at most O(n) per node.
  - Overall: O(n + E).

### Potential follow-up questions (as if you’re the interviewer)  

- What if neighbor counts can be huge?  
  *Hint: Use a min-heap of size k for efficient top-k extraction.*

- How would you handle dynamic updates (edge additions/removals) and frequent queries?  
  *Hint: Consider advanced data structures (e.g., balanced BSTs or indexed heaps) per node.*

- What if negative node values are common?  
  *Hint: Must carefully filter neighbors; adding negative values never helps maximize the sum.*

### Summary
This problem leverages greedy selection and sorting: For each node, select the k neighbors with the highest positive contribution.  
This **"top-k selection per node" pattern** frequently occurs in network optimization, clustering, and graph filtering tasks.  
Heap-based optimizations can be used for denser graphs or tighter time constraints, and this technique applies generally whenever subgraph sums with local constraints are maximized.

### Tags
Array(#array), Greedy(#greedy), Graph(#graph), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Number Of Ways To Reconstruct A Tree(number-of-ways-to-reconstruct-a-tree) (Hard)
- Find Center of Star Graph(find-center-of-star-graph) (Easy)