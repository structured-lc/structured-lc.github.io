### Leetcode 2803 (Easy): Factorial Generator [Practice](https://leetcode.com/problems/factorial-generator)

### Description  
Implement a **generator function** that, given an integer `n`, yields each factorial from 1! up to n!.  
The factorial of a number `k` (written “k!”) is the product of all positive integers ≤ k, with the special case that 0! is 1.  
The function should be called `factorial(n)`, and should yield values as the sequence is requested, not all at once.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `[1, 2, 6, 24, 120]`  
*Explanation: The factorials are 1!=1, 2!=2, 3!=6, 4!=24, 5!=120. The generator yields these in order as requested.*

**Example 2:**  
Input: `n = 2`  
Output: `[1, 2]`  
*Explanation: The sequence is 1!=1, 2!=2.*

**Example 3:**  
Input: `n = 0`  
Output: `[1]`  
*Explanation: For n=0, the only value is 0!=1.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that I need a generator, not a function that returns the list all at once. That means using Python’s `yield`, so each factorial only computes as it’s requested.
The brute-force idea is to recalculate each factorial directly—for example, loop from 1 to i every time.  
However, this repeats unnecessary work.

To optimize, I can:
- **Keep a running product:** Start with 1 (for 0! and 1!), then for every next i, multiply the current product by i and yield.
- This approach eliminates duplicate calculations—each factorial uses the previous one.

For n=0, we just yield 1 and stop.  
For all other n ≥ 1, I loop i from 1 to n:
- product ← product × i
- yield product

Python’s generator pattern fits this exactly, and is memory-efficient since only the last computed value is stored.

This method is better than calculating factorials individually via repeated multiplication.

### Corner cases to consider  
- n = 0 → Only return [1]
- n = 1 → Should yield [1]
- n is at upper bound (18) → Ensure integers do not overflow in Python (they won’t)
- n < 0 → As per constraints, not possible
- Yield order: Each must be yielded in strict increasing factorial order

### Solution

```python
def factorial(n):
    """
    Generator that yields factorial numbers from 1! to n!.
    For n=0, only yields 1 (0!).
    """
    product = 1
    if n == 0:
        yield 1
    else:
        for i in range(1, n+1):
            product *= i
            yield product
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  There is one multiplication and one yield per number from 1 to n. The work per step is constant, so total is O(n).

- **Space Complexity:** O(1)  
  The only extra space is for `product` and the loop variable i, both constant; output sequence is never stored in memory.

### Potential follow-up questions (as if you’re the interviewer)  

- What if I want to get factorials for extremely large n (>18)?
  *Hint: Consider integer overflow in other languages, and Python's arbitrary-precision integers.*

- Can we modify it to yield 0! as the first value for all n ≥ 0?
  *Hint: Change the range and yield order accordingly.*

- How would you implement this using recursion without exceeding stack depth?
  *Hint: Think about generator recursion and base cases.*

### Summary
This problem uses the **generator pattern**, efficiently producing each factorial value in sequence with just prior state tracked.  
The iterative/single-state update is a classic memory-efficient approach, commonly used wherever prior computations inform the next (e.g., Fibonacci sequence, prefix products).  
Generator-based solutions are often applied to big data or on-demand computation scenarios for space efficiency.


### Flashcard
Use Python generator with `yield` and maintain running product—multiply by i for each factorial instead of recalculating from scratch.

### Tags

### Similar Problems
