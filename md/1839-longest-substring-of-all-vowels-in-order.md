### Leetcode 1839 (Medium): Longest Substring Of All Vowels in Order [Practice](https://leetcode.com/problems/longest-substring-of-all-vowels-in-order)

### Description  
Given a string `word` consisting only of English vowels ('a', 'e', 'i', 'o', 'u'), return the length of the **longest substring** that:
- Contains all five vowels at least once,  
- and vowels appear in **alphabetical order** (all 'a' occur before any 'e', all 'e' before any 'i', etc.; each vowel can repeat).

If no such substring exists, return 0.

### Examples  

**Example 1:**  
Input: `aeiaaioaaaaeiiiiouuuooaauuaeiu`  
Output: `13`  
*Explanation: The longest substring that contains all five vowels in order is `aaaaeiiiiouuu` (indices 6–18).*

**Example 2:**  
Input: `aeeeiiiioooauuuaeiou`  
Output: `5`  
*Explanation: The substring `aeiou` at the end contains each vowel in order exactly once.*

**Example 3:**  
Input: `aeeeaaaeeiioooauuuaeiou`  
Output: `5`  
*Explanation: There’s a substring `aeiou` at the end, but no longer substring meets all conditions.*

**Example 4:**  
Input: `aeio`  
Output: `0`  
*Explanation: Not all five vowels are present (no 'u'), so return 0.*

### Thought Process (as if you’re the interviewee)  
First, I want to check every possible substring, but brute-forcing every substring takes O(n²) time—which is too slow for long strings.

But since vowels must appear in “aeiou” order, I can scan the input string from left to right, using a sliding window.  
- I start a new window at each 'a'.  
- As I continue, I check if each next character is the same as or the next valid vowel.  
- I keep a count of distinct vowel transitions.  
- When I reach 'u' and all 5 vowels have been seen in order, I record and compare the window length.  
- If the order is violated (character out of order), reset and start again with the next 'a'.

This greedy, single-scan approach is efficient because the window either extends, or resets as soon as order breaks.

### Corner cases to consider  
- Input is empty.
- Input contains only a single vowel, or is missing one or more vowels.
- Multiple consecutive 'a's (window can possibly start at each 'a').
- All vowels present, but out of order.
- Very long input with no beautiful substring.
- Vowels appear with repeats—must handle repeated vowels.
- Entire string is already beautiful.

### Solution

```python
def longestBeautifulSubstring(word: str) -> int:
    vowels = 'aeiou'
    max_len = 0
    curr_len = 1
    vowel_idx = 0  # Track position in 'aeiou'

    for i in range(1, len(word)):
        # If current char is same as previous, continue current vowel block
        if word[i] == word[i - 1]:
            curr_len += 1
        # Next vowel in the correct order
        elif vowel_idx < 4 and word[i] == vowels[vowel_idx + 1]:
            vowel_idx += 1
            curr_len += 1
        # Not in order, so reset window
        else:
            # Reset to new window starting at current character
            if word[i] == 'a':
                curr_len = 1
                vowel_idx = 0
            else:
                curr_len = 0
                vowel_idx = 0

        # If reached 'u' (last vowel), and all vowels seen, update answer
        if vowel_idx == 4:
            max_len = max(max_len, curr_len)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n),  
  because we scan the string once, updating pointers and counters in constant time per step.
- **Space Complexity:** O(1),  
  since only a handful of integer variables are needed regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if vowels may appear in any order, but all must be present?  
  *Hint: Try using a frequency counter map, and sliding window for distinctness.*

- How would you return the actual substring, not just its length?  
  *Hint: Track the window’s start and end indices in addition to the length.*

- How can you adjust for a variant where some vowels can be skipped (i.e., order may have gaps)?  
  *Hint: Permit skipping to next vowel if ahead in the order list but never backward.*

### Summary
We use a **greedy single pass sliding window** to track when a window contains all vowels in order.  
This is a classic example of stateful two-pointer traversal, tracking state transitions (“block” of each vowel), allowing efficient O(n) time and O(1) space.  
This pattern appears in "sliding window with distinct characters/ordered patterns" problems, such as “Longest substring with k distinct elements”, or “Longest substring with all required characters in order”.