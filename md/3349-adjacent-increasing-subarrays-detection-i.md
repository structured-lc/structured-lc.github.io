### Leetcode 3349 (Easy): Adjacent Increasing Subarrays Detection I [Practice](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i)

### Description  
Given an array of n integers `nums` and an integer `k`, determine if there exist two adjacent subarrays of length `k` such that **both** subarrays are **strictly increasing**.  
Here, "adjacent" means the first subarray starts at index a, the next at a+k—so the pairs are `nums[a..a+k-1]` and `nums[a+k..a+2k-1]`. Return `True` if it's possible to find such a pair, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `nums = [2,5,7,8,9,2,3,4,3,1]`, `k = 3`  
Output: `True`  
*Explanation: Subarray `[7,8,9]` (starting at index 2) and `[2,3,4]` (starting at index 5) are both strictly increasing, and adjacent.*

**Example 2:**  
Input: `nums = [1,2,3,4,4,4,4,5,6,7]`, `k = 5`  
Output: `False`  
*Explanation: No two adjacent subarrays of length 5 are both strictly increasing.*

**Example 3:**  
Input: `nums = [1, 2, 3, 1, 2, 3, 1, 2, 3]`, `k = 2`  
Output: `True`  
*Explanation: `[1,2]` and `[3,1]` (not increasing), but `[2,3]` and `[1,2]` starting at indices 1 and 3 are both strictly increasing and adjacent.*

### Thought Process (as if you’re the interviewee)  
First, for any starting index a, we need to check if subarrays `nums[a..a+k-1]` and `nums[a+k..a+2k-1]` are both strictly increasing.

**Brute-force idea:**  
- For every possible starting index a (from 0 to n-2k),  
  - Check if both `nums[a..a+k-1]` and `nums[a+k..a+2k-1]` are strictly increasing.
- Checking if a subarray is strictly increasing takes `O(k)`. For each possible a (`O(n)`), so O(nk) time.

**Optimized approach:**  
- Precompute for each index the length of the current strictly increasing stretch.
- Use this info to quickly check if subarrays of length k are increasing by sliding a window.
- This gives O(n) time.

**Trade-offs:**  
Brute-force is fine for small n, but n ≤ 100, so both O(nk) and O(n) will work in practice. The single scan/sliding window method is cleanest.

### Corner cases to consider  
- Array shorter than 2\*k (problem constraints prevent this)
- Subarrays contain equal elements (must be strictly increasing)
- Negative numbers and zeros in the input
- Multiple valid solutions
- Only two valid subarrays at start or end of array

### Solution

```python
def has_adjacent_increasing_subarrays(nums, k):
    n = len(nums)
    # Compute strictly increasing run lengths ending at position i
    inc_run = [1] * n  # inc_run[i]: length of strictly increasing subarray ending at i
    for i in range(1, n):
        if nums[i] > nums[i-1]:
            inc_run[i] = inc_run[i-1] + 1
        else:
            inc_run[i] = 1

    # For each possible adjacent window, check condition
    for start in range(0, n - 2*k + 1):
        # First subarray: nums[start..start+k-1]
        # Second subarray: nums[start+k..start+2k-1]
        end1 = start + k - 1
        end2 = start + 2*k - 1
        if inc_run[end1] >= k and inc_run[end2] >= k:
            # Each inc_run[x] gives length of latest strictly increasing subarray ending at x
            # So nums[start..end1] and nums[start+k..end2] are both strictly increasing
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  - Single pass to build `inc_run`, then another pass of size O(n) to check each adjacent pair. No nested loops of k inside main loop.
- **Space Complexity:** O(n) for the `inc_run` auxiliary list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the subarrays need not be *adjacent*?  
  *Hint: How can you efficiently track all strictly increasing subarrays of length k in the array and check for non-overlapping indices?*

- What if you want to return the *count* of such adjacent increasing subarray pairs rather than just a boolean?  
  *Hint: Scan through and count for each possible `start` position if both subarrays qualify.*

- How would your approach change if `nums` was very large (e.g., stream of numbers)?  
  *Hint: Can you use constant space, or a moving window to check only the subarrays currently in memory?*

### Summary
This problem demonstrates a classic sliding window / precomputation pattern for interval subarray property checks. The strictly increasing property is efficiently captured by tracking the run lengths. This approach generalizes well to problems seeking subarrays with certain monotonic or numeric properties, making it a useful technique for interval scanning and dynamic programming with window constraints.

### Tags
Array(#array)

### Similar Problems
