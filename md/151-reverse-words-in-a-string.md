### Leetcode 151 (Medium): Reverse Words in a String [Practice](https://leetcode.com/problems/reverse-words-in-a-string)

### Description  
Given a string 𝑠, reverse the order of the **words** (a word is any sequence of non-space characters). The words in 𝑠 may be separated by multiple or irregular spaces, including leading or trailing spaces. You should return a string with:
- Words in **reverse order**
- **Single spaces** between words (no extra spaces before, after, or between)
Effectively, you are normalizing the string and reversing the sequence of its words.

### Examples  

**Example 1:**  
Input: `s = "the sky is blue"`  
Output: `"blue is sky the"`  
*Explanation: The words are reversed. No leading/trailing/multiple spaces were present.*

**Example 2:**  
Input: `s = "  hello world  "`  
Output: `"world hello"`  
*Explanation: There are extra spaces at the beginning and end, which are removed; the words are reversed.*

**Example 3:**  
Input: `s = "a   good   example"`  
Output: `"example good a"`  
*Explanation: Multiple spaces between words are replaced by a single space in the output, and words are reversed.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force Approach:**  
   - Parse the string, extract all words (ignore spaces).
   - Store the words in a **list** or array.
   - Reverse the list.
   - Join the reversed words with a single space.
   - This approach is easy and leverages built-in functionality (`split()`, `reverse()`, `join()` in Python), but you might be asked to avoid those in an interview.

2. **Without using Built-ins:**  
   - Manually parse the string:
     - Traverse from left to right, capturing characters into a current-word buffer.
     - On encountering a space after a non-empty buffer, add the buffer to a list.
     - Ignore consecutive spaces.
     - At the end, if the current buffer is non-empty, add it to the list.
   - Reverse the list of words and reconstruct the result string with single spaces.
   - **Trade-offs:** This method is more verbose but does not use extra space for splitting into words besides the list of words itself.

3. **Optimized Solution:**  
   - Both methods above are \(O(n)\) in time, where \(n\) is the length of the string.
   - With attention to minimizing extra space for processing.

I would typically choose the *parsing with a buffer* method in a real interview if built-ins are not allowed, as it demonstrates parsing logic and string handling skills.

### Corner cases to consider  
- Empty string: `s = ""` → Output: `""`
- String with only spaces: `s = "    "` → Output: `""`
- String with one word + spaces: `s = "   hello   "` → Output: `"hello"`
- Multiple consecutive spaces between words: e.g., `s = "a    b"`
- No spaces at all (already one word): `s = "word"`
- Leading and trailing spaces

### Solution

```python
def reverseWords(s: str) -> str:
    # Step 1: Parse words manually without using split() or strip()
    n = len(s)
    words = []
    i = 0

    while i < n:
        # Skip spaces
        while i < n and s[i] == ' ':
            i += 1
        if i >= n:
            break
        # Accumulate non-space chars as a word
        j = i
        while j < n and s[j] != ' ':
            j += 1
        words.append(s[i:j])
        i = j

    # Step 2: Reverse the list of words
    left, right = 0, len(words) - 1
    while left < right:
        words[left], words[right] = words[right], words[left]
        left += 1
        right -= 1

    # Step 3: Join with single space
    return ' '.join(words)
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(n)\)  
  Each character is visited at most twice: once when parsing words and once when joining. No nested loops over the input size.

- **Space Complexity:** \(O(n)\)  
  Space for the intermediate word list and the output string (proportional to the input length in the worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to reverse **characters** in each word as well?
  *Hint: Do another pass to reverse individual words before joining.*
- Can you achieve this **in-place** with \(O(1)\) auxiliary space if the input is a mutable character array?
  *Hint: Reverse entire string, then reverse each word in place.*
- How would your solution change for a **linked list of characters**?
  *Hint: You need extra logic to detect word boundaries.*

### Summary
This problem is a classic example of **string parsing and manipulation**. It tests the ability to extract substrings (words), handle spaces correctly, and reconstruct the result efficiently. The coding pattern is a mix of parsing and two-pointer technique for reversing the list. This approach can be reused in problems like word/substring reversal, normalizing text, and parsing tokens in strings.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Reverse Words in a String II(reverse-words-in-a-string-ii) (Medium)