### Leetcode 1664 (Medium): Ways to Make a Fair Array [Practice](https://leetcode.com/problems/ways-to-make-a-fair-array)

### Description  
Given an integer array **nums**, an index is **fair** if after removing that element, the sum of the elements at even indices equals the sum at odd indices. Find how many indices are fair.

### Examples  

**Example 1:**  
Input: `nums = [2,1,6,4]`  
Output: `1`  
*Explanation: Removing index 1 yields [2,6,4] ⇒ even sum: 2+4=6, odd sum: 6. Only this index works.*

**Example 2:**  
Input: `nums = [1,1,1]`  
Output: `3`  
*Explanation: Removing any index yields even and odd sums both 1, so all indices are fair.*

**Example 3:**  
Input: `nums = [1,2,3]`  
Output: `0`  
*Explanation: No index removal results in equal even/odd sums.*

### Thought Process (as if you’re the interviewee)  
The naive brute force is: for every index, remove it, recalculate even/odd indexed sums, check for equality. But this is O(n²).

Optimized: Use **prefix sums**:
- Maintain four variables: totalEven, totalOdd, leftEven, leftOdd.
- For each index, calculate what will be the new even/odd indexed sums after removal (note, indices shift after removal!).
- Carefully update the sums on-the-fly as you iterate and check at every step.

### Corner cases to consider  
- Empty array (input constraint guarantees n ≥ 1)
- All elements are the same
- Odd or even sized arrays
- Removing first or last element

### Solution

```python
def waysToMakeFair(nums):
    n = len(nums)
    totalEven = sum(nums[i] for i in range(0, n, 2))
    totalOdd = sum(nums[i] for i in range(1, n, 2))
    res = leftEven = leftOdd = 0
    for i in range(n):
        # Remove nums[i], update sums for new even/odd indices
        if i % 2 == 0:
            totalEven -= nums[i]
        else:
            totalOdd -= nums[i]
        # After removal, elements to the left don't shift, right side shifts (parity flips)
        if leftEven + totalOdd == leftOdd + totalEven:
            res += 1
        # Add nums[i] to left sums
        if i % 2 == 0:
            leftEven += nums[i]
        else:
            leftOdd += nums[i]
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n). Each prefix sum pass is O(n), main loop O(n).
- **Space Complexity:** O(1) extra (only variables used).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if large updates are made to the array and you need to answer multiple queries?  
  *Hint: Use a segment tree or binary indexed tree for range sums and efficient updates.*

- What if negative numbers are allowed?  
  *Hint: The core logic does not change.*

- How would you generalize for k-way fairness (partitioning by k mod positions)?  
  *Hint: Track k different prefix sums for each modulo bucket.*

### Summary
The key insight is recognizing how indices shift after removal, and how **prefix sums** help correct for it in O(n). This is a classic parity and prefix-sum based solution.