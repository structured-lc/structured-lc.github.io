### Leetcode 2513 (Medium): Minimize the Maximum of Two Arrays [Practice](https://leetcode.com/problems/minimize-the-maximum-of-two-arrays)

### Description  
Given two empty arrays arr1 and arr2, we need to fill them as follows:
- arr1 must have `uniqueCnt1` distinct positive integers, none of which are divisible by `divisor1`.
- arr2 must have `uniqueCnt2` distinct positive integers, none of which are divisible by `divisor2`.
- The two arrays must not share any integers.

The goal is to minimize the maximum integer present in either arr1 or arr2 after filling both arrays under these constraints.

### Examples  

**Example 1:**  
Input: `divisor1=2, divisor2=3, uniqueCnt1=1, uniqueCnt2=1`  
Output: `2`  
*Explanation: The possible sets are {1} for arr1 and {2} for arr2, or vice versa. The maximum is 2.*

**Example 2:**  
Input: `divisor1=2, divisor2=4, uniqueCnt1=1, uniqueCnt2=2`  
Output: `4`  
*Explanation: arr1 can take {1}, arr2 can take {3,4} (since 4 is not divisible by 2). The maximum taken is 4, which is minimized.*

**Example 3:**  
Input: `divisor1=2, divisor2=3, uniqueCnt1=3, uniqueCnt2=3`  
Output: `7`  
*Explanation: Fill arr1 with 1,3,5 (not divisible by 2), arr2 with 2,4,7 (not divisible by 3, not overlapping with arr1). The maximum is 7.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea is to generate all possible positive integers, trying to construct both arrays step by step, checking each constraint at every step. This would be highly inefficient because the constraints force us to pick from non-overlapping sets with divisibility exclusions.

To optimize:
- For a given upper bound `x`, we can quickly count:
  - Numbers ≤ x not divisible by divisor1
  - Numbers ≤ x not divisible by divisor2
  - Numbers ≤ x not divisible by either divisor1 or divisor2 (to handle overlap)
- Real insight: For any given x, we can check if it is possible to select required counts for arr1 and arr2 from these sets without conflict.

This suggests using **binary search**:
- Lower bound: max(uniqueCnt1, uniqueCnt2)
- For each guess at maximum value x, check if enough eligible numbers exist to fill both arrays.
- Define eligibility for arr1: numbers not divisible by divisor1, not used by arr2. For arr2: not divisible by divisor2, not used by arr1. 
- Subtract overlap cases to avoid double-counting.

This approach is efficient and always finds the minimal maximum value.

### Corner cases to consider  
- divisor1 and divisor2 share factors or are equal (require LCM to handle overlap).
- uniqueCnt1 or uniqueCnt2 is 0 (arrays empty).
- All numbers below some threshold are eliminated by divisibility rules.
- Very large inputs (need only logical count, not actual numbers).
- Edge case: divisor1 = 1 (all natural numbers are excluded from arr1).

### Solution

```python
def minimizeSet(divisor1, divisor2, uniqueCnt1, uniqueCnt2):
    def count_not_divisible(x, d):
        # Numbers from 1 to x not divisible by d
        return x - x // d

    def count_not_divisible_either(x, d1, d2):
        # Inclusion-exclusion: not divisible by d1 or d2
        from math import lcm
        return x - (x // d1) - (x // d2) + (x // lcm(d1, d2))

    from math import lcm

    left = 1
    right = 2 * (uniqueCnt1 + uniqueCnt2) * max(divisor1, divisor2)
    result = right

    while left <= right:
        mid = (left + right) // 2
        # eligible for arr1: not divisible by divisor1
        n1 = mid - mid // divisor1
        # eligible for arr2: not divisible by divisor2
        n2 = mid - mid // divisor2
        # eligible for both: not divisible by divisor1 nor divisor2
        both = mid - mid // divisor1 - mid // divisor2 + mid // lcm(divisor1, divisor2)

        # The actual separate eligible numbers:
        only1 = n1 - both
        only2 = n2 - both

        # To fill both arrays without overlap:
        need_both = max(0, uniqueCnt1 - only1) + max(0, uniqueCnt2 - only2)

        if need_both <= both and n1 >= uniqueCnt1 and n2 >= uniqueCnt2:
            result = mid
            right = mid - 1
        else:
            left = mid + 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(N)), where N is up to 2 × (uniqueCnt1 + uniqueCnt2) × max(divisor1, divisor2). Each binary search iteration does constant time calculations.
- **Space Complexity:** O(1), no extra space beyond a few counters and math functions.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize to more than two arrays with different divisibility rules?  
  *Hint: Think about how inclusion-exclusion scales with more sets, and practical limits.*

- What if you had to output the actual arrays, not just the minimal maximum value?  
  *Hint: Try constructive simulation with greedy selection of eligible numbers up to the limit.*

- How would the solution change if repeated numbers were allowed, or negative numbers too?  
  *Hint: Analyze how the divisibility logic changes, and if counts still suffice.*

### Summary
This problem uses a **binary search on the answer** strategy, paired with efficient inclusive-exclusive counting for divisibility constraints. This is a common pattern in "find minimal/maximal feasible value" problems with complex counting logic. Variants appear in range queries and combinatorial problems involving overlaps and set construction given constraints.

### Tags
Math(#math), Binary Search(#binary-search), Number Theory(#number-theory)

### Similar Problems
