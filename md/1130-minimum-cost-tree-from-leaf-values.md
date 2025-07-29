### Leetcode 1130 (Medium): Minimum Cost Tree From Leaf Values [Practice](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values)

### Description  
Given an array of positive integers called `arr`, each element represents a leaf of a full binary tree. The task is to build a tree where:
- Each *non-leaf* node has exactly two children.
- The values of *leaf* nodes (in in-order traversal) are exactly the elements of `arr`.
- The value of every *non-leaf* node is the product of the largest leaf in its left subtree and the largest leaf in its right subtree.
The goal is to assemble such a tree to **minimize the sum of the values of all non-leaf nodes**. You must return this smallest possible sum.

### Examples  

**Example 1:**  
Input: `arr = [6,2,4]`  
Output: `32`  
Explanation:  
- There are two ways to build a tree.  
  1.  
    ```
      [24]
      /  \
    [12]  4
    /  \
   6    2
    ```
    - Non-leaf nodes: 12 (6×2), 24 (max(6,2)×4 = 6×4)
    - Sum = 12 + 24 = 36
  2.  
    ```
     [32]
     /  \
    6   [8]
        / \
       2   4
    ```
    - Non-leaf nodes: 8 (2×4), 32 (max(6,8)×max(2,4) = 6×4)
    - Sum = 8 + 24 = 32

  The minimal sum is 32.

**Example 2:**  
Input: `arr = [4,11]`  
Output: `44`  
Explanation:  
- The only tree is  with children 4 and 11. Non-leaf node: 4×11 = 44.

**Example 3:**  
Input: `arr = [2,3,5,7]`  
Output: `59`  
Explanation:  
- Build tree optimally by grouping smallest consecutive pairs:
  - Pair 2 and 3 → 6 (2×3)
  - Then 5, then 7. Optimizing further,
  - Final minimal cost: 6(2×3) + 15(3×5) + 35(5×7) = 6 + 15 + 35 = 56  
  *But must check all groupings – DP discovers that the minimum sum is 59*.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all ways of grouping (like matrix chain multiplication DP): For every subarray, try every possible split, recursively get minimum cost.
- This gives O(2ⁿ) exponential time, because number of trees is Catalan(n).
- **Dynamic Programming:** Memoize using DP. For each subarray `arr[i:j+1]`, compute:
  - The minimal cost to build a tree for that subarray.
  - At each split point k, compute:
    - cost = dp[i][k] + dp[k+1][j] + max(arr[i:k+1]) × max(arr[k+1:j+1])
  - Store intermediate results to avoid recomputation (DP with O(n³)).
- **Greedy Stack:** The problem lets us merge smallest pairs first and always combine the smaller with its *minimum greater neighbor*. Use a monotonic decreasing stack:
  - Go through each leaf. While stack top ≤ current value, pop stack and add product stack.pop() × min(current, new stack top). Push current value in stack.
  - At end, multiply pairs left in stack.
  - This gives O(n) time.

  The stack solution is optimal due to the problem’s structure: merging smaller values first delays the more expensive multiplications for higher leaves.

### Corner cases to consider  
- Single element: No non-leaf node, answer = 0.
- Two elements: Only one tree possible.
- All elements equal: Any order of merging, result the same.
- Strictly increasing or decreasing arrays.
- Very large input sizes (n ∼ 10⁴): Prefer O(n) solution.
- Elements with values 0 or negative? (Not per constraints; only positive integers.)

### Solution

```python
def mctFromLeafValues(arr):
    # Monotonic decreasing stack, push a sentinel
    stack = [float('inf')]
    res = 0
    for num in arr:
        # While previous leaf is less than or equal to current,
        # combine it with its smaller neighbor.
        while stack[-1] <= num:
            mid = stack.pop()
            res += mid * min(stack[-1], num)
        stack.append(num)
    # Combine remaining stack elements
    while len(stack) > 2:
        res += stack.pop() * stack[-1]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each element is pushed and popped at most once.
- **Space Complexity:** O(n). The stack can grow up to n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can have zero or negative numbers?  
  *Hint: How would the tree values/merges work with negatives? Are any constraints violated by negatives?*

- Can you return the actual binary tree, not just the cost?  
  *Hint: Store tree structure or parent/children during DP/greedy computation.*

- Can you solve using pure DP?  
  *Hint: Describe the O(n³) memoization and DP table set-up.*

### Summary
This is a classic application of **monotonic stack** and a variant of "min/merge cost" greedy algorithms. The greedy stack pattern appears in problems like "Sum of Subarray Minimums" and "Largest Rectangle in Histogram". If asked for the structure, use DP/MCM style. The key pattern is greedy combining of the smallest nearby pairs to minimize costly later merges.