### Leetcode 2139 (Medium): Minimum Moves to Reach Target Score [Practice](https://leetcode.com/problems/minimum-moves-to-reach-target-score)

### Description  
Given a starting number **1**, your goal is to reach the **target** number using the least number of moves. In each move, you can either increment your number by 1, or (if you have any left) double your current number. The number of doubles is limited by the parameter **maxDoubles**.  
Return the minimum moves needed to reach exactly the **target**.

### Examples  

**Example 1:**  
Input: `target = 5, maxDoubles = 0`  
Output: `4`  
*Explanation: We must increment: 1 → 2 → 3 → 4 → 5 (4 increments, 0 doubles).*

**Example 2:**  
Input: `target = 19, maxDoubles = 2`  
Output: `7`  
*Explanation:  
- Move 1: 19 is odd, subtract 1 → 18  
- Move 2: 18 is even, halve → 9 (1 double used)  
- Move 3: 9 is odd, subtract 1 → 8  
- Move 4: 8 is even, halve → 4 (2 doubles used)  
- The rest must be increments: 4 → 3 (sub 1), 3 → 2 (sub 1), 2 → 1 (sub 1)  
Total moves = 7.*

**Example 3:**  
Input: `target = 10, maxDoubles = 4`  
Output: `4`  
*Explanation:  
- Move 1: 10 is even, halve → 5 (doubles left: 3)  
- Move 2: 5 is odd, subtract 1 → 4  
- Move 3: 4 is even, halve → 2 (doubles left: 2)  
- Move 4: 2 is even, halve → 1 (doubles left: 1)  
Total moves = 4.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would try every path with increments and doubles. But that's exponential and infeasible for large target.

Key insight: **The optimal path is greedy, working backwards from target to 1.**  
If at any point the current number is even and we still have doubles left, the best move is to halve (since doubling early multiplies progress).  
If it's odd, we have no choice but to decrement by 1 (since you can't halve an odd number).

When you run out of doubles, simply count remaining steps as increments.

This greedy process always leads to the optimal minimum since doubling late is always better than doubling early when constrained.

### Corner cases to consider  
- target = 1 (already at goal, output 0)
- maxDoubles = 0 (only increments allowed)
- Large target value (ensure no overflow)
- maxDoubles > log₂(target): but target will hit 1 before doubles run out
- target is even vs odd
- target is just larger than a power of 2

### Solution

```python
def min_moves(target: int, maxDoubles: int) -> int:
    moves = 0
    # Work backwards from target to 1
    while target > 1 and maxDoubles > 0:
        # If odd, must decrement
        if target % 2 == 1:
            target -= 1
            moves += 1
        else:
            # If even and we can double, halve (simulating reverse double)
            target //= 2
            maxDoubles -= 1
            moves += 1
    # After doubles exhausted, only increments left
    moves += target - 1
    return moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₂(target)) or O(maxDoubles), whichever is smaller. Each step either halves or decrements the number, at most maxDoubles halvings and target-1 decrements in the worst case.
- **Space Complexity:** O(1). Only a few integer variables for state.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could triple instead of double?
  *Hint: Consider the same greedy/bottom-up approach and dynamically use maxTriples.*

- What if you must output the actual operation sequence?
  *Hint: Track steps or reconstruct path by recording operations as you process.*

- What if target can be very large (over 10⁹)?
  *Hint: No change; the algorithm is efficient for large numbers as no recursion or extra space beyond a loop variable.*

### Summary
This problem is a **reverse greedy** game problem and a great application of “work backwards” and “greedy” strategies.  
Every step is either halving (when allowed) or decrementing, and this same pattern appears in problems involving minimum steps, optimal reductions, and minimum operation reductions.  
Common in competitive programming and algorithm interviews, where constraints push you toward optimal use of special operations within limits.


### Flashcard
Work backwards from target to 1—if even and doubles remain, halve; otherwise decrement by 1 until reaching 1.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- Number of Steps to Reduce a Number to Zero(number-of-steps-to-reduce-a-number-to-zero) (Easy)
- Number of Steps to Reduce a Number in Binary Representation to One(number-of-steps-to-reduce-a-number-in-binary-representation-to-one) (Medium)