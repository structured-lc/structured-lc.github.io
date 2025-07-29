### Leetcode 801 (Hard): Minimum Swaps To Make Sequences Increasing [Practice](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing)

### Description  
You are given two integer arrays **A** and **B** of the same length. At each index, you can choose to swap **A[i]** with **B[i]** (the swap occurs only between elements at the same index in each sequence).  
Your goal is to make both sequences strictly increasing using the fewest possible swaps. (A sequence is strictly increasing if each element is greater than the previous one.)  
Return the minimum number of swaps required. It is guaranteed that it is always possible to do so.

### Examples  

**Example 1:**  
Input: `A = [1,3,5,4]`, `B = [1,2,3,7]`  
Output: `1`  
Explanation:  
Swap A[3] and B[3].  
Result:  
A = [1,3,5,7]  
B = [1,2,3,4]  
Both are strictly increasing.

**Example 2:**  
Input: `A = [0,4,4,5,9]`, `B = [0,1,6,8,10]`  
Output: `1`  
Explanation:  
Swap A[2] and B[2] to get:  
A = [0,4,6,5,9], B = [0,1,4,8,10]  
Not strictly increasing, so swap at index 1 instead.  
Best answer: Swap at index 1.  
Result:  
A = [0,1,4,5,9], B = [0,4,6,8,10], both strictly increasing.

**Example 3:**  
Input: `A = [1,5,3,7,9]`, `B = [1,4,6,8,10]`  
Output: `1`  
Explanation:  
Swap A[2] and B[2] to get:  
A = [1,5,6,7,9], B = [1,4,3,8,10]  
But then B is not strictly increasing.  
Best answer: Swap at index 1.  
Result:  
A = [1,4,3,7,9], B = [1,5,6,8,10], still not strictly increasing.  
Best answer is actually swap at index 2 only.  
A = [1,5,6,7,9], B = [1,4,3,8,10]  
But still one swap is needed.

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach**: Try all combinations of swaps (recursive/backtracking). This leads to exponential time complexity since at each index you can choose to swap or not swap, leading to 2ⁿ possibilities. Not feasible for n up to 1000.
- **DP optimization**: 
  - Let’s keep track, for each index, of two cases:
    - `keep[i]`: minimum swaps to make first i elements strictly increasing _without_ swapping at index i.
    - `swap[i]`: minimum swaps if we _do_ swap at index i.
  - At each index, consider two cases:
    - If both A[i-1] < A[i] and B[i-1] < B[i]: it's possible to keep both orderings from previous step.
    - If A[i-1] < B[i] and B[i-1] < A[i]: crossing swaps may yield strictly increasing sequences.
  - Update the state using the previous keep/swap values.
  - Only need two variables for keep and swap, and update in place.

### Corner cases to consider  
- Single-element arrays (no swaps needed)
- Sequences already strictly increasing (minimum swaps is 0)
- Equal elements at consecutive positions (should not be allowed, based on the constraints)
- Strictly decreasing arrays (will require more swaps)
- Swapping does not always fix locally; global solution needed.

### Solution

```python
def minSwap(A, B):
    n = len(A)
    # keep: min swaps if do NOT swap at i
    # swap: min swaps if swap at i
    keep, swap = 0, 1
    
    for i in range(1, n):
        keep_next = swap_next = float('inf')
        
        # Case 1: Both sequences are strictly increasing if we do nothing
        if A[i-1] < A[i] and B[i-1] < B[i]:
            keep_next = min(keep_next, keep)
            swap_next = min(swap_next, swap + 1)
        
        # Case 2: Both sequences are strictly increasing if we swap current i
        if A[i-1] < B[i] and B[i-1] < A[i]:
            keep_next = min(keep_next, swap)
            swap_next = min(swap_next, keep + 1)
        
        keep, swap = keep_next, swap_next
    
    return min(keep, swap)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate once through the array, and each step does constant work.
- **Space Complexity:** O(1), only a few variables kept for computation; no additional arrays needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of strictly increasing, we had to ensure non-decreasing sequences?
  *Hint: Adjust the comparisons to allow equal elements: use ≤ operators.*

- Could you return the list of indices where swaps are made?
  *Hint: Trace-back solution path by storing previous choice at each index.*

- How would you solve it if swaps were allowed at any positions, not just the same index?
  *Hint: The problem turns into a variant of the minimum number of swaps to sort two sequences, likely requiring graph matching / cycle decomposition.*

### Summary
This problem uses a **dynamic programming** ("state compression DP") approach. Patterns like this—tracking cost both with and without an operation at each step—commonly appear in array swap-minimization and editing problems. The O(n) DP with only O(1) space is very efficient; this approach is reusable for various follow-up constraints (e.g., non-decreasing, different swap rules).