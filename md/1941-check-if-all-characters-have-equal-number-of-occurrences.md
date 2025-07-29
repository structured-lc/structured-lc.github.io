### Leetcode 1941 (Easy): Check if All Characters Have Equal Number of Occurrences [Practice](https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences)

### Description  
Given a string s, check if it is **"good"**.  
A string is considered good if **every character that appears in the string occurs the same number of times**.  
Your function should return True if the string is good, False otherwise.  
For example, `'aabb'` is good (both 'a' and 'b' appear 2 times), but `'aabc'` is not good (counts: 'a':2, 'b':1, 'c':1).

### Examples  

**Example 1:**  
Input: `s = "abacbc"`  
Output: `True`  
*Explanation: 'a', 'b', and 'c' all occur 2 times in s (counts: {'a':2, 'b':2, 'c':2}).*

**Example 2:**  
Input: `s = "aaabb"`  
Output: `False`  
*Explanation: 'a' occurs 3 times, 'b' occurs 2 times. Not all characters have the same count.*

**Example 3:**  
Input: `s = "a"`  
Output: `True`  
*Explanation: Only one character, so all counts are equal (counts: {'a':1}).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Count occurrences of every character, then check if all counts are the same by comparing them one by one.

- **Optimized approach:**  
  Keep a frequency array (size 26 for lowercase English letters), count each character.
  After gathering counts, compare the nonzero frequencies:
    - If all nonzero counts are equal, then string is good.
    - Otherwise, it's not good.

- **Why this approach:**  
  The whole algorithm is linear, just two passes over the string and count array.
  Can't really improve upon this, since we have to see every character at least once.
  Space is O(1) since number of possible lowercase letters is fixed (26).

### Corner cases to consider  
- Only one character (e.g., `"z"`)
- All characters different (e.g., `"abcde"`)
- All characters the same (e.g., `"aaaaa"`)
- Input with two or more characters but unequal frequencies (e.g., `"aabbcccc"`)
- Input containing all but one possible character `"abcdefghijklmnopqrstuvwxy"`  
- String length 1 (smallest valid input)
- Maximum length input (1000 chars, all counts equal or not)

### Solution

```python
def areOccurrencesEqual(s):
    # Create a frequency array for 26 lowercase letters
    counts = [0] * 26
    
    # Count each character's occurrences
    for char in s:
        idx = ord(char) - ord('a')
        counts[idx] += 1

    # Find the target count: the first nonzero count
    target = None
    for freq in counts:
        if freq > 0:
            if target is None:
                target = freq
            elif freq != target:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s.  
    - One pass to count, another pass (fixed 26) to check all frequencies.

- **Space Complexity:** O(1)
    - The size of the frequency array is fixed at 26, regardless of input size. No extra data structures that scale with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input required case-insensitive comparison?  
  *Hint: Convert all characters to the same case before counting.*

- What if the string contains non-English letters or unicode?  
  *Hint: You can't use a fixed array; try a dictionary/map instead.*

- How would you solve the problem without any additional memory, if the input could be modified?  
  *Hint: Sort the string in-place, then scan for runs of identical characters to compare lengths.*

### Summary
This problem is a classic use-case for **counting** and **frequency arrays** (or hashmaps when the domain is not fixed).  
It uses the pattern of scanning input for counts, then comparing those counts for some property (equality in this case).  
The general approach is common and can be applied in tasks like checking anagrams, grouping, or other frequency-based string problems.