### Leetcode 1961 (Easy): Check If String Is a Prefix of Array [Practice](https://leetcode.com/problems/check-if-string-is-a-prefix-of-array)

### Description  
Given a string **s** and an array of strings **words**, determine whether **s** is a *prefix string* of **words**.  
A prefix string here means you can create **s** by concatenating the first k strings in **words** for some positive **k** (1 ≤ k ≤ words.length).  
Return true if this is possible, otherwise return false.  
Restated: Is there some k so that joining words\[0\], words\[1\], ..., words\[k-1\] (in order) results exactly in **s**?

### Examples  

**Example 1:**  
Input: `s = "iloveleetcode", words = ["i","love","leetcode","apples"]`  
Output: `True`  
*Explanation: Concatenating the first 3 words: "i" + "love" + "leetcode" = "iloveleetcode", which matches s.*

**Example 2:**  
Input: `s = "iloveleetcode", words = ["apples","i","love","leetcode"]`  
Output: `False`  
*Explanation: Even concatenating any prefix of words, you cannot get "iloveleetcode" as apples comes first, so no match is possible.*

**Example 3:**  
Input: `s = "applepie", words = ["apple","pie","banana"]`  
Output: `True`  
*Explanation: Concatenating the first 2 words: "apple" + "pie" = "applepie", which matches s.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Concatenate the first k words for every possible k (1 to words.length), check if the result matches **s**. This would require a lot of redundant concatenations.
- **Efficient approach:**  
  - Build a running string by concatenating words from left, one at a time.
  - After adding each word, check:
    - If the concatenated string’s length equals s, check if they are exactly equal and return accordingly.
    - If the concatenated string length exceeds s, return False early (since no prefix longer than s will work).
  - This way, we only do a single pass and stop early once the length surpasses s.

- **Why this approach:**  
  - This is optimal for time and memory given the small constraint on input sizes. It is linear to total characters considered.

### Corner cases to consider  
- s shorter than first word in words.
- s equals the concatenation of all words.
- s longer than the full concatenation of all words.
- s matches only if you take ALL words.
- s matches after only the first word.
- words contains only one element.
- Empty strings in words (but constraints suggest 1 ≤ words[i].length so this is not possible).

### Solution

```python
def isPrefixString(s, words):
    # Start with an empty prefix
    prefix = ""
    # Iterate through words
    for word in words:
        prefix += word  # Concatenate the current word to the prefix
        if len(prefix) == len(s):
            # If lengths match, check for exact match
            return prefix == s
        if len(prefix) > len(s):
            # If prefix too long, cannot be a match
            return False
    # After all words, did not find a match
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(total length of all words or len(s)), at most each word is processed once, stopped early if prefix exceeds s.  
- **Space Complexity:** O(len(s)) for the constructed prefix string (could be optimized away, but acceptable for given constraints).

### Potential follow-up questions (as if you’re the interviewer)  

- What if words could contain empty strings?  
  *Hint: Think about whether "" in words would affect your matching logic or result.*

- Suppose s and words were very large (e.g., millions of characters). How would you avoid unnecessary string concatenation overhead?  
  *Hint: Can you use pointers, or index-slice s to compare substrings instead of full concatenation?*

- What if you also want to return the smallest k for which the prefix matches s?  
  *Hint: Track and return the current index when a match occurs.*

### Summary
This problem uses the **prefix accumulation** pattern, iteratively building a prefix from the array and comparing it to the target.  
It's a direct example of a "running compose and compare" technique, common in string and sequence problems where results need to be built up step by step until a match is found or exceeded. This is broadly applicable in prefix-sum, prefix-array, or progressive-match type interviews.