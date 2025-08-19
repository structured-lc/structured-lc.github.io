### Leetcode 991 (Medium): Broken Calculator [Practice](https://leetcode.com/problems/broken-calculator)

### Description  
You start with an integer **startValue** on a broken calculator screen. The calculator only allows you to:
- **Double** the current value (multiply by 2)
- **Decrement** (subtract 1 from the current value)

Given another integer **target**, find the **minimum number of operations** required to display the target value starting from startValue, using only these two operations.

### Examples  

**Example 1:**  
Input: `startValue = 2, target = 3`  
Output: `2`  
*Explanation: Double: 2 → 4, then Decrement: 4 → 3.*

**Example 2:**  
Input: `startValue = 5, target = 8`  
Output: `2`  
*Explanation: Decrement: 5 → 4, then Double: 4 → 8.*

**Example 3:**  
Input: `startValue = 3, target = 10`  
Output: `3`  
*Explanation: Double: 3 → 6, Decrement: 6 → 5, Double: 5 → 10.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would attempt to simulate all possible sequences of operations from startValue to target. However, since values can grow or shrink rapidly, this has exponential complexity and is infeasible for large target values.

A key insight is to work backwards from **target** to **startValue**. Instead of trying to reach target by doubling and decrementing, reverse the process:
- If **target** is even, our *last* operation could have been a double, so we divide by 2 to undo it.
- If **target** is odd, our *last* operation could only have been a decrement, so we add 1 to undo it.

We repeat this reverse process until target ≤ startValue. At that point, since only decrements are available, just count down (startValue - target) more steps.

This greedy reverse approach works efficiently, as it minimizes the number of operations by “halving” target whenever possible, shrinking it quickly.

### Corner cases to consider  
- **startValue = target**: Output should be 0 (no moves needed).
- **startValue > target**: Only decrements can be used; output is simply (startValue - target).
- **Boundary values**: startValue or target at 1, or near 1,000,000,000.
- **Target is much smaller or much larger than startValue.**
- Both values being odd, even, or mismatched parity.
  
### Solution

```python
def brokenCalc(startValue: int, target: int) -> int:
    operations = 0
    while target > startValue:
        if target % 2 == 0:
            # If target is even, reverse a double by dividing by 2
            target //= 2
        else:
            # If target is odd, reverse a decrement by adding 1
            target += 1
        operations += 1
    # If startValue >= target, only need to decrement (startValue - target) times
    return operations + (startValue - target)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log target)  
  Each operation (divide by 2, or add 1) halves target or increments it; so at most about log₂(target) steps. After the loop, a final O(1) subtraction.
- **Space Complexity:** O(1)  
  Only a constant number of variables are used. No extra storage or recursion is required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the calculator could also increment by 1?  
  *Hint: How does the extra operation change your reverse-logic approach?*

- How would your solution change if only “double” operations are available, but no decrements?  
  *Hint: Can you always reach the target?*

- Can you reconstruct the exact sequence of operations, not just the number?  
  *Hint: Track choices at every step.*

### Summary
This is a classic **reverse-thinking greedy** problem: instead of moving forward from startValue, iteratively shrink and adjust the target _backwards_ to startValue, using division and addition. This pattern of inverting the operation is common for minimum-steps transformation problems, especially when forward choices can explode combinatorially, but a greedy backward path leads quickly to the answer.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- 2 Keys Keyboard(2-keys-keyboard) (Medium)
- Minimum Operations to Make the Integer Zero(minimum-operations-to-make-the-integer-zero) (Medium)