### Leetcode 3085 (Medium): Minimum Deletions to Make String K-Special [Practice](https://leetcode.com/problems/minimum-deletions-to-make-string-k-special)

### Description  
Given a string `word` and an integer `k`, a string is called **k-special** if, for every pair of indices i, j, the absolute difference in frequency of any two characters word[i] and word[j] is at most k.  
Your goal is to compute the **minimum number of deletions** needed to make the string k-special.  
That is, find the minimal number of characters to delete so that for all characters, the difference between the maximum and minimum nonzero frequency is ≤ k.

### Examples  

**Example 1:**  
Input: `word = "aabcaba", k = 0`  
Output: `3`  
Explanation: Delete 2 × 'a' and 1 × 'c'. Now word = "baba", so freq('a') = freq('b') = 2, which fulfills the k-special constraint for k = 0.

**Example 2:**  
Input: `word = "abcde", k = 1`  
Output: `0`  
Explanation: All characters appear once, so the maximum and minimum frequencies are both 1. No deletions needed.

**Example 3:**  
Input: `word = "aaaabbbbcccc", k = 2`  
Output: `2`  
Explanation: Each character appears 4 times. Delete 1 'a' and 1 'b' to make frequencies [3,3,4] (difference ≤ 2).

### Thought Process (as if you’re the interviewee)  
Brute-force would be to try all possible ways of deleting characters, but that’s exponential and not practical.  
Let’s analyze the frequencies of each character:
- For the string to be k-special, the *difference* between the minimum and maximum frequency should be ≤ k.
- If any character’s frequency is too high, delete excess. If it’s too low or missing, it’s fine to delete all occurrences.
- For each possible “base” frequency `v` (the minimum frequency you want to keep for any character), loop from 0 up to the maximum frequency in the string:
    - For every character, if its count < v, delete all of it.  
    - If its count > v + k, delete the excess so count = v + k.
    - Otherwise, keep as is.
    - Sum deletions for all characters.
- Take the minimum deletions across all v (0 to max frequency) as answer.

Greedy & Frequency-counting is efficient because the string’s length is small, and the alphabet size is limited (≤26 for lowercase English).

### Corner cases to consider  
- Empty string (`word = ""`), should return 0.
- All characters are the same.
- k ≥ (max_freq - min_freq) initially, so zero deletions needed.
- String with all unique characters (`k = 0` or `k = 1`).
- Alphabet with only 1 character.
- Very large k.

### Solution

```python
def minimum_deletions(word: str, k: int) -> int:
    # Count frequency of each character
    freq = [0] * 26
    for ch in word:
        freq[ord(ch) - ord('a')] += 1

    # Filter out zero counts (non-present letters)
    counts = [c for c in freq if c > 0]

    min_del = float('inf')
    max_count = max(counts, default=0)

    # Try each possible base frequency v
    for v in range(0, max_count + 1):
        deletions = 0
        for f in counts:
            if f < v:
                # Delete all, can't raise freq by adding
                deletions += f
            elif f > v + k:
                # Reduce to at most v + k
                deletions += f - (v + k)
            # else, frequency in [v, v + k], keep as is
        if deletions < min_del:
            min_del = deletions

    return min_del
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M × M), where M is the number of unique characters (≤26). For each possible base frequency (≤max count, at most len(word)), iterate over each unique character.
- **Space Complexity:** O(1), because space for counts is at most 26 for lowercase English, and variables for computation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains Unicode or all printable ASCII characters, not just lowercase English?  
  *Hint: Use a hash map instead of a fixed-size array.*

- Can you reconstruct one possible k-special string with the minimum deletions, not just the count?  
  *Hint: Track from which positions deletions should occur while calculating counts.*

- How would you optimize for very long strings with a small alphabet (e.g., DNA bases, ACGT)?  
  *Hint: The loop per base frequency remains tractable since the number of unique characters is small.*

### Summary
This problem is a classic *frequency-balancing* task, using greedy enumeration over base frequencies and simulating deletions.  
The core coding pattern here is **sliding over possible thresholds, frequency counting, and greedy balancing**, which is reusable for many "balance/delete to achieve property" string/array interview questions.  
It's a good example of trading brute-force for enumeration over possible outcomes for a compact domain (frequencies).

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Minimum Deletions to Make Character Frequencies Unique(minimum-deletions-to-make-character-frequencies-unique) (Medium)