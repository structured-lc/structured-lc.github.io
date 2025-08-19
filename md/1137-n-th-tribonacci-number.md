### Leetcode 1137 (Easy): N-th Tribonacci Number [Practice](https://leetcode.com/problems/n-th-tribonacci-number)

### Description  
Given an integer **n**, return the n-th number in the **Tribonacci** sequence.  
The Tribonacci sequence, similar to the Fibonacci sequence, is defined as follows:  
- T₀ = 0  
- T₁ = 1  
- T₂ = 1  
- For n ≥ 0: Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂  
Your goal is to compute and return Tₙ for a provided value of n.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `4`  
*Explanation: T₀ = 0, T₁ = 1, T₂ = 1, T₃ = 2 (0+1+1), T₄ = 4 (1+1+2).*

**Example 2:**  
Input: `n = 25`  
Output: `1389537`  
*Explanation: Continue the addition sequence up to T₂₅. T₂₅ = 1389537.*

**Example 3:**  
Input: `n = 0`  
Output: `0`  
*Explanation: By definition, the 0ⁿᵗʰ Tribonacci number is 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force recursive approach:**  
  Start with a naive recursive function that calls itself three times for n-1, n-2, and n-3.  
  This has exponential time complexity because of repeated work.

- **Memoization (top-down DP):**  
  To optimize recursion, cache results of each subproblem. This dramatically reduces duplicate computation but still uses space on the stack for recursion.

- **Bottom-up dynamic programming (iterative):**  
  Store the Tribonacci values in an array up to n, or, since only the last three are needed at any point, just keep three variables and update them in a loop.  
  This approach is both time- and space-efficient, using O(n) time (or O(1) if only three variables are used) and O(1) extra space.

- I would choose the *bottom-up DP with three variables*: it's the most practical here—iterative, fast, and minimal space usage.

### Corner cases to consider  
- n = 0 (should return 0)  
- n = 1 or n = 2 (should return 1)  
- n < 0 (input out of constraint, but the problem says 0 ≤ n ≤ 37)  
- n = 3 (ensure the sum of 0+1+1 is 2)  
- Maximum n = 37 (ensure no overflow and correct result under all constraints)

### Solution

```python
def tribonacci(n: int) -> int:
    # Base cases
    if n == 0:
        return 0
    if n == 1 or n == 2:
        return 1

    # Initialize the first three Tribonacci numbers
    t0, t1, t2 = 0, 1, 1

    # Compute up to n using a rolling window
    for i in range(3, n + 1):
        next_val = t0 + t1 + t2
        t0, t1, t2 = t1, t2, next_val

    return t2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We perform a simple loop from 3 up to n, executing constant work each step.

- **Space Complexity:** O(1)  
  Only three variables are maintained, regardless of n. No arrays or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large n (e.g., n = 10⁶)?
  *Hint: Consider matrix exponentiation to reduce time complexity from O(n) to O(log n).*

- Can you generalize the code for a k-bonacci sequence (sum of last k terms)?
  *Hint: Parameterize the sequence order k.*

- What if the initial values are different from [0,1,1]?  
  *Hint: Accept them as parameters and generalize the iteration.*

### Summary
This problem leverages the **Dynamic Programming - rolling window** pattern, similar to efficient Fibonacci computation.  
We reduce space by keeping only the minimal past state needed. This coding pattern is broadly applicable in linear DP problems requiring values from a fixed sliding window.  
For extremely large n, advanced techniques such as **matrix exponentiation** can be applied to reduce computation time, a concept often seen in sequence problems.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- Fibonacci Number(fibonacci-number) (Easy)