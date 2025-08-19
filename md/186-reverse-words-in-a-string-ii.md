### Leetcode 186 (Medium): Reverse Words in a String II [Practice](https://leetcode.com/problems/reverse-words-in-a-string-ii)

### Description  
You are given a list of characters representing a sentence where words are separated by single spaces and there are no leading or trailing spaces. Reverse the order of the words *in-place* so that the words appear in reverse order, but the letters within each word remain in the correct order.  
You must perform the reversal without allocating extra space for another array.

### Examples  

**Example 1:**  
Input: `["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]`  
Output: `["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]`  
*Explanation: Entire array is reversed to get "eulb si yks eht", then each word is reversed individually to get "blue is sky the".*

**Example 2:**  
Input: `["a"," ","b"]`  
Output: `["b"," ","a"]`  
*Explanation: Reverse whole array to get "b a", then "b" and "a" are already valid words.*

**Example 3:**  
Input: `["o","n","e"]`  
Output: `["o","n","e"]`  
*Explanation: Only one word, so reversing order does nothing.*

### Thought Process (as if you’re the interviewee)  
First, I note the problem's *in-place* requirement: I cannot use extra arrays or significant additional space, so I need an O(1) space solution, working directly on the given character array.

A natural brute-force idea is:
- Identify all words,
- Move them around one by one,
- This would be complicated and error-prone due to shifting elements and managing indices.

A better way:  
- Reverse the whole array. This puts the words in their "reverse order," but also reverses the characters in each word.
- Then, for each word (located by its boundaries, determined by spaces), reverse its characters to restore original order.
- This two-step approach preserves O(1) space, is simple to implement with helper functions, and is easy to debug.

Trade-offs:  
- This is optimal because each character is read and written a constant number of times.  
- Other approaches might not be in place or could be messier with indices.

### Corner cases to consider  
- The input is empty (`[]`)
- Only one word, no spaces
- Two words
- All words are a single character
- Very long word(s)
- Multiple spaces (not allowed per constraints, but worth checking)
- Trailing or leading spaces (also not allowed per problem)

### Solution

```python
def reverseWords(s):
    # Helper to reverse elements between l and r (inclusive)
    def reverse(arr, l, r):
        while l < r:
            arr[l], arr[r] = arr[r], arr[l]
            l += 1
            r -= 1

    n = len(s)
    if n == 0:
        return

    # 1. Reverse the entire array
    reverse(s, 0, n - 1)

    # 2. Reverse each word in place
    start = 0
    for i in range(n + 1):
        # At end or at a space--end of word
        if i == n or s[i] == ' ':
            reverse(s, start, i - 1)
            start = i + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Each character is reversed a constant number of times (twice).
- **Space Complexity:** O(1), since the reversals are performed in-place and only a few variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple spaces between words?  
  *Hint: How could you handle the extra spaces while reversing?*

- What if the input could have leading or trailing spaces?  
  *Hint: Consider pre-processing or changing how word boundaries are detected.*

- Could you generalize this to work for sentences with punctuation?  
  *Hint: Define clearly what a "word" is, then adjust the word boundary detection accordingly.*

### Summary  
This problem uses the two-pass reversal approach: reverse the whole character array first, then reverse each word to restore their order. The technique is a classic example of *reverse-in-place* and *two-pointer* patterns, commonly applied in array and string manipulation problems to achieve O(1) space solutions; for example, it is similar to tasks that reverse subarrays, rotate arrays, or rotate strings.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Reverse Words in a String(reverse-words-in-a-string) (Medium)
- Rotate Array(rotate-array) (Medium)