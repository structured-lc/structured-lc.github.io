### Leetcode 1306 (Medium): Jump Game III [Practice](https://leetcode.com/problems/jump-game-iii)

### Description  
You are given an array of non-negative integers `arr` and a starting index `start`. From any position `i`, you can jump either to `i + arr[i]` (right) or `i - arr[i]` (left)—but only if the resulting index is within array bounds. Your task is to check if starting from `start`, you can reach any index whose value is 0. Each index can be visited at most once per search path; revisiting leads to infinite loops, so you must avoid them.

### Examples  

**Example 1:**  
Input: `arr = [4,2,3,0,3,1,2], start = 5`  
Output: `True`  
*Explanation: Start at index 5 (value 1). Possible jumps: 5+1=6 or 5-1=4. From 4 (value 3): jump to 4+3=7 (out of bounds) or 4-3=1. From 1 (value 2): jump to 1+2=3 (value 0, success).*

**Example 2:**  
Input: `arr = [4,2,3,0,3,1,2], start = 0`  
Output: `True`  
*Explanation: Start at 0 (value 4). Jumps: 0+4=4 or 0-4<0. From 4, follow as above until reaching index 3 (value 0).*

**Example 3:**  
Input: `arr = [3,0,2,1,2], start = 2`  
Output: `False`  
*Explanation: Start at index 2 (value 2). Jumps: 2+2=4 or 2-2=0. 0 → 0+3=3 or 0-3 out of bounds. 3 → 3+1=4 or 3-1=2 (already visited). All possible paths block before reaching 0, except visit cycles.*

### Thought Process (as if you’re the interviewee)  
First, I'll think of brute force: use recursion or a stack for DFS/BFS from `start`, trying all valid jumps. Keep track of visited positions to prevent cycles.  
Optimizing:  
- Both DFS and BFS are viable since the array's nodes and the search tree are not deep in practice.
- BFS would find the shortest jump path, but since we only care about reachability, DFS is easier to code and doesn't have real downsides for this problem.
- To mark visited, I can use a boolean list, or to save space, I can flip the sign of values (since all given are non-negative) to indicate a visit.
- Edge conditions: If we reach a value 0, return True immediately; if we go out of bounds or revisit, return False.
- Recursive DFS is fine for moderate sizes, but for very large arrays, iterative DFS/BFS or explicit visited set is safer against recursion stack overflow.

### Corner cases to consider  
- `arr` is empty (no jumps possible).
- `start` points to a 0 (trivially True).
- All elements except the start are >0 and unreachable.
- Cycles: avoid infinite loops if jumps can revisit the same indices.
- Large values (jumps that always go out of bounds).
- Multiple 0's, ensure any is reachable.

### Solution

```python
def canReach(arr, start):
    # Helper function: recursively checks if can reach zero
    def dfs(i):
        # Out of bounds or already visited
        if i < 0 or i >= len(arr) or arr[i] < 0:
            return False
        # If current index is zero
        if arr[i] == 0:
            return True
        # Mark visited by negating value (safe since non-negative input)
        jump = arr[i]
        arr[i] = -arr[i]
        # Try both possible jumps (right and left)
        return dfs(i + jump) or dfs(i - jump)
    return dfs(start)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each index is visited at most once (since we mark visited).  
- **Space Complexity:** O(n) worst-case (recursive stack or queue). No extra structures, but recursion may go as deep as array length.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers were allowed in the array?  
  *Hint: How would you detect or prevent infinite loops with negative values and cycles?*

- Could you implement this iteratively without recursion?  
  *Hint: Stack or queue (DFS/BFS) and explicit visited set or in-place marking.*

- What if returning the path, not just True/False, is required?  
  *Hint: Store predecessor or use backtracking to reconstruct the path.*

### Summary
This problem showcases the **graph traversal** pattern, where each index represents a node and permissible jumps define edges. Both BFS and DFS are valid; this solution uses recursive DFS with in-place marking for O(1) extra space. It's a technique common for similar reachability problems in arrays and graphs, such as "Word Ladder", "Snakes and Ladders", and other variations of "Jump Game".

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Jump Game(jump-game) (Medium)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)