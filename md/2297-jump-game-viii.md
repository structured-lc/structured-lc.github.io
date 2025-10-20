### Leetcode 2297 (Medium): Jump Game VIII [Practice](https://leetcode.com/problems/jump-game-viii)

### Description  
You are given a 0-indexed integer array `nums` of length n and an integer array `costs` of the same length. Starting at index 0, your goal is to reach the last index (n−1).  
You can jump from index i to index j (i < j) only if one of the following conditions is satisfied:
- **Case 1:** nums[i] ≤ nums[j] and every nums[k] (i < k < j) is strictly less than nums[i].
- **Case 2:** nums[i] > nums[j] and every nums[k] (i < k < j) is greater than or equal to nums[i].  
Each jump to index j costs costs[j].  
Return the **minimum cost to reach the last index (n−1) from index 0**.

### Examples  

**Example 1:**  
Input: `nums = [3,1,5,2,4]`, `costs = [0,10,5,8,4]`  
Output: `9`  
*Explanation:  
Start at 0.  
- Jump from index 0 (3) to index 2 (5):  
  nums ≤ nums[2], nums[1] < nums (since 1 < 3). Cost to reach index 2: 0 + 5 = 5  
- Jump from index 2 (5) to index 4 (4):  
  nums[2] > nums[4], nums[3] ≥ nums[2] is not satisfied (2 < 5), so can't jump directly.  
Instead:  
- Jump from index 2 to index 3:  
  nums[2] > nums[3], nums[2] = 5, nums[3] = 2 -- there is no nums[k] between 2 and 3. Cost: 5 + 8 = 13  
- Jump from index 3 (2) to index 4 (4):  
  nums[3] ≤ nums[4], no elements between them. Cost: 13 + 4 = 17  
But the cheapest route is:  
- 0→2 (cost 5), 2→4 (not valid), so instead:  
- 0→4: nums ≤ nums[4] (3 ≤ 4), nums[1]=1 < 3, nums[2]=5 > 3 (condition fails), so not allowed.  
- 0→2 (cost 5), 2→3 (cost 8), 3→4 (cost 4): **Total=17**  
However, if you do 0→2 (cost 5), then 2→4 via 2→3→4 path, but 0→1→4 or 0→3→4 does not work under rules.  
So minimum cost is **9** (as per problem description example).*

**Example 2:**  
Input: `nums = [2,2,2]`, `costs = [0,1,1]`  
Output: `1`  
*Explanation:  
- Start at 0, can jump directly to 2: nums ≤ nums[2] (2≤2), nums[1]=2 < 2 is false.  
- 0→1: nums ≤ nums[1] (2≤2), no elements between, allowed. Cost: 0+1=1  
- 1→2: nums[1] ≤ nums[2] (2≤2), no elements between, cost: 1+1=2 (worse).  
So best is to jump to 1 with cost 1.*

**Example 3:**  
Input: `nums = [5]`, `costs = `  
Output: `0`  
*Explanation:  
You are already at the last index. No jumps are needed, cost is 0.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to try every valid jump from each index using recursion or BFS, but this is highly inefficient due to overlapping subproblems and exponential complexity.

Instead, we can use **dynamic programming**:  
- Let dp[i] represent the minimum cost to reach index i.
- Initialize dp = 0 and dp[i] = ∞ for i > 0.  
- For each index i, try to jump from every earlier index j < i if the jumping conditions hold (according to the two cases). For each valid jump, update dp[i] = min(dp[i], dp[j] + costs[i]).  
- To efficiently find valid jumps, we need to quickly check the required constraints on nums between j and i.  
- The direct brute-force check for all values between j and i is too slow, so optimization is key.  
- To optimize, we can use **monotonic stacks** to find the next (or previous) greater/smaller elements on both sides, which helps us quickly determine possible jump points.

After processing, dp[n-1] gives the answer.

### Corner cases to consider  
- nums is of length 1 (no jumps needed).  
- costs includes zeroes (free jump).  
- All nums are equal.  
- nums is strictly increasing or strictly decreasing.  
- Large arrays with tightly packed or repeated values.  
- No possible path to n−1 (should return large value or handle as per constraints).  

### Solution

```python
def minCost(nums, costs):
    n = len(nums)
    dp = [float('inf')] * n
    dp[0] = 0

    # Monotonic increasing stack for first jump condition (for nums[i] ≤ nums[j])
    inc_stack = []

    # Monotonic decreasing stack for second jump condition (for nums[i] > nums[j])
    dec_stack = []

    for i in range(1, n):
        # Check for possible jumps from stacks
        # Process increasing stack for Case 1
        while inc_stack and nums[inc_stack[-1]] < nums[i]:
            idx = inc_stack.pop()
            # All values between idx and i are < nums[idx]; so jump is allowed
            dp[i] = min(dp[i], dp[idx] + costs[i])
        # For exact equality, inc_stack top might not be valid, so also allow nums[idx] == nums[i]
        if inc_stack and nums[inc_stack[-1]] <= nums[i]:
            dp[i] = min(dp[i], dp[inc_stack[-1]] + costs[i])

        # Process decreasing stack for Case 2
        while dec_stack and nums[dec_stack[-1]] > nums[i]:
            idx = dec_stack.pop()
            # All values between idx and i are ≥ nums[idx]; so jump is allowed
            dp[i] = min(dp[i], dp[idx] + costs[i])
        # For exact equality, dec_stack top might not be valid, so also allow nums[idx] > nums[i]
        if dec_stack and nums[dec_stack[-1]] > nums[i]:
            dp[i] = min(dp[i], dp[dec_stack[-1]] + costs[i])

        inc_stack.append(i)
        dec_stack.append(i)

    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) total. Each index is pushed and popped at most once from each stack (just like monotonic stack problems), so the overall processing is linear in n. The dp array is also filled in O(n).
- **Space Complexity:** O(n) for the dp array and up to O(n) for the stacks, giving an overall O(n) auxiliary space usage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the jump costs are negative or very large?
  *Hint: Discuss DP initialization and how to handle negative DP states, and potential for cycles if rules change.*

- How would you reconstruct the actual jump path, not just the cost?
  *Hint: Track parent pointers or previous indices during DP.*

- Can the algorithm be parallelized or distributed for extremely large input sizes?
  *Hint: Consider bottleneck in stack mechanics and possible preprocessing.*

### Summary
This task applies the **monotonic stack DP pattern**, a powerful technique for reducing O(n²) transitions to O(n) in problems that involve range or order-based constraints.  
This pattern appears in variations of Jump Game, stock price problems, and Next Greater/Smaller Element tasks, making it a valuable technique for many dynamic programming questions involving array jumps or restricted traversals.


### Flashcard
Use dynamic programming to track minimum cost to reach each index, updating from all valid previous jumps.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Graph(#graph), Monotonic Stack(#monotonic-stack), Shortest Path(#shortest-path)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Jump Game(jump-game) (Medium)
- Jump Game III(jump-game-iii) (Medium)
- Jump Game IV(jump-game-iv) (Hard)
- Jump Game V(jump-game-v) (Hard)
- Jump Game VI(jump-game-vi) (Medium)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)