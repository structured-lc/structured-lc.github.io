### Leetcode 2459 (Hard): Sort Array by Moving Items to Empty Space [Practice](https://leetcode.com/problems/sort-array-by-moving-items-to-empty-space)

### Description  
Given an array **nums** of size n containing every number from 0 to n-1 exactly once, where 0 is an **empty space** and 1 to n-1 are items, you can “move” any item into the empty space (0) in one operation.  
Your goal is to **sort** the array so that all items are in ascending order, and the empty space (0) is either at the **beginning** or **end** of the array (i.e., [0,1,2,...,n-1] or [1,2,...,n-1,0]).  
Return the **minimum number of moves** required to sort nums.

### Examples  

**Example 1:**  
Input: `nums = [4,2,0,3,1]`,  
Output: `3`  
Explanation:  
Step 1: Move 2 to the empty slot (index 2). Now nums = [4,0,2,3,1]  
Step 2: Move 1 to the empty slot (index 1). Now nums = [4,1,2,3,0]  
Step 3: Move 4 to the empty slot (index 4). Now nums = [0,1,2,3,4]  
Total moves = 3

**Example 2:**  
Input: `nums = [1,0,2,3,4]`,  
Output: `0`  
Explanation:  
Already sorted: 0 at beginning, 1 2 3 4 ascending. No moves needed.

**Example 3:**  
Input: `nums = [3,1,2,0]`,  
Output: `2`  
Explanation:  
Step 1: Move 2 to the empty slot (index 3). nums = [3,1,0,2]  
Step 2: Move 3 to the empty slot (index 2). nums = [0,1,2,3]  

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try all possible moves for every arrangement. This is infeasible, as the number of permutations is n!.

- **Observation:**  
  - The empty space (0) can be at either the start or end when sorted.
  - Each move allows *any* item to be placed in the empty position.
  - We want the minimum number of moves to reach the sorted configuration.

- **Key Insight:**  
  - This is essentially finding the **longest sorted subsequence** that can be maintained by only moving elements unrelated to that subsequence.
  - Moves are determined by how many elements are already placed in a sorted order without needing to be moved.

- **Approach:**  
  - There are two valid sorted states:  
    - `target1 = [0, 1, 2, ..., n-1]`  
    - `target2 = [1, 2, ..., n-1, 0]`  
  - For each option:
    - Find the **longest prefix** from the start matching `target1`
    - Find the **longest suffix** from the end matching `target2`
  - The **number of moves** is `n - longest common subsequence` needed to achieve one of these states.

- **Simplified Algorithm:**  
  - For `target1` ([0,1,2...]):
    - Count the longest prefix starting from index 0 where nums[i] == i  
    - Moves needed = n - prefix_length  
  - For `target2` ([1..n-1,0]):
    - Count the longest suffix starting from index n-1 where nums[i] == i+1 (`except last index is 0`).  
    - Moves needed = n - suffix_length  
  - Answer = **min** of the two.

### Corner cases to consider  
- Array is already sorted (0 moves)
- 0 is at the start but everything else out of order
- 0 is at the end but everything else out of order
- n = 1 (trivial, )
- n = 2 ([0,1] or [1,0])
- Only one element out of place

### Solution

```python
def sort_array_by_moving_items_to_empty_space(nums):
    n = len(nums)

    # Check target1: [0,1,2,...,n-1]
    prefix = 0
    for i in range(n):
        if nums[i] == i:
            prefix += 1
        else:
            break
    moves1 = n - prefix

    # Check target2: [1,2，...,n-1,0]
    suffix = 0
    for i in range(n-1, -1, -1):
        expected = (i+1) % n
        if nums[i] == expected:
            suffix += 1
        else:
            break
    moves2 = n - suffix

    return min(moves1, moves2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - We only iterate from left for prefix and from right for suffix. Each is a single pass.
- **Space Complexity:** O(1).  
  - Only uses constant extra variables; no extra storage or data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the algorithm if multiple empty spaces (zeros) were allowed?  
  *Hint: Think about partitioning and additional freedom of movement.*

- Can you reconstruct the move sequence, not just count the minimum?  
  *Hint: Store the move path as you loop, or retrace from the end position.*

- How do you optimize if the array can contain duplicate values or isn’t a full 0..n-1 permutation?  
  *Hint: Sorting logic may have to change to accommodate duplicates and missing numbers.*

### Summary
This problem is based on recognizing and maintaining invariants in permutation arrays and reducing sorting actions to aligning indices in two possible valid sorted states.  
The approach demonstrates the usefulness of greedy and two-pointer scanning, as well as thinking about array “order” as strict segment matching.  
The coding pattern applies for problems where you’re allowed to move any element into a special “hole”/empty slot, and you must count the minimum operations to reach a sorted or specific arrangement.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Course Schedule II(course-schedule-ii) (Medium)
- Strange Printer II(strange-printer-ii) (Hard)
- Create Sorted Array through Instructions(create-sorted-array-through-instructions) (Hard)