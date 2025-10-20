### Leetcode 283 (Easy): Move Zeroes [Practice](https://leetcode.com/problems/move-zeroes)

### Description  
Given an array of integers `nums`, **move all zeroes to the end** of the array while maintaining the relative order of the non-zero elements. The operation must be done **in-place** (without copying to another array), and with the minimum number of operations.  
For example, `[0, 1, 0, 3, 12]` should become `[1, 3, 12, 0, 0]`—all non-zero elements stay in their original order, and all zeros are moved to the end.

### Examples  

**Example 1:**  
Input: `[0, 1, 0, 3, 12]`  
Output: `[1, 3, 12, 0, 0]`  
*Explanation: Move the first 1 left, skip 0, move 3, move 12. Place zeros at the end.*

**Example 2:**  
Input: ``  
Output: ``  
*Explanation: Only one element; nothing changes.*

**Example 3:**  
Input: `[1, 2, 3]`  
Output: `[1, 2, 3]`  
*Explanation: No zeros present; the array stays the same.*


### Thought Process (as if you’re the interviewee)  

First, I’d clarify: Must we preserve the order of non-zeros? Yes. Should this be done in-place? Yes—no new array.

**Brute-force Idea:**  
- Create a new array, copy over all non-zeros, then fill zeros at end.  
- Drawback: This needs extra O(n) space, and the problem restricts us to modify in-place.

**In-place Approach (Optimal):**  
- Use two pointers: one to track the position to insert non-zeros, and the other to iterate through the array.
- When you encounter a non-zero, swap (or overwrite) it into the next "filled" position.
- After processing, fill the rest with zeros if necessary.
- This preserves non-zero order and minimizes write operations, all in O(n) time, O(1) space.

**Why use this approach?**  
- One scan for positioning non-zero elements, then another for filling zeros (or do it in one pass by swapping).
- Fewer overwrites, preserves stability (relative order), meets all constraints.

### Corner cases to consider  
- **Empty array:** `[]`
- **All zeros:** `[0,0,0]`
- **No zeros:** `[1,2,3,4]`
- **Zero(s) at beginning, middle, or end:** `[0,1,2]`, `[1,0,2,3,0,4]`, `[1,2,3,0,0]`
- **Single element (zero or non-zero):** ``, `[5]`

### Solution

```python
def moveZeroes(nums):
    """
    Modify nums in-place so that all zeros are moved to the end,
    maintaining the relative order of non-zero elements.
    """
    # Pointer for position of the next non-zero element
    insert_pos = 0
    
    # Move all non-zero elements forward
    for num in nums:
        if num != 0:
            nums[insert_pos] = num
            insert_pos += 1

    # Fill remaining positions with zero
    while insert_pos < len(nums):
        nums[insert_pos] = 0
        insert_pos += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each element at most twice (once to copy non-zeros, once to fill zeros).
- **Space Complexity:** O(1) — The array is modified in-place, using only a few extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you minimize the number of write operations (i.e., only swap if the numbers are in different positions)?  
  *Hint: Implement with explicit checking—only assign/swap if the two indices are different.*

- What if you could use extra space?  
  *Hint: You can collect non-zeros in a new list, then concatenate zeros.*

- What if the array is immutable?  
  *Hint: Return a new list rather than modifying the input.*

### Summary

We used the **two-pointer technique** ("slow and fast pointer") to move all non-zero values forward, and then filled the remaining positions with zero.  
This in-place pattern avoids extra space usage and preserves the relative order efficiently.  
It’s a typical "stable partition" or "array manipulation" problem—this idea is broadly useful in removing/segregating values in-place, such as in Remove Element, Partition List, and Dutch National Flag problems.


### Flashcard
Two-pointer technique: iterate with one pointer, use another to track next non-zero insertion position, then fill remaining with zeros.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Remove Element(remove-element) (Easy)
- Apply Operations to an Array(apply-operations-to-an-array) (Easy)