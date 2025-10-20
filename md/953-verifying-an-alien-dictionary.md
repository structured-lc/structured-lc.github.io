### Leetcode 953 (Easy): Verifying an Alien Dictionary [Practice](https://leetcode.com/problems/verifying-an-alien-dictionary)

### Description  
Given a list of words written using an alien language (which uses only lowercase English letters, but in an unknown, different order), and the exact order of the letters in this alien language, determine if the list of words is sorted lexicographically according to the given order. You must compare each adjacent pair of words and ensure the first word does not come after the next word in the alien dictionary.

### Examples  

**Example 1:**  
Input: `words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"`  
Output: `True`  
*Explanation: The 'h' comes before 'l' in the alien order. "hello" appears before "leetcode" as expected.*

**Example 2:**  
Input: `words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"`  
Output: `False`  
*Explanation: Comparing "word" and "world", first differing letters are 'o' vs. 'o', then 'r' vs. 'r', then 'd' vs. 'l'. According to the given order, 'd' comes after 'l', so the list is not sorted.*

**Example 3:**  
Input: `words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"`  
Output: `False`  
*Explanation: In normal order, since "apple" is longer and starts with "app", "apple" should come after "app". But "apple" is before "app", so not sorted.*


### Thought Process (as if you’re the interviewee)  
Start by remembering that the classic way to check if words are lexicographically sorted is to compare each pair of adjacent words, letter by letter, stopping at the first mismatch to see which comes first. Here, the twist is that we can't use the usual English letter order—we must use the given alien order.

- Map each letter in the alien order to its index/rank using a dictionary for O(1) lookups.
- For each adjacent pair, compare letters in order: as soon as we find a pair with differing letters, check their order using the mapping.
- If all letters match and one word is a prefix of the next, the shorter word should come first.
- If at any point the comparison fails, return False.
- If all pairs are in order, return True.

This approach avoids sorting or extra passes, and dictionary lookup makes it efficient.

### Corner cases to consider  
- Empty `words` list.
- Only 1 word in `words` (trivially sorted).
- Adjacent words are completely identical.
- One word is a prefix of another ("app" vs "apple").
- All letters are the same in both words.
- Alien order is the same as English order.
- Alien order is reversed.
- Words with different lengths.

### Solution

```python
def isAlienSorted(words, order):
    # Map each character to its position in the alien alphabet
    rank = {char: i for i, char in enumerate(order)}
    
    # Helper function to compare two words
    def in_correct_order(word1, word2):
        # Compare letters one by one
        min_len = min(len(word1), len(word2))
        for i in range(min_len):
            # If different, determine order by rank
            if word1[i] != word2[i]:
                return rank[word1[i]] < rank[word2[i]]
        # All chars compared are same, check lengths: shorter should come first
        return len(word1) <= len(word2)
    
    # Compare all adjacent pairs
    for i in range(len(words) - 1):
        if not in_correct_order(words[i], words[i+1]):
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L), where L is the total number of characters in all words. Each comparison looks at each letter at most once per word pair, and there are n−1 pairs.
- **Space Complexity:** O(1) extra, excluding input. The rank dictionary is of size 26, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alien alphabet does not use all 26 lowercase English letters?  
  *Hint: Handle missing mappings gracefully and cover all characters found in `words`.*

- How would you adapt the solution if the alien language's order changes frequently, but you have to test many word lists?  
  *Hint: Precompute and cache the character order mapping for repeated queries.*

- Could you modify your algorithm to return the index of the first unsorted word pair rather than just True/False?  
  *Hint: Track and return the index upon the first failed comparison.*

### Summary
This problem uses the **custom sort order / string pairwise comparison** pattern. The code builds a mapping from characters to their alien order, then compares each adjacent word pair using this new order, mimicking a manual lexicographical comparison. This is a classic form of pairwise character comparison, useful in text processing and can be applied when dictionaries or user-defined orderings must be enforced (e.g., custom sorting, or challenging variations of standard lexicographical tasks).


### Flashcard
Map each alien letter to its rank, then compare each adjacent word pair letter by letter using this order—return false at the first mismatch where the order is violated; otherwise, the list is sorted.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
