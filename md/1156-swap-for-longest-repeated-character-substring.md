### Leetcode 1156 (Medium): Swap For Longest Repeated Character Substring [Practice](https://leetcode.com/problems/swap-for-longest-repeated-character-substring)

### Description  
Given a string consisting of lowercase English letters, you can swap any two characters in the string (you are allowed to do at most one such swap).  
Your goal is to return the length of the *longest* substring possible where every character in the substring is the same (a repeated character substring), after performing at most one swap.

### Examples  

**Example 1:**  
Input: `text = "ababa"`  
Output: `3`  
Explanation: Swap the first 'b' with the last 'a' or the last 'b' with the first 'a'. After swap, the longest repeated substring is "aaa" of length 3.

**Example 2:**  
Input: `text = "aaabaaa"`  
Output: `6`  
Explanation: Swap the 'b' with the last 'a' (or the first 'a') to get "aaaaaa". Longest repeated substring is now "aaaaaa" of length 6.

**Example 3:**  
Input: `text = "aaaaa"`  
Output: `5`  
Explanation: No swap needed; entire string "aaaaa" is a repeated substring of length 5.

**Example 4:**  
Input: `text = "aaabbaaa"`  
Output: `4`  
Explanation: After one swap, we can get a longer repeated substring of length 4 but not longer.

**Example 5:**  
Input: `text = "abcdef"`  
Output: `1`  
Explanation: No swaps will give a repeated substring longer than length 1 (all chars are unique).

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Consider all possible swaps, for each swapped string compute the length of the longest repeated character substring. Inefficient: O(n² × n).

- **Optimized Approach:**  
  - Count the frequency of each character.  
  - Analyze the string to find all blocks (consecutive runs) of each character and their lengths.  
  - For each such block, try to extend it by including a same character from elsewhere in the string using the allowed swap.  
  - Special optimization: If you find runs of the form `aaa...b...aaa` (a block of 'a's, a different character in between, then another block of 'a's), and the sum of the blocks plus possibly one more 'a' exists elsewhere can be considered.
  - For each block, take the minimum of (block length + 1) and (total frequency of the character) to account for swaps.

- **Why this approach?**  
  This works in O(n), is efficient in practice, and carefully handles the swap edge cases.

### Corner cases to consider  
- All characters are the same (`"aaaaa"`)  
- All characters unique (`"abcdef"`)  
- Only one character in string (`"a"`)  
- Multiple non-adjacent blocks of target character  
- Blocks separated by only one different character

### Solution

```python
def max_rep_opt1(text):
    # Count total occurrences of each character
    freq = {}
    for c in text:
        freq[c] = freq.get(c, 0) + 1

    n = len(text)
    # List of (char, start_index, length)
    groups = []
    i = 0
    while i < n:
        j = i
        while j < n and text[j] == text[i]:
            j += 1
        groups.append((text[i], i, j - i))
        i = j

    max_len = 0

    for idx, (char, start, length) in enumerate(groups):
        # Case 1: Try to extend this group by one more char if possible
        # But cannot exceed total number of that char in string
        max_len = max(max_len, min(length + 1, freq[char]))

        # Case 2: Handle split groups, e.g., 'aaa_b_aaa'
        # i.e., two same char groups separated by ONE different char
        if (idx + 2 < len(groups) and 
            groups[idx][0] == groups[idx + 2][0] and 
            groups[idx + 1][2] == 1):
            combined = groups[idx][2] + groups[idx + 2][2]
            # Can we add one more swap-in from elsewhere?
            max_len = max(max_len, min(combined + 1, freq[char]))

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)   
  - Each pass through the string (for freq, groupings) is linear in input size.
  - The final loop is also O(n).

- **Space Complexity:** O(n)  
  - Dictionaries and lists store up to O(n) data in worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we are allowed to make multiple swaps?  
  *Hint: Try extending runs block by block, using more than one swap, and keep a count of available matching characters.*

- How would your approach change if some characters could not be swapped (e.g., some are “locked”)?  
  *Hint: Only count unlocked positions for possible swaps.*

- What if you want to know the actual substring, not just its length?  
  *Hint: Track indices while maximizing length.*

### Summary
This problem is best solved by breaking the string into runs of repeated characters, counting each character’s total frequency, and analyzing how blocks can be merged or extended by a single swap. It’s a combination of sliding window and greedy grouping—patterns also used in questions about substring manipulation and maximum segment finding.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
