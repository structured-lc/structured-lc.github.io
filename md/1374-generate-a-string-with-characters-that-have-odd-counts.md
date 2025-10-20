### Leetcode 1374 (Easy): Generate a String With Characters That Have Odd Counts [Practice](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts)

### Description  
Given an integer n, return a string with n lowercase English letters such that **each letter appears an odd number of times**.
- You can use any lowercase letters (a-z).
- The length of the resulting string is exactly n.
- Each character used should appear an odd number of times in total.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `"aaab"`  
*Explanation: 'a' appears 3 (odd) times, 'b' appears 1 (odd) time; length is 4. Any such pattern is valid.*

**Example 2:**  
Input: `n = 2`  
Output: `"ab"`  
*Explanation: Both characters appear once (odd).* 

**Example 3:**  
Input: `n = 7`  
Output: `"bbbbbbb"`  
*Explanation: 'b' appears 7 (odd) times. Only one letter is fine as long as count is odd.*

### Thought Process (as if you’re the interviewee)  
First, for n odd: just return 'a' repeated n times (one letter appears n times, n is odd).

For n even: need the sum of two odd numbers to get n, so pick any two letters: 'a' (n-1 times, odd), 'b' (1 time, odd), for total n. This always works for any even n.

No constraints on distributing them except each should appear an odd number of times.

### Corner cases to consider  
- n = 1 (should return a single letter)
- n very large (should still return efficiently)
- No constraints on which letters used

### Solution

```python
def generateTheString(n: int) -> str:
    if n % 2 == 1:
        # n is odd: single letter all positions
        return 'a' * n
    else:
        # n even: n-1 a's and 1 b
        return 'a' * (n - 1) + 'b'
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Constructing a string of length n.
- **Space Complexity:** O(n) — For the returned string.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you are asked to use at least k distinct letters, all with odd counts?  
  *Hint: Is it always possible for any n/k?*

- What if only "a" and "b" can be used, and both must appear an odd, positive number of times?  
  *Hint: How would you distribute the counts then?*

- How would you change the code if the string must be a palindrome?  
  *Hint: Odd counts work well for palindromes!*

### Summary
This is a classic string construction problem, and the core trick is basic number parity (even/odd). It's a simple coding pattern: if n is odd, fill with one letter; if even, fill n-1 with one and the last with another. This parity trick appears often in combinatorial string/array problems.


### Flashcard
If n is odd, return 'a' × n; if even, return 'a' × (n-1) + 'b' (both counts odd).

### Tags
String(#string)

### Similar Problems
