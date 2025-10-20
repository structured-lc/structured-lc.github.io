### Leetcode 633 (Medium): Sum of Square Numbers [Practice](https://leetcode.com/problems/sum-of-square-numbers)

### Description  
Given a non-negative integer `c`, determine if there exist two non-negative integers `a` and `b` such that  
a² + b² = c.  
In other words, can `c` be represented as the sum of squares of two integers?  
You need to return `True` if such a pair exists, else return `False`.

### Examples  

**Example 1:**  
Input: `5`  
Output: `True`  
*Explanation: 1² + 2² = 1 + 4 = 5. So, True.*

**Example 2:**  
Input: `3`  
Output: `False`  
*Explanation: 0² + 1² = 1, 1² + 1² = 2, 0² + 2² = 4. None of these sums equals 3, so return False.*

**Example 3:**  
Input: `2`  
Output: `True`  
*Explanation: 1² + 1² = 1 + 1 = 2.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  - Try all pairs (a, b) where 0 ≤ a ≤ ⌊√c⌋ and 0 ≤ b ≤ ⌊√c⌋, and check if a² + b² = c.  
  - Downside: Time complexity would be O(n) for each value, leading to quadratic checks — inefficient for large c.
- **Optimized approach: Two-pointer technique:**  
  - Since a and b are symmetric, sort them: try a from 0 up to ⌊√c⌋, and b from ⌊√c⌋ down to 0.
  - For each iteration:
    - Calculate sum = a² + b².
    - If sum equals c, return True.
    - If sum < c, increment a to try with higher square.
    - If sum > c, decrement b to try with smaller square.
  - Stops when a > b.
  - This reduces unnecessary checks and efficiently covers possibilities in O(√c) time[1][3][4].
- **Alternative (hashing):**
  - Precompute all squares up to ⌊√c⌋ and store in a set.
  - For each a, check if c - a² is in the set.
  - Also O(√c) time but O(√c) space[2].

**Why choose two-pointer?**  
- Only uses constant space.
- Clean and fast; fits naturally due to sorted nature of perfect squares.

### Corner cases to consider  
- c = 0 (Should return True as 0² + 0² = 0)
- c = 1 (Should return True, as 1² + 0² = 1)
- Large values of c (Check for overflow and performance)
- Cases where only one square is nonzero (e.g. c = 4: possible with 2² + 0²)
- Cases that are not sums of squares at all (e.g. c = 3)

### Solution

```python
def judgeSquareSum(c: int) -> bool:
    # Two pointers: a starts at 0, b starts at integer sqrt(c)
    a = 0
    b = int(c ** 0.5)
    
    while a <= b:
        s = a * a + b * b
        if s == c:
            return True
        elif s < c:
            a += 1  # increase a to try a larger sum
        else:
            b -= 1  # decrease b to try a smaller sum
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√c)  
  Loop runs at most from a=0 to b=⌊√c⌋, so the number of iterations is proportional to √c.
- **Space Complexity:** O(1)  
  Only uses a constant number of variables; does not allocate extra storage dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of two squares, you needed to check if c is a sum of three squares?  
  *Hint: Think about extending your method to one more variable and check performance.*

- Can you generalize this for k squares?  
  *Hint: Would recursion or dynamic programming help with more variables?*

- How would you handle extremely large values of c (10¹⁸+)?  
  *Hint: Consider integer overflows and data type constraints in implementation.*

### Summary
This problem uses a classic two-pointer pattern due to the sorted nature of perfect squares — checking from opposite ends for a sum match.  
It's a variant of the classic "pair sum" problem, mapping naturally to two pointers for optimal time and constant space.  
The idea is broadly applicable where valid pairs with constraints are sought over sorted ranges, such as two-sum or searching sorted arrays.


### Flashcard
Use two pointers: one starts at 0, other at ⌊√c⌋; check if a² + b² = c, move pointers inward based on sum.

### Tags
Math(#math), Two Pointers(#two-pointers), Binary Search(#binary-search)

### Similar Problems
- Valid Perfect Square(valid-perfect-square) (Easy)
- Sum of Squares of Special Elements (sum-of-squares-of-special-elements) (Easy)