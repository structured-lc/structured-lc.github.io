### Leetcode 2096 (Medium): Step-By-Step Directions From a Binary Tree Node to Another [Practice](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another)

### Description  
Given a binary tree with unique values, and two node values `startValue` and `destValue`, return the directions to move from the node with value `startValue` to the node with value `destValue`.  
Directions are represented by:
- 'U' (up, to parent)
- 'L' (left child)
- 'R' (right child)  
You need to construct the shortest string of steps to get from `startValue` to `destValue`.  
Imagine you are standing at `startValue` — in which order do you go up and down the tree to reach `destValue`?  
The tree itself only allows traversal downwards, but you can use the unique values to simulate going up (by finding common ancestor relationships).  

### Examples  

**Example 1:**  
Input:  
Tree =  
```
        5
      /   \
     1     2
          / \
         3   6
```
startValue = 3, destValue = 6  
Output: `"U R"`  
*Explanation: Move up from 3 to 2 ('U'), then right to 6 ('R').*

**Example 2:**  
Input:  
Tree =  
```
          3
        /   \
       5     1
      / \   / \
     6   2 0   8
        / \
       7   4
```  
List representation: [3,5,1,6,2,0,8,null,null,7,4]  
startValue = 5, destValue = 4  
Output: `"R L"`  
*Explanation: Move right from 5 to 2 ('R'), then left to 4 ('L').*

**Example 3:**  
Input:  
Tree =  
```
        1
         \
          2
         /
        3
```
startValue = 3, destValue = 1  
Output: `"U U"`  
*Explanation: Up from 3 to 2 ('U'), then up from 2 to 1 ('U').*


### Thought Process (as if you’re the interviewee)  
- At first glance, one brute-force idea is to traverse the tree for every possible path from start to every node and check all paths to dest, but that's too slow.
- To optimize, realize that the directions are only unique because of the Lowest Common Ancestor (LCA): the path from startValue up to LCA, then from LCA down to destValue.
- The algorithm would be:
  - Find the path from the root to `startValue` (as a sequence of 'L' and 'R').
  - Do the same from root to `destValue`.
  - Remove the common prefix (which represents the shared ancestry — the LCA).
  - Change all steps unique to `startValue`'s path to 'U' (you go up).
  - Concatenate with the unique steps on `destValue`'s branch ('L'/'R' to go down).
- This gives the minimal and unique path, and avoids needing an explicit parent pointer.
- It's efficient because it only needs one full DFS traversal from root for each of the two nodes, and one step to compare the prefix.


### Corner cases to consider  
- Tree has only 1 node (start and dest are same).
- startValue and destValue are direct parent-child.
- startValue is the root.
- destValue is the root.
- Large tree (deep depth to check stack or string-building).
- Imbalanced (skewed) trees.
- startValue equals destValue.


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def getDirections(root, startValue, destValue):
    # Helper to get path from root to target value
    def getPath(node, target, path):
        if not node:
            return False
        if node.val == target:
            return True
        # Try left
        path.append('L')
        if getPath(node.left, target, path):
            return True
        path.pop()
        # Try right
        path.append('R')
        if getPath(node.right, target, path):
            return True
        path.pop()
        return False

    pathToStart = []
    pathToDest = []
    getPath(root, startValue, pathToStart)
    getPath(root, destValue, pathToDest)

    # Find where the paths diverge
    i = 0
    while i < len(pathToStart) and i < len(pathToDest) and pathToStart[i] == pathToDest[i]:
        i += 1

    # For all remaining steps in start's path ⇒ up to LCA ('U')
    ups = ['U'] * (len(pathToStart) - i)
    # Then remaining steps down from LCA to dest
    downs = pathToDest[i:]
    return ''.join(ups + downs)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes.  
    - Each getPath may visit all nodes in the worst case (if start/dest is at a leaf).
    - Finding common prefix is O(h), but h ≤ n.
- **Space Complexity:** O(n) for recursion stack and storing the path arrays.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very large or unbalanced?
  *Hint: How can you convert the recursive DFS to an iterative one to avoid stack overflow?*

- Can you do this if each node does not have unique values?
  *Hint: What additional information would you need in each node?*

- How would you solve this if parent pointers were already provided in the tree?
  *Hint: Could you use BFS or shortest path tricks?*


### Summary
This problem uses the **Lowest Common Ancestor plus path-building** pattern. You compare paths to two nodes to quickly find the split, simulating 'up' moves using only downward pointers. This approach is efficient and generalizes to other unique-value tree navigation problems, such as building lowest common ancestor logic or finding directions in organization hierarchies.