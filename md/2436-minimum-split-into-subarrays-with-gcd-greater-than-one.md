### Leetcode 2436 (Medium): Minimum Split Into Subarrays With GCD Greater Than One [Practice](https://leetcode.com/problems/minimum-split-into-subarrays-with-gcd-greater-than-one)

### Description  
Given a list of positive integers `nums`, split the array into one or more contiguous subarrays so that every element belongs to exactly one subarray, and the **GCD (Greatest Common Divisor)** of every subarray is **strictly greater than 1**.  
Return the **minimum number** of such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [12,6,3,14,8]`  
Output: `2`  
*Explanation: One optimal split is [12,6,3] and [14,8].  
- GCD(12,6,3) = 3 > 1.  
- GCD(14,8) = 2 > 1.  
Any single subarray split (the whole array) would have GCD = 1, so 2 splits is minimal.*

**Example 2:**  
Input: `nums = [4,12,6,14]`  
Output: `1`  
*Explanation: The whole array has GCD(4,12,6,14) = 2 > 1, so no split is needed.*

**Example 3:**  
Input: `nums = [5,7,9,10]`  
Output: `2`  
*Explanation: Split as [5,7,9] (GCD=1), but that is not allowed. Instead, best is [5,7] (GCD=1 → invalid), so we must do [5], [7,9,10]: [7,9,10] GCD=1 as well, so we may need to split as [5,7], [9,10] (both GCD=1 invalid). Actually, it's not possible to create subarrays of more than 1, but every number alone is ≥2? No, some numbers are prime, so must split at points where GCD drops to 1. This may be a bad example—let's use a better one:  
Input: `nums = [6,8,12,5,10]`  
Output: `2`  
*Explanation: [6,8,12] (GCD=2), [5,10] (GCD=5), so 2 subarrays suffice.*

### Thought Process (as if you’re the interviewee)  
First, let's look at how we can split the array so that the GCD of each contiguous piece is greater than 1.  
- If you take the whole array's GCD and it's >1, you only need 1 subarray.
- As soon as the running GCD drops to 1, you **must** split there, because any further extension cannot recover GCD > 1.
- So, **greedily**, we keep extending the current subarray, updating its GCD. If at any index GCD becomes 1, we must start a new subarray from there.
- This is efficient since a drop to GCD=1 is irreversible.
- Initialize a counter to 1 (at least one subarray). Traverse the array, updating current_gcd. If current_gcd ever becomes 1, increase the counter and reset current_gcd to current element.

**Brute-Force:**  
Try all possible split points — O(2ⁿ) not feasible for n=2000.

**Optimized Greedy Approach:**  
One linear scan, O(n), which is optimal for this problem.

### Corner cases to consider  
- Input array of length 1.
- All elements are the same (e.g., [2,2,2]).
- All elements prime and different.
- GCD never drops to 1 for whole array.
- GCD drops to 1 at every single pair.
- All even numbers.

### Solution

```python
def minimumSplits(nums):
    from math import gcd

    n = len(nums)
    count = 1  # At least one subarray required
    current_gcd = nums[0]

    for i in range(1, n):
        current_gcd = gcd(current_gcd, nums[i])
        # If GCD becomes 1, need to start a new subarray
        if current_gcd == 1:
            count += 1
            current_gcd = nums[i]
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We scan the array once, updating GCD at each step.
- **Space Complexity:** O(1). Only a few integer variables for storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could contain 1 as an element?  
    *Hint: A GCD including 1 will always become 1 immediately, forcing splits.*

- Can you output the actual subarrays of a minimal split, not just the count?  
    *Hint: Track and store split indices as you scan.*

- What if subarrays could be non-contiguous?  
    *Hint: Problem becomes much more complex, as GCDs can be computed on arbitrary subsets.*

### Summary
We used a **greedy GCD scan** pattern: continuously extend a subarray while its GCD >1; when it hits 1, split and start over. This is a classic greedy + math problem, similar to "Split Array" problems, and is useful anywhere the property of GCD (irreversible loss when 1 is reached) applies, such as in minimal sectioning of number sequences by divisibility.