### Leetcode 754 (Medium): Reach a Number [Practice](https://leetcode.com/problems/reach-a-number)

### Description  
You start at position 0 on an infinite number line. Given a target position (could be positive or negative), in each move you can step either to the left or right, and the move number indicates how many steps you take (first move is 1 step, second is 2 steps, etc.). Find the **minimum number of moves** needed to land **exactly** on the target.  
At each stage, you decide the direction but must take i steps on the iᵗʰ move.

### Examples  

**Example 1:**  
Input: `target = 2`  
Output: `3`  
*Explanation: Move 1: 0 → 1 (1); Move 2: 1 → -1 (2, left); Move 3: -1 → 2 (3, right). So it takes 3 moves.*

**Example 2:**  
Input: `target = 3`  
Output: `2`  
*Explanation: Move 1: 0 → 1 (1); Move 2: 1 → 3 (2, right). Reached target in just 2 moves.*

**Example 3:**  
Input: `target = -4`  
Output: `3`  
*Explanation: Move 1: 0 → 1 (1, right); Move 2: 1 → -1 (2, left); Move 3: -1 → -4 (3, left).*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea would be to simulate all possible move combinations, switching directions at each move. But this becomes exponential, quickly infeasible for large targets.

Observing the sequence: after n moves, the **maximum position** reached is `1 + 2 + ... + n = n × (n + 1) / 2`. If this sum equals target, the answer is n. If it's larger, we might need to flip some moves (change their sign) to adjust the total. 

Key insight: flipping the sign of one move i reduces the sum by 2 × i.  
So if the overshoot over target is even (i.e., `sum - target` is even), we can reach target by flipping the direction of some moves. If not, we have to keep adding more moves until the excess becomes even.

So the algorithm is:
- Always work with abs(target) (symmetric around zero).
- Increase n until the sum ≥ target and (sum - target) is even.

This avoids brute-force and gives a very efficient approach.

### Corner cases to consider  
- Negative targets (should work since the movement is symmetric)
- Large positive/negative targets
- Targets close to zero (target = 1, -1)
- When sum(n) exactly equals target
- When sum(n) > target by even/odd margin

### Solution

```python
def reachNumber(target: int) -> int:
    # Problem is symmetric, so work with absolute target
    target = abs(target)
    step = 0
    total = 0
    # Increase step until we go >= target and the 'overshoot' is even
    while total < target or (total - target) % 2 != 0:
        step += 1
        total += step
    return step
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√target)  
  Because at most you need about O(√target) steps before n × (n + 1) / 2 passes target.
- **Space Complexity:** O(1)  
  Uses only a few variables, no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only move right (positive direction) at every step?  
  *Hint: When can you exactly land on the target, and what would the formula be?*

- What if you could skip moves (not required to use all initial moves 1, 2, ..., n)?  
  *Hint: Can you form any target with some subset, or is there a minimal residual set?*

- What if some moves are limited (e.g., only K left moves allowed)?  
  *Hint: How would you model this as a restricted subset sum problem?*

### Summary
This problem uses **mathematical insight with greedy increment** and parity checking. It shows up often in problems dealing with sum of sequences and reachability using steps of increasing sizes. A similar pattern appears in subset sum types and greedy parity-based reachability questions. The main trick is realizing you only need to check when the overshoot is even, as signs can be flipped to adjust the total. This makes it much faster than backtracking or BFS.


### Flashcard
Find minimal n such that 1+2+…+n ≥ |target| and (sum−target) is even; flipping moves adjusts the total by 2×i.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
- Number of Ways to Reach a Position After Exactly k Steps(number-of-ways-to-reach-a-position-after-exactly-k-steps) (Medium)