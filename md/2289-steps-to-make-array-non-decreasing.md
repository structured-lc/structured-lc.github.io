### Leetcode 2289 (Medium): Steps to Make Array Non-decreasing [Practice](https://leetcode.com/problems/steps-to-make-array-non-decreasing)

### Description  
You are given a 0-indexed integer array `nums`. At each step, remove every `nums[i]` where `nums[i] < nums[i-1]` for all i > 0. Repeat these steps until the array is non-decreasing (for all i > 0, nums[i] ≥ nums[i-1]).  
Your task: Return the minimum number of steps required to make the array non-decreasing.

### Examples  

**Example 1:**  
Input: `nums = [5,3,7,6,2]`,  
Output: `2`  
Explanation:  
- Step 1: Remove 3, 6, and 2 (since 3<5, 6<7, 2<6) → Array is now [5,7].  
- Step 2: No more violations, array is non-decreasing.  
- Output: 2.

**Example 2:**  
Input: `nums = [2,2,1,2,2,1]`,  
Output: `2`  
Explanation:  
- Step 1: Remove 1 at index 2 and 1 at index 5 (since they are less than their predecessors) → [2,2,2,2].  
- Step 2: All elements are non-decreasing, done.

**Example 3:**  
Input: `nums = [1,2,3,4,5]`,  
Output: `0`  
Explanation:  
- The array is already non-decreasing.

### Thought Process (as if you’re the interviewee)  
Start with a brute-force simulation:  
- At each step, scan the array and mark all positions where nums[i] < nums[i-1].
- Remove all such elements in one step.
- Repeat until no more elements can be removed.

However, this has poor time complexity (potentially O(n²)) because many passes are required, and each step involves scanning the array and creating a new one.

How do we optimize?  
- Notice each element can only be removed if there is a larger element to its left (“blockers”).
- For each index, ask how many steps it will take to remove it or make it “safe.”
- Use a stack (monotonic decreasing) to track when elements become “safe.”
- For every nums[i], look left in the stack for strictly smaller numbers; track maximum steps needed for any prior “blocker.”

Trade-offs:  
- Brute-force is simple, but very slow (O(n²)).
- Stack + DP is trickier but brings it down to O(n): each element is processed and stacked at most once.

### Corner cases to consider  
- Empty array or one element: should return 0 steps.
- All elements equal: already non-decreasing, 0 steps.
- Strictly decreasing array: each pass removes all but the first; answer is the number of passes.
- Array with plateaus (e.g., [2,2,2,2,2]): 0 steps.
- Duplicates interspersed with descents (e.g., [3,3,2,4,2,2,6]).

### Solution

```python
def totalSteps(nums):
    n = len(nums)
    # dp[i] = steps needed to remove nums[i]
    dp = [0] * n
    stack = []
    ans = 0

    for i in range(n):
        curr = 0
        # While stack is not empty and nums[stack[-1]] <= nums[i]
        while stack and nums[i] >= nums[stack[-1]]:
            # Track the max steps needed so far
            curr = max(curr, dp[stack.pop()])
        if stack:
            dp[i] = curr + 1
            ans = max(ans, dp[i])
        # If stack is empty, dp[i]=0 (no larger left, nothing to block)
        stack.append(i)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each element is pushed and popped from the stack at most once.
- **Space Complexity:** O(n) for the dp array and stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual sequence of arrays at each step, not just the number of steps?  
  *Hint: Track which values are removed at each step; may require storing sequence snapshots.*

- What if instead of removing all such elements per step, you could only remove one at a time?  
  *Hint: That is akin to a simpler insertion/deletion problem (much slower!).*

- Can you adapt this for linked lists, where removals don’t cost O(n) time?  
  *Hint: Need to track predecessor nodes efficiently.*

### Summary
This problem is a classic use case for a **monotonic stack** combined with **dynamic programming**.  
The principle is: for each number, track how many "waves" it takes to become safe; propagate the removal steps using information about previously seen elements.  
This pattern is common in problems smoothening arrays, removing obstacles, or simulating cascading removals, and appears in histogram, asteroid collision, and some interval problems.