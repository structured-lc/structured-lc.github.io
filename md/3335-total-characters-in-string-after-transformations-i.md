### Leetcode 3335 (Medium): Total Characters in String After Transformations I [Practice](https://leetcode.com/problems/total-characters-in-string-after-transformations-i)

### Description  
Given a string **s** and an integer **t**, perform **t** transformations.  
- At each transformation, **every character** in **s** is replaced as follows:
  - If the character is `'z'`, replace it with `"ab"`.
  - Otherwise, replace it by the next character in the alphabet.
- After all transformations, return the **length** of the resulting string modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `s = "abc", t = 2`  
Output: `3`  
*Explanation: First transform: "abc" → "bcd".  
Second transform: "bcd" → "cde".  
Result length: 3.*

**Example 2:**  
Input: `s = "bcdzz", t = 2`  
Output: `7`  
*Explanation:  
First transform: "bcdzz" → "cdezz" (only non-z chars move up, z stays z for now).  
Second transform:  
- 'c' → 'd',  
- 'd' → 'e',  
- 'e' → 'f',  
- 'z' → 'ab',  
- 'z' → 'ab'  
So, total string: "defabab", length = 7.*

**Example 3:**  
Input: `s = "azbk", t = 3`  
Output: `5`  
*Explanation:  
Step 1: "azbk" → "bazl"  
Step 2: "bazl" → "cbam"  
Step 3: "cbam" → "dcbn"  
Result length = 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Simulate string transformation step by step, actually rebuilding the string each time.
  - For each step, rebuild the string by looping through all characters and forming the new string according to the rules.
  - This quickly becomes infeasible: each 'z' → "ab" causes string to grow exponentially.

- **Optimization:**  
  - Notice that we only care about **final length**, not actual content.
  - Track **frequency count** of each letter in **current string** (array of length 26).
  - At each transformation, update frequencies:
    - For chars `'a'` to `'y'`, move all their count to the next letter (i.e., count[i+1] += count[i]).
    - For `'z'`, every `'z'` produces one 'a' and one 'b' (so, their count gets added to both a and b in the next frequency array).
  - Do t rounds of such updates and finally sum all frequency counts for result.

- **Why is this good?**
  - Instead of building long strings, all processing is on fixed-size arrays of 26.
  - Fast, efficient, using O(1) space and O(|s| + 26•t) time.

### Corner cases to consider  
- Empty string: should return 0.
- All letters initially are 'z': rapid growth.
- t = 0: should return len(s).
- Large t (e.g. 10⁵): make sure solution doesn't do full reconstruction.
- Length overflows: always take modulo 10⁹ + 7 after every sum.

### Solution

```python
def total_characters_after_transformations(s: str, t: int) -> int:
    MOD = 10 ** 9 + 7

    # Frequency of each character, 'a' → freq[0], ..., 'z' → freq[25]
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    for _ in range(t):
        next_freq = [0] * 26

        # All a-y move to next character
        for i in range(25):
            next_freq[i+1] = freq[i] % MOD

        # All z's become one a and one b each
        next_freq[0] = (next_freq[0] + freq[25]) % MOD
        next_freq[1] = (next_freq[1] + freq[25]) % MOD

        freq = [f % MOD for f in next_freq]

    return sum(freq) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(|s| + t × 26), where |s| is the input size. Counting initial freq is O(|s|); each transformation is O(26); t rounds.
- **Space Complexity:** O(26) = O(1) for the frequency array, no dependence on input length or t.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you compute **the actual final string** (not just its length)?  
  *Hint: Would blow up in size quickly. Think about input/output feasibility.*

- What if the replacement for 'z' was a longer pattern ("xyz"), or a dynamic pattern?  
  *Hint: Represent the process as a Markov process or use DP transition matrices.*

- Can you do this if **replacement rules** for each letter vary or are random?  
  *Hint: Map rules for each letter to a set of transitions. Maybe use a dictionary for generalization.*

### Summary
The problem is a classic **frequency-simulation** with fixed transition rules. Instead of string-building, keep only letter counts and apply updates as per rules each round. This "counting DP" or frequency-distribution update is common wherever content (not order) matters but explosive growth is possible (exponential string/tree expansion).  
Patterns apply to population models, automata, or Markov/transition state simulations.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Counting(#counting)

### Similar Problems
