### Leetcode 397 (Medium): Integer Replacement [Practice](https://leetcode.com/problems/integer-replacement)

### Description  
Given a positive integer **n**, you are allowed to perform the following operations:
- If **n** is even, replace **n** with **n / 2**.
- If **n** is odd, replace **n** with either **n + 1** or **n - 1**.

Return the **minimum number of operations** required for **n** to become 1.

### Examples  

**Example 1:**  
Input: `8`  
Output: `3`  
*Explanation: 8 → 4 → 2 → 1. Three operations are required.*

**Example 2:**  
Input: `7`  
Output: `4`  
*Explanation: Two shortest paths —  
7 → 8 → 4 → 2 → 1  
or  
7 → 6 → 3 → 2 → 1  
Both take four operations.*

**Example 3:**  
Input: `3`  
Output: `2`  
*Explanation: 3 → 2 → 1.*

### Thought Process (as if you’re the interviewee)  
First, let's think through the operations:
- If **n** is even, the only option is to divide by 2, which obviously reduces the number toward 1 quickly.
- If **n** is odd, we can add or subtract 1. Should we prefer `n+1` or `n-1`? 

A brute-force recursive solution would branch in both ways for each odd number, but this has exponential time complexity.  
Instead, we aim to **minimize the number of transformations**. Notice that:
- If we choose `n+1` or `n-1` such that the *resulting number has trailing zeros in binary*, we can divide by 2 more times consecutively, which is efficient.
- For most odd numbers, look at the last two bits:
  - If `n` ends with `11` (i.e., n % 4 == 3), incrementing yields more trailing zeros.
  - If `n` ends with `01` (i.e., n % 4 == 1), decrementing is better.
  - For 3 (binary: 11), it is better to subtract 1 than add 1.
- We can use a **greedy, bitwise approach**. Each operation counts as 1 step.

Overall, **bit manipulation** can help decide when to increment or decrement for odd numbers. Greedy decisions at each step keep computation fast.

### Corner cases to consider  
- **n = 1**: Already 1, so 0 operations.
- **n = 2**: Only 1 operation needed.
- **n = 3**: Special case, better to go 3 → 2 → 1 than via 4.
- **Very large n / integer overflow**: Be careful with large numbers, especially for `n + 1`.
- **Numbers with a lot of 1 bits**: Check how incrementing/decrementing affects trailing zeros.

### Solution

```python
def integerReplacement(n: int) -> int:
    steps = 0
    while n != 1:
        if n % 2 == 0:
            # If even, halve it
            n //= 2
        else:
            # Odd: decide whether to add or subtract 1
            # Special case for 3: prefer n - 1
            if n == 3 or (n & 2) == 0:
                n -= 1
            else:
                n += 1
        steps += 1
    return steps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  At each step, n is either halved (division by 2) or incremented/decremented, and ultimately, the number of steps is proportional to the logarithm of n. Each odd operation makes progress toward more even numbers, so the loop runs at most about 2 × log₂(n) times in the worst case.

- **Space Complexity:** O(1)  
  Only a constant amount of extra space is used (just some integers to track n and step count). No recursion or large data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm behave for very large n (potential overflow)?
  *Hint: Consider using types with larger capacity, e.g., Python int or Java long.*

- Could you optimize further using memoization or BFS/DP for cases with repeated subproblems?
  *Hint: Try caching results to avoid redundant work if you use recursion.*

- Is it possible to return the path itself, not just the step count?
  *Hint: Store or reconstruct choices along the way; maybe use a parent pointer or list.*

### Summary
This problem uses a **greedy approach** with **bit manipulation** to choose the quickest path to 1, minimizing steps by exploiting binary patterns. The same logic appears in other problems that involve reducing numbers using basic operations (e.g., subtract/divide until you reach a target). This approach is common for "reduce to 1" type questions and illustrates how greedy + bit tricks can often yield O(log n) solutions.


### Flashcard
If n is even, halve it; if odd, choose n+1 or n−1 based on which leads to fewer 1-bits, to minimize steps to 1.

### Tags
Dynamic Programming(#dynamic-programming), Greedy(#greedy), Bit Manipulation(#bit-manipulation), Memoization(#memoization)

### Similar Problems
