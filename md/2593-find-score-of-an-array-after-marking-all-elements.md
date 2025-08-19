### Leetcode 2593 (Medium): Find Score of an Array After Marking All Elements [Practice](https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements)

### Description  
Given an array of positive integers, repeatedly find the smallest unmarked number (choosing the leftmost if tied), add its value to your score, and then mark it plus its immediate neighbors (if any) as "marked". Continue this process until everything is marked. The goal is to return the final score you accumulate.  
Effectively, at each step, you must make the optimal next choice (smallest unmarked, leftmost in tie), and marking that element makes it and its adjacent ones unavailable for future choices.

### Examples  

**Example 1:**  
Input: `[2, 1, 3, 4, 5, 2]`  
Output: `7`  
*Explanation:  
- Step 1: Choose 1 (index 1). Score=1. Mark indices 0,1,2 → Marked: [X, X, X, _, _, _]  
- Step 2: Next smallest unmarked is 4 (index 3). Score=1+4=5. Mark indices 2,3,4 → (3 is already marked, but that's fine) Marked: [X, X, X, X, X, _]  
- Step 3: Only index 5 left, which is 2. Score=5+2=7. Now all marked.*

**Example 2:**  
Input: `[2, 3, 5, 1, 3, 2]`  
Output: `5`  
*Explanation:  
- Step 1: Choose 1 (index 3). Score=1. Mark indices 2,3,4 → [_, _, X, X, X, _]  
- Step 2: Next smallest is 2 (index 0). Score=1+2=3. Mark indices 0,1 → [X, X, X, X, X, _]  
- Step 3: Next is 2 (index 5). Score=3+2=5. Mark indices 4,5 (already marked, mark again). All marked.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation:  
- Only one element. Mark index 0. Score=1.*

### Thought Process (as if you’re the interviewee)  

Brute force:
- At each step, scan the entire array for the smallest unmarked element (leftmost in tie), mark, and repeat.
- This is O(n²) since each pick could cost up to O(n) searches, and up to n picks.

Optimization:
- We can use a **min-heap** where each item is (value, index) so we always have quick access to the smallest remaining unmarked.
- To resolve "already marked" in the heap: When popping from the heap, check if it's marked; if so, just skip and pop again.
- For marking, we keep a boolean array of length n and after picking index i, mark i and its ±1 neighbors if within bounds.

Why use a heap?
- Finding the min unmarked is O(1) per step (after setup).
- Only O(n log n) overall for initial heap build and pops.
- Marking array makes checking/skipping fast.

Trade-offs:
- Slight overhead in extra tracking structures, but the most efficient solution for competitive programming/interview.

### Corner cases to consider  
- Array with all identical elements.
- Minimum size: only one element.
- All elements are already ordered increasingly or decreasingly.
- Adjacent duplicates.
- Large arrays (efficiency/heap-operations scale).
- Picking at start or end of array (shouldn’t try to mark “outside” bounds).
- "Marking" overlaps (multiple picks cause same index to be marked again: should handle cleanly).

### Solution

```python
def findScore(nums):
    import heapq

    n = len(nums)
    # Each heap entry: (value, index)
    min_heap = [(num, idx) for idx, num in enumerate(nums)]
    heapq.heapify(min_heap)

    marked = [False] * n
    score = 0
    remaining = n

    while remaining > 0:
        # Get the smallest unmarked
        value, idx = heapq.heappop(min_heap)
        if marked[idx]:
            continue  # Already marked, just skip

        score += value
        # Mark this index and its left/right neighbors
        for i in (idx-1, idx, idx+1):
            if 0 <= i < n and not marked[i]:
                marked[i] = True
                remaining -= 1

    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Initial heapify is O(n), pops are O(log n) each but only up to n necessary.  
  - Marking/checking is O(1) per operation, so overall dominated by heap operations.

- **Space Complexity:** O(n)  
  - For `marked` status array and heap of n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if instead of marking both neighbors, you only marked the element itself?
  *Hint: Only the picked index would be marked; would it improve the score? Logic or code changes?*

- What if the marking was not both neighbors but only one neighbor (choose left or right)?
  *Hint: How do you model the effect of this asymmetry in marking?*

- Can you do this in-place to reduce auxiliary space?
  *Hint: Overwrite input or encode marked status implicitly? When is it safe?*

### Summary
This solution uses the **min-heap (priority queue) pattern** to efficiently always pick the smallest "valid" element, with *auxiliary marking* to enforce pick constraints due to marking/removal. Recognizing that the state (marked/unmarked) is just a boolean per entry allows for an efficient check/skipping logic. This approach is common in **greedy algorithms** and shows up when global minimums get invalidated as the process unfolds, or when "neighbor impact" requires state tracking. The pattern is broadly applicable to similar "mark and skip" or "local impact" selection problems.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
- Sort Integers by The Power Value(sort-integers-by-the-power-value) (Medium)