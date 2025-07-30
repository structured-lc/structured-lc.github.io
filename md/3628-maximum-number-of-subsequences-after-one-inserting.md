### Leetcode 3628 (Medium): Maximum Number of Subsequences After One Inserting [Practice](https://leetcode.com/problems/maximum-number-of-subsequences-after-one-inserting)

### Description  
Given a string **s** of uppercase English letters, you may insert at most one uppercase English letter at any position (including the beginning or end).  
Return the **maximum number of "LCT" subsequences** that can be formed in the resulting string after at most one insertion.  
A subsequence is a sequence that can be derived by deleting some (or no) characters from the string without changing the order of the remaining characters.

### Examples  

**Example 1:**  
Input: `s = "LMCT"`  
Output: `2`  
*Explanation: We can insert 'L' at the start to get "LLMCT". "LCT" can be formed starting with either of the two 'L's: "L__C__T" (using the first L, C, T) and "L__C__T" (using the second L, C, T). So total 2 subsequences.*

**Example 2:**  
Input: `s = "LCT"`  
Output: `2`  
*Explanation: Insert any 'L', 'C', or 'T' in the optimal position. If we insert 'L' at the beginning, we get "LLCT", which can form 2 subsequences: pick the first L, or the second L. Same logic applies for inserting 'T' at the end or 'C' between L and T.*

**Example 3:**  
Input: `s = "ABCD"`  
Output: `0`  
*Explanation: Even after one insertion, it's not possible to form "LCT" as all three letters are missing from the string.*

### Thought Process (as if you're the interviewee)  
- **Brute-force idea**:  
  Try all 26 possible insertions at all positions, recompute the count of "LCT" subsequences for each resulting string. For each string, do a triple-nested loop to count all \((i, j, k)\) with \(0 \leq i < j < k < n\) so that \(s[i]=='L',\,s[j]=='C',\,s[k]=='T'\). This is too slow for large n.
- **Optimal Approach**:  
  Notice that only insertions of 'L', 'C', or 'T' can increase the count of "LCT" subsequences. For each possible insertion position, simulate the effect of inserting 'L', 'C', or 'T', and for each:
    - For 'L': adds many new "LCT" starting from this new L; count how many "CT" pairs exist to its right.
    - For 'C': adds new "LCT" by placing C with L's before and T's after; count #L before × #T after.
    - For 'T': completes "LC" pairs to form "LCT"; count how many "LC" pairs exist to its left.
  Preprocess prefix and suffix arrays for how many 'L', 'C', 'LC', 'CT', etc. up to each position, to get O(n) time.
  Finally, the answer is max(existing "LCT" subsequences, best after one insertion).
  
  This tradeoff makes the optimal approach fast and interview-appropriate.

### Corner cases to consider  
- Empty string  
- All characters present with multiple repeats (e.g., "LLCCCTTT")  
- Only one of 'L', 'C', 'T' exists  
- No valid subsequences in the original or even after one insertion  
- Only one position to insert (very short string)  
- Inserting doesn't improve the count at all

### Solution

```python
def maximumNumberOfSubsequences(s: str) -> int:
    n = len(s)
    # Precompute prefix counts of L and LC
    prefix_L = [0] * (n + 1)
    prefix_LC = [0] * (n + 1)
    for i in range(n):
        prefix_L[i+1] = prefix_L[i] + (s[i] == 'L')
        prefix_LC[i+1] = prefix_LC[i]
        if s[i] == 'C':
            prefix_LC[i+1] += prefix_L[i]
    
    # Precompute suffix counts of T and CT
    suffix_T = [0] * (n + 1)
    suffix_CT = [0] * (n + 1)
    for i in range(n-1, -1, -1):
        suffix_T[i] = suffix_T[i+1] + (s[i] == 'T')
        suffix_CT[i] = suffix_CT[i+1]
        if s[i] == 'C':
            suffix_CT[i] += suffix_T[i+1]
    
    # Count current total LCT
    total_LCT = 0
    count_L = 0
    count_LC = 0
    for char in s:
        if char == 'L':
            count_L += 1
        elif char == 'C':
            count_LC += count_L
        elif char == 'T':
            total_LCT += count_LC
    
    answer = total_LCT
    
    # Try inserting at every position (0 to n) each of 'L', 'C', 'T'
    for i in range(n + 1):
        # Insert 'L': # of "CT" pairs in suffix starting at i
        add_L = suffix_CT[i]
        # Insert 'C': # of Ls before × # of Ts after
        add_C = prefix_L[i] * suffix_T[i]
        # Insert 'T': # of "LC" pairs before i
        add_T = prefix_LC[i]
        # Choose best at this position
        answer = max(answer, total_LCT + max(add_L, add_C, add_T))
    
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  All prefix and suffix arrays are filled in linear time, and we do one linear scan to consider each insertion position.
- **Space Complexity:** O(n).  
  Extra arrays prefix_L, prefix_LC, suffix_T, suffix_CT each have length O(n).

### Follow-up questions  
- What if you can insert more than one character (e.g. k insertions)?
- How would the solution change if the subsequence pattern was different (e.g., not "LCT" but "XYZW")?