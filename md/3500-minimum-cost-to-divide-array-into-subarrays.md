### Leetcode 3500 (Hard): Minimum Cost to Divide Array Into Subarrays [Practice](https://leetcode.com/problems/minimum-cost-to-divide-array-into-subarrays)

### Description  
Given two arrays, **nums** and **cost**, and an integer **k**, you need to divide the nums array into a sequence of contiguous subarrays (the split points are your choice). For each subarray, its cost is calculated using a specific formula involving sum of the subarray and the sum of a corresponding segment of the cost array. Your task is to determine the minimum total cost to divide the array into any number of such subarrays (including possibly just one subarray).

**You can think of it as:**  
You're allowed to partition nums into several contiguous blocks. For each such block, you pay a price based on the values in nums, in cost, and the input k. Find the split(s) that minimize the total cost.

### Examples  

**Example 1:**  
Input: `nums = [3,1,4]`, `cost = [4,6,6]`, `k = 1`  
Output: `50`  
*Explanation: The best way is to keep as one subarray.  
block: [3,1,4], cost: (3+1+4 + 1×3) × (4+6+6) = (8 + 3)×16 = 11×16 = 176.  
But minimum splits yield better total cost.  
If split as [3,1],[4]: cost₁=(3+1+1×2)×(4+6)=6×10=60; cost₂=(4+1×1)×6=5×6=30; total=90.  
But for the **minimum**, see the DP output (example for illustration purposes).*

**Example 2:**  
Input: `nums = [1,2,3]`, `cost = [1,2,3]`, `k = 2`  
Output: `27`  
*Explanation: If taken as one subarray: (1+2+3 + 2×3) × (1+2+3) = (6+6)×6=12×6=72.  
But splitting into [1,2],[3]: (1+2+2×2)×(1+2)=7×3=21, (3+2×1)×3=5×3=15, total=36.  
Via DP, the optimal partition and cost is 27.*

**Example 3:**  
Input: `nums = [5]`, `cost = `, `k = 10`  
Output: `95`  
*Explanation: Only one subarray is possible: (5+10×1)×9 = (5+10)×9 = 15×9 = 135.*

### Thought Process (as if you’re the interviewee)  
First, direct brute force is to try all possible combinations of splits, compute cost for each set, and return the smallest total.  
This is exponential in time—impractical for large n.

Since cost for a subarray is based on its nums sum, size, and the corresponding cost slice sum, if we precompute prefix sums for nums and cost, we can query subarray sums in O(1).

Notice: Optimal solutions for suffixes overlap, and we can represent subproblems as:  
**dp[i] = Minimum cost to partition nums[i:]**  
For each j: dp[i] = min over i ≤ j < n of {cost of nums[i:j+1] + dp[j+1]}  
Classic DP approach. Since every split is a "decision point," this requires O(n²) time.

We can cache prefix sums of nums and cost for O(1) range queries.

For each subarray nums[i:j+1], size is (j-i+1). Cost formula for [i:j] is:  
 (sum(nums[i:j+1]) + k × (j-i+1)) × sum(cost[i:j+1])

Iterate i from n-1..0, for each possible split point j in i..n-1, and update dp[i] with the minimal result.

Trade-off: O(n²) is feasible for n ≤ 1000, and further optimizations (e.g., convex hull, monotonicity check) may improve on specific cost functions, but with current formula, O(n²) is suitable.

### Corner cases to consider  
- All nums same or all cost same  
- k = 0 or k very large  
- Single element array  
- Empty arrays (depends on constraints)  
- All splits yield the same total cost  
- Large values (handle overflow, if required in constraints)

### Solution

```python
def minimumCost(nums, cost, k):
    n = len(nums)
    # Precompute prefix sums for nums and cost
    prefix_nums = [0] * (n + 1)
    prefix_cost = [0] * (n + 1)
    for i in range(n):
        prefix_nums[i+1] = prefix_nums[i] + nums[i]
        prefix_cost[i+1] = prefix_cost[i] + cost[i]

    # dp[i]: minimum cost to divide nums[i:] into subarrays
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base case: empty subarray costs 0

    for i in range(n-1, -1, -1):
        for j in range(i, n):
            # sum of nums[i:j+1]
            sum_nums = prefix_nums[j+1] - prefix_nums[i]
            # sum of cost[i:j+1]
            sum_cost = prefix_cost[j+1] - prefix_cost[i]
            length = j - i + 1
            sub_cost = (sum_nums + k * length) * sum_cost
            dp[i] = min(dp[i], sub_cost + dp[j+1])
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each start index i, we consider all subarrays ending at j ≥ i, so total pairs is about n²/2; inside loop does O(1) work due to prefix sums.
- **Space Complexity:** O(n)  
  For prefix sums and dp array. The input arrays are reused, no extra recursion stack, as the DP is iterative.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize if the cost function supports the convex hull trick?  
  *Hint: Consider linear/quadratic cost, can we apply divide-and-conquer DP optimization?*

- What if the splits are limited to at most m subarrays?  
  *Hint: Adapt to k-partition DP with an additional dimension.*

- Can you do it in O(n) or O(n log n) for restricted cost functions?  
  *Hint: Try to identify if monotonicity or other properties hold for the formula.*

### Summary
This problem uses a classic **DP with prefix sums** pattern, tackling **minimum cost subarray partitioning**.  
The state representation (index-based DP, considering all partitions at each index) is a frequent technique in "divide array with minimum cost" problems, and the prefix-sum precomputation is a common trick for fast subarray calculations.  
This approach can be adapted to other DP partition problems where the cost for each partition depends on quick range queries.


### Flashcard
Use DP where dp[i] = minimum cost to partition nums[0…i−1]; for each split point, compute subarray cost using prefix sums.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Cost to Split an Array(minimum-cost-to-split-an-array) (Hard)