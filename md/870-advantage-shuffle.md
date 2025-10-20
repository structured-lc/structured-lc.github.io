### Leetcode 870 (Medium): Advantage Shuffle [Practice](https://leetcode.com/problems/advantage-shuffle)

### Description  
Given two equal-length arrays, **nums1** and **nums2**, you are allowed to reorder the elements in **nums1** to maximize the "advantage" over **nums2**. For each index \(i\), if nums1[i] > nums2[i], nums1 is considered to have an advantage at that index. The goal is to rearrange **nums1** such that the total number of indices \(i\) with nums1[i] > nums2[i] is maximized. Return any permutation of **nums1** that achieves this.

### Examples  

**Example 1:**  
Input: `nums1 = [2,7,11,15]`, `nums2 = [1,10,4,11]`  
Output: `[2,11,7,15]`  
*Explanation: Sorted nums1 = [2,7,11,15], sorted nums2 = [1,4,10,11]. Assign the smallest possible nums1 that can beat each nums2. Assign 2→1, 7→4, 11→10, and 15→11, then place these in the original order of nums2.*

**Example 2:**  
Input: `nums1 = [12,24,8,32]`, `nums2 = [13,25,32,11]`  
Output: `[24,32,8,12]`  
*Explanation: Sorted nums1 = [8,12,24,32], sorted nums2 = [11,13,25,32]. Assign 8→11 (beats), 12→13 (beats), 24→25 (loses, so save for last), 32→32 (loses, so save for last). Remaining nums1 values are used for nums2 slots where a win wasn't possible.*

**Example 3:**  
Input: `nums1 = [1,1,1,1]`, `nums2 = [2,2,2,2]`  
Output: `[1,1,1,1]`  
*Explanation: No value in nums1 can beat any in nums2, so any permutation is valid.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach — try all possible permutations of nums1 and for each, count how many indices have nums1[i] > nums2[i]. This is O(n!) and not feasible for large n.

Optimize by observing:  
- For each nums2[i], to maximize our "wins," we should use the smallest nums1 that can beat nums2[i].  
- If nums1 cannot beat a particular nums2[i], sacrifice the smallest available nums1 by matching it with the largest nums2[i] left.

This suggests a **greedy** two-pointer approach:
- Sort nums1 and keep a sorted list of (value, index) pairs for nums2.
- Use two pointers for nums1: one from the start (smallest) and one from the end (largest).
- For each nums2 (from largest to smallest):  
    - If the largest remaining nums1 can beat current nums2, assign it.
    - Otherwise, assign the smallest nums1 (sacrifice) to that position.

Assign back to the original indices of nums2.

### Corner cases to consider  
- Arrays of length 1.
- All elements equal in nums1 and nums2.
- All elements in nums1 smaller than in nums2.
- All elements in nums1 larger than in nums2.
- Duplicates in input arrays.
- Empty arrays.

### Solution

```python
def advantageCount(nums1, nums2):
    # Sort nums1 for two-pointer traversal
    nums1_sorted = sorted(nums1)
    n = len(nums1)
    # Pair each value in nums2 with its index, then sort by value
    nums2_pairs = sorted([(val, i) for i, val in enumerate(nums2)])
    
    # Result array, filled as we reassign values from nums1
    result = [0] * n
    # Two pointers for the nums1 array
    left, right = 0, n - 1

    # Traverse through the sorted nums2 in descending order
    for val, idx in reversed(nums2_pairs):
        # If the largest available in nums1 can beat current nums2 value
        if nums1_sorted[right] > val:
            result[idx] = nums1_sorted[right]
            right -= 1
        else:
            # Can't win: assign the smallest available (sacrifice)
            result[idx] = nums1_sorted[left]
            left += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting nums1, O(n log n) for sorting nums2 with indices, O(n) for single pass assignment. Overall: **O(n log n)**
- **Space Complexity:** O(n) for result array, O(n) for auxiliary sorting and pairing arrays; does not modify input arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums1 and nums2 can have different lengths?  
  *Hint: How would you handle left-over elements or missing targets?*

- Does this guarantee the lexicographically smallest permutation if multiple answers exist?  
  *Hint: Could you alter tie-breaking to achieve lexicographical order?*

- How would you prove that the greedy approach always maximizes the advantage?  
  *Hint: Consider what happens if you try to "outsmart" the two-pointer assignment.*

### Summary
This problem uses the **greedy two-pointer** pattern, common in scheduling and assignment-type questions. By assigning the smallest winning value where possible and sacrificing elsewhere, it maximizes the win count efficiently. This is a classic approach that’s also useful for interval scheduling, "matching" problems, and optimal resource allocation.


### Flashcard
Sort both arrays; greedily assign the smallest nums1 that beats each nums2, or sacrifice the smallest nums1 for the largest nums2 left.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
