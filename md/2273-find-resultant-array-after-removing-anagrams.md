### Leetcode 2273 (Easy): Find Resultant Array After Removing Anagrams [Practice](https://leetcode.com/problems/find-resultant-array-after-removing-anagrams)

### Description  
Given a list of **words**, repeatedly remove any **word** that is an anagram of the immediately previous word in the list. Only keep the first occurrence in each group of consecutive anagrams. Return the resultant list of words, after all valid removals.  
An anagram is a word formed by rearranging the letters of another word.

### Examples  

**Example 1:**  
Input: `["abba","baba","bbaa","cd","cd"]`  
Output: `["abba","cd"]`  
*Explanation: "baba" and "bbaa" are anagrams of "abba", so only "abba" is kept from this group. The remaining two "cd" are anagrams, so only the first "cd" is kept.*

**Example 2:**  
Input: `["a","b","c","d","e"]`  
Output: `["a","b","c","d","e"]`  
*Explanation: No adjacent words are anagrams, so all are kept.*

**Example 3:**  
Input: `["ab","ba","abc","bac","cab","bca","def"]`  
Output: `["ab","abc","def"]`  
*Explanation: "ba" is an anagram of "ab" and removed. "bac", "cab", "bca" are anagrams of "abc" and all are removed except "abc".*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to process the word list and keep only the first occurrence in every group of consecutive anagrams.  
My brute-force approach would be:
- For each word, check if it is an anagram of the last word added to the result. If so, skip it; otherwise, add it.

To efficiently check for anagrams, sort the characters of each word and compare the sorted strings. Sorting is reasonable because each word is short (≤100 chars), and the array can be up to 100 words.

Optimizations:
- We don't need to compare with anything but the immediately previous word in the result, because non-consecutive anagrams are not removed.

Trade-offs:
- Sorting each word gives O(W \* L log L), where W = number of words, L = average word length. This is efficient for given constraints.
- Using a character count (array of size 26) per word instead of sorting could be faster, but code is a bit longer and for small word sizes the difference is negligible.

### Corner cases to consider  
- Empty input array ⇒ should return []  
- Only one word ⇒ should return the word itself  
- Multiple identical words (all anagrams) ⇒ only first should be kept  
- No anagrams anywhere ⇒ all words kept  
- Words with different lengths ⇒ never anagrams  
- Large and small words mixed  
- Words with repeated letters

### Solution

```python
def removeAnagrams(words):
    # Result list, always add the first word
    result = [words[0]]
    # Keep track of "anagram signature" for previous result word
    prev_sorted = "".join(sorted(words[0]))  # Sorting makes comparison easy
    for word in words[1:]:
        word_sorted = "".join(sorted(word))
        # If not an anagram of previous, add to result
        if word_sorted != prev_sorted:
            result.append(word)
            prev_sorted = word_sorted  # Update to current word's sorted string
        # else: skip as it's an anagram of previous
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(W \* L log L), where W = number of words, L = average word length. Sorting each word takes L log L and we do this for each word.
- **Space Complexity:** O(W \* L), for storing the sorted versions during processing + result list of size up to W.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words could be very large (e.g., millions of characters, or many words)?
  *Hint: Instead of sorting, use a 26-letter frequency vector for counting; compare those.*

- How would you modify for non-consecutive anagrams (removing all but the first occurrence of all anagrams anywhere in the list)?
  *Hint: Use a hash set of anagram signatures seen so far.*

- What if upper/lower case are considered the same (case-insensitive)?
  *Hint: Convert all words to lower case before processing for comparison.*

### Summary
This problem fits the "adjacent duplicate removal" and "group by anagram" coding pattern. The main trick is to compare only adjacent words using their sorted signatures, which is a standard anagram-detection strategy. Variations of this technique appear in problems involving duplicate or anagram removal, such as grouping anagrams or deduplication in strings.