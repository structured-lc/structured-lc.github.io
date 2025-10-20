### Leetcode 1888 (Medium): Minimum Number of Flips to Make the Binary String Alternating [Practice](https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating)

### Description  
Given a binary string (only '0's and '1's), you can:  
- Remove the first character and append it to the end (circular shift, any number of times).
- Flip any character from '0' to '1' or vice versa (costly operation).  

Return the **minimum number of flips** needed to make the (possibly shifted) string alternating (no two adjacent chars are the same). An alternating string is of the form `"0101..."` or `"1010..."`.  

---

### Examples  

**Example 1:**  
Input: `s = "111000"`  
Output: `2`  
Explanation: You can shift twice to get "100011". Flipping the 3ʳᵈ and 6ᵗʰ chars ("0"→"1", "1"→"0") gives "101010", which is alternating.

**Example 2:**  
Input: `s = "010"`  
Output: `0`  
Explanation: Already alternating, no flips needed.

**Example 3:**  
Input: `s = "1110"`  
Output: `1`  
Explanation: Flip the 2ⁿᵈ char to get "1010", which is alternating.

---

### Thought Process (as if you’re the interviewee)  

- **Brute-Force Idea:**  
  Try every possible cyclic shift. For each one, count flips needed to make it alternating (for both possible patterns), and choose the minimum. This is O(n²): n shifts × n comparisons per shift.

- **Optimizing:**  
  Notice that cycling and alternation are closely related. By concatenating the string to itself (s + s), all cyclic shifts become visible as fixed-length windows.  
  Now, for each window of length n, check flips to make it match alternating patterns.  
  Since checking flips for both '0101...' and '1010...' patterns is O(1) per character, this can be optimized to O(n).  

- **Sliding Window:**  
  Build two target strings (length 2n):  
    - pattern1: "0101...",  
    - pattern2: "1010...".  
  Use sliding window of length n. For each window, compare with both patterns and count mismatches.  
  Keep the minimum flip count found.

- **Why this approach:**  
  Efficient, avoids repeated work, and scales nicely for large inputs. Sliding window gives O(n), which is optimal for single-pass scan.

---

### Corner cases to consider  
- Empty string (n = 0)  
- String already alternating  
- All chars are '0's or all are '1's  
- Two chars, same or different  
- Strings where any flip would overdo (e.g., "101010...", perfect case)  
- Input at upper bounds (long strings)

---

### Solution

```python
def minFlips(s: str) -> int:
    n = len(s)
    # Build two alternating target patterns of length 2n
    pattern1 = []
    pattern2 = []
    for i in range(2 * n):
        pattern1.append(str(i % 2))     # "0101..."
        pattern2.append(str((i + 1) % 2)) # "1010..."
    pattern1 = ''.join(pattern1)
    pattern2 = ''.join(pattern2)
    
    # Concatenate s to itself so all rotations fit as substrings
    ss = s + s
    min_flips = n
    
    diff1 = diff2 = 0  # Number of mismatches in current window
    left = 0
    for right in range(2 * n):
        # Compare current char to both alternating patterns
        if ss[right] != pattern1[right]:
            diff1 += 1
        if ss[right] != pattern2[right]:
            diff2 += 1
            
        # When window size exceeds n, slide it
        if right - left + 1 > n:
            if ss[left] != pattern1[left]:
                diff1 -= 1
            if ss[left] != pattern2[left]:
                diff2 -= 1
            left += 1
            
        # If our window is exactly n
        if right - left + 1 == n:
            min_flips = min(min_flips, diff1, diff2)
    return min_flips
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - 2n steps for sliding window, all operations in loop are O(1).
- **Space Complexity:** O(n)  
  - For holding the two alternating patterns of length 2n, plus temporary variables.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can be arbitrarily large (cannot fit in memory)?
  *Hint: Can you process the string in small streaming windows?*

- What if only one type of operation (no cyclic shift) is allowed?
  *Hint: Only need to compare original string to the two alternating patterns.*

- Can you do it in-place with O(1) extra space?
  *Hint: Try to use logic without allocating extra arrays—work with character comparisons only.*

---

### Summary

This problem uses the **sliding window** technique over a duplicated string, cleverly handling all cyclic shift possibilities in O(n) time. The alternating bit patterns form the check for flips, and the minimum among all possible windows is the answer. The same pattern applies to many cyclic and pattern-matching problems, e.g., finding minimum changes to achieve a repeated pattern within a string.


### Flashcard
Concatenate the string with itself to efficiently check cyclic shifts for alternation.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Operations to Make the Array Alternating(minimum-operations-to-make-the-array-alternating) (Medium)