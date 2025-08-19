### Leetcode 3557 (Medium): Find Maximum Number of Non Intersecting Substrings [Practice](https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings)

### Description  
Given a string, find the **maximum number of non-intersecting substrings** that:
- Are at least **four characters long**  
- **Start and end with the same letter**  
Each substring chosen **cannot overlap with another**. Return the count of such substrings.

### Examples  

**Example 1:**  
Input: `word = "abacdeafde"`  
Output: `2`  
*Explanation: 
  - The first substring is `"abacd"` (from index 0 to 4, starts and ends with 'a'), but its length is 5, not 4. We need at least 4 and can look for bigger matching patterns.
  - Alternately, one possible set is `"abacdea"` (index 0 to 6) and `"fde"` does not count since its length is less than 4. 
  - The maximum, valid, non-overlapping substrings are `"abacdea"` and `"fdeafde"`, giving a total of 2.*

**Example 2:**  
Input: `word = "aabcdefaa"`  
Output: `1`  
*Explanation:
  - The only substring that starts and ends with the same character ('a') and is at least length 4 is `"aabcdefaa"` (indexes 0 to 8). Only one non-intersecting substring is possible.*

**Example 3:**  
Input: `word = "aaabbbaaaccaaa"`  
Output: `3`  
*Explanation:
  - One possible set: `"aaabbbaaa"` (0-8), `"ccaac"` (8-12), and the last group `"aaa"` (11-13) does not count (since its length is only 3).
  - So, the maximum number is 3 non-overlapping substrings of required type.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try all possible substrings (\(O(n^2)\)), check if each starts and ends with the same letter, is ≥ 4 chars, and pick non-overlapping ones greedily. This is too slow for large inputs.
- **Optimization:**  
  - Notice: We only care about the leftmost and rightmost occurrences of each character (since a valid substring must start and end with that character).
  - For each character, record the first and last occurrence.
  - For each index, if the character is at its first occurrence, consider substring from that position to its last occurrence. If it's at least four characters, it's a candidate.
  - Sort these candidate intervals by their end indices.
  - Use a greedy approach: Iterate over candidates, always picking the next interval that starts after the previous picked interval ends (classical "interval scheduling").
- **Trade-offs:**  
  - This reduces complexity from \(O(n^2)\) to \(O(n \log n)\) due to sorting and is efficient.
  - Other filtering or shrinking is not needed because any valid interval for a character, defined as [first occurrence, last occurrence], is maximal for that letter.

### Corner cases to consider  
- Empty string (`""`)
- No substrings of length ≥ 4
- All characters unique → no valid substrings
- Overlapping valid intervals, and how to select the max non-overlapping set
- Repeated letters far apart
- Strings where substrings have just a 4-length valid interval
- All letters are the same

### Solution

```python
def maxSubstrings(word: str) -> int:
    # Store the first and last occurrence of each character
    first = {}
    last = {}
    for i, c in enumerate(word):
        if c not in first:
            first[c] = i
        last[c] = i

    # Collect all valid intervals [start, end] for substrings of length ≥ 4
    intervals = []
    for c in first:
        start, end = first[c], last[c]
        # Only consider if interval is ≥ 4 chars
        if end - start + 1 >= 4:
            intervals.append((start, end))

    # Sort intervals by their end index (greedy interval scheduling)
    intervals.sort(key=lambda x: x[1])

    # Pick maximal number of non-overlapping intervals
    res = 0
    prev_end = -1
    for start, end in intervals:
        if start > prev_end:
            res += 1
            prev_end = end

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n) to compute first/last for all chars  
  - O(σ) (where σ is number of unique chars) to create intervals  
  - O(σ log σ) for sorting intervals  
  - O(σ) for selecting intervals  
  - Overall: O(n + σ log σ) → O(n log n) in worst case, where σ ≈ n.

- **Space Complexity:**  
  - O(σ) for first/last dicts  
  - O(σ) for intervals  
  - Total: O(σ), where σ is the number of unique characters (upper bounded by n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also needed to return the substrings themselves, not just the count?  
  *Hint: Save the indices, then use slicing.*

- Can you handle a version where substrings must not only be non-intersecting, but also non-adjacent?  
  *Hint: Adjust your interval selection, considering a minimum gap between intervals.*

- How would you extend to allow substrings to start and end with any two characters, not necessarily the same?  
  *Hint: Track all pairs and test for their possible start/end positions.*

### Summary
This solution uses the **greedy interval scheduling** pattern: Compute candidate intervals, sort by end, select the max set of non-overlapping intervals.  
This is a classic pattern in many substring, interval, and scheduling problems (e.g., "Non-overlapping Intervals", "Merge Intervals", "Video Stitching"). Recognizing this pattern helps attack a wide range of interview and contest questions.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
