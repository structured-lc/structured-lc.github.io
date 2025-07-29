### Leetcode 1784 (Easy): Check if Binary String Has at Most One Segment of Ones [Practice](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones)

### Description  
Given a binary string **s** that starts with '1' (no leading zeros), determine if there is **at most one contiguous segment of '1's**. In other words, all the '1's in the string must appear together in one block; if there’s any break (‘0’), there must not be more ‘1’s after that break. Return **True** if this holds, otherwise **False**.

### Examples  

**Example 1:**  
Input: `s = "1001"`  
Output: `False`  
*Explanation: There are two separated segments of '1's (at index 0 and index 3). The '1's are not contiguous.*

**Example 2:**  
Input: `s = "110"`  
Output: `True`  
*Explanation: Both '1's are contiguous and appear before the single '0'.*

**Example 3:**  
Input: `s = "1"`  
Output: `True`  
*Explanation: Only a single segment of '1's, which is just the first and only character.*

### Thought Process (as if you’re the interviewee)  
- Start by understanding that the string must not have more than one block of '1's.  
- Brute-force approach: track the current state as we iterate. When you see a transition from '0' to '1' after at least one '0', that means there is more than one segment.
- Since '01' indicates ending of one segment and '10' may indicate beginning of a second, the critical case is: does the pattern '01' appear before the end of the string, and is there a '1' afterward?
- An optimal observation is: **if the substring "01" appears even once, and then a '1' shows up afterward, we know there’s a second segment**. But, since the string starts with '1', actually, just the appearance of '01' directly followed by another '1' means there’s more than one segment.
- But a simpler approach is: **if "01" appears anywhere, it's not one contiguous block – so return False**. Otherwise, it’s valid.

### Corner cases to consider  
- Single character strings: "1" → True; "0" (should not happen, due to guarantee, but check if code needs guard)
- All '1's: "1111" → True
- '1's block at the beginning only: "11000" → True
- Multiple separate '1's: "1001001" → False
- No '0's: "11" → True
- Longer strings with only a single '0' in the middle: "1110111" → False

### Solution

```python
def checkOnesSegment(s: str) -> bool:
    # If "01" is a substring, there is a split in the block of '1's.
    return "01" not in s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We check once for the substring "01" in the string of length n.

- **Space Complexity:** O(1)  
  No extra space is used besides the input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this for segments of '0's?  
  *Hint: Swap the roles and check for "10" in a string starting with '0'.*

- Could you solve this in a single pass without using string search?  
  *Hint: Track a flag when you see the first '0', and return False if you see a '1' after that.*

- What if the input can have leading zeros?  
  *Hint: You would need to skip or process leading zeros, or modify the logic.*

### Summary
This problem uses a simple pattern matching approach: **detecting the substring '01'** is the key insight to identifying splits in blocks of '1's. The coding pattern is an example of a **single scan with substring search** or **state tracking**, which is widely used for checking groupings or transitions in sequential data. The approach is highly efficient and directly applicable for problems involving **segment detection** in binary or character sequences.