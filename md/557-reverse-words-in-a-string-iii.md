### Leetcode 557 (Easy): Reverse Words in a String III [Practice](https://leetcode.com/problems/reverse-words-in-a-string-iii)

### Description  
Given a sentence, reverse the characters of every word in the string **individually**, but keep the words in their original order and preserve spaces between them. Words are sequences of non-space characters separated by single spaces, and there are no additional spaces at the start or end of the sentence or between words.

### Examples  

**Example 1:**  
Input: `"Let's take LeetCode contest"`  
Output: `"s'teL ekat edoCteeL tsetnoc"`  
*Explanation: Each word in the sentence is reversed in place:  
- "Let's" → "s'teL"  
- "take" → "ekat"  
- "LeetCode" → "edoCteeL"  
- "contest" → "tsetnoc"*  

**Example 2:**  
Input: `"God Ding"`  
Output: `"doG gniD"`  
*Explanation: "God" → "doG", "Ding" → "gniD", order of words and spaces remains the same.*

**Example 3:**  
Input: `"a b"`  
Output: `"a b"`  
*Explanation: Each word is a single character, so reversal doesn't change them.*

### Thought Process (as if you’re the interviewee)  
To solve this, first, **split the sentence on spaces** to get each word individually. Then, for each word, **reverse its characters**. Finally, **join the reversed words back together** with single spaces.  
- **Brute-force idea:** Use built-in string split and join to handle splitting/rejoining, and a simple reverse using two-pointer swapping or list slicing for each word.
- **Optimize:** Instead of using split and join (which create extra arrays/lists), could process the string in place if mutability is allowed (e.g. in C/C++/Java with char arrays).  
- Chose to split/join for clarity and simplicity in Python, since the input string is immutable.

Trade-off: The split/join solution is easier to write and reason about but temporarily uses more memory for the list of words and their reversals, as opposed to an in-place reversal approach.

### Corner cases to consider  
- Input is an **empty string**: Output should also be `""`.
- Input is a **single word**.
- **Single letter words**.
- No words (just spaces; but constraints say spaces are between, not at ends).
- **Words with punctuation** or mixed case.
- Very **long words**.

### Solution

```python
def reverseWords(s: str) -> str:
    # Result list to build reversed words
    result = []
    n = len(s)
    i = 0

    while i < n:
        start = i
        # Move i to the end of the current word
        while i < n and s[i] != ' ':
            i += 1
        # Reverse the word from start to i-1
        word = s[start:i]
        reversed_word = ''
        for j in range(len(word) - 1, -1, -1):
            reversed_word += word[j]
        result.append(reversed_word)
        # Skip the space
        if i < n and s[i] == ' ':
            result.append(' ')
            i += 1

    # Join list into a final string
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the input string, because each character is visited a constant number of times during the reversal process.
- **Space Complexity:** O(N), since we construct a new result string with the same size as the input, plus a small amount of extra space for word reversals.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reverse words **in place** if you could edit the string as an array?
  *Hint: Use two pointers to reverse each word in the array directly.*
- What if there could be **multiple spaces** between words, or leading/trailing spaces?
  *Hint: Adjust your logic to handle extra space and use strip/split carefully.*
- Can you do it with **O(1) extra space** if the input were mutable?
  *Hint: Reuse the input array, reversing parts directly without extra copies.*

### Summary
This approach is a classic **string manipulation** problem that can be solved with **split, loop, and combine**—a canonical usage of string traversal and the two pointers pattern for in-place reversal. It's commonly seen in interview settings to check a candidate's attention to detail, comfort with string APIs, and boundary case handling. Variations show up in text formatting, log parsing, and natural language processing.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Reverse String II(reverse-string-ii) (Easy)