### Leetcode 3505 (Hard): Minimum Operations to Make Elements Within K Subarrays Equal [Practice](https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal)

### Description  
You’re given an integer array `nums`, and two integers `x` and `k`. In one operation, you can increment or decrement any element in `nums` by one.  
Your goal is to find the **minimum number of operations** needed so that there are **at least** `k` non-overlapping subarrays of length exactly `x` in `nums`, where **all elements within each subarray are equal** (each subarray can become any constant, but all elements inside it must end up the same).  

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 2, 2, 2, 1, 3, 2], x = 3, k = 2`  
Output: `2`  
Explanation:  
- Choose subarray indices 1-3 (`[2, 3, 2]`) and 4-6 (`[2, 2, 1]`).  
- Change `[2, 3, 2]` to `[2, 2, 2]` (1 operation), and `[2, 2, 1]` to `[2, 2, 2]` (1 operation).
- Total operations: 2. You now have 2 subarrays of length 3 (indices 1-3 and 4-6), all elements equal in each.

**Example 2:**  
Input: `nums = [4, 1, 4, 1, 4, 1], x = 2, k = 3`  
Output: `0`  
Explanation:  
- There are three non-overlapping subarrays of length 2: `[4, 1]`, `[4, 1]`, `[4, 1]`.  
- No operations needed if every subarray is allowed to be any constant value.

**Example 3:**  
Input: `nums = [1, 5, 1, 3, 5, 3, 1, 5, 1], x = 3, k = 2`  
Output: `4`  
Explanation:  
- One way: pick `[1, 5, 1]` and `[3, 5, 3]`, both can become `[3, 3, 3]` at cost 4 (two operations each).

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  - Identify all possible non-overlapping subarrays of length x.
  - For each subarray, compute the minimum cost to make all elements equal (pick any value, sum absolute differences).
  - Try all combinations of k subarrays (without overlap), sum their costs, return the minimum.
  - Clearly infeasible (combinatorial explosion).

- **Observation:**  
  - To minimize the cost of making a subarray constant, set all its elements to its median.
  - The real challenge is efficiently picking k non-overlapping subarrays with the minimal total cost.

- **Optimized approach:**  
  - Precompute for each window (len x) the cost to make it constant (using median).
  - This results in O(n) costs.
  - Use Dynamic Programming:
    - `dp[i][j]` = minimal total cost to pick j subarrays (without overlap) among the first i elements.
    - For every index, either skip or take the subarray ending at i (if last taken ends before overlap).
    - For each possible start, look back x (since subarrays can't overlap). Transition: `dp[i][j] = min(dp[i-1][j], dp[i-x][j-1] + cost(i-x+1 to i))`.
  - Return min cost to select k subarrays.

- **Trade-offs:**  
  - O(n × k) DP is reasonable for n ≤ 10⁴–10⁵ and k ≤ 10²–10³.

### Corner cases to consider  
- x > len(nums): Impossible to have any subarray.
- k = 0: Answer is 0 (no subarrays needed).
- k > ⌊len(nums) / x⌋: Also impossible to have so many non-overlapping windows.
- nums already has matching subarrays.
- All elements equal already.
- x = 1: Each element is its own subarray, cost is 0.
- Negative numbers or large magnitude range in nums.

### Solution

```python
def min_operations(nums, x, k):
    n = len(nums)
    max_groups = n // x
    if k == 0 or x > n or k > max_groups:
        return 0 if k == 0 else -1  # Impossible or no work
    
    # Precompute cost for all windows of length x
    costs = [0] * (n - x + 1)
    for i in range(n - x + 1):
        window = nums[i:i + x]
        sorted_window = sorted(window)
        median = sorted_window[x // 2]
        # Cost to make all equal to median
        costs[i] = sum(abs(v - median) for v in window)

    # DP: dp[j] = min cost to select j groups so far, with last ended at ≤ idx
    dp = [ [float('inf')] * (k + 1) for _ in range(n + 1) ]
    dp[0][0] = 0  # 0 cost, no subarrays taken yet

    for i in range(n + 1):
        for cnt in range(k + 1):
            if dp[i][cnt] < float('inf'):
                # Option 1: skip to next index (no new subarray)
                if i + 1 <= n:
                    dp[i+1][cnt] = min(dp[i+1][cnt], dp[i][cnt])
                # Option 2: take a window starting at i (if room and need more)
                if cnt + 1 <= k and i + x <= n:
                    dp[i + x][cnt + 1] = min(dp[i + x][cnt + 1], dp[i][cnt] + costs[i])

    return dp[n][k] if dp[n][k] < float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × x + n × k)  
  - O(n × x): For each sliding window, sorting a window of length x (could optimize to O(n × log x) or use a sliding median)
  - O(n × k): DP transitions.
- **Space Complexity:** O(n × k): DP table with n + 1 rows and k + 1 columns; plus cost array of O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you further optimize space usage if k is large but x is small?  
  *Hint: Use rolling DP with just two layers (current and previous)*

- If sliding window x is very large compared to n, can we optimize the median computation?  
  *Hint: Use a double-ended queue or sliding median approach*

- If you need to return the actual indices of the subarrays picked, how would you reconstruct the answer?  
  *Hint: Add a traceback parent array in DP for reconstruction*

### Summary
This problem is a classic **sliding window with DP** pattern, related to "pick k non-overlapping intervals with minimum cost" tasks.  
The key is reducing each window to a cost (via sliding median), then DP for interval selection with non-overlapping constraint.  
This technique appears in median-cost window transforms, sliding window optimizations, and interval scheduling DP.


### Flashcard
Use median to minimize cost per subarray, then apply DP or greedy selection to pick k non-overlapping subarrays with minimum total cost.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Find Median from Data Stream(find-median-from-data-stream) (Hard)
- Minimum Moves to Equal Array Elements II(minimum-moves-to-equal-array-elements-ii) (Medium)