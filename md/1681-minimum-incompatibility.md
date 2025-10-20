### Leetcode 1681 (Hard): Minimum Incompatibility [Practice](https://leetcode.com/problems/minimum-incompatibility)

### Description  
Given an integer array nums and an integer k, partition the array into k subsets of equal size (size = n // k), where each subset contains unique elements. The incompatibility of a subset is the difference between its maximum and minimum elements. Return the minimum possible sum of incompatibilities across all k subsets, or -1 if such a partition is impossible.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,4], k = 2`  
Output: `4`  
*Explanation: Partition as [1,2], [1,4]: only possible way with unique elements in each. First subset: 2-1=1, second: 4-1=3, total = 4.*

**Example 2:**  
Input: `nums = [6,3,8,1,3,1,2,2], k = 4`  
Output: `6`  
*Explanation: Partition [1,2], [1,3], [2,6], [3,8], each subset contains unique elements. Their incompatibilities: (2-1=1, 3-1=2, 6-2=4, 8-3=5), but the min total is actually 6.*

**Example 3:**  
Input: `nums = [5,3,3,6,3,3], k = 3`  
Output: `-1`  
*Explanation: Subsets must be size 2. Impossible to partition without duplicates in a subset.*


### Thought Process (as if you’re the interviewee)  
- For valid partitions, each subset must have unique elements; if any number occurs more than k times, it's impossible.
- Try all ways to split nums into k equal-sized subsets, each unique.
- For each valid subset, calculate incompatibility (max - min).
- Too slow for all permutations. Use DP with bitmasking: represent chosen elements as a mask, memoize minimal incompatibility sum for remainder.
- Generate all possible unique subsets of the right size (precompute possible choices, store in a list or as bitmasks).
- Recursively select unused valid subsets, sum up incompatibilities, minimize total.


### Corner cases to consider  
- nums contains elements occurring more than k times => impossible (return -1).
- nums length not divisible by k (cannot partition evenly).
- All nums are the same.
- Minimum size case: n = k, each element is its own subset (incompatibility 0).


### Solution

```python
from collections import Counter

def minimumIncompatibility(nums: list[int], k: int) -> int:
    from functools import lru_cache
    n = len(nums)
    size = n // k
    # Every number cannot appear more than k times
    if any(v > k for v in Counter(nums).values()):
        return -1

    # Precompute all valid subsets as bitmasks
    nums_sorted = sorted(nums)
    idx_to_num = {i: num for i, num in enumerate(nums)}
    valid = []
    for mask in range(1 << n):
        if bin(mask).count('1') == size:
            seen = set()
            vals = []
            for i in range(n):
                if (mask >> i) & 1:
                    if nums[i] in seen:
                        break
                    seen.add(nums[i])
                    vals.append(nums[i])
            else:
                valid.append((mask, max(vals) - min(vals)))

    @lru_cache(maxsize=None)
    def dp(used):
        if used == (1 << n) - 1:
            return 0
        ans = float('inf')
        for mask, cost in valid:
            if mask & used == 0:
                res = dp(used | mask)
                if res != float('inf'):
                    ans = min(ans, cost + res)
        return ans

    ans = dp(0)
    return ans if ans < float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O( C(n, n//k) \* (number of DP calls) ). For small n ~16, feasible. For bigger, needs optimization. Bitmask space: 2ⁿ.
- **Space Complexity:** O(2ⁿ) for memoization + list of valid masks.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for larger arrays?
  *Hint: Pruning and better generation for valid masks, maybe greedy approximation.*

- How would you handle input if k is very large compared to n?
  *Hint: If k == n, answer is always 0, since each in its own subset.*

- Can you compute just the existence of a solution, not the minimum?
  *Hint: Only check if max count <= k, and size divides evenly.*

### Summary
Involves combinatorial search, bitmask and DP memoization. Similar patterns are common in subset sum, minimum cost partitioning, and grouping problems where subsets must satisfy uniqueness constraints.


### Flashcard
Minimum Incompatibility

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
