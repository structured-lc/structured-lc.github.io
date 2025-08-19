### Leetcode 2460 (Easy): Apply Operations to an Array [Practice](https://leetcode.com/problems/apply-operations-to-an-array)

### Description  
You are given a 0-indexed array of non-negative integers, nums. Starting from the beginning of the array, for each adjacent pair (nums[i], nums[i+1]), if they are equal, set nums[i] = nums[i] × 2 and nums[i+1] = 0. Do this for every i from 0 to n-2, in order. After all operations are finished, move all 0's to the end of the array, keeping non-zero numbers in their original order. Return the resulting array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,1,1,0]`  
Output: `[1,4,2,0,0,0]`  
*Explanation:  
Step 1: nums[1] == nums[2] ⇒ nums[1]=2×2=4, nums[2]=0 -> [1,4,0,1,1,0]  
Step 2: nums[3] == nums[4] ⇒ nums[3]=1×2=2, nums[4]=0 -> [1,4,0,2,0,0]  
Finally, move all zeros to the end: [1,4,2,0,0,0]*

**Example 2:**  
Input: `nums = [0,1]`  
Output: `[1,0]`  
*Explanation:  
No adjacent equal pair; just move the 0 to the end.*

**Example 3:**  
Input: `nums = [1,0,2,0,0,1]`  
Output: `[1,2,1,0,0,0]`  
*Explanation:  
No adjacent pairs are equal. Move all zeros to the end: [1,2,1,0,0,0]*

### Thought Process (as if you’re the interviewee)  
I'll start by iterating through the array from left to right. For each i, check if nums[i] == nums[i+1].
- If so, double nums[i], set nums[i+1] to 0.
- Continue this for every consecutive pair, as each operation can affect subsequent pairs because the array is modified in place.

After all operations, I'll need to move all the 0's to the end. This is a familiar "move zeros" pattern: iterate through the array, collect non-zero numbers in order, then fill the rest with zeros.

Brute force is sufficient: two passes (one for ops, one for compaction).  
Optimizations like doing both in one walk would make code less clear and don't reduce asymptotic complexity for this problem.  
Final algorithm is O(n) time and O(1) extra space if done in place.

### Corner cases to consider  
- All elements are unique (no operation is done).
- All elements are zero.
- Array of length 2, equal or not.
- Array of length 1.
- Multiple groups of adjacent equal elements.
- Zeros already at the end.

### Solution

```python
def applyOperations(nums):
    n = len(nums)
    # 1. Apply the operations to adjacent equal elements
    for i in range(n - 1):
        if nums[i] == nums[i + 1]:
            nums[i] *= 2
            nums[i + 1] = 0

    # 2. Move all zeros to the end, maintaining non-zero order
    pos = 0  # Position to place the next non-zero value
    for i in range(n):
        if nums[i] != 0:
            nums[pos] = nums[i]
            pos += 1
    # Fill remaining positions with zero
    for i in range(pos, n):
        nums[i] = 0

    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  First pass applies the operations in O(n), second pass compacts non-zeros and fills zeros, also O(n).

- **Space Complexity:** O(1)  
  All operations are in place, only a constant number of pointers/variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have to return the index of the number that has been doubled?
  *Hint: You can keep track of the indices where an element is doubled during the operation loop.*

- How would you handle a variant where you merge groups of any consecutive equal numbers, not just pairs?
  *Hint: You will need to scan for runs of equal numbers, not just pairs.*

- Can you do the operation in a single pass (process and compact zeros together)?
  *Hint: Try merging the zero-compaction into the original loop, using a write pointer.*

### Summary
This is a classic two-pass array processing problem. The first pass applies a specific set of update rules, and the second reorganizes the array via the "move all zeros to end" pattern (commonly seen in Leetcode problems like Move Zeroes). The solution only uses constant extra space and is linear time, making it optimal for this constraint set. This template applies to many array reordering tasks after a mutating operation phase.

### Tags
Array(#array), Two Pointers(#two-pointers), Simulation(#simulation)

### Similar Problems
- Remove Duplicates from Sorted Array(remove-duplicates-from-sorted-array) (Easy)
- Move Zeroes(move-zeroes) (Easy)