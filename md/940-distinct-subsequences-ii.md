### Leetcode 940 (Hard): Distinct Subsequences II [Practice](https://leetcode.com/problems/distinct-subsequences-ii)

### Description  
Given a string **s**, you need to count how many **distinct non-empty subsequences** can be formed from it.  
A subsequence is obtained by deleting some (possibly zero) characters from the string, without changing the order of the remaining characters.  
Since the answer can be very large, return it **modulo 10⁹ + 7**.

### Examples  

**Example 1:**  
Input: `s = "abc"`  
Output: `7`  
*Explanation: The 7 distinct subsequences are* "a", "b", "c", "ab", "ac", "bc", "abc".

**Example 2:**  
Input: `s = "aba"`  
Output: `6`  
*Explanation: The 6 distinct subsequences are* "a", "b", "ab", "aa", "ba", "aba".

**Example 3:**  
Input: `s = "aaa"`  
Output: `3`  
*Explanation: The 3 distinct subsequences are* "a", "aa", "aaa".

### Thought Process (as if you’re the interviewee)  
First, consider brute force: generate all possible subsequences, store them in a set to deduplicate, and count the set's size. But this is infeasible for larger strings since there are up to 2ⁿ subsequences.

To optimize, we need a way to count subsequences **efficiently and uniquely**.  
Dynamic Programming is promising here:

- Let's keep track of `dp[i]`: number of distinct subsequences using the first i characters of s.
- For each character, every subsequence so far can either include it (by appending it to existing subsequences) or not.
- But adding a character that appeared before can cause duplicates.
- To remove duplicates, we track for each letter the last index it appeared at, and **subtract** the number of subsequences that existed before its last appearance (since those contributed their versions of subsequences already).

Final Approach:

- Use an array `dp` where `dp[i]` represents the number of distinct non-empty subsequences using the first i chars.
- Use a map `lastSeen` for each letter, to remember **when it was last added** so duplicates can be avoided.

### Corner cases to consider  
- s is a single character  
- s has all unique characters  
- s has all same character  
- s is very long (test time/memory efficiency)  
- All letters of the alphabet present

### Solution

```python
def distinctSubseqII(s: str) -> int:
    MOD = 10**9 + 7
    # dp: total number of distinct subsequences up to current position
    dp = 1  # start with empty subsequence, will subtract it later
    last_seen = [0] * 26  # last_seen[c]: number of subsequences ending with c
    
    for ch in s:
        idx = ord(ch) - ord('a')
        new_dp = (dp * 2 - last_seen[idx]) % MOD
        last_seen[idx] = dp
        dp = new_dp

    return (dp - 1) % MOD  # subtract initial empty subsequence 
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). We process each character only once, each update is constant time.
- **Space Complexity:** O(1), since last_seen uses only 26 slots (for lowercase English letters); overall storage is not dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can include uppercase and lowercase characters?
  *Hint: How would your last_seen array or map need to change?*

- How would you modify the approach to output all distinct subsequences, not just their count?
  *Hint: Could you use sets, or memoization with string construction? Consider feasibility for large n.*

- Suppose order does not matter (i.e., set feature instead of sequence). How would your answer change?

  *Hint: Think about combinations instead of subsequences.*

### Summary
This problem is a classic application of **dynamic programming using position last-seen tracking** to avoid overcounting duplicates, a pattern useful in string and subsequence counting problems (especially those needing to efficiently deduplicate combinatorial choices). It's related to counting palindromic/distinct subsequences and is widely helpful whenever solutions depend on combinations with duplicate avoidance.


### Flashcard
Use DP with last[c] to track subsequences ending with each char; for each s[i], double total and subtract previous count for s[i].

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Unique Good Subsequences(number-of-unique-good-subsequences) (Hard)
- Count K-Subsequences of a String With Maximum Beauty(count-k-subsequences-of-a-string-with-maximum-beauty) (Hard)