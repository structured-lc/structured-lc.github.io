### Leetcode 2490 (Easy): Circular Sentence [Practice](https://leetcode.com/problems/circular-sentence)

### Description  
Given a sentence, determine whether it is **circular**.  
A sentence is circular if, for every pair of consecutive words, the last character of the current word matches the first character of the next word, and also the last character of the last word matches the first character of the first word.  
All words are separated by a single space. The sentence contains only English letters (case matters).  
You need to check that these adjacent character conditions hold for all pairs, including the wraparound case from last to first word.

### Examples  

**Example 1:**  
Input: `sentence = "leetcode exercises sound delightful"`  
Output: `true`  
*Explanation: Words: ["leetcode", "exercises", "sound", "delightful"].  
- "leetcode" ends with 'e', "exercises" starts with 'e'.  
- "exercises" ends with 's', "sound" starts with 's'.  
- "sound" ends with 'd', "delightful" starts with 'd'.  
- "delightful" ends with 'l', "leetcode" starts with 'l'.  
All conditions are met. The sentence is circular.*

**Example 2:**  
Input: `sentence = "eetcode"`  
Output: `true`  
*Explanation: Words: ["eetcode"].  
- A single word, which starts and ends with 'e'. The sentence is circular.*

**Example 3:**  
Input: `sentence = "Leetcode is cool"`  
Output: `false`  
*Explanation: Words: ["Leetcode", "is", "cool"].  
- "Leetcode" ends with 'e', "is" starts with 'i' (not matching).  
The condition is violated. The sentence is not circular.*

### Thought Process (as if you’re the interviewee)  
First, split the sentence into words using space as the separator.  
If there's only one word, check if its first and last characters match.  
Otherwise, for each adjacent pair of words, compare the last character of the current word to the first character of the next word.  
Finally, check that the last character of the last word matches the first character of the first word (wrap-around requirement).  
If all these checks pass, the sentence is circular.  
This logic works for any length sentence and doesn't require extra space besides the split list and can be done in O(n) time, where n is the length of the sentence.

### Corner cases to consider  
- Single-word sentence: e.g., "aba"  
- Case sensitivity: "Leetcode" vs "leetcode"  
- All words have only one letter  
- Sentence begins and ends with the same letter  
- Sentence fails at the wrap-around case  
- Very long sentence

### Solution

```python
def isCircularSentence(sentence: str) -> bool:
    # Split the input into list of words
    words = sentence.split(' ')
    n = len(words)

    # Check each consecutive pair
    for i in range(n):
        cur_word = words[i]
        next_word = words[(i + 1) % n]  # wrap around for last-to-first pair
        if cur_word[-1] != next_word[0]:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k = number of characters in the input sentence. Each character is visited at most twice (once for split and once in comparisons).
- **Space Complexity:** O(w), where w = number of words in the sentence. Space for the list created by splitting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words can be separated by multiple spaces, or if input may have leading/trailing spaces?  
  *Hint: How would you robustly split and trim?*

- How can you generalize the check for a circular sequence in other list types, like arrays of arbitrary data?  
  *Hint: Think about adjacency and wrap-around checks.*

- Could you do it without splitting into a list of words, using only character-by-character iteration?  
  *Hint: Detect word boundaries and compare letters on the fly.*

### Summary
This problem uses the pattern of comparing adjacent pairs in a sequence, including wrap-around, which is common in circular buffer or cycle detection problems. The solution is simple string manipulation and iteration, with an emphasis on index and boundary handling. This approach applies to similar problems where you must validate relationships in a circular or cyclic structure.

### Tags
String(#string)

### Similar Problems
- Defuse the Bomb(defuse-the-bomb) (Easy)