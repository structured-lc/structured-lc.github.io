### Leetcode 3628 (Medium): Maximum Number of Subsequences After One Inserting [Practice](https://leetcode.com/problems/maximum-number-of-subsequences-after-one-inserting)

### Description  
Given a string s consisting of uppercase English letters, you may insert at most one additional uppercase letter (at any position, including the start or end).  
Your task is to return the maximum number of **"LCT"** subsequences that can be formed in the resulting string after up to one insertion.  
A subsequence is any sequence that can be derived by deleting some (or none) of the characters, without changing the order of the remaining ones.

### Examples  

**Example 1:**  
Input: `s = "LMCT"`  
Output: `2`  
*Explanation: You can insert 'L' at the beginning to get "LLMCT". The number of subsequences "LCT" is 2: (first L, C, T) and (second L, C, T).*

**Example 2:**  
Input: `s = "LCTCT"`  
Output: `4`  
*Explanation: Original "LCTCT" has 2 "LCT" subsequences (positions: 0,1,2 and 0,3,4). Insert 'C' between L and C to get "LCCTCT". Now you have 4 subsequences (0,1,3), (0,2,3), (0,1,4), (0,2,4).*

**Example 3:**  
Input: `s = "TCL"`  
Output: `0`  
*Explanation: No matter what character you insert, "LCT" subsequence cannot be formed since order L → C → T is required.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all 26 letters at each possible position, recompute subsequences each time. This is very inefficient: O(26 × n × n³) if checking all subsequences for each insertion.

- **Optimization:**  
  Notice we're only maximizing "LCT" subsequences. So, our insertion should be either 'L', 'C', or 'T', inserted at the most beneficial position.

  For fast calculation:
  - Use prefix/suffix counts:
    - Precompute for each index:
      - The number of L's to the left.
      - The number of C's after a position.
      - The number of T's to the right.
  - There are three insertion options:
    - Insert 'L' at some position: it can start new "LCT" subsequences.
    - Insert 'C' somewhere: it can connect an existing 'L' before and a 'T' after.
    - Insert 'T' somewhere: it can finish new "LCT" subsequences.
  - For each option, calculate how many new subsequences would be formed with the optimal position.

- **Reasoning for final approach:**  
  Prefix-suffix counting gives O(n) time, as you only need one pass left to right and right to left. Greedy choose the best insert letter and position, take the maximum among three insert scenarios.

### Corner cases to consider  
- String does not contain all of 'L', 'C', 'T' (output is 0 or at most what can be gotten after one insertion).
- All letters are the same (e.g., "CCC").
- String is empty.
- String is already maximal (inserting doesn't help).
- Inserting at the start or end.
- Multiple optimal positions for insertion.

### Solution

```python
def maximumNumberOfSubsequences(s: str) -> int:
    n = len(s)
    
    # First, count existing "LCT" subsequences
    countL = 0
    countLC = 0
    countLCT = 0
    for ch in s:
        if ch == 'L':
            countL += 1
        elif ch == 'C':
            countLC += countL
        elif ch == 'T':
            countLCT += countLC

    max_subseq = countLCT  # Best without insertion

    # Precompute prefix counts of L and C, suffix counts of T
    prefixL = [0] * (n + 1)
    prefixC = [0] * (n + 1)
    suffixC = [0] * (n + 1)
    suffixT = [0] * (n + 1)

    for i in range(n):
        prefixL[i+1] = prefixL[i] + (1 if s[i] == 'L' else 0)
        prefixC[i+1] = prefixC[i] + (1 if s[i] == 'C' else 0)
    for i in range(n-1, -1, -1):
        suffixC[i] = suffixC[i+1] + (1 if s[i] == 'C' else 0)
        suffixT[i] = suffixT[i+1] + (1 if s[i] == 'T' else 0)

    # Try all positions to insert 'L', 'C', 'T'
    for pos in range(n+1):
        # Insert 'L' at pos: can start a prefix for each C after and T after
        added = 0
        # Subsequence starts at this new L, then C and T to the right
        added = suffixC[pos] * suffixT[pos]
        max_subseq = max(max_subseq, countLCT + added)

        # Insert 'C' at pos: need L before, T after
        added = prefixL[pos] * suffixT[pos]
        max_subseq = max(max_subseq, countLCT + added)

        # Insert 'T' at pos: need L before, C before
        added = prefixL[pos] * prefixC[pos]
        max_subseq = max(max_subseq, countLCT + added)

    return max_subseq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each prefix/suffix array is filled in O(n), and checking all n+1 insert positions is O(n).
  - So, total is O(n).

- **Space Complexity:** O(n)  
  - For the extra prefix/suffix arrays, each is length n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we had to maximize the number of another subsequence, like "ABC" instead of "LCT"?  
  *Hint: Generalize the prefix/suffix computation for arbitrary patterns.*

- What if you could insert two or more letters?  
  *Hint: Consider all combinations; the optimal may not be simply making two optimal single insertions.*

- How would you modify the approach to count all possible unique subsequences of length 3, not just "LCT"?  
  *Hint: Precompute and aggregate for each 3-letter combination; combinatorial enumeration.*

### Summary
This problem is a **prefix-suffix counting and greedy string problem**. The key pattern is to reduce repeated work by precomputing aggregations to enable constant-time answer for each possible insertion spot.  
This pattern is widely applicable in subsequence counting, optimal string insertions, and dynamic programming over character streams.  
It exemplifies how optimizing brute force by analyzing constraints and leveraging counts/prefix sums leads to a scalable and efficient solution.