### Leetcode 2229 (Easy): Check if an Array Is Consecutive [Practice](https://leetcode.com/problems/check-if-an-array-is-consecutive)

### Description  
Given an integer array, determine if it is **consecutive**: that is, does the array contain every number in the range [x, x + n - 1] (inclusive), where x is the minimum value in the array and n is the length of the array?  
The array can be in any order, but all values must be unique and form a straight sequence.

### Examples  

**Example 1:**  
Input: `[1,3,4,2]`  
Output: `true`  
*Explanation: min=1, len=4 ⇒ range is [1,4]. All numbers 1,2,3,4 are present.*

**Example 2:**  
Input: `[1,3]`  
Output: `false`  
*Explanation: min=1, len=2 ⇒ range is [1,2]. Number 2 is missing.*

**Example 3:**  
Input: `[3,5,4]`  
Output: `true`  
*Explanation: min=3, len=3 ⇒ range is [3,5]. All numbers 3,4,5 are present.*

### Thought Process (as if you’re the interviewee)  
First, let’s clarify:  
- To be consecutive, the numbers must form a sequence where each value appears exactly once, spanning from the minimum to the maximum, with no gaps.  
- Brute-force: For each position, check if the value is in the expected range and verify there are no duplicates. For every value between min and max, check if it appears in the array: this is O(n²).

Let’s optimize:  
- Use a **set** for O(1) lookup.  
  1. Compute min and max.
  2. The array length should equal (max - min + 1).
  3. All elements should be unique: set size == array size.
- If both conditions hold, the array must contain every number in the range without duplicates—the definition of being consecutive.

Further optimization using sorting:  
- Sort array, then verify each difference is exactly 1 between adjacent elements (and no dupe). Time O(n log n), but previous approach is O(n).

I prefer the set-based solution for clarity and O(n) time.

### Corner cases to consider  
- Single element array → always consecutive.
- Empty array → problem disallows (1 ≤ n).
- Negative numbers.
- Duplicates (e.g., [2,2,3]) → not consecutive.
- Unordered input.
- Max and min differ by more than (n - 1).
- All max numbers or all min numbers.
- Arrays with only two elements (e.g., [5,6] is consecutive, [5,7] is not).

### Solution

```python
def is_consecutive(nums):
    # Find the minimum and maximum value in the array
    min_val = nums[0]
    max_val = nums[0]
    # Use a set to track unique values
    unique = set()
    
    for val in nums:
        if val in unique:
            # Duplicate found: not consecutive
            return False
        unique.add(val)
        if val < min_val:
            min_val = val
        if val > max_val:
            max_val = val

    n = len(nums)
    # Check the length of the expected consecutive range
    if max_val - min_val + 1 != n:
        return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Explanation: One pass to find min, max, and detect duplicates; set operations are O(1) amortized.
- **Space Complexity:** O(n)  
  Because we use a set of size up to n for uniqueness.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your approach if the input can contain negative integers?
  *Hint: All approaches above work; the range calculation uses min and max.*

- Can you do it without extra space (in-place)?
  *Hint: Sorting in-place, then check adjacent differences; compare nums[i] and nums[i-1].*

- What if the array is very large—can you optimize further for space or time?
  *Hint: If input is known to have small range, consider bitmap/bitset.*

### Summary
This problem is a classic use of the **set for duplicates** and **min/max for range validation** patterns.  
The single-pass min/max/set pattern appears in many questions requiring range or uniqueness checks, such as detecting consecutive numbers, validating Sudoku rows/columns, or checking for missing numbers in a range.  
The main insight is that an array is consecutive if there are no duplicates and its range (max-min) matches the array’s length minus 1. The code is optimal for time and space under typical constraints.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
- Binary Tree Longest Consecutive Sequence(binary-tree-longest-consecutive-sequence) (Medium)
- Binary Tree Longest Consecutive Sequence II(binary-tree-longest-consecutive-sequence-ii) (Medium)
- Consecutive Characters(consecutive-characters) (Easy)