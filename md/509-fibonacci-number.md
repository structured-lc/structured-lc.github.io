### Leetcode 509 (Easy): Fibonacci Number [Practice](https://leetcode.com/problems/fibonacci-number)

### Description  
Given a non-negative integer n, you need to calculate the nᵗʰ number in the **Fibonacci sequence**.  
The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- For n > 1: F(n) = F(n-1) + F(n-2)  
Each number is the sum of the previous two.  
Your goal: Given n (0 ≤ n ≤ 30), return F(n).  
Think of this as: “Write a function that computes the nᵗʰ Fibonacci number.”

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `1`  
*Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1*

**Example 2:**  
Input: `n = 5`  
Output: `5`  
*Explanation: F(5) = F(4) + F(3) = 3 + 2 = 5*

**Example 3:**  
Input: `n = 0`  
Output: `0`  
*Explanation: By definition, F(0) = 0*

### Thought Process (as if you’re the interviewee)  

Start by considering the *definition* of Fibonacci:
- Brute-force: The most direct idea is *recursion*.  
  ```python
  def fib(n):
      if n == 0: return 0
      if n == 1: return 1
      return fib(n-1) + fib(n-2)
  ```
  But this has exponential time complexity! For each call, two more calls are made, resulting in many repeated calculations, especially for big n.

- Optimization 1: *Memoization / Top-down DP*:  
  Store results as we go to avoid redundant calculation. This brings time complexity down to linear, O(n), and can be done with a dict or array.

- Optimization 2: *Bottom-up Iterative*:  
  Start from 0 and 1 and build up to n, only keeping track of the last two numbers.  
  This is the most space-efficient and works well for small n (like here, where n ≤ 30).  
  So, use two variables:
  - prev (stores F(n-2))
  - curr (stores F(n-1))
  Iterate from 2 to n, updating the two as you go.

- I prefer bottom-up iteration for this problem, as it’s clean, O(1) space, and won't hit any stack depth issues.

### Corner cases to consider  
- n = 0 (should return 0)
- n = 1 (should return 1)
- n = 2 (should return 1)
- Very large n (but n ≤ 30, so this is no problem here)
- Input that is not a non-negative integer (but input constraint says 0 ≤ n ≤ 30)

### Solution

```python
def fib(n):
    # Handle base cases directly
    if n == 0:
        return 0
    elif n == 1:
        return 1

    # For n ≥ 2, use iteration; only keep the last two Fibonacci values
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        next_fib = prev + curr
        prev = curr      # Update prev to last value
        curr = next_fib  # Update curr to new value
    return curr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - We compute each Fibonacci number from 2 up to n, using only a single loop with n-1 iterations.
- **Space Complexity:** O(1)
  - Only a constant number of variables (prev, curr, next_fib) are used, regardless of input n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be much larger (say up to 10⁶) and you need to support many queries?
  *Hint: Consider precomputing all Fibonacci numbers up to the maximum n and storing them for O(1) access.*

- Can you compute F(n) in O(log n) time?
  *Hint: Use matrix exponentiation or fast doubling formulas.*

- How could you handle the case where Fibonacci numbers are so large that they overflow standard integers?
  *Hint: Use modular arithmetic or a data type that supports arbitrary-precision integers.*

### Summary
This is a classic **dynamic programming** problem demonstrating overlapping subproblems and optimal substructure.  
The iterative solution is a direct application of bottom-up DP, specifically the space-optimized O(1) version for linear recurrences.  
This same coding pattern is applicable anywhere you have recurrence relations where each term depends only on a few previous values (e.g., Tribonacci, climbing stairs, tiling problems, etc.).


### Flashcard
Use bottom-up DP or memoization to compute F(n) = F(n-1) + F(n-2) in O(n) time, or use two variables for O(1) space.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Recursion(#recursion), Memoization(#memoization)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- Split Array into Fibonacci Sequence(split-array-into-fibonacci-sequence) (Medium)
- Length of Longest Fibonacci Subsequence(length-of-longest-fibonacci-subsequence) (Medium)
- N-th Tribonacci Number(n-th-tribonacci-number) (Easy)