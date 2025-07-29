### Leetcode 2541 (Medium): Minimum Operations to Make Array Equal II [Practice](https://leetcode.com/problems/minimum-operations-to-make-array-equal-ii)

### Description  
Given two integer arrays **nums1** and **nums2** of the same length \(n\) and an integer **k**, your task is to make **nums1** equal to **nums2** using the minimum number of allowed operations. In each operation, you pick any two indices \(i\) and \(j\) (could be the same element, but not required), increment **nums1[i]** by **k** and decrement **nums1[j]** by **k**. Return the minimum number of operations to make the arrays equal, or -1 if it's impossible.

### Examples  

**Example 1:**  
Input: `nums1 = [2,4,6], nums2 = [4,2,6], k = 2`  
Output: `1`  
*Explanation: Increase nums1 by 2 (from 2→4), decrease nums1[1] by 2 (from 4→2). One operation matches nums1 to nums2.*

**Example 2:**  
Input: `nums1 = [1,2,3,4], nums2 = [2,2,2,2], k = 1`  
Output: `2`  
*Explanation: Increase nums1 by 1, decrease nums1[3] by 1 (now [2,2,3,3]);  
Then increase nums1[2] by 1, decrease nums1[3] by 1 (now [2,2,4,2]).  
But with another pairing, in two operations we can redistribute and get the answer.  
In total, minimum operations needed is 2.*

**Example 3:**  
Input: `nums1 = [1,2,3], nums2 = [2,2,2], k = 0`  
Output: `-1`  
*Explanation: No operation is possible when k=0 and arrays are not already equal.*

### Thought Process (as if you’re the interviewee)  
First, let's restate:  
- We can pick any two indices and shift `k` from one value to the other (add `k` to one, subtract `k` from another).

Brute-force:
- Try all possible operations until arrays match: not feasible, since n can be large.

Optimize:
- Notice that in each operation, the sum of the array remains unchanged. So if the sums of nums1 and nums2 differ, it is impossible.
- The difference at each index, `diff[i] = nums2[i] - nums1[i]`, MUST be transferable in units of `k`. So unless each `diff[i] % k == 0`, it's impossible.
- The minimal number of operations is half of the total positive "moves" needed (since every operation shifts `k` from one place to another):  
    - For every `diff[i] > 0`, we need to "push" k from somewhere else to here.  
    - Similarly, `diff[i] < 0`, we can "pull" k from here to somewhere else.  
    - We can only "transfer" k between indices, so the sum of needed positive `diffs // k` will equal negative `diffs // k` (with opposite sign).
    - Number of operations is sum of positive `diff[i] // k` for all i.

### Corner cases to consider  
- k == 0: Only possible if nums1 == nums2.  
- All differences are not divisible by k → impossible, return -1.  
- One element arrays.  
- Arrays already equal (require 0 operations).  
- Large positive and negative differences.

### Solution

```python
def minOperations(nums1, nums2, k):
    # If k is 0, arrays must be identical to be possible
    if k == 0:
        return 0 if nums1 == nums2 else -1

    n = len(nums1)
    total = 0        # running total for positive transfers
    balance = 0      # to check if positive and negative balance

    for i in range(n):
        diff = nums2[i] - nums1[i]

        # Each difference must be divisible by k
        if diff % k != 0:
            return -1

        move = diff // k
        # Count total moves needed (only for positive, as each op can pair + and -)
        if move > 0:
            total += move
        balance += move

    # If balance isn't zero, we can't make pairs so return -1
    if balance != 0:
        return -1

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we loop over each element once.
- **Space Complexity:** O(1), only a few integer variables for bookkeeping; not proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the operation was "add k to any one position" instead of swapping?  
  *Hint: Think how the absence of a paired subtraction limits/disconnects values and sum constraint.*

- What if k could be different for each operation (any integer)?  
  *Hint: How would you pair transfer needs in that case, or is it always possible?*

- What if you can only do a fixed number of operations?  
  *Hint: Is a greedy strategy optimal, and can you always reach target within the allowed moves?*

### Summary
This problem is a classic **math + greedy pairing** pattern: transfer values while preserving array sum, grouping increments and decrements efficiently. It leverages counting and balance—if all per-index differences are multiples of k and total moves "balance out", you can greedily pair the increments and decrements for a minimal O(n) solution. The strategy is similar to certain redistribution and sorting by swapping problems.