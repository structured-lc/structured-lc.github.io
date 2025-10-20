### Leetcode 1526 (Hard): Minimum Number of Increments on Subarrays to Form a Target Array [Practice](https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array)

### Description  
Given a target array containing n integers, you start with an initial array of zeros of the same size. In each operation, you may pick any (contiguous) subarray and increment every element of that subarray by 1. The goal is to use as few operations as possible to reach the target array, and return that minimum number of operations.

Put simply:  
- Start with `[0, 0, ..., 0]` (n elements).  
- In each step, pick any segment `[l, r]` and increment every element from l to r by 1.  
- What’s the *minimum number* of steps to reach exactly `target`?

### Examples  

**Example 1:**  
Input: `target = [1,2,3,2,1]`  
Output: `3`  
*Explanation:  
- Operation 1: increment whole array → [1,1,1,1,1]  
- Operation 2: increment subarray [1,2,3] → [1,2,2,2,1]  
- Operation 3: increment subarray [2] → [1,2,3,2,1]*

**Example 2:**  
Input: `target = [3,1,1,2]`  
Output: `4`  
*Explanation:  
- Operation 1: increment  3 times → [3,0,0,0] (actually we do this in increments across allowed subarrays)
- Operation 2: increment [1] once → [3,1,0,0]  
- Operation 3: increment [2] once → [3,1,1,0]  
- Operation 4: increment [3] twice → [3,1,1,2]*

**Example 3:**  
Input: `target = [1,1,1,1]`  
Output: `1`  
*Explanation:  
- One operation over entire array → [1,1,1,1]*

### Thought Process (as if you’re the interviewee)  
Start with a brute force:  
- For every increment needed at index i, we could in the worst case increment that position individually.
- Could we reuse operations? Yes: a single increment of a large subarray can help all of its elements at once.

Optimizing:  
- At each position, if the target value increases compared to the previous position, you *must* do enough increments to reach the new peak, starting from that index.
- Concretely, every time you see a "step up" at position i (`target[i] > target[i-1]`), you must do `(target[i] - target[i-1])` more operations starting at i (or covering i).
- The total number of operations is thus:  
  - Add `target` (since we need to increment from zero).
  - For every "step up" between adjacent elements, add the difference.

Why does this work?  
- Any "run" of constant or decreasing values can be built by operations done earlier.
- Increases require explicit new work, and it is not optimal to "spread out" increments unnecessarily.

Final approach:  
- Walk left to right, accumulate sum of all positive increases (including `target`).

### Corner cases to consider  
- Empty array `[]`: return 0.
- All zeros `[0,0,...,0]`: return 0 (already reached target).
- All elements the same: only need one operation (if nonzero).
- Large jumps (e.g., `[0,10,0,10]`): ensure only actual increases count.
- Oscillating patterns (up and downs).

### Solution

```python
def minNumberOperations(target):
    # Edge case
    if not target:
        return 0

    # Start with the first element (from zero)
    res = target[0]

    # For each subsequent element,
    # add (target[i] - target[i-1]) if it's a positive difference
    for i in range(1, len(target)):
        if target[i] > target[i - 1]:
            res += target[i] - target[i - 1]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of target. We scan the array once.
- **Space Complexity:** O(1) extra space; only a few variables, nothing grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you were restricted to only incrementing subarrays of length ≥ k. How does your answer change?  
  *Hint: Think about partitioning the problem and possibly DP.*

- How would you modify the algorithm for a stream of updates to the target array?  
  *Hint: Precompute initial result, then update only affected parts after each change.*

- What if instead of increments you could increment/decrement?  
  *Hint: Consider each transition separately (positive/negative).*

### Summary
This problem is a great example of a **greedy algorithm** and the "prefix diff" approach—any time a jump up in values appears, it must be covered by new explicit subarray increments. Variants of this pattern show up in interval painting, histogram filling, and delta-encoding scenarios. Understanding when new operations are necessary (vs. when coverage from old operations suffices) helps bring the time down to linear, a theme in many optimal sequence transformation problems.


### Flashcard
Incrementally build up to target values by ensuring each step up in the target array is covered by a single operation that increments all necessary subarray elements at once.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
