### Leetcode 2609 (Easy): Find the Longest Balanced Substring of a Binary String [Practice](https://leetcode.com/problems/find-the-longest-balanced-substring-of-a-binary-string)

### Description  
Given a binary string (only containing '0's and '1's), find the length of the longest substring that is **balanced** — that is, all the '0's come before any '1's in the substring, and there are an equal number of '0's and '1's. The substring must be contiguous. Return 0 if there is no such substring.

### Examples  

**Example 1:**  
Input: `s = "01000111"`  
Output: `6`  
*Explanation: The longest balanced substring is `"000111"` (from index 2 to 7), which contains three '0's followed by three '1's, so length = 6.*

**Example 2:**  
Input: `s = "00111"`  
Output: `4`  
*Explanation: `"0011"` (from index 0 to 3) is the longest balanced substring with two '0's followed by two '1's, so length = 4.*

**Example 3:**  
Input: `s = "111"`  
Output: `0`  
*Explanation: There are no contiguous substrings in which all the '0's precede all the '1's with the same count. Return 0.*

### Thought Process (as if you’re the interviewee)  
My first intuition is to look at all possible substrings and check if they are balanced: all '0's, then all '1's, and same count for both. But this would take O(n²) time: for each substring, we'd need to count zeros and ones and ensure they are contiguous and equal in number.

But we can optimize. For a balanced substring, all '0's must come before all '1's. So for every group of consecutive '0's followed immediately by a group of '1's, the maximum balanced substring is 2 × min(length of zeros, length of ones) (since we can pair up the shorter group completely).

The idea:
- Traverse the string, counting the lengths of consecutive '0's and consecutive '1's.
- For every transition from zeros to ones, update max length as 2 × min(previous zeros, current ones).
- Reset zeros counter when a new group of zeros starts.

I choose this algorithm because it runs in one pass (O(n)), uses O(1) space, and is simple to code.

### Corner cases to consider  
- Input length = 1 (just '0' or '1'): should return 0.
- No valid balanced substring (all '0's or all '1's).
- Multiple balanced substrings — make sure to pick the longest.
- Alternating pattern: `"010101"` — should detect multiple small balanced pairs.
- All zeros followed by all ones: should detect entire string if counts match.
- Only one group of zeros followed (anywhere) by ones.
- Overlapping balanced substrings: should always pick longest possible.

### Solution

```python
def findTheLongestBalancedSubstring(s: str) -> int:
    max_len = 0
    zero_count = 0   # length of current zeros group
    one_count = 0    # length of current ones group

    i = 0
    n = len(s)
    while i < n:
        # Count sequence of zeros
        zero_count = 0
        while i < n and s[i] == '0':
            zero_count += 1
            i += 1

        # Count sequence of ones following
        one_count = 0
        while i < n and s[i] == '1':
            one_count += 1
            i += 1

        # Update max length: 2 × min(zeros, ones)
        max_len = max(max_len, 2 * min(zero_count, one_count))
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we iterate through the string only once, scanning each character at most twice (once for zeros, once for ones).
- **Space Complexity:** O(1), since we use only a fixed number of integer variables, regardless of the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the substring can start with ones and then zeros, but still counts are equal?  
  *Hint: Try to generalize what "balanced" means and adjust your logic.*

- How would you modify your code to return the substring itself, not length?  
  *Hint: Track the indexes when you find a longer balanced substring.*

- Can you generalize for non-binary strings (like ternary or arbitrary alphabet)?  
  *Hint: Think about groupings and adjusting how you manage counts.*

### Summary
This problem maps to a **grouped pair counting** pattern—by grouping adjacent zeros and ones and pairing the smallest group, we determine all possible balanced substrings in a single linear pass. It's similar to counting well-formed pairs or chunks (common in problems involving parenthesis or repeated blocks) and demonstrates a classic use of *two-pointer* or *grouping* strategies in string problems.


### Flashcard
For each group of consecutive 0’s followed by 1’s, the longest balanced substring is 2 × min(count of 0’s, count of 1’s).

### Tags
String(#string)

### Similar Problems
