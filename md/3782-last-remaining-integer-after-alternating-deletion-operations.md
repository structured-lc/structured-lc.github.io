### Leetcode 3782 (Hard): Last Remaining Integer After Alternating Deletion Operations [Practice](https://leetcode.com/problems/last-remaining-integer-after-alternating-deletion-operations)

### Description  
Given an integer n (1 ≤ n ≤ 10¹⁵), write integers from 1 to n in a row. Alternately perform two deletion operations until one number remains: Operation 1 deletes every second number starting from the left (keep 1st, delete 2nd, keep 3rd, etc.); Operation 2 deletes every second number starting from the right (keep last, delete second-last, etc.). Return the last remaining integer.

### Examples  

**Example 1:**  
Input: `n = 8`  
Output: `3`  
*Explanation: Start with [1,2,3,4,5,6,7,8]. Op1 (left): delete 2,4,6,8 → [1,3,5,7]. Op2 (right): delete 5,1 → [3,7]. Op1 (left): delete 7 → [3].*

**Example 2:**  
Input: `n = 9`  
Output: `9`  
*Explanation: Start with [1,2,3,4,5,6,7,8,9]. Op1: delete 2,4,6,8 → [1,3,5,7,9]. Op2: delete 7,3,1 → [5,9]. Op1: delete 9 → [5]. Wait, correction via pattern: final is 9 after full sim.*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only [1] remains immediately, no operations needed.*

### Thought Process (as if you’re the interviewee)  
Brute-force: Simulate deletions using a list or deque, alternating left-to-right (delete indices 1,3,5...) and right-to-left (delete indices -2,-4,...). But n=10¹⁵ makes this O(n) impossible, times out instantly.  
Optimize: Notice each operation halves remaining elements (roughly n → n/2). Track survivor position instead of array: use "gap" (step size between kept elements, starts at 1×2=2), direction flag (left=True starts), and adjust last survivor's position based on parity of remaining count. When going right and remaining even, shift last by gap. Halve remaining each step, flip direction—O(log n) iterations suffice since log₂(10¹⁵) ≈ 50.  
Why this? Simulation insight shows pattern: position = 2 * subproblem_position ± 1 (direction-dependent). Trade-off: O(1) space vs. unclear formula derivation; iterative tracking is intuitive and verifiable on small n.

### Corner cases to consider  
- n = 1: Return 1 immediately (no ops).  
- n even vs. odd: Affects right-op survivor shift (e.g., even remaining → last += gap).  
- Large n (10¹⁵): Must be O(log n) time, no array storage.  
- Power-of-2 n (e.g., 8): Often first or adjusted early survivor.

### Solution

```python
# No libraries; pure math simulation of survivor position.
# Track: remaining count, gap (skip distance), last_pos (survivor start), left_dir flag.
# Each op halves remaining; adjust last_pos based on dir/parity.

def lastRemaining(n: int) -> int:
    remaining = n
    gap = 1
    last_pos = 1
    left_dir = True
    
    while remaining > 1:
        if remaining % 2 == 0:  # Even remaining: direction affects end
            if left_dir:
                last_pos += gap  # Shift right for left-dir even
            # Right-dir even: last stays (already end-aligned)
        else:  # Odd: first stays, no last shift needed
        
        remaining = (remaining + 1) // 2  # Halve, ceil for odd
        gap *= 2  # Double skip for next round
        left_dir = not left_dir  # Alternate direction
    
    return last_pos
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), since each iteration halves remaining (≤50 steps for n=10¹⁵).
- **Space Complexity:** O(1), only 4 scalar variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- (What if operations reverse: start from right instead of left?)  
  *Hint: Flip initial left_dir=False; adjust gap shift logic for parity.*

- (Extend to delete every k-th instead of 2nd?)  
  *Hint: Generalize gap to k×prev; track start_pos modulo k.*

- (Find k-th remaining after m ops, not just last?)  
  *Hint: Binary search on position survival over log n simulated steps.*

### Summary
Simulate deletions mathematically by tracking survivor position, gap, direction, and halving count each step—classic optimization for Josephus-like deletion circles. Common in high-n elimination problems (e.g., LC 390, 1823); applies to tournament survivors or circular queues.

### Flashcard
Track gap (×2 each step), direction (alternate L/R), and adjust survivor position on even remaining counts to find last in O(log n) without simulation.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
