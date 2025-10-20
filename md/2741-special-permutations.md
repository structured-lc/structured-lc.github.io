### Leetcode 2741 (Medium): Special Permutations [Practice](https://leetcode.com/problems/special-permutations)

### Description  
Given a 0-indexed array of n **distinct positive integers** (`nums`), a permutation of `nums` is called **special** if for every adjacent pair in the permutation (i.e., for all indices 0 ≤ i < n-1), either nums[i] % nums[i+1] = 0 **or** nums[i+1] % nums[i] = 0.  
Return the **total number** of special permutations, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `nums = [2,3,6]`  
Output: `2`  
*Explanation: Only [3,6,2] and [2,6,3] are special. For [3,6,2]: 3 divides 6, and 6 divides 2 (i.e., 6%2==0). For [2,6,3]: 2 divides 6, and 6 divides 3.*

**Example 2:**  
Input: `nums = [1,4,3]`  
Output: `2`  
*Explanation: Only [3,1,4] and [4,1,3] are special. For [3,1,4]: 3%1==0, 1 divides 4. For [4,1,3]: 4%1==0, 1 divides 3.*

**Example 3:**  
Input: `nums = [6,2,12]`  
Output: `2`  
*Explanation: [2,6,12] and [12,6,2] are special. [2,6,12]: 2 divides 6, and 6 divides 12. [12,6,2]: 12 divides 6, and 6 divides 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Generate all n! permutations of the nums array and, for each, check if every adjacent pair satisfies the divisibility condition. Count those. While correct, this is factorial in time and won't work for n up to 14.

- **Optimize:**  
  Notice this is a classic DP with bitmask problem:  
  - The state is (mask, last): which numbers are included (mask), and the last number used (`last`).  
  - Transition to state (mask | (1 << nxt), nxt) from (mask, last) if nums[nxt] and nums[last] satisfy the required divisibility.  
  - Use memoization to avoid recomputation.

- **Decision:**  
  This DP runs in O(n² × 2ⁿ), which is feasible for n ≤ 14 (since 2¹⁴ ≈ 16,000 and n² is small).  
  Space is also O(n × 2ⁿ).

  Tradeoff: We use significant space/time, but it’s the only approach that's practical under the constraints.

### Corner cases to consider  
- n = 2 (minimum, only two permutations possible)
- All numbers are coprime (no valid permutations possible)
- All numbers are multiples of each other (every permutation is valid)
- Numbers in arbitrary order
- Duplicates: Problem guarantees distinctness, so we don’t handle this
- Large numbers: Problem bounds are 1 ≤ nums[i] ≤ 10⁹, but only `n` is small

### Solution

```python
MOD = 10 ** 9 + 7

def specialPerm(nums):
    n = len(nums)
    from functools import lru_cache

    # dp(mask, last_idx): # of ways using visited bits in mask, ending at last_idx
    @lru_cache(maxsize=None)
    def dp(mask, last_idx):
        if mask == (1 << n) - 1:
            return 1
        total = 0
        for nxt in range(n):
            if not (mask & (1 << nxt)):
                # Valid, if nums[last_idx] % nums[nxt] == 0 or nums[nxt] % nums[last_idx] == 0
                if nums[last_idx] % nums[nxt] == 0 or nums[nxt] % nums[last_idx] == 0:
                    total = (total + dp(mask | (1 << nxt), nxt)) % MOD
        return total

    res = 0
    # Try each number as start
    for i in range(n):
        res = (res + dp(1 << i, i)) % MOD

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n² × 2ⁿ). There are 2ⁿ possible bitmasks and for each, up to n possible 'last' indices. For each (mask, last), we try up to n possible nexts. Since n ≤ 14, this is feasible.

- **Space Complexity:**  
  O(n × 2ⁿ) for memoization, plus recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you print all the special permutations, not just count them?  
  *Hint: Modify DP to remember and build up actual paths.*

- If nums is not distinct, how would you adapt your approach?  
  *Hint: Add logic to avoid duplicate permutations in the DP or sort & prune duplicates.*

- Could this problem be solved efficiently if n were much larger, say n=100?  
  *Hint: O(n² × 2ⁿ) is not feasible, need a fundamentally different approach; perhaps greedy/incremental or relax requirements.*

### Summary
This problem models **DP with bitmask** and permutation, similar to "Traveling Salesman", "Beautiful Arrangement", or "Permutations with Constraints".  
Key pattern: Recursion with bitmask and memoization to prune repeated work.  
This pattern is very common in classic combinatorial and constraint-oriented problems on permutations, especially when n ≤ 14–16. Understanding this approach is powerful for all constraint-satisfying permutation counting problems.


### Flashcard
Use DP with bitmask to count permutations where adjacent elements are divisible—state is (mask, last), transition by valid next.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
