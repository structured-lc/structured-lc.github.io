### Leetcode 1573 (Medium): Number of Ways to Split a String [Practice](https://leetcode.com/problems/number-of-ways-to-split-a-string)

### Description  
Given a binary string `s`, split it into three non-empty parts such that each part contains the same number of '1's. Return the number of ways to split, modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `s = "10101"`  
Output: `4`  
*Explanation: Possible partitions: ["1","0","101"], ["1","01","01"], ["10","1","01"], ["10","10","1"].*

**Example 2:**  
Input: `s = "100100010100110"`  
Output: `12`  
*Explanation: 12 ways to split, every part contains 3 ones.*

**Example 3:**  
Input: `s = "0000"`  
Output: `3`  
*Explanation: Only zeros; any split works since count of ones in each part is zero. For length 4, 3 splits: after pos 1, 2, and 3.*

### Thought Process (as if you’re the interviewee)  
First, count the number of '1's in the string. If not divisible by 3, no valid split. If there are zero '1's, all splits are valid: pick any 2 out of (n-1) places to split (combinatorial). Otherwise, need each part to have t = ones/3 '1's. Track the places where cumulative count equals t and 2t; the product of possibilities at those positions gives the result. This is a prefix sum and combinatorial position counting pattern.

### Corner cases to consider  
- No '1's in the string (all zeros)
- Number of '1's not divisible by 3
- String length less than 3
- Leading/trailing zeros

### Solution

```python
def numWays(s):
    MOD = 10**9 + 7
    ones = s.count('1')
    n = len(s)
    if ones == 0:
        # choose 2 split points from n-1 options
        return ((n-1) * (n-2) // 2) % MOD
    if ones % 3 != 0:
        return 0
    t = ones // 3
    count = first = second = 0
    ways1 = ways2 = 0
    for c in s:
        if c == '1':
            count += 1
        if count == t:
            ways1 += 1
        elif count == 2 * t:
            ways2 += 1
    return (ways1 * ways2) % MOD
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n): single scan to count ones and another to count split options.
- **Space Complexity:** O(1): only counters needed.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you adapt this if each split must contain different numbers of '1's?
  *Hint: Dynamic programming by split position, more general counting.*

- What if string is very long and cannot fit in memory at once?
  *Hint: Streaming count and keeping prefix counters.*

- Can you generalize for k splits (k parts, equal number of '1's per part)?
  *Hint: Combinatorial mathematics and prefix sum technique extended.*

### Summary
This problem uses prefix sum techniques and combinatorics together. It's a typical pattern for substrings or partitioning strings/arrays, especially when global properties like equal sum or counts must be maintained.
