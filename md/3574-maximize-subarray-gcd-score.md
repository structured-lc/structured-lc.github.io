### Leetcode 3574 (Hard): Maximize Subarray GCD Score [Practice](https://leetcode.com/problems/maximize-subarray-gcd-score)

### Description  
Given an array `nums` of length n and an integer k, you may choose at most k indices (distinct) and double the value of the element at those positions (each only once). After performing these doubles, choose any contiguous subarray. The **score** of any subarray is defined as:  
  **score = length × GCD of all elements in subarray**  
Return the **maximum possible score** among all subarrays after applying at most k doubles.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 4], k = 1`  
Output: `6`  
*Explanation: Double 2 to become 4: [4, 3, 4]. The best subarray is [4], score = 1×4 = 4, or [4,3] has GCD 1, score 2×1=2, but [4,4] (after doubling 3 to 6) can't get better. The answer is 6 by doubling 3 to 6 and picking , i.e., score = 1×6. (Depending on the allowed targets for doubling.)*

**Example 2:**  
Input: `nums = [6, 12, 8], k = 2`  
Output: `16`  
*Explanation: Double 6 and 8 to become 12 and 16: [12, 12, 16]. The maximum GCD over any subarray is 4 (GCD of [12,12,16]), length is 3, so score = 3×4 = 12. But if we double 12 and 8: [6,24,16], and take [24,16], GCD is 8, length 2: score = 16.*

**Example 3:**  
Input: `nums = [1, 2, 3], k = 0`  
Output: `2`  
*Explanation: No operations allowed. Maximum GCD in any subarray is 1 or 2 (from [2]), and the max score is 2 ([2], length 1×2=2).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all ways to choose at most k positions to double, for each modified array find the maximum score by checking all subarrays.
  - This would be extremely slow: n is up to 500, so 2⁵⁰⁰ is not feasible.
- **Observation:**  
  - Doubling an element can only help if it leads to a higher GCD in some subarray, ideally making several numbers divisible by a larger value.
  - The score is maximized by balancing length and GCD: longer subarrays with higher GCDs yield higher scores.
- **Optimization:**  
  - For each possible GCD candidate (any power-of-two multiple of a number, since doubling at most k times), check if it's possible to get a subarray of length l with all elements (after up to k doubles) having GCD at least d.
  - For each d in unique factors/values derived from nums and their doubles, use a sliding window to check maximal contiguous length with at most k elements needing to be doubled to become divisible by d.
  - For efficiency:  
    - Enumerate all divisors that could become the GCD by doubling at most k elements.  
    - For each, use a sliding window to get max length where you need ≤ k doubles.
  - Trade-off: checking all divisors up to max element × 2 is still heavy but feasible for n ≤ 500.

### Corner cases to consider  
- Empty array (not allowed per constraints, but check n = 1).
- All elements are the same.
- All elements are coprime.
- k = 0 (no operations allowed).
- k ≥ n (all can be doubled).
- Large numbers or maximum constraints (testing for performance).
- Subarrays where elements already divisible by some d.

### Solution

```python
from math import gcd
from collections import defaultdict

def maximizeSubarrayGCDScore(nums, k):
    n = len(nums)
    res = 0

    # Collect all potential GCDs: any divisor of nums[i] or 2*nums[i]
    divisors = set()
    for num in nums:
        # get all divisors for num and 2*num
        for val in [num, num*2]:
            d = 1
            while d * d <= val:
                if val % d == 0:
                    divisors.add(d)
                    divisors.add(val // d)
                d += 1

    for d in divisors:
        l = 0
        cnt = 0  # count of elements in window NOT divisible by d but whose double is
        r = 0
        while r < n:
            # is nums[r] divisible by d, or could be if doubled?
            if nums[r] % d == 0:
                pass
            elif (nums[r]*2) % d == 0:
                cnt += 1
            else:
                # can't make it divisible by d even after doubling
                l = r + 1
                cnt = 0
            # shrink if too many doubles required
            while cnt > k:
                if (nums[l]*2) % d == 0 and nums[l] % d != 0:
                    cnt -= 1
                l += 1
            # update result: window [l, r]
            if l <= r:
                res = max(res, (r - l + 1) * d)
            r += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each nums[i] and 2×nums[i], extracting all divisors: per number up to O(√(nums[i])). With n=500, total up to 500 × O(√max\_num).
  - For each divisor d (≤ about 2×max(nums)), sliding window is O(n).  
  - Total is O(n × D) where D is the number of divisors considered, usually not more than 5\*10⁴ for constraints.
  - Acceptable for n ≤ 500.
- **Space Complexity:**  
  - O(D) for the set of divisors.  
  - O(1) extra array usage otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- If k is very large (say k ≥ n), can you optimize further?
  *Hint: With unlimited operations, we can double every element and choose any subarray—what's the max GCD?*

- What if instead of doubling, you could increase/decrease elements by 1 up to k times total?
  *Hint: How would the set of divisors differ?*

- How would your approach change if the score was (length + GCD) instead of (length × GCD)?
  *Hint: Consider how maximizing either component affects the new function.*

### Summary
This problem is a **GCD + sliding window + divisor enumeration** challenge with greedy optimization. The pattern—fixed window, sweeping subarrays for a target divisor, and counting minimal "edits" (doubled elements)—appears in problems like subarrays with limited modifications or special divisibility. It's a strong generalization of classic sliding window and GCD problems, learning to enumerate all potential GCDs rather than brute force every subset.


### Flashcard
Use DP or greedy with bitmask to track which k positions are doubled; for each configuration, compute the maximum GCD score over all subarrays; balance subarray length and GCD value.

### Tags
Array(#array), Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
