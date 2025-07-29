### Leetcode 93 (Medium): Restore IP Addresses [Practice](https://leetcode.com/problems/restore-ip-addresses)

### Description  
Given a string consisting of digits, restore all possible valid IP addresses by inserting dots at appropriate positions.  
A **valid IP address** consists of exactly **four integers** (called segments), separated by single dots. Each integer must be in the range **0 to 255** (inclusive) and **cannot have leading zeros**.  
You cannot reorder or remove any digits—only insert dots.

Example:  
- `"192.168.1.1"` is valid  
- `"192.168.01.1"` is invalid (leading zero in segment)  
- `"256.100.100.100"` is invalid (256 is outside [0,255])  
- `"0.0.0.0"` is valid  
- `"00.0.0.0"` is invalid (first segment has leading zeros)

### Examples  

**Example 1:**  
Input: `s = "25525511135"`  
Output: `["255.255.11.135","255.255.111.35"]`  
*Explanation:  
Breakdown possible segmentations:  
- "255.255.11.135" (255 in range, 255 in range, 11 in range, 135 in range)  
- "255.255.111.35" (all segments valid)  
Other combinations either have segments out of range or with leading zeros.*

**Example 2:**  
Input: `s = "0000"`  
Output: `["0.0.0.0"]`  
*Explanation:  
Only possible way is to split as four single zeroes: "0.0.0.0".*

**Example 3:**  
Input: `s = "101023"`  
Output: `["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]`  
*Explanation:  
Several ways to split into 4 valid segments:  
- "1.0.10.23" (all segments valid)  
- "1.0.102.3" (102 is valid)  
- "10.1.0.23"  
- "10.10.2.3"  
- "101.0.2.3"  
Other segmentations may create invalid numbers (like 023 → leading zero) or too-long segments.*

### Thought Process (as if you’re the interviewee)  
To solve this problem:
- I need to generate all possible ways to split the input string `s` into 4 segments.
- Each segment must be a number between 0 and 255, and cannot have leading zeros (except for the segment "0").
- This is a classic **backtracking** problem: try placing dots in all possible positions, ensuring that after each dot, the segment to the left is valid.

**Brute-force** approach:  
- Try every combination of 3 dots within the string—since every IP address consists of 4 segments.
- For a string of length n, there are at most (n-1) choose 3 ways of inserting 3 dots.
- For each split, check if the segments are valid.

**Optimized backtracking:**  
- Avoid generating and checking invalid splits as early as possible (prune recursion).
- If a segment starts with '0' and is longer than 1 character, skip.
- If the segment integer value > 255, skip.

**Tradeoffs:**  
- Backtracking is efficient here due to the small search space (n ≤ 12 for valid IPs, as a segment max length is 3, so 4 × 3 = 12 digits). Pruning invalid segments early keeps complexity manageable.
- No memoization needed: different paths are completely independent.

### Corner cases to consider  
- Empty string, or string length < 4 or > 12.
- Segments with leading zeros ("01", "00").
- Segments out of range ("256", "999").
- All zeros ("0000").
- Shortest possible input ("1111").

### Solution

```python
def restore_ip_addresses(s: str) -> list[str]:
    res = []

    # Helper function: start is the current index, path is current segments
    def backtrack(start: int, path: list[str]):
        # If we have 4 segments and are at the end, add to results
        if len(path) == 4:
            if start == len(s):
                res.append(".".join(path))
            return

        # Try segments of length 1, 2, or 3
        for seg_len in range(1, 4):
            if start + seg_len > len(s):
                break

            segment = s[start:start + seg_len]

            # Leading zero check: "0" is valid, "00", "01" etc are not
            if len(segment) > 1 and segment[0] == '0':
                continue

            # Range check
            if int(segment) > 255:
                continue

            backtrack(start + seg_len, path + [segment])

    # Edge case: impossible to split
    if not (4 <= len(s) <= 12):
        return []

    backtrack(0, [])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each recursive call processes up to 3 possibilities (1,2,3 digit segments), and we do this at most 4 times (for 4 segments).
  - So in the worst case: O(3⁴) = O(81) calls, which is constant time given the constraints. Each valid IP is output as a string of length ≤ 12, so overall output is small.

- **Space Complexity:**  
  - O(1) auxiliary space for recursion stack (at most 4 deep since 4 segments).
  - O(k) for output, where k = number of valid IPs discovered (depends on input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the IP address must have exactly N segments (not always 4)?  
  *Hint: Generalize the code by replacing '4' with variable segment count.*

- How would you handle IPv6 addresses, which use hexadecimal and different formatting?  
  *Hint: Adjust segment checking for length and character set, allow hexadecimal values.*

- Can you return the results in lexicographically sorted order?  
  *Hint: Return sorted(results) at the end.*

### Summary
This is a standard **backtracking** problem: try all possible splits while pruning invalid segments early.  
Typical for “restore with splitting under constraints” style questions.  
Similar backtracking patterns are broadly applicable in “string segmentation”, “combination sum”, and “palindrome partitioning” interview problems.