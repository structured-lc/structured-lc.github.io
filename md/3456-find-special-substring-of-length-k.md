### Leetcode 3456 (Easy): Find Special Substring of Length K [Practice](https://leetcode.com/problems/find-special-substring-of-length-k)

### Description  
Given a string **s** and an integer **k**, determine if there exists a substring of length exactly **k** in **s** that meets these conditions:
- The substring consists of only one distinct character (e.g., "aaa", "bbb").
- If there is a character immediately before the substring, it must be **different** from the character in the substring.
- If there is a character immediately after the substring, it must also be **different** from the character in the substring.

Return `True` if such a substring exists, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `s = "aabbbcc", k = 3`  
Output: `True`  
*Explanation: The substring "bbb" (from index 2 to 4) has length 3, all 'b's, and both neighbors (at index 1 and 5) are not 'b'.*

**Example 2:**  
Input: `s = "aaaa", k = 3`  
Output: `False`  
*Explanation: The possible substring "aaa" (from index 0) is immediately followed by another 'a', so it does not satisfy the isolation condition.*

**Example 3:**  
Input: `s = "xyyyz", k = 3`  
Output: `True`  
*Explanation: The substring "yyy" (from index 1 to 3) is all 'y', and both neighbors (index 0: 'x' and index 4: 'z') are different.*

### Thought Process (as if you’re the interviewee)  
First, I want to check every substring of length **k** and see if it consists of repeating characters and is isolated (neighbors, if any, are not the same).  
A brute-force approach would generate every possible substring of length **k**, check if all characters are the same, and verify neighbors.  
This method is O(n*k). However, we can do better by:
- Using a single scan: For every block of consecutive identical characters, check if the block length is exactly **k**, and if the left and right neighbors (if present) are different than the block character.  
Implementing this with two pointers or a counting variable lets us avoid repeated substring checks.

### Corner cases to consider  
- Entire string is shorter than **k** (return False).  
- Block of repeated characters at the start or end of the string.  
- String has exactly one group of length k, and it's surrounded by different characters or is at the boundary.  
- All characters are identical but longer than **k**, so not isolated.  
- **k = 1** case, where any single character needs to be isolated.

### Solution

```python
def has_special_substring(s: str, k: int) -> bool:
    n = len(s)
    i = 0

    while i < n:
        # Start of a block
        j = i
        while j < n and s[j] == s[i]:
            j += 1
        length = j - i

        if length == k:
            left_ok = (i == 0) or (s[i-1] != s[i])
            right_ok = (j == n) or (j < n and s[j] != s[i])
            if left_ok and right_ok:
                return True

        i = j  # Move to next group

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan through the string once, grouping consecutive identical characters.
- **Space Complexity:** O(1), as only a few pointers/counters are used regardless of the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the function if there can be multiple valid substrings, and you need to return their starting indices?  
  *Hint: Collect the indices instead of returning early; store when the isolation criteria is met.*

- What if the characters can be Unicode (not just ASCII) and the string is very long?  
  *Hint: Approach and code remain mostly unchanged; make sure to handle multi-byte characters safely if indexing.*

- How would you handle streaming input, where you cannot access the full string at once?  
  *Hint: You can maintain the current run and previous character state, emitting True as soon as a valid block is seen.*

### Summary
This problem uses a **single-scan grouping pattern**, commonly leveraged for substring or interval problems (“group by” operations). The technique is efficient for detecting isolated blocks in an array/string. The same approach can be applied in character run-length encoding, unique element blocks, or even many sliding window challenges where runs matter more than the individual elements.

### Tags
String(#string)

### Similar Problems
