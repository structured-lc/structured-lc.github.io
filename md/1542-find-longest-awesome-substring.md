### Leetcode 1542 (Hard): Find Longest Awesome Substring [Practice](https://leetcode.com/problems/find-longest-awesome-substring)

### Description  
Given a string **s**, return the length of the longest substring of **s** that is "awesome". A substring is **awesome** if its letters can be reordered to form a palindrome.  
This means: at most one character in the substring has an odd count; all others must have even counts (i.e., a palindrome permutation).

### Examples  

**Example 1:**  
Input: `s = "3242415"`  
Output: `5`  
*Explanation: "24241" can be reordered into a palindrome like "12442".*

**Example 2:**  
Input: `s = "12345678"`  
Output: `1`  
*Explanation: Each number occurs once. Any single digit can be a palindrome, so max length is 1.*

**Example 3:**  
Input: `s = "213123"`  
Output: `6`  
*Explanation: "213123" can be reordered to "321123" (a palindrome).* 

### Thought Process (as if you’re the interviewee)  
- To check if a substring can permute to a palindrome, at most one character can have an odd count. 
- Bitmask each character's count mod 2 as we process the string: keep track of the prefix mask.
- If the same mask is seen again, the substring in between is a candidate.
- Also check for masks differing by a single bit (handles the 'at most one odd' requirement).
- Keep a hash map of {mask: first index seen}.
- For each index, check if we've seen the same mask before (all even counts), or one-bit-different masks.
- Update the maximum length if possible.

### Corner cases to consider  
- All digits unique
- All digits the same
- Multiple possible palindromic substrings, pick the longest
- Empty string
- Non-digit input (problem constraints?)

### Solution

```python
# O(n) time, using prefix mask and hash map

def longestAwesome(s: str) -> int:
    pos = {0: -1}  # mask to earliest index
    mask = 0
    res = 0
    for i, c in enumerate(s):
        mask ^= 1 << int(c)  # flip bit for this digit
        # If we've seen this mask, whole substring is awesome
        if mask in pos:
            res = max(res, i - pos[mask])
        else:
            pos[mask] = i
        # Try flipping each bit once (at most 1 odd)
        for j in range(10):
            test_mask = mask ^ (1 << j)
            if test_mask in pos:
                res = max(res, i - pos[test_mask])
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n×10) = O(n), since 10 is a constant.
- **Space Complexity:** O(2¹⁰) = 1024 possibilities, so O(1) extra space. 

### Potential follow-up questions (as if you’re the interviewer)  
- What if the string contains only lowercase letters?  
  *Hint: Change the bitmask from 10 bits to 26 bits.*
- What if you had to return the actual substring(s), not just the length?
  *Hint: Track indices and reconstruct substrings using stored positions.*
- How would you efficiently handle UTF-8 or unicode characters?
  *Hint: Use a hash map for character-to-bit mapping, carefully manage mask width.*

### Summary
This uses a **prefix XOR + bitmask** approach, often called the "mask parity hack," to solve palindrome-permutation substring problems in linear time. Works anywhere we care about the **parity of counts** for each character. The pattern generalizes beautifully to similar substring palindrome queries.
