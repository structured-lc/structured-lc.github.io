### Leetcode 367 (Easy): Valid Perfect Square [Practice](https://leetcode.com/problems/valid-perfect-square)

### Description  
Given a non-negative integer `num`, determine if it is a **perfect square**. In other words, check if there exists an integer `x` such that `x × x = num`.  
Constraints:
- Do not use any built-in sqrt function or similar library methods.
- Numbers may be very large, so the approach should be efficient.
  
*Example:*  
If `num = 16`, since `4 × 4 = 16`, the output should be `True`. If `num = 14`, since 3 × 3 = 9 < 14 and 4 × 4 = 16 > 14, then 14 isn't a perfect square.

### Examples  

**Example 1:**  
Input: `num = 16`  
Output: `True`  
*Explanation: 4 × 4 = 16; so 16 is a perfect square.*

**Example 2:**  
Input: `num = 14`  
Output: `False`  
*Explanation: There is no integer whose square is 14. 3 × 3 = 9, 4 × 4 = 16; 14 is not a perfect square.*

**Example 3:**  
Input: `num = 1`  
Output: `True`  
*Explanation: 1 × 1 = 1; so 1 is a perfect square.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Check every integer `i` from 1 up to num, and see if `i × i == num`. But this is too slow for large num (would be O(√n) time, but bad if n is big).

- **Optimal idea:**  
  Think about **binary search:**  
  - The square of an integer grows very quickly, so we can binary search on `i` in the range `[1, num]`.
  - At each step, check if `mid × mid == num`.
    - If it's equal, we're done.
    - If `mid × mid < num`, we move our search right.
    - If `mid × mid > num`, we move our search left.
  - Stops as soon as left > right.
  - Time complexity: O(log n)

- **Alternative:**  
  Can consider *Newton's method* for square roots, but binary search is easy, reliable, and intuitive.

- **Why not use built-in sqrt?**  
  The problem prohibits it—to test understanding of binary search and number properties.

### Corner cases to consider  
- `num = 0` (edge: 0 × 0 = 0)
- `num = 1` (edge: 1 × 1 = 1)
- Very large `num` (to ensure you don't get integer overflow)
- Non-perfect squares just below/above a perfect square (like 15, 17)
- Negative inputs: should not happen, but if so, instantly return False.
- When the input is a very large perfect square.

### Solution

```python
def isPerfectSquare(num: int) -> bool:
    if num < 2:
        # 0 and 1 are perfect squares
        return True

    left, right = 2, num // 2
    while left <= right:
        mid = left + (right - left) // 2
        sq = mid * mid
        if sq == num:
            return True
        elif sq < num:
            left = mid + 1
        else:
            right = mid - 1
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Because we use binary search to cut the search space in half every time.

- **Space Complexity:** O(1)  
  We only use constant extra variables: left, right, mid, sq (no recursion or extra storage needed).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **very large numbers** (above 64-bit range)?  
  *Hint: Use data types (like Python's `int`) that can handle arbitrary large numbers safely for multiplication.*

- Can you implement this using **Newton's iterative method**?  
  *Hint: Use the integer version of Newton's method (`x = (x + num // x) // 2`) for better convergence.*

- What if num could be **negative**?  
  *Hint: By mathematical definition, negative numbers can never be perfect squares of integers (over the real numbers), so return False immediately.*

### Summary
This is a classic **binary search** application on the answer space instead of an array. It efficiently checks if a number is a perfect square, avoiding floating-point imprecision, and is a great example of narrowing down possibilities based on monotonic numeric relationships. This binary search pattern can be applied to any scenario where you're searching for an integer answer based on a monotonically increasing or decreasing function—like finding square/cube roots, or solutions to quadratic/monotonic equations.


### Flashcard
Use binary search to check if there exists an integer i such that i × i == num.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
- Sqrt(x)(sqrtx) (Easy)
- Sum of Square Numbers(sum-of-square-numbers) (Medium)