### Leetcode 508 (Medium): Most Frequent Subtree Sum [Practice](https://leetcode.com/problems/most-frequent-subtree-sum)

### Description  
Given a **binary tree**, find the sum of every node’s entire subtree (including the node itself). The task is to return a list of the most frequently occurring subtree sum(s).  
**If multiple sums are tied for most frequent, return them all in any order.**  
*A subtree sum* for a node is the sum of its value and all values of its descendants. Traverse all possible subtrees (every node as subtree root), count each sum’s occurrence, and report the one(s) seen most frequently.

### Examples  

**Example 1:**  
Input: `[5,2,-3]`  
Output: `[2, -3, 4]`  
Explanation:  
- Tree:  
  ```
      5
     / \
    2  -3
  ```
- Subtree sums:  
  - Node 2: 2  
  - Node -3: -3  
  - Node 5 (whole tree): 5 + 2 + (-3) = 4  
- Each sum occurs once (equal frequency) — return all: `[2, -3, 4]`.

**Example 2:**  
Input: `[5,2,-5]`  
Output: `[2]`  
Explanation:  
- Tree:  
  ```
      5
     / \
    2  -5
  ```
- Subtree sums:  
  - Node 2: 2  
  - Node -5: -5  
  - Node 5 (whole tree): 5 + 2 + (-5) = 2  
- Sum 2 occurs twice, -5 only once — return `[2]`.

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
Explanation:  
- Tree:  
  ```
    1
  ```
- Subtree sums:  
  - Node 1: 1 (only node)  
- Only one sum present.


### Thought Process (as if you’re the interviewee)  
- **Brute force?**  
  For every node, walk its subtree summing all values, keep a total of how many times you see each sum. If you did this naively, this would take O(n²): for each node (O(n)), sum its subtree (O(n) in worst case).
- **Optimized approach:**  
  You can get each subtree’s sum efficiently with a post-order DFS traversal. For each node, recursively get its left sum and right sum, then compute its subtree sum:  
  subtree_sum = node_val + left_sum + right_sum  
  Store each sum in a hash map with its frequency count.  
  As you return up the recursion, you build all subtree sums in O(n).  
  Finally, examine the map, find all keys with the maximum frequency and return.
- **Why is DFS/post-order required?**  
  Because you need to know children’s sums before you compute the parent’s sum.

**Trade-offs:**  
- No need for extra data structures aside from a hash map for frequency counts.
- All nodes are visited once; all subtree sums are computed in linear time.


### Corner cases to consider  
- Tree with only one node  
- All nodes having the same value  
- Multiple most frequent sums (equal frequencies)  
- Very deep left- or right-skewed trees (recursion stack)  
- All sums unique  
- Negative and positive values  
- Empty tree (`root` is `None`); (problem constraints likely guarantee at least one node, but reasonable to consider)


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def mostFrequentTreeSum(root):
    # Map sum -> frequency
    sum_count = {}
    max_count = [0]  # use list for mutability in closure

    def dfs(node):
        if not node:
            return 0
        # Post-order: compute left/right first
        left = dfs(node.left)
        right = dfs(node.right)
        subtotal = node.val + left + right
        # Count frequency
        sum_count[subtotal] = sum_count.get(subtotal, 0) + 1
        # Track highest frequency so far
        if sum_count[subtotal] > max_count[0]:
            max_count[0] = sum_count[subtotal]
        return subtotal

    dfs(root)
    # Collect all sums with the highest frequency
    return [s for s, cnt in sum_count.items() if cnt == max_count[0]]
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree. Each node is visited exactly once to compute its sum. All hashmap operations are O(1).
- **Space Complexity:**  
  - O(n) for the hash map storing all subtree sums (in worst case, all sums unique).  
  - O(h) for the recursion stack (h = tree height, worst case O(n) for skewed trees).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input tree is extremely deep and recursion stack overflows?  
  *Hint: Can you do the traversal iteratively or use tail recursion?*  

- How would you handle updating the tree (insert/delete nodes) and maintain most frequent subtree sums dynamically?  
  *Hint: Can you cache subtree sums and update them efficiently after changes?*

- Can you solve the problem without using a hash map/dictionary, or using O(1) extra space?  
  *Hint: What are the trade-offs in terms of time and space?*


### Summary

This problem uses the **post-order DFS** traversal pattern to calculate subtree values in a bottom-up manner, allowing efficient memoization of results (hash map for frequencies). The approach is broadly applicable to any problem requiring aggregation of values over all subtrees or descendant sets, such as “path sum”, counting or measuring properties of subtrees, or frequency/statistic aggregation per subtree. The key technique: compute child results before the parent, collect and count properties at each node.