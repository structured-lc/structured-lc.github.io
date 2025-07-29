### Leetcode 2516 (Medium): Take K of Each Character From Left and Right [Practice](https://leetcode.com/problems/take-k-of-each-character-from-left-and-right)

### Description  
Given a string `s` consisting only of the characters `'a'`, `'b'`, and `'c'`, and a non-negative integer `k`, you can remove one character at a time—either from the left or right end. In each minute you may remove only a single character from either end. Return the minimum number of minutes needed to take at least **k** of each character from the string (by removing them from the ends). If it is impossible to collect at least k of each character, return `-1`.

### Examples  

**Example 1:**  
Input: `s = "aabaaaacaabc", k = 2`  
Output: `8`  
*Explanation: You can take the 2 'a's from the left, 2 'b's and 2 'c's from the right, and combine removals as needed. The smallest number of moves to capture at least 2 of each is 8.*

**Example 2:**  
Input: `s = "abcabc", k = 2`  
Output: `6`  
*Explanation: Need to take all characters from the string (since each char appears only twice). Take all 6 characters.*

**Example 3:**  
Input: `s = "aabbcc", k = 3`  
Output: `-1`  
*Explanation: Not enough of each character ('a','b','c') to take 3 of each. Return -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all combinations of picking some number (x) from the left and (y) from the right, so that for all 0 ≤ x, y ≤ n, the combination of the multi-set of the prefix (first x) and suffix (last y) contains at least k of each character. For each (x, y), check the combined counts; if valid, track the minimum x+y.  
  But that's O(n²), which is inefficient for n up to 10⁵.

- **Optimal Approach:**  
  Instead of focusing on what to remove, focus on the minimal substring to **keep**. The rest can be taken from the ends.  
  Since we must pick k of each, what remains **inside** (i.e., not taken from the ends) can have at **most** total counts of (count[c] - k) for each c in 'a','b','c'. So, find the largest subarray (window) that can be left in the middle such that, after removing it, you have at least k of each character in the removed string.
  
  That is, slide a window over the string, and for each window, check if the counts outside the window (left part + right part) have at least k of each character. If so, the minimal number of moves is n - window size (since you have to remove n - window size characters).

- **Reason for this approach:**  
  One pass with a sliding window, O(n) time. Enables us to efficiently find the optimal answer for large n.

### Corner cases to consider  
- The string doesn't contain enough of any required character (return -1).
- k = 0 (need 0 of each character; so, 0 moves are needed).
- String length is less than 3×k (impossible).
- All required characters appear only at the extremes.
- n = 0 / empty string.
- All identical characters.

### Solution

```python
def takeCharacters(s: str, k: int) -> int:
    n = len(s)
    if k == 0:
        return 0  # Nothing to collect

    # Total count for each character
    total = {'a':0, 'b':0, 'c':0}
    for c in s:
        total[c] += 1

    # If any character not present enough times, impossible
    if any(total[ch] < k for ch in 'abc'):
        return -1

    # Try to keep the longest window in the string such that
    # the remainder from both ends (i.e., removed) contains at least k of each
    max_window = 0
    left = 0
    count = {'a':0, 'b':0, 'c':0}
    for right in range(n):
        count[s[right]] += 1

        # While the remaining chars outside current window
        # do NOT give at least k for each char, shrink from left
        while any(total[ch] - count[ch] < k for ch in 'abc') and left <= right:
            count[s[left]] -= 1
            left += 1

        # Valid window
        if all(total[ch] - count[ch] >= k for ch in 'abc'):
            max_window = max(max_window, right - left + 1)

    # Answer is min chars to take = n - max(window size left in middle)
    return n - max_window
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each character is visited at most twice (once as right, once as left of window).
- **Space Complexity:** O(1), only need dicts counting 'a','b','c' (fixed size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had more than 3 unique characters in s?
  *Hint: How would you generalize the counting and sliding-window logic for arbitrary alphabets?*

- How would you output the actual sequence of removals?
  *Hint: Consider tracing how many from left or right for minimal solution, and reconstruct moves.*

- What if the characters are weighted and removals have cost?
  *Hint: Can you minimize the cost instead of the count? How would you model that?*

### Summary
This is a classic **sliding window + counting** problem. The main idea is to maximize the portion of the string that doesn't contribute to the requirement, thus minimizing what you need to take from the ends. This approach is O(n) and is robust for other similar prefix/suffix collection or subarray-removal minimization problems. The sliding window counting method is widely useful for substring/sequence problems where simultaneous requirements are imposed on counts or properties.