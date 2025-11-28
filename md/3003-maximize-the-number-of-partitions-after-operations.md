### Leetcode 3003 (Hard): Maximize the Number of Partitions After Operations [Practice](https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations)

### Description  
Given a string **s** of lowercase English letters and an integer **k**, you are allowed to change **at most one character** in the string to any lowercase English letter (including possibly the same letter).  
Then, repeatedly, you can remove the **longest possible prefix** with at most **k** distinct characters, turning it into a partition, until the string becomes empty.  
Your task is to **maximize** the number of resulting partitions by optimally choosing zero or one character to modify.

### Examples  

**Example 1:**  
Input: `s = "aabbaa", k = 2`  
Output: `2`  
*Explanation: Take prefix "aabbaa" (contains exactly 2 distinct chars), remove it (partition 1). String becomes empty, so we are done. But, you can split as follows:  
- Take prefix "aab", remove (partition 1), string is "baa".  
- Take prefix "ba", remove (partition 2), string is "a".  
- Take last "a" (partition 3).  
But optimal is to take first "aabb" (with k=2), then "aa" (partition 2). Maximum number of partitions is 2.*

**Example 2:**  
Input: `s = "abcde", k = 1`  
Output: `5`  
*Explanation: For k=1, you can only take one letter at a time. Each letter "a", "b", "c", "d", "e" becomes one partition. Changing any one character doesn't improve this.*

**Example 3:**  
Input: `s = "aabaab", k = 3`  
Output: `1`  
*Explanation: The original string already has at most 3 distinct characters, so you can take the whole string as one partition. No change can give more.*

### Thought Process (as if you’re the interviewee)  
To solve this, our job is to maximize how many times we can cut off a prefix with ≤ k distinct characters. We may change one character optimally.

- **Brute-force idea:**  
  Try changing every character to every letter a–z (including no change), simulate partitioning, and count how many splits we get.  
  This brute force is O(n² × 26), as for every position and 26 choices, we'd simulate — too slow for n up to 10⁴.

- **Optimized approach:**  
  Use recursion with memoization (“DP with memory”) to record for each (index, used chars bitmask, is_change_left) the maximum number of partitions we can achieve.  
  - At every position, we decide: add current character (keeping used chars so far) to the current partition; or, if allowed and beneficial, “change” the current character to something (using our one modification).  
  - When the partition exceeds k distinct chars, we start a new partition, increment count, and reset the set of used chars.
  - We use bitmasking for used chars for speed (since only lowercase), and memoize for repeat states.

- **Why DP with memoization is the right choice:**  
  The state space is small enough: O(n × 2²⁶ × 2), though in practice only a fraction is used because partitions reset when k exceeded.

**Trade-offs:**  
- Brute-force is infeasible due to time.  
- Optimized DP handles all change positions/letters in O(n × k × 26) effective space/time by caching only reachable states.

### Corner cases to consider  
- Empty string (`s = ""`)
- `k` very large (≥ #unique letters in s): can take all at once, always one partition.
- All identical characters.
- All distinct characters and k = 1: must take one at a time, cannot split further.
- Changing a character doesn’t help improve splits.
- Minimal and maximal length (n = 1, n = 10⁴).

### Solution

```python
def maxPartitionsAfterOperations(s: str, k: int) -> int:
    from functools import cache

    n = len(s)

    # Memoization: (index, bitmask, left_change) -> max partitions
    @cache
    def dp(i: int, used: int, can_change: int) -> int:
        if i == n:
            return 1  # always at least 1 partition by removing at the end

        bit = 1 << (ord(s[i]) - ord('a'))
        next_mask = used | bit

        # If adding this goes over k unique chars, need a new partition.
        if bin(next_mask).count('1') > k:
            ans = dp(i+1, bit, can_change) + 1
        else:
            ans = dp(i+1, next_mask, can_change)

        # If we still have a change available, try changing s[i] to anything else
        if can_change:
            for c in range(26):
                alt_bit = 1 << c
                next_alt = used | alt_bit
                if bin(next_alt).count('1') > k:
                    # Start new partition with changed char
                    ans = max(ans, dp(i+1, alt_bit, 0) + 1)
                else:
                    ans = max(ans, dp(i+1, next_alt, 0))
        return ans

    return dp(0, 0, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 2²⁶ × 2) in the worst case for DP states, but practically much less, as not all masks are reachable. Each DP call is O(26) due to possible character changes.

- **Space Complexity:**  
  O(n × 2²⁶ × 2) for memoization. No recursion stack depth exceeds O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to change up to `m` characters instead of just one?  
  *Hint: Extend DP state to track remaining changes; increases state size by ×m.*

- What if you cannot change any character at all?  
  *Hint: Problem reduces to simple greedy partition counting.*

- How do you return not just the maximum number, but the actual partitions themselves?  
  *Hint: Modify DP to reconstruct solution path; keep parent pointers or record cut positions.*

### Summary
This problem uses the **bitmask dynamic programming** pattern, perfect for partitioning and unique char constraints when the alphabet is small. The approach recursively explores all cases of at most one modification, memoizing repeated states. The solution pattern is common in problems limiting "k distinct" elements and can adapt to situations with multiple allowed changes, different partition constraints, or other alphabet-limited states.


### Flashcard
Maximize the Number of Partitions After Operations (Hard)

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Can Make Palindrome from Substring(can-make-palindrome-from-substring) (Medium)