### Leetcode 2919 (Medium): Minimum Increment Operations to Make Array Beautiful [Practice](https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful)

### Description  
Given an array of integers nums and an integer k, your goal is to make the array **beautiful** with the least number of increment operations.  
An array is considered beautiful if **every contiguous subarray of length 3** has at least one element greater than or equal to k.  
You can increase any element by 1 as a single operation and do this on any elements any number of times.  
Return the minimum total number of operations needed.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 2], k = 3`  
Output: `1`  
*Explanation: The subarrays of length 3 are [1,2,3] and [2,3,2].  
Only [2,3,2] violates the rule since its maximum is 3 (OK), but [1,2,3] also has max 3 (OK).  
But [2,3,2]—element 3 is already ≥ k (3), so no increment needed.  
[1,2,3]—3 is already ≥ 3.  
However, [2,3,2] has 2 at the ends. If we increment the last 2 to 3,  
[2,3,3] is formed for the last window, which is then beautiful as 3 ≥ 3.  
Only increment needed is for last element.*

**Example 2:**  
Input: `nums = [2, 2, 2], k = 4`  
Output: `2`  
*Explanation: Each subarray of length 3 is just the entire array. None of the elements reach k.  
We can increment any of them, but the minimum total needed to make the max ≥ 4 is 2 steps (e.g., increase any one element by 2).*

**Example 3:**  
Input: `nums = [5, 5, 5], k = 4`  
Output: `0`  
*Explanation: All elements already ≥ k=4, so no increment needed.*

### Thought Process (as if you’re the interviewee)  
Let’s start brute-force:  
- For each subarray of size 3, we could check if the max ≥ k.  
- If not, pick one of the elements and increment—it’s not clear which to pick for global minimum.  
- But this could lead to multiple increments on the same element for overlapping windows, which is inefficient.

To optimize:  
- Realize that overlapping subarrays of size 3 share many elements.  
- The constraint boils down to ensuring, for every index i (1 ≤ i ≤ len(nums)-2), in the window nums[i-1], nums[i], nums[i+1], that **at least one** is ≥ k.  
- We want to minimize total increments, so ideally, as few increments as possible upgrade an element so that as many windows as possible are “satisfied.”
- Dynamic programming (DP) is natural: define for each position what is the minimal number of increments needed if we choose to “make” this element, or one of its neighbors, satisfy the window.

The efficient idea:  
- For any triplet (nums[i-2], nums[i-1], nums[i]), at least one of them must be ≥ k.
- At each element, maintain the minimal operations spent if last satisfied in group (cur), 1-back (prev), or 2-back (prev_prev).
- For each, add only the needed increment (if nums[i] < k, do k-nums[i], else 0) to the minimum of the last three dp values.
- This sliding DP tracks which window is last "satisfied" up to i.

This makes the algorithm **O(n)** time and **O(1)** space.

### Corner cases to consider  
- Empty array (nums=[]): return 0.
- Array of size less than 3—trivially beautiful, return 0.
- All elements already ≥ k—no operations needed.
- Large k, much greater than any nums[i].
- All nums[i] the same but less than k—need to pick a minimal set to increment.

### Solution

```python
def minIncrementOperations(nums, k):
    n = len(nums)
    if n < 3:
        return 0  # nothing to do
    
    # We maintain three variables, one for each possible last "satisfied" position for the last window
    prev = 0   # min ops: last window satisfied by position i-3
    curr = 0   # min ops: last window satisfied by position i-2
    nxt = 0    # min ops: last window satisfied by position i-1

    for value in nums:
        need = max(k - value, 0)
        # The next window can be satisfied by any of the three ways
        prev, curr, nxt = curr, nxt, min(prev, curr, nxt) + need

    # The answer is the min of the three last possibilities
    return min(prev, curr, nxt)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make a single pass through the array updating three variables at each index.
- **Space Complexity:** O(1), as only constant extra variables are used (no additional DP arrays, recursion, or data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- If instead you could only increment **one specific index per operation** (and not any), how would the solution change?  
  *Hint: Consider how the decision impacts overlapping windows and global strategy.*

- How would the algorithm change if the **window size was not 3 but any arbitrary s**?  
  *Hint: Try to generalize the rolling DP state tracking strategy to s states.*

- What if you were allowed to **decrement numbers as well**?  
  *Hint: Would it ever make sense to decrement, given the problem's beautiful condition?*

### Summary
We use a **rolling DP with three states** to track the minimum operation sum needed to guarantee, for every window, at least one element hits the threshold. This is a classic **dynamic programming with overlapping subproblems**—similar to some scheduling and interval problems. The key trick is to minimize increments by leveraging shared elements among windows and propagate optimal substructure using minimal updating of "active" states. This DP approach is broadly useful for tasks where window/interval satisfaction constraints overlap, like "painting houses" or "minimum jumps" problems.