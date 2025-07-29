### Leetcode 2730 (Medium): Find the Longest Semi-Repetitive Substring [Practice](https://leetcode.com/problems/find-the-longest-semi-repetitive-substring)

### Description  
You are given a string `s` of digits ('0'-'9').  
A substring is called **semi-repetitive** if it contains at most **one pair** of consecutive identical digits.  
Return the **length** of the longest such substring.  
In other words, find the length of the longest contiguous substring of `s` with **at most one pair of adjacent repetitive digits**.

### Examples  

**Example 1:**  
Input: `s = "52233"`  
Output: `4`  
Explanation: The longest semi-repetitive substring is `"5223"`.  
- `"5223"` contains one pair of consecutive identical digits (`"22"`).  
- `"2233"` or `"52233"` both contain two pairs (`"22"` and `"33"`), which is more than allowed.  

**Example 2:**  
Input: `s = "5494"`  
Output: `4`  
Explanation: The whole string `"5494"` has **no consecutive identical digits**, so it's already semi-repetitive with length 4.

**Example 3:**  
Input: `s = "1111111"`  
Output: `2`  
Explanation: Any substring longer than 2, e.g. `"111"`, contains two pairs (`"11"` and the next `"11"`), so the best we can do is take any `"11"` for length 2.


### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all substrings and check for each if it has ≤1 consecutive identical digit pair.  
  - For each start index, for each end index > start, count adjacent pairs in substring.  
  - Inefficient: O(n³) for checking all substrings and for each, counting pairs.
- **Optimization:**  
  - Use a sliding window:  
    - Two pointers, left and right.
    - As we expand right, keep a counter for number of adjacent same-digit pairs.
    - If number of pairs > 1, move left up until number of pairs is ≤1.
  - At each step, update the max window size encountered.
  - Why this works: Counting pairs and only tracking O(1) info per expand/contract is efficient.  
- **Final approach chosen:** Sliding window; best trade-off for clarity and performance (O(n) time).


### Corner cases to consider  
- Entire string has no repeated pairs: return n.
- All digits are same: longest is 2.
- String has length 1: return 1.
- Semi-repetitive pairs at the very start or end.
- Multiple equally-long valid substrings.
- Adjacent pairs are not overlapping (e.g. `"121212"`).

### Solution

```python
def longestSemiRepetitiveSubstring(s: str) -> int:
    n = len(s)
    max_len = 1  # Minimum answer is 1 (string is non-empty)
    left = 0      # Start of window
    repeat_count = 0  # # pairs of consecutive identical digits

    # Loop through each char as the right end of a window
    for right in range(1, n):
        # If current and previous char are same, increment repeat_count
        if s[right] == s[right - 1]:
            repeat_count += 1

        # While more than 1 repeated pair, move left pointer up
        while repeat_count > 1:
            if s[left] == s[left + 1]:
                repeat_count -= 1
            left += 1

        # Update the maximum length for this window
        max_len = max(max_len, right - left + 1)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of s.  
  - Each pointer (left/right) moves at most n times.
  - All operations per iteration are O(1).
- **Space Complexity:** O(1), only a few integer variables used regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find all substrings that are semi-repetitive and return them?  
  *Hint: Leverage similar sliding window technique, but store start/end positions for valid windows.*

- What if more than one consecutive pair was allowed (say, at most k pairs)?  
  *Hint: Generalize the window technique to allow repeat_count ≤ k.*

- Can the algorithm be modified to process a continuous stream of digits (not just a fixed string)?  
  *Hint: Maintain a moving window and update counters as new digits arrive; drop old digits as needed.*

### Summary
We applied the **sliding window** pattern, tracking at most one consecutive repeated pair, and dynamically resizing the window to maintain this constraint.  
This pattern is common for substring/window problems with "at most K" constraints, and is widely applicable for "longest/shortest substring with at most K distinct/repeated elements", "longest subarray with at most K violations", and similar problems.