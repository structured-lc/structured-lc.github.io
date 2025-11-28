### Leetcode 3634 (Medium): Minimum Removals to Balance Array [Practice](https://leetcode.com/problems/minimum-removals-to-balance-array)

### Description  
Given an integer array **nums** and an integer **k**, an array is considered **balanced** if its **maximum** element is at most **k** times the **minimum** element.  
You may remove any number of elements (at least leave one) from **nums** to make it balanced, and you should return the **minimum** number of elements to remove.  
An array of length 1 is always considered balanced.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 5], k = 2`  
Output: `1`  
Explanation: Remove 5. Remaining array `[2, 1]` is balanced (2 ≤ 2 × 1 = 2).

**Example 2:**  
Input: `nums = [7, 15, 1, 2], k = 3`  
Output: `2`  
Explanation: Remove [7, 15] (or [1, 7]) to get `[1, 2]`, where 2 ≤ 3 × 1 = 3.

**Example 3:**  
Input: `nums = [1, 2, 3, 4, 5, 6, 7], k = 3`  
Output: `4`  
Explanation: Keep `[1, 2, 3]` (1 × 3 = 3, so keep up to 3); or keep `[5, 6, 7]` (5 × 3 = 15, so can keep all). Minimum removals needed is 4.

### Thought Process (as if you’re the interviewee)  
First, let's clarify that we want the fewest removals such that in the resulting array, the largest number is at most **k** times the smallest.  
A brute-force approach is to consider all subsets, keep the ones meeting the condition, and return n − largest subset size. But this is exponential and not practical.

To optimize:
- **Sort** the array first.
- For each index as the possible left endpoint (min), find the farthest right endpoint **r** such that `nums[r] ≤ k × nums[l]`.
- The subarray from l to r − 1 is the largest possible balanced window starting at l.
- For each l, calculate how many you remove: items to the left + items to the right (i.e., `n - (r-l)`).
- Keep the minimal value across all windows.  
We can use two pointers or binary search to efficiently find the valid window for every l.

This is an application of the **sliding window / two-pointer** technique after sorting, which brings time complexity down significantly.

### Corner cases to consider  
- All elements are identical (already balanced, remove 0).
- Array of length 1 (balanced, remove 0).
- Array is already balanced (remove 0).
- k = 1 (all numbers must be identical to be balanced).
- Some possible windows are length 1 (removal needed for everything else).
- Large range of numbers or just one number is far out of range.

### Solution

```python
def minimum_removals(nums, k):
    # Sort the array so that all possible balanced subarrays are contiguous
    nums.sort()
    n = len(nums)
    min_removals = n - 1  # Worst case: leave one element

    right = 0  # Right pointer for the window

    # Try each index as the start of the window
    for left in range(n):
        # Move the right pointer as far as we can while balanced
        while right < n and nums[right] <= nums[left] * k:
            right += 1
        # Elements kept: (right - left)
        # Elements removed: left + (n - right)
        min_removals = min(min_removals, left + (n - right))

    return min_removals
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting: O(n log n),  
  Sliding window: O(n), as each pointer moves only forward. So overall is O(n log n).
  
- **Space Complexity:** O(1) extra (other than input storage), since pointer variables and sort in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k can be very large or very small (like 1 or 10⁹)?  
  *Hint: What special cases arise when k is 1, or if all numbers are in range because k is huge?*

- Can you return one such balanced subarray (not just the minimum removals)?  
  *Hint: Track indices of best window during iteration.*

- How does your algorithm behave on already balanced arrays (or sorted arrays)?  
  *Hint: Is there a way to check early if no removal is needed?*

### Summary
This problem uses the **two-pointer / sliding window** method on sorted data to define the maximal valid interval for every possible minimum. This approach avoids brute-force subset search and is a recurring pattern where kept subarrays must satisfy a maximum/minimum constraint. The pattern is broadly applicable to windowed or contiguous subarray balance problems.


### Flashcard
Sort array, then for each left endpoint (minimum), binary search or two-pointer to find the farthest right endpoint where nums[r] ≤ k × nums[l]; track maximum subarray length.

### Tags
Array(#array), Sliding Window(#sliding-window), Sorting(#sorting)

### Similar Problems
