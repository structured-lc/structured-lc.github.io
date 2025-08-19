### Leetcode 153 (Medium): Find Minimum in Rotated Sorted Array [Practice](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array)

### Description  
Given a **sorted array** of distinct integers that has been **rotated** an unknown number of times (from 1 up to n where n is the array length), find the **minimum element**.  
A rotation means elements are shifted right, with the end wrapping around to the front.  
You need to find this minimum in O(log n) time, suggesting a binary search approach. No duplicates exist in the array.

### Examples  

**Example 1:**  
Input: `[4,5,6,7,0,1,2]`  
Output: `0`  
*Explanation: The array was `[0,1,2,4,5,6,7]` originally. It's been rotated 4 times, so the minimum is now at index 4.*

**Example 2:**  
Input: `[3,4,5,1,2]`  
Output: `1`  
*Explanation: The original sorted array `[1,2,3,4,5]` has been rotated three times, making 1 the minimum and at index 3.*

**Example 3:**  
Input: `[11,13,15,17]`  
Output: `11`  
*Explanation: No rotation happened (or rotated n times), so the minimum is the first element.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Linear scan the entire array and keep track of the minimum element.  
  - Time complexity: O(n) — not efficient for large arrays.

- **Optimized (Binary Search):**  
  - Since the array was sorted and then rotated, there are two sorted subarrays—one before the minimum, one after.
  - If the array is not rotated, the first element is the smallest.
  - Use binary search:
    - Compare `nums[mid]` with `nums[high]`.
      - If `nums[mid]` > `nums[high]`, the minimum is in the right half (excluding mid).
      - If `nums[mid]` < `nums[high]`, the minimum is at mid or in the left half.
    - Shift `low` and `high` accordingly.
  - Stop when `low == high`; the minimum is at that index.
  - This approach ensures O(log n) time.

### Corner cases to consider  
- Single element array: ``
- Already sorted and not rotated: `[1,2,3,4,5]`
- Rotated at every possible valid index, e.g., for `[1,2,3,4,5]`: `[5,1,2,3,4]`, `[2,3,4,5,1]`, etc.
- Rotation count equal to length (full rotation): original sorted array.
- Empty array (should not happen based on constraints but good to handle defensively).
- All large elements except one small minimum located anywhere in the array.

### Solution

```python
def findMin(nums):
    # Set initial pointers for binary search
    low, high = 0, len(nums) - 1
    
    # Edge case: if array is empty, handle explicitly (not required by problem constraints)
    if not nums:
        return None

    # Binary search for minimum
    while low < high:
        mid = (low + high) // 2
        # If mid element is greater than the rightmost, min must be to the right
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            # Otherwise, min is at mid or to the left
            high = mid
    # When low == high, we've found the minimum
    return nums[low]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(log n): Each iteration of binary search halves the search space.

- **Space Complexity:**  
  O(1): Only a constant number of pointers used, no additional data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could have **duplicate elements**?  
  *Hint: How does this affect the decision-making in binary search? You may need to handle the `nums[mid] == nums[high]` case separately.*

- Can you return the **index** of the minimum instead of just the value?  
  *Hint: Instead of returning `nums[low]`, return `low`.*

- How does this binary search compare to the classic find target in rotated sorted array problem?  
  *Hint: What do you do differently when searching for a specific value instead of the minimum?*

### Summary
- This is a classic use-case for the **Binary Search** pattern, specifically suited for arrays that are rotated sorted.
- The key insight is that one half of the array is always sorted, and binary search efficiently eliminates half the array each step.
- The same approach is useful for searching for elements in rotated arrays and handling a variety of sorted/rotated array problems.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Search in Rotated Sorted Array(search-in-rotated-sorted-array) (Medium)
- Find Minimum in Rotated Sorted Array II(find-minimum-in-rotated-sorted-array-ii) (Hard)