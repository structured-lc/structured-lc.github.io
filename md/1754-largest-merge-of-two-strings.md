### Leetcode 1754 (Medium): Largest Merge Of Two Strings [Practice](https://leetcode.com/problems/largest-merge-of-two-strings)

### Description  
Given two strings, **word1** and **word2**, build the lexicographically largest string ("merge") possible by repeatedly choosing and appending the first character from either word1 or word2. At each step, remove that character from its source. Continue until both strings are empty. The goal is to determine the largest possible merge string according to lexicographical order.

### Examples  

**Example 1:**  
Input: `word1 = "cabaa", word2 = "bcaaa"`  
Output: `"cbcabaaaaa"`  
*Explanation:  
Pick from word1='c' (larger than word2='b') → merge="c"  
Now: word1="abaa", word2="bcaaa"  
Next, word1='a', word2='b' → 'b' > 'a', so pick from word2 ⇒ merge="cb"  
word1="abaa", word2="caaa"  
Now, word1='a', word2='c' → pick from word2: merge="cbc"  
Continue this way until all characters are used. Final merge="cbcabaaaaa".*

**Example 2:**  
Input: `word1 = "abcabc", word2 = "abdcaba"`  
Output: `"abdcabcabcaba"`  
*Explanation:  
Both start with 'a', tie-breaker is substring comparison: "abcabc" < "abdcaba", so pick from word2 ('a').  
Repeat:  
word1="abcabc", word2="bdcaba" → pick 'b' from word2: merge="ab"  
word1="abcabc", word2="dcaba" → compare "abcabc" vs "dcaba".  
'abcabc' < 'dcaba', so pick 'd' from word2: merge="abd"  
Continue greedily comparing the remaining substrings at each step.*

**Example 3:**  
Input: `word1 = "aaa", word2 = "aaa"`  
Output: `"aaaaaa"`  
*Explanation:  
Both always have same first char 'a' and equal substrings, so always can pick any; the result is all 'a's concatenated, "aaaaaa".*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try all possible ways to merge by picking either word1 or word2 in every step; for each path, track the resulting string, then pick the lexicographically largest one.  
  - This is exponential time (2ⁿ) and infeasible for input size up to 3000.
- **Greedy approach:**  
  - Since we want the lexicographically largest result at each decision, always pick the string whose current **remaining substring** is greater.
  - At each step, compare the remaining substrings. If word1 >= word2, pick word1; else, pick word2.  
  - This correctly handles equal leading letters by looking ahead.
  - The approach is optimal because any deviation could make the constructed string smaller at some position.
- **Trade-offs:**  
  - For large identical prefixes, repeated substring comparison can be costly. However, string slicing is fast enough for constraints.
  - Could optimize via index pointers or using custom comparator to save on substring allocations.

### Corner cases to consider  
- One or both input strings are empty.
- Strings with identical content.
- Strings containing only one character.
- Strings with repeated characters or all characters the same.
- Strings with long common prefixes.
- Strings with very different characters (e.g., all 'z's vs. all 'a's).
- Choosing when both have the same starting character.

### Solution

```python
def largestMerge(word1: str, word2: str) -> str:
    # Create list for performance (faster concatenation)
    merge = []
    i, j = 0, 0
    # While both strings have remaining characters
    while i < len(word1) and j < len(word2):
        # Compare remaining substrings (not just first chars!)
        # If word1 is lex greater, pick from word1; else from word2
        if word1[i:] > word2[j:]:
            merge.append(word1[i])
            i += 1
        else:
            merge.append(word2[j])
            j += 1
    # Append the rest (only one of these will have anything left)
    merge.extend(list(word1[i:]))
    merge.extend(list(word2[j:]))
    return ''.join(merge)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) in practice, where n = len(word1), m = len(word2).  
  Each character is processed once and there's at most O(n + m) comparisons. Python substring compares cost at worst O(n) each for equal substrings, but amortized cost is fast for distinct strings. This approach is acceptable for input up to 3000.
- **Space Complexity:** O(n + m) extra for the result string; O(1) extra beyond output (ignoring the result). Slicing for comparisons can have transient memory costs, but no extra storage grows with recursion or data structure.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize if substrings are very long and repetitive?
  *Hint: Suffix arrays, KMP, or cached comparisons could speed up this step.*

- What if you have k strings to merge, not just two?
  *Hint: Generalize to a priority queue/heap-based strategy.*

- Can you return how many distinct merge results are lexicographically maximal?
  *Hint: When can both options be used without affecting max ordering; how to count these paths?*

### Summary
This problem is a classic example of **greedy algorithm** applications to string construction: always pick the lexicographically largest option for the current prefix. This pattern appears in problems like "maximum number" formations, string merge games, and in competitive programming wherever optimal ordering by local choice leads to global optimality. By comparing substrings at each step, we ensure that every decision maintains maximal potential for the remainder. This approach leverages two pointers, substring comparison, and efficient string building, which are frequently useful in complex string queries.

### Tags
Two Pointers(#two-pointers), String(#string), Greedy(#greedy)

### Similar Problems
- Maximum Matching of Players With Trainers(maximum-matching-of-players-with-trainers) (Medium)
- Decremental String Concatenation(decremental-string-concatenation) (Medium)