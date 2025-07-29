### Leetcode 1234 (Medium): Replace the Substring for Balanced String [Practice](https://leetcode.com/problems/replace-the-substring-for-balanced-string)

### Description  
Given a string s, of length n (where n is a multiple of 4), consisting only of the characters 'Q', 'W', 'E', and 'R':  
A string is *balanced* if each character appears exactly n/4 times.  
Your goal is to find the **minimum length of a substring** in s that you can replace with any other string (of the same length), so that the whole string becomes balanced.  
If s is already balanced, return 0.

### Examples  

**Example 1:**  
Input: `s = "QWER"`  
Output: `0`  
*Explanation: Since the string is already balanced (one of each letter), no replacement needed.*

**Example 2:**  
Input: `s = "QQWE"`  
Output: `1`  
*Explanation: Replace one 'Q' with 'R', e.g., "QRWE" becomes balanced (each letter appears once).*

**Example 3:**  
Input: `s = "QQQW"`  
Output: `2`  
*Explanation: Replace "QQ" with "ER" (or "RE" or "EW", etc.), so "ERQW" (or "REQW", etc.) becomes balanced (each letter appears once).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  *Try every possible substring. For each, "replace" it (i.e., ignore/count its removal) and check if the remaining parts of the string can be balanced after adding the right counts. For each substring, calculate its length if that replacement can balance the whole string. Too slow!*

- **Key Insight:**  
  The problem is about **removing extra characters** (those that occur more than n/4) to achieve balance.  
  Use a **sliding window**:  
    - For each window (substring), you are "removing" it and can imagine changing it to whatever is best.
    - For the region *outside* the window: check if every character count is ≤ n/4.
    - If so, the substring window can be replaced to fix the surplus and balance the string.

- **Implementation:**
  - Count total occurrences of each char.
  - Set target = n/4 for each.
  - Use two pointers (left and right) for the sliding window.
  - Move right pointer forward, expand window, and decrement current window’s letters from the surplus counts.
  - As long as *outside* the window, all counts ≤ target, try to shrink window from left for minimal solution.

- **Why is this optimal?**  
  This is standard sliding window for substring minimality, runs in O(n) time, since each pointer only moves forward.

### Corner cases to consider  
- Already balanced input: should return 0.
- All letters are the same (e.g., "QQQQ..." of length n): must replace ⌊n/4⌋ letters for each of 'W', 'E', 'R'.
- String length is 4: balanced or can be balanced with 1 replacement max.
- Very long strings: check for performance with large n.
- Multiple possible minimal substrings.

### Solution

```python
def balancedString(s):
    n = len(s)
    target = n // 4
    count = {'Q': 0, 'W': 0, 'E': 0, 'R': 0}
    
    # Count frequency of each letter
    for c in s:
        count[c] += 1

    # Early exit if already balanced
    if all(count[c] == target for c in 'QWER'):
        return 0

    min_len = n
    left = 0

    for right in range(n):
        count[s[right]] -= 1  # As if removing s[right]
        # As soon as outside window is "not exceeding n/4" for all chars, try to shrink from left
        while left < n and all(count[c] <= target for c in 'QWER'):
            min_len = min(min_len, right - left + 1)
            count[s[left]] += 1  # Re-include s[left] (shrinking window)
            left += 1

    return min_len
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n): Each pointer (left, right) advances at most n steps. Each check is O(1).

- **Space Complexity:**  
  O(1): Only a fixed-size dictionary for character counts (since only 4 possible chars), regardless of input length.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the alphabet has size k instead of 4?  
  *Hint: Adjust your target and use a fixed-size hash map instead of hard-coding four letters.*

- Can you return the actual substring (indices) instead of just its length?  
  *Hint: Store minimal window indices whenever you update min_len.*

- How would you solve this if the string could have arbitrary characters and arbitrary balance target?  
  *Hint: Generalize the same sliding window technique, but allow dynamic target per char.*

### Summary
This problem is a classic variant of the **sliding window** technique to find the minimum window that fixes a global property (here, character count balance). The approach generalizes to other substring minimality or replacement problems, and sliding window is a common coding pattern for these.