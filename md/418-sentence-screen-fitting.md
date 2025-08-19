### Leetcode 418 (Medium): Sentence Screen Fitting [Practice](https://leetcode.com/problems/sentence-screen-fitting)

### Description  
Given a screen with `rows` rows and `cols` columns, and a *sentence* (array of words), determine how many times the full sentence can be fit into the screen.  
Rules:
- Words are placed in order and cannot be split.
- Words must be separated by a single space.
- If a word won't fit at the end of a row, move it wholly to the start of the next row.
- The sentence repeats as many times as needed.

Example:  
For `rows = 3`, `cols = 6`, `sentence = ["a", "bcd", "e"]`, the process is like typing left-to-right, wrapping as needed, without splitting words[4][2].  

### Examples  

**Example 1:**  
Input: `rows = 2, cols = 8, sentence = ["hello", "world"]`  
Output: `1`  
Explanation:  
```
hello---
world---
```
Here, the full sentence fits exactly once.

**Example 2:**  
Input: `rows = 3, cols = 6, sentence = ["a", "bcd", "e"]`  
Output: `2`  
Explanation:  
```
a-bcd-
e-a---
bcd-e-
```
The sentence fits 2 times.

**Example 3:**  
Input: `rows = 4, cols = 5, sentence = ["I", "had", "apple", "pie"]`  
Output: `1`  
Explanation:  
```
I-had
apple
pie-I
had--
```
Only 1 complete repetition fits.

### Thought Process (as if you’re the interviewee)  
Start by simulating—try to "type out" the sentence word by word, wrapping as necessary, making sure no word is cut at the end of a row.  
**Brute-force:**  
- For each row, place as many words as possible.
- If the full sentence fits, increment the counter.
- This is easy to code but too slow: time is O(rows × cols).

**Optimization:**  
- Notice that for each row we can keep a pointer or index to the current word.
- Since sentence patterns often repeat, we can precompute how the index advances for each possible starting word.
- Use a string made by joining the sentence with spaces (and a trailing space), then use modular arithmetic to count how many spaces (i.e., sentences) have been passed after filling all rows.  
- This reduces time to O(rows + length_of_sentence_string), much faster for large screens.

Why this works: instead of wrapping row-by-row, we simulate typing across "one long line," then see how much actually fits within given rows/cols.

### Corner cases to consider  
- Words longer than `cols`: answer is always 0 (can't fit on any row)
- Very short sentences, e.g. single-letter, single-word, repetition
- Only one row or one column
- Sentence made of single word repeated
- Ensure not to split words: proper check at each step
- Empty input or rows/cols = 0 (should be handled, though constraints usually prevent)

### Solution

```python
def wordsTyping(sentence, rows, cols):
    # Join the sentence with spaces, add a trailing space so we can wrap naturally
    s = ' '.join(sentence) + ' '
    n = len(s)
    pos = 0  # pointer in the long sentence string

    for _ in range(rows):
        pos += cols  # optimistically skip 'cols' places
        if s[pos % n] == ' ':
            # Landed right at a space, move to next
            pos += 1
        else:
            # Move back to the previous space (so the word isn't split)
            while pos > 0 and s[(pos - 1) % n] != ' ':
                pos -= 1
    # The number of full sentence fits is how many times we passed length n
    return pos // n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(rows + L), where L = total length of the sentence string. Every row advances position by 'cols', then possibly rewinds a few steps, but each rewind just follows along the sentence string, so overall time is dominated by rows.
- **Space Complexity:** O(L), only for the full sentence string storage; constant otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words can be hyphenated (split) to fit across lines?
  *Hint: Would need to track partial word usage.*

- What if the spacing rules change? (e.g., double space between words, or justify text)
  *Hint: Adjust the join/space logic and length calculations.*

- How would you optimize if the number of rows is extremely large (e.g., 10⁹)?
  *Hint: Detect cycles (patterns repeat), use this to skip ahead by blocks.*

### Summary
This approach leverages **cycle detection and modular arithmetic** for fast simulation—common in string wrap/fitting/grid problems. The key is recognizing repeated patterns and precomputing how the pointer advances, a pattern useful in problems such as text editors, dynamic table layout, and periodic grid traversal. This avoids brute-force per-row simulation and scales efficiently for large screens.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Cost to Separate Sentence Into Rows(minimum-cost-to-separate-sentence-into-rows) (Medium)
- Split Message Based on Limit(split-message-based-on-limit) (Hard)