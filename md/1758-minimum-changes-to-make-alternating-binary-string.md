### Leetcode 1758 (Easy): Minimum Changes To Make Alternating Binary String [Practice](https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string)

### Description  
Given a string consisting only of '0's and '1's, return the **minimum number of changes** needed to make it an alternating binary string.  
An *alternating* binary string is one where no two adjacent characters are the same, e.g., '0101', '1010'.  
You can change any character in the string to either '0' or '1' in one operation.

### Examples  

**Example 1:**  
Input: `s = "0100"`  
Output: `1`  
*Explanation: The last character should be changed from '0' to '1', so the result is "0101" (which is alternating). Only 1 change is needed.*

**Example 2:**  
Input: `s = "10"`  
Output: `0`  
*Explanation: The string is already alternating ("10" or "01"). No changes required.*

**Example 3:**  
Input: `s = "1111"`  
Output: `2`  
*Explanation: To alternate, we need to change either positions 1 and 3 ("1010") or 0 and 2 ("0101"). Minimum is 2 changes.*

### Thought Process (as if you’re the interviewee)  
First, I notice that for any string, the only two valid alternating patterns are:  
- Starting with '0': "010101..."  
- Starting with '1': "101010..."  

I will count how many characters differ from each pattern and take the minimum.  
Brute-force approach would be to try all possible modifications, but for this problem size, direct comparison is optimal and simple.  
For each index i:  
- If i is even and pattern starts with '0', expected char is '0'.  
- If i is odd, expected char is '1' (and vice versa for pattern starting with '1').  
Traverse the string twice (once for each pattern), count mismatches for each, and the answer is the minimum.

This approach is efficient and optimal because it uses only O(n) time and O(1) space.

### Corner cases to consider  
- Empty string: return 0 (nothing to change).
- String already alternating (e.g. "01", "10"): return 0.
- String of all same chars (e.g. "0000", "1111").
- String of length 1: always already alternating.
- Long strings with alternating patterns that just need a single flip.

### Solution

```python
def min_operations(s: str) -> int:
    n = len(s)
    # Pattern 1: starts with '0' ("010101...")
    changes_start_with_0 = 0
    # Pattern 2: starts with '1' ("101010...")
    changes_start_with_1 = 0

    for i in range(n):
        expected_char_0 = '0' if i % 2 == 0 else '1'
        expected_char_1 = '1' if i % 2 == 0 else '0'
        
        if s[i] != expected_char_0:
            changes_start_with_0 += 1
        if s[i] != expected_char_1:
            changes_start_with_1 += 1

    return min(changes_start_with_0, changes_start_with_1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We scan through the string once and check two patterns in a single loop.
- **Space Complexity:** O(1), only constant space used for counters, no extra storage dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if allowed only k changes and want to know if it's possible?  
  *Hint: Compute minimum required changes, compare with k.*

- How would you handle non-binary characters or validation?  
  *Hint: Check each character, possibly raise an exception or skip invalid inputs.*

- Can you return the modified string, not just the count?  
  *Hint: As you compare, build a result string for the minimal pattern.*

### Summary
This problem uses the classic **pattern comparison** and **greedy counting** technique—scan the string, compare to both valid patterns, and pick the one needing fewer changes. It's an example of a "min cost to fit pattern" problem, which appears in string and array manipulation interviews. This logic applies to other pattern transformation problems, like converting to palindromes or matching certain templates.


### Flashcard
Count mismatches against both alternating patterns (start with '0' or '1'), return the minimum count of changes needed.

### Tags
String(#string)

### Similar Problems
- Remove Adjacent Almost-Equal Characters(remove-adjacent-almost-equal-characters) (Medium)