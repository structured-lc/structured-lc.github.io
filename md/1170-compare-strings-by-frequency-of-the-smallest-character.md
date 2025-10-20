### Leetcode 1170 (Medium): Compare Strings by Frequency of the Smallest Character [Practice](https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character)

### Description  
Given two string arrays **queries** and **words**, for each query string, count how many words in **words** have a strictly higher frequency of their smallest (lexicographically) character than the query.   
Define `f(s)` as the frequency of the smallest character in a non-empty string `s`.  
Example: for `s = "bbaac"`, the smallest character is `'a'`, and it appears twice, so `f(s) = 2`.  
Return an array where each element is the answer for the corresponding query.

### Examples  

**Example 1:**  
Input: `queries = ["cbd"]`, `words = ["zaaaz"]`  
Output: `[1]`  
*Explanation: f("cbd") = 1 (smallest: 'b'), f("zaaaz") = 3 (smallest: 'a'). 1 < 3 ⇒ 1 word satisfies the condition.*

**Example 2:**  
Input: `queries = ["bbb","cc"]`, `words = ["a","aa","aaa","aaaa"]`  
Output: `[1,2]`  
*Explanation: f("bbb") = 3 (smallest: 'b').  
Words: f("a")=1, f("aa")=2, f("aaa")=3, f("aaaa")=4.  
For "bbb": only "aaaa" has f(w) > 3 ⇒ 1.  
For "cc": f("cc")=2 (smallest: 'c'). "aaa" (3) and "aaaa" (4) > 2 ⇒ 2 words.*

**Example 3:**  
Input: `queries = ["abcd","a"], words = ["abc","a","aa"]`  
Output: `[1,1]`  
*Explanation:  
f("abcd") = 1, f("abc")=1, f("a")=1, f("aa")=2. Only "aa" satisfies f(w)>1 ⇒ 1.  
f("a") = 1, same as above ⇒ 1.*

### Thought Process (as if you’re the interviewee)  

First, for every string, efficiently compute `f(s)`—the frequency of its smallest character. For each query, compare with all words: count how many words have greater `f(w)`.  
Brute-force: For each query, loop through all words and compare their f-values. This is O(Q×W×M) where Q,W ≤ 2000 and M ≤ 10 (length of string)—acceptable but can be improved.

**Optimization:**  
- Precompute f-values for all words, store and sort them.
- For each query, compute f-value and use binary search on sorted word f-values to find how many are strictly larger.
- Sorting lets us reduce repeated pairwise search from O(W) per query to O(log W) per query via upper_bound.

This approach leverages counting/binary search to reduce redundant work, at cost of precomputation.

### Corner cases to consider  
- Words and queries where all letters are the same.
- Very short strings ("a", "b").
- Duplicate words or queries.
- No word has a higher f-value than the query (output 0).
- All queries same, all words same.
- Maximum length (strings of length 10).
- All smallest characters and their frequencies equal.

### Solution

```python
# Find frequency of lex smallest character in a string
def freq_smallest(s):
    min_char = 'z'
    count = 0
    for ch in s:
        if ch < min_char:
            min_char = ch
            count = 1
        elif ch == min_char:
            count += 1
    return count

def numSmallerByFrequency(queries, words):
    # Precompute all f(w) and sort
    word_freqs = [freq_smallest(w) for w in words]
    word_freqs.sort()
    
    res = []
    for q in queries:
        fq = freq_smallest(q)
        # Binary search: count of numbers > fq in word_freqs
        left, right = 0, len(word_freqs)
        while left < right:
            mid = (left + right) // 2
            if word_freqs[mid] <= fq:
                left = mid + 1
            else:
                right = mid
        # All word_freqs from 'left' to end are > fq
        res.append(len(word_freqs) - left)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(W × M) to compute f(w) for words.
  - O(W log W) to sort.
  - O(Q × M) for queries.
  - O(Q × log W) for binary search per query.
  - Total: O((Q+W)×M + W log W + Q log W), where M is ≤10.
- **Space Complexity:**  
  - O(W) for word_frequencies.
  - O(Q) for result array.
  - Negligible extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large string lengths (e.g., M up to 10⁵)?
  *Hint: Can your frequency calculation be further optimized?*

- What if queries and words were streamed (could not store all at once)?
  *Hint: Consider on-the-fly processing with limited storage.*

- Could you solve the problem without sorting and binary search?
  *Hint: Frequency-counting or bucket sort, since f(s) value range is limited (max string length 10).*

### Summary
This problem uses the **counting + binary search** pattern—sort a precalculated set, then answer multiple queries efficiently. The decisive optimization: leverage the small maximum possible value of f(s) (since s has at most 10 letters), allowing sorting/bucket counting for fast lookups.  
This pattern is common in problems involving frequency comparison and range queries, such as number-of-smaller-elements and histogram-based solutions.


### Flashcard
Precompute and sort f-values (smallest char frequency) for words; for each query, use binary search to count words with greater f-value.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
