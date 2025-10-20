### Leetcode 2733 (Easy): Neither Minimum nor Maximum [Practice](https://leetcode.com/problems/neither-minimum-nor-maximum)

### Description  
Given an array of distinct positive integers, return any number from the array that is **neither the minimum nor the maximum** value.  
If no such number exists (for example, if the array has size < 3), return -1.

### Examples  

**Example 1:**  
Input: `nums = [3,2,1,4]`  
Output: `2`  
*Explanation: The minimum is 1, the maximum is 4. Both 2 and 3 are valid answers because they are neither the minimum nor the maximum. The function is allowed to return any such value.*

**Example 2:**  
Input: `nums = [1,2]`  
Output: `-1`  
*Explanation: The array does not have enough elements (size < 3). It is impossible to select any value that is not either the minimum or the maximum.*

**Example 3:**  
Input: `nums = [2,1,3]`  
Output: `2`  
*Explanation: The minimum is 1, the maximum is 3. 2 is the only value that is neither minimum nor maximum, so return 2.*

### Thought Process (as if you’re the interviewee)  
- First, check if the array has fewer than 3 elements. If so, it’s impossible to find a value that is both not the minimum or maximum (since only two different values).
- For arrays of size ≥ 3, find the minimum and maximum values.
- Return the first element in the array that is not equal to the minimum or the maximum.  
- This approach is simple and efficient: it requires one pass to find min/max, and another pass to find a valid candidate (but can even be done in a single pass or optimized further).
- Alternatively, for the simplest implementation, we can just sort the array and pick any value except the first and last, since all values are distinct.

### Corner cases to consider  
- Array has length < 3 (must return -1).
- Array is exactly size 3 (exactly one element is neither min nor max).
- All elements are distinct, but the middle elements in a sorted order must be considered.
- Large arrays (should still work efficiently due to the small constraint, n ≤ 100).
- Negative test: array contains numbers such that only min and max are present (test: [1,100]).

### Solution

```python
def findNonMinOrMax(nums):
    # If the array has less than 3 elements, it's impossible
    if len(nums) < 3:
        return -1

    # Find the minimum and maximum in the array
    min_val = nums[0]
    max_val = nums[0]
    for num in nums[1:]:
        if num < min_val:
            min_val = num
        elif num > max_val:
            max_val = num

    # Return the first value that is not min or max
    for num in nums:
        if num != min_val and num != max_val:
            return num

    # If somehow no such value (should not happen if len(nums) >= 3), return -1
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass to find min/max, one pass to search for a valid value (or can be done in a single pass). For n ≤ 100, this is efficient.
- **Space Complexity:** O(1) — Just uses a few variables, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- Ask: What if the numbers were not distinct?  
  *Hint: How would you avoid picking another minimum or maximum? Should you count all values or only unique?*

- If you needed to return all possible values that are neither min nor max?  
  *Hint: Add results to a list and return all non-min and non-max elements.*

- Can you do it in a single pass?  
  *Hint: Track min and max as you iterate, simultaneously skipping them on the go.*

### Summary
This question tests basic **array traversal and element filtering** logic. The core pattern is simple linear search with filtering conditions.  
It’s a foundational type of question that comes up whenever you must exclude certain boundary values from consideration, which is a common constraint filtering pattern in coding interviews.


### Flashcard
If array has <3 elements, return -1; else, find any element that is neither min nor max—can be done in one pass.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Third Maximum Number(third-maximum-number) (Easy)