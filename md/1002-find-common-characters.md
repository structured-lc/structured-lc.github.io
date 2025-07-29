### Leetcode 1002 (Easy): Find Common Characters [Practice](https://leetcode.com/problems/find-common-characters)

### Description  
Given a list of strings, return a list of all characters that appear in every string, including duplicates. That is, if a character appears twice in each string, include it twice in the answer. The result can be in any order.  

For example:  
If the input is `["bella", "label", "roller"]`, the output should include the common characters 'e' and 'l', but since each word contains two 'l' characters, 'l' should appear twice in the output.

### Examples  

**Example 1:**  
Input: `["bella", "label", "roller"]`  
Output: `["e","l","l"]`  
*Explanation: Every word has at least one 'e' and two 'l's. 'b', 'a', 'o', and 'r' are not in every word.*

**Example 2:**  
Input: `["cool", "lock", "cook"]`  
Output: `["c","o"]`  
*Explanation: Each word contains 'c' and 'o' at least once. 'l' and 'k' are missing in some words.*

**Example 3:**  
Input: `["abc", "def", "ghi"]`  
Output: `[]`  
*Explanation: No character appears in all three words, so the result is empty.*

### Thought Process (as if you’re the interviewee)  

- The brute-force approach is to count the frequency of every character in each word, then look for the characters present in all words and take the minimum frequency for each such character.
- For an optimized approach:
  - Initialize a frequency array (size 26 for 'a' to 'z') with the counts from the first word.
  - For every subsequent word, count its character frequencies, then update the main frequency array by taking the minimum for each letter.
  - After processing all words, for every character, include it in the output as many times as the final min frequency says.
- This approach avoids extra data structures and repeated traversals, is easy to code, works in O(n \* m) time where n is the number of words and m is the average length of a word.
- Tradeoff: Uses a small constant amount (26) of extra space.

### Corner cases to consider  
- List of words is empty ⇒ Output is also empty.
- Some character only appears in all but one word ⇒ Should be excluded.
- Words with no common letters (e.g., ["abc", "def"]) ⇒ Output is empty.
- Words with duplicate common letters ⇒ Output contains character as many times as minimum duplicate count across all words.
- Single word input ⇒ Output is just all letters in that word.
- One or more words are empty ⇒ Output is empty.

### Solution

```python
def commonChars(words):
    # Frequency array for common chars, initialized with the first word's frequencies
    freq_common = [0] * 26
    for c in words[0]:
        freq_common[ord(c) - ord('a')] += 1

    # Update freq_common by taking min freq with each word
    for word in words[1:]:
        freq_current = [0] * 26
        for c in word:
            freq_current[ord(c) - ord('a')] += 1
        for i in range(26):
            freq_common[i] = min(freq_common[i], freq_current[i])

    # Build result using the final min frequencies
    result = []
    for i in range(26):
        result.extend([chr(i + ord('a'))] * freq_common[i])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = number of words, m = average word length.  
  - We process every word and for each, count frequencies (O(m)), then compare arrays (O(26)).
- **Space Complexity:** O(26) for the frequency arrays.  
  - This is negligible and does not depend on input size. The output uses O(L) space where L is the total number of common characters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words can include Unicode characters (not just 'a'-'z')?  
  *Hint: How would you generalize your frequency arrays for a larger set of characters?*

- How would you optimize for extremely large word sets, potentially with disk streaming?  
  *Hint: Can you process in small batches and keep frequencies updated?*

- What if you only want the set (not multiset) of common characters?  
  *Hint: What changes in frequency tracking do you need?*

### Summary
This problem uses the "Hashing/Counting" pattern, leveraging a fixed-size array to track minimum frequencies of each character across all words. It's a classic problem for learning how to align and aggregate frequency data, and variations appear in problems involving set/multiset intersections, word puzzles, or aggregating text data. This approach is efficient in both time and space due to fixed alphabet size.