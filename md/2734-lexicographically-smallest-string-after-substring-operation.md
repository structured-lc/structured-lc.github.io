### Leetcode 2734 (Medium): Lexicographically Smallest String After Substring Operation [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation)

### Description  
Given a string of lowercase English letters, you can choose any non-empty substring and decrease each letter in that substring by one in the alphabet (with 'a' becoming 'z'). Your task is to apply **exactly one** such operation to make the string lexicographically smallest possible. Return the resulting string.

### Examples  

**Example 1:**  
Input: `cbabc`  
Output: `baabc`  
*Explanation: Choose the substring "cb" (indices 0 to 1), change 'c' → 'b', 'b' → 'a'. The string becomes "baabc", which is the lex smallest possible after one substring operation.*

**Example 2:**  
Input: `aa`  
Output: `az`  
*Explanation: String is all 'a'. The only option is to select at least one character (say, the last). Decrementing 'a' wraps to 'z'.*

**Example 3:**  
Input: `acbbc`  
Output: `abaab`  
*Explanation: Choose the substring "cbbc" (indices 1 to 4), decrement each: 'c' → 'b', 'b' → 'a', 'b' → 'a', 'c' → 'b'. Final is "abaab".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible substrings, apply the operation, and select the smallest of all results.  
  - Not viable. Time complexity is O(n³): O(n²) substrings, and O(n) to process each.  
- **Optimization:**  
  - The lex smallest string is always achieved by getting as many left-characters as small as possible.
  - Ignore leading 'a's since decrementing 'a' gives 'z', making it worse.
  - Find the **first non-'a'** character (call the index `i`).  
  - Keep decrementing subsequent characters as long as they are not 'a' (because 'b' → 'a' is good, but 'a' → 'z' is bad).
  - The substring to operate on: from index `i` to just before the next 'a' or end of string.
  - Special case: If all characters are 'a', change the last one to 'z' as required by the problem.

**Tradeoff:**  
Efficient, with just O(n) operations and no extra space apart from string manipulation.

### Corner cases to consider  
- All characters are 'a', e.g. `"aaaa"`
- String of length 1, e.g. `"a"`, `"b"`
- No 'a' at all, e.g. `"bbb"`
- Only the last character is non-'a', e.g. `"aaab"`
- Single 'a' in the middle, e.g. `"baab"`
- Very large string to test performance.

### Solution

```python
def smallestString(s: str) -> str:
    # Convert string to list for easy mutation
    chars = list(s)
    n = len(chars)
    i = 0

    # Skip leading 'a's, as changing them gives 'z' (worse)
    while i < n and chars[i] == 'a':
        i += 1

    # If all were 'a', change last character to 'z'
    if i == n:
        chars[-1] = 'z'
        return ''.join(chars)

    # Decrement all non-'a' chars starting from i until we hit 'a' or end
    while i < n and chars[i] != 'a':
        chars[i] = chr(ord(chars[i]) - 1) if chars[i] != 'a' else 'z'
        i += 1

    return ''.join(chars)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  - At most one traversal: once to find the start, and once to update substring.
- **Space Complexity:** O(n) for making a copy of the string as a character array (input is read-only).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could perform the operation **any number of times**?
  *Hint: Greedily minimize each time; consider when repeating gives additional gains.*

- What if some indices are not allowed to be modified?
  *Hint: Track their locations and adjust scanning technique.*

- How would you extend this for uppercase characters or user-defined wrap-around?
  *Hint: Generalize character decrement and alphabet range calculation.*

### Summary
This problem uses a **greedy scan and modify** pattern: modify the smallest possible prefix starting with the first non-'a' character to achieve the minimum lexicographic string after one operation. It's a classic example of minimizing string lexicographically with a single substring transformation, a paradigm seen in similar greedy optimization and substring-manipulation patterns in string algorithms.


### Flashcard
To get lex smallest string, find the first non-'a', decrement it and all following chars until another 'a' or end.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Shifting Letters(shifting-letters) (Medium)
- Lexicographically Smallest String After Applying Operations(lexicographically-smallest-string-after-applying-operations) (Medium)
- Lexicographically Smallest String After Operations With Constraint(lexicographically-smallest-string-after-operations-with-constraint) (Medium)
- Replace Question Marks in String to Minimize Its Value(replace-question-marks-in-string-to-minimize-its-value) (Medium)