### Leetcode 780 (Hard): Reaching Points [Practice](https://leetcode.com/problems/reaching-points)

### Description  
Given two start coordinates (**sx, sy**) and two target coordinates (**tx, ty**), you can transform a point (x, y) in exactly two ways:  
- (x, y) → (x + y, y)  
- (x, y) → (x, x + y)  
At each step, you can only increase one coordinate by adding the other.  
Return `True` if you can reach (tx, ty) starting from (sx, sy) using these moves; else, return `False`.  
You may only increment coordinates, never decrement.

### Examples  

**Example 1:**  
Input: `sx = 1, sy = 1, tx = 3, ty = 5`  
Output: `True`  
*Explanation: 1,1 → 1,2 → 3,2 → 3,5. So we can reach the target.*

**Example 2:**  
Input: `sx = 1, sy = 1, tx = 2, ty = 2`  
Output: `False`  
*Explanation: It's impossible to make both coordinates equal by only incrementing one at a time.*

**Example 3:**  
Input: `sx = 1, sy = 1, tx = 1, ty = 1`  
Output: `True`  
*Explanation: We're already at the target.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force/Recursion:**  
  My first instinct is to try all possible sequences of moves from (sx, sy) to (tx, ty), but for large coordinates, the number of states grows exponentially and will quickly time out.  
- **Working Backwards:**  
  Since every step can only increase one coordinate by the other, we can consider reversing the operations from the target point. Reverse moves go from (tx, ty) to either (tx - ty, ty) (if tx > ty) or (tx, ty - tx) (if ty > tx).  
  However, subtracting one by one is still slow for big numbers.
- **Optimization (using Modulo):**  
  When one coordinate is much bigger than the other, instead of repeating subtraction, we can use modulus (tx % ty) to "jump" back faster. This is because, in forward moves, such jumps accumulate when we always pick the same addend, so in reverse we want the effect of many subtractions in one go.  
- **Base Cases:**  
  When either coordinate matches the start, check if the other can be reached with repeated additions.

### Corner cases to consider  
- Start and target are the same (already there)
- One move away (e.g., (1,1) to (2,1))
- If start values are larger than end values (impossible: should return False)
- When one coordinate matches, but the other cannot be adjusted to the target via adding multiples of the fixed coordinate
- Large numbers (check efficiency)

### Solution

```python
def reachingPoints(sx, sy, tx, ty):
    # Loop backwards from (tx, ty) to (sx, sy)
    while tx > sx and ty > sy:
        if tx > ty:
            tx %= ty
        else:
            ty %= tx
    # Handle cases where one coordinate matches
    if tx == sx and ty == sy:
        return True
    if tx == sx and ty > sy and (ty - sy) % sx == 0:
        return True
    if ty == sy and tx > sx and (tx - sx) % sy == 0:
        return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log max(tx, ty))  
  Because at each step we reduce the larger coordinate dramatically via modulo, the number of steps is proportional to the number of digits in the coordinates, not their magnitude.
- **Space Complexity:** O(1)  
  Only a constant number of variables are used; no recursion or additional storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can decrement either coordinate instead of only incrementing?
  *Hint: How does the reachability graph and possible backtracking change?*
- Can you list all possible paths (not just check existence)?
  *Hint: Try to reconstruct the precise sequence by saving path choices.*
- How would you adapt this if moves could be (x + k\*y, y) for any k ≥ 1?
  *Hint: Is there a direct jump using arithmetic properties?*

### Summary
This problem is a **reverse engineering** and **modulo optimization** pattern.  
Instead of brute-force BFS/DFS, we solve it by working backwards, reducing the problem via mathematics.  
The modulo trick dramatically cuts down redundant subtractions, making the algorithm efficient even for large coordinate ranges.  
This reverse thinking approach is also useful for other grid/matrix reachability and number transformation problems.


### Flashcard
Work backwards from (tx, ty) to (sx, sy) by repeatedly subtracting the smaller from the larger (modulo), since only additions are allowed forward; check if you can reach (sx, sy) exactly.

### Tags
Math(#math)

### Similar Problems
- Number of Ways to Reach a Position After Exactly k Steps(number-of-ways-to-reach-a-position-after-exactly-k-steps) (Medium)
- Check if Point Is Reachable(check-if-point-is-reachable) (Hard)
- Determine if a Cell Is Reachable at a Given Time(determine-if-a-cell-is-reachable-at-a-given-time) (Medium)