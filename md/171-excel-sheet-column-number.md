### Leetcode 171 (Easy): Excel Sheet Column Number [Practice](https://leetcode.com/problems/excel-sheet-column-number)

### Description  
This problem asks you to convert an **Excel column title** into the corresponding column number. In Excel, columns are labeled as 'A', 'B', ..., 'Z', 'AA', 'AB', ..., etc. The task is to take such a string and determine its numeric column value, treating the input like a base-26 number system where 'A' = 1, 'B' = 2, ..., 'Z' = 26, 'AA' = 27, and so on. Effectively, it's converting a string from a custom base-26 representation to an integer.

### Examples  

**Example 1:**  
Input: `"A"`  
Output: `1`  
*Explanation: 'A' is the first column, so the output is 1.*

**Example 2:**  
Input: `"AB"`  
Output: `28`  
*Explanation: 'A' as the leftmost (26¹ place) is 1 × 26 = 26, 'B' (ones place) is 2 × 1 = 2.  
Sum: 26 + 2 = 28.*

**Example 3:**  
Input: `"ZY"`  
Output: `701`  
*Explanation: 'Z' (26 × 26 = 676) + 'Y' (25 × 1 = 25) → 676 + 25 = 701.*

### Thought Process (as if you’re the interviewee)  
The right way to approach this problem is to recognize its similarity to converting a base-n numeric string to decimal. Here, the base is 26. But unlike typical positional notation, the digit mapping starts from 1 ('A'), not 0. For each character in the title from left to right:
- Map the letter to its value: `val = ord(char) - ord('A') + 1`
- Accumulate: `res = res × 26 + val`

**Brute-force idea:**  
- Try generating all possible titles and mapping them, but this is neither feasible nor necessary given the simple structure.

**Optimized approach:**  
- Scan the string once, updating the result at each step using base-26 logic.

This is **O(n)** time (n = length of input string), **O(1)** space.

### Corner cases to consider  
- Input length is 1 (e.g. `"Z"`)
- Longest possible string (e.g. `"FXSHRXW"`)
- Only last character is not 'A' (e.g. `"AAAAB"`)
- Repeated characters (e.g. `"AAAA"`)
- Smallest and largest allowed values (e.g. `"A"`, `"Z"`)

### Solution

```python
def titleToNumber(columnTitle: str) -> int:
    # Accumulate the numeric value
    res = 0
    for c in columnTitle:
        # Convert character to its base-26 value ('A' -> 1, ..., 'Z' -> 26)
        val = ord(c) - ord('A') + 1
        # Shift previous result by ×26 (left) and add current character's value
        res = res * 26 + val
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We process each character once.
- **Space Complexity:** O(1), as we use only a fixed amount of extra space regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reverse this conversion: given a number, output the column title?
  *Hint: Think about repeated division and remainders (similar to converting a number to base-26, but offset by 1).*

- What if Excel started columns using digits ('1'...'9', 'A'...'Z')—how would you generalize this?
  *Hint: Consider extending the character set for the base and ensure mapping preserves uniqueness.*

- Can you process strings with both upper and lowercase letters?
  *Hint: Normalize inputs before processing, e.g., use `.upper()`.*

### Summary
The problem is a classic **base conversion** pattern, commonly seen in variants such as number-to-string and string-to-number questions (with a custom mapping). It’s often encountered in problems dealing with spreadsheets, encodings, or anywhere a non-standard numeral system exists. Recognizing its base structure and how to generalize the conversion is the key insight for robust solutions.


### Flashcard
Convert the title to a number by mapping each letter to 1-26 and accumulating res = res × 26 + val for each character.

### Tags
Math(#math), String(#string)

### Similar Problems
- Excel Sheet Column Title(excel-sheet-column-title) (Easy)
- Cells in a Range on an Excel Sheet(cells-in-a-range-on-an-excel-sheet) (Easy)