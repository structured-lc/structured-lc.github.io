### Leetcode 1745 (Hard): Palindrome Partitioning IV [Practice](https://leetcode.com/problems/palindrome-partitioning-iv)

### Description  
Given a string `s`, determine **if it can be partitioned into three non-empty palindromic substrings** (i.e., find two indices i and j such that 0 < i < j < n and all three substrings `s[0:i]`, `s[i:j]`, `s[j:n]` are palindromes).  
Return `True` if possible, else `False`.  
A palindrome is a string that reads the same forwards and backwards.

### Examples  

**Example 1:**  
Input: `s = "abcbdd"`  
Output: `True`  
*Explanation: Possible partition: "a" | "bcb" | "dd". All three are palindromes.*

**Example 2:**  
Input: `s = "bcbddxy"`  
Output: `False`  
*Explanation: No way to split into three non-empty palindromic substrings.*

**Example 3:**  
Input: `s = "aaa"`  
Output: `True`  
*Explanation: "a" | "a" | "a". Each part is a palindrome.*

### Thought Process (as if you’re the interviewee)  
My first idea is to check every possible way to split the string into three non-empty parts.  
- There are (n-1 choose 2) ways: pick 0 < i < j < n for splits.
- For each split, check if all three substrings are palindromes.

Brute-force works for small n, but n can be up to 2000, so O(n³) is too slow.  
Optimize palindrome checking:
- Precompute a DP table is_palindrome[l][r]: whether s[l:r+1] is palindrome.
- is_palindrome[i][j] is True when s[i] == s[j] and is_palindrome[i+1][j-1] is True or (j - i < 2).

With this, checking whether s[a:b] is palindrome is O(1).  
Enumerate all (i, j) (nested loops):  
- 1 ≤ i < j < n  
- Check is_palindrome[i-1], is_palindrome[i][j-1], is_palindrome[j][n-1].  
Return True if possible.

This brings overall time to O(n²):  
- O(n²) for DP precompute  
- O(n²) for O(1) queries in double loop.

### Corner cases to consider  
- Short strings (length < 3): never possible, must return False.  
- All same letter: "aaaa", should succeed.  
- Substrings overlap or empty: must ensure all three are non-empty and partitions split.  
- Palindromes at the end or start.  
- Repetitions, e.g., "abaaba", "abbaabb".

### Solution

```python
def checkPartitioning(s: str) -> bool:
    n = len(s)
    # Minimum length required is 3 (for three non-empty parts)
    if n < 3:
        return False
    
    # Precompute is_palindrome[l][r]: True if s[l:r+1] is a palindrome
    is_palindrome = [[False] * n for _ in range(n)]
    
    for length in range(1, n + 1):          # length of substring
        for left in range(n - length + 1):
            right = left + length - 1
            if s[left] == s[right]:
                if length <= 2:
                    is_palindrome[left][right] = True
                else:
                    is_palindrome[left][right] = is_palindrome[left + 1][right - 1]
    
    # Try all splits: s[0:i], s[i:j], s[j:n]
    for i in range(1, n - 1):              # first cut after index i-1
        if not is_palindrome[0][i - 1]:
            continue
        for j in range(i + 1, n):          # second cut after index j-1
            if is_palindrome[i][j - 1] and is_palindrome[j][n - 1]:
                return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  - O(n²) to precompute all palindromic substrings (DP table).  
  - O(n²) for the double loop to check all possible partitions.  
- **Space Complexity:** O(n²), for the is_palindrome DP table (n × n booleans).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize for k palindromic partitions (not just 3)?  
  *Hint: Consider using recursion or DP with multiple partition points.*

- What if you needed to return all possible splits, not just determine existence?  
  *Hint: Think about backtracking to construct all combinations.*

- How could you speed up or memory-optimize the palindrome check for very large n?  
  *Hint: Consider on-the-fly checks, rolling hashes, or only storing needed diagonals of DP.*

### Summary
This problem follows the **palindromic substring partitioning pattern**, using DP for quick palindrome queries and nested loops to explore valid splits.  
The precomputation trick is common in palindromic partitioning and works well whenever multiple direct substring palindrome queries are required.  
Such patterns apply in k-partition palindrome problems, minimum cuts, and even dynamic partitioning scenarios.


### Flashcard
Precompute 2D DP table isPalindrome[i][j] for all substrings; enumerate all valid split points (i,j) where 0<i<j<n and check if all three parts are palindromes.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Palindrome Partitioning(palindrome-partitioning) (Medium)
- Palindrome Partitioning II(palindrome-partitioning-ii) (Hard)
- Palindrome Partitioning III(palindrome-partitioning-iii) (Hard)
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)