### Leetcode 3264 (Easy): Final Array State After K Multiplication Operations I [Practice](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i)

### Description  
Given an array of integers `nums`, an integer `k`, and an integer `multiplier`:  
Perform the following operation `k` times:  
- Find the **minimum value** in `nums`.  
- If there are multiple minimums, pick the first occurrence (lowest index).
- Replace that value with itself multiplied by `multiplier`.  
At the end, return the final state of the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2], k = 3, multiplier = 4`  
Output: `[16,8]`  
*Explanation:  
1. The min is 1 at index 0: [4,2]  
2. The min is 2 at index 1: [4,8]  
3. The min is 4 at index 0: [16,8]*

**Example 2:**  
Input: `nums = [2,1,3,5,6], k = 5, multiplier = 2`  
Output: `[8,4,6,5,6]`  
*Explanation:  
1. Min is 1 at idx 1: [2,2,3,5,6]  
2. Min is 2 at idx 0: [4,2,3,5,6]  
3. Min is 2 at idx 1: [4,4,3,5,6]  
4. Min is 3 at idx 2: [4,4,6,5,6]  
5. Min is 4 at idx 0: [8,4,6,5,6]*

**Example 3:**  
Input: `nums = [5], k = 2, multiplier = 3`  
Output: ``  
*Explanation:  
1. Min is 5:   
2. Min is 15: *

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Iterate `k` times; in each operation, traverse `nums` to find the minimum (first, if several), then update it. This is O(k × n).  
- **Optimization:**  
  Each update only affects one value, but since the minimum could change after each operation, we need a way to always quickly retrieve the minimum and its first occurrence.
  Using a min-heap (priority queue) won’t update the original array in-place or honor “first occurrence” easily.
- For small `k` or small `n`, brute-force is fine due to simple constraints.
- For larger sizes, we could keep an index-min heap (storing value and index), but must update heap when values in `nums` change—this is complex for this problem, and since we need to check for first occurrence, a linear scan per operation is safest and matches the description.
- Unless `k` is very large (compared to `n`), the brute-force approach works well.

### Corner cases to consider  
- `nums` has only one element (it gets multiplied by multiplier repeatedly).
- `k = 0` (no operation, return the input as-is).
- All `nums` elements are equal (always pick the first occurrence).
- `multiplier = 1` (no actual change, but min position still must be found each time).
- `multiplier = 0` (number at min index is set to 0, will always be picked again).
- Large values and possible integer overflow.

### Solution

```python
def final_array_state(nums, k, multiplier):
    # Make a copy to avoid modifying input
    arr = list(nums)

    for _ in range(k):
        # Find min value and its first index
        min_val = arr[0]
        min_idx = 0
        for i in range(1, len(arr)):
            if arr[i] < min_val:
                min_val = arr[i]
                min_idx = i
        # Replace with multiplied value
        arr[min_idx] = arr[min_idx] * multiplier

    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × n)  
  For each of k operations, we scan the n-element array to find the minimum and its index.
- **Space Complexity:** O(n)  
  For the array copy (`arr`). No extra data structures of significant size (no recursion or heap used).

### Potential follow-up questions (as if you’re the interviewer)  

- What if `k` is extremely large compared to `n`?  
  *Hint: Is there a repeating behavior or a way to shortcut repeated multiplication on the same element?*

- What if the array could be very large (up to millions of elements) and we need a faster minimum retrieval than O(n) per operation?  
  *Hint: Use a data structure supporting fast min retrieval and index tracking, e.g., min-heap with indices, or segment tree.*

- What if, instead of minimum, you had to pick the maximum or median?  
  *Hint: How would you adapt your scan or data structure for those?*

### Summary
This problem follows the *simulation with array scanning* pattern.  
Each step's decision is deterministic and does not need greedy or DP approaches—just repeat the given command sequence. Scanning for min each time is slow for huge arrays, but matches the problem's first-occurrence requirement. This pattern arises in problems about applying repeated deterministic operations, where array scanning or simple queue/deque simulation is enough.


### Flashcard
Use a min-heap to track the minimum element and its index; for each of k operations, pop the min, multiply by multiplier, and push back.

### Tags
Array(#array), Math(#math), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
