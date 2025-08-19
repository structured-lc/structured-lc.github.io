### Leetcode 2114 (Easy): Maximum Number of Words Found in Sentences [Practice](https://leetcode.com/problems/maximum-number-of-words-found-in-sentences)

### Description  
Given an array of strings, where each string is a well-formed sentence (words separated by single spaces, no leading/trailing spaces), return the maximum number of words present in any one sentence. The task is to efficiently determine which sentence contains the largest number of words.

### Examples  

**Example 1:**  
Input: `["alice and bob love leetcode", "i think so too", "this is great thanks very much"]`  
Output: `6`  
*Explanation: The first sentence has 5 words, the second has 4 words, and the third has 6 words. The maximum is 6.*

**Example 2:**  
Input: `["please wait", "continue to fight", "continue to win"]`  
Output: `3`  
*Explanation: Each sentence in this list has 2 or 3 words. The maximum is 3.*

**Example 3:**  
Input: `["a b c", "d e f g", "h"]`  
Output: `4`  
*Explanation: First has 3 words, second has 4 words, third has 1 word. Maximum is 4.*

### Thought Process (as if you’re the interviewee)  
First, I would iterate through each sentence and count the number of words. Since all words are separated by exactly one space and there are no leading/trailing spaces, the number of words in a sentence is `number of spaces + 1`. For each sentence, I track the highest word count seen so far and return that after iterating.  
A brute-force approach (splitting each sentence using `.split()`) is valid, but since split might use extra space, it’s slightly more efficient to just count spaces directly as we traverse the sentence. This saves memory and is acceptable because sentences are not long.

### Corner cases to consider  
- Single sentence in input
- Sentences of differing lengths
- All sentences have the same word count
- Sentence with only one word (no spaces)
- All sentences have minimum allowed length
- Maximum number of sentences (up to 100), each of maximum length (up to 100)

### Solution

```python
def mostWordsFound(sentences):
    max_words = 0
    # Iterate over each sentence in the list
    for sentence in sentences:
        word_count = 1  # Start with one word
        # Count spaces, as each space separates two words
        for c in sentence:
            if c == ' ':
                word_count += 1
        # Update the max_words if this sentence has more words
        if word_count > max_words:
            max_words = word_count
    return max_words
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of characters across all sentences. Each character is checked exactly once.
- **Space Complexity:** O(1), as only a few integer variables are used for counting, with no additional storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some sentences contain extra spaces or have irregular spacing?  
  *Hint: How would you handle edge cases with multiple spaces or leading/trailing spaces?*

- How would you adapt your approach for sentences in different languages or with different separators?  
  *Hint: Consider unicode, punctuation, or other breaking rules.*

- Can you solve this in a streaming fashion if input is very large and cannot fit in memory?  
  *Hint: Process sentences one at a time, keeping only the max seen so far.*

### Summary
This problem uses the **counting pattern** – iterating through each element and keeping a running maximum. It’s a classic string manipulation scenario where minimal parsing suffices due to the input’s guaranteed formatting. Similar logic can be used for problems involving splitting or counting substrings, tokens, or features in strings or arrays.

### Tags
Array(#array), String(#string)

### Similar Problems
- Number of Valid Words in a Sentence(number-of-valid-words-in-a-sentence) (Easy)