### Leetcode 80 (Medium): Remove Duplicates from Sorted Array II [Practice](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii)

### Description  
Given a sorted integer array, *remove extra duplicates in-place* such that **each unique element appears at most twice** (i.e., up to two copies are allowed).  
You must modify the array in-place so that after removal, the first `k` elements of the array hold the result, and return `k` (the new length).  
**No extra space** other than O(1) is allowed, and the order of elements must be preserved.

For example, if you receive `[1,1,1,2,2,3]`, you should transform it to `[1,1,2,2,3]` (order preserved, max 2 of each).

### Examples  

**Example 1:**  
Input: `[1,1,1,2,2,3]`  
Output: `5`  
*Explanation: '1' occurs three times, so one is removed; array becomes `[1,1,2,2,3]`.*

**Example 2:**  
Input: `[0,0,1,1,1,1,2,3,3]`  
Output: `7`  
*Explanation: Keep two 0's and two 1's; the array becomes `[0,0,1,1,2,3,3]`.*

**Example 3:**  
Input: `[1,2,3]`  
Output: `3`  
*Explanation: Each number appears once; nothing removed.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For each number, count occurrences. If a number appears more than twice, remove extras by shifting following elements left.
  - But this is inefficient (O(n²)) due to repeated shifting and not allowed in O(1) extra space.

- **Optimal two-pointer approach:**  
  - Utilize the fact that the array is sorted, so duplicates are adjacent.
  - Use **two pointers**:  
    - `i` iterates through the array.
    - `k` marks next position to be written if valid.
  - Allow the first two elements automatically.
  - For each element at `i >= 2`, compare with element at position `k-2`.  
    - If different, the current element can be written at `k` (duplicate count ≤ 2).
    - Increment `k` accordingly.
  - In-place and O(n), no extra space, just pointer manipulation.

- **Why this approach:**  
  - No extra storage (meets problem constraints).
  - Simple, single scan, directly updates input array.

### Corner cases to consider  
- Empty array (`[]`): output should be 0.
- Array of length 1 or 2: nothing needs to be removed.
- All elements identical, e.g. `[1,1,1,1,1]`.
- No duplicates, e.g. `[1,2,3,4]`.
- Duplicates scattered, not adjacent (not possible in a sorted array, but good to think for unsorted variants).

### Solution

```python
def removeDuplicates(nums):
    # Pointer for the place to write valid elements
    k = 0
    # Traverse through the array
    for num in nums:
        # Allow the first 2 elements unconditionally
        # and any non-overduplicate (not equal to nums[k-2])
        if k < 2 or num != nums[k - 2]:
            nums[k] = num
            k += 1
    return k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - We traverse the array once, and each operation takes O(1), so total O(n).

- **Space Complexity:** O(1)  
  - Solution is fully in-place. No extra data structures are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **at most three** duplicates were allowed?  
  *Hint: How would you generalize the pointer check from 2 to `k`?*

- How would you solve this if the array was **not sorted**?  
  *Hint: Can you do it in O(n) space? Is in-place possible?*

- Could you do this if only **one duplicate** per element (max 1 occurrence) is allowed?  
  *Hint: What is similar/different when compared to this problem?*

### Summary
This problem uses the **two-pointer pattern**—especially effective for sorted arrays when we need to modify in-place under O(1) memory constraints.  
This pattern appears often in remove duplicates/partitioning/sorted list manipulation problems, such as "Remove Duplicates from Sorted Array" (Leetcode 26) and "Move Zeroes." The control over allowed duplicate count (at most twice here) is easily generalized to any k.


### Flashcard
Use two pointers to overwrite extra duplicates in-place, allowing at most two occurrences of each number in the sorted array.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Remove Duplicates from Sorted Array(remove-duplicates-from-sorted-array) (Easy)