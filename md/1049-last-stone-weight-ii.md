### Leetcode 1049 (Medium): Last Stone Weight II [Practice](https://leetcode.com/problems/last-stone-weight-ii)

### Description  
Given a list of stones with positive integer weights, you repeatedly select any two stones and "smash" them. If their weights are equal, both are destroyed. If they are different, the heavier one becomes the difference of their weights, while the lighter is destroyed. This continues until zero or one stone remains. Return the smallest possible final weight (if no stones remain, return 0). In other words: Given a list, combine the stones optimally so the leftover stone is as light as possible.

### Examples  

**Example 1:**  
Input: `stones = [2,7,4,1,8,1]`  
Output: `1`  
*Explanation: You can split stones into [2, 4, 1, 1] and [7, 8] (sum: 8 vs 15). Smash the subset sums against each other (in effect: 15 - 8 = 7, then 7 - 7 = 0, then remaining stones 2,1,1,0 can be reduced to 0 or 1 as the minimal possible leftover. With the best order, the smallest final stone is 1.)*

**Example 2:**  
Input: `stones = [31,26,33,21,40]`  
Output: `5`  
*Explanation: Partition can be [40, 21] (sum=61) and [33, 31, 26] (sum=90), difference is |90-61|=29, but better is [40, 26, 21] (sum=87) and [33, 31] (sum=64), difference is 23, and the best possible difference by optimized smashing is 5.*

**Example 3:**  
Input: `stones = [1,2]`  
Output: `1`  
*Explanation: Smash 2 and 1. Result is 1. That's the only option.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try every possible order of smashing, but that's exponential in time and infeasible for n up to 30.
- Core insight: This is equivalent to partitioning the list into two groups whose sums are as close as possible, minimizing |sum₁ - sum₂|. After smashing, the minimal leftover is the absolute difference of the two subsets.
- So, consider all ways to split stones into two groups. That’s the classic subset sum/Partition Problem.
- DP approach:
  - Let total_sum = sum(stones). We want a subset of weights that sums as close as possible to total_sum // 2.
  - Use DP to find all achievable subset sums up to total_sum // 2.
  - Let S be such a sum. The other group then has total_sum - S. The minimum possible final weight is min(total_sum - 2 * S), for all S achievable.
- Tradeoff: This runs in O(n × total_sum). It’s acceptable since n ≤ 30 and total_sum ≤ 3000.

### Corner cases to consider  
- Only one stone: should return its own weight.
- All stones have equal weights.
- Large weights but small length (e.g. [100,100]).
- All ones or all small numbers.
- Empty array is not allowed by constraints.

### Solution

```python
def lastStoneWeightII(stones):
    total = sum(stones)
    max_target = total // 2
    # dp[i] is True if sum i can be formed from some subset
    dp = [False] * (max_target + 1)
    dp[0] = True

    for stone in stones:
        # Go backwards to avoid reusing stones in this round
        for i in range(max_target, stone - 1, -1):
            dp[i] = dp[i] or dp[i - stone]

    # Find the largest i ≤ total//2 where dp[i] is True
    for i in range(max_target, -1, -1):
        if dp[i]:
            # total - 2*i is the minimum possible leftover
            return total - 2 * i
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × S), where n is the number of stones, S is the total weight. Each stone updates a DP array of size up to S//2.
- **Space Complexity:** O(S), storing the DP array for all possible subset sums up to total_sum // 2.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the weights can be negative?
  *Hint: How does the subset sum transform if values can go negative? Adjust DP size/range accordingly.*

- Can you return not just the minimal leftover, but the subset groupings?
  *Hint: Standard DP backtracking to reconstruct the subset.*

- If the list is very large but the weights are very small, how can you optimize space?
  *Hint: Use a set or bitset-based DP to save space.*

### Summary
This is a classic case of the **Subset Sum / Partition DP** pattern. The key is to reframe the "smash the stones" operation as trying to split the stones into two groups with as equal total weight as possible. The subset sum pattern and 0/1-knapsack DP are widely applicable for problems where you want to divide items or reach a value with some selection of elements, e.g. partition arrays, achieve a sum with coins, or schedule subsets for resource optimization.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Partition Array Into Two Arrays to Minimize Sum Difference(partition-array-into-two-arrays-to-minimize-sum-difference) (Hard)