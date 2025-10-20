### Leetcode 1388 (Hard): Pizza With 3n Slices [Practice](https://leetcode.com/problems/pizza-with-3n-slices)

### Description  
Given a circular pizza with 3×n slices (each with different numbers of toppings), you pick exactly n non-adjacent slices (arranged in a circle) so that no two picked slices are next to each other. The rest go to Alice and Bob, who also can't pick adjacent slices. Return the maximum total toppings you can obtain.

### Examples  
**Example 1:**  
Input: `slices=[1,2,3,4,5,6]`  
Output: `10`  
*Explanation: Pick slices 2, 4, 6 (indices 1,3,5), sum is 10.*

**Example 2:**  
Input: `slices=[8,9,8,6,1,1]`  
Output: `16`  
*Explanation: Pick slices 1, 3, 5 (or 2, 4, 6), sum is 16.*

**Example 3:**  
Input: `slices=[4,1,2,5,8,3,1,9,7]`  
Output: `21`  
*Explanation: Best to pick indices 0, 3, 6 (4,5,1), 2,5,8 (2,3,7), or similar combinations.*

### Thought Process (as if you’re the interviewee)  
This is a **variation of the House Robber II (circular DP)** problem, with the constraint that we must pick exactly n non-adjacent slices.

Key ideas:
- Can't pick the first and last element simultaneously due to the circle.
- Use two runs of dynamic programming: (1) exclude the last slice, (2) exclude the first slice.
- Standard DP recurrence: dp[i][j] = max(dp[i-1][j], dp[i-2][j-1] + slices[i]), where dp[i][j] means the maximum sum using first i+1 slices and picking exactly j slices.
- Take the max of the results from both runs.

Trade-offs: This DP is O(n²), but still efficient for n ≤ 100.

### Corner cases to consider  
- All slices have the same value
- Very big/small slice in the circle
- Slices of size 1 (minimum input)
- Only possible to pick every third slice
- Must select exactly n, not less or more

### Solution

```python
class Solution:
    def maxSizeSlices(self, slices):
        def calculate(slices):
            n = len(slices) // 3
            m = len(slices)
            # dp[i][j]: max sum in slices[0...i], picking exactly j slices
            dp = [[0] * (n + 1) for _ in range(m + 1)]
            for i in range(1, m + 1):
                for j in range(1, n + 1):
                    # Take or skip
                    if i == 1:
                        dp[i][j] = slices[i-1]
                    else:
                        dp[i][j] = max(
                            dp[i-1][j],
                            (dp[i-2][j-1] if i > 1 else 0) + slices[i-1]
                        )
            return dp[m][n]
        # Run twice, once excluding first, once last due to circle
        return max(
            calculate(slices[1:]),   # exclude first
            calculate(slices[:-1])   # exclude last
        )
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), where n is the number to pick. Double DP table pass.
- **Space Complexity:** O(n²) for the DP table.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize the space complexity?
  *Hint: Notice only previous two rows are needed—optimize DP rows.*

- What changes if the pizza is not circular?
  *Hint: Only one DP run needed.

- What if you can pick at most n instead of exactly n slices?
  *Hint: Tweak DP to allow ≤ n picks, take max over possibilities.*

### Summary
This is a classic DP on subarrays with circle/adjacency constraints. The major coding pattern is 2-pass DP, similar to House Robber II. This pattern is widely useful for interval select problems, especially with non-adjacent choices and circular structure.


### Flashcard
Use circular DP (House Robber II style): run DP twice, excluding first or last slice, pick max of n non-adjacent slices.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
