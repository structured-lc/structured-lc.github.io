### Leetcode 26 (Easy): Remove Duplicates from Sorted Array [Practice](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

### Description  
You are given a sorted integer array `nums`. You need to **remove duplicates in-place** so that each unique element appears only once—keeping the relative order of the elements the same.  
Instead of creating a new array, **modify `nums` in-place**, using constant extra memory.  
Finally, return the number of unique elements (`k`). After calling your function, the first `k` elements of `nums` should hold the unique values, but anything after `k` can be any value and doesn't matter.

### Examples  

**Example 1:**  
Input: `nums = [1, 1, 2]`  
Output: `2, nums = [1, 2, _]`  
*Explanation: The function returns 2, and the first two elements of nums are 1 and 2. The underscore means any value can be there.*

**Example 2:**  
Input: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`  
Output: `5, nums = [0, 1, 2, 3, 4, ...]`  
*Explanation: The function returns 5, and the first five elements of nums after removing duplicates are 0,1,2,3,4. The rest can be ignored.*

**Example 3:**  
Input: `nums = [2, 2, 2, 2]`  
Output: `1, nums = [2]`  
*Explanation: Only the first element remains unique.*

### Thought Process (as if you’re the interviewee)  
Since the array is already sorted, **duplicates are always adjacent**.  
The brute-force approach would be to loop through from the right and remove elements if they are equal to their predecessor, but removing elements (pop, del) has poor performance (\(O(n^2)\)).  
An optimized approach is to use the **two pointers** pattern:
- Use one pointer (`i`) to keep track of the spot for the next unique element.
- The other pointer (`j`) scans through the array.
- Whenever `nums[j]` is different from the last unique (`nums[i-1]`), copy `nums[j]` to `nums[i]` and increment `i`.
- This way, all unique elements are moved up to the front in a single pass, and the order is preserved.

This is optimal—**O(n)** time, **O(1)** extra space, and it straightforwardly leverages the sorted property.

### Corner cases to consider  
- Empty array: `nums = []`
- Array with one element: `nums = [x]`
- All elements are the same: `nums = [1, 1, 1]`
- No duplicates at all: `nums = [1, 2, 3]`
- Large array, alternating duplicates: `nums = [1,1,2,2,3,3,...]`

### Solution

```python
def removeDuplicates(nums):
    # If empty, nothing to do
    if not nums:
        return 0

    # 'i' is the next unique write index
    i = 1

    # Start 'j' from second element
    for j in range(1, len(nums)):
        # If this is a new unique element
        if nums[j] != nums[i - 1]:
            nums[i] = nums[j]
            i += 1

    return i
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each element is visited once. The inner logic is constant time per step; no nested loops.
- **Space Complexity:** O(1). Only a constant number of pointers/indices are used regardless of input size. The input array is modified in place and no extra arrays or significant data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **duplicates are allowed at most twice** in the output?
  *Hint: Consider keeping a count and only moving elements up if count ≤ 2.*
- How would this change if the **array was not sorted**?
  *Hint: Removing duplicates in-place without sorting is much harder; consider set+index combos but O(n²) in worst case.*
- Can you do this for a **linked list** instead of an array?
  *Hint: Traverse the list, keeping a reference to the previous node and deleting duplicates as you find them.*

### Summary
This is a classic example of the **two pointers** technique, specifically optimized for problems involving in-place modification of **sorted arrays**. This pattern shows up frequently for array problems involving "compressing" or "removing" data in-place, and can also be adapted for variants where you keep more than one occurrence or have more complex conditions on what to keep. The key insight here is to use the input's sorted property to efficiently tell when to move unique elements forward and keep the output order unchanged.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Remove Element(remove-element) (Easy)
- Remove Duplicates from Sorted Array II(remove-duplicates-from-sorted-array-ii) (Medium)
- Apply Operations to an Array(apply-operations-to-an-array) (Easy)
- Sum of Distances(sum-of-distances) (Medium)