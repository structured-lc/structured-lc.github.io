### Leetcode 2908 (Easy): Minimum Sum of Mountain Triplets I [Practice](https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i)

### Description  
Given an array of integers, find the **minimum sum of a mountain triplet** in the array.  
A **mountain triplet** consists of indices \(i, j, k\) such that:

- \(0 \leq i < j < k < n\)
- nums[i] < nums[j]
- nums[k] < nums[j]

Return the minimum sum nums[i] + nums[j] + nums[k] of any such triplet. If no such triplet exists, return -1.

### Examples  

**Example 1:**  
Input: `[2,3,1]`,  
Output: `6`  
*Explanation: The only valid mountain triplet is (2,3,1) at indices (0,1,2); sum is 2+3+1=6.*

**Example 2:**  
Input: `[8,6,1,5,3]`,  
Output: `14`  
*Explanation: The valid mountain is (6,8,1) at indices (1,0,2), not allowed since i<j<k must hold. But (6,8,3) with i=1, j=0, k=4 also isn't valid. The valid triplet is (1,5,3), indices (2,3,4): 1<5 (yes), 3<5 (yes), sum=1+5+3=9. But j=3, i=2, k=4: valid. Smallest sum is 6+8+3=17 (indices 1,0,4 not allowed). Correct triplet is (1,5,3): 1<5, 3<5, sum=9. So Output is 9.*

**Example 3:**  
Input: `[1,2,3,4]`,  
Output: `-1`  
*Explanation: There is no valid mountain triplet; no "peak" element with smaller values on both sides.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Check all possible triplets for all valid i, j, k with 0 ≤ i < j < k < n. For each, check if nums[i] < nums[j] and nums[k] < nums[j]. If yes, store their sum and output the minimum at the end. This takes O(n³) time—not feasible for large input.

- **Optimize:**  
  For each possible peak (middle) index j, look for the smallest nums[i] on the left with nums[i] < nums[j], and the smallest nums[k] on the right with nums[k] < nums[j]. Try all possible j, keep the minimum total sum found.

- **Implementation:**  
  - For each j from 1 to n-2:
    - Scan `i` in [0, j-1] for nums[i] < nums[j], keep smallest nums[i]
    - Scan `k` in [j+1, n-1] for nums[k] < nums[j], keep smallest nums[k]
    - If both found, sum = nums[i] + nums[j] + nums[k]
    - Track min sum

- **Trade-offs:**  
  This scans O(n²) time, but is acceptable for small n (as per LeetCode Easy constraints).  
  Further optimization: Precompute minLeft and minRight arrays for O(n²) total. For true O(n) time, more advanced data structures required, but not needed here.

### Corner cases to consider  
- Array too short (<3 elements)
- No valid mountain (e.g. strictly increasing or strictly decreasing)
- Multiple possible mountains; ensure choosing the minimum sum.
- Duplicate values
- Negative values

### Solution

```python
def minimumSum(nums):
    n = len(nums)
    ans = float('inf')
    
    # For each possible peak in [1, n-2]
    for j in range(1, n - 1):
        # Find min left value < nums[j]
        min_left = float('inf')
        for i in range(0, j):
            if nums[i] < nums[j]:
                min_left = min(min_left, nums[i])
        # Find min right value < nums[j]
        min_right = float('inf')
        for k in range(j + 1, n):
            if nums[k] < nums[j]:
                min_right = min(min_right, nums[k])
        # If both exist, update answer
        if min_left != float('inf') and min_right != float('inf'):
            ans = min(ans, min_left + nums[j] + min_right)
    return ans if ans != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), because for each j, we scan up to O(n) left and O(n) right, for n values of j.
- **Space Complexity:** O(1) extra (besides input); min_left and min_right are just variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in linear time?  
  *Hint: Precompute for each j the minimum value less than nums[j] seen so far on the left and on the right.*

- What if elements can be equal?  
  *Hint: Update "strict less-than" checks based on new constraints.*

- How to return the indices of the triplet instead of the sum?  
  *Hint: Track the indices while computing min_left and min_right.*

### Summary
This is a classic "find peak with smaller neighbors" problem—**pattern: iterate with the middle fixed, scan left and right for constraints**.  
The approach is O(n²) brute scan, easy to code and clear. Patterns like this are common in mountain/peak, 3-pointer, or local-optima triplet subarray problems.  
Further optimization with prefix-min and suffix-min arrays is possible if higher efficiency is needed.