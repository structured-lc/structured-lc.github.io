### Leetcode 3353 (Easy): Minimum Total Operations [Practice](https://leetcode.com/problems/minimum-total-operations)

### Description  
Given an integer array **nums**, you can do any number of operations.  
In each operation, you may:
- Choose a prefix of the array (the first k elements for any k).
- Choose an integer k (can be negative), and add k to each element in the chosen prefix.

The goal is to **make all elements in nums equal** with the minimum number of operations.  
Return the **minimum operations** required.

### Examples  

**Example 1:**  
Input: `nums = [1,4,2]`  
Output: `2`  
*Explanation:  
- Operation 1: Choose prefix `[1,4]` and add -2: `[1-2,4-2,2]` → `[-1,2,2]`  
- Operation 2: Choose prefix `[-1]` and add 3: `[-1+3,2,2]` → `[2,2,2]`  
So 2 operations are needed.*

**Example 2:**  
Input: `nums = [10,10,10]`  
Output: `0`  
*Explanation:  
All elements are already equal.*

**Example 3:**  
Input: `nums = [3,3,1,1,2]`  
Output: `3`  
*Explanation:  
- Operation 1: Prefix `[3,3,1]`, add -2: `[1,1,-1,1,2]`  
- Operation 2: Prefix `[1,1,-1,1]`, add 2: `[3,3,1,3,2]`  
- Operation 3: Prefix `[3,3,1,3,2]`, add -1 (to first 3): `[2,2,0,3,2]`  
(There are many ways to do this; key is we need 3 operations for segment changes!)*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all possible sequences of prefix operations; clearly, infeasible for n up to 10⁵.

- **Key observation:**  
  Since we can pick any prefix and add any integer, only when an element changes from previous do we need an operation.  
  For every position i (from 1 to n-1), if nums[i] ≠ nums[i-1], we require one operation to "align" from `nums[i-1]` to `nums[i]`.

- **Optimal approach:**  
  - Start from the first element.
  - Every time you detect that the next element differs from the previous, you’ll need one operation for this "segment" change.
  - So, `operations = number of places where nums[i] ≠ nums[i-1]` (for 1 ≤ i < n).

- **Why is this optimal?**  
  Because using the allowed operation, you can fix all previous elements at once with a single operation.  
  We minimize operations by only acting at transitions between unique contiguous segments.

- **Time: O(n)**, Space: O(1).

### Corner cases to consider  
- Empty array (should not happen in constraints, but handle with 0).
- All elements already equal → 0 operations.
- Single element: 0 operations.
- Alternating values (e.g., [1,2,1,2,1]) — every change counts.
- Very large or very small values (test for integer overflows).
- Array of length 1 or 2.

### Solution

```python
def minimum_operations(nums):
    # If empty or size 1, no operations needed
    if not nums or len(nums) == 1:
        return 0
    
    ops = 0
    for i in range(1, len(nums)):
        # Count every change point from previous value
        if nums[i] != nums[i-1]:
            ops += 1
    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of nums.  
  Single pass to count changes between segments.

- **Space Complexity:** O(1), just a few integer counters.  
  (Not counting input array.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only add *positive* k to the prefix?  
  *Hint: Does this force you to move only upward? Is answer different with negative restriction?*

- How would your answer change if the operation is on any (not necessarily prefix) subarray?  
  *Hint: Try classic array "painting" or greedy techniques.*

- Can you return not just the count, but also the actual sequence of operations?  
  *Hint: For each change, track indices and required k values.*

### Summary

We use a **greedy / counting contiguous segment changes pattern**, which is common in problems where global operations become "local" due to the nature of allowed moves. Pattern is similar to "counting boundaries between groups of same values".  
This method has wide applicability in array transformation, paint-fence DP, and prefix-sum problems.