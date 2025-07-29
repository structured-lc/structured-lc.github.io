### Leetcode 214 (Hard): Shortest Palindrome [Practice](https://leetcode.com/problems/shortest-palindrome)

### Description  
Given a string **s**, you must construct the shortest palindrome by adding characters *in front* of s. You can only prepend (add at the very beginning) any number of characters. Return the shortest palindrome you can get by this method.

In other words:  
- You are only allowed to add characters at the start of **s**.
- The resulting string must be a palindrome (reads the same forwards and backwards).
- Among all possible palindromic extensions, you should return the one with the least characters added.

### Examples  

**Example 1:**  
Input: `aacecaaa`  
Output: `aaacecaaa`  
*Explanation: 'aacecaaa' itself is not a palindrome. By adding 'a' in front, we get 'aaacecaaa', which is the shortest palindrome possible.*

**Example 2:**  
Input: `abcd`  
Output: `dcbabcd`  
*Explanation: The longest palindromic prefix is 'a'. To make the whole string a palindrome, prepend the reverse of the rest ('bcd' → 'dcb'). Result: 'dcbabcd'.*

**Example 3:**  
Input: `racecar`  
Output: `racecar`  
*Explanation: The whole string is already a palindrome. Nothing to add.*

### Thought Process (as if you’re the interviewee)  
Let's step through how to solve this:

- **Brute Force:** Start with the whole string and keep checking if s[0:n], s[0:n-1], ..., s[0:1] is a palindrome. For the longest prefix that is a palindrome, reverse the remaining suffix and prepend it. This is O(n²), since checking palindrome for each prefix can be O(n).

- **Optimized Approach (KMP or Hashing):**
  - The problem reduces to finding the *longest palindromic prefix* of **s**.
  - Once you have that, reverse the *remaining suffix* and prepend it.
  - To do this efficiently:
      - **KMP-based:** Build string `s + "#" + reverse(s)` and compute its prefix function (failure table). The last value of the table tells you the length of the palindromic prefix.
      - **Hash-based:** Compute rolling hashes of prefix and suffix for all lengths and find the largest for which hash(prefix) == hash(suffix), i.e., the longest prefix that serves as a palindrome[2].

This approach is O(n) with KMP or smart hashing.

### Corner cases to consider  
- Empty string (`""`)
- String already palindromic
- All characters are the same
- Single character input
- Palindrome prefix but not the whole string (e.g., `abacd`)
- Even and odd length strings

### Solution

```python
def shortestPalindrome(s: str) -> str:
    # KMP preprocessing: combine s + '#' + reversed s
    new_s = s + '#' + s[::-1]
    n = len(new_s)
    lps = [0] * n  # lps[i] = length of the longest prefix which is also suffix
    
    # Build lps for new_s
    for i in range(1, n):
        j = lps[i - 1]
        while j > 0 and new_s[i] != new_s[j]:
            j = lps[j - 1]
        if new_s[i] == new_s[j]:
            j += 1
        lps[i] = j

    # lps[-1] is the length of longest palindromic prefix in s
    to_add = s[lps[-1]:][::-1]
    return to_add + s

# Example usage:
# print(shortestPalindrome("abcd"))       # Output: "dcbabcd"
# print(shortestPalindrome("aacecaaa"))   # Output: "aaacecaaa"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of **s**. We're building an lps array for a string of length 2n+1. All operations in the KMP process are linear.
- **Space Complexity:** O(n), mainly for the lps array and the concatenated string used for the algorithm. We also create at most a new string of size n in the output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle palindromes if you could insert characters *anywhere* in s (not just in front)?
  *Hint: Try dynamic programming for minimum insertions to make a palindrome.*

- Can you do this in-place with O(1) extra space?
  *Hint: Consider if you could store prefix information within the string, or use pointers.*

- What if you had millions of queries for different strings, and performance is critical?
  *Hint: Think about precomputing or using efficient string matching data structures.*

### Summary
This problem is a classic example of **string matching and pattern finding**, often used to illustrate the power of the KMP algorithm in non-obvious settings. The key trick is to recognize the need for finding the **longest palindromic prefix**, which can be solved efficiently. This reduction—connecting palindrome structure to prefix-suffix matches—is a valuable technique in problems related to palindromes, string transformation, and minimal extension. The KMP failure table/prefix array is a recurring pattern for substring overlap and duplication detection.