### Leetcode 2440 (Hard): Create Components With Same Value [Practice](https://leetcode.com/problems/create-components-with-same-value)

### Description  
Given a tree (undirected, connected acyclic graph) with `n` nodes labeled from 0 to n-1, you are given:
- An integer array `nums` where `nums[i]` is the value of node i.
- An array `edges` where each `edges[i] = [ai, bi]` is an edge between nodes ai and bi.

You are allowed to remove some edges (possibly none) to split the tree into connected components.  

The goal:  
- Remove the maximum number of edges so that every resulting component's total value is **equal** (i.e., sum of the values of nodes in that component).

Return the maximum number of edges you can remove.  

### Examples  

**Example 1:**  
Input: `nums = [6,2,2,2,6], edges = [[0,1],[1,2],[1,3],[3,4]]`  
Output: `2`  
Explanation:  
Remove edges [1,2] and [3,4].  
Resulting components:
```
    0
   /
  1
   \
    3

    2    4
```
List representation after split:  
- [0,1,3] sum=10  
- [2] sum=2  
- [4] sum=6  
This is not valid; correct division is:  
Remove [0,1] and [3,4], get components , [1,2,3], [4], sums all equal to 6.

**Example 2:**  
Input: `nums = [2], edges = []`  
Output: `0`  
Explanation:  
Single node tree. No edges to remove, so answer is 0.

**Example 3:**  
Input: `nums = [7,7,7,7], edges = [[0,1],[1,2],[2,3]]`  
Output: `3`  
Explanation:  
Remove all edges. Split into 4 components, each value is 7.  

### Thought Process (as if you’re the interviewee)  
- If components’ values must be equal, then after each cut, each subtree’s total sum must be equal to a fixed target.
- The total sum, S, of all node values must be divisible by the number of components (k), i.e. all component sums should be S / k.
- Brute-force: Try all combinations of edge removals —but this is too slow (exponential).
- Optimize: Since this is a tree, try every possible k from n down to 1 where S % k == 0 and for each such k, use DFS to check if it’s possible to partition tree into k components of value S / k.
- For each k, in DFS, whenever a subtree's sum becomes equal to the target, "cut" it (count a component) and return 0 upwards.
- The maximum such k-1 for which it’s possible is the answer (since to make k components, cut k-1 edges).
- Use early prune: if current partial sum > target, not valid; also, if not possible for a k, try k-1, ... down to 1.

### Corner cases to consider  
- Tree with 1 node.
- All nums are the same.
- S not divisible by any k > 1 (return 0).
- Tree where only 1 division is possible (e.g. all small values except one big).
- Negative values or zeros in nums.

### Solution

```python
from collections import defaultdict

def componentValue(nums, edges):
    # Build the tree (adjacency list)
    n = len(nums)
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    total = sum(nums)
    max_num = max(nums)

    # Try all k from min(n, total // max_num) down to 1
    for k in range(min(n, total // max_num), 1, -1):
        if total % k != 0:
            continue
        target = total // k

        def dfs(node, parent):
            # Calculate tree sum for subtree rooted at node
            subtotal = nums[node]
            for nei in graph[node]:
                if nei == parent:
                    continue
                child_sum = dfs(nei, node)
                if child_sum == -1:
                    return -1  # propagate invalid
                subtotal += child_sum
            # If subtotal matches target, this can be a component (pretend cut here)
            if subtotal == target:
                return 0
            # If subtotal overflows target, cannot partition
            if subtotal > target:
                return -1
            return subtotal

        if dfs(0, -1) == 0:
            return k - 1
    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × sqrt(S)), where n=len(nums) and S=total sum.  
  We try all k ∈ [1, n] such that total%k==0, and for each, a full traversal (O(n)) is done.
- **Space Complexity:** O(n) for adjacency list + recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph was not a tree but a general undirected graph?  
  *Hint: How do cycles affect component formation and unique partitions?*

- How would you modify your approach if instead of all components having equal sum, you want to balance their sizes?  
  *Hint: Can you guarantee all subtrees can have equal node counts?*

- Could this approach work if nodes had negative values?  
  *Hint: When is partitioning by sum impossible with negatives?*

### Summary
This problem is a classic **tree-partition by subtree sum** pattern, leveraging DFS and smart factorization.  
It generalizes to problems like splitting trees by value, checking valid subtree structure, or enforcing balanced partitions in distributed computations.  
The key insight is to try all possible k and greedily cut off subtrees summing to the required target, stopping when the maximal valid k is found.