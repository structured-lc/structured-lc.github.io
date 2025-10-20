### Leetcode 339 (Medium): Nested List Weight Sum [Practice](https://leetcode.com/problems/nested-list-weight-sum)

### Description  
Given a **nested list** of integers, where each element is either an integer or another list (which may itself be arbitrarily nested), return the **sum of all integers** in the list, weighted by their depth. The depth of an integer is the number of lists that contain it. For example, the outermost list elements are depth 1, elements in a list inside a list are depth 2, etc.

### Examples  

**Example 1:**  
Input: `[[1,1],2,[1,1]]`  
Output: `10`  
*Explanation: Four 1's at depth 2, one 2 at depth 1. Calculation: 1×2 + 1×2 + 1×2 + 1×2 + 2×1 = 10*  

**Example 2:**  
Input: `[1,[4,]]`  
Output: `27`  
*Explanation: 1 at depth 1 (1×1=1), 4 at depth 2 (4×2=8), 6 at depth 3 (6×3=18). Sum: 1 + 8 + 18 = 27*  

**Example 3:**  
Input: `[2,[[3]],4]`  
Output: `2 + 3×3 + 4 = 15`  
*Explanation: 2 at depth 1, 3 at depth 3 (nested two levels), 4 at depth 1. Calculation: 2×1 + 3×3 + 4×1 = 2 + 9 + 4 = 15*

### Thought Process (as if you’re the interviewee)  
- The problem asks for a **weighted sum** based on how deep each integer is in the nested list.
- My first idea is to use **recursion**: when iterating through the list, pass the current depth to each recursive call.
- For each element:
  - If it's an integer, add its value times the current depth.
  - If it's a list, recur into it, increasing the depth by 1.
- Alternatively, I could use an **iterative/BFS** approach with a queue to track each element alongside its depth, but recursion is more natural here since the structure is inherently recursive.
- **Trade-off:** Recursion is simple, but with deeply nested lists, stack overflow is possible. Iterative using a queue (BFS) avoids stack overflows for extreme depths, but is more verbose.

### Corner cases to consider  
- Empty list: `[]`
- List of only integers: `[1,2,3]`
- List with empty sublists: `[[], 1, [[]], [2, []]]`
- Deeply nested: e.g., `[1,[2,[3,[4]]]]`
- Nested levels with varying emptiness: `[[], [[[]]], [[[1]]]]`
- Large single integer, deeply nested: `[[[[[]]]]]`

### Solution

```python
# This code assumes there exists a NestedInteger class with:
# - isInteger(): returns True if this NestedInteger holds a single integer
# - getInteger(): returns the integer if isInteger() is True
# - getList(): returns the list of NestedInteger objects

def depthSum(nestedList):
    # Helper function for DFS traversal with depth tracking
    def dfs(nlist, depth):
        total = 0
        for elem in nlist:
            if elem.isInteger():
                total += elem.getInteger() * depth
            else:
                total += dfs(elem.getList(), depth + 1)
        return total

    return dfs(nestedList, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of **NestedInteger** elements, including integers and lists. Each element is visited once.
- **Space Complexity:** O(D), where D is the maximum depth of nesting, due to the recursive call stack. (Or O(N) in worst case if input is deeply nested.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this iteratively (without recursion)?  
  *Hint: Use a queue and keep track of (element, depth) pairs for BFS.*

- What if the depth weights are reversed (weight deeper elements less)?  
  *Hint: Find the maximum depth first, then sum integers using weight = maxDepth - depth + 1.*

- What would you do if the input is extremely large and doesn’t fit in memory?  
  *Hint: Consider streaming input, or processing elements as they arrive.*

### Summary
This problem uses the **DFS pattern** (specifically pre-order traversal) on recursive data structures. It’s typical for problems involving trees, nested lists, or any hierarchy. Knowing how to traverse arbitrary-depth recursive structures is useful for many interview questions, including file systems, expressions, and tree algorithms.


### Flashcard
Use DFS or BFS to sum each integer multiplied by its depth; recurse into sublists, increasing depth by 1 each time.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Nested List Weight Sum II(nested-list-weight-sum-ii) (Medium)
- Array Nesting(array-nesting) (Medium)
- Employee Importance(employee-importance) (Medium)