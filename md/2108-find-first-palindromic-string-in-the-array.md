### Leetcode 2108 (Easy): Find First Palindromic String in the Array [Practice](https://leetcode.com/problems/find-first-palindromic-string-in-the-array)

### Description  
Given an array of strings, return the **first string that is a palindrome**.  
A *palindrome* is a string that reads the same forwards and backwards (e.g., "ada", "racecar").  
If there are no palindromic strings in the input, return the empty string `""`.  
The strings only contain lowercase letters.

### Examples  

**Example 1:**  
Input: `["abc","car","ada","racecar","cool"]`  
Output: `"ada"`  
*Explanation: "ada" is the first string that reads the same forwards and backwards. "racecar" is also a palindrome but not the first.*

**Example 2:**  
Input: `["notapalindrome","racecar"]`  
Output: `"racecar"`  
*Explanation: The first and only palindrome is "racecar".*

**Example 3:**  
Input: `["def","ghi"]`  
Output: `""`  
*Explanation: No strings in the array are palindromic, so we return the empty string.*

### Thought Process (as if you’re the interviewee)  

- To solve the problem, I'll check each string one by one to see if it is a palindrome.
- For each string, compare the characters from the start and the end, moving towards the middle, checking for mismatches.
- As soon as I find the first palindrome, I will return it.
- If I finish checking all strings and none are palindromic, I'll return the empty string "".
- Brute-force checking is acceptable here since input constraints are small (up to 100 words, each up to 100 letters).
- There's no meaningful optimization beyond direct checking unless the constraints were much larger.  
- I'll avoid using shortcuts like Python's slicing for palindrome check, and instead use two pointers for a typical interview setting.

### Corner cases to consider  
- Empty input array (though constraints guarantee at least one word)
- Only one string in the array, which may or may not be a palindrome
- All strings are non-palindromic
- The first string itself is a palindrome
- Strings of length 1 are always palindromic
- Strings with all same characters ("aaa")

### Solution

```python
def firstPalindrome(words):
    # Helper function to check if a string is a palindrome
    def is_palindrome(s):
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True

    # Iterate through the array, returning the first palindrome
    for word in words:
        if is_palindrome(word):
            return word

    # No palindromic string found
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × l)  
  Where n = number of words, l = maximum length of a word.  
  For each word, we check at most l/2 pairs of characters. So in worst case, we check every word fully.
- **Space Complexity:** O(1)  
  No extra storage is used beyond a few variables; output does not need to store or return extra data. (If you consider the call stack and input, it's O(1) extra.)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if you had to return **all** palindromic strings, not just the first?
  *Hint: Instead of returning on the first found, collect all palindromic words in a list.*

- How would you solve it if the input list was **very large** (millions of entries)?
  *Hint: Approach stays similar; but consider early returns, memory streaming, or even parallelization if words are large.*

- Can you optimize palindrome checking further if the majority of strings are very short or share characters?
  *Hint: For short strings, current method is already efficient. For repeated words, consider hashing or memoization.*

### Summary
This problem is a direct application of the **two pointers** technique for checking palindromes and highlights a standard loop-based array search. Brute-force is acceptable due to constraints. The two-pointers pattern used here is foundational for many string and array problems, and the edge-case checks are a common part of robust string processing.


### Flashcard
For each string, check if it equals its reverse; return the first palindromic string found.

### Tags
Array(#array), Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Valid Palindrome(valid-palindrome) (Easy)