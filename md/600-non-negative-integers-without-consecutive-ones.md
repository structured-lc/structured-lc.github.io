### Leetcode 600 (Hard): Non-negative Integers without Consecutive Ones [Practice](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones)

### Description  
Given a **positive integer** n, return the number of non-negative integers ≤ n whose binary representations **do not contain consecutive ones**.  
In other words: count how many numbers between 0 and n (inclusive) do **not** have two 1’s next to each other in their binary form.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `5`  
*Explanation: Check all numbers 0..5, get their binary:*  
- 0 : 0  
- 1 : 1  
- 2 : 10  
- 3 : 11  
- 4 : 100  
- 5 : 101  
Only 3 (11) contains consecutive 1’s, so 5 numbers qualify (0,1,2,4,5)[1][3].

**Example 2:**  
Input: `n = 1`  
Output: `2`  
*Explanation: 0 (0), 1 (1); both are valid.*

**Example 3:**  
Input: `n = 2`  
Output: `3`  
*Explanation: 0 (0), 1 (1), 2 (10); all three are valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Go through every integer from 0 to n, check each binary representation for consecutive 1’s.  
  Time: O(n × k), with k as number of bits (up to 30). Not feasible when n is large (up to 10⁹)[1][2].

- **Pattern observation:**  
  The restriction reminds me of **Fibonacci encoding** problems. The number of k-bit numbers with no consecutive 1’s follows the **Fibonacci sequence**:
  - If the highest bit is 0, the rest k-1 bits can be any valid number.
  - If the highest bit is 1, the next bit *must* be 0 (to avoid consecutive 1’s), and so on.
  So for k bits: count = Fib(k+2).

- **Top-down DP (digit-DP):**  
  - Analyze bit-by-bit, from highest to lowest, using the binary digits of n as the boundary.
  - For every bit: whenever you set a 1 in a position, the next lower bit must be 0 if previous was 1.
  - As soon as you hit consecutive 1’s in n, stop counting further to avoid overshooting n.
  - Precompute the Fibonacci numbers for up to 32 bits.

- **Why use this approach?**  
  - Efficient: O(L), with L ≈ 32 (max bits for n).  
  - Avoids TLE for large n.  
  - Classic **digit dynamic programming** with state: (index, prev-bit, isLimited)

### Corner cases to consider  
- n = 0 (only 0 qualifies)
- n with all bits 1, e.g., 3 (11), 7 (111)
- n is 1, n is 2 (very small n)
- Large n (close to 2³¹-1)
- n already contains consecutive 1’s
- n does **not** contain consecutive 1’s

### Solution

```python
def findIntegers(n):
    # Precompute fib: count of valid k-bit numbers (Fibonacci sequence)
    fib = [0] * 32
    fib[0] = 1
    fib[1] = 2
    for i in range(2, 32):
        fib[i] = fib[i - 1] + fib[i - 2]

    ans = 0
    prev_bit = 0  # 0 = last bit was 0, 1 = last bit was 1
    for i in range(30, -1, -1):
        if (n & (1 << i)):
            ans += fib[i]
            if prev_bit == 1:
                # Found two consecutive 1's - can't continue
                return ans
            prev_bit = 1
        else:
            prev_bit = 0
    # If entire loop finishes, n itself is valid (no consecutive 1’s in n)
    return ans + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(32) (since we only loop over up to 31 bits in n; precomputing fib array is also O(32))
- **Space Complexity:** O(32) (only storing the Fibonacci dp array)

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to count numbers with NO consecutive **0**’s instead?
  *Hint: Think about how regular expressions or automata can model sequences without adjacent zeros. The problem becomes similar but with different allowed transitions.*

- How would you output one valid such number ≤ n (instead of the count)?
  *Hint: After you count, reconstruct a number by greedily taking the most significant bits, skipping any step that would create consecutive 1's.*

- Can you solve for “at most k consecutive 1’s allowed” for all numbers ≤ n?
  *Hint: The recursion/dp state needs to track the current run-length of 1’s.*

### Summary
This problem uses the **digit dynamic programming** pattern, closely related to counting binary strings with forbidden substrings.  
By relating counts to the Fibonacci sequence and processing bit-by-bit, the code achieves efficient O(log n) complexity—typical in problems with constraints on binary patterns.  
This approach generalizes to various forbidden patterns and is very common in advanced combinatorial counting and problems involving numbers with limited digits/bit patterns.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- House Robber(house-robber) (Medium)
- House Robber II(house-robber-ii) (Medium)
- Ones and Zeroes(ones-and-zeroes) (Medium)
- Generate Binary Strings Without Adjacent Zeros(generate-binary-strings-without-adjacent-zeros) (Medium)