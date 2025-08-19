### Leetcode 3499 (Medium): Maximize Active Section with Trade I [Practice](https://leetcode.com/problems/maximize-active-section-with-trade-i)

### Description  
Given a binary string `s` of length `n`, where `'1'` represents an **active** section and `'0'` represents an **inactive** section, you may perform **at most one trade** to maximize the number of active sections in `s`.

A **trade** consists of two steps (both must be performed, and only once in total):
1. Convert a contiguous block of `'1'`s (surrounded by `'0'`s) to all `'0'`s.
2. Then, convert a contiguous block of `'0'`s (surrounded by `'1'`s) to all `'1'`s.

When applying these operations, treat the original string `s` as if it has a `'1'` added to each end (i.e., work with `t = '1' + s + '1'`). The artificial `'1'`s at each end **do not** contribute to the final count of active sections.

Return the maximum possible number of **active sections** after performing at most one trade.

### Examples  

**Example 1:**  
Input: `s = "011110"`  
Output: `4`  
*Explanation: t = "10111101".  
Initial sections: "0", "1111", "0".  
Remove the block "1111" (surrounded by zeros) → "100001".  
Now turn the inner "000" (surrounded by '1') to "111" → "111111".  
Final `s`: "11111" (count: 1 section)*  
But, maximum active sections are created by trading "1111" with "0", resulting in "10111" (sections: "1", "0", "111"). This produces 4 sections (`1-0-111`). So, output is 4.

**Example 2:**  
Input: `s = "10101"`  
Output: `5`  
*Explanation: t = "1101011".  
The best is to not trade; every '1' is already separated by '0's, so the maximum is 5 ("1", "0", "1", "0", "1").*

**Example 3:**  
Input: `s = "111"`  
Output: `1`  
*Explanation: Only one active section, nothing to trade to get more.*

### Thought Process (as if you’re the interviewee)  
- First, segment the string into alternating blocks of '1's and '0's, counting contiguous runs.
- The goal is to maximize the *number* of active sections (runs of '1's).
- Brute-force: Try all possible blocks of '1's to remove, then turn a block of '0's into '1's, and update the count each time. Too slow: O(n²).
- Optimize using the observation:  
  - Removing a big block of '1's (surrounded by '0's) increases the number of '0' separators, and turning an inner '0' block into '1' adds active sections.  
  - Only consider blocks of '1's surrounded by '0's to remove, and blocks of '0's surrounded by '1's to make active.
- Greedy/two-pointers: Track all candidate '1' and '0' blocks. For each valid swap, simulate the change and calculate the resulting section count.
- Track the *original* number of active sections. For each operation, compute the section count after applying the trade and keep the maximum.
- Use extra leading/trailing '1's to simplify boundaries.

### Corner cases to consider  
- Empty string: s = ""  
- String with only '1's: s = "111"  
- String with only '0's: s = "000"  
- Alternate '1' and '0': s = "10101"  
- All '1's with a single '0' in the middle: s = "1110111"  
- No trade possible to increase sections.

### Solution

```python
def maximizeActiveSectionWithTrade(s: str) -> int:
    # Pad the string with '1' at both ends as per problem statement
    t = '1' + s + '1'
    n = len(t)
    # Step 1: Find all lengths of consecutive '1's and '0's
    runs = []
    i = 0
    while i < n:
        j = i
        while j < n and t[j] == t[i]:
            j += 1
        runs.append((t[i], j - i))  # (char, length)
        i = j

    # Step 2: Count active sections in the original string
    # Ignore the leading and trailing '1's (artificial)
    active_sections = 0
    for idx, (ch, length) in enumerate(runs):
        if ch == '1' and idx != 0 and idx != len(runs) - 1:
            active_sections += 1

    max_sections = active_sections

    # Step 3: Try all possible trades
    # For every block of '1's surrounded by '0's, try trading it with each block of '0's surrounded by '1's
    for i in range(1, len(runs) - 1):
        ch_i, len_i = runs[i]
        if ch_i != '1':
            continue  # Must be a block of '1's
        # It must be surrounded by '0's (i.e., runs[i-1] == '0' and runs[i+1] == '0')
        if runs[i-1][0] == '0' and runs[i+1][0] == '0':
            # Remove this block of '1's
            temp = runs.copy()
            temp[i] = ('0', len_i)
            # For all '0' blocks surrounded by '1's, try converting each to '1'
            for j in range(1, len(temp) - 1):
                ch_j, len_j = temp[j]
                if ch_j == '0' and temp[j-1][0] == '1' and temp[j+1][0] == '1':
                    # Perform the trade: '1' block at i -> '0', '0' block at j -> '1'
                    change = temp.copy()
                    change[j] = ('1', len_j)
                    # Count active sections
                    count = 0
                    for idx, (chx, l) in enumerate(change):
                        if chx == '1' and idx != 0 and idx != len(change) - 1:
                            count += 1
                    max_sections = max(max_sections, count)

    return max_sections
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) worst-case, as we might check every '1' block with every '0' block.  
  In practice, much faster since only runs (compressed form) are considered.
- **Space Complexity:** O(n) for storing the runs array; extra copies are only O(k), where k ≤ n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if you were allowed to perform unlimited trades?  
  *Hint: Think about maximizing splits, and the repeated process of maximizing active sections.*

- Can you do this in less than O(n²) time?  
  *Hint: Analyze which trade will yield the biggest increase, and if you can keep track of candidates while doing one scan.*

- If the string is received as a stream, how would you process the answer on-the-fly?  
  *Hint: Consider windowed run encoding or incremental updating of counts.*

### Summary
This problem combines block segmentation, greedy selection, and two-pointers (run-length encoding and simulation) to efficiently consider possible "trades" that maximize active sections. It's a classic application of compressing the input to key events, then trying optimal swaps/pairings. The run-length encoding ("grouping") pattern applies to similar string or array problems where only contiguous blocks matter, and can support other interview problems like substring replacements, optimal flipping, or chunk-wise array operations.

### Tags
String(#string), Enumeration(#enumeration)

### Similar Problems
