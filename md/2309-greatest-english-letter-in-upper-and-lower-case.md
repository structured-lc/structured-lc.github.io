### Leetcode 2309 (Easy): Greatest English Letter in Upper and Lower Case [Practice](https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case)

### Description  
Given a string \( s \) containing only English letters, return the **greatest English letter** (alphabetically last) that appears **in both uppercase and lowercase forms** within \( s \). Return the answer as an uppercase letter. If no such letter exists, return an empty string.

An English letter \( b \) is greater than \( a \) if \( b \) comes after \( a \) in the alphabet.

### Examples  

**Example 1:**  
Input: `s = "lEeTcOdE"`  
Output: `"E"`  
*Explanation: Only the letter 'E' appears in both upper and lower case ("E" and "e").*

**Example 2:**  
Input: `s = "arRAzFif"`  
Output: `"R"`  
*Explanation: The letters 'A', 'F', and 'R' each appear in both upper and lower case, but 'R' is alphabetically after 'F' and 'A'. So, 'R' is the answer.*

**Example 3:**  
Input: `s = "AbCdEfGhIjK"`  
Output: `""`  
*Explanation: No letter appears in both upper and lower case, so the result is an empty string.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each English letter from 'A' to 'Z', check if both the uppercase and lowercase version exist in the input string. Track all such letters and pick the greatest.
- **Optimization:**  
  - Use two sets to record letters seen in uppercase and lowercase.  
  - Scan the string once. For each character, add to the corresponding set.  
  - After scanning, iterate from 'Z' down to 'A' and check if both the uppercase and lowercase letters are present in their sets.  
  - Return the first such letter.
- **Trade-offs:**  
  - Using sets makes each check O(1), and only requires two passes: one to build the sets, and one to scan 26 letters in reverse.
  - No nested loops are needed, ensuring very efficient performance.

### Corner cases to consider  
- Empty string: `""`
- String with only uppercase or only lowercase letters.
- String where only some letters appear in both cases, or only one.
- Large strings but still within the constraint (up to 1000 characters).
- Input with all possible letters in both cases (quick check of solution speed).
- Mixtures like "aA", "ZZ", "zzz", "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ".

### Solution

```python
def greatestLetter(s: str) -> str:
    # Create sets to track all uppercase and lowercase letters in s
    upper = set()
    lower = set()
    
    for ch in s:
        if 'A' <= ch <= 'Z':
            upper.add(ch)
        elif 'a' <= ch <= 'z':
            lower.add(ch)
    
    # Check from 'Z' to 'A', return first letter present in both sets
    for i in range(25, -1, -1):
        up = chr(ord('A') + i)
        low = chr(ord('a') + i)
        if up in upper and low in lower:
            return up
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26) = O(n).  
  Scanning the input string is O(n). Scanning 26 letters ('Z' to 'A') is O(1), negligible for fixed alphabet.
- **Space Complexity:** O(1).  
  The sets can contain at most 26 entries each — constant space. No dependence on input length beyond this.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if you had to return **all such letters** in order?
  *Hint: Collect all candidates instead of exiting early. Sort them if needed.*

- Can you do it with **no extra space** beyond a few variables?
  *Hint: Try using integer bitmasks for presence of each letter case. Set a bit for each A-Z/a-z.*

- What if the input might contain **non-letter ASCII** characters?
  *Hint: Filter these out before adding to sets, or refine your character checks.*

### Summary
This problem is a good example of the **set/bucket counting pattern** for single pass string analysis. It can also be solved with bit manipulation for even less space. This technique of scanning for matching capitalized/lowercase variants can be applied to password or validation problems needing "both cases present." The core trick is the O(1) lookup via set or bitmask, and the constant work for a bounded English alphabet.

### Tags
Hash Table(#hash-table), String(#string), Enumeration(#enumeration)

### Similar Problems
- Count the Number of Special Characters II(count-the-number-of-special-characters-ii) (Medium)
- Count the Number of Special Characters I(count-the-number-of-special-characters-i) (Easy)