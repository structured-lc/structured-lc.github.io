### Leetcode 2131 (Medium): Longest Palindrome by Concatenating Two Letter Words [Practice](https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words)

### Description  
You're given a list of strings `words`, where each string is exactly two lowercase English letters. You need to select some of these words (each at most once), concatenate them in any order, and obtain the **longest possible palindrome**. Return the length of this longest possible palindrome. If you cannot make any palindrome, return 0.  
A **palindrome** is a string that reads the same forwards and backwards.

### Examples  

**Example 1:**  
Input: `words = ["lc","cl","gg"]`  
Output: `6`  
Explanation: Combine "lc" + "gg" + "cl" → "lcggcl", which is a palindrome of length 6.

**Example 2:**  
Input: `words = ["ab","ty","yt","lc","cl","ab"]`  
Output: `8`  
Explanation: Use pairs "ty" + "yt" and "lc" + "cl", and the two "ab" to build "tylcclyt" or "lcyttycl", both palindromes of length 8.

**Example 3:**  
Input: `words = ["cc","ll","xx"]`  
Output: `2`  
Explanation: Any single word like "cc" is a palindrome, so max length is 2. No longer palindrome possible.

### Thought Process (as if you’re the interviewee)  
Start by noticing that:
- Each word can be used at most once.
- We want the largest collection of 2-letter words such that their concatenation is a palindrome.

#### Brute-force idea:  
Try all possible subsets and all permutations of words to build the longest palindrome. For each order, check if concatenation is a palindrome and store the max length.  
**But this is exponential (too slow) even for moderate input size!**

#### Optimized approach:  
- Use **greedy matching** and **hash counting** to pair up words optimally.
- For each word, check if its reverse also exists. Each such pair can contribute 4 to the total length.
- Words like "aa", "bb" (same letter twice) are themselves palindromes. Pairs of identical palindromic words (`["gg","gg"]`) can go equally on both ends of palindrome.
- However, if there's an unpaired "gg" (or similar), it can be placed in the center for an extra 2 length.

So:
- Count all pairs word + reversed word across the list—add 4 for each such pair.
- For words where word == reverse(word), utilize them in pairs; if there's an odd one left, add 2 to the result for the palindrome’s center.

#### Trade-offs:  
This approach is **O(n)**, using a hash map, and always finds the optimal solution because palindromes of this type depend only on pairings and the presence of a central palindromic word.

### Corner cases to consider  
- All words are distinct, no pairings possible → Max possible is 2 if any word is a palindrome itself.
- All words are palindromic (like "zz"), but odd count → Only one can be alone at the center.
- No palindromic words → Only pairs like "ab"/"ba" contribute.
- Empty input (`[]`) → Output: `0`
- Only one word → Output: `2` if it's a palindrome; otherwise `0`.

### Solution

```python
def longestPalindrome(words):
    # Map to count each word's occurrence
    count = {}
    for w in words:
        count[w] = count.get(w, 0) + 1

    res = 0       # Total length of palindrome constructed
    used_center = False  # To track if a central palindrome word is used
    
    for word in list(count.keys()):
        rev = word[::-1]
        # If word is same as reverse (palindromic themselves, e.g. 'gg')
        if word == rev:
            pairs = count[word] // 2
            res += pairs * 4
            count[word] -= pairs * 2
        else:
            # Pair as many "word"s with "rev"s as possible
            pair_cnt = min(count[word], count.get(rev,0))
            res += pair_cnt * 4
            count[word] -= pair_cnt
            count[rev] -= pair_cnt

    # After using all pairs, if any palindromic word left, use one in center
    for word in count:
        if word[0] == word[1] and count[word] > 0 and not used_center:
            res += 2
            used_center = True
            break  # Only one center allowed

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of words. We count each word and do constant work per unique word and its reverse.
- **Space Complexity:** O(n) for the hash map used to count word frequencies.

### Potential follow-up questions (as if you’re the interviewer)  

- Can this approach be extended for n-letter words, not just 2-letter ones?  
  *Hint: How would you find matching pairs and possible centers for general n-letter words?*

- What if words could be used unlimited times?  
  *Hint: How does removing the “at most once” constraint change pairing logic?*

- How to reconstruct the palindrome, not just its length?  
  *Hint: Which words go on left, which on right, and which (if any) in center? Consider building two halves and a center piece.*

### Summary
This problem is a classic **hash map counting + greedy pairing** exercise, optimized for palindromic patterns created from 2-character strings. The technique—pairing items with their reverse—can be used in problems involving mirrored relationships and palindromic construction, such as anagrams, palindromic subarrays, or DNA pairing problems. The “central unpaired element” trick is common when dealing with palindrome constructions.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Palindrome Pairs(palindrome-pairs) (Hard)
- Longest Palindrome(longest-palindrome) (Easy)