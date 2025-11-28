### Leetcode 3605 (Hard): Minimum Stability Factor of Array [Practice](https://leetcode.com/problems/minimum-stability-factor-of-array)

### Description  
Given an integer array and an integer maxC, a subarray is called **stable** if the highest common factor (HCF) of all elements in the subarray is greater than or equal to two. You are allowed to modify at most maxC elements to any integer. The *stability factor* is defined as the length of the longest stable subarray. Your task is to return the **minimum possible stability factor after at most maxC changes**.

### Examples  

**Example 1:**  
Input: `nums = [5,10,15], maxC = 1`  
Output: `3`  
*Explanation: You can change 5 to 10. Now, nums = [10,10,15]. The whole array has HCF ≥ 2, so maximal stable subarray length = 3.*

**Example 2:**  
Input: `nums = [1,7,11], maxC = 1`  
Output: `2`  
*Explanation: You can change one element (say, 1→7) to get [7,7,11]. Now, the largest subarray with HCF ≥ 2 is still length 2.*

**Example 3:**  
Input: `nums = [2,3,5,7], maxC = 2`  
Output: `4`  
*Explanation: With two changes, you can make all elements 2. Now, the longest stable subarray can be of length 4.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to consider all possible subarrays and check the HCF, but that is too slow.
- Since you can change at most maxC elements, for each possible HCF factor d (≥2), try to minimize the number of changes required to make a subarray (or entire array) with all elements divisible by d.
- For each d, count for each position if nums[i] is divisible by d, and slide a window, keeping count of positions needing a change; if that is ≤ maxC, then that d is possible.
- Try all relevant values of d up to max(nums), as that bounds all possible HCF values.
- The minimum stability factor possible is the largest length for any subarray where HCF ≥ 2 with at most maxC changes.
- Final approach: For every d≥2, try to make the window as long as possible with at most maxC changes (where element should be changed to something divisible by d), and pick the largest such window.

### Corner cases to consider  
- All elements are coprime: may need to change nearly every element
- All elements already divisible by some d≥2
- maxC = 0 (no elements can be changed)
- maxC ≥ n (can potentially make the entire array stable)
- Arrays with small n (just 1 or 2 elements)

### Solution

```python
from math import gcd, isqrt
from collections import defaultdict

def minStabilityFactor(nums, maxC):
    n = len(nums)
    res = n
    freq = defaultdict(int)
    for num in nums:
        for d in range(2, isqrt(num) + 1):
            if num % d == 0:
                freq[d] += 1
                if d != num // d and num // d >= 2:
                    freq[num // d] += 1
        if num >= 2:
            freq[num] += 1
    # Try all possible candidate divisors
    for d in freq:
        cnt = 0
        for num in nums:
            if num % d != 0:
                cnt += 1
        if cnt <= maxC:
            res = min(res, n)
    # If not possible to make whole array stable
    # Try all windows for best length
    for d in range(2, max(nums) + 1):
        left = 0
        cnt_change = 0
        for right in range(n):
            if nums[right] % d != 0:
                cnt_change += 1
            while cnt_change > maxC:
                if nums[left] % d != 0:
                    cnt_change -= 1
                left += 1
            res = min(res, n - (right - left + 1))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × sqrt(max(nums))) for divisor finding + O(n × max(nums)) for the window sliding — acceptable for small max(nums), but may need optimizations for large constraints.
- **Space Complexity:** O(N + D) for the frequency map and sliding window variables, where D is number of divisor candidates (≤max(nums)).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for very large values in nums?  
  *Hint: Precompute only frequent divisors or use a sieve approach.*

- How do you handle arrays with elements up to 10⁹?  
  *Hint: Use random sampling or only factor a small set of elements for candidates.*

- What if instead of changing elements, you can only remove them?  
  *Hint: Window sliding and count removals, not modifications.*

### Summary
This problem uses a sliding window and frequency counting pattern, combined with enumeration of possible stable divisors. This approach is related to patterns for GCD-interval or divisor-segment questions, and can be generalized to problems seeking subarrays whose elements meet certain divisibility or GCD constraints after limited modifications.


### Flashcard
For each possible divisor d ≥ 2, use a sliding window to find the minimum number of elements needing change to make a subarray divisible by d; track the divisor requiring ≤ maxC changes with maximum subarray length.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Greedy(#greedy), Segment Tree(#segment-tree), Number Theory(#number-theory)

### Similar Problems
