### Leetcode 319 (Medium): Bulb Switcher [Practice](https://leetcode.com/problems/bulb-switcher)

### Description  
There are **n bulbs** in a row, all initially turned **off**. There will be **n rounds** of toggling:
- In round 1, toggle every bulb (all turn ON).
- In round 2, toggle every 2ⁿᵈ bulb (bulbs 2, 4, 6, ...).
- In round 3, toggle every 3ʳᵈ bulb (bulbs 3, 6, 9, ...).
- ...
- In round n, toggle every nᵗʰ bulb (just the last bulb).

After all n rounds, return **how many bulbs are ON**.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `1`  
*Explanation:  
Round 1: [on, on, on]  
Round 2: [on, off, on]  
Round 3: [on, off, off]  
Only the 1ˢᵗ bulb remains ON.*

**Example 2:**  
Input: `n = 0`  
Output: `0`  
*Explanation:  
No bulbs; none can be ON.*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation:  
Only 1 bulb. After 1 round, it's ON.*

### Thought Process (as if you’re the interviewee)  
My first thought is to simulate the toggling for each bulb, but with n up to 10⁹, that's too slow.

**Brute-force idea:**
- For each bulb, count its toggles and see if it ends up ON.
- But toggles for bulb i correspond to the number of divisors of i, since we toggle it at every round that divides its index.
- If a bulb is toggled odd times, it's ON.

**Pattern recognition:**
- Numbers have odd number of divisors only if they are perfect squares (since their square root counts once).
- So, only bulbs at positions 1², 2², 3², ..., k² ≤ n remain ON.

**Optimized solution:**
- The number of bulbs ON = Number of perfect squares ≤ n.
- So, answer is ⌊√n⌋.

This approach is **O(1) time, O(1) space**.

### Corner cases to consider  
- n = 0 (no bulbs)
- n = 1 (single bulb)
- Large n (handle integer overflow if not careful)
- n = perfect square (edge alignment)
- n = 2, 3, 4 (small numbers, quick sanity check)

### Solution

```python
import math

def bulbSwitch(n):
    # Return the count of perfect squares ≤ n
    return int(math.sqrt(n))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), because computing the square root with math.sqrt is a constant-time operation with respect to n.
- **Space Complexity:** O(1), no extra data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- If you had to return the actual positions of bulbs that are ON, how would you do it?  
  *Hint: Collect all k² where 1 ≤ k² ≤ n.*

- If the bulbs were arranged in a ring and toggling wraps around, how does that affect the answer?  
  *Hint: Consider how the divisibility pattern changes for modular indexing.*

- Suppose you could only visit each bulb once but had limited memory; how could you approximate the answer?  
  *Hint: Use mathematical estimation of root n.*

### Summary
This problem uses the **math and divisors pattern**, a classic interview trick. If an index has an odd number of divisors (perfect square), the bulb is ON. Thus, the answer is ⌊√n⌋. This same **count-perfect-square** idea is useful in other toggling, factor-counting, and divisor parity problems. The final algorithm is extremely efficient and bypasses simulation entirely.

### Tags
Math(#math), Brainteaser(#brainteaser)

### Similar Problems
- Bulb Switcher II(bulb-switcher-ii) (Medium)
- Minimum Number of K Consecutive Bit Flips(minimum-number-of-k-consecutive-bit-flips) (Hard)
- Number of Times Binary String Is Prefix-Aligned(number-of-times-binary-string-is-prefix-aligned) (Medium)
- Find the Pivot Integer(find-the-pivot-integer) (Easy)