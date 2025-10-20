### Leetcode 395 (Medium): Longest Substring with At Least K Repeating Characters [Practice](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters)

### Description  
Given a string `s` and an integer `k`, find the length of the longest substring where **every character appears at least k times**. Only contiguous substrings count. If no such substring exists, return 0.

Effectively:  
- Check all possible substrings of `s`.
- For each substring, every unique character within it must occur ≥ k times.
- Return the length of the longest such substring.

### Examples  

**Example 1:**  
Input: `s = "aaabb", k = 3`  
Output: `3`  
*Explanation: The substring "aaa" has each character ('a') at least 3 times. "aaabb" isn't valid since 'b' appears only twice.*

**Example 2:**  
Input: `s = "ababbc", k = 2`  
Output: `5`  
*Explanation: The substring "ababb" is valid; 'a' and 'b' appear ≥ 2 times. "ababbc" isn't valid because 'c' appears only once.*

**Example 3:**  
Input: `s = "weittttttqweiii", k = 3`  
Output: `7`  
*Explanation: The substring "ttttttt" is valid as 't' appears 7 times, satisfying k = 3.*

### Thought Process (as if you’re the interviewee)  
First thought:  
- Brute-force by checking all substrings, counting frequencies for each.  
- This approach is O(n³): O(n²) substrings × O(n) frequency check.
- Too slow for large n.

Optimization:  
- **Divide and conquer:**  
  - For any substring, if there's a character (call it 'bad') that appears < k times, any valid substring can't include 'bad'.
  - So, split the string on all 'bad' characters and recursively check each part.
  - If all characters occur at least k times, the entire substring is valid.
- This approach is much faster and typical for string frequency problems.

Further:  
- For a stricter linear time solution, apply sliding window + tracking unique counts. But divide-and-conquer is very intuitive here.

**Trade-offs:**  
- Divide and conquer is easy to code, avoids unnecessary checks, O(n) in practice for English alphabet.
- Sliding window is trickier, often used for subarray/substr problems where unique counts are a natural limit.

### Corner cases to consider  
- k > length of s (no substring can be valid)
- k = 0 (every substring is valid, entire string returned)
- s is empty (output 0)
- All characters in s are unique but k > 1 (output 0)
- All same characters in s (should return entire s if s's length ≥ k)
- Multiple splits required: "ababc", k=2 (no substring valid)

### Solution

```python
def longestSubstring(s: str, k: int) -> int:
    # Base case: if string too short, cannot satisfy
    if len(s) < k:
        return 0
    # Count frequency of each character in current substring
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    # Find any character that doesn't meet threshold
    for bad in freq:
        if freq[bad] < k:
            # Split around each 'bad' character
            return max(longestSubstring(substr, k) for substr in s.split(bad))
    # If all characters meet threshold, whole substring is valid
    return len(s)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) for English alphabet—since we split only on at most 26 possible characters and recurse only on those splits, the splits decrease the problem size quickly. For generalized arbitrary alphabet, worse, but for 26 letters, practical O(n).

- **Space Complexity:**  
  O(n) from recursion stack in the worst case (all splits are one character), plus O(1) for frequency map.

### Potential follow-up questions (as if you’re the interviewer)  

- If the alphabet is larger (e.g., Unicode, not just a-z), how would your solution change?  
  *Hint: Consider efficiency if the split can happen on thousands of characters.*

- Could you return the actual substring(s), not just the length?  
  *Hint: Think about storing substring indices or locations along with maximum lengths.*

- How would you solve it in a streaming/online fashion (i.e., s arrives one char at a time)?  
  *Hint: Consider using windowed counters and sliding window techniques, but note the 'all chars ≥ k' requirement.*

### Summary
This is a classic **divide and conquer on substrings** pattern. For string problems where a frequency threshold matters and there are "invalid" splitters, this technique allows efficient pruning of the search space. It avoids brute-force enumerations and exploits string segmentation. This pattern appears in similar questions involving valid substring/partitioning based on character count constraints, such as splitting strings based on frequent/infrequent characters.


### Flashcard
Divide and conquer: split string on chars appearing < k times, recursively solve each part, and take the max length.

### Tags
Hash Table(#hash-table), String(#string), Divide and Conquer(#divide-and-conquer), Sliding Window(#sliding-window)

### Similar Problems
- Longest Subsequence Repeated k Times(longest-subsequence-repeated-k-times) (Hard)
- Number of Equal Count Substrings(number-of-equal-count-substrings) (Medium)
- Optimal Partition of String(optimal-partition-of-string) (Medium)
- Length of Longest Subarray With at Most K Frequency(length-of-longest-subarray-with-at-most-k-frequency) (Medium)
- Find Longest Special Substring That Occurs Thrice II(find-longest-special-substring-that-occurs-thrice-ii) (Medium)
- Find Longest Special Substring That Occurs Thrice I(find-longest-special-substring-that-occurs-thrice-i) (Medium)