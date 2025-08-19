### Leetcode 2272 (Hard): Substring With Largest Variance [Practice](https://leetcode.com/problems/substring-with-largest-variance)

### Description  
Given a string s of only lowercase English letters, find the largest variance among *all* substrings.  
**Variance** for a substring is defined as the maximum difference between the counts of any two distinct characters (i.e., choose any 2 distinct chars in the substring and take |count₁ - count₂|).  
You are to return this maximum variance over any possible substring.

### Examples  

**Example 1:**  
Input: `s = "aababbb"`  
Output: `3`  
*Explanation:  
Substrings and their variances include:  
- "babbb": count('b') = 3, count('a') = 1 ⇒ variance = 3 - 1 = 2  
- "babbb": count('b') = 3, count('a') = 1 ⇒ already found  
- "babbb": count('b') = 3, count('a') = 1  
- "babbb": count('b') = 3, count('a') = 1  
- "babbb": count('b') = 3, count('a') = 1  
But "babbb" is not the maximal one.  
Substring "babbb" (positions 3-7): count('b') = 4, count('a') = 1 ⇒ variance = 3  
Largest possible variance is 3.*

**Example 2:**  
Input: `s = "abcde"`  
Output: `1`  
*Explanation:  
Any two distinct characters in a substring differ in count at most by 1.*

**Example 3:**  
Input: `s = "aaaa"`  
Output: `0`  
*Explanation:  
There is no substring with two distinct characters, so the maximal variance is 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Check every possible substring, for each substring count every pair of distinct appearing characters and their |difference|.  
  For each substring O(26\*26) pairs, and O(n²) substrings → **O(n³)** time, which will *not* work for large n.

- **Observation:**  
  For any pair of distinct characters a, b, only care about their frequency difference in some substring.  
  We can fix a pair (a, b), and for the substring, keep only a, b, treating them as +1/-1, and compute the largest difference (Kadane's algorithm variant).

- **Optimization:**  
  For every ordered (a, b) pair (a ≠ b):  
  - Iterate over s, treating a as +1, b as -1, others as ignored.
  - Compute max subarray sum with at least one b.
  - Need to consider both (a, b) and (b, a) ordering, as largest difference may be negative or positive.

- **Why Kadane’s variant?**  
  Because max subarray sum efficiently finds the interval with the max "imbalance" between a, b, as long as at least one b is present in the subarray.

### Corner cases to consider  
- String with only one type of character → variance is 0  
- String where no two characters appear together  
- Substrings at the very beginning or ending  
- Substrings with very imbalanced counts, e.g., many of 'a', just one 'b'  
- All possible pairs must be considered (not just consecutive letters)  
- Must ensure at least one occurrence of each character in the interval  
- Long strings (avoid O(n³))

### Solution

```python
def largestVariance(s: str) -> int:
    # For each pair of distinct chars, run a modified Kadane's algorithm both forward and backward
    from collections import Counter

    max_variance = 0
    # List all unique characters present to reduce the number of pairs
    charset = set(s)
    for a in charset:
        for b in charset:
            if a == b:
                continue
            # Run Kadane's twice (left-to-right, right-to-left)
            for chars in [s, s[::-1]]:
                count_a = 0
                count_b = 0
                # Helps to handle edge where b appears before a
                can_extend_prev_b = False
                for c in chars:
                    if c != a and c != b:
                        continue
                    if c == a:
                        count_a += 1
                    if c == b:
                        count_b += 1
                    # Only update answer if we've seen at least one b
                    if count_b > 0:
                        max_variance = max(max_variance, count_a - count_b)
                    # If count_a < count_b, reset
                    if count_a < count_b:
                        count_a = 0
                        count_b = 0
                        can_extend_prev_b = True
                # To handle the situation where substring ends with a's but there was a b before
    return max_variance
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(26\*26\*n) = O(n), where n = len(s).  
  For each pair (a, b), O(n) time with forward and reverse scans (total O(26²\*n) but constant factor).

- **Space Complexity:**  
  O(1) extra: Only counters used. No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Consider generalized substrings for more than two character types  
  *Hint: How would variance be defined for 3 or more types? Can this approach be adapted?*

- What if variance is defined as the absolute value, and not just difference?  
  *Hint: Think about whether tracking max and min suffices.*

- How would the approach change if uppercase letters are allowed?  
  *Hint: Consider increasing pairings to 52\*52 and adjust char set.*

### Summary
The approach uses a clever variant of Kadane's algorithm to find, for every pair of distinct characters, the substring where the count difference is largest (while guaranteeing that both characters occur), iterating through all pairs for optimal answer.  
This is a **two-pointer / optimized DP pattern** that is relevant for substring-subarray max/min difference problems, especially when reducing multi-character state to a ±1 array for pairwise analysis. It also illustrates how to optimize brute-force substring checking to linear scans with combinatorial tricks.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)