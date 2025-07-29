### Leetcode 3523 (Medium): Make Array Non-decreasing [Practice](https://leetcode.com/problems/make-array-non-decreasing)

### Description  
Given an integer array **nums**, you may perform any number of operations. In each operation, you can select a subarray and replace it with a single element equal to its **maximum** value.  
Your task: Find the **maximum possible size** of the resulting array after performing zero or more operations, such that the array is **non-decreasing** (every element ≤ the next).

### Examples  

**Example 1:**  
Input: `nums = [4,2,5,3,5]`  
Output: `3`  
Explanation:  
- Replace subarray `nums[1..2] = [2,5]` with `5` → `[4,5,3,5]`.  
- Replace subarray `nums[2..3] = [3,5]` with `5` → `[4,5,5]`.  
Array `[4,5,5]` is non-decreasing and has size `3`.

**Example 2:**  
Input: `nums = [1,2,3]`  
Output: `3`  
Explanation:  
No operation is needed, array is already non-decreasing.

**Example 3:**  
Input: `nums = [5,4,3,2,1]`  
Output: `1`  
Explanation:  
- Replace the whole array `[5,4,3,2,1]` with `5` (the maximum) → `[5]`.  
Only possible non-decreasing array.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all ways to pick subarrays and replace with maximums until array is non-decreasing, and track max size.  
  This is infeasible even for moderate arrays because the number of subarrays and operation sequences is huge (exponential complexity).

- **Optimized approach:**  
  Notice that we want to keep the final array as **long as possible**, but it must be non-decreasing.  
  - Start from the left; whenever you find that the next element is **less than** the previous, you would need to merge (replace) that segment.  
  - But, since you can only replace with the maximum, you want each position in the final array to be a point where from the previous position up to here the max hasn't decreased.
  - So, just **scan left-to-right**, keeping track of the current **maximum** (`mx`).  
    - Every time you see an element ≥ `mx`, you can start (or extend) the next block since it will be non-decreasing.
    - For each such occasion, increment your answer.
  - This greedy approach picks the **longest non-decreasing sequence** you can build by merging where needed.

  **Final algorithm:**  
  - Initialize `mx = -∞`, `count = 0`.
  - Traverse array. For each `x`:
    - If `x ≥ mx`, increment count, set `mx = x`.
    - Else, continue (merge this in with previous block).
  - Return count.

### Corner cases to consider  
- Empty array (problem constraints guarantee at least 1 element)
- All identical elements: `[1,1,1,1]`
- Already sorted input, strictly increasing and strictly decreasing
- Single element array
- Arrays with alternate peaks and valleys

### Solution

```python
def max_non_decreasing_length(nums):
    # Initialize the current maximum seen so far and answer counter
    mx = float('-inf')
    count = 0
    # Traverse the array
    for x in nums:
        if x >= mx:
            # Found a new non-decreasing jump; increment answer
            count += 1
            mx = x
        # Else: this value must be merged with previous (cannot make a new spot)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the array just once and do O(1) work per element.
- **Space Complexity:** O(1), only a couple variables for tracking state.

### Potential follow-up questions (as if you’re the interviewer)  

- If you had to also return the final non-decreasing array itself, what changes?
  *Hint: Track the values at the locations where you increment count.*

- How would you extend this if instead of maximum, you can replace the subarray with minimum?
  *Hint: Would you use a similar scan, or does the logic change?*

- What if you were limited in the number of operations allowed?
  *Hint: Consider DP or tracking merged ranges with greedy decisions.*

### Summary
This problem is a **greedy** pattern, closely related to scanning for monotonic subsequences and segment merging.  
The key trick is that every time you find a value at least as large as anything you’ve seen so far, you can start a new "block" that guarantees a non-decreasing order.  
This pattern applies to problems where you have an unlimited number of subarray merges under monotonicity constraints—think stack/greedy approaches, longest non-decreasing subarrays, or block partitioning.