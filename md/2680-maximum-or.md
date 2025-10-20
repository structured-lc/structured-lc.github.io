### Leetcode 2680 (Medium): Maximum OR [Practice](https://leetcode.com/problems/maximum-or)

### Description  
Given a 0-indexed array of integers **nums** and an integer **k**, you may perform the following operation at most **k** times: select any element in **nums** and multiply it by 2 (i.e., perform a left-shift by 1 bit). After up to **k** such operations (all on the same or different elements), return the maximum value possible for the bitwise OR (`|`) of the whole array.  
Formally: Maximize: nums | nums[1] | ... | nums[n-1]  
by applying ≤ k multiply-by-2 operations.

### Examples  

**Example 1:**  
Input: `nums = [12,9]`, `k = 1`  
Output: `30`  
*Explanation: Apply ×2 to `nums[1]` (9 → 18). OR of 12 and 18: 12 | 18 = 30.*

**Example 2:**  
Input: `nums = [8,1,2]`, `k = 2`  
Output: `35`  
*Explanation: Apply ×2 \* 2 to `nums` (8 → 32). OR of 32, 1, 2: 32 | 1 | 2 = 35.*

**Example 3:**  
Input: `nums = [1,2,4,8,16]`, `k = 3`  
Output: `31`  
*Explanation: Apply ×2 \* 3 to `nums` (1 → 8), get [8,2,4,8,16]. 8 | 2 | 4 | 8 | 16 = 31.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**  
   - Try all possible ways to assign k doublings to any element(s), then compute the OR for each possibility.  
   - But nums.length can be up to 10⁵ and k up to 15. So brute-force is not feasible.

2. **Observations:**  
   - Multiplying by 2 shifts the number left, strengthening high bits.  
   - It's never better to split doublings between elements unless their high bits don’t overlap.

3. **Optimized Greedy Approach:**  
   - For each index, imagine using all k doublings on just that element.
   - Precompute prefix and suffix ORs, so for index i, we compute:  
     prefix_OR (left of i) | (nums[i] << k) | suffix_OR (right of i)
   - Try this for every i, take max.
   - Rationale: Using all k on one element quickly lifts its significant bits, and the OR of others cannot exceed this.

4. **Trade-offs:**  
   - Ignores splitting doublings, but doubling all on one at each position (and taking the max) is sufficient because OR is monotonic with respect to bit positions.

### Corner cases to consider  
- nums with only one element: e.g., [5], k = 2
- nums contains zeros: [0,0,...], various k
- All elements identical: [a,a,a], k > 0
- k = 0 (no operations allowed): check answer is just OR of input
- Large k (bigger than needed to set all significant bits), e.g., k > 30

### Solution

```python
def maximumOr(nums, k):
    n = len(nums)
    # Precompute suffix ORs: suffix[i] = OR of nums[i:] (i to end)
    suffix = [0] * (n + 1)
    for i in range(n-1, -1, -1):
        suffix[i] = suffix[i+1] | nums[i]
    prefix = 0
    result = 0
    for i in range(n):
        # OR of prefix (left of i), nums[i] shifted left k, suffix (right of i)
        shifted = nums[i] << k
        total_or = prefix | shifted | suffix[i+1]
        result = max(result, total_or)
        prefix |= nums[i]  # accumulate left prefix for next i
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Precomputing the suffix ORs takes O(n), and the main iteration is also O(n).
- **Space Complexity:** O(n)  
  One suffix array of size n+1. Prefix variable is O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must split the k doublings across multiple numbers (not all on one number)?
  *Hint: Think about how to distribute doublings and try all combinations, maybe DP on bitmask and count.*

- How would you handle negative numbers (if allowed) or multiplication by another integer?
  *Hint: Bitwise behavior with negative numbers or arbitrary scaling is different.*

- Can you solve this with reduced extra space (in-place, or O(1))?
  *Hint: Can you use the input array and rolling variables for suffix/prefix ORs?*

### Summary
This approach uses the **prefix-suffix pattern** for array problems: efficiently maintaining cumulative state from left and right. Greedy "all-or-nothing on one index" is optimal here due to OR monotonicity and k being small. This pattern is commonly used in problems involving range-based operations and cumulative statistics (e.g., product or sum excluding the ith element).


### Flashcard
Sort array, then for each index i, compute prefix OR of elements before i and suffix OR after i; try giving all k doublings to nums[i], calculate resulting OR as prefixOR | (nums[i] × 2ᵏ) | suffixOR, track maximum.

### Tags
Array(#array), Greedy(#greedy), Bit Manipulation(#bit-manipulation), Prefix Sum(#prefix-sum)

### Similar Problems
