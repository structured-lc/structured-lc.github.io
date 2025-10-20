### Leetcode 1144 (Medium): Decrease Elements To Make Array Zigzag [Practice](https://leetcode.com/problems/decrease-elements-to-make-array-zigzag)

### Description  
Given an array of integers (`nums`), you can pick any element and repeatedly decrease it by 1 at a time. You need to make the array a *zigzag array*:  
- **Option 1:** Every even-indexed element is greater than both adjacent elements:  
  `nums > nums[1] < nums[2] > nums[3] < ...`  
- **Option 2:** Every odd-indexed element is greater than both adjacent elements:  
  `nums < nums[1] > nums[2] < nums[3] > ...`  
Return the **minimum number of decreases needed** to convert `nums` into *either* zigzag pattern.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `2`  
*Explanation: Decrease `nums[1]` from 2 → 0 or decrease `nums[2]` from 3 → 1. Both approaches give 2 moves and result in a zigzag array.*

**Example 2:**  
Input: `nums = [9,6,1,6,2]`  
Output: `4`  
*Explanation:  
- For even-zigzag:  
  Decrease `nums` by 4 (from 9→5, as neighbors are 6),  
  `nums[2]` is already smaller than neighbors,  
  decrease `nums[4]` by 1 (from 2→1, neighbor is 6),  
  total moves = 4+0+1=5.    
- For odd-zigzag:  
  Decrease `nums[1]` by 1 (from 6→5, neighbors 9/1),  
  decrease `nums[3]` by 3 (from 6→3, neighbors 1/2), total moves = 1+3=4.  
  Minimum is 4.*

**Example 3:**  
Input: `nums = [2,7,10,9,8,9]`  
Output: `4`  
*Explanation: Decrease approaches applied at required positions, total minimum moves = 4.*

### Thought Process (as if you’re the interviewee)  
Start by observing that a zigzag array has two mutually exclusive patterns:
- Even index peaks, odd index valleys
- Odd index peaks, even index valleys

For each index, check how many moves are needed to make it a *valley* (smaller than both neighbors). Valley elements never need increases—only decreases.  
Check both patterns independently:
- For every even index: reduce those to form valleys in the [odd-peak] pattern.
- For every odd index: reduce those to form valleys in the [even-peak] pattern.

For each position, if the element is not already less than both neighbors, compute how much to decrease it (so it's strictly less than min(left, right)).  
Sum the moves for "even valleys" and for "odd valleys" patterns, and return the minimum.

Trade-offs:  
- O(n) time and O(1) space, as only two cumulative counters are tracked.
- No sorting or extra space needed; only current and neighbor values are used.

### Corner cases to consider  
- Length 1: only one element, always zigzag (output 0).
- All equal elements: must decrease every alternate element, pattern applies.
- Arrays with only valleys or only peaks.
- Ascending or descending arrays.
- Arrays with exactly two elements.
- Some neighbors don't exist (check boundaries: position 0 and n-1).

### Solution

```python
def movesToMakeZigzag(nums):
    n = len(nums)
    res = [0, 0]  # res[0]: even peaks; res[1]: odd peaks

    for pattern in [0, 1]:  # pattern = 0 (even valleys), 1 (odd valleys)
        moves = 0
        for i in range(n):
            if i % 2 == pattern:
                left = nums[i - 1] if i - 1 >= 0 else float('inf')
                right = nums[i + 1] if i + 1 < n else float('inf')
                decrease_to = min(left, right) - 1
                if nums[i] > decrease_to:
                    moves += nums[i] - decrease_to
        res[pattern] = moves

    return min(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Justification: Each index is visited twice (once per pattern). Simple neighbor checks and arithmetic each time.
- **Space Complexity:** O(1).  
  Only two counters tracked for moves; no extra arrays proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could *also* increase elements, not just decrease?
  *Hint: Is it always optimal to decrease?*

- If each decrease/increase operation has a different cost (given as array)?
  *Hint: How do you generalize the "minimize moves" calculation?*

- How would you modify the solution if "zigzag" conditions used “>=” or “<=” instead?
  *Hint: Can you still greedily reduce peaks?*

### Summary
This solution employs the **greedy pattern** tailored to a two-alternative dynamic, partitioning indices based on parity and minimizing moves per group. No fancy data structures required—just adjacent neighbor logic and keeping a running total. This pattern of evaluating both 'choices' and selecting the best can apply to other similar alternation or parity-based array problems.


### Flashcard
Compute moves needed for both zigzag patterns (even/odd valleys); return the minimum total moves.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
