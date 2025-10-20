### Leetcode 2009 (Hard): Minimum Number of Operations to Make Array Continuous [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous)

### Description  
Given an array of integers `nums`, you can **replace any element** with any integer in each operation. The goal is to make the array **continuous**, meaning:
- All elements are *unique*.
- The difference between the maximum and minimum element is exactly `len(nums) - 1`.

Return the **minimum** number of operations needed to make the array continuous.

### Examples  

**Example 1:**  
Input: `nums = [4,2,5,3]`  
Output: `0`  
*Explanation: The array is already continuous (sorted unique array: [2,3,4,5], max-min = 3 = 4-1, all numbers between min and max are present).*

**Example 2:**  
Input: `nums = [1,2,3,5,6]`  
Output: `1`  
*Explanation: Replace 6 with 4 to get [1,2,3,4,5], which is continuous (unique, max-min=4).*

**Example 3:**  
Input: `nums = [1,10,100,1000]`  
Output: `3`  
*Explanation: Replace 10 with 2, 100 with 3, and 1000 with 4 to make [1,2,3,4].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each possible way of selecting a continuous set of values of size n (length of input), replace any element not in that set. But there are too many possible sets and the ranges can be huge (input is up to 10⁵ elements, values up to 10⁹), so this is too slow.

- **Optimization:**  
  Key insight: since you can replace any number *to any integer*, the only thing that matters is how many values you already have that can stay in some continuous range of size n (that is, any range [x, x+n-1]); the rest must be changed.

  So:
  - Remove duplicates from `nums`, since continuity requires all elements to be unique.
  - Sort the unique elements.
  - Use a sliding window: for each index i, consider the window starting at unique[i] and extending up to unique[i]+n-1. Count how many "unique" numbers fall inside this window (i.e., unique elements in [unique[i], unique[i]+n-1]), call this k.
  - The minimum number of changes required is n - k (replace all other values outside the window to fill the gap).
  - Check all possible windows and return the smallest n-k.

  This works efficiently because there are at most n unique elements, and each sliding window can be scanned with two pointers.

### Corner cases to consider  
- All elements are already continuous (array sorted/unsorted, but all elements are unique and cover a full range).
- Array has all duplicates (e.g. [5,5,5,5]).
- Array has only one element.
- Non-consecutive but unique numbers, like [1, 100, 1000].
- Array size is 1.
- Some or all numbers negative.

### Solution

```python
def min_operations(nums):
    n = len(nums)

    # Remove duplicates for the sliding window
    unique = sorted(set(nums))
    m = len(unique)
    min_ops = n

    right = 0
    # For each possible start of window
    for left in range(m):
        # Move right pointer while window <= n-1 range
        while right < m and unique[right] <= unique[left] + n - 1:
            right += 1
        # Number of unique in window = right - left
        # Operations needed = n - (right - left)
        min_ops = min(min_ops, n - (right - left))
    return min_ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  Justification: Sorting the unique elements takes O(n log n). The sliding window is O(n) (each pointer only moves forward).

- **Space Complexity:** O(n).  
  Justification: Need to store the set of unique elements (worst case all are unique).

### Potential follow-up questions (as if you’re the interviewer)  

- What if replacement can only use numbers that are already in the array?  
  *Hint: You'd have to re-frame: instead of replacing to any integer, only pick replacements from existing elements.*

- How would you solve if "continuous" could include duplicate numbers?  
  *Hint: Would need a different definition, e.g. longest run with the same number, or allow duplicate values in the window.*

- Can you optimize space usage further for huge input?  
  *Hint: If input is sorted in-place, you could work with pointers more directly and avoid creating a new set if uniqueness is not needed for correctness.*

### Summary
This problem uses the **two pointer sliding window** and **greedy observation** that only windows containing the most possible unique numbers in a feasible "continuous" range need to be considered. The solution first deduplicates, sorts, and then checks every possible window for coverage. This pattern is common in problems seeking the "minimum replacements/deletions to get X consecutive/contiguous property", and is also seen in subarray/substring with at most k distinct/unique elements and other interval sweeping problems.


### Flashcard
Minimize operations to make an array continuous by identifying the longest existing continuous range and extending it.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Sliding Window(#sliding-window)

### Similar Problems
- Longest Repeating Character Replacement(longest-repeating-character-replacement) (Medium)
- Continuous Subarray Sum(continuous-subarray-sum) (Medium)
- Moving Stones Until Consecutive II(moving-stones-until-consecutive-ii) (Medium)
- Minimum One Bit Operations to Make Integers Zero(minimum-one-bit-operations-to-make-integers-zero) (Hard)
- Minimum Adjacent Swaps for K Consecutive Ones(minimum-adjacent-swaps-for-k-consecutive-ones) (Hard)