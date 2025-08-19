### Leetcode 3110 (Easy): Score of a String [Practice](https://leetcode.com/problems/score-of-a-string)

### Description  
Given a string s, the **score** is the sum of the absolute differences between the ASCII values of every pair of adjacent characters in s.  
For any string s of length n, return the total score:  
For every index i from 0 to n-2, add |ASCII(s[i]) - ASCII(s[i+1])| to the score.

### Examples  

**Example 1:**  
Input: `s = "hello"`  
Output: `13`  
*Explanation: ASCII values are h=104, e=101, l=108, l=108, o=111.  
|104-101|=3, |101-108|=7, |108-108|=0, |108-111|=3 → 3+7+0+3=13.*

**Example 2:**  
Input: `s = "zaz"`  
Output: `50`  
*Explanation: ASCII values are z=122, a=97, z=122.  
|122-97|=25, |97-122|=25 → 25+25=50.*

**Example 3:**  
Input: `s = "aba"`  
Output: `2`  
*Explanation: ASCII values are a=97, b=98, a=97.  
|97-98|=1, |98-97|=1 → 1+1=2.*

### Thought Process (as if you’re the interviewee)  
- Start by reading the problem carefully: for every pair of adjacent letters, we compute the absolute difference of their ASCII values, and sum it up.
- Brute-force is simple: for each i in [0, n-2], compute abs(ord(s[i]) - ord(s[i+1])) and sum.
- Only one pass through the string is necessary—no optimizations required since s.length ≤ 100.
- This is a pure iteration/string traversal problem, no sorting or extra data structures.
- Edge case: string length exactly 2 (just one difference).
- Why this approach?  
  - O(n) time is optimal.
  - No extra space needed; just keep a running total.

### Corner cases to consider  
- Length-2 string (minimum length allowed by constraints).
- All characters are the same (all differences will be zero).
- Alternating large/small ASCII values (like "zaz").
- Consecutive ascending/descending runs (like "abcdef" or "fedcba").
- Input consisting only of two distinct letters many times.

### Solution

```python
def scoreOfString(s: str) -> int:
    score = 0
    # Loop through each pair of adjacent characters
    for i in range(len(s) - 1):
        # ord(s[i]) gets ASCII value. Compute absolute difference
        diff = abs(ord(s[i]) - ord(s[i + 1]))
        score += diff
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Each of (n-1) pairs is checked once.
- **Space Complexity:** O(1), no extra space required other than a few integer variables. No auxiliary arrays/lists.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were given a list of scores—could you efficiently reconstruct a possible string?
  *Hint: Could multiple strings create the same adjacent differences?*

- What if you needed to find the substring of length k with the highest score?
  *Hint: Use a sliding window approach to sum window differences efficiently.*

- How would you handle input containing both uppercase and lowercase letters, or non-letters?
  *Hint: ord() still works, but test behavior and corner cases for mixed types.*

### Summary
This problem is a straightforward string traversal and difference-aggregation pattern.  
It emphasizes careful handling of adjacent-pair logic, a pattern that recurs in problems like "wiggle sequence," windowed substring analysis, and local max/min pair differences.  
The code and logic here are highly generalizable for similar neighbor-based operations on arrays or strings.

### Tags
String(#string)

### Similar Problems
