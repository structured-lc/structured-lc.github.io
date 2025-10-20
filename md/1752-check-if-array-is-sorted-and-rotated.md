### Leetcode 1752 (Easy): Check if Array Is Sorted and Rotated [Practice](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated)

### Description  
Given an integer array, check if it can be formed by taking a non-decreasing **sorted** array and rotating it some non-negative number of times. Rotating means moving elements from the front to the back, preserving their order (e.g., [1,2,3,4,5] rotated 2 times is [3,4,5,1,2]). The task: return True if the input array meets this property, False otherwise.  
Duplicates are allowed. A purely sorted array (i.e., rotated 0 times) should also return True.

### Examples  

**Example 1:**  
Input: `[3, 4, 5, 1, 2]`  
Output: `True`  
*Explanation: The original sorted array [1,2,3,4,5] was rotated 3 times to get [3,4,5,1,2]. Only one "drop" is observed, from 5→1.*

**Example 2:**  
Input: `[2, 1, 3, 4]`  
Output: `False`  
*Explanation: The original sorted array would be [1,2,3,4], but rotating it in any way can never result in [2,1,3,4]. There are two drops: 2→1 and 4→2 (since the array checks wrap-around).*

**Example 3:**  
Input: `[1,1,1]`  
Output: `True`  
*Explanation: All elements are equal, so the array is trivially sorted and any rotation is allowed. No drops exist.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force solution is to try all possible rotations and check if any of them is sorted. For each rotation, move the prefix to the back and check the result – but this is O(n²).

However, we notice a key property: In a rotated **sorted** array, moving from left to right, the numbers should always increase or stay the same, **except for at most one position** where it drops (where the rotation "break" happens). If we traverse the array, counting the number of times nums[i] > nums[(i+1)%n], there should be at most one such drop for a valid rotated sorted array.

Thus, iterate through the array once, count drops, and return True if the count is ≤ 1.  
This approach is O(n) and doesn’t require extra space.

### Corner cases to consider  
- Empty array (not specified, but often assumed not possible)
- All elements are equal: `[2,2,2]`
- Already sorted without rotation: `[1,2,3,4]`
- Single-element: `[4]`
- Drops at the end, i.e., wrap-around: `[2,3,4,1]`
- Drop at the beginning: `[4,1,2,3]`
- Two drops: `[3,1,2,4]` → should be False
- Strictly decreasing: `[4,3,2,1]` → should be False

### Solution

```python
def check(nums):
    n = len(nums)
    drops = 0  # count positions where nums[i] > nums[(i+1)%n]
    for i in range(n):
        next_i = (i + 1) % n  # wrap-around for circular check
        if nums[i] > nums[next_i]:
            drops += 1
            # More than one drop => not a sorted and rotated array
            if drops > 1:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We check each adjacent element in a single pass through the array.
- **Space Complexity:** O(1) — Only a few integer variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if the problem asks for "strictly increasing" (no duplicates allowed in sorted array)?
  *Hint: What changes in the drop condition if duplicates aren't permitted?*

- Can you find the minimal number of rotations that would sort the array?
  *Hint: Where is the smallest element? That indicates the rotation point.*

- What if the array is extremely large and stored in a distributed environment?
  *Hint: Can you process segments in parallel and combine intermediary results?*

### Summary
This problem uses the classic **rotation point** pattern—detecting the number of "drops" (where order breaks) in a circular array. The single-pass, constant-space approach is optimal. Such logic is also useful for searching in rotated sorted arrays and for problems on periodicity or array wrap-around. This is a common interview pattern for array rotation and order-checking.


### Flashcard
Check if the array is non-decreasing with at most one drop (where nums[i] > nums[i+1]); if drops > 1, it’s not a rotated sorted array.

### Tags
Array(#array)

### Similar Problems
- Check if All A's Appears Before All B's(check-if-all-as-appears-before-all-bs) (Easy)