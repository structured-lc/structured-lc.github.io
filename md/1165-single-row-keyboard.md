### Leetcode 1165 (Easy): Single-Row Keyboard [Practice](https://leetcode.com/problems/single-row-keyboard)

### Description  
Given a string representing a unique keyboard layout (all lowercase a–z in some order, length 26), and a string `word`, calculate the total time it takes to type `word` using one finger starting at position 0.  
Each move is the absolute distance between the current and target key’s index on the keyboard.  
Return the sum of these distances for the whole word.

### Examples  

**Example 1:**  
Input: `keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba"`  
Output: `4`  
*Explanation: Start at index 0. 'c' is at 2 (move 2), 'b' is at 1 (move 1), 'a' is at 0 (move 1). Total = 2 + 1 + 1 = 4.*

**Example 2:**  
Input: `keyboard = "pqrstuvwxyzabcdefghijklmno", word = "leetcode"`  
Output: `73`  
*Explanation: For each letter in "leetcode", move finger to the correct position on the keyboard, summing all step distances. The total is 73.*

**Example 3:**  
Input: `keyboard = "abcdefghijklmnopqrstuvwxyz", word = "a"`  
Output: `0`  
*Explanation: 'a' is already at position 0. No need to move.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every character in `word`, find its index in `keyboard` using `.index()`. But this is O(n·26), which is slow if `word` is long.
- **Optimization:** Preprocess the keyboard into a mapping from character to its index. Then, for each character in the word, look up its position in O(1), and sum up `abs(current_index - next_char_index)`.
- **Why final approach:** Pre-processing (mapping) is a common optimization for problems like this, vastly reducing time per character. All moves are independent and order is fixed, so summing the distances is sufficient.

### Corner cases to consider  
- `word` only a single character (should return 0)
- `keyboard` is reverse ordered, forcing maximum moves
- Repeated letters in `word`
- Large input (long word, but constraints guarantee `keyboard` is correct and 26 characters)

### Solution

```python
def calculateTime(keyboard: str, word: str) -> int:
    # Step 1: Build character-to-index mapping
    char_pos = {}
    for idx, ch in enumerate(keyboard):
        char_pos[ch] = idx

    # Step 2: Start at position 0
    current_idx = 0
    total = 0

    # Step 3: For each char in word, add move distance, update current_idx
    for ch in word:
        next_idx = char_pos[ch]
        total += abs(current_idx - next_idx)
        current_idx = next_idx

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of `word`. 
  - Mapping creation: O(26) = O(1)
  - For each char in `word`: O(1) lookup, O(1) math, so O(n) overall.
- **Space Complexity:** O(1).
  - Mapping needs 26 entries, not dependent on input size. No recursion, only small fixed extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the keyboard is not always length 26 (some letters missing or extra)?
  *Hint: Can you generalize your mapping? Check for missing keys and handle invalid cases.*

- What if the query is repeated for multiple different words on the same keyboard?
  *Hint: Is the mapping reusable? How can you optimize multiple queries?*

- How would you solve if the keyboard is circular (moving from last index to 0 is distance 1)?
  *Hint: Use modulo math, compute both clockwise and counter-clockwise distance, take minimum.*

### Summary
This problem uses **hash mapping** for fast character index lookups and iteratively sums per-step distances—an example of preprocessing for fast repeated queries.  
The pattern of “pre-map for O(1) lookups, then scan input” is common in string, counting, or simulation problems.  
No complex data structures required, only careful mapping and accumulation.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
