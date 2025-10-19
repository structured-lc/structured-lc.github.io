### Leetcode 3690 (Medium): Split and Merge Array Transformation [Practice](https://leetcode.com/problems/split-and-merge-array-transformation)

### Description  
You are given two integer arrays, **nums1** and **nums2**, each of length n. You can repeatedly perform the following operation on nums1:  
- Choose any non-empty **contiguous subarray** of nums1, remove it from nums1, and then insert it anywhere (including at the beginning or end) in the remaining nums1.  
The goal is to determine the **minimum number of operations** required to transform nums1 into nums2 (they must become exactly equal).

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3], nums2 = [3,2,1]`  
Output: `2`  
*Explanation: Move [1] to end: [2,3,1]. Then move [2,3] to end: [1,2,3]. Actually, with optimal moves, you can reverse the array in 2 steps.*

**Example 2:**  
Input: `nums1 = [4,3,2,1], nums2 = [1,2,3,4]`  
Output: `3`  
*Explanation:  
Step 1: Move [4] to end → [3,2,1,4]  
Step 2: Move [3] to end → [2,1,4,3]  
Step 3: Move [2] to end → [1,4,3,2]  
You need 3 operations to match nums2.*

**Example 3:**  
Input: `nums1 = [1,5,2,3,4], nums2 = [5,1,4,3,2]`  
Output: `4`  
*Explanation:  
Step 1: Move [1] to end → [5,2,3,4,1]  
Step 2: Move [5] to start → [5,1,2,3,4]  
Step 3: Move [2,3,4] to end → [5,1,2,3,4]  
Step 4: Move [2] to end → [5,1,4,3,2]*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be to generate all possible arrays by performing all possible split-merge operations, but this is highly inefficient.
- Since every split-and-merge allows moving any contiguous segment anywhere, this resembles the concept of bubble-sort, but generalized.
- The key is to **minimize operations** to transform nums1 into nums2. Every contiguous segment in nums1 that is in the correct location in nums2 does not need to be moved.
- The *optimal* approach leverages the **Longest Common Subsequence (LCS) of contiguous blocks**: the largest segment of nums1 that exists in nums2 in the same order and consecutively does not need to be moved.
- Thus, *the answer is*: n − length of longest contiguous segment in nums1 that matches any segment in nums2.

Steps for minimum operations:  
1. Identify all contiguous segments in nums1 that match anywhere in nums2.
2. Find the maximum length. Minimum moves = n − max contiguous matching segment length.
3. Use BFS (Breadth-First Search) with visited states (arrays seen so far) to guarantee minimal steps, as per contest editorial. Store each state (current array + step count) in the queue and process until nums1 == nums2.

Trade-offs:  
- BFS ensures minimal transformation steps, but may be slow for large n due to the exponential state space.  
- Efficient pruning (skip already visited arrays) and early termination improves performance.  
- Storing arrays (tuple form) is required for visited set.

### Corner cases to consider  
- nums1 and nums2 are already equal (need 0 operations)
- Completely reversed arrays (max operations)
- Arrays where multiple blocks can be moved easily
- Repeated elements (are they allowed? If so, matching must be careful)
- One element arrays
- Empty arrays (n=0)

### Solution

```python
from collections import deque

def splitMergeArrayTransformation(nums1, nums2):
    # Edge case: if already equal
    if nums1 == nums2:
        return 0

    n = len(nums1)
    visited = set()
    queue = deque()
    # Store (current array, steps taken)
    queue.append((tuple(nums1), 0))
    visited.add(tuple(nums1))

    while queue:
        curr, steps = queue.popleft()
        curr_list = list(curr)
        
        # Try all possible subarrays to move
        for l in range(n):
            for r in range(l, n):
                # Extract subarray to move
                segment = curr_list[l:r+1]
                rest = curr_list[:l] + curr_list[r+1:]
                # Insert at all possible positions in rest
                for pos in range(len(rest)+1):
                    new_list = rest[:pos] + segment + rest[pos:]
                    new_tuple = tuple(new_list)
                    if new_tuple == tuple(nums2):
                        return steps + 1
                    if new_tuple not in visited:
                        visited.add(new_tuple)
                        queue.append((new_tuple, steps + 1))
    # If unreachable, though problem guarantees solution exists
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n!)²) worst-case, since each state is a permutation and for each we try all splits and merges. Practically much better with pruning and early termination.
- **Space Complexity:** O(n!) for the visited set and queue, since each permutation could be stored.

### Potential follow-up questions (as if you’re the interviewer)  

- What is the difference in behavior when there are repeated elements in nums1 / nums2?  
  *Hint: Consider how the state uniqueness check should correctly handle repeated values.*

- Can the optimal solution be found without BFS?  
  *Hint: Consider if there’s a greedy or DP approach based on matching segments.*

- How would you optimize the solution for large n (e.g., n = 10)?  
  *Hint: Think about state compression, only storing necessary information or using A* heuristic to prioritize promising states.*

### Summary
This problem is an example of **state space search** using BFS under custom array transformation rules, a powerful technique whenever we seek "minimum moves" and arbitrary transformation operations. It can be generalized for puzzles (Rubik's Cube, word ladder, sorting with constraints) and teaches careful state management and pruning. The coding pattern is similar to BFS with visited states for minimal path discovery.

### Tags
Array(#array), Hash Table(#hash-table), Breadth-First Search(#breadth-first-search)

### Similar Problems
