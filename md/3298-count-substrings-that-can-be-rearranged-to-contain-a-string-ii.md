### Leetcode 3298 (Hard): Count Substrings That Can Be Rearranged to Contain a String II [Practice](https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-ii)

### Description  
Given two strings **word1** and **word2**, count the number of substrings in **word1** that can be rearranged such that **word2** is the prefix of that rearranged substring.  
A substring x is **valid** if you can reorder the letters in x so that it begins with the full **word2**.  
Return the total number of valid substrings.

### Examples  

**Example 1:**  
Input: `word1 = "bcca", word2 = "abc"`  
Output: `1`  
*Explanation: Only the substring "bcca" can be rearranged to "abcc" where "abc" is the prefix.*

**Example 2:**  
Input: `word1 = "abcabc", word2 = "abc"`  
Output: `10`  
*Explanation: All substrings of length ≥3 are valid. That is, "abc", "bca", "cab", "abca", "bcab", "cabc", "abcab", "bcabc", "abcabc", ... Each can be rearranged so that "abc" is the prefix.*

**Example 3:**  
Input: `word1 = "abcabc", word2 = "aaabc"`  
Output: `0`  
*Explanation: There is no substring of "abcabc" with at least three 'a's to form "aaabc" as any prefix after rearrangement. So, none are valid.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea**:  
  Iterate over all substrings of **word1**. For each substring, count the frequency of each letter. If there are at least as many of each letter as required by **word2**, we can rearrange it to start with **word2** (since the required prefix letters will be present).  
  Time Complexity: O(N³) -- generate all substrings, check each, won't work for constraints up to 10⁶.

- **Optimized Approach**:  
  Since only substrings with a length ≥ len(word2) can possibly be valid, use a **sliding window** of length len(word2), then extend the window to the right.  
  - Use a character frequency array for the window and compare with the need-count for each letter in **word2**.
  - For each window, check if the window contains at least as many of each character as **word2**.
  - If valid for a left index, then **all larger substrings** starting at that left index and at least len(word2) long are also valid (because adding more characters can't invalidate).

  This way, we only need to check start/end positions where the substring is long enough, checking and updating freq arrays as the window slides.  
  Use prefix sums or direct counting to keep this **O(N \* 26)**.

- **Why this approach?**  
  This pattern works because the problem is about counting substrings where a fixed requirement is satisfied, which is well-suited for sliding window with frequency counting.

### Corner cases to consider  
- **word1** or **word2** are single letters.
- **word2** contains characters not in **word1** at all.
- All chars in **word2** are the same.
- **word2** is longer than **word1** (output is 0).
- Substrings of **word1** don't have enough frequency for some char in **word2**.

### Solution

```python
def count_substrings(word1: str, word2: str) -> int:
    n = len(word1)
    m = len(word2)
    if m > n:
        return 0

    # Count required frequency of each character in word2
    need = [0] * 26
    for c in word2:
        need[ord(c) - ord('a')] += 1

    # Current window frequency
    window = [0] * 26
    result = 0
    left = 0

    # Pre-fill window with first m-1 characters (will fill m-th char inside loop)
    for i in range(m - 1):
        window[ord(word1[i]) - ord('a')] += 1

    for right in range(m - 1, n):
        # Add rightmost character to window
        window[ord(word1[right]) - ord('a')] += 1

        # Move left until window is valid (or until window is exactly size m)
        while left <= right and all(window[i] >= need[i] for i in range(26)):
            # All substrings [left, right], [left, right+1], ... [left, n-1] will be valid
            result += n - right
            # Remove word1[left] and shrink window from left
            window[ord(word1[left]) - ord('a')] -= 1
            left += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N \* 26). For each index, the frequency comparison checks at most 26 English lowercase chars. In practice, this is linear in N for each step.
- **Space Complexity:** O(26). Only constant extra space needed for the frequency arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **unicode** or uppercase/lowercase characters?  
  *Hint: Can you generalize your frequency arrays for any possible character?*

- Can you optimize further if **word2** contains only a few unique characters?  
  *Hint: Track only necessary characters instead of all 26.*

- Can you solve the problem if substrings must be exactly length L?  
  *Hint: Directly fix window to given size and slide.*

### Summary
This problem uses the **sliding window with character frequency counting** pattern. It's a classic window/frequency check with an early-stopping trick: as soon as a substring is valid, all longer substrings starting at that left index are also valid. This approach is efficient for substring count/count of substrings with "at least" requirements, and can be adapted to many permutation and anagram-type subarray problems.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)