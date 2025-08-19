### Leetcode 459 (Easy): Repeated Substring Pattern [Practice](https://leetcode.com/problems/repeated-substring-pattern)

### Description  
Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

### Examples  

**Example 1:**  
Input: `s = "abab"`  
Output: `true`  
*Explanation: It is the substring "ab" twice.*

**Example 2:**  
Input: `s = "aba"`  
Output: `false`  
*Explanation: Cannot be formed by repeating any substring.*

**Example 3:**  
Input: `s = "abcabcabcabc"`  
Output: `true`  
*Explanation: It is the substring "abc" four times or the substring "abcabc" twice.*


### Thought Process (as if you're the interviewee)  
We need to check if a string can be formed by repeating a substring multiple times.

**Key Insight:**
If a string is formed by repeating a pattern, then the pattern length must be a divisor of the total string length.

**Brute Force Approach:**
1. Try all possible pattern lengths from 1 to n//2
2. For each length, check if the substring from 0 to length-1 can form the entire string
3. Time complexity: O(n²)

**Optimized Approach:**
Only check divisors of the string length, since the pattern length must divide the total length evenly.

**String Concatenation Trick:**
There's also a clever approach: if s can be formed by repeating a pattern, then s will appear in s+s starting from index len(pattern) where pattern is the shortest repeating unit. This means s should appear in (s+s)[1:-1].

I'll implement the divisor approach as it's more intuitive and easier to explain in an interview.


### Corner cases to consider  
- String of length 1: Cannot be formed by repeating (need at least 2 repetitions)  
- Empty string: Edge case, typically return false  
- String where the entire string is the pattern: Should return false (need multiple repetitions)  
- All characters are the same: Can be formed by repeating single character  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def repeatedSubstringPattern(s):
    n = len(s)
    
    # A string needs at least 2 repetitions to be valid
    if n <= 1:
        return False
    
    # Try all possible pattern lengths that can divide the string length
    # Pattern length can be from 1 to n//2
    for pattern_length in range(1, n // 2 + 1):
        # Check if this pattern length divides the total length
        if n % pattern_length == 0:
            # Extract the potential pattern
            pattern = s[:pattern_length]
            
            # Check if repeating this pattern gives us the original string
            repetitions = n // pattern_length
            constructed = pattern * repetitions
            
            if constructed == s:
                return True
    
    return False

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d) where n is the string length and d is the number of divisors of n. In the worst case, this is O(n²) when we check each pattern length and construct the full string for comparison.
- **Space Complexity:** O(n) for storing the constructed string during comparison. We could optimize this to O(1) by checking character by character instead of constructing the full string.


### Potential follow-up questions (as if you're the interviewer)  

- Can you solve this in O(n) time?  
  *Hint: Use the string concatenation trick: check if s appears in (s+s)[1:-1], or use KMP algorithm for pattern matching*

- What if you need to return the shortest repeating pattern instead of just true/false?  
  *Hint: Return the pattern when you find the first valid pattern length (since we iterate from smallest to largest)*

- How would you solve this if the pattern could have gaps or wildcards?  
  *Hint: This becomes a more complex pattern matching problem, potentially requiring dynamic programming*

### Summary
This problem demonstrates the importance of recognizing mathematical properties (divisors) in string problems. The key insight is that any repeating pattern must have a length that divides the total string length. While there are more sophisticated approaches using string algorithms, the divisor-based approach is intuitive and efficient enough for most cases. This pattern of checking all valid divisors appears in many mathematical and algorithmic problems.

### Tags
String(#string), String Matching(#string-matching)

### Similar Problems
- Find the Index of the First Occurrence in a String(find-the-index-of-the-first-occurrence-in-a-string) (Easy)
- Repeated String Match(repeated-string-match) (Medium)