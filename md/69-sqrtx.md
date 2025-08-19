### Leetcode 69 (Easy): Sqrt(x) [Practice](https://leetcode.com/problems/sqrtx)

### Description  
Given a non-negative integer **x**, return the *integer square root* of x. The integer square root is the largest integer **y** such that y × y ≤ x.  
In other words, return ⌊√x⌋ (*the square root of x rounded down to the nearest integer*).  
You **cannot** use any built-in exponent functions (like `pow`, `**`, or `sqrt`) to solve this problem.

### Examples  

**Example 1:**  
Input: `x = 4`  
Output: `2`  
*Explanation: 2 × 2 = 4; 3 × 3 = 9 > 4, so the answer is 2.*

**Example 2:**  
Input: `x = 8`  
Output: `2`  
*Explanation: 2 × 2 = 4; 3 × 3 = 9 > 8, so the answer is 2 (i.e., ⌊2.828...⌋ = 2).*

**Example 3:**  
Input: `x = 0`  
Output: `0`  
*Explanation: 0 × 0 = 0, which is exactly x.*

### Thought Process (as if you’re the interviewee)  

A brute-force approach would iterate from 0 up to x, checking for each integer y whether y × y ≤ x but (y+1) × (y+1) > x. However, this would take O(√x) time because the answer is always in the range [0, x].

To optimize, I notice that the function f(y) = y × y is monotonic (always increases as y increases). So, I can use **binary search** between 0 and x:
- Set left = 0, right = x.
- While left ≤ right:
  - mid = (left + right) // 2.
  - If mid × mid ≤ x, the candidate answer is mid; try higher: left = mid + 1.
  - If mid × mid > x, too high: right = mid - 1.
- At the end, right will be the integer square root.

This brings the time complexity down to O(log x).

### Corner cases to consider  
- x = 0 (should return 0).
- x = 1 (should return 1).
- Very large x (to avoid overflow in mid × mid).
- x is a perfect square vs. not a perfect square.
- Check for x = 2 (should return 1).
- Negative inputs are not allowed by the problem statement.

### Solution

```python
def mySqrt(x: int) -> int:
    # handle base cases
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = (left + right) // 2
        sq = mid * mid

        if sq == x:
            return mid
        elif sq < x:
            left = mid + 1
        else:
            right = mid - 1

    # right will be the integer square root of x
    return right
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log x), since each binary search step halves the range.
- **Space Complexity:** O(1), since only a constant number of variables are used—no extra data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- **What if we need the decimal part up to k digits?**  
  *Hint: You could use binary search on decimals or Newton's method.*

- **How would you implement this for a very large x (possible integer overflow)?**  
  *Hint: Check multiplication carefully; use division or work with long/integer types.*

- **Could you do this without binary search, or in a single pass?**  
  *Hint: Try Newton's method (also known as the Heron's method).*

### Summary
The problem is a classic application of **binary search** on a monotonic function. The integer square root solution pattern is common for root-search and similar monotonic function problems, and binary search allows us to find the answer efficiently without direct use of arithmetic shortcuts. This pattern can also be used for cube roots, searching in sorted arrays, peak elements in arrays, and numerical methods.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
- Pow(x, n)(powx-n) (Medium)
- Valid Perfect Square(valid-perfect-square) (Easy)