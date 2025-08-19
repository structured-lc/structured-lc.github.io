### Leetcode 154 (Hard): Find Minimum in Rotated Sorted Array II [Practice](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii)

### Description  
You’re given an array of integers that was originally sorted in non-decreasing order, but then rotated at some pivot. For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`. The array might contain duplicate values. Your task is to find the minimum element in the array efficiently.  
You cannot assume the number of rotations or where the rotation occurs.  
Duplicates add an extra challenge because classical binary search may become ambiguous at some steps.

### Examples  

**Example 1:**  
Input: `[2,2,2,0,1]`  
Output: `0`  
*Explanation: The smallest value is at position 3 after a rotation. Even with duplicates, we locate the minimum by reducing the search space using binary search-like logic.*

**Example 2:**  
Input: `[1,3,5]`  
Output: `1`  
*Explanation: The array is either not rotated or rotated by n; the minimum is at the beginning.*

**Example 3:**  
Input: `[2,2,2,2,2,2,2]`  
Output: `2`  
*Explanation: All elements are the same, so any index holds the minimal value.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Scan every element, keeping track of the minimum. This is O(n), but not leveraging that the input is almost sorted except for rotation.
- **Optimized:** The sorted & rotated property allows for a *modified* binary search.  
    - If the mid element is less than the rightmost, the min must be at mid or before (right = mid).
    - If mid is greater than rightmost, the min is after mid (left = mid + 1).
    - If mid equals rightmost, we can't tell, so reduce search space conservatively (right -= 1).
- Duplicates force us to sometimes fall back from O(log n) to O(n) in worst cases, but in practice, it’s rarely degenerate.

### Corner cases to consider  
- Single element array: `[3]`
- Two element, rotated: `[2,1]`
- Array with all equal elements: `[1,1,1,1]`
- No rotation: `[1,2,3,4,5]`
- Rotation at various points, with or without duplicates
- Very large arrays, worst case all identical

### Solution

```python
def findMin(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = left + (right - left) // 2
        # If middle is less, min must be on left side or mid
        if nums[mid] < nums[right]:
            right = mid
        # If middle is greater, min must be on right side
        elif nums[mid] > nums[right]:
            left = mid + 1
        # If equal, we reduce right, can't decide where min is
        else:
            right -= 1
    return nums[left]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Best/typical: O(log n), as the binary search halves the space.
  - Worst case: O(n), if many duplicates cause repeated reductions right -= 1 (e.g., `[1,1,1,1,0,1,1,1]`).
- **Space Complexity:** O(1), as we only use a few pointers and no recursion or auxiliary data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array elements are all unique?  
  *Hint: Can you guarantee O(log n) performance?*

- Could you modify the algorithm to return the index of the minimum as well?  
  *Hint: Track left when the loop finishes, that’s the index.*

- How would performance change for very large N with mostly duplicate values?  
  *Hint: Worst-case could approach O(n), discuss histogram test case.*

### Summary
This problem showcases the *binary search in rotated sorted arrays* pattern, with additional care for handling duplicates.  
The approach balances O(log n) efficiency with a fallback to O(n) in degenerate cases, making it a robust template for any rotated-with-duplicates scenario.  
Similar logic applies to search/insert in rotated arrays and problems like "search in rotated sorted array II."

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Find Minimum in Rotated Sorted Array(find-minimum-in-rotated-sorted-array) (Medium)