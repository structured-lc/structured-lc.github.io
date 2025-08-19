### Leetcode 1799 (Hard): Maximize Score After N Operations [Practice](https://leetcode.com/problems/maximize-score-after-n-operations)

### Description  
Given an array of 2×n positive integers, you must perform n operations. In each operation (the iᵗʰ, starting from 1), pick any two elements not yet taken, remove them from the array, and gain a score of i × gcd(x, y) for the pair chosen. The goal is to maximize the total score after all pairs are made.  
The challenge is optimizing which pairs to pick and in which operation to do so, given that the number of options grows very fast as n increases.

### Examples  

**Example 1:**  
Input: `nums = [1,2]`  
Output: `1`  
*Explanation: Pick both (the only pair). 1 × gcd(1,2) = 1.*

**Example 2:**  
Input: `nums = [3,4,6,8]`  
Output: `11`  
*Explanation:  
First, pair (3,6): 1 × gcd(3,6) = 3  
Then, pair (4,8): 2 × gcd(4,8) = 8  
Total = 3 + 8 = 11.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,6]`  
Output: `14`  
*Explanation:  
Operation 1: (1,5) → 1 × gcd(1,5) = 1  
Operation 2: (2,4) → 2 × gcd(2,4) = 4  
Operation 3: (3,6) → 3 × gcd(3,6) = 9  
Total = 1 + 4 + 9 = 14.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible ordering and pairing, which is infeasible for n > 3. The total number of pairings is huge (see: combinations and permutations with increasing n).
- **Observation:** The outcome depends on both which pairs you pick and the order in which you pick them, because later operations earn higher multipliers (operation index).
- **Optimization:**  
  - Use **bitmasking** to represent which numbers have been taken.
  - Use **DP + memoization**. DP state: (bitmask of taken elements, current operation count).
  - For each DP state, try all possible pairs (i, j) where neither i nor j is yet taken, and recurse after virtually taking them, updating the mask and increasing the op count.
  - Use a memo dictionary to cache results and avoid redundant work.
  - Use gcd for score calculation.
- **Trade-offs:**  
  - This approach handles up to n=7 (14 numbers), but is too slow for much larger n.
  - Bitmask allows us to efficiently enumerate subsets and avoid recomputation.

### Corner cases to consider  
- All elements are equal (gcd will be itself).
- Array with relatively prime numbers (gcd always 1).
- Maximum limit n = 7 (14 elements).
- nums contains minimum and maximum possible integers.
- Pairings that may look suboptimal early, but yield better options for higher multipliers later.

### Solution

```python
def maxScore(nums):
    from math import gcd
    from functools import lru_cache

    n = len(nums) // 2

    @lru_cache(None)
    def dp(mask):
        cnt = bin(mask).count('1') // 2  # How many pairs already picked
        if cnt == n:
            return 0

        max_val = 0
        # Try all unordered pairs of available elements
        for i in range(len(nums)):
            if not (mask & (1 << i)):
                for j in range(i + 1, len(nums)):
                    if not (mask & (1 << j)):
                        new_mask = mask | (1 << i) | (1 << j)
                        score = (cnt + 1) * gcd(nums[i], nums[j])
                        max_val = max(max_val, score + dp(new_mask))
        return max_val

    return dp(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³ × 2ⁿ), where n is the number of pairs (so input length is 2n).  
  Explanation: For each state (there are 2^(2n) ≈ 16,384 states for n=7), we can try up to O(n²) pairs per state.
- **Space Complexity:** O(2ⁿ), since we memoize each mask.

### Potential follow-up questions (as if you’re the interviewer)  

- If n were larger (say, n=15), how would you scale the approach?  
  *Hint: Consider greedy pairing, or heuristic/approximate methods.*

- Can you return the actual pairs that yield the maximum score, not just the value?  
  *Hint: Augment DP state to track parent choice.*

- Is it always optimal to maximize gcd in earlier rounds?  
  *Hint: Try constructing a counter-example when this is false!*

### Summary
This problem is all about **bitmask DP** and optimal pairing. It's a classic pattern for "pair n elements to maximize a score" problems, especially where decisions have long-term effects and combinatorial explosion must be avoided. This pattern is also found in assignment-type and scheduling problems with dependency or state, like the Minimum Cost to Connect Two Groups, Travelling Salesman Problem, and Matching Problems. Understanding how to encode states and recurse with memoization is central to mastering such hard combinatorial DP challenges.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Number Theory(#number-theory), Bitmask(#bitmask)

### Similar Problems
