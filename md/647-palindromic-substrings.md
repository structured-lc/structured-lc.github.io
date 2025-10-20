### Leetcode 647 (Medium): Palindromic Substrings [Practice](https://leetcode.com/problems/palindromic-substrings)

### Description  
Given a string s, count how many substrings of s are palindromic.  
A *palindromic substring* is a substring that reads the same forward and backward (for example, "racecar" or any single character). Every substring must be contiguous. Return the total number of such substrings in the given input string.

### Examples  

**Example 1:**  
Input: `s = "abc"`  
Output: `3`  
*Explanation: Each character is a palindrome on its own: "a", "b", "c" (substrings of length 1). No longer substrings are palindromic.*

**Example 2:**  
Input: `s = "aaa"`  
Output: `6`  
*Explanation: The following substrings are palindromes: "a" (all 3 occurrences), "aa" (start at index 0 and 1), and "aaa". The palindromic substrings are: "a", "a", "a", "aa", "aa", "aaa".*

**Example 3:**  
Input: `s = "abba"`  
Output: `6`  
*Explanation: The palindromic substrings are "a", "b", "b", "a", "bb", and "abba".*  

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to try every possible substring (start and end indices), check if each is a palindrome (by comparing its characters front and back). This approach checks O(n²) substrings, and each substring check could be O(n). So, total time could be O(n³).

However, that's inefficient. Observing that palindromes expand symmetrically from the center, we realize every palindrome can be found by *expanding around centers*:  
- Every character (for odd-length palindromes)  
- Every gap between adjacent characters (for even-length palindromes)  

For each center, expand outward while s[left] == s[right], incrementing a counter for each successful expansion. This gives O(n²) time and O(1) space, which is much better.

There is also a dynamic programming approach:  
Let dp[i][j] = True if the substring s[i...j] is a palindrome.  
- Fill dp such that dp[i][j] = (s[i] == s[j]) and (j - i < 3 or dp[i+1][j-1])  
But this uses O(n²) space, while expand-around-center is O(1) space.

I choose the expand-around-center method. It is intuitive, less error-prone, space-efficient, and easy to implement.

### Corner cases to consider  
- Empty string (problem constraints say at least length 1, so not needed)
- All characters the same: e.g., "aaaaa"
- No palindromic substrings longer than 1: "abcd"
- Palindrome in the middle: "abccba"
- String with only two characters: "aa", "ab"
- Odd and even length palindromes

### Solution

```python
def countSubstrings(s: str) -> int:
    # Helper to expand around center and count valid palindromes
    def expand(left: int, right: int) -> int:
        count = 0
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1    # substring s[left:right+1] is a palindrome
            left -= 1
            right += 1
        return count

    n = len(s)
    res = 0
    for center in range(n):
        # Odd length palindromes (single character center)
        res += expand(center, center)
        # Even length palindromes (between this and next character)
        res += expand(center, center + 1)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), because for each of n centers, in the worst case we expand out for O(n) characters.
- **Space Complexity:** O(1) extra space, since we are not using additional arrays or storage, only counters and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to list all palindromic substrings, not just count them?  
  *Hint: Store or print each valid substring during the expand step.*

- What if the string is very long and you can’t use O(n²) time?  
  *Hint: Consider Manacher’s Algorithm (linear time for longest palindromic substring, but more complex).*

- How would you modify the solution if you wanted only distinct palindromic substrings?  
  *Hint: Store found substrings in a set during the expand.*

### Summary  
This is a classic **expand-around-center** problem: for each position (and gap), expand outward to discover palindromic substrings.  
The expand-center pattern is efficient for problems involving palindromic substrings or substrings with symmetry, and is frequently used in other palindrome or substring-related problems. For distinct substrings, use a set; for listing substrings, collect them in a list during expansion.


### Flashcard
Expand around each center (character or gap) to count palindromic substrings in O(n²) time.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Palindromic Substring(longest-palindromic-substring) (Medium)
- Longest Palindromic Subsequence(longest-palindromic-subsequence) (Medium)