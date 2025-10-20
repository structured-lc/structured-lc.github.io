### Leetcode 364 (Medium): Nested List Weight Sum II [Practice](https://leetcode.com/problems/nested-list-weight-sum-ii)

### Description  
You are given a **nested list of integers**. Each element in the list is either a single integer or another nested list of integers. Your goal is to calculate the **sum of all integers weighted by their *inverse* depth**:  
- The weight of an integer is **increasing as it is closer to the root**, and **deeper integers get weight 1**.  
- So, leaf numbers are multiplied by 1, and numbers closer to the outermost list are multiplied by the maximum possible depth of any integer in the structure.

You need to return this weighted sum.

### Examples  

**Example 1:**  
Input: `[[1,1],2,[1,1]]`  
Output: `8`  
*Explanation: There are four 1's at depth 2, each with weight 1. The 2 is at depth 1, weight 2. Calculation: 2 × 2 + 1 × 1 + 1 × 1 + 1 × 1 + 1 × 1 = 2×2 + 4×1 = 4 + 4 = 8.*

**Example 2:**  
Input: `[1,[4,]]`  
Output: `17`  
*Explanation:  
1 is at depth 1 (weight 3), 4 is at depth 2 (weight 2), and 6 is at depth 3 (weight 1). Calculation: 1×3 + 4×2 + 6×1 = 3 + 8 + 6 = 17.*

**Example 3:**  
Input: `[1,[2,[3,[4]]]]`  
Output: `20`  
*Explanation:  
1 at depth 1 (weight 4), 2 at depth 2 (weight 3), 3 at depth 3 (weight 2), 4 at depth 4 (weight 1). Calculation: 1×4 + 2×3 + 3×2 + 4×1 = 4+6+6+4 = 20.*

### Thought Process (as if you’re the interviewee)  
First, for each integer we need to know its *depth*, because the weight depends on the maximum depth in the entire structure.  
A brute-force idea is:
- Do a depth-first traversal, noting for each integer its depth, and keeping track of the deepest point (max depth) seen so far.
- After you have max depth, traverse again, this time computing each integer’s weight as (maxDepth - depth + 1).

But to optimize:
- Instead of two traversals, we can use a breadth-first search (BFS) to collect the sum of integers at each depth level.
- At the end, sum for all levels: (levelSum × weight), where weight = (maxDepth - depth + 1).
- This saves us going through the list twice for all depths.

Alternatively, keep an array or list of level sums as you traverse, then work backwards to multiply by weights.

Trade-offs:
- Two-pass (DFS twice) is easy to code and reason about.
- The BFS approach is slightly more efficient, and lets you avoid the need to store detailed position data.

### Corner cases to consider  
- Empty list: input like `[]`
- Nested empty lists: e.g., `[[], [[]]]`
- All elements are integers (no nesting)
- Only one integer (deep, shallow, or root)
- Deeply nested, only one integer at the deepest level
- Mixed lists and integers at all different depths

### Solution

```python
# Let's define the required interface similar to LeetCode's
class NestedInteger:
    def isInteger(self) -> bool:
        ...

    def getInteger(self) -> int:
        ...

    def getList(self) -> ['NestedInteger']:
        ...

def depthSumInverse(nestedList):
    # First, find maximum depth of the list
    def get_max_depth(nlist, current_depth):
        max_depth = current_depth
        for x in nlist:
            if x.isInteger():
                max_depth = max(max_depth, current_depth)
            else:
                max_depth = max(max_depth, get_max_depth(x.getList(), current_depth + 1))
        return max_depth

    max_depth = get_max_depth(nestedList, 1)

    # Compute weighted sum: for each integer, sum integer × (max_depth - depth + 1)
    def get_weighted_sum(nlist, current_depth):
        result = 0
        for x in nlist:
            if x.isInteger():
                weight = max_depth - current_depth + 1
                result += x.getInteger() * weight
            else:
                result += get_weighted_sum(x.getList(), current_depth + 1)
        return result

    return get_weighted_sum(nestedList, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of integers plus the number of lists.  
  - We traverse the structure twice: once to get max depth, once to get the sum.
- **Space Complexity:** O(D), where D is the maximum nesting depth, due to recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the sum for each depth as an array?
  *Hint: Use a list to accumulate each level’s integer sum during traversal.*

- How would you solve if you cannot use recursion?
  *Hint: Implement BFS using queues to track level sums.*

- Could you do this in a single pass?
  *Hint: Simultaneously track the total sum at each level, saving all level sums, and compute the weighted sum once maximum depth is known.*

### Summary
This problem uses the **Depth-First Search** (DFS) pattern, combined with tracking metadata (depth and max depth) for each node. The approach is a *two-pass recursive traversal*: first to find the maximum depth, then to compute the answer using the appropriate weights.  
This pattern is common in problems requiring aggregation conditioned on element position or level in a hierarchical structure, such as weighting tree or nested list nodes.


### Flashcard
Use BFS to sum all integers at each depth, then weight each level by (maxDepth - depth + 1) for the final sum.

### Tags
Stack(#stack), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Nested List Weight Sum(nested-list-weight-sum) (Medium)
- Array Nesting(array-nesting) (Medium)