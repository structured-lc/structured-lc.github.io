### Leetcode 2842 (Hard): Count K-Subsequences of a String With Maximum Beauty [Practice](https://leetcode.com/problems/count-k-subsequences-of-a-string-with-maximum-beauty)

### Description  
Given a string **s** and an integer **k**, find the number of length-**k subsequences** (subsequences of exactly k unique characters) whose "beauty" is **maximum**.  
"Beauty" for a k-subsequence is the **sum of the frequency of each of its characters in s** (i.e., for a subsequence made up of k different characters, sum up each character's total count in the original string, not in the subsequence itself).  
Return the **total number** of such length-k subsequences with maximal beauty, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `s = "abcb", k = 2`  
Output: `3`  
Explanation:  
Frequencies: a:1, b:2, c:1.  
All possible 2-char unique subsequences: "ab", "ac", "bc".  
Beauties:  
- "ab": 1 (a) + 2 (b) = 3  
- "ac": 1 + 1 = 2  
- "bc": 2 + 1 = 3  
So max beauty = 3, which occurs for "ab" and "bc".  
Count: 2.

**Example 2:**  
Input: `s = "aaaa", k = 1`  
Output: `1`  
Explanation:  
Only possible k-subsequence: "a", with beauty 4.  
Count: 1.

**Example 3:**  
Input: `s = "abcabc", k = 3`  
Output: `1`  
Explanation:  
Frequencies: a:2, b:2, c:2.  
Only one 3-char unique combination, ["a","b","c"].  
Beauty of "abc": 2 + 2 + 2 = 6.  
Count: 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Generate all k-length unique subsequences, sum up their "beauties", then count those with max sum.  
  - Too slow: O(C(n, k)) exponential.
- **Optimize**: "Beauty" depends only on which unique chars you pick and their frequencies (not positions/order).
- Count frequencies of each char (f(c)), sort them descending. The max-beauty subsequence uses the k chars with the **highest frequencies**.
- Special case: If within top-k, frequencies tie (duplicate counts)—need to count all combinations using those ties.
- For each frequency 'f', count how many chars share it (freqCount).  
- Compute:  
  - For frequencies higher than the cut-off, use all.  
  - For the "cut-off" frequency (e.g., the one with multiple ties), pick just enough to fill up to k.  
  - For those, use combinations count: C(num_of_tied_chars, number_remaining)  
- Multiply the frequency powers for all picked letters, times the combinations for the tie.

### Corner cases to consider  
- Less than k unique characters: return 0.  
- All frequencies are the same.  
- k = 1 or k == total unique chars.  
- Multiple chars tie at cut-off frequency.  
- s is empty.

### Solution

```python
MOD = 10 ** 9 + 7

def countKSubsequencesWithMaxBeauty(s: str, k: int) -> int:
    from collections import Counter
    import math

    freq = Counter(s)
    if len(freq) < k:
        return 0

    # List of all frequencies in descending order
    freq_list = sorted(freq.values(), reverse=True)

    # The k-th (0-based) highest frequency is the cut-off
    threshold = freq_list[k-1]

    # How many chars have frequency = threshold among top k?
    equal_in_top_k = freq_list[:k].count(threshold)
    # How many chars in full list have frequency = threshold?
    total_equal = freq_list.count(threshold)

    # For highest freqs > threshold, multiply their freq
    ans = 1
    for f in freq_list:
        if f > threshold:
            ans = (ans * f) % MOD

    # For chars tied at threshold, pick 'equal_in_top_k' out of 'total_equal' ways
    # Each chosen threshold-char gives freq 'threshold'
    ans = (ans * pow(threshold, equal_in_top_k, MOD)) % MOD

    # Number of ways to choose which threshold-characters to keep
    def nCk(n, r):
        if n < r:
            return 0
        numer = denom = 1
        for i in range(r):
            numer = (numer * (n - i)) % MOD
            denom = (denom * (i + 1)) % MOD
        # compute modular inverse
        return numer * pow(denom, MOD-2, MOD) % MOD

    ans = (ans * nCk(total_equal, equal_in_top_k)) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n + u log u), where n = len(s), u = number of unique chars. (Counter is O(n), sort frequencies is O(u log u), rest is O(k)).
- **Space Complexity:**  
  - O(u), for frequency Counter and freq_list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find max-beauty subsequences for multiple different k's in one pass?  
  *Hint: Precompute frequency counts, use prefix products or DP for combination.*

- Could you list all such subsequences, not just count?  
  *Hint: Use actual character lists and combinations instead of just counts.*

- How would the approach change if the subsequence must be contiguous?  
  *Hint: Then need sliding window or DP, as the frequencies lose their significance.*

### Summary
This problem uses the **greedy + combinatorial** pattern: always select the k most frequent unique chars for max sum, but use combinatorics to count tie-break possibilities when frequencies tie at the cut-off.  
The pattern appears in problems related to *top-K selection*, combinations with duplicates, or maximizing set-based scores.  
Key techniques: counter, combinatorics, modular arithmetic, careful handling of ties.


### Flashcard
Pick k chars with highest frequencies; for ties at boundary, use combinatorics to count ways; beauty = product of frequencies × combinations.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Greedy(#greedy), Combinatorics(#combinatorics)

### Similar Problems
- Distinct Subsequences II(distinct-subsequences-ii) (Hard)