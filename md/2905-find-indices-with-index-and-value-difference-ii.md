### Leetcode 2905 (Medium): Find Indices With Index and Value Difference II [Practice](https://leetcode.com/problems/find-indices-with-index-and-value-difference-ii)

### Description  
Given an array of integers `nums`, and two integers `indexDifference` and `valueDifference`, find any *pair of indices* `i`, `j` (0 ≤ i, j < n), such that:
- The index difference is at least `indexDifference`: `|i - j| ≥ indexDifference`.
- The value difference is at least `valueDifference`: `|nums[i] - nums[j]| ≥ valueDifference`.
Return `[i, j]` if such a pair exists; otherwise, return `[-1, -1]`.  
It's sufficient to find any pair—there can be multiple.

### Examples  

**Example 1:**  
Input: `nums = [5,1,4,1], indexDifference = 2, valueDifference = 4`  
Output: `[0,2]`  
*Explanation: Candidates are (0,2) and (2,0). |0-2| = 2 ≥ 2, |5-4| = 1 < 4. Not valid. Try (0,3): |0-3|=3 ≥ 2, |5-1|=4 = 4 → Valid, so output `[0,3]` is also accepted.*

**Example 2:**  
Input: `nums = [2,3], indexDifference = 0, valueDifference = 1`  
Output: `[0,1]`  
*Explanation: Since indexDifference=0, any i and j (including i==j) are allowed. Here, |2-3|=1=1, so output `[0,1]`.*

**Example 3:**  
Input: `nums = [1,2,3,4], indexDifference = 3, valueDifference = 10`  
Output: `[-1,-1]`  
*Explanation: The length is 4. Possible pairs at least 3 apart: (0,3). |1-4|=3<10. No pair satisfies both constraints, so output `[-1,-1]`.*

### Thought Process (as if you’re the interviewee)  
Start by considering a brute-force O(n²) approach: for every i, check all j such that |i-j| ≥ indexDifference, and |nums[i] - nums[j]| ≥ valueDifference.  
But this is too slow for large arrays.

Observe that for (i, j) with |i-j| ≥ indexDifference, for a fixed i, we can consider candidates j in an efficient sliding window:

- As we move forward with i in nums, for each i ≥ indexDifference, compare nums[i] with the minimum and maximum values in nums[0..i-indexDifference].
  - If nums[i] - min ≥ valueDifference ⇒ valid pair.
  - If max - nums[i] ≥ valueDifference ⇒ valid pair.

So, maintain indices of min and max in the sliding window behind i by indexDifference, and check those as candidates, which makes the check for each i O(1), for an overall O(n) algorithm.

We only care about any such pair, not all pairs, and can return immediately when found.

### Corner cases to consider  
- Array of length < 2: no valid pairs possible.
- indexDifference == 0: all index pairs allowed, including i == j. 
- valueDifference == 0: any distinct pairs may be valid if values are equal.
- Duplicates in nums.
- Negative, zero, or large valueDifference.
- Negative and positive numbers in nums.

### Solution

```python
def findIndices(nums, indexDifference, valueDifference):
    # Store the candidate minimum and maximum indices in the eligible sliding window
    n = len(nums)
    min_idx = 0      # index of minimum in valid left window
    max_idx = 0      # index of maximum in valid left window

    for i in range(indexDifference, n):
        # This is the index in the past that could be paired with i
        j = i - indexDifference

        # Update min_idx and max_idx if a new min or max is found
        if nums[j] < nums[min_idx]:
            min_idx = j
        if nums[j] > nums[max_idx]:
            max_idx = j

        # Check if the current i and the best so-far min/max make a valid pair
        if nums[i] - nums[min_idx] >= valueDifference:
            return [min_idx, i]
        if nums[max_idx] - nums[i] >= valueDifference:
            return [max_idx, i]

    return [-1, -1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since for each i we do O(1) work and scan the array once.
- **Space Complexity:** O(1), since we only store 2 indices and perform in-place checks; no extra data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to find *all* valid pairs rather than just any one?
  *Hint: Need to check every possible (min, max) in the index-difference-separated subarrays.*

- What if instead of finding any pair, you need the pair with the largest value difference?
  *Hint: Track both min and max indices along with their absolute differences, updating only on improvements.*

- Can you generalize the approach if the index difference is not fixed but must be in a range [l, r]?
  *Hint: Extend sliding window to cover all valid j for i, possibly using deques/priority queues for fast min/max.*

### Summary
We identified a sliding window minimum/maximum search as the optimal approach, leveraging a single traversal with O(1) min/max tracking to solve the problem efficiently. This is a common coding pattern in range-based or k-distant problems, seen in maximum sliding window, subarray min/max difference, and two-pointer variants. The key is to process only a restricted window behind each i, maintaining min/max efficiently.