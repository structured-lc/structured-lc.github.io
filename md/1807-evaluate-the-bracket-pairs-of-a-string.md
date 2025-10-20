### Leetcode 1807 (Medium): Evaluate the Bracket Pairs of a String [Practice](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string)

### Description  
Given a string containing substrings in round brackets (like `"hi(name), age(age)"`) and a list of key-value pairs (knowledge base), **replace each bracketed key with its value** from the knowledge array.  
If a key is not present in the knowledge base, replace it with `"?"`. Each key is unique, there are no nested brackets, and the brackets always contain non-empty keys.

### Examples  

**Example 1:**  
Input: `s = "(name)is(age)yearsold", knowledge = [["name","Alice"],["age","12"]]`  
Output: `"Aliceis12yearsold"`  
*Explanation: "name" in the bracket gets replaced with "Alice", and "age" with "12".*

**Example 2:**  
Input: `s = "hello(world)", knowledge = [["world","earth"]]`  
Output: `"helloearth"`  
*Explanation: "world" is replaced with "earth".*

**Example 3:**  
Input: `s = "hi(name)", knowledge = [["a","b"]]`  
Output: `"hi?"`  
*Explanation: There is no "name" key in knowledge, so it is replaced by "?".*

### Thought Process (as if you’re the interviewee)  
To solve this, I’d start by turning the knowledge list into a dictionary for O(1) lookup.  
Then, I’d walk through the input string character-by-character, building the output.  
- On encountering `'('`, I’d capture characters until the next `')'` to extract the key, then replace it with the dictionary value or a `"?"` if the key does not exist.  
- For all other characters, just add them to the output as is.

This can be done efficiently in one linear scan, since there’s at most one value per key and the brackets never nest.

**Why not use regex?** This is easy to do by hand and interviewers sometimes prefer explicit control logic over regex, and it makes it easier to handle tricky cases.

**Trade-offs:**  
- Hash table gives fast lookup.
- Linear pass over the string keeps things simple and efficient.

### Corner cases to consider  
- Key in s is not in knowledge → should turn into `"?"`.
- Brackets at the very start or end.
- Multiple consecutive brackets: `"x(a)(b)(c)"`.
- Knowledge contains unused keys.
- No brackets at all in s.
- s is empty (return empty string).
- knowledge is empty (replace all with "?").
- Brackets with empty keys (problem states keys are non-empty, so we don’t have to worry).

### Solution

```python
def evaluate(s, knowledge):
    # Step 1: Build a dictionary for fast key lookup
    lookup = {}
    for key, value in knowledge:
        lookup[key] = value

    # Step 2: Create result array for better performance than string concat
    res = []
    i = 0
    while i < len(s):
        if s[i] == '(':
            # Find the closing bracket
            j = i + 1
            key_chars = []
            while j < len(s) and s[j] != ')':
                key_chars.append(s[j])
                j += 1
            key = ''.join(key_chars)
            # Replace with map value or '?'
            res.append(lookup.get(key, '?'))
            i = j + 1  # Move past ')'
        else:
            res.append(s[i])
            i += 1

    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k),  
  where n = len(s), k = number of items in knowledge.  
  Each character in s is scanned once, and all key lookups are O(1).
- **Space Complexity:** O(n + k),  
  for the lookup dictionary (O(k)) and result string (O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if keys could be repeated, with each bracket using the last value for that key seen so far?
  *Hint: Needs to support dynamic or streaming updates of knowledge.*

- What if the brackets could be nested?
  *Hint: Requires stack to parse nested levels, as with standard parenthesis validation.*

- How does your code handle malformed strings or missing brackets?
  *Hint: You might need stricter validation if s can be badly formed.*

### Summary
This approach is a classic **parsing and dictionary lookup** pattern:  
- Build a hash table for keys.
- Scan string and substitute efficiently.
This pattern is common in problems involving template replacement, basic parsing, and processing structured placeholders (e.g., HTML tags, variable interpolation). The problem tests comfortable hash map/data structure use and simple string parsing.


### Flashcard
Build dictionary from knowledge pairs; scan string extracting keys between parentheses, replace with dict lookup or "?" if missing.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Apply Substitutions(apply-substitutions) (Medium)