### Leetcode 2522 (Medium): Partition String Into Substrings With Values at Most K [Practice](https://leetcode.com/problems/partition-string-into-substrings-with-values-at-most-k)

### Description  
Given a string `s` made up of digits from '1' to '9', and an integer `k`, partition `s` into contiguous substrings such that:
- Each digit appears in **exactly one** substring,
- The integer value of each substring is **at most** `k`.

Your task is to find the **minimum number of substrings** in such a partition. If impossible (i.e., if any digit in `s` is individually greater than `k`), return `-1`.

### Examples  

**Example 1:**  
Input: `s = "165462", k = 60`  
Output: `4`  
*Explanation: Partition as ["16", "54", "6", "2"]. Each substring ≤ 60.*

**Example 2:**  
Input: `s = "238182", k = 5`  
Output: `-1`  
*Explanation: No partition possible because all single digits are > 5.*

**Example 3:**  
Input: `s = "1111", k = 10`  
Output: `4`  
*Explanation: Each "1" ≤ 10, but any two-digit combination is 11 > 10, so split into ["1", "1", "1", "1"].*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all possible partitions using backtracking. For every split, check if the substring value ≤ k. This works for very small n but quickly becomes too slow (exponential splits as n increases).
- **Greedy + Iterative:** Go left to right, growing the current substring as much as possible while it stays ≤ k. When adding the next digit would exceed k, split and start a new substring. This is efficient, since a larger substring is always better (fewer partitions). If any single digit > k, return -1 immediately since even one digit cannot form a valid substring.
- This approach is optimal because the only way to reduce splits is to push as far as possible at each step.

### Corner cases to consider  
- Single digit greater than k (immediate -1).
- Maximum possible valid k (allows whole s as one substring).
- Minimum possible valid k (forces all partition into single digits).
- Leading zeros do not occur (as per problem statement, only '1'-'9').
- Long sequence that always just exceeds k with two digits.

### Solution

```python
def minimumPartition(s: str, k: int) -> int:
    count = 1           # At least one substring is needed
    current = 0         # Value of the current building substring

    for c in s:
        digit = int(c)
        if digit > k:
            return -1   # Impossible if any single digit > k
        # Try to append c to current substring
        if current * 10 + digit <= k:
            current = current * 10 + digit
        else:
            # Start a new substring from c
            count += 1
            current = digit
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Each digit is visited exactly once, with only arithmetic/conditional operations.
- **Space Complexity:** O(1), no extra space used except a few variables, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose s can include zeros and the value of substring "05" should be considered as 5, not 05.  
  *Hint: How would you handle leading zeros?*

- If you had to output the substrings themselves, not just the count, how would you return them efficiently?  
  *Hint: Track the split positions or maintain a current substring builder.*

- What if k can be very large (100-digit number)? How does this affect the algorithm?  
  *Hint: Can't use int, use string comparison or simulate value build-up.*

### Summary
This problem is a classic example of the **greedy partitioning** pattern: always extend the current valid segment as far as possible, then cut when forced. It uses a straightforward linear scan and is efficient. The greedy intuition is key—look for points where continuing would violate constraints and cut there. This strategy appears in interval partitioning, memory paging, and string segmentation problems.


### Flashcard
Greedy left-to-right: grow current substring while value ≤ k; when next digit exceeds k, start new partition – minimum splits needed.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
