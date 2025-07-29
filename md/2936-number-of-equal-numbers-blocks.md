### Leetcode 2936 (Medium): Number of Equal Numbers Blocks [Practice](https://leetcode.com/problems/number-of-equal-numbers-blocks)

### Description  
Given an array `nums`, where for any integer value, all of its occurrences are adjacent (so equal values are always grouped together), find the number of **maximal blocks** of equal numbers.  
A **block** is a subarray of consecutive equal numbers that cannot be extended to the left or right.  
You can't access the array directly if it's large; instead, you are given a `BigArray` class that supports `at(index)` and `size()` for reading elements.

### Examples  

**Example 1:**  
Input: `nums = [1,1,2,2,2,3]`  
Output: `3`  
*Explanation: There are three blocks: [1,1], [2,2,2], [3]. Each block has equal numbers, and all equal numbers are grouped together.*

**Example 2:**  
Input: `nums = [1,1,1,3,9,9,9,2,10,10]`  
Output: `5`  
*Explanation:  
Blocks are: [1,1,1], [3], [9,9,9], [2], [10,10].  
So, total blocks = 5.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,6,7]`  
Output: `7`  
*Explanation: Each element forms its own block since all numbers are unique and adjacent only to themselves.*

### Thought Process (as if you’re the interviewee)  
- First, I understand that every block is a maximal group of adjacent, equal elements.
- Naive solution: iterate from left to right, count a block every time the number changes. This is O(N).
- However, the problem may use a massive input via the `BigArray` interface, so we should minimize element access.
- Since all equal numbers are already adjacent, the *starts* of new blocks will only happen at the very beginning or right after a change in value.
- To minimize access, use a **binary search** approach:  
  - We can "jump" forward to locate the start and end of each block.
  - For each block, after finding the leftmost index, find where the value changes.
  - For each change, count another block.  
- Because there are only as many blocks as value changes, not as many as N, this process is efficient.
- Overall, we can get the block count using a process similar to:  
  - Start at index 0.
  - While not at the end:  
    - Get `cur_val = at(cur_idx)`.
    - Use binary search to find the first index ≥ cur_idx with value ≠ cur_val.
    - Move to that index, count +1 block.
    - Repeat until we reach the end.
- This will be O(B × log N), where B = number of blocks (often much less than N).

### Corner cases to consider  
- Empty array (should return 0).
- Array with all identical elements (should return 1).
- All elements unique (should return length of array).
- Blocks of length 1 followed by blocks of larger length.
- Very large arrays (ensure logarithmic solution works with BigArray).
- Only one element.

### Solution

```python
# BigArray interface is given:
# class BigArray:
#     def at(self, idx: int) -> int
#     def size(self) -> int

def count_blocks(big_array):
    n = big_array.size()
    if n == 0:
        return 0

    block_count = 0
    i = 0

    while i < n:
        block_count += 1
        cur_val = big_array.at(i)

        # Binary search to find the end of current block
        left = i
        right = n  # exclusive

        while left < right:
            mid = (left + right) // 2
            if big_array.at(mid) == cur_val:
                left = mid + 1
            else:
                right = mid
        
        # left is now the index of the next block or n
        i = left

    return block_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(B × log N), where B is the number of blocks.
  - For each block, we do a binary search for its end, log N steps per block.
  - If all elements are unique (worst B = N), it's O(N × log N), but commonly B ≪ N.
- **Space Complexity:** O(1), as we use only constant extra space (no recursion stack, no extra arrays).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is not guaranteed to have grouped equal values?  
  *Hint: How would you find blocks if equal numbers could be scattered?*

- How would you output the start and end positions of each block?  
  *Hint: Instead of just counting, store (start, end) indices before jumping to next block.*

- Can your solution be parallelized?  
  *Hint: Are there sections of the array you could examine concurrently for value changes if direct array access was allowed?*

### Summary
This problem uses the **binary search for next change** pattern, a twist on the two-pointer or group-by approach for sorted or grouped arrays.  
The efficiency comes from the maximal blocks already being formed, making a logarithmic jump to the next block possible, which is ideal for BigArray or external memory scenarios.  
Such grouping and block-counting patterns are common in **run-length encoding**, **data compression**, and detecting value changes in sorted/grouped sequences.