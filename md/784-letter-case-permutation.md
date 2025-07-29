### Leetcode 784 (Medium): Letter Case Permutation [Practice](https://leetcode.com/problems/letter-case-permutation)

### Description  
Given a string `s`, you must generate all possible strings where each alphabetic character can be either lowercase or uppercase. Digits remain unchanged. Return all such permutations in any order.  
For example, if given "a1b2", the output should include all versions where 'a'/'A' and 'b'/'B' are toggled independently.

### Examples  

**Example 1:**  
Input: `a1b2`  
Output: `["a1b2", "a1B2", "A1b2", "A1B2"]`  
*Explanation: Each letter (a, b) can be lowercase or uppercase; digits remain the same. You end up with all permutations for those positions.*

**Example 2:**  
Input: `3z4`  
Output: `["3z4", "3Z4"]`  
*Explanation: Only the letter 'z' can toggle case. '3' and '4' are unchanged.*

**Example 3:**  
Input: `12345`  
Output: `["12345"]`  
*Explanation: No letters in the string, only digits. The only permutation is the original string.*

### Thought Process (as if you’re the interviewee)  
Start with brute-force: For each character in the input, if it’s a letter, branch into two options: lowercase and uppercase. For digits, continue with only one option.  
Backtracking (via DFS) easily builds all possibilities by recursing at each step, exploring both letter-case options where relevant, and accumulating final results.  
Alternatively, you can use an iterative approach (BFS/queue). However, DFS/backtracking is most straightforward and most common for permutation generation.  
Trade-off: Both recursive and iterative approaches yield O(2ʳ) possibilities, where r is the number of alphabetic characters. The recursive (backtracking) solution is concise, readable, and a typical pattern for these problems[1][2].

### Corner cases to consider  
- Empty string: Should return a list with an empty string.
- String with only digits (e.g., "123"): Only 1 permutation, original string.
- String with only letters ("abc"): All combinations, 2ⁿ permutations.
- Mixed letters and digits.
- Uppercase letters in input — check both 'A' and 'a' handled.
- Non-alphanumeric characters (should not be present per problem, but good to assume robustness).

### Solution

```python
from typing import List

def letterCasePermutation(s: str) -> List[str]:
    res = []

    def backtrack(i, path):
        if i == len(s):
            res.append(''.join(path))
            return
        if s[i].isalpha():
            # Choose lowercase
            path.append(s[i].lower())
            backtrack(i + 1, path)
            path.pop()

            # Choose uppercase
            path.append(s[i].upper())
            backtrack(i + 1, path)
            path.pop()
        else:
            path.append(s[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ʳ × n), where r is the number of letters (since each letter could be two options, and for each, we may build a string of length n).
- **Space Complexity:** O(2ʳ × n) for storing results, and O(n) for the recursion stack (max call depth).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode case (e.g., accented letters)?  
  *Hint: Check the isalpha and lower/upper methods for behavior on Unicode characters.*

- How can you generate permutations lazily, yielding one at a time?  
  *Hint: Consider using Python generators with yield.*

- How would your approach change if you had to handle very large input strings?  
  *Hint: Can you avoid storing all results in memory?*

### Summary
This problem is a classic use-case for **backtracking** — generating all possible combinations given toggling choices at specific positions. The permutation/backtracking pattern applies widely, including problems about combination generation, subsets, and string manipulation. Recursive construction is natural and clear for problems where each step involves independent binary choices.