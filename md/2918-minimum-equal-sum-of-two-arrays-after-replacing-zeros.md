### Leetcode 2918 (Medium): Minimum Equal Sum of Two Arrays After Replacing Zeros [Practice](https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros)

### Description  
Given two integer arrays, **nums1** and **nums2**, possibly containing zeros, replace *all* zeros in both arrays with strictly positive integers so their sums become equal. Return the **smallest possible equal sum**, or -1 if it's impossible.

### Examples  

**Example 1:**  
Input: `nums1 = [3,2,0,1,0]`, `nums2 = [6,5,0]`  
Output: `12`  
*Explanation: Replace the two zeros in `nums1` with 2 and 4, so `nums1 = [3,2,2,1,4]`. Replace the zero in `nums2` with 1, so `nums2 = [6,5,1]`. Both sums become 12, and no smaller equal sum is possible.*

**Example 2:**  
Input: `nums1 = [2,0,2,0]`, `nums2 = [1,4]`  
Output: `-1`  
*Explanation: There's no way to assign positive values to the zeros to make the sums equal.*

**Example 3:**  
Input: `nums1 = [1,2,3]`, `nums2 = [2,4]`  
Output: `-1`  
*Explanation: Since both arrays have no zeros, and their sums are not equal, it's impossible to make them equal.*


### Thought Process (as if you’re the interviewee)  
- **Brute Force**: Try every possible strictly positive integer for each zero and check all combinations ― but this is infeasible: exponential time and not scalable.
- **Observation**:  
  - Every zero must be replaced by at least 1, so the *minimal* sum for each array after replacing zeros is `sum + #zeros`.
  - If both arrays contain zeros, we can "inflate" their zeros as needed to match each other's sum, so the **minimum possible equal sum** is `max(sum1 + zeros1, sum2 + zeros2)`.
  - If only one array has zeros, the array with zeros will need to reach the sum of the other (which cannot change). Assign the minimal value 1 to all zeros, and if the total is still less than the other sum, it's impossible; if it's more, it's impossible as well since you can't "lose value" by putting more than 1 in a zero.
  - If *neither* array has zeros, just check if their sums are equal (else impossible).

- **Algorithm**:
  - Calculate `sum1`, `sum2`, `zeros1`, `zeros2`.
  - If neither array has zeros: return sum if equal, else -1.
  - If only one array has zeros:
    - Try to recover the other array's sum with all zeros replaced by at least 1.
    - If possible, return the other array's sum; else -1.
  - If both arrays have zeros, answer is `max(sum1 + zeros1, sum2 + zeros2)`.

### Corner cases to consider  
- Both arrays are already equal and have no zeros.
- All elements in one or both arrays are zero.
- One or both arrays have only one element.
- Only one array contains zeros.
- Both arrays have zeros but at different positions/lengths.

### Solution

```python
def minSum(nums1, nums2):
    # Calculate sums and zero counts for both arrays
    s1 = sum(x for x in nums1 if x != 0)
    z1 = sum(1 for x in nums1 if x == 0)
    s2 = sum(x for x in nums2 if x != 0)
    z2 = sum(1 for x in nums2 if x == 0)
    
    # No zeros in either array
    if z1 == 0 and z2 == 0:
        return s1 if s1 == s2 else -1
    
    # Only nums1 has zeros
    if z1 > 0 and z2 == 0:
        min_possible = s1 + z1  # min sum after replacing zeros with 1
        # Can nums1 reach nums2's sum by increasing zeros above 1?
        # If s2 < min_possible, impossible
        # If s2 >= min_possible, possible only if there are enough zeros to make up the gap
        if s2 < min_possible:
            return -1
        return s2 if True else -1  # True is always satisfied because amt can always be distributed among zeros

    # Only nums2 has zeros
    if z2 > 0 and z1 == 0:
        min_possible = s2 + z2
        if s1 < min_possible:
            return -1
        return s1 if True else -1

    # Both arrays have zeros
    return max(s1 + z1, s2 + z2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are lengths of `nums1` and `nums2` (single pass for each).
- **Space Complexity:** O(1), only constant extra variables (not counting input).


### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed in the arrays?  
  *Hint: Zeros must still be replaced by strictly positive, but existing negative sums require care.*

- If you could also replace zeros with zero (not strictly positive), how would the answer change?  
  *Hint: The minimal possible sum gets smaller.*

- Can you reconstruct one possible assignment that achieves the minimal sum?  
  *Hint: Distribute the exact difference appropriately among the zeros.*


### Summary
This problem is a **greedy simulation** and minimal feasible value calculation. It's analogous to problems where you need to "fill in unknowns under constraints so as to equalize aggregates", such as array restoration or equalizing two multisets with minimal effort. The pattern: scan for zeros, evaluate minimal totals, and consider whether flexibility is enough to match the arrays. This method is used often in interview questions involving restoration and greedy distribution.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
