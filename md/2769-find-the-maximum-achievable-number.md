### Leetcode 2769 (Easy): Find the Maximum Achievable Number [Practice](https://leetcode.com/problems/find-the-maximum-achievable-number)

### Description  
Given two integers, **num** and **t**, you can perform up to **t** operations on any integer **x**.  
Each operation lets you:
- Increase or decrease **x** by 1, and simultaneously do the opposite (decrease or increase by 1) to **num**.

A number **x** is **achievable** if, after at most **t** such operations, **x** can be made equal to **num**.  
The task is to find the **maximum achievable** value of **x**.

### Examples  

**Example 1:**  
Input: `num = 4, t = 1`  
Output: `6`  
*Explanation: Start with x = 6.  
1st operation: Decrease x by 1 (5), increase num by 1 (5). Now x = num = 5.*

**Example 2:**  
Input: `num = 3, t = 2`  
Output: `7`  
*Explanation: Start with x = 7.  
1st operation: Decrease x by 1 (6), increase num by 1 (4).  
2nd operation: Decrease x by 1 (5), increase num by 1 (5). Now x = num = 5.*

**Example 3:**  
Input: `num = 1, t = 1`  
Output: `3`  
*Explanation: Start with x = 3.  
1st operation: Decrease x by 1 (2), increase num by 1 (2). Now x = num = 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try all possible values of x, and simulate the allowed operations to see if x can be made equal to num after ≤ t moves.  
  - For each operation, you can bring both numbers one step closer by changing them in opposite directions.
  - But simulating for all x is inefficient for large ranges.

- **Observation:**  
  - Each operation reduces the distance between x and num by 2 (since they move toward each other).
  - So, initially, if you start with x = num + 2 \* t, after t operations (decrease x, increase num, t times), x = num.
  - Hence, the **maximum achievable x is num + 2 × t**.

- **Why this works:**  
  - Each step allows x and num to approach each other by 2, so after t steps, the maximal extra distance that can be covered starting from num is 2 × t.

- **Trade-offs:**  
  - Mathematical direct calculation—O(1) time, O(1) space.
  - No need to simulate or use extra storage.

### Corner cases to consider  
- t = 0: Only achievable value is num itself.
- num = 1 (or very low), t = 0 or 1.
- Very small, very large values for t within the constraint.
- Both num and t at their minimum value.
- Both num and t at their maximum value.

### Solution

```python
def theMaximumAchievableX(num: int, t: int) -> int:
    # For maximum x, use all t operations to push x away from num by 2 × t
    # So, the answer is num + 2 × t
    return num + 2 * t
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Only basic arithmetic, no loops or recursion.
- **Space Complexity:** O(1) — No extra storage used, just returns a computed value.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the minimum achievable number instead?
  *Hint: Reverse the direction—all t operations move x downward and num upward.*

- If the operation cost changes (e.g., change one value by k instead of 1), how does the answer change?
  *Hint: Modify the reachable distance accordingly: use num ± 2 × t × k.*

- How would you adapt this if the allowed number of increases and decreases are limited separately?
  *Hint: Track counts of up/down moves and compute the maximal reach for each scenario.*

### Summary
This problem is a direct application of **distance bounding using operations**, relying on the insight that a single operation closes the gap by 2. The coding pattern is common in mathematical optimization and greedy approaches, and the solution generalizes to problems involving symmetric operations on two values. Can be applied wherever two entities can move toward each other under fixed-step symmetric rules.


### Flashcard
Maximum x equals num + 2×t, since each operation moves both numbers one step closer (total distance reduction of 2).

### Tags
Math(#math)

### Similar Problems
