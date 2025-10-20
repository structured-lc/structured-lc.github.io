### Leetcode 696 (Easy): Count Binary Substrings [Practice](https://leetcode.com/problems/count-binary-substrings)

### Description  
Given a binary string `s` (containing only '0's and '1's), count the number of non-empty substrings that have **the same number of 0's and 1's, and all the 0's are grouped together, all the 1's are grouped together**. Every time such a substring occurs, count it—even if it overlaps or is identical to a previous substring. For example, in "0011", "0011" is a valid substring because all the 0's are together and all the 1's are together; but "0101" is not, because the 0's and 1's alternate and are not grouped.

### Examples  

**Example 1:**  
Input: `s = "00110011"`  
Output: `6`  
Explanation: The valid substrings are: "01", "0011", "10", "1100", "01", "10".  
Each corresponds to pairs of groups ("00" and "11", etc.).  

**Example 2:**  
Input: `s = "10101"`  
Output: `4`  
Explanation: The valid substrings are: "10", "01", "10", "01".  
They appear at every boundary where the digit changes from 1→0 or 0→1.  

**Example 3:**  
Input: `s = "000"`  
Output: `0`  
Explanation: No substring with equal number of 0's and 1's and with grouping exists.  

### Thought Process (as if you’re the interviewee)  
Start with brute-force:  
- Try all substrings, for each check if it has equal numbers of 0's/1's and all 0's and 1's are consecutive.
- For n = 10⁵, this is too slow (O(n²)).

Observations:  
- Valid substrings always look like a consecutive sequence of 0's followed by a consecutive sequence of 1's, or vice versa.
- So, count consecutive groups: For "0011100", the group lengths are [2,3,2].
- At every boundary between consecutive groups, the number of valid substrings is min(length_of_group₁, length_of_group₂). For example, if you have 2 zeroes and 3 ones, they contribute 2 valid substrings ("01", "0011").
- Optimal: Go through the string, count lengths of consecutive same digits, then sum min(prev_group, curr_group) across adjacent group pairs.

This is O(n) time and O(1) extra space.

### Corner cases to consider  
- Strings of a single character: "0" or "1" → output = 0
- No transitions: "0000", "1111" → output = 0
- Alternating: "01", "10" → output = 1 each
- Very long runs of the same character
- Minimum and maximum allowed string lengths

### Solution

```python
def countBinarySubstrings(s):
    # prev stores the length of the previous group (of 0's or 1's)
    # curr stores the length of the current group
    prev, curr, count = 0, 1, 0
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            # Still same group, increase current group length
            curr += 1
        else:
            # Character changed, add min(prev, curr) to count
            count += min(prev, curr)
            prev = curr
            curr = 1
    # After finishing, need to add min(prev, curr) one last time
    count += min(prev, curr)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is visited once, group lengths are counted in a single linear sweep.
  
- **Space Complexity:** O(1)  
  Only a few integer variables are used; no extra space proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return all the substrings themselves, not just the count?  
  *Hint: When a boundary between groups is found, track the substrings using their start and end indices.*

- What if the allowed characters are not just '0' or '1'?  
  *Hint: Generalize the idea to n symbols; the grouping principle remains, but equal-length runs must still be consecutive and each substring contains only two symbols.*

- Could you solve this problem if the input was streamed and can't be stored fully in memory?  
  *Hint: Maintain rolling group sizes, track only necessary info for boundaries.*

### Summary
This problem uses the **counting runs/groups pattern:** count consecutive blocks of the same symbol, then use min(length₁, length₂) across group boundaries. This O(n) approach is common for substring counting in grouped or run-length encoded formats. This idea generalizes to problems involving pairing or segmenting runs of repeated elements.


### Flashcard
Count consecutive groups of 0's and 1's; for each boundary, add min(prev_group_len, curr_group_len) to total valid substrings.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Encode and Decode Strings(encode-and-decode-strings) (Medium)
- Number of Substrings With Fixed Ratio(number-of-substrings-with-fixed-ratio) (Medium)
- Count the Number of Substrings With Dominant Ones(count-the-number-of-substrings-with-dominant-ones) (Medium)