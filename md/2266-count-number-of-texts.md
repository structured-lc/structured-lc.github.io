### Leetcode 2266 (Medium): Count Number of Texts [Practice](https://leetcode.com/problems/count-number-of-texts)

### Description  
Given a string of digits representing the keys Alice pressed to send a text message, calculate how many possible text messages Alice could have sent. On an old T9 phone, each key (2–9) maps to multiple letters:
- 2–6, 8 map to 3 letters (e.g., 2 = 'abc'),
- 7 and 9 map to 4 letters (7 = 'pqrs', 9 = 'wxyz').
Each letter requires 1 to 4 consecutive presses of the same key. Some digit sequences may be parsed into letters in multiple ways, so count all possible interpretations for the input digit string. Return the count modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `"22233"`  
Output: `8`  
*Explanation: For "222" possible splits: "2|2|2","22|2","2|22","222" (each corresponding to combinations 'a','b','c'). Then "33" as 'dd','ee','fd' etc. Total: 8.*

**Example 2:**  
Input: `"7777"`  
Output: `8`  
*Explanation: '7' can be 'p','q','r','s' (up to 4 presses), so all possible letter sequences from length 1 to 4: "7|7|7|7", "77|7|7", etc. There are 8 combinations.*

**Example 3:**  
Input: `"222222"`  
Output: `13`  
*Explanation: With six '2's, options for 1–3 presses each. DP or combinatorics shows there are 13 ways to split.*

### Thought Process (as if you’re the interviewee)  
Brute-force:  
Try all possible groupings for repeated digits, according to the number of presses (3 for most digits, 4 for 7 and 9). Recursively try to split the string at each valid group, and count the total.  
Downside: Extremely slow for long sequences.

Optimize:  
Notice that for consecutive runs of a digit, the ways to split follow a recurrence (like tiling with 1-, 2-, or 3-length tiles, extendable for 7/9).  
This fits DP:
- dp[i] = number of ways to interpret pressedKeys[:i]
- For each position i, look back up to 3 or 4 positions if the previous characters are the same as pressedKeys[i-1], and add the contributions.

Why DP?
- Avoids repeated work.
- O(n) time and space, which is efficient for input up to 10⁵.

### Corner cases to consider  
- Single character: Only one possibility  
- Strings with mixed runs: "22333"
- Very long repeated digits: "777777..."  
- Digits with only 3-letter mapping vs. digits with 4-letter mapping
- Non-T9 digits (though stated only digits 2-9 appear)
- Empty input (though not specified—it is safe to treat as 1 way)

### Solution

```python
MOD = 10**9 + 7

def countTexts(pressedKeys: str) -> int:
    n = len(pressedKeys)
    dp = [0] * (n + 1)
    dp[0] = 1  # Base case: Empty string has 1 way

    for i in range(1, n + 1):
        dp[i] = 0
        max_presses = 4 if pressedKeys[i - 1] in '79' else 3

        # Look back at most max_presses steps, as long as digits match
        for k in range(1, max_presses + 1):
            if i - k < 0:
                break
            if pressedKeys[i - k] != pressedKeys[i - 1]:
                break
            dp[i] = (dp[i] + dp[i - k]) % MOD

    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). For each character, up to 4 (constant) iterations to look back.
- **Space Complexity:** O(n) for the dp array, proportional to input string length n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize the space if input string is very large?
  *Hint: Only the last 4 dp values are ever needed, so use a rolling array or variables.*

- What if the phone supported more than 4 letters per key?
  *Hint: Parameterize max_presses by each digit, store mapping in an array or dict.*

- Can you count not the number of ways, but generate one possible original message?
  *Hint: Use backtracking or reconstruct using parent pointers.*

### Summary
This is a classic DP problem for counting possible interpretations of strings with variable groupings (word breaks, tiling, decoding ways patterns). State dp[i] counts all ways to split up to index i, with constraints on allowable runs (3 or 4). The approach generalizes to any “grouped runs with limits” splitting problem. The DP pattern is similar to ways to decode, staircase, and tiling domino problems.


### Flashcard
Use dynamic programming to count valid groupings of repeated digits, with special cases for 7 and 9 (up to 4 presses).

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Letter Combinations of a Phone Number(letter-combinations-of-a-phone-number) (Medium)
- Decode Ways(decode-ways) (Medium)