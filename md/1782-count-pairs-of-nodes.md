### Leetcode 1782 (Hard): Count Pairs Of Nodes [Practice](https://leetcode.com/problems/count-pairs-of-nodes)

### Description  
Given an undirected graph with **n** nodes (**1**-indexed) and a list of **edges**, each edge between two nodes (no self loops, but possibly multiple edges between same nodes).  
You are also given a list of **queries**. For each query value `q`, count how many **unique unordered pairs of distinct nodes (a, b)** (with **a < b**) have a **total number of incident edges strictly greater than `q`**.
Here, *incident edges* means the sum of edges attached to node-a and node-b. If a pair shares direct edges between themselves, those shared edges are *double-counted* in this sum.  
**For each query, output the number of such pairs.**

### Examples  

**Example 1:**  
Input:  
`n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]`  
Output:  
`[6, 5]`  
*Explanation:  
1. Find degree (incident count) for each node:
   - Node 1: 3  
   - Node 2: 4  
   - Node 3: 2  
   - Node 4: 1  
2. For query=2: count pairs where (deg[a]+deg[b]) > 2. All 6 pairs work.
3. For query=3: (1,4):3+1=4>3, (2,4):4+1=5>3, (3,4):2+1=3≯3, etc. Total 5 pairs.

**Example 2:**  
Input:  
`n = 5, edges = [[1,5],[1,5],[3,4],[2,5],[1,2],[1,4]], queries = [1,2,3,4,5]`  
Output:  
`[10,10,9,8,6]`  
*Explanation:  
1. Node degrees: [4,2,2,2,3]
2. For each query, count pairs (sort degrees, use two pointers). Adjust for overcounting shared edges between neighbors.

**Example 3:**  
Input:  
`n = 3, edges = [[1,2],[2,3],[1,3],[1,2]], queries = [1,2]`  
Output:  
`[3,2]`  
*Explanation:  
Node degrees: [3,3,2]  
For query=1, all 3 pairs (1,2), (1,3), (2,3) work.  
For query=2, only (1,2), (1,3): degree sums are 3+3=6, 3+2=5.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - For each query: try all pairs (a, b): 1 ≤ a < b ≤ n.
  - Count degree for each node, sum up degree[a] + degree[b], see if it’s > query.
  - Complexity: O(n²⋅q), with n up to 2×10⁴, this is far too slow.

- **Optimized Approach:**  
  - Precompute the **degree** (incident count) for all nodes.
  - For each unordered pair (a, b): if they're not heavily connected, their combined degree is just degree[a]+degree[b].  
  - However, if there are **shared** edges (multiple edges between a and b), the sum degree[a]+degree[b] *overcounts* these edges for the specific pair.
  - For each query:
    1. **Sort** the degrees. For each node, use a **two-pointer** or binary search method to count pairs with degree sum > query (since sorted).
    2. For pairs (a, b) that **share** one or more edges, degree[a]+degree[b] could barely exceed the query only because of shared edges; maybe if you subtract shared edges, the sum no longer exceeds, so we need to remove such overcounts.
    3. After main counting, adjust: For every pair (a, b) with k shared edges, if degree[a]+degree[b] > query, but degree[a]+degree[b]-shared ≤ query, then it was overcounted and must be subtracted.

- **Trade-offs:**  
  - Sorting degrees (O(n log n)), counting pairs for each query efficiently (O(n⋅q)), minor cost to correct for shared edges.
  - Avoid O(n²) by taking advantage of sorted degrees + binary search/two-pointer pattern.
  - Storing shared-edges map for efficient correction.

### Corner cases to consider  
- Multiple parallel edges between the same nodes.
- No edges at all (all degrees zero).
- All queries are very small or extremely large.
- All nodes have same degree.
- Graphs with only one node, or two nodes.
- Large input where edges are repeated many times.
- Queries where some pairs’ sum is barely >q because of shared edge multiplicity.

### Solution

```python
def countPairs(n, edges, queries):
    from collections import defaultdict

    # Step 1: Calculate degree for each node (1-indexed for convenience)
    degree = [0] * (n + 1)
    shared = defaultdict(int)

    for u, v in edges:
        degree[u] += 1
        degree[v] += 1
        # Maintain count for shared edges between each unordered pair
        if u > v:
            u, v = v, u
        shared[(u, v)] += 1

    # Step 2: Sort degrees (excluding 0th index) for efficient counting
    sorted_deg = sorted(degree[1:])

    # Prepare results for each query
    answer = []
    for q in queries:
        total = 0
        # Two pointers: for each i, look for j where sorted_deg[i] + sorted_deg[j] > q
        l, r = 0, n - 1
        while l < r:
            if sorted_deg[l] + sorted_deg[r] > q:
                total += r - l
                r -= 1
            else:
                l += 1

        # Step 3: Subtract overcounted due to shared multiple edges between neighbors
        for (a, b), cnt in shared.items():
            # Double check if overcounted for this query
            if degree[a] + degree[b] > q and degree[a] + degree[b] - cnt <= q:
                total -= 1  # was wrongly counted -- remove

        answer.append(total)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n log n + q⋅n) where n is number of nodes, q = len(queries)
    - Degree counting: O(m) where m = # edges
    - Sorting: O(n log n)
    - For each query: O(n) via two-pointers; plus a loop over unique shared edges (max O(m))
- **Space Complexity:**  
  - O(n + m): degree array (O(n)), shared-counter dictionary (O(m)), plus answer array (O(q))

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input graph is sparse vs. dense?  
  *Hint: Think about how the number of unique pairs and the impact of shared dictionary size changes.*

- How would you handle weighted edges, if the query was about sum of weights of incident edges?  
  *Hint: Consider a similar approach, but you need to store edge weights and sum them appropriately.*

- Can we answer online (query at any time), or optimize if queries are known in advance?  
  *Hint: Preprocessing and range query optimizations might be possible with segment trees or prefix sums on sorted degree distribution.*

### Summary
This problem uses the **two-pointers** (or binary search) pattern on **sorted degree arrays** to efficiently count unordered node pairs with degree sum above a threshold.  
A careful **adjustment for shared edges** between directly connected nodes ensures correct results, and is a classic example of inclusion-exclusion in combinatorial counting.  
This general pattern—sort, count pairs efficiently, then correct for overcounts—appears in other graph and array sum/count problems, and is broadly applicable in competitive/interview settings.


### Flashcard
Precompute node degrees and efficiently count pairs by considering shared edges and the sum of degrees for each pair.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Binary Search(#binary-search), Graph(#graph), Sorting(#sorting), Counting(#counting)

### Similar Problems
