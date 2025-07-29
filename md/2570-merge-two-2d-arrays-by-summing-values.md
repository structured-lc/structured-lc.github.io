### Leetcode 2570 (Easy): Merge Two 2D Arrays by Summing Values [Practice](https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values)

### Description  
Given two sorted 2D arrays `nums1` and `nums2`, each containing unique integer pairs `[id, val]`, merge them into a single 2D array sorted by `id`. For each unique `id` present in either array, include a single entry `[id, total]` in the output, where `total` is the sum of the values from both arrays (treat as 0 if the `id` only exists in one array).

### Examples  

**Example 1:**  
Input: `nums1 = [[1,2],[2,3],[4,5]]`, `nums2 = [[1,4],[3,2],[4,1]]`  
Output: `[[1,6],[2,3],[3,2],[4,6]]`  
*Explanation: ids 1 and 4 exist in both arrays, so sum their values; 2 only in nums1, 3 only in nums2.*

**Example 2:**  
Input: `nums1 = [[2,4],[3,6],[5,5]]`, `nums2 = [[1,3],[4,3]]`  
Output: `[[1,3],[2,4],[3,6],[4,3],[5,5]]`  
*Explanation: No overlapping ids. All are included in sorted order.*

**Example 3:**  
Input: `nums1 = [[1,10]]`, `nums2 = [[2,5]]`  
Output: `[[1,10],[2,5]]`  
*Explanation: Each id is unique and simply added.*

### Thought Process (as if you’re the interviewee)  

The problem is very similar to the merge phase of merge sort. Both arrays are sorted by `id`, and within each array, every `id` is unique. That means we can use two pointers to walk through both arrays in one pass:

- Compare the current `id` at each pointer:
  - If `id1 == id2`, add their values, put the merged pair in the result, advance both pointers.
  - If `id1 < id2`, add (`id1`, value) to the result, advance `nums1` pointer.
  - If `id2 < id1`, add (`id2`, value) to result, advance `nums2` pointer.
- If we reach the end of one array, append the rest of the other array.
  
This way, we avoid using dictionaries and keep time and space efficient.  
This two-pointer technique leverages the sorted property and ensures a single linear pass.

### Corner cases to consider  
- One or both arrays are empty.
- No overlapping `id` values at all.
- All `id` values overlap.
- Arrays of different lengths.
- Only one element in one or both arrays.
- Non-consecutive ids.

### Solution

```python
def mergeArrays(nums1, nums2):
    # Initialize two pointers for both arrays
    i, j = 0, 0
    res = []

    # Loop until at least one array is done
    while i < len(nums1) and j < len(nums2):
        id1, val1 = nums1[i]
        id2, val2 = nums2[j]

        if id1 == id2:
            # If ids match, sum the values
            res.append([id1, val1 + val2])
            i += 1
            j += 1
        elif id1 < id2:
            # Add the smaller id from nums1
            res.append([id1, val1])
            i += 1
        else:
            # Add the smaller id from nums2
            res.append([id2, val2])
            j += 1

    # Append remaining elements from nums1 (if any)
    while i < len(nums1):
        res.append(nums1[i])
        i += 1

    # Append remaining elements from nums2 (if any)
    while j < len(nums2):
        res.append(nums2[j])
        j += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n₁ + n₂), where n₁ = len(nums1), n₂ = len(nums2).  
  Each element of both arrays is visited once, so total operations are linear in the combined size.
- **Space Complexity:** O(n₁ + n₂).  
  The result array stores at most n₁ + n₂ pairs (one per unique id).  
  No extra map or data structure needed—just the output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays were not sorted?
  *Hint: Would you use hashing or sorting first?*

- What if ids could appear multiple times in a single array?
  *Hint: How would you preprocess, or would you need to use a dictionary?*

- How would this change if the array elements were very large?
  *Hint: Can you process in streaming fashion, or must entire arrays fit into memory?*

### Summary
This problem is a classic application of the **two-pointer merge pattern**—a staple for handling two sorted arrays. Such logic applies to interval merging, sorted list intersections, and is a core part of merge sort. The sorted property is crucial and enables single-pass, in-place merging for optimal efficiency.