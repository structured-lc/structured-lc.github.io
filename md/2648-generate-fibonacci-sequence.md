### Leetcode 2648 (Easy): Generate Fibonacci Sequence [Practice](https://leetcode.com/problems/generate-fibonacci-sequence)

### Description  
Given no arguments, implement a special generator function that yields the infinite Fibonacci sequence one number at a time. The function should return a generator object, such that each call to `next()` produces the next number in the sequence, starting from 0, then 1, then 1, 2, 3, etc.

### Examples  

**Example 1:**  
Input:  
```  
gen = fib_generator()
print(next(gen))   # 0
print(next(gen))   # 1
print(next(gen))   # 1
print(next(gen))   # 2
print(next(gen))   # 3
```  
Output:  
```
0
1
1
2
3
```
*Explanation: Generator yields each Fibonacci number in sequence with each call to `next()`.*

**Example 2:**  
Input:  
```
gen = fib_generator()
[first, second, third] = [next(gen) for _ in range(3)]
```  
Output:  
```
0, 1, 1
```
*Explanation: The first three numbers of the Fibonacci sequence are 0, 1, 1.*

**Example 3:**  
Input:  
```
gen = fib_generator()
for _ in range(6):
    print(next(gen))
```  
Output:  
```
0
1
1
2
3
5
```
*Explanation: The output is the first 6 Fibonacci numbers.*

### Thought Process (as if you’re the interviewee)  
First, I know the Fibonacci sequence goes: 0, 1, then every subsequent number is the sum of the previous two.  
Since we are asked for a generator that yields values infinitely, a `while True` loop makes sense.  

Brute-force:  
I can maintain two variables, `a` and `b`, initialized to 0 and 1.  
In each iteration, yield `a`, then update `a, b = b, a + b`, so the pair always holds the latest two values.

This approach is constant space and efficient.  
Generator is preferable to list-building for infinite series, as lists can't grow infinitely.  

Tradeoffs:  
- This avoids storing the entire sequence.
- Each call yields instantly in O(1) time.
- No risk of stack overflow or memory errors.

### Corner cases to consider  
- User only calls next() once (should yield 0).
- User calls next() many times (should continue indefinitely).
- Generator is not reentrant (creating multiple independent generators should work).
- No input parameters, so no argument errors.
- Any limitations with Python's integer size (not relevant—Python supports big integers).

### Solution

```python
def fib_generator():
    # Initialize first two Fibonacci numbers
    a, b = 0, 1
    while True:
        yield a      # Yield the current value
        a, b = b, a + b   # Prepare the next value
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per generated value. Each call to next() does a fixed number of operations.
- **Space Complexity:** O(1) overall, only two variables are stored regardless of how many numbers are generated.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this to yield the first n Fibonacci numbers and then stop?  
  *Hint: Add a counter and use a for loop with range(n).*

- Could you extend this to produce a generator for other recurrence relations, like the Tribonacci sequence?  
  *Hint: Keep more previous numbers and update according to the recurrence.*

- What if you wanted to support negative index Fibonacci numbers (negafibonacci)?  
  *Hint: Understand how Fibonacci is defined for negative indices: F(-n) = (-1)ⁿ⁺¹ × F(n).*

### Summary
This problem uses the **generator pattern** for stream-like production of a mathematical sequence.  
The design is optimal for producing infinite or lazy computed sequences with O(1) time and space per value.  
This approach is common in interview questions around random/infinite streams, sequence generation, or lazy evaluation.  
Patterns are applicable for any recurrence-based or stream-based generation.


### Flashcard
Generate the Fibonacci sequence using a generator that yields values based on the sum of the previous two numbers.

### Tags

### Similar Problems
- Nested Array Generator(nested-array-generator) (Medium)
- Design Cancellable Function(design-cancellable-function) (Hard)