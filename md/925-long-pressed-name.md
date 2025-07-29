### Leetcode 925 (Easy): Long Pressed Name [Practice](https://leetcode.com/problems/long-pressed-name)

### Description  
Given two strings, **name** and **typed**, determine if **typed** could represent **name** if some characters in **name** were *long pressed* (i.e., some keys might be held longer, causing the same character to be typed consecutively one or more times). Return `True` if **typed** can be a result of **name** with possible long presses, otherwise return `False`.  
Characters must appear in order, but **typed** may have extra consecutive occurrences of characters from **name**.

### Examples  

**Example 1:**  
Input: `name = "alex", typed = "aaleex"`  
Output: `True`  
*Explanation: 'a' and 'e' in "alex" are each typed one extra time, possibly due to long press.*

**Example 2:**  
Input: `name = "saeed", typed = "ssaaedd"`  
Output: `False`  
*Explanation: "saeed" has two 'e's, but in "ssaaedd" the consecutive sequence of 'e's is not sufficient to match the double 'e' in "saeed".*

**Example 3:**  
Input: `name = "leelee", typed = "lleeelee"`  
Output: `True`  
*Explanation: Both 'l' and 'e' in "leelee" have extra consecutive appearances in "typed", which is valid for long press simulation.*

**Example 4:**  
Input: `name = "laiden", typed = "laiden"`  
Output: `True`  
*Explanation: No long presses. Characters match directly, which is also a valid case.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try to “simulate” typing out the **name** using **typed** by matching every character in order, skipping through additional repeated characters when a long press occurs.
  
- **Optimized approach:**  
  Use two pointers: one for **name** (i), and one for **typed** (j).
  - Walk through both strings.
  - If `name[i] == typed[j]`, move both pointers forward.
  - If `typed[j]` equals `typed[j - 1]`, it's a long-pressed repeat; increment j only.
  - If neither case applies, return False (character mismatch).
  - At the end, verify that the **name** pointer has reached the end of **name** — otherwise, return False (not all characters in **name** are typed).

- **Why this approach:**  
  - Uses only constant extra space.
  - Linear time in the length of **typed** and **name**.
  - Directly models the process described, making errors (like extra or missed characters) easy to catch.


### Corner cases to consider  
- **typed** shorter than **name** → always False.
- **typed** with extra characters not appearing in **name**.
- Multiple repeated groups or all unique characters.
- **name** or **typed** are empty strings (though constraints guarantee length ≥ 1).
- Edge case: the last character(s) are long pressed at the end of **typed**.
- Repeats for every character in **name**, or no repeats at all.


### Solution

```python
def isLongPressedName(name: str, typed: str) -> bool:
    # Use two pointers: i (for name) and j (for typed)
    i, j = 0, 0
    while j < len(typed):
        # If characters match, move both pointers
        if i < len(name) and name[i] == typed[j]:
            i += 1
            j += 1
        # If current char in typed equals its previous one, it's a long press
        elif j > 0 and typed[j] == typed[j - 1]:
            j += 1
        else:
            # Mismatch: can't be a long press from name
            return False
    # All characters in name should be matched
    return i == len(name)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m),  
  where n = len(name), m = len(typed). Each pointer only moves forward through its respective string.
- **Space Complexity:** O(1),  
  only a few integer variables are used, no extra data structures.


### Potential follow-up questions (as if you’re the interviewer)  

- What if **typed** is significantly longer than **name**?  
  *Hint: Think about early exits when mismatch occurs.*

- How would your approach change if upper/lowercase differences should be ignored?  
  *Hint: Compare with both converted to the same case.*

- Can you handle arbitrary Unicode strings, such as accented or non-Latin characters?  
  *Hint: Direct character comparison, but be careful with normalization if applicable.*


### Summary
This solution uses the **two pointers** pattern to compare two strings with allowance for consecutive repeats in the second string (long presses). It’s an efficient, O(n) approach and directly models real-world text processing problems involving repetition, such as keystroke errors or interpreting user input with unintended key presses. The two-pointer comparison technique can be adapted to various string matching, merge, and data stream problems.