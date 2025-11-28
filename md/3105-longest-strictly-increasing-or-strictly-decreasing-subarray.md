### Leetcode 3105 (Easy): Longest Strictly Increasing or Strictly Decreasing Subarray [Practice](https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray)

### Description  
Given an integer array `nums`, find the length of the longest contiguous subarray that is either **strictly increasing** (every next element is greater than the previous) or **strictly decreasing** (every next element is less than the previous). Return the length of the longest such subarray.

### Examples  

**Example 1:**  
Input: `nums = [1,4,3,3,2]`  
Output: `2`  
*Explanation: The longest strictly increasing subarray is [1,4]. The longest strictly decreasing subarray is [3,2]. Both of length 2. No subarray of length ≥3 is strictly increasing or decreasing.*

**Example 2:**  
Input: `nums = [3,3,3,3]`  
Output: `1`  
*Explanation: All numbers are equal. Any single number forms a subarray of length 1. No strictly increasing or decreasing subarray of length >1 exists.*

**Example 3:**  
Input: `nums = [3,2,1]`  
Output: `3`  
*Explanation: [3,2,1] is strictly decreasing (3 > 2 > 1), so the answer is 3.*

### Thought Process (as if you’re the interviewee)  
My first instinct is the brute-force approach: for every possible subarray, check if it is strictly increasing or strictly decreasing, and keep track of the maximum length found. However, this is O(n²), which is inefficient for large arrays.

A better approach is to traverse the array once to find the longest increasing subarray, and once more for the longest decreasing subarray:
- For increasing: Use a variable `inc` to count the current increasing streak. Each time `nums[i] > nums[i-1]`, increment; otherwise, reset to 1.
- For decreasing: Similarly, use a variable `dec` for decreasing streaks. Each time `nums[i] < nums[i-1]`, increment; otherwise, reset to 1.
- Track the overall maximum for both.

This two-pass or merged one-pass method is efficient (O(n)) and uses O(1) space. The trade-off is minor code duplication but optimal performance.

### Corner cases to consider  
- Array of length 0 (though per constraints might not occur)
- Array of length 1 (should return 1)
- All elements equal (e.g., `[4,4,4,4]` should return 1)
- Strictly increasing or strictly decreasing throughout (should return n)
- Arrays with plateaus: consecutive equal elements interrupt the streak
- Zig-zag sequences: `[1,3,2,4,3,5]`

### Solution

```python
def longestMonotonicSubarray(nums):
    n = len(nums)
    if n == 0:
        return 0  # As per constraints, n >= 1, but good defensive code

    max_len = 1

    # Check strictly increasing streaks
    inc = 1  # Current length of increasing streak
    for i in range(1, n):
        if nums[i] > nums[i - 1]:
            inc += 1
            if inc > max_len:
                max_len = inc
        else:
            inc = 1  # Reset streak

    # Check strictly decreasing streaks
    dec = 1  # Current length of decreasing streak
    for i in range(1, n):
        if nums[i] < nums[i - 1]:
            dec += 1
            if dec > max_len:
                max_len = dec
        else:
            dec = 1

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we do two separate traversals through the list, each of which is linear in the size of the input.
- **Space Complexity:** O(1), since only a constant amount of extra variables are used—no additional space dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return not just the length, but also the **starting and ending indices** of the longest such subarray?  
  *Hint: Track indices when you update the max length.*

- Can you do this in a **single pass** instead of two?  
  *Hint: Maintain both increasing and decreasing counters simultaneously.*

- What if you're asked for **non-contiguous subarrays** (subsequences) instead?  
  *Hint: That becomes the classical Longest Increasing/Decreasing Subsequence problem (O(n log n)).*

### Summary
This problem uses the **sliding window** or **counter** pattern for contiguous arrays, with a single variable tracking streaks as you iterate. It's a direct O(n), O(1) scan, similar to finding "the longest run of a property" in an array—a common pattern in sequence analysis, applicable to any scenario where you're tracking length of stretches with a property (e.g., longest unbroken sequence of successes, failures, etc).


### Flashcard
Single pass tracking current increasing/decreasing streak length; update max when streak breaks. Return the maximum of both streaks.

### Tags
Array(#array)

### Similar Problems
