### Leetcode 1987 (Hard): Number of Unique Good Subsequences [Practice](https://leetcode.com/problems/number-of-unique-good-subsequences)

### Description  
Given a binary string, count the number of *unique* "good" subsequences.  
A subsequence is "good" if:
- It is **non-empty**;
- It has no leading zeros (except for the single character "0").  
In other words, a good subsequence cannot start with '0', unless it is "0" itself.
Return the count modulo 10⁹+7.

Examples:  
If your string is `"001"`, the unique good subsequences are `"0"` and `"1"`; "00", "01", and "001" are not good since they have leading zeros.  
If your string is `"101"`, unique good subsequences are `"0"`, `"1"`, `"10"`, `"11"`, `"101"`.

### Examples  

**Example 1:**  
Input: `binary = "001"`  
Output: `2`  
Explanation: Good subsequences are ["0", "0", "1"]. The uniques are "0" and "1".

**Example 2:**  
Input: `binary = "11"`  
Output: `2`  
Explanation: Good subsequences are ["1", "1", "11"]. The uniques are "1" and "11".

**Example 3:**  
Input: `binary = "101"`  
Output: `5`  
Explanation: Good subsequences are ["1", "0", "1", "10", "11", "101"].  
Uniques: "0", "1", "10", "11", "101".

### Thought Process (as if you’re the interviewee)  

To start, a brute-force approach would be to generate all possible subsequences, check if they're good, and count the unique ones.  
But this is infeasible for n up to 10⁵.

Observations:
- Any subsequence made exclusively from '1's (or '1' followed by '0's and '1's) can be made good if it doesn't start with '0'.
- For every position, we can decide whether to include that character or not.
- The only way to have a good subsequence starting with zero is if it's the *single* character "0".

So, let's use dynamic programming:
- Let **f** be the count of unique good subsequences ending with '1'.
- Let **g** be the count of unique good subsequences ending with '0' (but starting with '1').

Iterate through the string:
- If current is '1':
    - Any previous good sequence (ending with '1' or '0') can be appended by '1' to form a new sequence ending with '1'.
    - Also, standalone '1' forms a good subsequence.
    - So, update f = f + g + 1.
- If current is '0':
    - Only subsequences ending with '1' can be appended by '0' to form a good subsequence.
    - So, update g = g + f.

If ever a single "0" exists in the string, count "0" as a unique good subsequence (special handling).

Final answer is sum of f, g, and (possibly) 1 (for a unique "0").

Space can be O(1): just two counters.

### Corner cases to consider  
- String is all '1's, e.g. `"11111"`
- String is all '0's, e.g. `"00000"`
- String contains both, but only one '1', e.g. `"0001000"`
- String starts with '0', ends with '1', e.g. `"001"`
- Very long string (length up to 10⁵)
- String with alternating '0','1', e.g. `"010101"`

### Solution

```python
def numberOfUniqueGoodSubsequences(binary: str) -> int:
    MOD = 10 ** 9 + 7
    # f: count of unique good subsequences ending with '1'
    # g:           ...ending with '0' (but starting with '1')
    f = g = 0
    has_zero = False

    for c in binary:
        if c == '1':
            # New sequences: all old ending with '1' or '0',
            # plus the standalone "1"
            f = (f + g + 1) % MOD
        else:
            # '0' can only be used if appended to a subsequence that started with '1'
            g = (g + f) % MOD
            has_zero = True

    result = (f + g) % MOD
    if has_zero:
        result = (result + 1) % MOD  # count the standalone "0"
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we make one pass through the input string.
- **Space Complexity:** O(1), as we use only a fixed number of variables for bookkeeping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string was not binary, but included more digits or alphabet?
  *Hint: Think about extending the DP for multiple possible starting characters and handling general leading-zero constraints.*

- What about counting all (not unique) good subsequences?
  *Hint: Do not use a set, think about counting with DP and how duplicates arise.*

- Can you reconstruct all unique good subsequences in lexicographical order?
  *Hint: Try to combine DP with backtracking/enumeration for small n.*

### Summary

We used a dynamic programming approach inspired by the subsequences patterns. The main insight is to track the number of unique good subsequences ending with '1' and '0' (but starting correctly), and accumulate results modulo 10⁹+7. This pattern—counting unique, well-formed subsequences—is often used for string DP problems regarding distinct/unique substring or sequence formation under constraints. This approach is optimal for large n and involves O(1) space.


### Flashcard
Use DP to count unique good subsequences, tracking those starting with '1' and handling the special case for a single '0'.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Distinct Subsequences(distinct-subsequences) (Hard)
- Distinct Subsequences II(distinct-subsequences-ii) (Hard)