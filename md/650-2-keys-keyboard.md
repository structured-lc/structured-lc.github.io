### Leetcode 650 (Medium): 2 Keys Keyboard [Practice](https://leetcode.com/problems/2-keys-keyboard)

### Description  
Given a notepad with a single character `'A'`, you can do two operations:
- **Copy All**: Copy all text currently on the screen (must copy the full content).
- **Paste**: Paste the content you copied last.

Return the minimum number of operations needed to get exactly `n` `'A'` characters on the screen.  

For example, if `n = 3`, you need to transform the single `'A'` into `'AAA'` using the fewest copy and paste operations.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `3`  
*Explanation: Step 1: Copy All ('A') → clipboard='A'.
Step 2: Paste → screen='AA'.
Step 3: Paste → screen='AAA'.*

**Example 2:**  
Input: `n = 1`  
Output: `0`  
*Explanation: Already have one 'A', so no operation needed.*

**Example 3:**  
Input: `n = 6`  
Output: `5`  
*Explanation: Step 1: Copy All → clipboard='A'.
Step 2: Paste → 'AA'.
Step 3: Copy All → clipboard='AA'.
Step 4: Paste → 'AAAA'.
Step 5: Paste → 'AAAAAA'.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to simulate all possible sequences of Copy All and Paste operations. Try every path, but that becomes inefficient quickly since there are many combinations as `n` grows.

If you look closely, building up to `n` 'A' by only pasting is inefficient—Copy All is only truly efficient if it unlocks larger leaps. For example, to reach 6, we realize we can get from 3 to 6 with a single Copy All and then Paste, instead of just pasting sequentially.

This leads to a more optimal way: factorization. If `n` is divisible by some `i` (where `i < n`), we can get to `n` with the minimum operations by first reaching `i`, copying all, and then pasting `(n/i)` times. The total steps to reach `n` become dp[i] + (n/i).

Thus, we iterate through all possible divisors of `n`, and for each, the total steps are `dp[i] + (n//i)`. We take the minimum among these.

Alternatively, you can use a mathematical approach: for every time you zoom up by a factor, it means a duplication, and the minimal number of operations is the sum of its prime factors. This gives a very fast solution using greedy division.

### Corner cases to consider  
- n = 1 (already have one 'A', so 0 operations)
- n is prime (must copy at 1, then paste n-1 times)
- Large power-of-2 numbers (shows the efficiency jump when we can double repeatedly)
- n = 0 (not valid input per constraints)
- n with multiple factors (should follow the best sequence of multiplications)

### Solution

```python
def minSteps(n: int) -> int:
    # Start with 0 operations
    res = 0
    d = 2
    while n > 1:
        # For each divisor d
        while n % d == 0:
            res += d     # Add the divisor to result (think as prime factor)
            n //= d      # Divide n
        d += 1           # Try next divisor
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n) worst-case. We only loop divisors up to n, and each division reduces n quickly for composite numbers.
- **Space Complexity:** O(1) extra space—just a few integer variables for computation.

### Potential follow-up questions (as if you’re the interviewer)  

- If each Copy All or Paste had a cost (not always 1), how would the solution change?  
  *Hint: Consider how you would tweak the dynamic programming transition.*

- Can you reconstruct and print the sequence of operations that led to the minimum steps?  
  *Hint: Store predecessor indices alongside DP computation.*

- How would the solution generalize if you could also do "Paste k times" for any k?  
  *Hint: Think about which operations minimize total steps in extended operation set.*

### Summary
This problem uses the **prime factorization** and **dynamic programming** patterns. The greedy factorization jump lets you "multiply up" to the next factor efficiently. This type of pattern appears in string building/encoding ("copy-paste" patterns), DP problems with factor jumps, and optimization scenarios where operations are multiplicative.


### Flashcard
For n 'A's, minimum steps equals sum of prime factors; repeatedly divide n by its smallest factor and add to result.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- 4 Keys Keyboard(4-keys-keyboard) (Medium)
- Broken Calculator(broken-calculator) (Medium)
- Smallest Value After Replacing With Sum of Prime Factors(smallest-value-after-replacing-with-sum-of-prime-factors) (Medium)
- Distinct Prime Factors of Product of Array(distinct-prime-factors-of-product-of-array) (Medium)