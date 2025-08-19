### Leetcode 2443 (Medium): Sum of Number and Its Reverse [Practice](https://leetcode.com/problems/sum-of-number-and-its-reverse)

### Description  
Given a non-negative integer num, determine if there exists a non-negative integer k such that when you add k and the reverse of k, the sum equals num.  
The reverse of a number is formed by reversing its digits, retaining any leading zeros in the reversed version.  
Return True if such a k exists, otherwise False.

### Examples  

**Example 1:**  
Input: `num = 443`  
Output: `True`  
*Explanation: 172 + 271 = 443. 271 is the reverse of 172.*

**Example 2:**  
Input: `num = 63`  
Output: `False`  
*Explanation: No non-negative integer k such that k + reverse(k) = 63.*

**Example 3:**  
Input: `num = 181`  
Output: `True`  
*Explanation: 140 + 041 = 181. (The reverse of 140 is 41, but leading zeros are accepted when reversing.)*

### Thought Process (as if you’re the interviewee)  
First, I want to check all possible candidates for k (from 0 to num), since both k and its reverse are non-negative and adding a reverse never makes the sum bigger than num + num. For each k:
- Compute the reverse of k.  
- Check if k + reverse(k) == num.  
- If yes, return True as soon as such a k is found.

This brute-force loop is acceptable because num is small (≤ 100,000).  
I considered starting from max(0, num - max possible reverse), but since the reverse can shrink or expand the number of digits unpredictably (because of leading zeros), it's simplest and safest to do a full loop.

Optimizations:  
- Instead of looping to num, some solutions do num // 2 to num, but since reverse can be less than, equal to, or more than k for different digits, covering all k in [0, num] is safest for correctness.

### Corner cases to consider  
- num = 0 (should return True, since 0 + 0 = 0)
- num is a single digit  
- num cannot be written as sum (e.g., primes that can't be formed)  
- k or its reverse has leading zeros (the reverse function shouldn’t lose zeros up front)
- num is very large (hit edge of constraints, performance)

### Solution

```python
def sumOfNumberAndReverse(num: int) -> bool:
    # Helper to reverse an integer (preserving leading zeros in calculation)
    def reverse(k: int) -> int:
        rev = 0
        while k > 0:
            rev = rev * 10 + k % 10
            k //= 10
        return rev
    
    # Try all k from 0 up to num
    for k in range(num + 1):
        if k + reverse(k) == num:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(num × d), where d is the number of digits in k.  
    For each k (up to num), we reverse k digit-by-digit (worst-case 6 digits for 100,000).
- **Space Complexity:** O(1).  
    All computation is done in-place with constant auxiliary storage for rev, k, etc.

### Potential follow-up questions (as if you’re the interviewer)  

- If num is much larger (e.g., up to 10⁹), how would you optimize?  
  *Hint: Think about pruning the search space, or mathematical properties of k + reverse(k).*

- Can you write a reverse function without converting to string?  
  *Hint: Step digit by digit using mod/div.*

- How would you handle if negative k were allowed?  
  *Hint: Is the reverse of a negative number well-defined under the problem statement?*

### Summary  
This is a brute-force digit manipulation problem that relies on checking all possible splitting pairs (k, reverse(k)) for a given sum.  
The main pattern is checking all values in a bounded range and applying digit manipulation, which is common in palindrome and reverse-number problems (e.g., sum of palindrome numbers, reverse-integer).  
This logic applies anywhere you need to check the relationship between a number and its digit-reversed counterpart.

### Tags
Math(#math), Enumeration(#enumeration)

### Similar Problems
- Sum of Numbers With Units Digit K(sum-of-numbers-with-units-digit-k) (Medium)