### Leetcode 2781 (Hard): Length of the Longest Valid Substring [Practice](https://leetcode.com/problems/length-of-the-longest-valid-substring)

### Description  
Given a string and a list of "forbidden" strings, find the **maximum length** of any substring that contains **no occurrence** of any forbidden string as a substring. The forbidden words may overlap or appear anywhere, but you want the longest streak that avoids all of them.  
You need to consider all possible substrings and efficiently reject those containing any forbidden substring.

### Examples  

**Example 1:**  
Input: `word = "cbaaaabc"`, `forbidden = ["aaa","cb"]`  
Output: `4`  
*Explanation: The substring `"aabc"` (indices 4 to 7) does not contain "aaa" or "cb".  
All substrings longer than 4 will have at least one forbidden substring. For example, `"baaa"` contains `"aaa"`.*

**Example 2:**  
Input: `word = "abacaba"`, `forbidden = ["ba","ab","ac"]`  
Output: `2`  
*Explanation: All substrings of length 3 or more will contain a forbidden word.  
Example, substring `"aba"` has `"ab"`, `"bac"` has `"ba"`, and `"aca"` has `"ac"`.  
The longest valid substrings are `"ca"` and `"ab"` (but "ab" is forbidden), so answer is `2`.*

**Example 3:**  
Input: `word = "leetcode"`, `forbidden = ["leet","code","tco"]`  
Output: `4`  
*Explanation: Substrings like `"leec"`, `"eetc"`, and `"tcod"` of length 4 do not have forbidden words.  
Any longer substring will have "leet" or "code".*

### Thought Process (as if you’re the interviewee)  

First, the brute-force idea: try every possible substring of `word`, check if any forbidden string appears in it. This is extremely inefficient.  
We want to avoid repeatedly checking the same substrings, and forbidden matches can be anywhere, so we need a fast way to test.  

- Since forbidden words are up to 10 characters, we can limit our check for each position to recent 10 characters.
- Use a **sliding window**: as we expand the window (right pointer), try to make it as long as possible without encountering forbidden substrings.
- At each position, only check for forbidden strings that could possibly end at the current character (right pointer).  
For each window ending at index `end`, we check substrings word[k:end+1] for `max(end-9, left)` ≤ k ≤ end.
  - If we find a forbidden word, move the left pointer just after its start.
  - Update result with the length of current valid window.

We store forbidden words in a set for **O(1)** lookups.

This approach is efficient since it never checks more than 10 substrings for each end position, and total runtime is O(n).

### Corner cases to consider  
- Empty string (`""`) as input
- All characters are forbidden one-length words (result is 0 or 1)
- Forbidden list is empty (answer is length of word)
- Forbidden words longer than the input word (irrelevant)
- Overlapping forbidden words
- Forbidden words at the start or end of word
- Single character word

### Solution

```python
def longest_valid_substring(word: str, forbidden: list[str]) -> int:
    # Store all forbidden words for fast lookup
    forbidden_set = set(forbidden)
    n = len(word)
    max_len = 0
    left = 0  # Left side of the window

    for right in range(n):
        # Check substrings ending at position right, with at most last 10 characters
        for k in range(right, max(right - 10, left - 1), -1):
            # Check if word[k:right+1] is forbidden
            if word[k:right + 1] in forbidden_set:
                # Move left pointer just after k (avoid this forbidden substring)
                left = k + 1
                break
        max_len = max(max_len, right - left + 1)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  For each position in `word` (n total), check up to 10 substrings (`for` loop covers at most next 10 characters back), so total at most 10\*n steps.

- **Space Complexity:** O(F + L),  
  Where F is total number of characters in forbidden list, needed to build the forbidden set; no other extra space proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the forbidden words can be longer than 10?  
  *Hint: How would limiting the look-back affect correctness? Can you preprocess the forbidden words for efficient search?*

- How would you do it if you had to build the forbidden set on-the-fly (e.g., streaming input)?  
  *Hint: Consider trie or Aho-Corasick automaton for dictionary matching.*

- Can you report **the actual substring** and not just its length?  
  *Hint: Track window indices where max length is updated for reconstruction.*

### Summary
This problem uses a classic **sliding window** approach with a **look-back limit** due to the constraint on forbidden word length.  
The key is to quickly check, at each character, whether the current window contains any forbidden substring, and update the window's left pointer efficiently.  
This solution pattern is common for substring and interval problems, especially when constraints allow bounding the look-back/check range (similar to "Longest Substring Without Repeating Characters", but with forbidden patterns instead of character uniqueness).  
A trie or Aho-Corasick automaton could generalize further if forbidden words were unbounded in length.


### Flashcard
Use a sliding window and a set of forbidden words (up to length 10) to check recent substrings efficiently, updating the max valid substring length.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
