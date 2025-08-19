### Leetcode 1147 (Hard): Longest Chunked Palindrome Decomposition [Practice](https://leetcode.com/problems/longest-chunked-palindrome-decomposition)

### Description  
Given a string, split it into the maximum number of non-empty substrings (called "chunks") such that joining the chunks in order forms the original string, and each chunk from the left matches a chunk from the right (i.e. the sequence of chunks is a palindrome at the chunk level, though individual chunks need not themselves be palindromes). Return the largest number of such chunks.

You can only cut between characters; all chunks must use all characters of the original string and cannot overlap. If no chunk pairs match from the outside in, the whole string is one chunk.

### Examples  

**Example 1:**  
Input: `ghiabcdefhelloadamhelloabcdefghi`  
Output: `7`  
Explanation: (ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)  
Chunks from outside in are equal: "ghi" == "ghi", "abcdef" == "abcdef", "hello" == "hello", central "adam" is left.

**Example 2:**  
Input: `merchant`  
Output: `1`  
Explanation: The string cannot be split into matching chunks, so the answer is 1.

**Example 3:**  
Input: `antaprezatepzapreanta`  
Output: `11`  
Explanation: (a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)  
Progressively matching the shortest possible chunks from both sides.

### Thought Process (as if you’re the interviewee)  
- Start by considering brute-force: try all possible partitions, look for matching pairs from outside in. This is not feasible due to exponential possibilities for large strings.  
- Optimize by noticing:  
  - At every recursion/iteration, compare progressively longer prefixes of the left and right—when you find a match, recurse or continue in the middle.  
  - Each successful match adds 2 to the chunk count (1 for each side), then process the middle.  
  - If no match occurs up to the midpoint, the string is a single chunk.  
- The recursive or iterative greedy approach works, matching minimal-length prefix and suffix.  
- Trade-off: String slicing leads to O(n²) time in the worst-case due to repeated string comparisons, but is often efficient enough for interview data constraints.

### Corner cases to consider  
- Empty string (`""`) → 0 chunks expected.
- String of length 1 (`"a"`) → 1 chunk.
- Already palindromic at chunk level or as a whole.
- No matching prefix/suffix: full string is a single chunk.
- Strings with all repeated characters (`"aaaaaa"`).
- Odd/even length splits.

### Solution

```python
def longestDecomposition(text):
    n = len(text)
    if n == 0:
        return 0
    for i in range(1, n // 2 + 1):
        # Compare prefix and suffix of length i
        if text[:i] == text[-i:]:
            # Found a matching chunk pair -> count both sides, recurse for the middle part
            return 2 + longestDecomposition(text[i:-i])
    # No chunks found, whole string is one chunk
    return 1
```
#### Alternate iterative (for larger strings):

```python
def longestDecomposition(text):
    n = len(text)
    l = 0
    count = 0
    for r in range(1, n // 2 + 1):
        if text[l:r] == text[n - r:n - l]:
            count += 2
            l = r  # Move left pointer to new start after the chunk
    if 2 * l < n:
        count += 1  # Middle chunk left
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case due to substring comparisons at each recursion/iteration.
- **Space Complexity:** O(n) for recursion stack in the recursive solution; O(1) for iterative (excluding string storage itself). No extra data structures required.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for very large strings?  
  *Hint: Can you use rolling hash or integer hashing to speed up chunk comparison?*

- Can you return the actual decomposed chunks rather than just the count?  
  *Hint: Store the slices as you go and reconstruct the sequence.*

- How would the approach change if we required the actual substring chunks to be palindromes themselves?  
  *Hint: Then classic palindrome partitioning (DP) is needed instead.*

### Summary
This problem uses a greedy recursive (or iterative) "outside in" decomposition—matching the shortest prefix and suffix at each step. This is a **divide and conquer** pattern, common in palindromic or mirroring string problems, and can be adapted to scenarios where symmetry or repeated chunk pattern matching is needed. Rolling hash would help for further optimization in hashing chunk substrings.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
- Palindrome Rearrangement Queries(palindrome-rearrangement-queries) (Hard)