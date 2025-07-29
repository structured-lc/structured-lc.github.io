### Leetcode 1422 (Easy): Maximum Score After Splitting a String [Practice](https://leetcode.com/problems/maximum-score-after-splitting-a-string)

### Description  
Given a binary string s, split it into two non-empty substrings at any position. The score is the number of '0's in the left substring plus the number of '1's in the right substring. Find the maximum possible score from all valid splits.

### Examples  
**Example 1:**  
Input: `s = "011101"`  
Output: `5`  
*Explanation: Best split after index 3: left="011", right="101" → 2 zeros left + 3 ones right = 5.*

**Example 2:**  
Input: `s = "00111"`  
Output: `5`  
*Explanation: Split after index 2: left="00", right="111" → 2 zeros + 3 ones = 5.*

**Example 3:**  
Input: `s = "1111"`  
Output: `3`  
*Explanation: Every split has 0 zeros on left, max ones right is 3.*

### Thought Process (as if you’re the interviewee)  
- For each possible split position (from 1 to len(s)-1), count zeros to the left and ones to the right.
- The right ones count can be efficiently computed by knowing total '1's and subtracting the ones encountered so far in the left.
- To make it O(N), do one pass to count total ones, then another pass to try all splits, tracking left zeros and left ones so far.
- Update max score at each split point.

### Corner cases to consider  
- String with all zeros or all ones
- Minimum length string (length 2)
- No zeros/ones on one side after split

### Solution

```python
def maxScore(s):
    ones_total = s.count('1')
    max_score = float('-inf')
    left_zeros = left_ones = 0
    for i in range(len(s)-1):
        if s[i] == '0':
            left_zeros += 1
        else:
            left_ones += 1
        # right ones = total ones - left encountered so far
        score = left_zeros + (ones_total - left_ones)
        if score > max_score:
            max_score = score
    return max_score
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), two passes over string (count and split loop)
- **Space Complexity:** O(1), just counters for zeros and ones

### Potential follow-up questions (as if you’re the interviewer)  
- How can you extend this if allowed to split into k substrings?  
  *Hint: Try DP, or prefix/suffix sum generalization.*
- What if we want to minimize the score instead?  
  *Hint: Invert logic for ones and zeros.*
- Is there a way to answer multiple such queries on the same string efficiently?  
  *Hint: Precompute prefix sums for zeros and ones.*

### Summary
This problem demonstrates prefix/suffix scan and greedy optimization patterns. The prefix sum approach is very useful for range scan and split-style problems, often with O(N) efficiency.