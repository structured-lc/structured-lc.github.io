### Leetcode 437 (Medium): Path Sum III [Practice](https://leetcode.com/problems/path-sum-iii)

### Description  
Given a binary tree where each node contains an integer value, you are to count the **number of paths** that sum to a given value (**targetSum**).  
- A **path** consists of any sequence of nodes from some starting node to any node in the tree going **downwards** (going only from parent nodes to child nodes).  
- The path does **not need to start at the root or end at a leaf**, but it must go downward.  
Your task: **Find the number of such paths** in the tree.

### Examples  

**Example 1:**  
Input:  
```
      10
     /  \
    5   -3
   / \    \
  3   2    11
 / \   \
3  -2   1
```
targetSum = 8  
Output: `3`  
*Explanation:  
- Paths are: 5→3, 5→2→1, -3→11*

**List representation:** `[10,5,-3,3,2,null,11,3,-2,null,1]`

**Example 2:**  
Input:  
```
  1
 /
-2
/
1
```
targetSum = 0  
Output: `1`  
*Explanation:  
- Path is: -2→1→1 (the sum is 0)*

**List representation:** `[1,-2,null,1]`

**Example 3:**  
Input:  
(root is `null`)  
targetSum = 5  
Output: `0`  
*Explanation:  
- No nodes = no paths*

### Thought Process (as if you’re the interviewee)  

First, I’d clarify:
- Paths can start/end at *any* node but must go *downward only*.
- There can be negative values.

#### Brute-force:
- For every node, try all possible downward paths starting at that node.
- For each path, keep a running sum, compare with targetSum, and count if it matches.
- This leads to O(n²) if the tree is balanced (since for each of n nodes, we may traverse up to n nodes in total).

#### Optimization (prefix sum + hashmap):
- As we traverse, we maintain the **prefix sum** along the path from the root to each node.
- For each node, the number of ways we can reach targetSum ending at this node is the number of times `(current prefix sum - targetSum)` has previously occurred.  
- Use a hash map (dictionary) to record prefix sums and their counts as we do DFS traversal.
- This avoids repeating work for shared subtrees and makes the approach O(n) time, O(n) space.

I’d go with the prefix sum via DFS recursion because it’s the most efficient and elegant solution.

### Corner cases to consider  
- Empty tree (`root` is `None`)
- Tree contains only one node
- Tree with all nodes having `0` values and targetSum is 0 (multiple overlapping zero-paths)
- Negative numbers in the tree
- Multiple paths can overlap but must be counted separately
- Large tree (check for efficiency and stack depth)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def pathSum(root, targetSum):
    # Dictionary to store the prefix sums and their frequency
    prefix_sums = {0: 1}
    
    # Helper function to perform DFS
    def dfs(node, curr_sum):
        if not node:
            return 0
        
        # Update the current sum
        curr_sum += node.val
        
        # Find number of valid paths ending at current node
        path_count = prefix_sums.get(curr_sum - targetSum, 0)
        
        # Update prefix_sums for the current sum
        prefix_sums[curr_sum] = prefix_sums.get(curr_sum, 0) + 1
        
        # Recurse left and right
        path_count += dfs(node.left, curr_sum)
        path_count += dfs(node.right, curr_sum)
        
        # Backtrack: Remove the current sum from the map before returning to parent
        prefix_sums[curr_sum] -= 1
        
        return path_count
    
    return dfs(root, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited once. All operations in DFS and hashmap lookup/updating are constant time.

- **Space Complexity:** O(h) for the stack (with h the height; balanced: O(log n), worst O(n)), plus O(n) for the prefix_sums dictionary in the worst case (unique prefix sums).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the algorithm if paths could go *upwards* as well (not just down)?
  *Hint: Would need to explore from every node considering both parent and child links; can be complex.*

- Can you return the actual paths rather than just count?
  *Hint: Track the nodes along each prefix sum path; would require additional storage and careful traversal.*

- Could you solve this iteratively instead of recursively?  
  *Hint: Use your own stack to simulate DFS and maintain prefix sums accordingly.*

### Summary
This problem uses the **Prefix Sum with Hash Map** pattern in trees—an advanced technique extending the common subarray sum approach from arrays to trees. This allows efficient O(n) solutions for path-sum problems and appears in many interview questions where you need to find path counts or segments adding up to a target—whether in arrays, linked lists, or trees.


### Flashcard
Use prefix sum hash map during DFS to count all downward paths summing to target, including negative values.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum(path-sum) (Easy)
- Path Sum II(path-sum-ii) (Medium)
- Path Sum IV(path-sum-iv) (Medium)
- Longest Univalue Path(longest-univalue-path) (Medium)