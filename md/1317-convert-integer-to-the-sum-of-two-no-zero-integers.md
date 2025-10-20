### Leetcode 1317 (Easy): Convert Integer to the Sum of Two No-Zero Integers [Practice](https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers)

### Description  
Given a positive integer n, find two positive integers A and B such that:
- A + B = n,
- neither A nor B contains the digit ‘0’ in their decimal representation  
(both numbers are "no-zero integers").  
Return any one such pair [A, B].  
There is always at least one valid answer for 2 ≤ n ≤ 10,000.

### Examples  

**Example 1:**  
Input: `n = 2`,  
Output: `[1,1]`  
Explanation: Both 1 and 1 are no-zero integers and 1 + 1 = 2.

**Example 2:**  
Input: `n = 11`,  
Output: `[2,9]`  
Explanation: Both 2 and 9 are no-zero integers and 2 + 9 = 11.

**Example 3:**  
Input: `n = 10000`,  
Output: `[1,9999]`  
Explanation: Both 1 and 9999 are no-zero (no digit is 0), and their sum is 10000.

**Example 4:**  
Input: `n = 69`,  
Output: `[1,68]`  
Explanation: Both 1 and 68 are no-zero, 1 + 68 = 69.

**Example 5:**  
Input: `n = 1010`,  
Output: `[11,999]`  
Explanation: Both 11 and 999 are no-zero, and sum is 1010.

### Thought Process (as if you’re the interviewee)  
The problem asks for two positive numbers adding to n, with neither containing the digit '0'.  
Brute-force idea:  
- For each A from 1 to n-1, let B = n - A.
- For each pair (A, B): check if both do not contain '0'.
- Return first such valid pair.

Optimization:  
- Since constraints are small (n up to 10,000), brute-force is efficient enough.
- No fancy structures needed: just loop, check with string conversion if '0' is in either int.

Why this works:  
- The guarantee in the problem means at least one such solution exists for all valid n.
- This approach is very straightforward and correct.

Trade-offs:  
- Brute-force is simple, clear, and optimal here given the input range.
- No advanced optimizations needed due to tight constraints.

### Corner cases to consider  
- n uses numbers where both numbers close to n/2 may contain a '0' (e.g., n = 1001).
- Minimum input, n = 2.
- Inputs like n = 10, n = 100, n = 1000, etc., where many numbers around n might contain one or more '0's.  
- Numbers near boundary: n = 9999, n = 10,000.

### Solution

```python
def getNoZeroIntegers(n):
    # Helper function to check if an integer has '0' in its digits
    def has_zero(num):
        while num > 0:
            if num % 10 == 0:
                return True
            num //= 10
        return False

    # Try each possible split
    for a in range(1, n):
        b = n - a
        if not has_zero(a) and not has_zero(b):
            return [a, b]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where d is average number of digits in n (since for up to n splits, each number conversion/check takes at most O(log n) time). For n ≤ 10,000 this is negligible.
- **Space Complexity:** O(1) extra space (apart from output list), just variables for integer manipulation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted all pairs of no-zero integers that sum to n?  
  *Hint: Modify the loop to collect all valid (a, b) instead of returning on the first match.*

- How would you check for 3 or more no-zero integers that sum to n?  
  *Hint: Recursive or k-sum extension using similar digit checks.*

- Could you check "no-zero" for numbers without converting them to strings?  
  *Hint: Use arithmetic (modulus and division) to inspect digits instead of strings for efficiency.*

### Summary  
This problem uses the **brute-force search** pattern and checks integer properties (such as "does not contain 0" in decimal) efficiently due to small bounds. The pattern is applicable in other digit-constrained number problems, such as constructing numbers without certain digits, or splitting numbers by greedy or exhaustive checks where the solution count is small and verification is simple.


### Flashcard
For A from 1 to n-1, let B = n-A; return first pair where neither A nor B contains '0' as a digit.

### Tags
Math(#math)

### Similar Problems
