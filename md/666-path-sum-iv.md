### Leetcode 666 (Medium): Path Sum IV [Practice](https://leetcode.com/problems/path-sum-iv)

### Description  
We're given a **binary tree of depth less than 5**, encoded as an array of ascending three-digit integers.  
- Each integer is formatted as `DPV`:
  - `D` (hundreds) = the **depth** (1-indexed).
  - `P` (tens) = the **position** in that level, as arranged in a full binary tree (1-indexed).
  - `V` (units) = the **value** of the node.
  
The task is to find the **sum of all root-to-leaf path values**—that means, for each root-to-leaf path, add all the values along the path, and sum up all such path totals.

### Examples  

**Example 1:**  
Input: `[113,215,221]`  
Output: `12`  
*Explanation:*
```
    3
   / \
  5   1
```
Paths:  
- 3→5 (sum: 8)  
- 3→1 (sum: 4)  
Total = 8 + 4 = 12

**Example 2:**  
Input: `[113,221]`  
Output: `4`  
*Explanation:*
```
  3
   \
    1
```
Only root-to-leaf path:  
- 3→1 (sum: 4)

**Example 3:**  
Input: `[113,215,225,227,335,346]`  
Output: `24`  
*Explanation:*  
The tree represented:
```
      3
     / \
    5   5
         \
          7
         / \
        5   6
```
Paths:
- 3→5 (sum: 8)
- 3→5→7→5 (sum: 3+5+7+5 = 20)
- 3→5→7→6 (sum: 3+5+7+6 = 21)  
Total = 8 + 20 + 21 = 49  
(Note: This is a made-up structure for illustration. Please verify accuracy with actual parsing logic.)

### Thought Process (as if you’re the interviewee)  

First, we need to **reconstruct the tree structure** from the encoded array.  
- Each number contains the depth, position, and node value.
- Positions at each depth follow a binary tree's logic:  
  - At depth d, position p:  
    - Left child at depth d+1, position 2p-1  
    - Right child at depth d+1, position 2p

We can:
- Build a mapping from (depth, position) → value.
- Traverse the tree using DFS from the root, carrying the running sum.
- If reached a leaf (no left and right child), add current path sum to result.

This avoids building a complex tree structure in memory; we can work directly from the mapping.

#### Brute-force
- Attempt to reconstruct a tree using nodes and pointers. It's complex and unnecessary for small constraints.

#### Optimized
- Use a mapping:  
  - Key: (depth, position)  
  - Value: node value.
- For each node, recursively go to its possible children. If no child, it's a leaf—accumulate the path sum.

### Corner cases to consider  
- Empty input (should not happen per constraints, but still robust handling).
- Only root node (single-node tree).
- Skewed tree (all left or all right).
- Tree where some positions are missing (sparse representation).

### Solution

```python
def pathSum(nums):
    # Build a map: (depth, position) -> value
    tree = {}
    for num in nums:
        d = num // 100  # depth
        p = (num // 10) % 10  # position
        v = num % 10  # value
        tree[(d, p)] = v

    res = 0

    def dfs(d, p, path_sum):
        key = (d, p)
        if key not in tree:
            return 0

        current_sum = path_sum + tree[key]
        left_key = (d + 1, p * 2 - 1)
        right_key = (d + 1, p * 2)

        # If no children, this is a leaf
        if left_key not in tree and right_key not in tree:
            nonlocal res
            res += current_sum
            return

        if left_key in tree:
            dfs(d + 1, p * 2 - 1, current_sum)
        if right_key in tree:
            dfs(d + 1, p * 2, current_sum)

    # Root is always at (1, 1)
    dfs(1, 1, 0)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each node is visited once; n = len(nums).
- **Space Complexity:** O(n)  
  - The map uses O(n) space. DFS uses up to O(depth), which is ≤ 4 per constraints.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the tree was very deep (depth ≫ 4)?  
  *Hint: Watch out for Python recursion limits; consider iterative traversal.*

- What if the node values could be negative?  
  *Hint: Path sum logic remains the same; only sum values along the path.*

- How would you return the individual path sums?  
  *Hint: Instead of accumulating a total, store each leaf's path sum in a list.*

### Summary
This problem is an application of the **DFS (Depth-First Search) on trees**, but with a twist: the tree is encoded as a flat list of three-digit numbers. By mapping each node's depth and position, you simulate traversal without building a node-pointer tree. This is a classic **tree path sum** problem that also reinforces encoding and decoding tree representations. The mapping-based traversal logic can be generally applied wherever trees are represented implicitly, not just explicitly.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum(path-sum) (Easy)
- Path Sum II(path-sum-ii) (Medium)
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)
- Path Sum III(path-sum-iii) (Medium)