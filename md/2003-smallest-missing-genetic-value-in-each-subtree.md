### Leetcode 2003 (Hard): Smallest Missing Genetic Value in Each Subtree [Practice](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree)

### Description  
Given a rooted tree (represented by a `parents` array where `parents[i]` is the parent of the iᵗʰ node, root has parent −1) and a list `nums` where `nums[i]` is the unique genetic value of the iᵗʰ node, you need to find for each node the **smallest positive integer** (starting from 1) which does **not** appear in its entire subtree (including itself).  
Return an array `ans` where `ans[i]` is that smallest missing genetic value for the subtree rooted at node i.

### Examples  

**Example 1:**  
Input: `parents = [-1,0,1,0,3,3]`, `nums = [5,4,6,2,1,3]`  
Output: `[7,1,1,4,2,1]`  
*Explanation:*
- node 0 subtree contains [5,4,6,2,1,3], missing smallest = 7
- node 1 subtree: [4], missing smallest = 1
- node 2 subtree: , missing smallest = 1
- node 3 subtree: [2,1,3], missing smallest = 4
- node 4 subtree: [1], missing smallest = 2
- node 5 subtree: [3], missing smallest = 1

**Example 2:**  
Input: `parents = [-1,0,0,2]`, `nums = [1,2,3,4]`  
Output: `[5,1,1,1]`  
*Explanation:*  
- node 0 subtree: [1,2,3,4], smallest missing = 5  
- nodes 1,2,3: their own nums are 2,3,4; each is missing 1

**Example 3:**  
Input: `parents = [-1,0,1,0,3,3]`, `nums = [1,2,3,4,5,6]`  
Output: `[7,1,1,1,1,1]`  
*Explanation:*  
- node 0 subtree contains all values 1-6, so smallest missing = 7  
- other nodes’ subtrees all miss 1

### Thought Process (as if you’re the interviewee)  

- **Brute Force**: For each node, collect all the genetic values in its subtree (via DFS) and check from 1 upwards the smallest not present. This is O(n²) (checking every node's subtree for up to n nodes).
- **Optimization**: Notice that only the path from the node with value 1 up to root may have an answer different from 1—if a subtree does not contain 1, then the missing value is always 1.
- **Efficient Approach**:  
    - Find the node with value 1, call it x. If none, return [1]*n.
    - For each node y on path x → root, traverse its subtree (not already traversed), marking present genetic values.
    - For each, the answer is the smallest integer not present.
    - Use a set or boolean array as "seen genetic values".
    - This way, most nodes just get answer=1, and only nodes on the 1→root path require more work.
- **Trade-offs**: Standard DFS from every node would be too slow for large n; the above approach focuses computation only along relevant path.

### Corner cases to consider  
- Tree does not contain value `1` (all answers are 1).
- Only one node (singleton tree).
- Node values are consecutive/increments, or highly gapped.
- Large values in `nums`, but the subtree is small.
- Some nodes have no children (leaves).
- All subtrees miss many small values.

### Solution

```python
def smallestMissingValueSubtree(parents, nums):
    n = len(parents)
    # Initialize answer as 1 for all (default missing value)
    ans = [1] * n
    tree = [[] for _ in range(n)]

    # Build tree
    for child, parent in enumerate(parents):
        if parent != -1:
            tree[parent].append(child)

    # Find the node whose genetic value is 1
    try:
        node_with_one = nums.index(1)
    except ValueError:
        # No node has genetic value 1, all answers are 1
        return ans

    # For marking visited genetic values
    seen = set()
    # The current minimal missing positive integer
    min_missing = 1
    u = node_with_one
    prev = -1

    def dfs(node):
        # Mark nums[node] as seen if not already
        seen.add(nums[node])
        for child in tree[node]:
            dfs(child)

    # Traverse path from node_with_one up towards root
    while u != -1:
        for child in tree[u]:
            if child != prev:
                dfs(child)
        # Mark current node's value as seen
        seen.add(nums[u])
        # Find the minimal missing integer
        while min_missing in seen:
            min_missing += 1
        ans[u] = min_missing
        prev = u
        u = parents[u]

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Only the path from node with value 1 up to the root is processed specially; for each node on that path, its subtree is traversed just once. All other nodes are assigned quickly.
- **Space Complexity:** O(n).  
  For tree structure, seen set, DFS recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiple nodes have the same genetic value?
  *Hint: How does uniqueness of nums affect correctness?*
- How would you optimize your solution for extremely large trees (10⁶ nodes)?
  *Hint: Can you avoid revisiting nodes unnecessarily?*
- Can you answer queries asking the smallest missing value for arbitrary k nodes, not just all nodes?
  *Hint: What additional pre-processing or structures could help?*

### Summary
This problem uses a smart subtree-marking technique where only certain paths need full DFS, based on tree value constraints. It’s a common pattern for tree problems: focus computation on relevant paths using ancestor/descendant relationships. This approach is related to tree DP, parent-to-root traversals, and prefix-set propagation, and can be adapted to other subtree-query or path-query problems in trees.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Union Find(#union-find)

### Similar Problems
