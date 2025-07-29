### Leetcode 318 (Medium): Maximum Product of Word Lengths [Practice](https://leetcode.com/problems/maximum-product-of-word-lengths)

### Description  
Given a list of strings, find the largest product you can get by multiplying the lengths of any two words from the list, **but** the chosen words must not share any common letters. For example, “abc” and “def” can be paired because they have no letters in common, but “abc” and “bcd” cannot.

### Examples  

**Example 1:**  
Input: `["abcw","baz","foo","bar","xtfn","abcdef"]`  
Output: `16`  
*Explanation: The pair "abcw" (length 4) and "xtfn" (length 4) have no letters in common. 4 × 4 = 16. No larger product exists.*

**Example 2:**  
Input: `["a","ab","abc","d","cd","bcd","abcd"]`  
Output: `4`  
*Explanation: The pair "ab" (length 2) and "cd" (length 2) have no letters in common. 2 × 2 = 4. There’s no pair with a bigger product and no common letters.*

**Example 3:**  
Input: `["a","aa","aaa","aaaa"]`  
Output: `0`  
*Explanation: Every pair of words uses the letter 'a', so there’s no valid pair; the answer is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible pair of words (for all 0 ≤ i < j < n), and for each pair, check if they have a common letter (for example, by using a set for each word). If not, calculate the product of their lengths and track the maximum.  
  - This is O(n²) pairs, and set-based comparison for each pair costs O(L), where L is average word length. This is fine for small inputs but not efficient for large word lists.
- **Optimize:**  
  Notice that we can represent each word’s unique set of letters as a bitmask (an integer where the 0-25ᵗʰ bits represent if ‘a’-‘z’ is present). Once every word has a mask, to check if two words share a letter, just check if `mask1 & mask2 == 0` (no common letters).  
  With this, for all n² pairs, bitwise comparison is O(1). The initial bitmasks cost O(n × L), which is fast. Track and update the maximum product while looping.
- **Final approach:**  
  Use bitmasks and nested loops (for each word, for each following word), compare their masks, and update the result as we go.  
  This keeps the code simple, exploits bit operations for quick comparison, and is efficient even for larger inputs.

### Corner cases to consider  
- Empty input list → output should be 0.
- All words containing the same letter → output should be 0.
- Only one word in the array → no pairs possible, so output is 0.
- Words with varying lengths and overlaps, or repeated words.
- Large word arrays with duplicate words, or words differing only by one letter.

### Solution

```python
from typing import List

def max_product(words: List[str]) -> int:
    n = len(words)
    # Precompute bitmask for each word
    masks = [0] * n
    for i, word in enumerate(words):
        for ch in word:
            masks[i] |= 1 << (ord(ch) - ord('a'))
    max_product = 0
    # Compare all pairs using bitwise AND for mask comparison
    for i in range(n - 1):
        for j in range(i + 1, n):
            if masks[i] & masks[j] == 0:
                product = len(words[i]) * len(words[j])
                if product > max_product:
                    max_product = product
    return max_product
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² + n×L)  
  - O(n×L) to create the bitmask for each of n words (L = average length).
  - O(n²) for checking every pair, with O(1) comparison using bitmasks.
- **Space Complexity:** O(n)  
  - O(n) for storing the bitmask per word. Input itself is not copied.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the words are extremely long or there are Unicode characters outside 'a'-'z'?  
  *Hint: How would you expand the bitmask to support other alphabets or a larger character set?*

- How would you improve this if the input list contains tens of thousands of words, many of which are nearly identical?  
  *Hint: Could you optimize by grouping or compressing data?*

- Can you return one pair of the actual words too, not just the product?  
  *Hint: Change what you track during max calculation.*

### Summary
We used **bitmasking** to efficiently represent sets of characters, allowing O(1) comparison for character overlap and reducing a seemingly slow O(n² × L) algorithm to a practical O(n²) solution. This **bitmasking pattern** is widely used for problems involving “set overlap” between objects and also appears in problems like "maximum number of non-overlapping sets", "counting pairs without common features", etc. The solution is concise and well-suited for large input sizes, as long as the character set is limited.