### Leetcode 3576 (Medium): Transform Array to All Equal Elements [Practice](https://leetcode.com/problems/transform-array-to-all-equal-elements)

### Description  
Given an array `nums` containing only `1` and `-1`, you can choose any index `i` (0 ≤ i < n-1) and **multiply** both nums[i] and nums[i+1] by -1 (i.e., flip both their signs) in a single move.  
The goal is to determine the **minimum number of operations** needed to make all elements equal (either all 1 or all -1).  
Return the minimal number of moves.

### Examples  

**Example 1:**  
Input: `nums = [1, -1, 1, -1, 1]`  
Output: `2`  
*Explanation:  
- Flip at i=1: nums becomes [1, 1, -1, -1, 1]  
- Flip at i=2: nums becomes [1, 1, 1, 1, 1]*

**Example 2:**  
Input: `nums = [1, 1, 1, -1]`  
Output: `1`  
*Explanation:  
- Flip at i=2: nums becomes [1, 1, 1, 1]*

**Example 3:**  
Input: `nums = [-1, -1, -1, 1]`  
Output: `1`  
*Explanation:  
- Flip at i=2: nums becomes [-1, -1, -1, -1]*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible sequence of flips, checking both targets (all 1 and all -1), using BFS or backtracking. However, the number of possible states grows exponentially and the search space is too large for practical use even for medium-length arrays.

- **Observation:**  
  Each flip operation at index i affects both nums[i] and nums[i+1].  
  Since array values are only 1 and -1, we can approach the problem greedily:
  - If we want to make all `target` (choose 1 or -1), process left to right.
  - For each position, if nums[i] ≠ target, flip at i — this changes nums[i] and nums[i+1]:
    - That guarantees after flipping, nums[i] == target.  
    - Move forward.

- **Why this works:**  
  Each operation fixes the mismatch at position i and only possibly introduces a difference at i+1, which will be considered in the next step. There are no "overlapping" or undoing issues since flips never "unfix" previous elements.

- **Final solution:**  
  Try both target = 1 and target = -1, and return the smaller number of moves. This greedy approach is O(n) and always optimal for this problem.

### Corner cases to consider  
- Empty array (should not happen, but if so, zero moves).
- All elements already equal (no moves needed).
- Only one element (no moves, as no pairs).
- Two elements, already equal vs. need a flip.
- Alternating sequence (e.g., [1, -1, 1, -1, ...]).

### Solution

```python
def min_operations(nums):
    n = len(nums)
    # Try making all elements 1 and all -1, take the minimal moves required
    def moves_to_make(target):
        arr = nums[:]
        count = 0
        for i in range(n - 1):
            if arr[i] != target:
                # Flip arr[i] and arr[i+1]
                arr[i] *= -1
                arr[i+1] *= -1
                count += 1
        # After all flips, check if whole array is target
        if all(x == target for x in arr):
            return count
        return float('inf')
    return min(moves_to_make(1), moves_to_make(-1))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each pass over the array takes O(n), and we do two passes (target=1 and -1). Checking with all() at the end also takes O(n).

- **Space Complexity:** O(n)  
  We copy nums for each try, so O(n) extra space per call (could be optimized with in-place modification if allowed).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could contain numbers other than 1 and -1?  
  *Hint: How would the flip operation generalize for arbitrary values?*

- Can you do it in-place without extra storage?  
  *Hint: Try modifying the input as you go or restoring at the end.*

- What if the flip operation could select any k consecutive elements (k ≥ 2)?  
  *Hint: Try to generalize the greedy method for sliding windows of arbitrary length.*

### Summary
The key coding pattern is **Greedy array transformation**, where each operation is structured to irreversibly fix a mismatch. This is common in problems with adjacent pair flips, bulbs, or dominos. Related patterns:  
- Greedy "fix from left to right"  
- Minimum flips to make all elements equal  
- Array prefix transformations

The pattern applies to bit flipping, sign flipping, bulbs, and similar types of sequence-adjustment questions.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
