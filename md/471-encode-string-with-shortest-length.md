### Leetcode 471 (Hard): Encode String with Shortest Length [Practice](https://leetcode.com/problems/encode-string-with-shortest-length)

### Description  
Given a **non-empty string** consisting only of lowercase English letters, encode it so that the encoded string has the **shortest possible length**.  
The encoding rule is:  
**k[encoded_string]**, where **encoded_string** inside the square brackets appears exactly **k** times in a row.  
- Only encode if it makes the string shorter.
- If several shortest encodings are possible, return any.

### Examples  

**Example 1:**  
Input: `aaa`  
Output: `aaa`  
*Explanation: Encoding ("3[a]") is not shorter than original, so return as is.*

**Example 2:**  
Input: `aaaaa`  
Output: `5[a]`  
*Explanation: "aaaaa" can be represented as five consecutive 'a's, so "5[a]" is valid and shorter.*

**Example 3:**  
Input: `aaaaaaaaaa`  
Output: `10[a]`  
*Explanation: There are multiple valid ways to encode: "10[a]", or "a9[a]", or "9[a]a". All are length 5, all are valid shortest encodings.*

**Example 4:**  
Input: `aabcaabcd`  
Output: `2[aabc]d`  
*Explanation: "aabc" appears twice, so can be represented as "2[aabc]d".*

**Example 5:**  
Input: `abbbabbbcabbbabbbc`  
Output: `2[2[abbb]c]`  
*Explanation: "abbbabbbc" appears twice; inside it, "abbb" appears twice before 'c'.*

### Thought Process (as if you’re the interviewee)  

Start with brute-force:  
- Try all possible ways to encode each substring, check all split points, and all possible repeat patterns.  
- For each substring s[i:j+1], see if there's a shorter way to encode by splitting into left/right, or by replacing it with repeat encoded forms.  

Optimization:  
- Use **dynamic programming**:  
  - Let dp[i][j] store the shortest encoding of s[i:j+1].  
  - For each dp[i][j], check all possible splits (dp[i][k] + dp[k+1][j]) and all possible repeat patterns.  
- For repeats: for a given substring s[i:j+1], check all possible repeat units and how many times the unit fits the entire substring.  
- If an encoding "k[encoded_str]" is strictly shorter, update dp[i][j].

Trade-offs:
- Time is spent on every substring and its splits, but s.length ≤ 150, so O(n³) is feasible.

### Corner cases to consider  
- Single character string: Output should be unchanged.
- No repeats at all: Entire string remains unchanged.
- Very long repeats: Optimal encoding may require nested repeats.
- Multiple ways to encode with same minimum length.

### Solution

```python
def encode(s: str) -> str:
    n = len(s)
    dp = [ [ "" for _ in range(n) ] for _ in range(n) ]
    
    # Initialize: single character substrings
    for l in range(n):
        dp[l][l] = s[l]
        
    # length: size of substring (from 2 to n)
    for size in range(2, n+1):
        for start in range(n - size + 1):
            end = start + size - 1
            sub = s[start:end+1]
            dp[start][end] = sub  # Start with uncompressed form
            
            # Try all splits
            for k in range(start, end):
                left = dp[start][k]
                right = dp[k+1][end]
                if len(left) + len(right) < len(dp[start][end]):
                    dp[start][end] = left + right
            
            # Try all repeating patterns within sub
            for l in range(1, size // 2 + 1):  # Length of repeat unit
                if size % l == 0:
                    repeats = size // l
                    unit = sub[:l]
                    if unit * repeats == sub:
                        encoded = f"{repeats}[{dp[start][start+l-1]}]"
                        if len(encoded) < len(dp[start][end]):
                            dp[start][end] = encoded
                    
    return dp[0][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), where n = len(s).  
   - For all O(n²) substrings, for each we check up to O(n) splits and possible repeat units.
- **Space Complexity:** O(n²) for the dp table.  
   - Each dp[i][j] stores a (short) string; total O(n²) entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input can contain other characters?  
  *Hint: Look for valid repeat patterns by matching substring, regardless of symbol.*

- How could you optimize for very large n (>1000)?  
  *Hint: Suffix trees or hashing to quickly verify substring repeat patterns.*

- Can you reconstruct the shortest encoding in lexicographic order if multiple encodings are shortest?  
  *Hint: Track options, and choose the lex smallest one.*

### Summary
This problem uses the **DP on substrings** pattern, where we build shortest solutions for all substrings and merge them for the full string. It's a classic optimal substructure/overlapping subproblem scenario, commonly seen in parsing, palindrome, and optimal segmenting problems.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Decode String(decode-string) (Medium)
- Number of Atoms(number-of-atoms) (Hard)