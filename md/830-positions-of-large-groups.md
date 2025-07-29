### Leetcode 830 (Easy): Positions of Large Groups [Practice](https://leetcode.com/problems/positions-of-large-groups)

### Description  
Given a string s of lowercase letters, identify all **large groups**.  
A *group* is a sequence where the same character appears consecutively.  
A group is considered **large** if it has at least 3 consecutive identical characters.  
Return the starting and ending indices [start, end] (inclusive, 0-indexed) for every large group found, in order from left to right in the string.

### Examples  

**Example 1:**  
Input: `s = "abbxxxxzzy"`  
Output: `[[3,6]]`  
*Explanation: The group "xxxx" (indices 3 to 6) has 4 'x's — it's a large group. All other groups are smaller than 3.*

**Example 2:**  
Input: `s = "abc"`  
Output: `[]`  
*Explanation: No character repeats 3 or more times consecutively, so there are no large groups.*

**Example 3:**  
Input: `s = "abcdddeeeeaabbbcd"`  
Output: `[[3,5],[6,9],[12,14]]`  
*Explanation: Groups "ddd" (3–5), "eeee" (6–9), and "bbb" (12–14) are all large groups with consecutive same letters.*

### Thought Process (as if you’re the interviewee)  
First, I need to find all segments where the same character repeats 3 or more times in a row.  
A brute-force method would be to check every substring, but that's inefficient.

A better way is to **scan the string with a pointer**, tracking the start index of each group.  
For every character, I keep moving forward while the character remains the same.  
Once the character changes (or at the end),  
I check if the length of the group is at least 3.  
- If so, I collect the range as [start, end].
- Move the start pointer to the current position and repeat.

This approach requires only a single pass (O(n)) and no complex data structures.

### Corner cases to consider  
- *Empty string*: should return [].
- *String with no repeats*: e.g., "abc".
- *String where the entire string is one large group*: e.g., "aaaaaa".
- *Large group at the start or end of the string*
- *Multiple non-overlapping large groups*
- *All large groups directly next to each other*
- *Groups of size exactly 3 (boundary case)*

### Solution

```python
def largeGroupPositions(s):
    result = []
    n = len(s)
    i = 0  # Start index of each group
    while i < n:
        j = i
        # Expand j as long as s[j] is the same as s[i]
        while j < n and s[j] == s[i]:
            j += 1
        group_length = j - i
        if group_length >= 3:
            # j is now at index after group, so group ends at j-1
            result.append([i, j-1])
        i = j  # Move to next group
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is checked once.
- **Space Complexity:** O(1) extra space (ignoring the output list), since we only use a few pointers.  
  Output list could be O(k) where k is the number of large groups.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the definition of "large group" changed (e.g., at least 5)?  
  *Hint: Parameterize the group size threshold.*

- How would you adapt the approach if the input string is a stream (cannot index freely)?  
  *Hint: Accumulate counts as you process each character, emitting and forgetting results immediately.*

- Can you solve this without using any extra space for the result?  
  *Hint: Think about yielding intervals or processing them “in place” for a streaming output.*

### Summary
This problem uses the **grouped scanning** pattern: scan the input with pointers to detect runs (groups) of identical elements.  
It's a very common coding pattern for problems involving consecutive groupings, substrings, or counting runs.  
This same approach is useful for compressing data (Run-Length Encoding), grouping by value, or parsing event logs with repeated timestamps.