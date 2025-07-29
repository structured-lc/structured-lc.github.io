### Leetcode 1881 (Medium): Maximum Value after Insertion [Practice](https://leetcode.com/problems/maximum-value-after-insertion)

### Description  
Given a very large integer **n** (as a string) and an integer digit **x** (1–9), insert **x** anywhere in the decimal representation of **n** (except to the left of a negative sign) so that the resulting integer is as large as possible.  
If **n** is negative, insert **x** after the '-' and before any digit.

**Goal:** Return the string representing the maximum value of **n** after one insertion of **x**.

---

### Examples  

**Example 1:**  
Input: `n = "99", x = 9`  
Output: `"999"`  
Explanation: Inserting 9 anywhere results in 999; all insertions are equivalent.

**Example 2:**  
Input: `n = "-13", x = 2`  
Output: `"-123"`  
Explanation: Possible results are -213, -123, -132; -123 is the largest (least negative).

**Example 3:**  
Input: `n = "469", x = 5`  
Output: `"5469"`  
Explanation: Insert 5 at the beginning (before 4) to get 5469, which is largest. Other options: 4569, 4659, 4695.

---

### Thought Process (as if you’re the interviewee)  

First, observe that inserting **x** at different positions influences whether the number increases or decreases, depending on whether **n** is positive or negative:
- **If n is positive:**  
  To maximize **n**, insert **x** as early as possible in the string—specifically, before the first digit that is **less than x**. If all digits are greater than or equal to **x**, put **x** at the end.
- **If n is negative:**  
  Since it's negative, increasing the magnitude (making it less negative) is better. Thus, insert **x** before the first digit that is **greater than x** (after the minus sign). If all digits are less than or equal to **x**, append **x** at the end.

Brute-force would check all positions, but that's O(len(n)²) with repeated string construction.  
Optimized: A single pass, first occurrence logic.

Choosing this **greedy** approach ensures O(n) time and optimality.

---

### Corner cases to consider  
- **n** of length 1 (single digit)
- All digits same as x
- All digits greater/less than x
- x at beginning or end
- Negative numbers (especially with single or repeated digits)
- n has maximal/minimal value (all 9s, all 1s, etc.)
- x == digit already in n
- Very large n (long string)

---

### Solution

```python
def maxValue(n: str, x: int) -> str:
    # Convert x to a string for insertion
    x_str = str(x)
    
    # If n is negative
    if n[0] == '-':
        # Scan from index 1 to avoid inserting before '-'
        for i in range(1, len(n)):
            # Insert x before first digit greater than x
            if int(n[i]) > x:
                return n[:i] + x_str + n[i:]
        # If no such digit found, append x at the end
        return n + x_str
    else:
        # n is positive
        for i in range(len(n)):
            # Insert x before first digit less than x
            if int(n[i]) < x:
                return n[:i] + x_str + n[i:]
        # If no such digit is less, append x at the end
        return n + x_str
```
---

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) — Single pass through n; comparisons and string slicing are O(N).
- **Space Complexity:** O(N) — Resulting string is at most one digit longer than input.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle floating-point numbers or numbers with leading zeros?  
  *Hint: Consider decimal points and preserve formatting.*

- What if you had to insert more than one digit?  
  *Hint: Think about recursive/greedy insertions.*

- Could you find the k largest numbers possible by inserting x k times?  
  *Hint: Consider all unique insertion combinations and choosing the largest.*

---

### Summary
A classic **greedy string insertion** pattern—scan once to find the optimal insertion point. This pattern is broadly useful for problems involving maximizing/minimizing numbers via digit manipulation, and for certain "optimal insertion" or "editing" string tasks.