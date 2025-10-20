### Leetcode 482 (Easy): License Key Formatting [Practice](https://leetcode.com/problems/license-key-formatting)

### Description  
Given a string representing a license key (consisting of alphanumeric characters and dashes) and an integer k, reformat the string so that:
- All lowercase letters become uppercase.
- Dashes are removed, except to separate groups.
- The string is split into groups containing exactly k characters, except the first group, which can be shorter but must contain at least one character.
- Groups are separated by dashes.

For example, if given "2-4A0r7-4k" with k=4, output would be "24A0-R74K" — the input is cleaned, regrouped from the right, and dashes are reinserted accordingly.

### Examples  

**Example 1:**  
Input: `S = "5F3Z-2e-9-w", K = 4`  
Output: `"5F3Z-2E9W"`  
Explanation.  
- Remove dashes: `5F3Z2e9w`  
- Uppercase: `5F3Z2E9W`  
- Regroup from right: `5F3Z` `2E9W`  
- Output: `"5F3Z-2E9W"`

**Example 2:**  
Input: `S = "2-4A0r7-4k", K = 4`  
Output: `"24A0-R74K"`  
Explanation.  
- Remove dashes: `24A0r74k`  
- Uppercase: `24A0R74K`  
- Regroup from right: `24A0` `R74K`  
- Output: `"24A0-R74K"`

**Example 3:**  
Input: `S = "abc-def", K = 3`  
Output: `"ABC-DEF"`  
Explanation.  
- Remove dashes: `abcdef`  
- Uppercase: `ABCDEF`  
- Regroup from right: `ABC` `DEF`  
- Output: `"ABC-DEF"`

### Thought Process (as if you’re the interviewee)  
First, I’d clarify requirements:  
- Clean the string by removing all dashes and converting all letters to uppercase.
- From the rightmost side, split into groups of k.
- The first group can be shorter than k but must not be empty.
- Insert dashes between groups.

**Initial idea:**  
- Remove dashes, uppercase everything, then break into groups, working left-to-right.  
But this makes the first group harder as we’d need to compute its size (could be shorter than k).

**Optimized idea:**  
- Since grouping is from right, iterate cleaned string in reverse, gradually forming groups of k.  
- Whenever a group reaches size k, insert a dash.  
- Edge case: no dash before the first group.

I prefer the reverse traversal, as it elegantly handles group sizing and avoids substring length calculations.

### Corner cases to consider  
- Input string is all dashes: S = "----", return ""
- K is 1 (every character separated by dashes).
- K is larger than the cleaned string length (no dashes in output).
- Input string contains only uppercase, only lowercase, or a mix.
- Input string with consecutive or leading/trailing dashes.
- Input string of length 1.
- Input already formatted.

### Solution

```python
def licenseKeyFormatting(S, K):
    # Clean string: remove dashes and convert to uppercase
    cleaned = []
    for c in S:
        if c != '-':
            cleaned.append(c.upper())

    # Handle empty cleaned case
    if not cleaned:
        return ""
    
    result = []
    group = 0  # counter for current group size

    # Process from right to left
    for c in reversed(cleaned):
        result.append(c)
        group += 1
        # Insert dash when K characters have been added,
        # not at the beginning
        if group == K:
            result.append('-')
            group = 0

    # Remove possible trailing dash inserted at the end
    if result and result[-1] == '-':
        result.pop()
    
    # Reverse back to correct order
    return ''.join(reversed(result))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of S.  
  - We scan through the entire string to clean it (O(n)), then through the cleaned string once more to build the output (O(n)).

- **Space Complexity:** O(n), for storing the cleaned string and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you format the key "in place" if the data structure allows (e.g., array of chars)?
  *Hint: Discuss mutation in-place and minimizing extra space.*

- What if the group sizes were not uniform, but followed an array of group sizes?
  *Hint: How would logic adapt if the first group is size k₁, next k₂, ...?*

- How would you process a stream of characters rather than a complete string?
  *Hint: Think about buffering and outputting groups on the fly.*

### Summary
This problem uses a **string cleaning and formatting** pattern, which is common for input normalization tasks. The optimal solution makes use of reverse traversal to group characters directly, elegantly handling variable-sized first groups and avoiding awkward calculations. This pattern can also be found in text reformatting, grouping, or pre-processing problems, where data must be chunked from one end and delimited systematically.


### Flashcard
Remove dashes, uppercase, then split into groups of k from the right; join with dashes for formatted key.

### Tags
String(#string)

### Similar Problems
