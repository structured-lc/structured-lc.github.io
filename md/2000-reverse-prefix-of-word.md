### Leetcode 2000 (Easy): Reverse Prefix of Word [Practice](https://leetcode.com/problems/reverse-prefix-of-word)

### Description  
You are given a 0-indexed string **word** and a character **ch**.  
The task is to **reverse the prefix** of the string **word**—starting from index 0 **up to and including** the first occurrence of character **ch**.  
- If **ch** is not present in **word**, return **word** unchanged.  
For example: If word = "abcdefd", ch = "d" ⇒ reverse "abcd" ⇒ "dcbaefd".

### Examples  

**Example 1:**  
Input: `word = "abcdefd", ch = "d"`  
Output: `"dcbaefd"`  
*Explanation: The first "d" is at index 3. Reverse word[0:4] ("abcd") ⇒ "dcba". Attach the rest ("efd") ⇒ "dcbaefd".*

**Example 2:**  
Input: `word = "xyxzxe", ch = "z"`  
Output: `"zxyxxe"`  
*Explanation: The first "z" is at index 2. Reverse word[0:3] ("xyx")→"zyx", add rest ("xe") ⇒ "zxyxxe".*

**Example 3:**  
Input: `word = "abcd", ch = "z"`  
Output: `"abcd"`  
*Explanation: "z" is not in "abcd". Word is unchanged.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Start from index 0, loop through word until you find the first occurrence of **ch**. If not found, return the original string.  
  If found at index **i**, reverse word[0:i+1], then concatenate with word[i+1:].

- **Optimal/Standard:**  
  - One pass to find the first **ch** (O(n)).  
  - Reverse prefix efficiently (can use stack, extra string, or in-place with character array).  
  - Fastest in Python is just slicing: word[:i+1][::-1] + word[i+1:].

- **Trade-offs:**  
  - Most space-efficient in-place for very large strings (using a char array).
  - For interviews with immutable strings (like in Python), slicing is clean and sufficient.

### Corner cases to consider  
- **ch is not present** in word ⇒ return original.
- **ch is the first character** ⇒ only the first char reversed ⇒ word unchanged.
- **ch is the last character** ⇒ whole string reversed.
- **word is empty** ⇒ always return empty.
- **word consists solely of ch** or repeated ch—only reverse up to first occurrence.
- **Single character word** (either matches ch or does not).

### Solution

```python
def reversePrefix(word: str, ch: str) -> str:
    # Find the index of the first occurrence of ch
    idx = -1
    for i in range(len(word)):
        if word[i] == ch:
            idx = i
            break

    # If ch not found, return the word unchanged
    if idx == -1:
        return word

    # Reverse word from 0 to idx (inclusive), append the rest unchanged
    reversed_prefix = ""
    for j in range(idx, -1, -1):
        reversed_prefix += word[j]

    return reversed_prefix + word[idx+1:]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Finding the first occurrence is O(n). Reversing up to that index (worst-case, entire string) is also O(n).

- **Space Complexity:** O(n)  
  New string for the reversed prefix plus the original rest (since strings are immutable in Python).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to reverse the prefix for every occurrence of ch, not just the first?  
  *Hint: Consider breaking and resuming reversal in segments after each occurrence.*

- How would you handle very large input efficiently?  
  *Hint: Think about in-place reversal using a character array for better space usage.*

- Can you do this in a language where strings are mutable?  
  *Hint: Think about swapping characters in a char array instead of string slicing.*

### Summary
This is a classic string manipulation problem that tests the ability to locate an index and reverse part of a string—common in interviews. The approach uses the "find-part-reverse-concatenate" pattern, and the optimal method in Python leverages string slicing and reversal.  
This pattern appears frequently, for example in palindrome checking, substring reversals, and sliding window problems.