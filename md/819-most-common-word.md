### Leetcode 819 (Easy): Most Common Word [Practice](https://leetcode.com/problems/most-common-word)

### Description  
Given a **paragraph** string and a list of **banned** words, return the **most frequent word** in the paragraph that is **not banned**.  
The answer should be in all **lowercase**.  
Ignore all **punctuation**; consider only sequences of letters as words.  
Words are **case-insensitive**.  
It is guaranteed that there is at least one non-banned word and that the answer is unique.

### Examples  

**Example 1:**  
Input:  
`paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."`,  
`banned = ["hit"]`  
Output:  
`"ball"`  
*Explanation:*
After converting to lowercase and removing punctuation:  
["bob", "hit", "a", "ball", "the", "hit", "ball", "flew", "far", "after", "it", "was", "hit"]  
"hit" (3 times) is banned, so the highest frequency non-banned word is "ball" (2 times).

**Example 2:**  
Input:  
`paragraph = "a, a, a, a, b,b,b,c, c"`,  
`banned = ["a"]`  
Output:  
`"b"`  
*Explanation:*
Cleaned words: ["a", "a", "a", "a", "b", "b", "b", "c", "c"].  
"a" is banned, so "b" (3 times) is the answer.

**Example 3:**  
Input:  
`paragraph = "Hello, world! Hello, LeetCode."`,  
`banned = ["leetcode"]`  
Output:  
`"hello"`  
*Explanation:*  
After cleanup: ["hello", "world", "hello", "leetcode"].  
"hello" appears 2 times, is not banned, and is the answer.

### Thought Process (as if you’re the interviewee)  
- First thought: We need to **count occurrences** of each word (case-insensitive, ignoring punctuation) in the paragraph, skipping those in the banned list.
- **Step 1:** Normalize the input: lowercase all letters and replace any non-letter with a space, then split into words.
- **Step 2:** Count each word's frequency using a hash map (dictionary).
- **Step 3:** Store banned words in a set for quick lookups.
- **Step 4:** Find the word with the **highest count** that's **not banned**.
- **Optimization trade-offs:**  
    - Using a set for banned words gives O(1) lookups per word.
    - A single pass to build the frequency count, and a second pass to find the max, is acceptable for interview scope.
    - For edge cases involving punctuation, using regular expressions or careful character processing ensures accuracy.
- Brute-force idea of comparing each word with the banned list repeatedly is slow (O(n × b)), so the set-based solution is preferable.

### Corner cases to consider  
- Paragraph contains only banned words except one.
- Multiple punctuation marks between/around words.
- Consecutive spaces or empty paragraph (guaranteed at least one valid word).
- Paragraph contains words with different capitalization ("Ball" and "ball").
- Banned list is empty.
- All words in the paragraph are the same.
- Paragraph contains no punctuation.

### Solution

```python
def mostCommonWord(paragraph, banned):
    # Convert banned to set for fast lookup
    banned_set = set(word.lower() for word in banned)
    
    # Convert paragraph to lowercase, replace non-letter with spaces
    cleaned = []
    for ch in paragraph:
        if ch.isalpha():
            cleaned.append(ch.lower())
        else:
            cleaned.append(' ')
    cleaned_str = ''.join(cleaned)
    
    # Split paragraph into words
    words = cleaned_str.split()
    
    # Count the frequency of each non-banned word
    freq = {}
    for word in words:
        if word not in banned_set:
            if word in freq:
                freq[word] += 1
            else:
                freq[word] = 1
    
    # Find the word with maximum frequency
    max_count = 0
    answer = ''
    for word in freq:
        if freq[word] > max_count:
            max_count = freq[word]
            answer = word
    
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the length of the paragraph and m is the total number of words.  
    - Scanning the paragraph and splitting by spaces: O(n)
    - Inserting and lookup in dictionary and set are O(1) per operation on average.
- **Space Complexity:** O(m + b), where m is the number of unique words and b is the size of the banned list.
    - Additional space for the frequency dictionary, the banned word set, and the cleaned word list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the paragraph is extremely large (e.g., streaming words)?
  *Hint: Can you process and count words on the fly, without holding the entire paragraph in memory?*

- What if banned words list is very large (millions of entries)?
  *Hint: How would your solution change in terms of lookup speed and memory usage?*

- How would you handle ties, if there's a possibility for multiple most frequent words?
  *Hint: Would you return all such words or pick any one?*

### Summary
This approach follows the classic **hash map counting** pattern, with attention to string normalization and set lookup optimizations.  
This general technique is widely applicable in problems involving **word frequency counts**, **filtering with exclusions**, and **case-insensitive, punctuation-robust text processing**—common in document analysis, spam filtering, and similar tasks.