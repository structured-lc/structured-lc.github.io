### Leetcode 3350 (Medium): Adjacent Increasing Subarrays Detection II [Practice](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii)

### Description  
Given an integer array **nums** of length n, find the **maximum k** (k ≥ 1) such that there exist **two adjacent subarrays** of length k each, both of which are **strictly increasing**. Specifically, you're looking for the largest k so that for some index a, both `nums[a..a+k-1]` and `nums[a+k..a+2k-1]` are strictly increasing and adjacent in the array (i.e., the second starts immediately after the first).

### Examples  

**Example 1:**  
Input: `nums = [2,5,7,8,9,2,3,4,3,1]`  
Output: `4`  
*Explanation: The two subarrays are [2,5,7,8] and [9,2,3,4]. Both have length 4, are adjacent, and are strictly increasing.*

**Example 2:**  
Input: `nums = [1,2,3,1,2,3,1]`  
Output: `3`  
*Explanation: [1,2,3] and [1,2,3] are both strictly increasing and adjacent (indices 0-2, 3-5).*

**Example 3:**  
Input: `nums = [5,6,1,2,3,4]`  
Output: `2`  
*Explanation: The pair [5,6] and [1,2] both length 2, adjacent, and strictly increasing. No larger possible k.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider how to **check for strictly increasing subarrays of a given length k**.  
A brute-force solution is to try every possible k from n//2 down to 1 and check every possible window, but that would be too slow for large n.

Instead, we can **preprocess the array**:
- Build an array **inc_len_left** where inc_len_left[i] is the length of the longest strictly increasing subarray ending at i.
- Similarly, build **inc_len_right** where inc_len_right[i] is the longest strictly increasing subarray starting at i.

Then, for any index a, we can check if both `nums[a−k+1..a]` and `nums[a+1..a+k]` (for length k ending at a) are strictly increasing by consulting these arrays.

The main optimization is to binary search for k, verifying at each k whether a valid pair of adjacent increasing subarrays of length k exists.

### Corner cases to consider  
- Array too short (length < 2).
- All elements are same.
- Increasing only at the start or end.
- Array strictly decreasing.
- Multiple valid k, but must return the largest.
- Disjoint strictly increasing regions.

### Solution

```python
def max_increasing_adjacent_subarrays(nums):
    n = len(nums)
    if n < 2:
        return 0

    # Precompute: inc_len_left[i] = length of strictly inc subarray ending at i
    inc_len_left = [1] * n
    for i in range(1, n):
        if nums[i] > nums[i - 1]:
            inc_len_left[i] = inc_len_left[i - 1] + 1

    # Precompute: inc_len_right[i] = length of strictly inc subarray starting at i
    inc_len_right = [1] * n
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            inc_len_right[i] = inc_len_right[i + 1] + 1

    # Binary search the largest possible k (k ≤ n // 2)
    left, right = 1, n // 2
    ans = 0

    while left <= right:
        k = (left + right) // 2
        found = False

        # Try every possible pair of adjacent subarrays of length k
        for i in range(k, n - k + 1):
            # Check [i - k, i - 1] and [i, i + k - 1]
            if inc_len_left[i - 1] >= k and inc_len_right[i] >= k:
                found = True
                break

        if found:
            ans = k
            left = k + 1  # Try to find a larger k
        else:
            right = k - 1  # Must try a smaller k

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Each binary search iteration is O(n), and binary search runs O(log n) times (since k goes up to n//2).
- **Space Complexity:** O(n)  
  Needed for inc_len_left and inc_len_right arrays of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the **starting indices** of the discovered subarrays?
  *Hint: Instead of breaking at the first found k, track indices where both arrays meet the criteria.*

- How would the logic change if not strictly increasing but **non-decreasing**?
  *Hint: Adjust the way you compute the inc_len arrays (change comparison to ≥).*

- How would you solve this if the subarrays could **overlap** (i.e., adjacency requirement lifted)?
  *Hint: The adjacency requirement gives O(1) check per split; for overlap, need to try all pairs—slower approach unless optimized with preprocessing.*

### Summary
This problem uses the **binary search on the answer** pattern, combined with **dynamic programming-style preprocessing** to enable O(1) window checks for strictly increasing subarrays. This pattern is common in problems asking for the "maximum/minimum value k such that some property holds" within subarrays, especially when efficient preprocessing (like prefix/suffix arrays) is possible. Binary search on answer can frequently reduce brute-force O(n²) approaches to O(n log n).