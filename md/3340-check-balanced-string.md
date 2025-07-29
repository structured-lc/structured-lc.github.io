### Leetcode 3340 (Easy): Check Balanced String [Practice](https://leetcode.com/problems/check-balanced-string)

### Description  
You are given a string consisting only of digits. A string is called **balanced** if the sum of the digits at even indices equals the sum of the digits at odd indices (indices are zero-based). Return `true` if the string is balanced, otherwise return `false`.  
For example, with `"1234"`, compute the sum for indices 0 and 2, and for indices 1 and 3, and compare the two sums.

### Examples  

**Example 1:**  
Input: `num = "1234"`  
Output: `False`  
*Explanation: Even indices 0,2 → 1+3=4; Odd indices 1,3 → 2+4=6; 4 ≠ 6.*

**Example 2:**  
Input: `num = "24123"`  
Output: `True`  
*Explanation: Even indices 0,2,4 → 2+1+3=6; Odd indices 1,3 → 4+2=6; 6=6.*

**Example 3:**  
Input: `num = "11"`  
Output: `True`  
*Explanation: Even index 0 → 1; Odd index 1 → 1; 1=1.*

### Thought Process (as if you’re the interviewee)  
First, I would consider iterating through the string and maintaining two sums: one for even indices and one for odd indices. For each character, depending on its position (even or odd index), I’ll add its integer value to the corresponding sum.  
At the end, I’ll compare the two sums.  
A brute-force approach would be to extract all digits at even and odd indices into two separate lists, then sum them.  
An optimized approach simply maintains two integer variables for the current running sums.  
Since only two integer variables are needed, the space is constant, and only one pass through the string is needed, so time is O(n).  
This is the minimal/optimal solution for this problem.

### Corner cases to consider  
- Input of length 2 (minimum size)
- Strings containing '0'
- String where even and odd sums are both zero (e.g. "00")
- Strings with very large or very small (single-digit) values
- No possible integer overflow as digit sum will not exceed 900

### Solution

```python
def isBalanced(num: str) -> bool:
    # Sums to track digits at even and odd indices
    even_sum = 0
    odd_sum = 0

    # Iterate over string, add digit to correct sum
    for i, ch in enumerate(num):
        digit = int(ch)
        if i % 2 == 0:
            even_sum += digit
        else:
            odd_sum += digit

    # Compare the two sums for balance
    return even_sum == odd_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We visit each character once.
- **Space Complexity:** O(1), as we only use two integer variables and do not allocate additional storage proportional to the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the problem if the index grouping was by a different pattern instead of even/odd?  
  *Hint: Can you use mod k grouping and an array of size k for partial sums?*

- How would you efficiently update for frequent queries where only one digit changes in the string?  
  *Hint: Can you update only the affected sum in constant time?*

- Can you solve this problem in-place for a character array version (to meet stricter space constraints)?  
  *Hint: You only need constant extra space for sums.*

### Summary
This problem uses the **two-pointer / partial sum pattern**, though simplified to accumulation via modulo indexing. The approach is direct and common for problems related to digit separation, and the pattern applies to problems involving cumulative calculations from groups determined by index parity or modulus. This kind of index-based grouping shows up whenever input needs to be classified or split without using extra structures.