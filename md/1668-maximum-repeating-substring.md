### Leetcode 1668 (Easy): Maximum Repeating Substring [Practice](https://leetcode.com/problems/maximum-repeating-substring)

### Description  
Given a string `sequence` and another string `word`, return the maximum integer `k` such that `word` repeated `k` times is a substring of `sequence`. In other words, find the largest `k` for which `word` × k is a substring of `sequence`.

### Examples  

**Example 1:**  
Input: `sequence = "ababc"`, `word = "ab"`  
Output: `2`  
*Explanation: "ab" repeated 2 times is "abab", which is a substring of "ababc"."

**Example 2:**  
Input: `sequence = "ababc"`, `word = "ba"`  
Output: `1`  
*Explanation: The substring "ba" occurs once as a substring.*

**Example 3:**  
Input: `sequence = "ababc"`, `word = "ac"`  
Output: `0`  
*Explanation: "ac" does not occur as a substring in "ababc".*


### Thought Process (as if you’re the interviewee)  
- Brute-force: For increasing `k`, check if `word` repeated `k` times is a substring of `sequence`. Track max `k` found.
- Each time, construct `word*k` and see if `word*k` in `sequence`.
- Continue until it isn't found.
- Since `sequence` can be up to 100, and `word` up to 100, at most try (length(sequence) // length(word)) + 1 times.
- Time is acceptable because string containment is efficient in Python.
- Choose brute-force since constraints are tight, and it's clear and simple.


### Corner cases to consider  
- `word` does not appear at all in `sequence` ⇒ Output 0.
- `word` is longer than `sequence` ⇒ Output 0.
- `word` occurs multiple, possibly overlapping times.
- Sequence contains only repeated `word` (maximum possible k).


### Solution

```python
def maxRepeating(sequence: str, word: str) -> int:
    k = 0
    pattern = word
    # Try increasing k until word*k is no longer a substring
    while pattern in sequence:
        k += 1
        pattern += word
    return k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × maxK), where n = len(sequence), m = len(word), and maxK is the maximum possible value for k. Each repetition checks a substring in the sequence.
- **Space Complexity:** O(m × maxK), due to the pattern string constructed up to maxK × len(word).


### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve the problem without creating repeated strings each time?
  *Hint: Slide a window over the string and use counters.*

- What if pattern matching is required for substring with errors or wildcards?
  *Hint: Explore KMP or DP for substring with mismatches.*

- How would you optimize for very large strings?
  *Hint: Use rolling hash or Rabin-Karp for checking repeated substrings efficiently.*

### Summary
This uses the brute-force substring repeat and check pattern, very common for simple pattern matching/counting in strings when constraints are tight. You can often optimize further using more advanced string matching (e.g., KMP, rolling hash) for larger cases.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), String Matching(#string-matching)

### Similar Problems
- Detect Pattern of Length M Repeated K or More Times(detect-pattern-of-length-m-repeated-k-or-more-times) (Easy)
- Minimum Number of Operations to Make Word K-Periodic(minimum-number-of-operations-to-make-word-k-periodic) (Medium)