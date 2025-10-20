### Leetcode 366 (Medium): Find Leaves of Binary Tree [Practice](https://leetcode.com/problems/find-leaves-of-binary-tree)

### Description  
Given a **binary tree**, repeatedly gather all the **leaf nodes** into a list, remove those leaves from the tree, and repeat this process until the tree is empty. For each round, collect the values of the leaves you remove as a separate list. Return all the lists in the order in which the leaves were removed.

*Put simply: At each step, find all current leaves, remove them, and repeat. The result is a list of lists where each inner list is the nodes removed at that round.*


### Examples  

**Example 1:**  
Input: `[1,2,3,4,5]`  
Output: `[[4,5,3],[2],[1]]`  
Explanation:  
- First, leaves are 4, 5, 3 → remove them  
- Tree becomes:  
  ```
      1
     /
    2
  ```
- Next, 2 is the leaf → remove it  
- Tree becomes:  
  ```
  1
  ```
- Now only 1 left → remove it

**Example 2:**  
Input: `[1]`  
Output: `[[1]]`  
Explanation:  
- Only one node, which is the leaf itself.

**Example 3:**  
Input: `[1,2,null,3,4,null,null,5]` (tree below)  
```
      1
     /
    2
   / \
  3   4
 /
5
```
Output: `[[4,5],[3],[2],[1]]`  
Explanation:  
- Leaves 4, 5 → remove  
- Tree: 1-2-3  
- Leaf 3 → remove  
- Tree: 1-2  
- Leaf 2 → remove  
- Tree: 1  
- Leaf 1 → remove


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Do what the question says:  
  - At each round, traverse the tree, find leaves, collect values, and physically remove them (by setting parent's child pointer to null).
  - Repeat until tree is empty.
  - Downside: Traverses the tree multiple times, and modifying the structure is messy.

- **Optimized (Post-Order + Heights):**  
  Instead, for each node, its “removal round” is really its “height when looking up from the leaf.”  
  - If a node is a leaf, its round is 0.  
  - If a node is a parent to leaves, it will be removed after its leaves (so round = max(child round) + 1).
  - Therefore, one post-order DFS can give each node its round; collect values accordingly.
  - We never need to physically modify the tree.

- **Why this works:**  
  - Each call up the tree gets the max height from children, so every node is assigned to the correct removal round.
  - Uses post-order so that children’s heights are calculated before the parent.

- **Tradeoff:**  
  - Time O(n), visits each node once.
  - Space O(h), for recursion stack and results.


### Corner cases to consider  
- Empty tree (null root)
- Single node tree
- All left / right skewed trees (linked list shape)
- Duplicate values in nodes
- Roots with only one child


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findLeaves(root):
    # List to hold lists of leaves at each "removal round"
    res = []

    def dfs(node):
        if not node:
            return -1  # Null nodes are below leaves
        # Compute the "height" of left and right sub-trees
        left_height = dfs(node.left)
        right_height = dfs(node.right)
        # This node's removal round is max height of children + 1
        curr_height = max(left_height, right_height) + 1
        # Ensure enough space in the res list
        if curr_height == len(res):
            res.append([])
        res[curr_height].append(node.val)
        return curr_height

    dfs(root)
    return res
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited exactly once in the post-order DFS.
- **Space Complexity:** O(h) for recursion (h = height of the tree), and O(n) for the result list.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the function to return the nodes in a specific order (in-order, pre-order) within each level?  
  *Hint: Change how you traverse/gather nodes at each height.*

- What if instead you needed to return the nodes as they are actually removed (with tree mutation)?  
  *Hint: Try implementing the brute-force loop with true removal.*

- Can you solve the problem without recursion?  
  *Hint: Simulate DFS with an explicit stack.*


### Summary
This is a classic **Post-order DFS (bottom-up)** problem, assigning each node to a "round" where it would be removed if leaves were cut repeatedly. Collecting by height from the leaves up avoids modifying the tree and ensures every node is processed just once—an important coding and interview pattern for “removal round” or “layered grouping” of tree nodes. This approach appears in other problems involving “levels from leaf/root” or “group nodes by structural properties.”


### Flashcard
Assign each node a "height from leaf" via post-order traversal; group nodes by height to collect leaves layer by layer.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
