### Leetcode 1849 (Medium): Splitting a String Into Descending Consecutive Values [Practice](https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values)

### Description  
Given a string `s` containing only digits, determine if you can split it into at least two non-empty substrings so that converting each to an integer gives a sequence of numbers in strictly descending order, with each number exactly one less than the previous (i.e., arr > arr[1] > arr[2] ... and arr[i] = arr[i-1] - 1 for all valid i). You can split anywhere, but cannot reorder or omit digits.

### Examples  

**Example 1:**  
Input: `s = "4321"`  
Output: `True`  
*Explanation: Split as "4", "3", "2", "1". Each number is exactly one less than the previous: 4→3→2→1.*

**Example 2:**  
Input: `s = "050043"`  
Output: `True`  
*Explanation: Split as "0500", "43". 500 - 43 = 457, so not valid. But split as "05", "00", "43": that's 5, 0, 43--not consecutive. But split as "50", "0", "43" => not valid. But split as "5", "4", "3" → works (leading zeros allowed as per the rules), 5→4→3.*

**Example 3:**  
Input: `s = "10009998"`  
Output: `True`  
*Explanation: Split as "100", "99", "98". Each value is exactly one less than the previous: 100→99→98.*

**Example 4:**  
Input: `s = "1234"`  
Output: `False`  
*Explanation: No way to split into at least two numbers so that each is exactly one less than the previous.*

### Thought Process (as if you’re the interviewee)  
- First, observe that we can split the string anywhere, so we should **try all possible splits** for the first number, then recursively check if the rest can be split so that each next value is prev - 1.
- Brute-force (backtracking):  
  For i in the range 1 to n-1 (first number's length, at least one char, at least one char left for rest):
    - Take s[0:i] as first.
    - Recursively check with s[i:] and prev = int(s[0:i]).
    - For each recursive call, try all possible splits for the next number.
    - Base case: If we reach the end and split into at least two parts, and all consecutive numbers decrease by 1, return True.
- Constraints allow this: n ≤ 16, so total splits are manageable.
- Tradeoffs:  
  DFS/backtracking is sufficient, no need to optimize further unless asked for a memoized solution for heavy testing.

### Corner cases to consider  
- String of length < 2 (can't split into two numbers)
- Leading zeros in numbers (allowed, as "01", "001").
- Strings with repeating digits like "1111".
- Inputs with rapidly increasing digits.
- Large values which can fit into Python’s int (as no explicit limits).

### Solution

```python
def splitString(s: str) -> bool:
    # Helper - recursive DFS
    def dfs(idx, prev, parts):
        # If we've reached the end, we must have at least two parts
        if idx == len(s):
            return parts >= 2
        num = 0
        for i in range(idx, len(s)):
            num = num * 10 + int(s[i])  # build number char by char
            if prev is None or num == prev - 1:
                # Try to use num as the next part
                if dfs(i + 1, num, parts + 1):
                    return True
        return False
    
    # Try all possible first splits
    return dfs(0, None, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ) in the worst case. For each position, recursively try all suffix splits, but short-circuits often. Acceptable since n ≤ 16.
- **Space Complexity:** O(n) — recursion stack and minor local vars, no large extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you track the actual splits (not just whether it’s possible)?  
  *Hint: Use an array to store split points or the resulting numbers during recursion; collect on base case.*

- What if the string could contain non-digit characters?  
  *Hint: Preprocess to skip/cleanse or adjust number-building logic to validate digits.*

- What if consecutive difference was allowed to be a custom k, not just 1?  
  *Hint: Pass k as a parameter; replace num == prev - 1 with num == prev - k in logic.*

### Summary
This problem uses a **recursive backtracking (DFS with backtracking) coding pattern**, trying all possible splits for a strictly defined relationship between segment values. This pattern is common when enumerating all ways to partition a string subject to number-based constraints (e.g., palindrome cuts, additive sequence). It’s efficient for small n due to early pruning and works well for strings up to moderate length.


### Flashcard
Try all possible splits for first number, recursively check if rest can form consecutive descending values.

### Tags
String(#string), Backtracking(#backtracking), Enumeration(#enumeration)

### Similar Problems
