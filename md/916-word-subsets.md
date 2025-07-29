### Leetcode 916 (Medium): Word Subsets [Practice](https://leetcode.com/problems/word-subsets)

### Description  
Given two string arrays, **words1** and **words2**, find all words in **words1** that are considered "universal" with respect to **words2**.

A word `b` is a subset of word `a` (including multiplicity) if for every letter in `b`, the number of occurrences in `a` is equal or greater.  
A word `a` from **words1** is universal if every word in **words2** is a subset of `a`.  
Return all universal words from **words1**.

### Examples  

**Example 1:**  
Input: `words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]`  
Output: `["facebook","google","leetcode"]`  
*Explanation:  
Each word in **words1** must have at least one 'e' and one 'o'.  
- "facebook" has both.  
- "google" has both.  
- "leetcode" has both.  
- "amazon" and "apple" do not have both.*

**Example 2:**  
Input: `words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]`  
Output: `["apple","google","leetcode"]`  
*Explanation:  
Each word in **words1** must have at least one 'l' and one 'e'.  
- "apple" has both.  
- "google" has both.  
- "leetcode" has both.  
- "amazon" and "facebook" are missing required characters.*

**Example 3:**  
Input: `words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","oo"]`  
Output: `["facebook","google"]`  
*Explanation:  
Each universal word must have at least one 'e' and two 'o's.  
- "facebook": 1 'e', 2 'o' ✔  
- "google": 1 'e', 2 'o' ✔  
- Others have fewer than 2 'o' or no 'e'.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each word in `words1`, check if every word in `words2` is a subset.  
  For each such pair, count each character's occurrences, check if the requirement is met.
  This results in high time complexity: O(N \* M \* K), with  
  N = len(words1), M = len(words2), K = average length of word.

- **Optimization:**  
  Notice that the requirement from **words2** can be consolidated:  
  For each character, determine the **maximum count required** across all words in `words2`.  
  Example: `words2 = ['e', 'oo']` → need at least 1 'e', 2 'o' for a word to be universal.  
  Then, check each word in `words1` **once** against this combined frequency requirement.

- This reduces redundant checking and leads to significant speedup since we only scan each word in **words1** once against the final frequency "mask".

- **Trade-off:**  
  Optimization costs O(M \* K) to preprocess **words2**, followed by O(N \* K) checks for **words1** (K = alphabet size = 26). This is much faster in practice.

### Corner cases to consider  
- Either input array is empty.
- Words in **words2** with duplicate characters ("ee").
- Characters in **words2** not found in any **words1** word.
- All **words1** are universal.
- No **words1** are universal.
- Single element arrays.

### Solution

```python
def wordSubsets(words1, words2):
    # Step 1: Build the frequency requirement (mask) from words2
    freq = [0 for _ in range(26)]  # 26 English characters

    for b in words2:
        temp = [0 for _ in range(26)]
        for c in b:
            idx = ord(c) - ord('a')
            temp[idx] += 1
        for i in range(26):
            freq[i] = max(freq[i], temp[i])

    # Step 2: For each word in words1, check if it meets the frequency requirement
    result = []
    for a in words1:
        temp = [0 for _ in range(26)]
        for c in a:
            temp[ord(c) - ord('a')] += 1
        # Check if all requirements are satisfied
        universal = True
        for i in range(26):
            if temp[i] < freq[i]:
                universal = False
                break
        if universal:
            result.append(a)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(M \* L + N \* K), where  
  M = len(words2), L = average word length in words2,  
  N = len(words1), K = average word length in words1.  
  Frequency comparison is constant time (26 iterations for 'a'-'z').

- **Space Complexity:**  
  O(1) for the 26-character frequency arrays.  
  O(N) for the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet was not fixed at 26 characters, or included unicode?  
  *Hint: Use hashmap (dict) instead of fixed arrays.*

- How would you handle extremely long words?  
  *Hint: Only frequency, not full word, matters for the check. Avoid storing unnecessary data.*

- Can you generalize for phrases or words separated by spaces?  
  *Hint: Decide on how to tokenize input, may need to adjust logic for spacing or punctuation.*

### Summary
This problem is a classic "frequency mask" technique:  
Combine requirements across multiple words into a single character frequency array, then scan the candidates once each.  
This "consolidate requirement, validate in single pass" pattern is common in subset/multiset and anagram problems, and is often used for word filter and multitarget search tasks.