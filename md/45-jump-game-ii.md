### Leetcode 45 (Medium): Jump Game II [Practice](https://leetcode.com/problems/jump-game-ii)

### Description  
Given an array of integers `nums` of length n (0-indexed), each element `nums[i]` represents the maximum number of steps you can jump forward from index i.  
Starting at index 0, return the **minimum number of jumps needed to reach the last index (`n-1`)**.  
It’s guaranteed that you can always reach the last index from the start.

### Examples  

**Example 1:**  
Input: `nums = [2,3,1,1,4]`  
Output: `2`  
*Explanation: Jump 1 step from index 0 to 1 (nums=2), then 3 steps from index 1 to 4 (nums[1]=3, landing at last index).*

**Example 2:**  
Input: `nums = [2,3,0,1,4]`  
Output: `2`  
*Explanation: Jump 1 step from 0 to 1 (nums=2), then jump 3 steps from 1 to 4 (nums[1]=3).*

**Example 3:**  
Input: `nums = [1,2,1,1,1]`  
Output: `3`  
*Explanation: Jump from 0→1, 1→2, 2→4. The minimal jumps is 3.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would be to use BFS or recursion to check all possible jump paths, counting steps, and returning the minimum. However, this explodes in complexity for large arrays.

Next, we can optimize using a **greedy approach**:
- Keep track of the farthest index you can reach as you iterate.
- Use a variable to count jumps, incrementing only when you've explored all indices in your current jump range.
- Each time the current index reaches the end of the current jump's range, you make a jump — at this point, update your jump count and extend your range.

This pattern is similar to level-order traversal in BFS: each "level" is a set of indices reachable within the current number of jumps.

This greedy approach ensures the minimum jumps, because at each step we always use the largest forward reach possible before incrementing the jump counter.

### Corner cases to consider  
- `nums = [1]` → Already at the end, minimum jumps is 0.
- `nums` with all 1s like `[1,1,1,1]` → Each jump moves only one step, must make n-1 jumps.
- Large jumps in the beginning, e.g. `[10, 1, 1, ..., 1]` → Only one jump is needed.
- Zeros located anywhere except the end can be skipped due to the problem guarantee (always reachable).
- `nums` with only two elements, e.g. `[5,9]` → One jump.
- Edge: `nums = []` or invalid input - not possible by problem constraints.

### Solution

```python
def jump(nums):
    # Number of jumps made so far.
    jumps = 0
    # The farthest index that can be reached in current set of jumps.
    farthest = 0
    # The end of current jump's range.
    curr_end = 0

    # Iterate up to the second last index, since we don't need to jump from the very last index.
    for i in range(len(nums) - 1):
        # Update the farthest position reachable from current index or previous farthest.
        farthest = max(farthest, i + nums[i])
        
        # When we reach the end of the current jump's ability,
        # we must jump (increase the jump count), and update the jump's range.
        if i == curr_end:
            jumps += 1
            curr_end = farthest

    return jumps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each element is visited once to track the farthest reachable index and to count when a jump is needed.
- **Space Complexity:** O(1), only constant extra variables are used for counting and tracking reach.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted not just the minimum number of jumps, but also the actual path of indices you used?
  *Hint: Track parent or previous index during iteration.*

- How would you solve it if some jumps can go backwards as well as forwards?
  *Hint: Consider BFS or DP, as greedy may not always give the minimal path.*

- Can you solve this when some indices are unreachable (no guarantee to reach the end)?
  *Hint: You’d need to check for zero jumps and early termination.*

### Summary
The core approach is a **greedy range expansion**, similar to BFS-levels: jump count increases only when you're forced to reach beyond the current jump's reach. This is a classic pattern in interval covering and problems where “minimum steps to reach destination” is required and the array encodes “jump length possibilities” per index. This solution is both time efficient and simple—commonly applies to similar single-source minimum-step problems.


### Flashcard
Use greedy jumps: track farthest reachable index and increment jump count only when current index reaches end of jump range.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Jump Game(jump-game) (Medium)
- Jump Game III(jump-game-iii) (Medium)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Minimum Number of Visited Cells in a Grid(minimum-number-of-visited-cells-in-a-grid) (Hard)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)
- Visit Array Positions to Maximize Score(visit-array-positions-to-maximize-score) (Medium)