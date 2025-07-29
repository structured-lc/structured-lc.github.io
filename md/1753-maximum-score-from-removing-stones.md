### Leetcode 1753 (Medium): Maximum Score From Removing Stones [Practice](https://leetcode.com/problems/maximum-score-from-removing-stones)

### Description  
You are given three piles of stones with counts `a`, `b`, and `c`. On each turn, you must select **two different non-empty piles**, remove **one stone from each**, and earn **1 point**. The game ends when fewer than two piles are non-empty.  
Return the **maximum score** you can achieve by making moves optimally.

### Examples  

**Example 1:**  
Input: `a = 2, b = 4, c = 6`  
Output: `6`  
*Explanation: Each turn, remove stones from the two largest piles until one runs out. (2,4,6) → (2,3,5) → (2,2,4) → (1,1,3) → (0,0,2): 6 moves total.*

**Example 2:**  
Input: `a = 4, b = 4, c = 6`  
Output: `7`  
*Explanation: After 7 moves, at least two piles become empty: (4,4,6) → ... → (0,1,1).*

**Example 3:**  
Input: `a = 1, b = 8, c = 8`  
Output: `8`  
*Explanation: Max score is min((1+8+8)//2, 1+8) = 8. You can make 8 moves before one pile runs out.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force / Recursion:**  
  Try all possible moves recursively by picking any two non-empty piles and removing one from each. This leads to exponential time complexity, especially with three piles and high values.

- **Observation and Greediness:**  
  Always remove stones from the two largest non-empty piles; this prolongs the game the most, as we want to maximize the number of possible turns.

- **Mathematical Reduction:**  
  Each move removes exactly 2 stones from the total. So, the total number of moves cannot exceed (a+b+c)//2 (since every move removes 2 stones).  
  BUT, if one pile is larger than the sum of the other two (say, c ≥ a+b), once a and b are gone (after a+b moves), only one pile remains, and no more moves can be made.

- **Final Formula:**  
  The answer is min((a+b+c)//2, a+b, b+c, a+c).  
  But since one pile can't be paired if it gets too big, it's simply min((a+b+c)//2, a+b, b+c, a+c). This further reduces to min((a+b+c)//2, a+b+c - max(a,b,c)).

### Corner cases to consider  
- Any one pile is zero: Only as many moves as the sum of the other two.
- One pile much larger than the others (e.g. a=10, b=1, c=1): Max moves is min((a+b+c)//2, b+c).
- All zeros: Score is 0.
- Two or more piles equal.
- Large values (test efficiency).

### Solution

```python
def maximumScore(a: int, b: int, c: int) -> int:
    # Sort the numbers to make comparison easier
    x, y, z = sorted([a, b, c])
    # If largest pile is more than the sum of other two, answer is x + y
    # Else, it's the total stones divided by two (number of moves possible)
    return min(x + y, (x + y + z) // 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Only a sort of three numbers and basic arithmetic.
- **Space Complexity:** O(1). Only a few integer variables, no recursion or extra structure.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have **k piles** instead of 3?
  *Hint: Try to generalize the process of always picking the two largest non-empty piles.*

- What if you get more points for removing from certain pairs?
  *Hint: Consider weighted moves and how this alters the greedy choice.*

- Can you trace the **sequence of moves** for the optimal score?
  *Hint: Simulate the greedy process step by step.*

### Summary
The problem uses a **greedy strategy** and a key mathematical reduction: maximizing the number of moves (score) means pairing the two largest non-empty piles at every turn. The solution's core is min((a+b+c)//2, a+b, b+c, a+c), but this reduces to min(x+y, total//2) due to heap size constraints. This greedy pattern is powerful for two-at-a-time pairing problems with resource removal, and similar logic can be used in scheduling and resource-matching scenarios.