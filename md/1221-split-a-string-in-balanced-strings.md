### Leetcode 1221 (Easy): Split a String in Balanced Strings [Practice](https://leetcode.com/problems/split-a-string-in-balanced-strings)

### Description  
Given a string containing only the characters `'L'` and `'R'`, split the string into the maximum possible number of balanced substrings.  
A substring is **balanced** if it contains an equal number of `'L'` and `'R'`.  
Return the maximum number of balanced substrings you can split from the given string.

### Examples  

**Example 1:**  
Input: `s = "RLRRLLRLRL"`  
Output: `4`  
*Explanation: We can split into `"RL"`, `"RRLL"`, `"RL"`, `"RL"` — each substring contains the same number of `'L'` and `'R'`.*

**Example 2:**  
Input: `s = "RLLLLRRRLR"`  
Output: `3`  
*Explanation: We can split into `"RL"`, `"LLLRRR"`, `"LR"` — each substring contains the same number of `'L'` and `'R'`.*

**Example 3:**  
Input: `s = "LLLLRRRR"`  
Output: `1`  
*Explanation: We can split the entire string as `"LLLLRRRR"`, which is balanced.*

### Thought Process (as if you’re the interviewee)  

Start by understanding what a **balanced** substring is: a segment where the count of `'L'` and `'R'` are exactly equal.

**Brute-force**:  
Consider checking all possible splits, but this is inefficient and would involve checking many substrings. This approach would be too slow for long strings.

**Observation**:  
As we read the string from left to right, whenever the total number of `'L'` equals the total number of `'R'`, we can make a cut — because the substring up to that point is balanced. Hence, just scan the string, and use a balance counter — increment for `'L'`, decrement for `'R'` (or vice versa). Every time the balance returns to 0, we know we've found a balanced substring and can increment our answer.

**Trade-offs**:  
- Simple greedy approach: O(n) time, O(1) space.
- No extra allocations or unnecessary substring checks.

### Corner cases to consider  
- s is already balanced as a whole (one large substring).
- s contains alternating `'L'` and `'R'` (would yield maximum splits).
- All `'L'`s first, then all `'R'`s (only one split).
- Minimum valid length (s has length 2: e.g., `"LR"` or `"RL"`; should return 1).
- Imbalanced input is not possible per constraints, but if so, it should not yield any splits.

### Solution

```python
def balancedStringSplit(s: str) -> int:
    # 'balance' keeps track of net L vs R count
    # 'count' is count of balanced substrings found
    balance = 0
    count = 0

    for char in s:
        # increment for 'L', decrement for 'R'
        if char == 'L':
            balance += 1
        else:  # char == 'R'
            balance -= 1
        # whenever balance returns to 0, we found a balanced substring
        if balance == 0:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = s.length. We scan the string once.
- **Space Complexity:** O(1). We use only a couple of integer variables, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains characters other than `'L'` and `'R'`?  
  *Hint: How should you handle invalid/extra characters? Add validation or ignore them?*
  
- Can you solve this without an explicit balance variable?  
  *Hint: Could you use two separate counters (for `'L'` and `'R'`), and compare them?*

- What if you want to return the actual substrings instead of just their count?  
  *Hint: Track the starting index and store the substrings whenever a split is found.*

### Summary
This problem is a classic greedy pattern: make a decision whenever you have enough information (balance = 0) and proceed. The approach is simple, readable, and uses constant extra space. Similar greedy counters can be applied to problems involving substrings or intervals with balance conditions, such as parentheses matching or array balancing.


### Flashcard
Scan the string, incrementing a balance counter for 'L' and decrementing for 'R'; whenever balance is zero, increment the split count.

### Tags
String(#string), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Split Strings by Separator(split-strings-by-separator) (Easy)