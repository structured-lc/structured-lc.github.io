### Leetcode 5 (Medium): Longest Palindromic Substring [Practice](https://leetcode.com/problems/longest-palindromic-substring)

### Description  
Given a string `s`, find and return the **longest substring** of `s` that is a palindrome (the substring reads the same backward as forward).  
If there are multiple results, return the one that appears **first**.  
You may assume `s` consists only of ASCII characters.

### Examples  

**Example 1:**  
Input: `s = "babad"`  
Output: `"bab"`  
*Explanation: The substring "bab" is a palindrome. "aba" is also a valid answer since it has the same length, but "bab" appears first.*

**Example 2:**  
Input: `s = "cbbd"`  
Output: `"bb"`  
*Explanation: The substring "bb" is a palindrome. No longer palindromes exist in this string.*

**Example 3:**  
Input: `s = "forgeeksskeegfor"`  
Output: `"geeksskeeg"`  
*Explanation: The substring "geeksskeeg" is the longest palindrome in the string.*

### Thought Process (as if you’re the interviewee)  

First, I’d try a brute-force solution:  
- For every possible substring, check if it’s a palindrome.
- Track the longest one found so far.

But this is **O(n³)**:  
- There are O(n²) substrings, and each palindrome check is O(n).  
- Too slow for large input.

**Can we do better?**

Yes—there are two classic approaches:

- **Dynamic Programming:**  
  - Use a 2D table `dp[i][j]` to store if `s[i:j+1]` is a palindrome.
  - Fill in the table from small substrings to larger.
  - If s[i] == s[j] and the inside substring is palindrome, then s[i:j+1] is palindrome.
  - **O(n²)** time, **O(n²)** space.

- **Expand Around Center (Optimal):**  
  - For each character (and each pair between characters), treat as possible palindrome center.  
  - Expand outwards while characters match.  
  - There are 2n-1 centers: n for singles, n-1 for pairs.
  - At each center, check how far you can expand and update the longest found.
  - **O(n²)** time, but **O(1)** space.

The **Expand Around Center** method is simple and efficient for this problem.  
I’ll implement that.

### Corner cases to consider  
- Empty string: should return `""`.
- String of length 1: should return itself.
- All characters are the same: whole string is palindrome.
- No palindrome longer than 1: return any single character.
- Multiple palindromes with same max length: should return first one.
- Palindrome at start or end of string.

### Solution

```python
def longestPalindrome(s: str) -> str:
    # Return empty if string is empty
    if not s:
        return ""
    n = len(s)
    start = 0     # start index of longest palindrome found
    max_len = 1   # length of longest palindrome

    def expand_from_center(left: int, right: int) -> None:
        nonlocal start, max_len
        # Expand as long as the current substring is a palindrome
        while left >= 0 and right < n and s[left] == s[right]:
            cur_len = right - left + 1
            if cur_len > max_len:
                start = left
                max_len = cur_len
            left -= 1
            right += 1

    for i in range(n):
        # Odd length palindromes (single character center)
        expand_from_center(i, i)
        # Even length palindromes (two character center)
        expand_from_center(i, i+1)

    return s[start:start + max_len]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For every character, we might expand across full string (for each center O(n), total O(n²)).

- **Space Complexity:** O(1)  
  We use a few variables, but no extra arrays or tables, so space stays constant.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find **all** palindromic substrings in the string?  
  *Hint: Try recording results of all expanses, not just the longest.*

- Can you solve it with **less time complexity**?  
  *Hint: There is a linear time algorithm using Manacher’s algorithm.*

- Can you do it **in-place** with minimal extra space if you can modify the string?  
  *Hint: Try using only indices, not extra structures.*

### Summary
This problem lets us practice the **expand-around-center** pattern, a common approach to substring and subarray search, especially for palindromes.  
The dynamic programming variant is also standard for such substring problems.  
This approach also hints at techniques used in other string problems (e.g., word breaks, palindromic partitioning, or even longest common substring).  
The center-expansion method is an efficient, easy-to-code pattern that’s broadly applicable to palindrome substring variants.


### Flashcard
Expand around each center (character or gap) to find the longest palindrome in O(n²) time.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Shortest Palindrome(shortest-palindrome) (Hard)
- Palindrome Permutation(palindrome-permutation) (Easy)
- Palindrome Pairs(palindrome-pairs) (Hard)
- Longest Palindromic Subsequence(longest-palindromic-subsequence) (Medium)
- Palindromic Substrings(palindromic-substrings) (Medium)
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)