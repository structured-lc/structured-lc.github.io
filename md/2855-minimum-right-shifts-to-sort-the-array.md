### Leetcode 2855 (Easy): Minimum Right Shifts to Sort the Array [Practice](https://leetcode.com/problems/minimum-right-shifts-to-sort-the-array)

### Description  
Given a 0-indexed array of length \( n \) containing **distinct positive integers**, you are to determine the *minimum* number of times you need to perform a right shift operation to get the array sorted in ascending order.  
A right shift takes the last element and moves it to the front, while shifting all other elements right by 1.  
If it is **impossible** to sort the array this way, return -1.

### Examples  

**Example 1:**  
Input: `[3,4,5,1,2]`  
Output: `2`  
*Explanation:*
- First right shift: `[2,3,4,5,1]`
- Second right shift: `[1,2,3,4,5]` (sorted after 2 shifts)

**Example 2:**  
Input: `[1,3,5]`  
Output: `0`  
*Explanation:*
- The array is already sorted, so 0 shifts needed.

**Example 3:**  
Input: `[2,1,4]`  
Output: `-1`  
*Explanation:*
- No number of right shifts can make the array sorted in ascending order.

### Thought Process (as if you’re the interviewee)  

First, let's define a "right shift" for interview clarity: it's a cyclic rotation of the array, bringing the last element to the front.  

- **Brute force:** Try every possible number of right shifts (from 0 up to n-1), performing each shift and checking if the array is sorted. This is O(n²), which is slow for large n.

- **Optimization:**  
  - Notice: Performing n right-shifts brings the array back to the original state.
  - If an array can be sorted by right shifts, the sorted order must correspond to a rotation of the original array.
  - In other words: if you *concatenate* the array to itself (`nums + nums`), the sorted array must appear as a subarray.
  - More concretely, if the array has exactly one "drop" (where nums[i] > nums[i+1]), it can be rotated into a sorted array. If there is more than one "drop," it's impossible.
  - The answer is then (array length - index after the drop) % n, or 0 if already sorted (no drop).

- **Why this approach:**  
  - O(n) single pass.
  - Minimal extra space.
  - Works due to properties of cyclically shifted sorted arrays with distinct elements.

### Corner cases to consider  
- Empty array (not allowed by constraints, but check if needed).
- Array already sorted → 0 shifts.
- Array sorted in descending order → impossible, return -1.
- Array with single element → 0 shifts.
- "Drop" at the end and not at the start → needs to wrap around.
- More than one "drop" → impossible.
- Arrays with all elements distinct but not in any rotated sorted order.

### Solution

```python
def minimum_right_shifts(nums):
    n = len(nums)
    # count "drops" (where nums[i] > nums[i+1])
    drops = 0
    drop_index = -1
    
    for i in range(n):
        if nums[i] > nums[(i + 1) % n]:
            drops += 1
            drop_index = i
    
    if drops == 0:
        # already sorted
        return 0
    if drops == 1:
        # Can rotate to be sorted by (n - drop_index - 1) shifts
        return n - drop_index - 1
    return -1  # more than one drop, impossible
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Single pass through the array to count drops.
- **Space Complexity:** O(1)  
  - Only a few variables used; no extra structures created.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this problem if some elements are equal instead of all being distinct?  
  *Hint: How does equality affect the definition of a "drop"?*

- What if you are allowed *left* shifts instead of right?  
  *Hint: Does the direction of shift affect correctness?*

- How would you print the sorted array after the minimum shifts rather than just returning the number?  
  *Hint: Use slicing with the right rotation count.*

### Summary
This problem uses the **single pass** and **rotation** pattern, exploiting the fact that sorting by right shifts is only possible if the array is a rotated sorted array (at most one "drop"). The key insight is reducing the check to O(n) by counting breaks in monotonic increase, a technique applicable to similar "rotated array" problems.