### Leetcode 1933 (Easy): Check if String Is Decomposable Into Value-Equal Substrings [Practice](https://leetcode.com/problems/check-if-string-is-decomposable-into-value-equal-substrings)

### Description  
Given a string of digits, check if it can be decomposed into several *consecutive* substrings (“blocks”) where:
- Each substring consists of only *one* unique character (all characters are the same).
- *Exactly one* of these substrings has a length of 2.
- All the remaining substrings have length 3.
You need to decide if such a decomposition is possible.

### Examples  

**Example 1:**  
Input: `s = "000111000"`  
Output: `false`  
*Explanation: Possible decomposition: ["000", "111", "000"]. All groups are of length 3, but none is of length 2. So the answer is false.*

**Example 2:**  
Input: `s = "00011111222"`  
Output: `true`  
*Explanation: Possible decomposition: ["000", "111", "11", "222"]. Exactly one group ("11") has length 2, the others have length 3.*

**Example 3:**  
Input: `s = "011100022233"`  
Output: `false`  
*Explanation: The first group "0" has length 1, which is not allowed in the decomposition. So the answer is false.*


### Thought Process (as if you’re the interviewee)  

First, parse the string into groups of consecutive equal characters, storing the length of each group.

A brute-force approach would try breaking the string in all possible ways into substrings of size 2 and 3, but that would be very inefficient.

Optimized plan:
- Walk through the string, counting lengths of consecutive runs.
- For each run, the length must be either 2 or divisible by 3.
    - For runs with length ≥ 3, see how many 3’s you can use. If leftover is 2, use it — but only once in the whole string.
    - If any run leaves a single leftover or more than one length-2 block is needed, return false.
- In the end, exactly one group of length 2 must have been used, and all grouping must account for the whole string.
- This scan is linear, O(n).

Trade-off: This avoids brute-force and doesn’t use extra data structures beyond a counter.


### Corner cases to consider  
- Run of length 1 anywhere (`"1"`, `"010"`).
- More than one run with length 2 needed (e.g. `"112233"` → two length-2 blocks).
- Strings of lengths not a multiple of 2 or 3.
- Edge: Only one group, length 2.
- Edge: Only 3’s, but no 2 (e.g. `"222"`).
- Very long uniform string.


### Solution

```python
def isDecomposable(s: str) -> bool:
    n = len(s)
    i = 0
    found_len2 = False   # We must find exactly one length-2 block

    while i < n:
        group_len = 1
        # Count consecutive chars
        while i + group_len < n and s[i + group_len] == s[i]:
            group_len += 1

        # Try to break group into as many 3's as possible
        num_len3 = group_len // 3
        leftover = group_len % 3

        if leftover == 1:
            # Impossible to split this group to match requirements
            return False
        elif leftover == 2:
            # Can take one length-2 block, but only once in the whole string
            if found_len2:
                return False
            found_len2 = True  # Use the single allowed len-2

        # Move to the next group
        i += group_len

    # At the end, there must be exactly one group of length 2
    return found_len2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan the string once, processing each character a constant number of times.
- **Space Complexity:** O(1) — Uses only a small number of counters, independent of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this if you need k substrings of length 2, not just one?  
  *Hint: Use a counter instead of a boolean, and track the number of length-2 uses.*

- What if substrings of size 2 or 3 can appear anywhere, as long as the same value-equal property holds?  
  *Hint: Try a dynamic programming approach; think about partitioning with variable orders.*

- How would you handle an alphabet (not just digits)?  
  *Hint: The grouping mechanism stays the same; just compare letters instead of digits.*

### Summary
The solution uses the "group by value" or "run-length encoding" technique: process consecutive runs, analyze their lengths, and track how the string can be split according to given constraints. This grouping and counting pattern is common in string parsing, and can apply to many substring decomposition problems or run-based checks (e.g., compression, word problems, custom pattern matching).


### Flashcard
Split string into runs of equal chars; each run’s length must be 2 or divisible by 3 (with at most one leftover 2).

### Tags
String(#string)

### Similar Problems
