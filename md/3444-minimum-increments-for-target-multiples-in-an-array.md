### Leetcode 3444 (Hard): Minimum Increments for Target Multiples in an Array [Practice](https://leetcode.com/problems/minimum-increments-for-target-multiples-in-an-array)

### Description  
You are given two arrays: **nums** and **target**.  
In one operation, you can increment any element of nums by 1.

Your goal: **For every target value, at least one element in nums must become a multiple of that target** (not necessarily all nums for all targets). What is the minimum number of increment operations needed to achieve this?

---

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`, `target = [4]`  
Output: `1`  
*Explanation: Increment 3 → 4 (1 operation), so 4 is a multiple of 4.*

**Example 2:**  
Input: `nums = [8,4]`, `target = [10,5]`  
Output: `2`  
*Explanation: Increment 8→10 (2 operations; 4 remains unchanged). 10 is a multiple of both 10 and 5.*

**Example 3:**  
Input: `nums = [7,9,10]`, `target = `  
Output: `0`  
*Explanation: 7 is already a multiple of 7 in nums. No changes needed.*

---

### Thought Process (as if you’re the interviewee)  

- **Naive approach**:  
  For each target number, check every num in nums, and calculate how much you need to increment each num to reach the next multiple of target. Take the minimum needed for each target, sum across all targets.
  This would work for one target.  
  **Problem:** When there are multiple targets (max: 4), a single nums element can count for several targets if its value is a multiple of multiple targets after incrementing. We want to wisely choose which nums element to increment for which combination of targets to minimize total work.

- **Optimization using Subsets:**  
  Since target.length ≤ 4, all subsets of targets are at most 2⁴ = 16. For each subset (combination of targets), represent it as a bitmask. For each nums[j], and each subset S of targets, calculate cost to increment nums[j] so that, after increment, it will be a multiple of ALL tₖ (k∈S).  
  - The minimal value to do this is: For a given S, find lcm(t₁, t₂, …).
  - For each S, find for every nums[j] how many ops to increment nums[j] to at least lcm(S) and be a multiple (could mean incrementing to a larger value).
  - Use DP: dp[mask] = minimal total cost for covering mask of targets.
  - For mask (of uncovered targets), try taking each submask and combine.

- **Why is this feasible?**
  - target.length is ≤ 4, so all subsets are up to 16. This makes DP fast enough. The main trick is for each nums[j], precompute costs for all masks (subsets of targets), then use DP over masks.

- **Trade-offs:**  
  Precompute step is a little complex, but DP is efficient due to small number of targets.

---

### Corner cases to consider  
- target contains 1 (every number is a multiple, always 0 ops)
- nums contains values already multiples of all targets (0 ops)
- nums is smaller or equal in size to targets
- All nums much smaller than all target (some need a lot of increments)
- target has common divisors (e.g., [2,4])
- nums and/or targets at minimum or maximum value (1 or 10,000)

---

### Solution

```python
from math import gcd
from typing import List

def lcm(a, b):
    return a * b // gcd(a, b)

def minimumIncrements(nums: List[int], target: List[int]) -> int:
    n = len(nums)
    t = len(target)
    
    # Precompute lcm for all subsets of targets, use as mask
    lcms = [1] * (1 << t)
    for mask in range(1, 1 << t):
        l = 1
        for i in range(t):
            if (mask >> i) & 1:
                l = lcm(l, target[i])
        lcms[mask] = l

    # For each nums[j], for each mask, find min increments needed to reach a multiple of lcms[mask] that's ≥ nums[j]
    # cost[j][mask] = min increments
    INF = 10 ** 9
    cost = [[INF] * (1 << t) for _ in range(n)]
    for j in range(n):
        for mask in range(1, 1 << t):
            l = lcms[mask]
            # next multiple of l ≥ nums[j]
            mul = ((nums[j] + l - 1) // l) * l
            cost[j][mask] = mul - nums[j]
    # DP: dp[mask] = min total cost covering "mask" of targets
    DP = [INF] * (1 << t)
    DP[0] = 0
    for mask in range(1 << t):
        for j in range(n):
            sub = ((1 << t) - 1) ^ mask   # uncovered targets
            s = sub
            while s:
                # Try using nums[j] to cover these new targets
                DP[mask | s] = min(DP[mask | s], DP[mask] + cost[j][s])
                s = (s - 1) & sub
    return DP[(1 << t) - 1]
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ᵗ × (t × n)), t = target.length (≤4), n = nums.length.  
  - Precompute LCMs for all target subsets: O(2ᵗ × t)
  - Compute costs: O(n × 2ᵗ)
  - DP update over all masks and all nums: O(2ᵗ × n × 2ᵗ)  
  - Since t ≤ 4, constants are small.

- **Space Complexity:** O(n × 2ᵗ) for cost storage, O(2ᵗ) for dp.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What would you change if the number of targets could be large (like 100)?
  *Hint: Mask/DP would be infeasible; need alternate greedy/approximate or different structure.*

- Suppose we can also *decrement* nums. Would your solution need to change?
  *Hint: For each nums[j], check distance to nearest multiple both up and down.*

- Can you optimize further if all targets are pairwise coprime?
  *Hint: LCM accelerates; no overlaps in multiples, more independent options.*

---

### Summary

This problem is a variant of bitmask DP, using "covering" all targets with minimal cost by incrementing nums elements so at least one becomes a multiple of each target.  
The bitmask DP pattern is very useful in cases where subsets are small (≤20) and coverage/combinatorial selection is required.  
It's commonly applied in problems involving small sets, subset covering, or combinatorial selection with efficiency needs.  
The approach efficiently exploits the small size of target and the mathematical property of LCM for subset handling.


### Flashcard
For each target, find the minimum increment needed across all nums; when multiple targets exist, use DP to assign each num optimally to maximize coverage.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Number Theory(#number-theory), Bitmask(#bitmask)

### Similar Problems
