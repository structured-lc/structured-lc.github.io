### Leetcode 3507 (Easy): Minimum Pair Removal to Sort Array I [Practice](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i)

### Description  
You are given an array of integers. You can repeatedly perform the following operation:  
- Choose the adjacent pair in the array with the **minimum possible sum** (if there are multiple, choose the leftmost one).
- Replace the pair with their sum (effectively removing one element and updating the other to be the sum).
Repeat this process as many times as you like.  
Return the **minimum number of operations required** to make the array non-decreasing.

### Examples  

**Example 1:**  
Input: `[5, 2, 3]`  
Output: `1`  
*Explanation: Combine 2 and 3 (minimum sum pair = 5), result is `[5, 5]` which is non-decreasing.*

**Example 2:**  
Input: `[1, 2, 3, 2]`  
Output: `1`  
*Explanation: Combine 3 and 2 (minimum sum pair = 5), result is `[1, 2, 5]` which is non-decreasing.*

**Example 3:**  
Input: `[1, 3, 2, 1]`  
Output: `2`  
*Explanation:  
Step 1: Combine 1 and 3 (minimum sum = 4), result `[4, 2, 1]`  
Step 2: Combine 2 and 1 (minimum sum = 3), result `[4, 3]`.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For each step, simulate every possible pair to merge and see how many operations it takes to get a non-decreasing array. But this is too slow, especially as merging changes the array shape.

- **Observation**:  
  The operation always removes one element, reducing the size by one, and merges based on the smallest adjacent sum.  
  Each operation should optimally reduce *the earliest point where the array decreases*.

- **Greedy approach**:  
  Notice that if the array is already non-decreasing, no operation is needed.  
  Otherwise, we should target positions where nums[i] > nums[i+1].  
  By greedily merging those pairs, we can "fix" the first inversion (from left to right), and after one operation, recompute and repeat.

- **Final approach**:  
  - While the array is not non-decreasing:
    - For all adjacent pairs, determine the *minimum pair sum*, and if there are multiple, select the leftmost such.
    - Merge that pair (replace both by their sum as per rule above).
    - Increment operation count.
  - Repeat until array is non-decreasing.

  Arrays are small, so O(n²) simulation for each operation is acceptable.

### Corner cases to consider  
- Empty array: returns 0 (already sorted)
- Single element: returns 0
- Array already non-decreasing: returns 0
- All elements equal: returns 0
- All elements strictly decreasing: Needs multiple merges
- Large, random sequence
- Array with negative values or zeros

### Solution

```python
def minimum_operations(nums):
    def is_non_decreasing(arr):
        for i in range(len(arr) - 1):
            if arr[i] > arr[i+1]:
                return False
        return True

    nums = nums[:]  # avoid modifying original
    count = 0

    while not is_non_decreasing(nums):
        n = len(nums)
        # Find all adjacent pairs, get their sums
        min_sum = float('inf')
        idx = -1
        for i in range(n-1):
            pair_sum = nums[i] + nums[i+1]
            if pair_sum < min_sum:
                min_sum = pair_sum
                idx = i
        # Merge the pair at idx: replace nums[idx] and nums[idx+1] by their sum
        nums = nums[:idx] + [nums[idx] + nums[idx+1]] + nums[idx+2:]
        count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³) worst-case, because for each operation (up to n times), for each, we scan the array (O(n)) and merging (O(n) to create new list).  
- **Space Complexity:** O(n) for the temporary list manipulations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize your code for very large arrays?
  *Hint: Can the "minimum sum" pair be maintained dynamically (e.g. heap)?*

- Suppose you can merge *any* pair, not just the minimum sum—what changes?
  *Hint: Try a dynamic programming approach.*

- What if instead of making the array non-decreasing, you have to make it strictly increasing?
  *Hint: How do your merge choices affect equality in merged results?*

### Summary
This is a **brute-force greedy simulation** problem, where each operation targets the local "bad pair" using a simple loop, accepting higher complexity due to small constraints.  
The main coding pattern is *simulation* with greedy selection; this approach can also be applied to problems where step-by-step edits are made to arrays, especially for local, adjacent relationships (e.g., merge intervals, or elimination games).


### Flashcard
Greedily merge the leftmost adjacent pair with minimum sum at each step to reduce the earliest point where array decreases.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation), Doubly-Linked List(#doubly-linked-list), Ordered Set(#ordered-set)

### Similar Problems
