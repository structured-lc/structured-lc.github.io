### Leetcode 1160 (Easy): Find Words That Can Be Formed by Characters [Practice](https://leetcode.com/problems/find-words-that-can-be-formed-by-characters)

### Description  
Given a list of words and a string chars, determine the total length of words that can be formed using letters from chars. Each character in chars can only be used once per word. A word is "good" if every letter it needs is present in chars in the needed quantity. Your goal is to find the sum of the lengths of all good words in the list.

### Examples  

**Example 1:**  
Input: `words = ["cat","bt","hat","tree"], chars = "atach"`  
Output: `6`  
Explanation:  
"cat" can be formed (uses 'c', 'a', 't'),  
"bt" cannot (missing 'b' and/or 't'),  
"hat" can be formed (uses 'h', 'a', 't'),  
"tree" cannot (only one 'e' in chars).  
So, only "cat" and "hat" are good, 3 + 3 = 6.

**Example 2:**  
Input: `words = ["hello","world","leetcode"], chars = "welldonehoneyr"`  
Output: `10`  
Explanation:  
"hello" and "world" can each be formed, but "leetcode" cannot (need more 'e' and 'c').  
Sum is 5 + 5 = 10.

**Example 3:**  
Input: `words = ["a","b","c","ab","ac","bc","abc"], chars = "abc"`  
Output: `10`  
Explanation:  
All words except "abc" use the letters in a valid way, and "abc" also fits exactly.  
Sum = 1 + 1 + 1 + 2 + 2 + 2 + 3 = 12.

### Thought Process (as if you’re the interviewee)  
A brute-force approach would be to, for each word, try to match every letter against chars, making sure each letter isn’t reused. This could use lots of inefficient character checks.

To optimize:
- Count the occurrences of each character in chars (using a frequency array for 26 lowercase letters).
- For each word, count the occurrences of its characters.
- For every character in the word, make sure the word's count does not exceed the count in chars.
- If any word letter needs more than what chars can offer, this word is skipped.
- Otherwise, add the word's length to the answer.

This runs efficiently because the check for each word is bounded by the maximum word length and the small alphabet (26 lowercase letters), and we avoid searching or removing used letters repeatedly.

### Corner cases to consider  
- chars is empty
- words contains empty strings
- words contains duplicate words
- chars contains repeated characters
- Some words require more repeated letters than chars provides
- All words can be formed, or none can be formed

### Solution

```python
def countCharacters(words, chars):
    # Count frequency of each character in chars
    chars_count = [0] * 26
    for c in chars:
        chars_count[ord(c) - ord('a')] += 1

    result = 0

    for word in words:
        word_count = [0] * 26
        for c in word:
            word_count[ord(c) - ord('a')] += 1

        # Check that word can be formed by chars
        can_form = True
        for i in range(26):
            if word_count[i] > chars_count[i]:
                can_form = False
                break

        if can_form:
            result += len(word)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L),  
  Where N is the number of words and L is the average word length.  
  - We build the char count once (O(C), C ≤ 100), and for each word, do two O(L) passes.

- **Space Complexity:** O(1),  
  - The auxiliary arrays are both fixed size (26), regardless of input size. Input itself does not get copied.

### Potential follow-up questions (as if you’re the interviewer)  

- What if chars can be very long (e.g., millions of characters), or use a Unicode alphabet?
  *Hint: Consider dynamic dictionaries or hashmaps instead of fixed arrays.*

- Suppose words contained very large words (e.g., 10⁶ characters), how would you handle memory efficiently?
  *Hint: Try single-pass checks with early exits.*

- If finding not just total-length but which words can be formed, how would you modify the solution?
  *Hint: Store good words in a list as they are found.*

### Summary
This problem follows the **frequency array/counter pattern**, where you compare frequency requirements across two sources.  
It can be applied in anagrams, subset string matches, inventory problems, and other resource-checking tasks where item counts matter. The solution is efficient due to the small and bounded alphabet, and direct array index use instead of repeated searches.


### Flashcard
Count letter frequencies in chars; for each word, check if its letter counts do not exceed those in chars to determine if it can be formed.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Ransom Note(ransom-note) (Easy)
- Rearrange Characters to Make Target String(rearrange-characters-to-make-target-string) (Easy)