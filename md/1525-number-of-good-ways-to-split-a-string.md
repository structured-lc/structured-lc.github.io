### Leetcode 1525 (Medium): Number of Good Ways to Split a String [Practice](https://leetcode.com/problems/number-of-good-ways-to-split-a-string)

### Description  
Given a string s, split it into two non-empty strings sₗₑ𝒻ₜ and sᵣᵢgₕₜ such that sₗₑ𝒻ₜ + sᵣᵢgₕₜ = s. A split is **good** if the number of distinct letters in sₗₑ𝒻ₜ and sᵣᵢgₕₜ are equal. Return the number of good splits in s.

### Examples  

**Example 1:**  
Input: `s = "aacaba"`  
Output: `2`  
*Explanation: The valid good splits are:*
- ("aac", "aba") – sₗₑ𝒻ₜ has {'a','c'} and sᵣᵢgₕₜ has {'a','b'} (2 distinct letters each)
- ("aaca", "ba") – sₗₑ𝒻ₜ has {'a','c'} and sᵣᵢgₕₜ has {'b','a'} (2 distinct letters each)

**Example 2:**  
Input: `s = "abcd"`  
Output: `1`  
*Explanation: The good split is ("ab", "cd") – both sides have 2 distinct letters.*

**Example 3:**  
Input: `s = "aaaaa"`  
Output: `4`  
*Explanation: At every split, both sides have only {'a'} (1 distinct letter each).*  

### Thought Process (as if you’re the interviewee)  
- Brute-force would be to split at every index, count distinct letters on both sides — this is O(n²), too slow for long strings.
- Optimize: Precompute the number of distinct letters for all prefixes and suffixes with two passes:
  - One left-to-right pass: for each prefix, track how many unique letters we've seen so far.
  - One right-to-left pass: same, but for each suffix.
- For each possible cut, compare prefix and suffix counts — count if they match.
- This approach works in O(n) time, suitable for large strings.

### Corner cases to consider  
- Input length 1 (no split possible)
- All identical letters (e.g., "aaaa")
- All unique letters (e.g., "abcdef")
- Good splits at multiple positions

### Solution

```python
def numSplits(s):
    from collections import defaultdict
    n = len(s)
    # Arrays to hold the count of distinct chars from left and right up to each index
    left_counts = [0] * n
    right_counts = [0] * n
    left_seen = set()
    right_seen = set()

    # Left to right distinct counts
    for i in range(n):
        left_seen.add(s[i])
        left_counts[i] = len(left_seen)

    # Right to left distinct counts
    for i in range(n-1, -1, -1):
        right_seen.add(s[i])
        right_counts[i] = len(right_seen)

    good_splits = 0
    for i in range(n - 1):  # split after i, thus left: s[0:i+1], right: s[i+1:]
        if left_counts[i] == right_counts[i+1]:
            good_splits += 1
    return good_splits
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the length of s. Each pass through the string is O(n).
- **Space Complexity:** O(n), for the two auxiliary arrays plus O(1) for distinct char sets (since only lowercase a-z).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you solve it if the string contained arbitrary unicode characters?
  *Hint: A hash set can replace arrays indexed by character.*

- Can you output the actual good split indices?
  *Hint: Store the indices while comparing prefix and suffix counts.*

- What if you had to do this on a streaming string?
  *Hint: Keep track of running distinct counts; extra care with suffix.*

### Summary
This problem is a classic example of prefix/suffix count precomputation — a common coding interview pattern. Tracking distinct elements seen so far allows for O(n) solutions in cases where brute-force is too slow. The concept is reusable in substring/partition/counting problems.