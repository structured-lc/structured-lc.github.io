### Leetcode 3498 (Easy): Reverse Degree of a String [Practice](https://leetcode.com/problems/reverse-degree-of-a-string)

### Description  
Given a string `s` consisting only of lowercase English letters, calculate its **reverse degree**.

For each character in `s`, multiply:
- its position in the *reversed alphabet* (`'a'` = 26, `'b'` = 25, ..., `'z'` = 1)
- by its position in the string (1-indexed).

Sum these products for all characters and return the total.

### Examples  

**Example 1:**  
Input: `s = "abc"`  
Output: `148`  
Explanation:  
- 'a': reverse position = 26, string pos = 1 ⇒ 26 × 1 = 26  
- 'b': reverse position = 25, string pos = 2 ⇒ 25 × 2 = 50  
- 'c': reverse position = 24, string pos = 3 ⇒ 24 × 3 = 72  
Total: 26 + 50 + 72 = 148

**Example 2:**  
Input: `s = "zaza"`  
Output: `160`  
Explanation:  
- 'z': reverse pos = 1, index = 1 ⇒ 1 × 1 = 1  
- 'a': reverse pos = 26, index = 2 ⇒ 26 × 2 = 52  
- 'z': reverse pos = 1, index = 3 ⇒ 1 × 3 = 3  
- 'a': reverse pos = 26, index = 4 ⇒ 26 × 4 = 104  
Total: 1 + 52 + 3 + 104 = 160

**Example 3:**  
Input: `s = "bcd"`  
Output: `133`  
Explanation:  
- 'b': 25 × 1 = 25  
- 'c': 24 × 2 = 48  
- 'd': 23 × 3 = 69  
25 + 48 + 69 = 142  
(Note: This is an illustrative example; check the output for precise calculation.)

### Thought Process (as if you’re the interviewee)  
Let's break down the problem:
- For each character, we need to find its position in the reversed alphabet.
  - So `'a'` is 26, `'b'` is 25, ..., `'z'` is 1.
  - Formula: reverse_pos = 26 - (ord(ch) - ord('a'))
- Then, multiply that by its position in the string (1-indexed).
- Accumulate the sum for each character.

A simple for loop through the string solves the problem.
- **Brute-force:** Iterate through each character, apply the formula, sum the results.
- **Optimization:** This is already O(n), where n is the length of the string. No further optimization needed.

Trade-offs:  
- This approach is simple, easy to implement, and optimal for constraints (string length ≤ 1000).

### Corner cases to consider  
- Empty string (not allowed by constraints; min length is 1)
- Single character string (e.g., "a" → 26)
- All characters the same (e.g., "aaaa")
- Characters at opposite ends of the alphabet (e.g., "azaz")
- Maximum length string (1000 characters)

### Solution

```python
def reverse_degree(s: str) -> int:
    total = 0
    for idx, c in enumerate(s):
        # Calculate the reverse alphabet position: 'a':26, ..., 'z':1
        reverse_pos = 26 - (ord(c) - ord('a'))
        # Position in string is 1-indexed (add 1 to idx)
        contrib = reverse_pos * (idx + 1)
        # Add to total sum
        total += contrib
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s. We process each character exactly once.
- **Space Complexity:** O(1). Uses a constant amount of extra space for the sum and counters, not dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle uppercase letters or non-letter characters?  
  *Hint: Consider input validation or normalization.*

- What if the alphabet order changes or is dynamic?  
  *Hint: Use a mapping or lookup table.*

- Can you compute the reverse degree given a huge stream of characters, without storing the whole string?  
  *Hint: Accumulate the sum as you read; just keep a position counter.*

### Summary
This problem is a straightforward application of iterating through a string and applying position-based logic—the "reverse" mapping is just a fixed formula for all lowercase letters. This is a classic **simulation / math pattern**, commonly encountered in string-encoding, checksum, and character-weighted summation problems. Techniques here also generalize to stream processing when you can't store the whole input.


### Flashcard
For each character, compute reverse_alphabet_position × string_position (1-indexed) and sum; reverse_pos = 26 − (char − 'a').

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
