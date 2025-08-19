### Leetcode 2164 (Easy): Sort Even and Odd Indices Independently [Practice](https://leetcode.com/problems/sort-even-and-odd-indices-independently)

### Description  
Given an integer array, rearrange it so that:
- Elements at even indices (0, 2, 4, ...) are sorted in non-decreasing (increasing) order.
- Elements at odd indices (1, 3, 5, ...) are sorted in non-increasing (decreasing) order.

Return the array after applying these independent sorts.  
For example:  
Given nums = [4,1,2,3],  
- Even indices: 4 (idx 0), 2 (idx 2) ⇒ should become [2,4].
- Odd indices: 1 (idx 1), 3 (idx 3) ⇒ should become [3,1].  
Output: [2,3,4,1]

### Examples  

**Example 1:**  
Input: `[4,1,2,3]`  
Output: `[2,3,4,1]`  
*Explanation: Even indices = [4,2] → [2,4] (sorted). Odd indices = [1,3] → [3,1] (sorted in decreasing order). Place them back, alternating: 2 (0), 3 (1), 4 (2), 1 (3).*

**Example 2:**  
Input: `[2,1]`  
Output: `[2,1]`  
*Explanation: Only two elements — even index = [2], odd index = [1]. No sorting needed.*

**Example 3:**  
Input: `[5,4,3,2,1,0]`  
Output: `[1,4,3,2,5,0]`  
*Explanation: Even indices = [5,3,1] → [1,3,5] (sorted). Odd indices = [4,2,0] → [4,2,0] (sorted in decreasing order, but already in order). Merge: 1 (0), 4 (1), 3 (2), 2 (3), 5 (4), 0 (5).*

### Thought Process (as if you’re the interviewee)  
- Brute-force idea:  
  - Traverse the array and separate values at even and odd indices into two lists.
  - Sort even-index elements in ascending order and odd-index elements in descending order.
  - Iterate through the array and rebuild it by alternating from the sorted even and odd lists.

- Optimization:  
  - Since we need to both partition and restore, extra O(n) space for two additional lists is acceptable for this problem.
  - Sorting both lists is O(n log n), which is reasonable.
  - We could use counting sort if values are bounded, to get O(n) time, but the basic approach is sufficient for an interview.

- Trade-offs:  
  - The approach is clear, simple, and avoids unnecessary complexity.
  - If the array is huge and memory is an issue, we could sort in place with more indexing logic, but it's generally unnecessary for this type of problem.

### Corner cases to consider  
- Array of length 0 (empty input).
- Array of length 1 (only one index, no odd-index elements).
- All elements are equal.
- Already sorted according to requirements.
- Large arrays (for performance).
- Negative values and duplicate values.


### Solution

```python
def sortEvenOdd(nums):
    # Separate numbers into even and odd index lists
    even = []
    odd = []
    for i in range(len(nums)):
        if i % 2 == 0:
            even.append(nums[i])
        else:
            odd.append(nums[i])

    # Sort: even indices in ascending, odd in descending order
    even.sort()
    odd.sort(reverse=True)

    # Merge: fill original positions from respective lists
    even_idx = 0
    odd_idx = 0
    for i in range(len(nums)):
        if i % 2 == 0:
            nums[i] = even[even_idx]
            even_idx += 1
        else:
            nums[i] = odd[odd_idx]
            odd_idx += 1

    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Separating values: O(n)
  - Sorting both even and odd lists: O(n/2 log n/2) each ⇒ O(n log n) overall.
  - Merging back: O(n)
- **Space Complexity:** O(n)  
  - Two extra lists for split indices (even, odd), each at most n/2 size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to do it in-place with O(1) extra space?  
  *Hint: Can you find a way to do in-place partition and use index mapping for sorting?*

- How would you optimize if all numbers are known to be small integers (e.g., 0 ≤ nums[i] ≤ 100)?  
  *Hint: Use counting sort for O(n) time.*

- If the problem was extended to k groups of indices rather than just even/odd, how would you generalize it?  
  *Hint: Partition indices into groups using i % k and sort separately for each group.*

### Summary
Used the "two-pass and merge" partitioning pattern:  
- Separate collection (split by even/odd indices), sort individually, and merge by restoring alternate positions.  
- This logic is common for "group-and-reorder" class problems, which arise in questions about alternate, wave, or multigroup sorting.
- The pattern is also applicable for problems requiring multiple independent sorts and then restoring or interleaving results.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Sort Array By Parity(sort-array-by-parity) (Easy)
- Sort Array By Parity II(sort-array-by-parity-ii) (Easy)