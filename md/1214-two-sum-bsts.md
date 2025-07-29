### Leetcode 1214 (Medium): Two Sum BSTs [Practice](https://leetcode.com/problems/two-sum-bsts)

### Description  
Given the roots of two **binary search trees (BSTs)** and an integer `target`, determine if there is a node from the first BST and a node from the second BST whose values add up to exactly `target`. Return `True` if such a pair exists, else return `False`.

Imagine you have two separate teams of numbers (structured as BSTs), and you want to check if it's possible to pick one number from each team such that their sum equals a given value.

### Examples  

**Example 1:**  
Input: `root1 = [2,1,4]`, `root2 = [1,0,3]`, `target = 5`  
Output: `True`  
Explanation: 2 (from root1) + 3 (from root2) = 5.

Visual:
```
root1:     2
          / \
         1   4

root2:     1
          / \
         0   3
```

**Example 2:**  
Input: `root1 = [0,-10,10]`, `root2 = [5,1,7,0,2]`, `target = 18`  
Output: `False`  
Explanation: No combination from the two trees sums up to 18.

Visual:
```
root1:      0
           / \
        -10   10

root2:      5
           / \
          1   7
         / \
        0   2
```

**Example 3:**  
Input: `root1 = [1]`, `root2 = [1]`, `target = 3`  
Output: `True`  
Explanation: 1 (root1) + 2 (add a value) = 3.  
(For this case, root2 would need a 2 somewhere. If not present, output should be False.)

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Traverse every node in the first BST; for each, traverse every node in the second BST and check if their sum is `target`. This results in O(M × N) time and is not efficient, especially with large trees.

- **Can we optimize?**  
  Because BSTs are ordered, we can extract all values from both BSTs into lists using in-order traversal, ensuring both lists are sorted (ascending).
  
- With two sorted lists:
    - Use the **two-pointer technique** — one pointer at the start of the first list, one at the end of the second list.  
    - If sum < target, move the left pointer forward; if sum > target, move the right pointer backward; if sum == target, return True.

- **Why this approach?**  
  It leverages BST properties and is much more efficient (O(M + N) for traversals and O(M + N) for the two-pointer search—much better than brute-force).

- Alternative: For each value in the first BST, search (BST search) for `target - val1` in the second BST (and vice versa), but this is generally slower (O(M × log N) or O(N × log M)), and you don’t get the simplicity/elegance of the two-pointer pattern.

### Corner cases to consider  
- One or both trees are empty (though constraints guarantee at least 1 node in each)
- Trees with only one node in each
- Duplicate values in trees
- All values negative or all positive
- Large tree sizes (close to 5000 nodes per tree)
- Target is outside the min/max possible sum

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def twoSumBSTs(root1, root2, target):
    # Helper to traverse BST and collect values (in-order makes the list sorted)
    def inorder(node, arr):
        if not node:
            return
        inorder(node.left, arr)
        arr.append(node.val)
        inorder(node.right, arr)
    
    vals1, vals2 = [], []
    inorder(root1, vals1)
    inorder(root2, vals2)

    # Two-pointer technique
    i, j = 0, len(vals2) - 1
    while i < len(vals1) and j >= 0:
        s = vals1[i] + vals2[j]
        if s == target:
            return True
        elif s < target:
            i += 1
        else:
            j -= 1
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - In-order traversal of both BSTs: O(M + N), where M is nodes in root1, N in root2.  
  - Two-pointer search: O(M + N) in worst case.  
  - Overall: **O(M + N)**.

- **Space Complexity:**  
  - Extra arrays to hold values from both trees: O(M + N).  
  - Recursion stack could be O(H1 + H2) for in-order traversal, where H1, H2 are tree heights.

### Potential follow-up questions (as if you’re the interviewer)  

- **How would you do this if memory is severely limited (cannot store full lists)?**  
  *Hint: Use in-order and reverse in-order iterators (generators), essentially yielding values as needed rather than storing all of them.*

- **What if the trees were very imbalanced or even linear (degenerate)?**  
  *Hint: Consider the impact on recursion stack usage and whether you need to switch to iterative traversals.*

- **Can you find all such pairs whose sum is target, not just check existence?**  
  *Hint: You may need to collect all possibilities during the traversal rather than return early.*

### Summary
For the Two Sum BSTs problem, leveraging BST structure and in-order traversals to obtain sorted lists is key. The solution uses the classic sorted two-pointer technique, a pattern widely used for problems involving searching for sums in sorted arrays. This approach optimizes both time and space, is cleanly applicable to similar BST or two-list sum problems, and scales well to large trees.