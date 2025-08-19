### Leetcode 2957 (Medium): Remove Adjacent Almost-Equal Characters [Practice](https://leetcode.com/problems/remove-adjacent-almost-equal-characters)

### Description  
Given a string consisting of lowercase English letters, you must change the minimum number of characters so that no two adjacent characters are "almost-equal."  
Two characters are considered "almost-equal" if they are **the same letter** or **consecutive in the alphabet** (e.g., 'b' and 'c').  
For each operation, you can change any character to any lowercase English letter.  
Return the minimal number of operations needed to achieve the goal.

### Examples  

**Example 1:**  
Input: `word = "abccba"`  
Output: `2`  
*Explanation: "cc" is the same, and "bc" are consecutive. Change indices 2 and 4 (zero-based) so no pair remains almost-equal. For example, after changes: "abdcba".*

**Example 2:**  
Input: `word = "aabb"`  
Output: `2`  
*Explanation: Both "aa" and "bb" need changes. Change one in "aa" and one in "bb", e.g., "abab".*

**Example 3:**  
Input: `word = "azbycx"`  
Output: `0`  
*Explanation: No adjacent pair is almost-equal, so no operations are needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all ways of changing adjacent problematic pairs and count the minimum, but this is too slow due to exponential possibilities.

- **Greedy approach:**  
  - Go left to right through the string.
  - For every adjacent pair, check if they're almost-equal (either the same letter or consecutive, i.e., abs(ord(s[i]) - ord(s[i-1])) == 1 or 0).
  - If so, increment an operation counter since **one change can fix this pair**.
  - After fixing, skip to the next untangled character (because the current and next pair overlaps).
  - This works because fixing at position i affects (i, i-1) but not earlier, and skipping a check ensures minimum over-counting.  

- **Why Greedy and not DP:**  
  Each change only affects its own pair and the following, so greedily fixing at each conflict is always optimal by minimizing overlapping changes.

### Corner cases to consider  
- Empty string: `""` (should return 0)
- Single letter: `"a"` (should return 0)
- Entire string is the same character: `"aaaaa"` (should return ⌊n/2⌋)
- No adjacent conflicts: `"azbycx"`
- All adjacents are consecutive: `"abcdef"`

### Solution

```python
def removeAlmostEqualCharacters(word: str) -> int:
    n = len(word)
    res = 0
    i = 1

    while i < n:
        # Check if word[i] and word[i-1] are almost-equal
        if abs(ord(word[i]) - ord(word[i - 1])) <= 1:
            res += 1
            i += 2  # Skip the next character, because we've "fixed" the pair
        else:
            i += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the string once, incrementing i by either 1 or 2 each time; every adjacent pair is checked at most once.

- **Space Complexity:** O(1)  
  Only a few variables are used, and no extra storage scales with `n` (the input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string had both lowercase and uppercase letters?  
  *Hint: How do you define "almost-equal" in a case-insensitive context?*

- Could you output the final modified string too, not just the count?  
  *Hint: You’ll need to actually make a choice for character replacement at each step.*

- What if instead of being able to change to any letter you could only change to a set of letters for each position?  
  *Hint: Consider Dynamic Programming for per-position constraints.*

### Summary
This problem is a classic example of a **greedy string transformation**, where the configuration for each local adjacent pair can be fixed independently without affecting optimality. The greedy scan-and-fix method is frequently used in “string cleaning” or “local conflict resolution” problems, and applies whenever changes have only local effects with no long-distance dependencies.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Minimum Changes To Make Alternating Binary String(minimum-changes-to-make-alternating-binary-string) (Easy)