### Leetcode 2872 (Hard): Maximum Number of K-Divisible Components [Practice](https://leetcode.com/problems/maximum-number-of-k-divisible-components)

### Description  
Given an **undirected tree** with `n` nodes labeled from `0` to `n-1`, each node has an integer value (`values[i]`). You are given the tree as a list of edges.  
You can optionally **remove some edges** to split the tree into several components.  
**Goal:** Split the tree so that **the sum of values in every component is divisible by `k`**, and the **number** of such components is maximized.  
**Return:** The maximum number of `k`-divisible components you can obtain.

### Examples  

**Example 1:**  
Input:  
`n = 5`, `edges = [[0,1],[0,2],[1,3],[1,4]]`, `values = [2,3,3,2,2]`, `k = 3`  
Output: `3`  
*Explanation:  
- The tree:  
    ```
        0
       / \
      1   2
     / \
    3   4
    ```
- Remove edges `[0,2]`, `[1,3]`.
- Components: `[2]` (sum 3), `[3]` (sum 3), remaining (sum 6) — all divisible by 3. So answer is 3.*

**Example 2:**  
Input:  
`n = 3`, `edges = [[0,1],[0,2]]`, `values = [1,2,3]`, `k = 3`  
Output: `2`  
*Explanation:  
- The tree:  
    ```
      0
     / \
    1   2
    ```
- Remove edge `[0,2]`.
- Components: `[2]` (sum 3), `[0,1]` (sum 3) — both divisible by 3. So answer is 2.*

**Example 3:**  
Input:  
`n = 4`, `edges = [[0,1],[1,2],[1,3]]`, `values = [2,2,2,2]`, `k = 2`  
Output: `4`  
*Explanation:  
- The whole tree:  
    ```
      0
       \
        1
       / \
      2   3
    ```
- All nodes are even. We can remove all edges, making each node a component with sum 2 (divisible by 2). So answer is 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all ways of splitting the tree by removing edges, check if all resulting components are `k`-divisible, and pick the split with max components.  
  Too slow — exponential in n.

- **Key Insight:**  
  The tree allows us to solve the problem **recursively using DFS**.  
  ○ For each subtree, check if the **sum of its values** is divisible by k.  
  ○ If so, we can "cut" it as a component (by removing its edge to parent).  
  ○ Recursively count such cuts across the tree.  
  For each node, if the **subtree sum** (including itself) is `k`-divisible, we can make a component there.

- **Optimize:**  
  - Use a single DFS traversal.  
  - Post-order: process children first, then self.  
  - For each node, combine the subtree sums.  
  - If a subtree (including the node) sums to a multiple of k, increment answer and return 0 to the parent (it is now a "new" root).  
  - Otherwise, return the sum upward without cutting.

- **Implementation:**  
  Build adjacency list, and DFS from any node (say, 0).

- **Trade-offs:**  
  ○ This approach is O(n), one traversal, and finds all maximal cuts.  
  ○ No need for duplicate work (no dynamic programming needed).  
  ○ This pattern generalizes to other “subtree property” problems.

### Corner cases to consider  
- Tree with only 1 node (should return 1 if its value divisible by k, else 0).
- No edge divides the total sum as k-divisible more than once.
- All node values are divisible by k: expect max number of cuts (each node a component).
- k = 1 (all sums are divisible).
- Negative and zero values.
- Some values > k but not divisible by k.
- Edge cases where only the complete tree sum is divisible by k.

### Solution

```python
def maxKDivisibleComponents(n, edges, values, k):
    # Build adjacency list for the tree
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    
    # To avoid visited cycles
    visited = [False] * n
    ans = 0  # answer: total number of k-divisible components
    
    def dfs(node):
        nonlocal ans
        visited[node] = True
        subtotal = values[node]  # start with own value
        for neighbor in graph[node]:
            if not visited[neighbor]:
                subtotal += dfs(neighbor)
        # If subtotal is divisible by k, it's a component
        if subtotal % k == 0:
            ans += 1
            return 0  # This component "removed" from parent sum
        return subtotal  # otherwise, pass subtotal upward
    
    dfs(0)  # start DFS from root 0
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node and edge visited once during DFS. All operations in each call are O(1).

- **Space Complexity:** O(n)  
  - Adjacency list uses O(n) space.  
  - Recursion stack is O(n) in the worst case (for a skewed tree).  
  - Extra arrays (visited, etc.) are also O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree has negative values?  
  *Hint: Consider subtree sums and mod with negatives—Python mod operator handles negatives as expected.*

- Can you return the explicit sets of nodes in each k-divisible component?  
  *Hint: Track cut points or parent-child relations upon making a cut in DFS.*

- What if the input is a general graph (with cycles), not a tree?  
  *Hint: Problem becomes harder—need cycle detection, connected components, and combine with k-divisibility checks.*

### Summary
This approach uses a **DFS subtree pattern**, commonly used in tree problems that involve aggregating values from leaves up to root and deciding where cuts can be made.  
It’s efficient and elegant, with similar structure to subtree sum, subtree size, or cutting trees on properties.  
This general recursive pattern is widely applicable whenever you need to split or count components in trees based on subtree properties.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Create Components With Same Value(create-components-with-same-value) (Hard)