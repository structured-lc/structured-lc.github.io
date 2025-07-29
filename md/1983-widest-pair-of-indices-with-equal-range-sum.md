### Leetcode 1983 (Medium): Widest Pair of Indices With Equal Range Sum [Practice](https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum)

### Description  
Given two binary arrays `nums1` and `nums2` of equal length, find the *maximum distance* (j - i) such that the sum of elements from i to j in `nums1` is equal to the sum from i to j in `nums2`. Return this maximum width. If there is no such pair, return 0.  

In other words: Find the *widest* subarray (from i to j) where `sum(nums1[i..j]) == sum(nums2[i..j])`.

### Examples  

**Example 1:**  
Input: `nums1 = [1,0,0,1,0,1]`, `nums2 = [0,1,1,0,1,0]`  
Output: `6`  
*Explanation: For i=0, j=5, both sums equal 3. The entire range 0–5 works, and its length is 6.*

**Example 2:**  
Input: `nums1 = [0,1,1,1]`, `nums2 = [1,0,1,0]`  
Output: `3`  
*Explanation: For i=1, j=3, sums are both 2. (nums1[1:3]=[1,1,1], nums2[1:3]=[0,1,0]).*

**Example 3:**  
Input: `nums1 = [0,1]`, `nums2 = [1,1]`  
Output: `1`  
*Explanation: For i=1, j=1, both have sum 1. Only single-element window.*

### Thought Process (as if you’re the interviewee)  

- The brute-force idea: For each i, try all j ≥ i, compute both sums, and check if they're equal. This would be O(n²), not acceptable for large n.

- Let's try to optimize.  
  If we use *prefix sums*, we can compute sum from i to j in O(1) by precomputing the prefix sum arrays for both.  
  But we need to **find widest (i, j) such that sum1[i..j] == sum2[i..j]**.

- Observe: sum1[0..j] - sum1[0..i-1] == sum2[0..j] - sum2[0..i-1].  
  Rearranged: (sum1[0..j] - sum2[0..j]) == (sum1[0..i-1] - sum2[0..i-1]).

- If we track the first (leftmost) index each (prefix1 - prefix2) value occurs, then for each j, we can look up the *earliest* i where the difference matches and compute the distance.

- This is a classic prefix sum + hashmap pattern:  
  - Iterate from 0 to n
  - At each position, compute cumulative difference (prefix1 - prefix2).
  - If this difference has been seen before, update max width as (current_index - first_index).
  - Otherwise, store the first occurrence.

- This gives us O(n) time and O(n) space.

### Corner cases to consider  
- Arrays of length 0 (should return 0).
- All elements are same in both (`nums1` == `nums2`): whole array is answer.
- No matching subarrays: return is 0.
- Only single-element matches possible.
- Multiple matching windows, take the widest.
- Large input arrays (efficiency).
- Negative/overflow not a worry: elements are always 0 or 1.

### Solution

```python
def widestPairOfIndices(nums1, nums2):
    # Map to store: diff -> first index where this diff occurred
    first_index = {0: -1}  # diff = 0 at position -1 (before start)
    max_width = 0
    diff = 0  # Cumulative difference of prefix sums

    for i in range(len(nums1)):
        # Add difference at this iᵗʰ index
        diff += nums1[i] - nums2[i]
        if diff in first_index:
            # If this diff has been seen before, compute window size
            width = i - first_index[diff]
            if width > max_width:
                max_width = width
        else:
            # Store the first occurrence of this diff
            first_index[diff] = i

    return max_width
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we do a single pass, and each dictionary op is O(1) amortized.
- **Space Complexity:** O(n) for dictionary storing at most n different diff values, negligible other storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if `nums1` and `nums2` could contain negative numbers, not just 0/1?  
  *Hint: Does the prefix sum/diff logic still apply for arbitrary integers?*

- What if instead of returning the width, you needed to return the actual indices (i, j) themselves?  
  *Hint: How to keep track of both leftmost and rightmost for maximal window?*

- How would you do this if the arrays were extremely large and cannot fit entirely in memory?  
  *Hint: Can some statistics or chunking be used?*

### Summary
We used the **prefix sum + hash map pattern** to efficiently identify the widest subarray with equal range sums. This approach is common in problems like *Contiguous Array (LeetCode 525)* and any problem requiring matching range properties or zero-sum subarrays. We optimize from O(n²) naive to O(n) by using running differences and tracking their first occurrence. This is a highly reusable coding pattern for interview scenarios.