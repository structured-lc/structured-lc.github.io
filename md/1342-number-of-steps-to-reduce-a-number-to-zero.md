### Leetcode 1342 (Easy): Number of Steps to Reduce a Number to Zero [Practice](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero)

### Description  
Given an integer num, repeatedly do the following until num becomes 0:  
- If num is even, divide it by 2.  
- If num is odd, subtract 1 from it.  
Count and return the number of steps required to reduce num to 0.  
The problem tests your ability to simulate basic algorithms and reason about what happens on every step.

### Examples  

**Example 1:**  
Input: `num = 14`  
Output: `6`  
*Explanation: 14 is even → 7 → odd, subtract 1 → 6 → even → 3 → odd, subtract 1 → 2 → even → 1 → odd, subtract 1 → 0. Total steps: 6.*

**Example 2:**  
Input: `num = 8`  
Output: `4`  
*Explanation: 8 is even → 4 → even → 2 → even → 1 → odd, subtract 1 → 0. Total steps: 4.*

**Example 3:**  
Input: `num = 123`  
Output: `12`  
*Explanation: 123 is odd, subtract 1 → 122 → even → 61 → odd, subtract 1 → 60 → even → 30 → 15 → odd, subtract 1 → 14 → even → 7 → odd, subtract 1 → 6 → even → 3 → odd, subtract 1 → 2 → even → 1 → odd, subtract 1 → 0. (Steps: 12).*

### Thought Process (as if you’re the interviewee)  
Start by simulating the process:  
- For each step, check if num is even (num % 2 == 0), then divide by 2; otherwise, subtract 1.  
- With every operation, count the step.

The brute-force approach uses a simple loop and is very straightforward, looping until num is zero and incrementing a counter.  

For a mild optimization, since dividing by 2 occurs only for even numbers and subtracting 1 only for odd numbers, bit-wise operations (`num & 1` for odd/even, `num >>= 1` for halve) can make the code slightly more efficient.  
No need for extra data structures.  
Both mathematical and bitwise approaches yield the same step count.

I choose the simulation approach for clarity and because it best reflects the simple logic required. Bitwise solution is slightly more efficient but not necessary here.

### Corner cases to consider  
- num = 0 (output should be 0, since 0 steps are needed)  
- num = 1 (only one subtraction needed, so output is 1)  
- Large num values (but since operations always reduce num, shouldn't be a problem)  
- num is negative: problem constraints say num is non-negative  

### Solution

```python
def numberOfSteps(num: int) -> int:
    steps = 0
    while num > 0:
        if num % 2 == 0:
            # If even, divide by 2
            num //= 2
        else:
            # If odd, subtract 1
            num -= 1
        steps += 1
    return steps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₍₂₎ n). Each division by 2 reduces the number of bits by 1, and there can be at most as many steps as there are bits in num; also, every odd number operation ensures progress toward halving.  
- **Space Complexity:** O(1), since only a constant number of local variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this recursively?  
  *Hint: Define the base case (num == 0), handle even and odd cases with recursive calls.*
  
- Can you compute the number of steps in O(1) for a given num?  
  *Hint: Count the number of set bits (odd steps) and the number of divisions (num.bit_length - 1).*
  
- How can you solve this if the operations are provided as a stream (aka, you don't know num ahead)?  
  *Hint: Maintain a counter for current value, or perform and count until zero.*

### Summary
This problem is a classic simulation problem that can be solved using a basic loop and conditional statements. It also demonstrates how to recognize special patterns (halving, decrementing by one), and introduces bit manipulation for possible optimization. The coding template follows the simulation pattern, which is common for problems where the solution follows stepwise instructions. This logic is broadly applicable in digital operations, games, or scenarios where you repeatedly apply basic rules until a goal is met.