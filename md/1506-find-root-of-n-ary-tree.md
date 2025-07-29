### Leetcode 1506 (Medium): Find Root of N-Ary Tree [Practice](https://leetcode.com/problems/find-root-of-n-ary-tree)

### Description  
Given all nodes of an N-ary tree defined by a list where each node may have multiple children but only a single parent, return the root node of the tree. Each node is provided as an instance—the only thing missing is which node is the root. No node has more than one parent. Your task: Find and return the root.

### Examples  

**Example 1:**  
Input: `nodes = [1, null, 2,3,4, null, 5,6]`  
Output: `1`  
*Explanation: The tree is:
```
    1
  / | \
 2  3  4
    |  |
    5  6
```
Root node is 1.*

**Example 2:**  
Input: `nodes = [10, null, 20, 30, 40]`  
Output: `10`  
*Explanation: The tree is just:
```
 10
/ | \
20 30 40
```
*

**Example 3:**  
Input: `nodes = `  
Output: `7`  
*Explanation: Only one node, so it's the root.*

### Thought Process (as if you’re the interviewee)  
- Every node except the root appears as someone else's child at least once.
- If I traverse all nodes and collect all children, the root will be the only node that is not a child.
- Hash set or the algebraic trick (summing all node values and subtracting all child values) can help identify which is the root efficiently.

### Corner cases to consider  
- Only one node in the list
- All nodes are direct children of the root
- Some nodes have no children
- Node values may not be continuous or sorted

### Solution

```python
# Node class definition is assumed from problem statement
class Node:
    def __init__(self, val, children=[]):
        self.val = val
        self.children = children

# O(n) time, O(1) space if using value math, else O(n) if using sets

def findRoot(tree):
    # Algebraic method: sum all node values, subtract all child values
    node_sum = 0
    for node in tree:
        node_sum += node.val
        for child in node.children:
            node_sum -= child.val
    # The node whose value remains is the root's value
    for node in tree:
        if node.val == node_sum:
            return node
    # Should always exist, per problem guarantee
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), each node seen once.
- **Space Complexity:** O(1), only integers for the sum. (Could also use O(n) space hash set if desired.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize to trees where duplicate node values are possible?  
  *Hint: Would need to use object references instead of values.*

- What if the nodes are streamed in and don't fit in memory?  
  *Hint: Needs external sort or processing in chunks.*

- How do you identify the root if the N-ary tree can have cycles or is not actually a tree?  
  *Hint: Cycle detection via visited set or parent count.*

### Summary
This is a classic problem of parent/child bookkeeping. The clever approach of sum-of-values subtraction, or set subtraction, is a very common one for root/unique node detection, and applies across trees and graphs.