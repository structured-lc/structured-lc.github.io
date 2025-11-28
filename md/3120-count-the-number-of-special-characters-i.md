### Leetcode 3120 (Easy): Count the Number of Special Characters I [Practice](https://leetcode.com/problems/count-the-number-of-special-characters-i)

### Description  
Given a string `word` consisting of uppercase and lowercase English letters, a letter is **special** if it appears in both **lowercase and uppercase forms** anywhere in the string. Return the count of such special letters.  
*For example, 'a' is special if both 'a' and 'A' appear in the string.*

### Examples  

**Example 1:**  
Input: `word = "aaAbcBC"`  
Output: `3`  
Explanation: 'a', 'b', and 'c' each appear as both lowercase and uppercase, so there are 3 special characters.

**Example 2:**  
Input: `word = "abc"`  
Output: `0`  
Explanation: No character appears in both lowercase and uppercase forms.

**Example 3:**  
Input: `word = "abBCab"`  
Output: `1`  
Explanation: Only 'b' appears in both lowercase ('b') and uppercase ('B').

### Thought Process (as if you’re the interviewee)  
- The problem asks how many English letters appear in **both** lowercase and uppercase forms in the string.
- Brute force: For each character from 'a' to 'z', check if both it and its uppercase form are present in the string.
- To speed this up, use a set for O(1) lookup of whether a character appears in the string.
- Iterate from 'a' to 'z', and for each letter, if both lowercase and uppercase versions are in the set, increment the count.
- This approach uses extra space for the set but is very efficient—both time and space are O(1) since the English alphabet has a fixed size.

### Corner cases to consider  
- String with all lowercase (should give 0).
- String with all uppercase (should give 0).
- String with both cases for some letters.
- Empty string (should give 0).
- Letters not repeated (just having 'a' and 'A' is enough to be special).
- String length = 1 (should always be 0).
- Multiple occurrences of the same letter in both cases (count each letter only once).

### Solution

```python
def numberOfSpecialChars(word):
    # Create a set of all characters in the word
    chars = set(word)

    count = 0
    # Check for each letter a-z if both lower and upper appear in the set
    for i in range(26):
        lower = chr(ord('a') + i)
        upper = chr(ord('A') + i)
        if lower in chars and upper in chars:
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n),  
  where n is the length of `word`. We process each character once to build the set (O(n)), then check each of the 26 letters (constant time).
- **Space Complexity:** O(1),  
  since at most 52 unique letters (a-z, A-Z) are stored in the set—this does not scale with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find **which** letters are special, not just their count?  
  *Hint: Store or return the letters instead of just incrementing count.*

- What if you needed to consider only the **first occurrence** of each letter and ignore further repeats?  
  *Hint: Update your set-building logic to consider position.*

- If the input string could be up to 10⁶ characters, would your solution still be efficient?  
  *Hint: Is the solution’s time and space still O(1) due to fixed alphabet size?*

### Summary
This problem is a classic **set membership** and **character frequency** problem, relying on the fixed size of the English alphabet. The pattern (using sets to check presence) commonly appears in string processing and bit masking problems. This approach is efficient and scalable, handling any input size within the alphabet constraints efficiently.


### Flashcard
Use a set for O(1) lookup. Iterate 'a' to 'z'; count letters where both lowercase and uppercase forms exist in the set.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Detect Capital(detect-capital) (Easy)
- Greatest English Letter in Upper and Lower Case(greatest-english-letter-in-upper-and-lower-case) (Easy)
- Count the Number of Special Characters II(count-the-number-of-special-characters-ii) (Medium)