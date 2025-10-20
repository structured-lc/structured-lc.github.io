### Leetcode 55 (Medium): Jump Game [Practice](https://leetcode.com/problems/jump-game)

### Description  
Given an array of integers `nums`, you start at index 0 and each element represents the maximum jump length from that position. Your goal is to determine if you can reach the last index of the array.  
In other words, at each position `i`, you can jump up to `nums[i]` steps forward. Return `True` if you can reach the last position, else `False`.

### Examples  

**Example 1:**  
Input: `nums = [2,3,1,1,4]`  
Output: `True`  
*Explanation: From index 0, you can jump up to 2 positions, so either to index 1 or 2. Jump to index 1 (value is 3), then from index 1, you can jump to the end (index 4).*

**Example 2:**  
Input: `nums = [3,2,1,0,4]`  
Output: `False`  
*Explanation: You start at index 0 and can reach at most index 3, but index 3 has a 0, so you’re stuck and can’t move forward—cannot get to the last index (4).*

**Example 3:**  
Input: `nums = `  
Output: `True`  
*Explanation: You are already at the last index, so no jumping is required.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Check every possible jump from each index (DFS/BFS). This is exponential in time and not efficient.
- **DP Approach:** For each index, check whether you can reach it by looking at all previous reachable positions. This leads to O(n²) time.
- **Optimal (Greedy):** As you iterate through the array from left to right, keep track of the furthest index you can reach so far. At any index `i`, if `i` is not reachable (`i > max_reach`), return `False`. Otherwise, update `max_reach` to be the max between current `max_reach` and `i + nums[i]`. If you can reach the end or further by the time you finish, return `True`.  
- The greedy method is optimal due to its O(n) time and O(1) extra space, and always finds the answer as soon as it's determinable.

### Corner cases to consider  
- Single element array (already at the end).
- Array starts with zero, but n == 1.
- Long sequence ending with zeros but you can jump over.
- Large jump at the beginning covering the whole array.
- Zeros in the middle where you cannot land or jump beyond.
- Cases where jumps are just enough or always less by one.

### Solution

```python
def canJump(nums):
    # max_reach tracks the furthest index we can currently get to
    max_reach = 0
    n = len(nums)
    for i in range(n):
        # If we can't reach position i, return False
        if i > max_reach:
            return False
        # Update max_reach if we can get further from here
        max_reach = max(max_reach, i + nums[i])
        # Optimization: if we already can reach or pass the last index, return True
        if max_reach >= n - 1:
            return True
    # After loop, check if we reached the end
    return max_reach >= n - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we traverse the list once and perform constant work per element.
- **Space Complexity:** O(1), only a few variables used irrespective of input size; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need not just to check if you can reach the end, but also the *minimum number of jumps* needed?  
  *Hint: Try BFS-like or Greedy multi-level expand.*

- Can you solve this if jumps can go to negative indices as well?  
  *Hint: Would a visited set or DP memoization help avoid cycles?*

- Suppose the array is extremely large and you can't load it fully into memory, but can access elements by index.  
  *Hint: Only store and process a sliding window of indices that are potentially reachable.*

### Summary  
This problem is a classic example of the **Greedy algorithm** pattern. The approach centers on iteratively tracking the furthest reachable index and making decisions based only on this value, discarding any need to keep history. The greedy solution ensures optimal time (O(n)) and is often used for "reachability" or "cover" type tasks, such as "Jump Game II," "minimum number of platforms," and "candy distribution" problems.


### Flashcard
Greedily track the furthest reachable index as you iterate; if you reach or pass the last index, return True, else False.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Jump Game III(jump-game-iii) (Medium)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Minimum Number of Visited Cells in a Grid(minimum-number-of-visited-cells-in-a-grid) (Hard)
- Largest Element in an Array after Merge Operations(largest-element-in-an-array-after-merge-operations) (Medium)