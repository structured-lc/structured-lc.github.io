### Leetcode 2543 (Hard): Check if Point Is Reachable [Practice](https://leetcode.com/problems/check-if-point-is-reachable)

### Description  
Given a starting point (1,1) on a grid, and given two positive integers targetX and targetY, determine if you can reach the point (targetX, targetY) using any number of the two following moves:  
- (x, y) → (x + y, y)  
- (x, y) → (x, x + y)

You can use these moves any number of times in any order. Return True if you can reach (targetX, targetY) from (1,1); otherwise, return False.

### Examples  

**Example 1:**  
Input: `targetX = 6, targetY = 9`  
Output: `False`  
*Explanation: You cannot reach (6,9) from (1,1) by repeatedly applying the allowed moves.*

**Example 2:**  
Input: `targetX = 4, targetY = 7`  
Output: `True`  
*Explanation: (1,1) → (2,1) → (2,3) → (5,3) → (5,8) → ... you can reach (4,7) via different sequences of moves.*

**Example 3:**  
Input: `targetX = 9, targetY = 3`  
Output: `False`  
*Explanation: You are not able to reach (9,3) from (1,1) using the allowed moves.*

### Thought Process (as if you’re the interviewee)  
Let me try to model allowed moves:  
- We can always add one coordinate to the other, which means both numbers can grow rapidly.
- Brute force: Try all possible sequences and see if they lead to (targetX, targetY). However, this would be too slow since the tree grows exponentially.

Let’s try to work backward. If at (x, y), then the only possible previous states are either (x−y, y) if x>y, or (x, y−x) if y>x, as we must have done a move to result in the current state.  
This is similar to the Euclidean algorithm for GCD, which keeps subtracting the smaller number from the bigger one.

Notice that once the numbers become equal, all further moves just keep them equal. The process stops progressing.

The key insight: we can only reach (targetX, targetY) from (1,1) if GCD(targetX, targetY) is a power of 2.  
- Why? Because at each subtraction, the GCD does not change, and the original point (1,1) has gcd 1 (which is 2⁰).
- Also, using both moves ensures the order doesn’t matter; GCD reduction applies regardless.

So, final approach:
- Compute gcd(targetX, targetY).
- Check if it's a power of two (gcd > 0 and gcd & (gcd - 1) == 0).

### Corner cases to consider  
- targetX or targetY == 1 (should always be reachable since you can build up from (1,1)).
- targetX == targetY (then only multiples of them via addition, but stuck if not a power of 2).
- Very large targetX, targetY (make sure algorithm is efficient — Euclidean algorithm is log(max(x,y))).
- targetX or targetY is odd vs even (parity doesn’t alone determine outcome, but influences GCD).
- Both numbers much larger than 2⁰ but GCD not a power of two.

### Solution

```python
def isReachable(targetX: int, targetY: int) -> bool:
    # Helper to compute gcd
    def gcd(a: int, b: int) -> int:
        while b:
            a, b = b, a % b
        return a

    x = gcd(targetX, targetY)

    # To check if x is a power of 2
    # Power of two property: x & (x - 1) == 0 and x > 0
    return x > 0 and (x & (x - 1)) == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log targetX + log targetY), due to GCD computation, which is logarithmic in input size.
- **Space Complexity:** O(1), only constant extra space is used (no recursion stack or large data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you find the minimum number of moves to reach (targetX, targetY)?
  *Hint: Try to reverse engineer using BFS or DP.*

- What if the moves allowed were to add any integer multiple of one coordinate to the other in a single move?
  *Hint: How does this change the reachable set?*

- Is this method optimal if the starting point is not (1,1), but any (a,b)?
  *Hint: How would you generalize your GCD condition?*

### Summary
This problem is a classic *number theory/GCD backtrack* type, where moving backward using GCD and powers of two efficiently solves the problem.  
The pattern of reducing numbers by moving backward and checking GCD is common in grid-reachability and Diophantine equation-type interview questions. This problem also demonstrates how surprising constraints can often be turned into elegant bitwise and mathematical checks.