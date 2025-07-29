### Leetcode 1220 (Hard): Count Vowels Permutation [Practice](https://leetcode.com/problems/count-vowels-permutation)

### Description  
Given an integer **n**, count how many strings of length **n** can be formed using only the lowercase vowels `'a'`, `'e'`, `'i'`, `'o'`, and `'u'` following these rules about vowel succession:

- `'a'` can only be followed by `'e'`.
- `'e'` can only be followed by `'a'` or `'i'`.
- `'i'` cannot be followed by `'i'`.
- `'o'` can only be followed by `'i'` or `'u'`.
- `'u'` can only be followed by `'a'`.

The number of valid strings could be very large so return the count modulo 10^9 + 7.


### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `5`  
*Explanation: All single vowels `'a'`, `'e'`, `'i'`, `'o'`, `'u'` are valid strings.*

**Example 2:**  
Input: `n = 2`  
Output: `10`  
*Explanation: Valid 2-letter strings follow the rules, such as `"ae"`, `"ea"`, `"ei"`, `"ia"`, `"ie"`, `"io"`, `"iu"`, `"oi"`, `"ou"`, `"ua"`.*

**Example 3:**  
Input: `n = 5`  
Output: `68`  
*Explanation: There are 68 valid 5-letter vowel strings following the given succession rules.*


### Thought Process (as if you’re the interviewee)  

1. **Brute Force Idea:**  
   Generate all strings of length **n** made of vowels and check if they satisfy the rules. This approach is obviously infeasible due to exponential time — 5^n possibilities for large n.

2. **Observing the Rules:**  
   The problem can be modeled as a graph or transition rules between vowels indicating which vowels can follow each vowel.

3. **Dynamic Programming Approach:**  
   Use DP where each state represents the count of valid strings ending with a particular vowel for a given length.

   Define arrays (or a 2D table) dp[length][vowel], which stores the count of strings of length `length` ending with vowel `vowel`.

4. **Transition based on rules:**
   - dp[i][a] = dp[i-1][e] + dp[i-1][i] + dp[i-1][u] (from the problem rules, but actually `'a'` can only be followed by `'e'` which means `'e'` should come next after `'a'`. Being careful here.)
   Since the problem states:
   - `'a'` → next is `'e'`
   - `'e'` → next is `'a'` or `'i'`
   - `'i'` → next is any except `'i'`
   - `'o'` → next is `'i'` or `'u'`
   - `'u'` → next is `'a'`
   
   The transitions for dp at position i depends on dp at i - 1.

5. **Modular arithmetic:**  
   Since counts might be very big, use modulo 10^9 + 7.

6. **Choose bottom-up DP for clarity and efficiency.**


### Corner cases to consider  
- **n = 1:** The simplest case, every vowel is valid.
- **Very large `n`:** Should handle efficiently with mod and DP.
- **n = 2:** Confirm transition rules apply correctly.
- Strings mostly with vowels that forbid consecutive repeats (like `i`).
- Check correctness when some vowels have limited next vowels, e.g. `'a'` only followed by `'e'`.


### Solution

```python
def countVowelPermutation(n: int) -> int:
    MOD = 10**9 + 7
    
    # dp arrays representing count of strings ending with vowels:
    # indices: 0:'a', 1:'e', 2:'i', 3:'o', 4:'u'
    a = e = i = o = u = 1
    
    for _ in range(2, n + 1):
        a_new = (e + i + u) % MOD      # 'a' can follow 'e', 'i', 'u'
        e_new = (a + i) % MOD          # 'e' can follow 'a', 'i'
        i_new = (e + o) % MOD          # 'i' can follow 'e', 'o'
        o_new = i % MOD                # 'o' can follow 'i'
        u_new = (i + o) % MOD          # 'u' can follow 'i', 'o'
        
        a, e, i, o, u = a_new, e_new, i_new, o_new, u_new
    
    return (a + e + i + o + u) % MOD
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate once from 2 to n updating counts for each vowel.
- **Space Complexity:** O(1), we only store current counts for a, e, i, o, u and update them iteratively.


### Potential follow-up questions (as if you’re the interviewer)  

- How would your code change if the rules for vowel succession were different or dynamic?  
  *Hint: Represent transitions as an adjacency list or matrix and generalize DP.*

- Can you optimize the solution using matrix exponentiation to handle very large n efficiently?  
  *Hint: Model transitions as a matrix multiplication problem.*

- How would you handle this problem if we want to output the count of valid strings ending in a specific vowel?  
  *Hint: Return dp[n][vowel_id] instead of sum.*


### Summary  
This problem is a classic DP with state transitions scenario. The approach uses bottom-up DP to track valid string counts ending with each vowel at each length using the problem’s vowel succession rules. It is a common pattern often applied in counting sequences with constraints and can be extended or optimized using matrix exponentiation for large inputs.