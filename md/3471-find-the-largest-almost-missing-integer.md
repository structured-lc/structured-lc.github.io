### Leetcode 3471 (Easy): Find the Largest Almost Missing Integer [Practice](https://leetcode.com/problems/find-the-largest-almost-missing-integer)

### Description  
Given an integer array `nums` and an integer `k`, an integer `x` is called **almost missing** from `nums` if it appears in **exactly one** subarray of size `k` within `nums`. A subarray is a contiguous sequence.  
Return the **largest** such integer, or -1 if no such integer exists.

### Examples  

**Example 1:**  
Input: `nums = [3,9,2,1,7], k = 3`  
Output: `7`  
*Explanation:  
Subarrays of size 3: [3,9,2], [9,2,1], [2,1,7].  
7 appears only in the last subarray [2,1,7], and is not part of any other size-3 subarray.  
It is the largest such value.*

**Example 2:**  
Input: `nums = [4,4,4,4], k = 2`  
Output: `-1`  
*Explanation:  
Every element is 4, so for any subarray of size 2, 4 will be present in more than one subarray.  
No integer appears in exactly one subarray of size 2.*

**Example 3:**  
Input: `nums = [5,6,7,6,5], k = 5`  
Output: `7`  
*Explanation:  
The entire array is a subarray of size 5.  
All numbers in the array appear in only one subarray: the array itself.  
The largest is 7.*

### Thought Process (as if you’re the interviewee)  

- First, interpret "almost missing": we need numbers that appear in exactly one sliding window of size `k`.
- For `k == 1`, every single element makes a window, so only numbers that appear once in the array are valid. Return the max of those.
- For `k == len(nums)`, the entire array is a single subarray, so only numbers in the array can be valid. Return the largest number.
- For general `1 < k < n`:
    - Any internal element (not at the ends) will be covered by multiple subarrays, except possibly the first and last elements.
    - Only `nums` and `nums[-1]` can possibly appear in exactly one window (the first and last subarrays respectively).
    - To confirm, check if `nums` (or `nums[-1]`) appears anywhere else in the array (apart from their original position). If so, they would appear in more subarrays.
    - Return the larger of `nums` and `nums[-1]` if either is valid; otherwise, return -1.

Trade-offs:
- This allows for O(n) processing time (maybe with a Counter or by simple scanning), but is much faster than the naive method of checking every window for every value.

### Corner cases to consider  
- Array consists of identical elements.
- `k == 1`
- `k == len(nums)`
- Array is very small (`n == 1` or `n == 2`)
- Multiple candidates for almost missing, all needing correct max selection.
- No valid almost missing integer exists (should return -1).

### Solution

```python
def find_largest_almost_missing_integer(nums, k):
    n = len(nums)
    
    # For k == n, only one subarray, all numbers are valid, return the max
    if k == n:
        return max(nums)
    
    # For k == 1, each element is its own subarray
    # so return the max number that occurs only once in nums
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    if k == 1:
        res = -1
        for num in nums:
            if count[num] == 1:
                res = max(res, num)
        return res

    # For other k, only nums[0] and nums[-1] can be 'almost missing'
    res = -1
    # Check nums[0]: appears only once (at index 0)
    if count[nums[0]] == 1:
        res = max(res, nums[0])
    # Check nums[-1]: appears only once (at index n-1)
    if count[nums[-1]] == 1:
        res = max(res, nums[-1])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Counting all elements in nums is O(n).
  - The checks at the end are O(1).
- **Space Complexity:** O(n)
  - For storing counts in the hash table (for all unique elements in nums).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to find all such almost missing integers, not just the largest?
  *Hint: Could you collect answers in a list instead of just tracking the max?*

- How would you approach this if subarrays could overlap in a different way, for example, wrapping around (circular array)?
  *Hint: How does window overlap change at the ends?*

- Could you optimize for memory if the range of numbers is limited?
  *Hint: Use a fixed-size array, not a dictionary/map, if numbers fall within a known range.*

### Summary
This problem is a good application of **hash counting** and sliding window edge analysis. The insight is that, except for the window-size edge cases (`k == 1` or `k == n`), only the array ends can possibly be in exactly one window. It's a variant of frequency filtering and "window uniqueness," common in subarray/sliding window questions. The code pattern is similar to frequency hashmaps and selective maximum filtering, and can be applied in problems involving windowed uniqueness or boundary-only candidates.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Missing Number(missing-number) (Easy)