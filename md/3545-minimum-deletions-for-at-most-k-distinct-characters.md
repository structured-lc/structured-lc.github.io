### Leetcode 3545 (Easy): Minimum Deletions for At Most K Distinct Characters [Practice](https://leetcode.com/problems/minimum-deletions-for-at-most-k-distinct-characters)

### Description  
Given a string s of lowercase English letters and an integer k, your task is to delete the fewest possible characters such that the string has at most k distinct (unique) characters. Return the minimum number of deletions required. The function should return 0 if the input already has ≤ k distinct characters.

### Examples  

**Example 1:**  
Input: `s = "abc", k = 2`  
Output: `1`  
Explanation: Remove one character (for example, 'c'), leaving "ab" (which has 2 distinct characters).

**Example 2:**  
Input: `s = "aabb", k = 2`  
Output: `0`  
Explanation: The string already has only 2 distinct characters ('a', 'b'). No deletions needed.

**Example 3:**  
Input: `s = "aabbcc", k = 1`  
Output: `4`  
Explanation: Remove 'b's and 'c's, leaving only "aa" (or only "bb", or only "cc"). Need 2 deletions for each of the other two characters, 2 × 2 = 4 deletions.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible set of characters to retain, delete others, and count deletions. This is too slow; number of possible character subsets is exponential.

- **Optimization:**  
  Since we want to minimize deletions, we need to *keep* the k most frequent characters (since it's cheapest to delete rare characters).  
  Steps:  
  - Count the frequency of each character.  
  - If number of unique characters ≤ k, return 0.  
  - Otherwise, sort the counts in ascending order.  
  - Remove all characters except the k with highest counts. This means sum the frequencies of the (number of unique characters - k) lowest-frequency characters.  
  - The sum is the answer.

- **Why this works:**  
  Removing rarest character types costs the least number of deletions.

### Corner cases to consider  
- k = 0 (should delete all characters).
- s is an empty string (should return 0).
- k ≥ number of unique characters (no deletions needed).
- k = 1, all unique characters (remove all except the one that appears most).
- All characters are identical (no deletions needed for any k ≥ 1).
- s is very large but total unique characters are small.

### Solution

```python
def minimum_deletions(s: str, k: int) -> int:
    # Count frequency of each character (fixed at 26 for lowercase)
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    # Get list of frequencies > 0 (i.e., existing characters)
    counts = [f for f in freq if f > 0]

    # If unique chars ≤ k, no deletions needed
    if len(counts) <= k:
        return 0

    # Sort frequencies (greedy remove lowest-frequency chars)
    counts.sort()

    # Remove all except k most frequent (delete rest)
    to_delete = len(counts) - k
    return sum(counts[:to_delete])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + d log d) where n = len(s), and d = number of unique characters. Since English lowercase letters are at most 26, this is effectively O(n).
- **Space Complexity:** O(1), as character frequency array has fixed size (26).

### Potential follow-up questions (as if you’re the interviewer)  

- What if s contains uppercase/lowercase, unicode, or more than 26 possible characters?  
  *Hint: Adjust frequency-counting data structure (dictionary/map) as needed.*

- Can you efficiently find which k character types to keep for very large input?  
  *Hint: Use a min-heap instead of sort for larger alphabet sizes.*

- What if deletions are not allowed—must return -1 if the input cannot be made valid?  
  *Hint: Quick check on the number of unique characters and k.*

### Summary
This problem uses the **frequency counting + greedy** deletion pattern: always keep the most frequent types you are allowed, and delete the rest. This approach is extremely common for “minimize removals to satisfy a constraint” involving character types/frequencies, and generalizes to many frequency-greedy problems.