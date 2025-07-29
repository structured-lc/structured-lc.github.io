### Leetcode 113 (Medium): Path Sum II [Practice](https://leetcode.com/problems/path-sum-ii)

### Description  
Given a binary tree and an integer targetSum, find all **root-to-leaf** paths where the sum of node values along the path equals targetSum.  
A leaf is a node with no children.  
Return each valid path as a list of node values.  
The answer should be a list of such paths; if there are no paths, return an empty list.

### Examples  

**Example 1:**  
Input: `root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22`  
Output: `[[5,4,11,2],[5,8,4,5]]`  
Explanation. The following two root-to-leaf paths have sums of 22:  
- 5→4→11→2: 5+4+11+2=22  
- 5→8→4→5: 5+8+4+5=22  

Binary tree:  
```
      5
    /   \
   4     8
  /    /  \
11   13   4
/ \        / \
7  2      5   1
```
List representation: [5,4,8,11,null,13,4,7,2,null,null,5,1]


**Example 2:**  
Input: `root = [1,2,3], targetSum = 5`  
Output: `[]`  
Explanation.  
Neither of the root-to-leaf paths adds to 5:  
- 1→2=3  
- 1→3=4

Binary tree:  
```
  1
 / \
2   3
```
List: [1,2,3]


**Example 3:**  
Input: `root = [1,2], targetSum = 0`  
Output: `[]`  
Explanation.  
Two paths: 1→2 (sum=3). No path sums to 0.

Binary tree:  
```
 1
/
2
```
List: [1,2]


### Thought Process (as if you’re the interviewee)  
I'd start by thinking recursively:  
- For each node, check if there exists a root-to-leaf path down the tree where the sum equals targetSum.  
- Since we need all root-to-leaf paths (not just one), a depth-first search (DFS) is ideal.

Brute-force:  
- Generate all root-to-leaf paths, compute their sums, and collect the ones equal to targetSum. This would explore all possible paths.

Optimized approach:  
- As I traverse, keep a running path list and the remaining target sum.  
- When I reach a leaf, if the remaining sum equals the node's value, I’ve found a valid path.

Why this works:  
- By using backtracking (removing the last node after traversing its children), I avoid extra copies and efficiently explore all paths.
- This approach guarantees I check all possible root-to-leaf combinations, and meets the problem's time and space expectations.

### Corner cases to consider  
- Empty tree (`root=None`)
- Tree with one node (does value match targetSum?)
- Paths where node values are negative, zero, or positive
- No root-to-leaf path is valid
- Multiple valid paths
- Deep (unbalanced) trees

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def pathSum(root, targetSum):
    result = []

    def dfs(node, current_path, remaining):
        if not node:
            return
        # Add current node to the path
        current_path.append(node.val)

        # Check if it's a leaf and the path sum equals targetSum
        if not node.left and not node.right and node.val == remaining:
            # Found a valid path; append a copy of the path
            result.append(list(current_path))
        else:
            # Traverse left and right subtrees with updated sum
            dfs(node.left, current_path, remaining - node.val)
            dfs(node.right, current_path, remaining - node.val)
        # Backtrack: remove the current node
        current_path.pop()

    dfs(root, [], targetSum)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree. Each node is visited once in the DFS traversal, and for each valid path, a (potentially full-length) copy is appended.
- **Space Complexity:** O(h) for recursion stack (h = tree height; up to n in worst case), plus O(k×m) for output (k is number of valid paths, m is max path length).

### Potential follow-up questions (as if you’re the interviewer)  

- What if tree nodes can have more than two children?  
  *Hint: Adjust DFS to handle arbitrary numbers of child nodes, e.g., with a loop.*

- Can you write an iterative version to avoid recursion stack overflow on deep trees?  
  *Hint: Use an explicit stack to store (node, path, remaining sum) tuples.*

- How would you return root-to-any-node (not just leaf) paths that sum to a given value?  
  *Hint: Modify condition to check at every visited node, not just leaves.*

### Summary
This problem is a classic application of DFS with backtracking to find all root-to-leaf paths meeting a condition.  
It illustrates tree traversal, state passing, and backtracking—patterns common in path, sum, and subset-finding problems on trees and graphs. Suitable for both coding interviews and understanding recursive exploration.