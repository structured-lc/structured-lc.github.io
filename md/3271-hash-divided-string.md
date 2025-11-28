### Leetcode 3271 (Medium): Hash Divided String [Practice](https://leetcode.com/problems/hash-divided-string)


### Description  
You are given a string `s` of lowercase English letters with length `n`, and an integer `k` such that `n` is a multiple of `k`.  
Divide `s` into consecutive substrings of length `k`. For each substring, compute the sum of the letter positions in the alphabet (where 'a'=0, 'b'=1, ..., 'z'=25), then take that sum modulo 26, and convert it back to a lowercase letter. Concatenate the resulting letters to form the hashed string.  
Return the hashed string.


### Examples  

**Example 1:**  
Input: `s = "abcdefgh", k = 2`  
Output: `"bdfh"`  
*Explanation: Divide `"abcdefgh"` into substrings: "ab", "cd", "ef", "gh".  
- "ab": 0+1=1 → 1%26=1 → 'b'  
- "cd": 2+3=5 → 5%26=5 → 'f'  
- "ef": 4+5=9 → 9%26=9 → 'j'  
- "gh": 6+7=13 → 13%26=13 → 'n'  
So the result is "bfjn".*

**Example 2:**  
Input: `s = "zzzz", k = 2`  
Output: `"x"`  
*Explanation: Substrings: "zz", "zz".  
- "zz": 25+25=50 → 50%26=24 → 'y'  
So output is "yy".*

**Example 3:**  
Input: `s = "abcabc", k = 3`  
Output: `"f"`  
*Explanation: Substrings: "abc", "abc".  
Both give 0+1+2=3 → 3%26=3 → 'd'. Return "dd".*


### Thought Process (as if you’re the interviewee)  
Start by considering the brute force approach:
- Break the string `s` into n//k substrings of length `k`.
- For each substring:
   - Calculate the alphabet index of each character.
   - Sum the indices, take the modulo 26.
   - Convert back to a character.
- Append to result.

Optimization:  
- The problem is inherently O(n), as we must visit each character once.  
- There isn't a clean way to further speed this up as every character affects the hash in its group.
- The approach is simple, clear, and optimal for this problem.

Trade-offs:  
- Uses O(n) to store the output string.
- Only basic arithmetic and string manipulation are needed.


### Corner cases to consider  
- `s` is an empty string (`k` must also be 0, usually not allowed).
- All characters in a substring are the same.
- Substrings sum to a multiple of 26 (output should be 'a').
- Maximum possible value of `n` and `k` for performance.
- `k == 1` (every character handled as its own group, so output string should match input).
- Non-contiguous substrings (not possible with problem constraints, but good to confirm award robustness).
- Mixed low/high-end letters in substrings, e.g. "azazaz".


### Solution

```python
def stringHash(s: str, k: int) -> str:
    # Result string to build final output
    res = []
    # Process every substring of length k
    for i in range(0, len(s), k):
        chunk = s[i: i + k]
        # Calculate sum of position in alphabet for the chunk
        hash_sum = 0
        for ch in chunk:
            hash_sum += ord(ch) - ord('a')  # 'a'=0, ..., 'z'=25
        # modulo 26 and convert to result character
        hashed_char = chr(ord('a') + (hash_sum % 26))
        res.append(hashed_char)
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `s`; every character is processed once.
- **Space Complexity:** O(n/k), for storing the result string of length n/k (can be O(n) in worst case for large n, but typically small compared to input).


### Potential follow-up questions (as if you’re the interviewer)  

- What if character case is mixed (lower + upper)?
  *Hint: You'll need to normalize to lowercase/alphabet index.*
- How would you extend the function to support Unicode characters?
  *Hint: Coordinate on how to hash non-ASCII/extended alphabet.*
- How would you compute the reverse: given result and k, list all possible original strings?
  *Hint: This may not have unique solutions, think of pre-image sets for modulo arithmetic.*


### Summary
The problem follows a simulation/string-grouping pattern: break string into equal chunks, perform a fixed calculation per group, and aggregate the result.  
The pattern is common for rolling hash, block-wise string operations, modular arithmetic in strings, and is a useful building block in string hashing, cryptography basics, and grouped feature extraction in machine learning workflows.


### Flashcard
Split string into chunks of size k, sum alphabet indices (a=1, b=2, ..., z=26) for each chunk modulo 26, convert back to character.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
