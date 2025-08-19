### Leetcode 336 (Hard): Palindrome Pairs [Practice](https://leetcode.com/problems/palindrome-pairs/)

### Description  
You are given an array of **unique strings**. The task is to find all pairs of distinct indices (i, j) such that **words[i] + words[j]** forms a palindrome.  
A palindrome is a string that reads the same forwards and backwards.  
Return a list of all such index pairs.

### Examples  

**Example 1:**  
Input: `["abcd","dcba","lls","s","sssll"]`  
Output: `[[0,1],[1,0],[3,2],[2,4]]`  
*Explanation:*
- words + words[1] = "abcd" + "dcba" = "abcddcba" (palindrome)
- words[1] + words = "dcba" + "abcd" = "dcbaabcd" (palindrome)
- words[3] + words[2] = "slls" (palindrome)
- words[2] + words[4] = "llssssll" (palindrome)

**Example 2:**  
Input: `["bat","tab","cat"]`  
Output: `[[0,1],[1,0]]`  
*Explanation:*
- "bat" + "tab" = "battab" (palindrome)
- "tab" + "bat" = "tabbat" (palindrome)

**Example 3:**  
Input: `["a",""]`  
Output: `[[0,1],[1,0]]`  
*Explanation:*
- "a" + "" = "a" (palindrome)
- "" + "a" = "a" (palindrome)

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**: Try every possible pair (i, j), check if words[i] + words[j] is a palindrome. This is O(n² × k), where n = number of words, k = average word length. Too slow for large n.
- **Optimization**: Since we want efficient checking, consider these facts:
  - If we split a word into prefix and suffix at every possible point, then for every prefix that’s a palindrome, check if the reverse of the suffix exists elsewhere in the list; similarly for suffix and its reverse prefix.
  - Use a hashmap to map every word to its index for quick lookups.
  - For each word, check:
    - Is there a word in the list such that word + that_word forms a palindrome? This happens if the suffix is a palindrome and the reverse of prefix exists.
    - Handle empty strings specially, since any palindrome can pair with blank.
- **Trie optimization**: It's possible to use a Trie for even more efficient lookups, but hashmap-based substring processing is already efficient and much easier to code and reason about for interviews.  
- **Why choose this approach**: The logic is clear and leverages prefix/suffix palindrome properties and fast lookups. Handles all edge cases and is much faster than brute-force.

### Corner cases to consider  
- Empty string in input.
- Words which are themselves palindromes.
- Words with no possible palindrome pairs.
- Pairs from reversed words (e.g., "abc" and "cba").
- Input with only one word.
- Very long words.
- Duplicate palindrome substrings.

### Solution

```python
# Check if a string is palindrome
def is_palindrome(s):
    return s == s[::-1]

def palindromePairs(words):
    # Map from word to its index for quick lookups
    word_to_index = {w: i for i, w in enumerate(words)}
    res = []

    for i, word in enumerate(words):
        # For each possible split of the word
        for j in range(len(word)+1):
            prefix = word[:j]
            suffix = word[j:]
            
            # If prefix is palindrome, see if there is a reversed suffix in the list
            if is_palindrome(prefix):
                reversed_suffix = suffix[::-1]
                if reversed_suffix in word_to_index and word_to_index[reversed_suffix] != i:
                    res.append([word_to_index[reversed_suffix], i])
            # If suffix is palindrome, see if there is a reversed prefix in the list
            # Avoid duplicates when j==len(word) (prefix==word, suffix=="")
            if j != len(word) and is_palindrome(suffix):
                reversed_prefix = prefix[::-1]
                if reversed_prefix in word_to_index and word_to_index[reversed_prefix] != i:
                    res.append([i, word_to_index[reversed_prefix]])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k²)  
  For each word (n), for each possible split (≤k), palindrome check (≤k), plus hashmap lookups (O(1)). Total: n × k splits, each palindrome check can scan up to k: so n × k².
- **Space Complexity:** O(n × k)  
  For the hashmap storing all words, plus output. No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose words are not unique — how would you prevent duplicate index pairs?  
  *Hint: Track all indices for duplicate words, and handle pairings to avoid repeats.*

- Could you optimize palindrome checks further for very long words or massive inputs?  
  *Hint: Cache palindromicity, or use Manacher’s algorithm for batch palindrome checks.*

- How would you modify if pairs should include cases where i == j?  
  *Hint: Adjust your index checking — currently skips i == j.*

### Summary
This solution uses a *hashmap* for O(1) lookups and breaks down each word into all possible prefix/suffix splits to find matching palindrome combinations. This is an application of the “prefix/suffix pairing and reverse lookup” coding pattern, commonly seen in string manipulation and palindrome substring problems. Variations of this approach can be used in problems requiring pairing based on string transforms or symmetry.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie)

### Similar Problems
- Longest Palindromic Substring(longest-palindromic-substring) (Medium)
- Shortest Palindrome(shortest-palindrome) (Hard)
- Longest Palindrome by Concatenating Two Letter Words(longest-palindrome-by-concatenating-two-letter-words) (Medium)
- Find Maximum Number of String Pairs(find-maximum-number-of-string-pairs) (Easy)