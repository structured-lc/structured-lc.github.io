### Leetcode 2075 (Medium): Decode the Slanted Ciphertext [Practice](https://leetcode.com/problems/decode-the-slanted-ciphertext)

### Description  
Given a string `encodedText` that was produced by writing the `originalText` in a matrix with a given number of rows, filling it in a "slanted" way (top-left to bottom-right diagonals) and then reading row by row, reconstruct the original text.  
- The original matrix is filled: each character of `originalText` placed at matrix[i][j] if i + j × rows < n where n is the length of originalText.
- The matrix has `rows` rows and just enough columns so the rightmost column is not empty.
- Empty spaces (at the bottom right) are filled with spaces.
- The encoding: traverse the matrix row by row (left to right, top to bottom), concatenate to get `encodedText`.
- **Task:** Given `encodedText` and `rows`, reconstruct and return the original text (trailing spaces removed).

### Examples  

**Example 1:**  
Input: encodedText = "ch   ie   pr", rows = 3  
Output: "cipher"  
*Explanation:*
- Matrix (3 rows, 4 columns) is:
  ```
  c h  
   i e
     p r
  ```
- Read diagonally: c -> i -> p -> h -> e -> r → "cipher"

**Example 2:**  
Input: encodedText = "iveo    eed   lte   olc", rows = 4  
Output: "i love leetcode"  
*Explanation:*
- 4 rows, columns = 20 // 4 = 5
- Matrix:
  ```
  i v e o   (i)
  e e d     (l)
  t e   l   (o)
  o l c     (v)
  ```
- Diagonal walks spell: i -> l -> o -> v -> e ->  ... → "i love leetcode"

**Example 3:**  
Input: encodedText = "coding", rows = 1  
Output: "coding"  
*Explanation:*
- 1 row, thus original text is same as encoded.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  1. Reconstruct the matrix by writing the encodedText row-wise; calculate columns = n // rows.
  2. Decode by collecting characters along all slanted diagonals. For each column, walk down-right (i = 0, j = col; i++, j++).
  3. Collect these characters in order, concatenate.
- **Optimizations:**  
  - No need to actually create the full matrix: can index into encodedText directly since position = i * cols + j.
  - Remove trailing spaces from final result, since originalText can't have trailing spaces.
- **Why this approach?**  
  - Direct simulation is clear, easy to implement, and avoids unneeded computation or space.

### Corner cases to consider  
- `rows = 1` (encodedText is the original text)
- Trailing spaces in the encodedText (must be ignored)
- Empty strings (encodedText = "")
- Unusual spacing: text with multiple spaces or all spaces at the end
- `rows` larger than length of text (matrix degenerate)
- All characters are spaces

### Solution

```python
def decodeCiphertext(encodedText: str, rows: int) -> str:
    n = len(encodedText)
    if rows == 1:
        # If only 1 row, original text is equal to encodedText (strip trailing spaces)
        return encodedText.rstrip()
    
    cols = n // rows
    # Build answer by traversing all slanted diagonals
    ans = []
    for col in range(cols):
        i, j = 0, col
        while i < rows and j < cols:
            idx = i * cols + j
            ans.append(encodedText[idx])
            i += 1
            j += 1
    # Remove trailing spaces (original text has no trailing spaces)
    return ''.join(ans).rstrip()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = rows, n = cols (m × n = encodedText length). Visiting each character in the slanted walk once. The outer loop runs cols times, the inner while loop at most rows times.
- **Space Complexity:** O(n), where n is the length of encodedText. Need O(n) for the result list and (if built) for the temporary matrix if simulated.

### Potential follow-up questions (as if you’re the interviewer)  

- **How would you handle a case where originalText could have trailing spaces?**  
  *Hint: Consider whether trimming is necessary, or how you could distinguish original versus padding spaces.*

- **Can this approach be generalized to other filling/reading orders (e.g., zigzag, spiral)?**  
  *Hint: How would indexing change for spiral or alternate zigzags?*

- **What if encodedText length is not divisible by rows?**  
  *Hint: How would the padding and matrix shape need to be adjusted, and how would you handle the remaining characters?*

### Summary
This problem is a classic **matrix simulation** and **string traversal** pattern, commonly encountered in grid-based encoding/decoding, and diagonal or pattern-based reconstruction questions (e.g., Zigzag Conversion, Spiral Matrix). The main skills are converting between flat-indexed strings and 2D simulated traversals, and properly handling corner cases like trailing spaces and varying dimensions.


### Flashcard
For each column in the matrix, traverse diagonally down-right, collecting characters at positions i × cols + j, and trim trailing spaces from the result.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
- Diagonal Traverse(diagonal-traverse) (Medium)