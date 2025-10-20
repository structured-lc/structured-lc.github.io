### Leetcode 1608 (Easy): Special Array With X Elements Greater Than or Equal X [Practice](https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x)

### Description  
Given an integer array **nums**, find the integer **x** such that exactly **x** elements in **nums** are greater than or equal to **x**. If there is no such x, return `-1`. The search is for x ≥ 0.

### Examples  

**Example 1:**  
Input: `nums = [3,5]`
Output: `2`
*Explanation: There are exactly 2 elements (3, 5) that are ≥ 2.*

**Example 2:**  
Input: `nums = [0,0]`
Output: `-1`
*Explanation: No x exists such that exactly x elements are ≥ x.*

**Example 3:**  
Input: `nums = [0,4,3,0,4]`
Output: `3`
*Explanation: There are exactly 3 elements (4,4,3) that are ≥ 3.*

### Thought Process (as if you’re the interviewee)  
- The goal is to find x such that exactly x numbers in nums are ≥ x.
- Try all possible x values from 0 to len(nums) (inclusive). For each x, count how many elements in nums are ≥ x.
- If count == x, return x. If none, return -1.
- Sort the array to make the count faster; can use binary search for optimization.

### Corner cases to consider  
- All zeros in nums.
- nums is empty (return -1).
- nums has repeated elements.
- Multiple x possible? The problem says "exactly one" such x possible.

### Solution

```python
def specialArray(nums):
    nums.sort()
    n = len(nums)
    for x in range(n+1):
        # number of elements at least x:
        # first index where nums[i] >= x
        # Since nums is sorted, use bisect_right
        count = sum(1 for num in nums if num >= x)
        if count == x:
            return x
    return -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) (due to sorting, then O(n) per x)
- **Space Complexity:** O(1), not counting sort (if in-place)

### Potential follow-up questions (as if you’re the interviewer)  
- Can we solve this without sorting?   
  *Hint: Use counting sort concept for small value ranges.*

- If elements can be negative, does it affect correctness?   
  *Hint: No, since we're just looking at element values ≥ x.*

- What if we want elements strictly greater than x, not ≥ x?   
  *Hint: Adjust your count comparison accordingly.*

### Summary
Classic search for a self-defining statistic -- check candidate x, count "at least x" elements, compare. This is a Counting + Linear Scan pattern. Applies in core problems such as H-index, bucket/statistics queries, and self-referencing conditions.


### Flashcard
For each x from 0 to n, count how many numbers are ≥ x; return x if count matches x, else -1.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
