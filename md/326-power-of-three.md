### Leetcode 326 (Easy): Power of Three [Practice](https://leetcode.com/problems/power-of-three)

### Description  
Given an integer n, determine if it is a power of three.  
That is, return true if there exists an integer x such that n = 3ˣ; otherwise, return false.  
You cannot use built-in functions like pow or log in most interview settings.

### Examples  

**Example 1:**  
Input: `n = 27`  
Output: `true`  
*Explanation: 27 = 3³ = 3 × 3 × 3, so it's a power of three.*

**Example 2:**  
Input: `n = 0`  
Output: `false`  
*Explanation: Zero is not a result of three raised to any integer power.*

**Example 3:**  
Input: `n = -1`  
Output: `false`  
*Explanation: Negative numbers cannot result from any positive power of three.*

### Thought Process (as if you’re the interviewee)  
Let’s start with a brute-force solution:  
If n is less than or equal to 0, instantly return false. For positive n, I can keep dividing n by 3 as long as it divides evenly—this removes all factors of 3. If I end up with 1, then n is a power of three; otherwise, it is not.

But, in interviews, it’s best to mention any optimization. Since the power of three grows fast and the constraints are within signed 32-bit integers, the largest such number is 3¹⁹ = 1,162,261,467. If n divides this number without remainder, it must be a power of three. This trick allows for a one-line check, avoiding all loops and recursion.

Both approaches are acceptable—in real interviews, the division loop shows clear logic and is preferred unless space/time is deeply constrained.

### Corner cases to consider  
- n = 1 (edge case; 3⁰ = 1, so should return true)
- n = 0 (should return false)
- n < 0 (all negatives return false)
- Large numbers (close to the int32 limit)
- n not divisible by 3 at any step

### Solution

```python
def isPowerOfThree(n):
    # Negative numbers and zero cannot be powers of three
    if n <= 0:
        return False
    
    # Keep dividing n by 3 while it divides evenly
    while n % 3 == 0:
        n //= 3
        
    # After removing all factors of 3, n should be 1 if it was a power of three
    return n == 1
```

# Alternative (no loops or recursion):

```python
def isPowerOfThree(n):
    # 3^19 is the largest power of 3 within 32-bit signed integer: 1162261467
    # All valid powers of 3 must divide this number without remainder
    return n > 0 and 1162261467 % n == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Brute-force division: O(log₃n) — We repeatedly divide by 3 until n becomes 1  
  Mathematical trick: O(1) — Just a single modulo and comparison

- **Space Complexity:**  
  Both methods use O(1) extra space — No recursion or additional storage used

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were asked for powers of another integer, such as 5?  
  *Hint: Replace 3 with the target base, and use the same division loop or largest-power trick.*

- Could you solve this using recursion?  
  *Hint: Base case for n == 1 (true) or n ≤ 0 (false); otherwise recurse with n // 3.*

- How would you generalize this for negative powers or rational numbers?  
  *Hint: For integer n, negative powers are not in the set unless n = 1; rational numbers need a different approach.*

### Summary

This problem uses the repeated division pattern, a common way to check for membership in geometric progressions (powers of a base). The math trick leverages properties of divisibility among powers of a number, making for an efficient alternative. This pattern often applies when checking for powers of any constant base, and it’s often seen in integer decomposition questions.