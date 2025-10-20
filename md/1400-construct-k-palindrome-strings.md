### Leetcode 1400 (Medium): Construct K Palindrome Strings [Practice](https://leetcode.com/problems/construct-k-palindrome-strings)

### Description  
Given a string **s** and an integer **k**, return **True** if it is possible to construct exactly **k** non-empty palindrome strings using all the characters in **s**, otherwise return **False**. Each character in **s** must be used exactly once.

### Examples  
**Example 1:**  
Input: `s = "annabelle", k = 2`
Output: `True`
*Explanation: Possible palindrome partitions: "anna"+"elble", etc. Each can be a palindrome.*

**Example 2:**  
Input: `s = "leetcode", k = 3`
Output: `False`
*Explanation: At least one group cannot be a palindrome using all letters.*

**Example 3:**  
Input: `s = "true", k = 4`
Output: `True`
*Explanation: Each group is a palindrome with one letter ("t", "r", "u", "e").*

### Thought Process (as if you’re the interviewee)  
- In a palindrome, at most one letter can have odd count per string.
- To build k palindrome strings from all letters, you need at least as many palindrome centers as the number of odd-count letters in s, and k must not be more than len(s) (you can't create more palindromes than letters).
- So: If number of odd-count letters ≤ k ≤ len(s), it is possible.

### Corner cases to consider  
- All letters have even count (can build 1 palindrome)
- k == len(s) (each letter is its own palindrome)
- k > len(s) (impossible)
- s is empty

### Solution

```python
def canConstruct(s, k):
    from collections import Counter
    if k > len(s):
        return False
    odd_count = sum(v % 2 for v in Counter(s).values())
    return odd_count <= k
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), n = len(s), single pass to count frequencies
- **Space Complexity:** O(1), since char counts are over fixed alphabet

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want to count the number of possible constructions?  
  *Hint: Requires combinatorics, more complicated than simple feasibility.*

- Return all possible partitions explicitly?  
  *Hint: Exponential; use backtracking for small cases.*

- What if unused letters are allowed?  
  *Hint: Ignore participation requirement, check feasibility per group.*

### Summary
This problem tests knowledge about palindrome composition from character counts, especially odd/even letter frequencies. A useful reduction to parity and feasibility.


### Flashcard
To construct k palindrome strings from s, count letters with odd frequency; it’s possible if odd-count letters ≤ k ≤ len(s).

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Counting(#counting)

### Similar Problems
