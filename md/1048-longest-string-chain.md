### Leetcode 1048 (Medium): Longest String Chain [Practice](https://leetcode.com/problems/longest-string-chain)

### Description  
You are given a list of words, all made up of lowercase English letters. A word `a` is a **predecessor** of word `b` if you can add exactly one letter anywhere in `a` (without rearranging the existing letters) to get `b`. 
A **string chain** is a sequence of words `[word₁, word₂, ..., wordₖ]` such that each word is a predecessor of the next.  
You need to find the **length of the longest possible string chain** from the given list.

### Examples  

**Example 1:**  
Input: `["a","b","ba","bca","bda","bdca"]`  
Output: `4`  
*Explanation: The longest chain is "a" → "ba" → "bda" → "bdca". Each word adds exactly one letter to form the next.*

**Example 2:**  
Input: `["xbc","pcxbcf","xb","cxbc","pcxbc"]`  
Output: `5`  
*Explanation: The chain is "xb" → "xbc" → "cxbc" → "pcxbc" → "pcxbcf". Every next word can be formed by inserting a single character at any position in the previous word.*

**Example 3:**  
Input: `["abcd","dbqca"]`  
Output: `1`  
*Explanation: No word can be formed from another by inserting exactly one letter, so the longest chain has length 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force** approach: 
  - Consider all possible ways to form chains.
  - For every word, recursively search for all possible predecessor chains. But this is extremely slow due to the exponential number of potential chains.
- **Optimized DP**:
  - **Key observation**: For each word, its predecessor must be another word from the list with exactly one letter removed.
  - **Sort** the words by length.  
  - Use a dictionary `dp` where `dp[word] = length of the longest chain ending at "word"`.
  - For each word, try removing every letter (from position 0 to len-1) and see if the resulting word exists in `dp`. If so, update `dp[word]` as `dp[predecessor] + 1`. If not, start a new chain (length 1).
  - Keep track of the **maximum value** in `dp`.

- **Trade-offs**:
  - Sorting takes O(n log n), checking all possible predecessors for each word of length up to L takes O(L) per word. Total time is O(n × L²), where n is the number of words and L is the maximum word length.

### Corner cases to consider  
- Empty input list.
- All words of length 1 (no possible chains longer than 1).
- Multiple unrelated chains (return the length of the longest).
- Duplicate words (should handle gracefully).
- No chains possible (every word is unique/non-extendable).

### Solution

```python
def longestStrChain(words):
    # Step 1: Sort words by increasing length
    words.sort(key=len)
    
    # Step 2: dp[word] will record the max chain ending at this word
    dp = {}
    max_chain = 1
    
    for word in words:
        dp[word] = 1  # Minimum chain is the word itself
        # Try removing each letter from the word (simulate prev in chain)
        for i in range(len(word)):
            predecessor = word[:i] + word[i+1:]
            if predecessor in dp:
                dp[word] = max(dp[word], dp[predecessor] + 1)
        max_chain = max(max_chain, dp[word])
    return max_chain
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × L²)
  - Sorting words: O(n log n)
  - For each word (n words), try removing each letter (up to L), and each such check/lookup is O(1).
  - Each word: up to L removals × n words = O(n × L)
  - Finally, the slicing and string operations per word remove up to L letters, so O(n × L²) in worst case when considering all base string operations.

- **Space Complexity:**  
  O(n × L)
  - Storing the `dp` dictionary needs one entry per word.
  - No recursion stack, no additional significant data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words could be repeated any number of times in the chain?  
  *Hint: How does this impact chain length and dp?*

- How would your approach change if predecessor required adding exactly TWO letters?  
  *Hint: Instead of removing one, consider all pairs of letter insertions*

- Can you reconstruct the actual sequence of the longest chain, not just its length?  
  *Hint: Track predecessor during dp calculation and backtrack from the word with max chain length*

### Summary
This problem is a classic example of **Dynamic Programming on Strings**, using sorting to ensure bottom-up evaluation by word length and mapping each word to its chain length. The main technique—breaking bigger problems into subproblems by deletion/insertion—is a pattern useful in edit distance problems, and in graph longest path approaches when edges are implicitly defined by string transformations.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
