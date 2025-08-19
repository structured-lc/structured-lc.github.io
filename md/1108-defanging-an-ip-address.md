### Leetcode 1108 (Easy): Defanging an IP Address [Practice](https://leetcode.com/problems/defanging-an-ip-address)

### Description  
Given a *valid IPv4 address*, return its **defanged** version.  
Defanging an IP means **replacing every period `.` with the string `[.]`** in the given address; this is often done to prevent web browsers or parsers from recognizing it as a link or clickable address, which is useful in security-sensitive contexts.

### Examples  

**Example 1:**  
Input: `address = "1.1.1.1"`  
Output: `"1[.]1[.]1[.]1"`  
*Explanation: Each '.' is replaced with '[.]', so "1.1.1.1" becomes "1[.]1[.]1[.]1".*

**Example 2:**  
Input: `address = "255.100.50.0"`  
Output: `"255[.]100[.]50[.]0"`  
*Explanation: Every period is replaced with '[.]', thus "255.100.50.0" is defanged to "255[.]100[.]50[.]0".*

**Example 3:**  
Input: `address = "0.0.0.0"`  
Output: `"0[.]0[.]0[.]0"`  
*Explanation: All periods are replaced, resulting in "0[.]0[.]0[.]0".*

### Thought Process (as if you’re the interviewee)  
My goal is to scan the input string and replace every period `.` with `[.]`.  

- **Brute force idea:** Loop through each character, add it to a result string or list. If it's a `.` add `[.]` instead.
- **Optimize:** Since string concatenation can be inefficient in some languages, especially for multiple additions, we'll use a **list to collect pieces** and then join them at the end. This avoids creating many interim strings.
- This is still linear time.  
- This problem is a classic example of string replacement; it's simple, and allows us to demonstrate careful iteration and awareness of time/space constraints.

### Corner cases to consider  
- Input that is minimum length, e.g., `"0.0.0.0"` or `"1.1.1.1"`.
- If there are *no* periods (though for valid IPv4, there will always be three periods).
- Input with consecutive digits or same repeated digits, e.g., `"111.111.111.111"`.
- Already defanged input (shouldn't happen per constraints).
- Leading/trailing periods (again, shouldn't happen with valid IPv4).

### Solution

```python
def defangIPaddr(address: str) -> str:
    # Initialize an empty list to collect characters and '[.]'
    res = []
    for c in address:
        if c == '.':
            # Replace period with '[.]'
            res.append('[.]')
        else:
            # Copy the digit as is
            res.append(c)
    # Join result list into a single string and return
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the address string. We scan each character exactly once.
- **Space Complexity:** O(n), for storing the new string (since every period increases the string size by 2, up to about 2 × n in total).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle IPv6 addresses for defanging?  
  *Hint: Think about different separators or formats in IPv6.*

- Could you defang the address in place (without returning a new string)?  
  *Hint: Consider the immutability of strings in the language; in some languages this isn't possible.*

- What if we had to replace multiple different characters, not just periods?  
  *Hint: Discuss how a mapping/dictionary or regular expressions might generalize the approach.*

### Summary  
This solution demonstrates a **basic string manipulation pattern**, scanning and transforming characters one by one. It's commonly used when you need to sanitize or alter substrings in a structured way, as seen in HTML escaping, input cleaning, or formatting data for output. This core pattern appears in many coding interview problems involving string transformation or encoding tasks.

### Tags
String(#string)

### Similar Problems
