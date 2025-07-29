### Leetcode 3400 (Medium): Maximum Number of Matching Indices After Right Shifts [Practice](https://leetcode.com/problems/maximum-number-of-matching-indices-after-right-shifts)

### Description  
You are given two integer arrays `nums1` and `nums2` of equal length \(n\).  
An index \(i\) is **matching** if `nums1[i] == nums2[i]`.  
You can perform any number of **right shifts** on `nums1`.  
A right shift means moving each element one position to the right;  
the last element moves to the front (so after 1 shift: `nums1[i]` moves to `nums1[(i + 1) % n]`).  
Find the **maximum** number of matching indices possible after any number of right shifts on `nums1`.

### Examples  

**Example 1:**  
Input: `nums1 = [3,1,2,3,1,2]`, `nums2 = [1,2,3,1,2,3]`  
Output: `6`  
*Explanation: Shift `nums1` right by 2 ⇒ [1,2,3,1,2,3]. Each index matches `nums2`, so output is 6.*

**Example 2:**  
Input: `nums1 = [1,4,2,5,3,1]`, `nums2 = [2,3,1,2,4,6]`  
Output: `3`  
*Explanation: Shift `nums1` right by 3 ⇒ [5,3,1,1,4,2]. Indices 1 (3), 2 (1), and 4 (4) match, so output is 3.*

**Example 3:**  
Input: `nums1 = [2,2,2]`, `nums2 = [2,2,2]`  
Output: `3`  
*Explanation: All elements are equal and match for any number of shifts.*

### Thought Process (as if you’re the interviewee)  
- First, brute force: For each possible number of shifts \(k\) (from 0 to n-1), simulate shifting `nums1` \(k\) times, compare with `nums2`, and count matching indices. Keep track of the maximum.  
- For brute force, for each shift, we check each index, so O(n²) time.  
- Can we do better?  
    - Since `nums1` is circularly shifted, each "shift" produces a new alignment.  
    - Construct an array of all possible match counts for shifts 0 to n-1.  
    - Because n ≤ 3000, and values are small, O(n²) is acceptable here. No need for further optimization unless there are multiple similar queries or larger constraints.

- Trade-off:  
    - O(n²) is straightforward and acceptable for interview.
    - Advanced optimizations (e.g., KMP, FFT/cyclic convolution) aren't needed; would be harder to code and justify for n ≤ 3000.

### Corner cases to consider  
- n = 1 (single-element array).
- All elements the same (maximum matches possible at any shift).
- No elements are the same in any alignment (output 0).
- Arrays are already matching (shift = 0 case gives the answer).
- Multiple shifts yield the same maximum match count.

### Solution

```python
def maximumMatchingIndices(nums1, nums2):
    n = len(nums1)
    max_matches = 0
    # Try all possible right shifts (from 0 to n-1)
    for shift in range(n):
        matches = 0
        # Compare for each index after right shifting nums1 by 'shift'
        for i in range(n):
            # The element of nums1 after 'shift' right shifts at index 'i'
            shifted_idx = (i + shift) % n
            if nums1[shifted_idx] == nums2[i]:
                matches += 1
        max_matches = max(max_matches, matches)
    return max_matches
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the length of the arrays. For every possible shift (n), we compare n pairs.
- **Space Complexity:** O(1), since only variables for counters and indices are used. No extra space proportional to input size; input arrays are used as-is.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array length can be up to 10⁵?
  *Hint: Can you use a sliding window or a hash to optimize match count update between shifts?*

- What if you have to preprocess `nums1` to quickly answer many such `nums2` queries?
  *Hint: Precompute shift-wise match arrays, maybe using advanced string matching techniques.*

- Can this be solved efficiently if values can be negative or much larger?
  *Hint: If values aren't bounded, hash maps become more essential for efficient counting.*

### Summary
This problem uses the **circular array matching** pattern and a brute-force sliding window approach.  
It’s a classic use case for O(n²) search over all cyclic shifts, which is standard when constraints are moderate (n ≤ 3000).  
Patterns here apply to other problems involving maximal overlap after rotations or circular shifts, and can be optimized using advanced algorithms for larger inputs.