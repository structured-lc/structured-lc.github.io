### Leetcode 3144 (Medium): Minimum Substring Partition of Equal Character Frequency [Practice](https://leetcode.com/problems/minimum-substring-partition-of-equal-character-frequency)

### Description  
Given a string s, split it into the fewest possible number of non-empty substrings, each of which is **balanced** — meaning, every character in that substring occurs exactly the same number of times.  
Return the minimum number of substrings in such a partition.

*You can only split between letters — you cannot rearrange or change the string.*

### Examples  

**Example 1:**  
Input: `s = "fabccddg"`  
Output: `3`  
*Explanation: One partition is `["fab", "ccdd", "g"]`. Each substring is balanced: "fab" (each character once), "ccdd" (two c's and two d's), "g" (one g).*

**Example 2:**  
Input: `s = "abababaccddb"`  
Output: `2`  
*Explanation: The partition `["abab", "abaccddb"]` works. "abab" has two a's and two b's, "abaccddb" has a, b (×2), c, d (×2) so each of a,b,d has two appearances and c once — actually, the valid partition is `["abab", "abaccddb"]` as described, and "abaccddb" is balanced (all letters have two counts except for c, but that's allowed if only non-zero characters must be equal, so this partition works).*

**Example 3:**  
Input: `s = "aabbcc"`  
Output: `1`  
*Explanation: The whole string is balanced: a ×2, b ×2, c ×2.*

### Thought Process (as if you’re the interviewee)  

First, understand **what makes a substring "balanced":** every distinct letter appears the same number of times (so 'aabb' is balanced, but 'aab' is not). We're asked for the **minimal number of such substrings** to fully partition the original string.

#### Brute Force
- Try every possible way to partition the string; for each partition, check if all substrings are balanced.
- This is clearly exponential and not feasible for length up to 1000.

#### Optimize with Dynamic Programming
- Let dp[i] be the minimum number of substrings to partition s[0:i] (inclusive).
- For each position i, try all possible j < i, and if s[j:i] is balanced, update dp[i] = min(dp[i], dp[j-1] + 1).
- To check if a substring is balanced, track character frequencies, and compare the non-zero frequency values.

#### Further Optimization
- Precompute prefix counts so that frequency counts in any interval s[j:i] can be computed efficiently.
- Use a hashmap or an array of size 26 (for lowercase letters) for the frequencies.

#### Why pick this approach?
- The DP reduces complexity from exponential to O(n² * 26), which is acceptable for n ≤ 1000.
- The space is manageable, and it's easy to prove correctness.

### Corner cases to consider  
- Empty string (should be at least 1 character; constraint says n ≥ 1).
- All characters the same (e.g., "aaaaaa"): should return 1.
- All unique characters (e.g., "abcdefg"): should return 1.
- Already balanced, but could be split several ways ("aaabbbccc").
- Length 1 string.
- Impossible to balance if the requirement were stricter, but in this problem, it’s always doable.

### Solution

```python
def minimum_substrings_in_partition(s):
    n = len(s)
    dp = [n] * n  # dp[i]: min substrings in s[0..i]
    for i in range(n):
        count = [0] * 26
        for j in range(i, -1, -1):
            # Count current character
            count[ord(s[j]) - ord('a')] += 1

            # Gather the nonzero frequencies
            freq_list = [c for c in count if c > 0]
            # All frequencies should be same if substring is balanced
            if len(freq_list) > 0 and min(freq_list) == max(freq_list):
                if j == 0:
                    dp[i] = 1
                else:
                    dp[i] = min(dp[i], 1 + dp[j - 1])
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 26)  
  For each position i, we check all previous possible j (up to i), and for each, we check up to 26 letter frequencies. This is acceptable for n up to 1000.
- **Space Complexity:** O(n)  
  Mainly for the dp array; auxiliary space O(1) for frequency counts per inner loop.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you output the actual partition, not just the count?
  *Hint: Track the partition points in dp or backtrack from last index.*

- Can you make the solution faster if s contains very few unique letters?
  *Hint: Use hashing of frequency signatures for balanced substring check.*

- Suppose the string can have uppercase and lowercase letters?
  *Hint: Adjust the frequency array or map to size 52.*

### Summary
This problem uses the **Substring DP pattern** — for each index, try all substring breaks and update dp based on subproblem solutions. The **key insight** is verifying if a substring is "balanced" by ensuring all nonzero character counts are equal. This pattern often appears in partitioning or palindrome substring questions, and can generalize to other substring partition problems with alternate balance criteria.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Counting(#counting)

### Similar Problems
- Partition Array for Maximum Sum(partition-array-for-maximum-sum) (Medium)
- Partition String Into Minimum Beautiful Substrings(partition-string-into-minimum-beautiful-substrings) (Medium)