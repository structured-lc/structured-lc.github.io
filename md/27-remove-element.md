### Leetcode 27 (Easy): Remove Element [Practice](https://leetcode.com/problems/remove-element)

### Description  
You’re given an array of integers (**nums**) and an integer (**val**). Your task is to remove all occurrences of **val** from the array, doing it *in-place* (without allocating extra array storage).  
The function should return the number of remaining elements that are not equal to **val**, and the first **k** elements of **nums** (for returned **k**) can be in any order. The contents past **k** are irrelevant.

### Examples  

**Example 1:**  
Input: `nums = [3, 2, 2, 3]`, `val = 3`  
Output: `2`  
*Explanation: All elements equal to 3 are removed. The array becomes [2, 2, _, _]. 2 elements remain.*

**Example 2:**  
Input: `nums = [0,1,2,2,3,0,4,2]`, `val = 2`  
Output: `5`  
*Explanation: All 2's are removed. The array could be [0,1,3,0,4,_,_,_]. 5 elements remain.*

**Example 3:**  
Input: `nums = [1]`, `val = 1`  
Output: `0`  
*Explanation: The only element is removed. The array becomes [_,]. 0 elements remain.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Loop over the array and delete each occurrence of **val**. But deleting/inserting in a list inside a loop is inefficient (O(n²)).

- **Optimized Approach:**  
  Since in-place removal is needed and order doesn't matter, a **two-pointer** technique can be applied:
  - Maintain a `write` index (pointer) which tracks the position to overwrite next.
  - Iterate through the array; when an element isn’t **val**, copy it to `nums[write]` and increment `write`.  
  - By the end, the first `write` (let’s call it `k`) elements are all non-**val** elements and the rest are ignored.
  - This achieves O(n) time and O(1) extra space.

- **Why choose this:**  
  - Avoids repeated shifting/deleting of elements.
  - No need to allocate extra storage.
  - Order after `k` doesn’t matter, so overwriting is allowed.
  - Aligns with typical "two pointers" interview patterns.

### Corner cases to consider  
- nums is empty (should return 0).
- No element equals **val** (array unchanged, return n).
- All elements are **val** (should return 0).
- Only one element (could be equal or not equal to **val**).
- Multiple occurrences scattered or consecutive.

### Solution

```python
def removeElement(nums, val):
    # write points to the next position to fill if nums[i] is not val
    write = 0
    for read in range(len(nums)):
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1
    return write
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Every element in nums is visited once.
  - Each non-val element may be copied at most once.

- **Space Complexity:** O(1)
  - Only a few variables used for pointers; the removal is entirely in-place with no extra storage.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this if the array is immutable?
  *Hint: What would you need to change if you *can't* overwrite elements?*
  
- What if you needed to preserve the order of non-val elements?
  *Hint: Does this tweak the approach above, or is it the same?*
  
- How would you modify if asked to return the modified array, not just the count?
  *Hint: Should your function return a slice, or something else?*

### Summary
This problem uses the **two pointers** (read/write) pattern for in-place array manipulation. It’s a standard, efficient coding technique used when overwriting or compressing elements within arrays while minimizing space usage. Similar patterns appear in problems like **Remove Duplicates from Sorted Array**, **Move Zeroes**, and general in-place filtering problems.


### Flashcard
Use a write pointer to overwrite elements not equal to val as you scan; final write index gives new length after in-place removals.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Remove Duplicates from Sorted Array(remove-duplicates-from-sorted-array) (Easy)
- Remove Linked List Elements(remove-linked-list-elements) (Easy)
- Move Zeroes(move-zeroes) (Easy)