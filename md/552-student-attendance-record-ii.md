### Leetcode 552 (Hard): Student Attendance Record II [Practice](https://leetcode.com/problems/student-attendance-record-ii)

### Description  
You are given an integer n representing the total number of days in a student's attendance record. For each day, the student can be:
- 'A': Absent
- 'L': Late
- 'P': Present

A student's attendance record is **rewardable** if both of the following are true:
- **No more than one 'A'** (absent) in the record.
- **No more than two consecutive 'L'** (late) in the record.

Return the **number of possible rewardable attendance records** of length n. Since the answer can be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `8`  
*Explanation: The 8 rewardable records are: "PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL". Only "AA" has more than one 'A' and is not rewardable.*

**Example 2:**  
Input: `n = 1`  
Output: `3`  
*Explanation: The valid records are: "P", "A", "L".*

**Example 3:**  
Input: `n = 3`  
Output: `19`  
*Explanation: The rewardable records include all combinations of 0 or 1 'A' and up to two consecutive 'L's, excluding invalid ones like "AAA" or "ALLL".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  Generate all possible strings of length n using {'A','L','P'}, filtering those that have ≤1 'A' and no "LLL" substring. For small n, this works, but it becomes O(3ⁿ) and infeasible for n up to 100,000.

- **Observation**:  
  The problem asks for **count**, not for generating records. This hints at **dynamic programming**.

- **State Design**:  
  Since we can't have >1 'A' and can't have "LLL", our state should capture:
  - How many 'A' we've used (0 or 1)
  - How many consecutive 'L' ended the record (0, 1, or 2)
  - Which day we're on (1..n)

- **DP structure**:  
  Let dp[i][a][l] = number of ways to build a string of length i with a absents, ending with l consecutive 'L's  
  Transitions:
  - Add 'P': resets consecutive 'L', keeps 'A', increases length
  - Add 'L': increases consecutive 'L', keeps 'A', increases length — only if l < 2
  - Add 'A': increments 'A', resets 'L', only if a == 0

- **Optimization**:  
  A straightforward DP is O(n), since a=0/1 and l=0/1/2, so only 6 possible sub-states per day.  
  Exists an approach to reduce space to O(1) since we only need data from previous day.

### Corner cases to consider  
- n = 0 (Empty string, should return 1: the empty record is trivially rewardable)
- n = 1 (Single day, can be 'A', 'P', 'L')
- All 'P' (valid)
- All 'A' except for one (valid)
- Three or more consecutive 'L'
- Very large n (test for time/memory efficiency)

### Solution

```python
MOD = 10**9 + 7

def checkRecord(n):
    # dp[no of days][has A][consecutive L]
    # Only 2 (0 or 1) possible values for 'A', and 3 (0,1,2) for 'L' count
    dp = [[0]*3 for _ in range(2)]
    # initial: 0 days, 0 A, 0 L: 1 way (empty record)
    dp[0][0] = 1

    for _ in range(n):
        nxt = [[0]*3 for _ in range(2)]
        for a in (0,1):
            for l in (0,1,2):
                val = dp[a][l]
                # option 1: Add 'P' (present) → resets L
                nxt[a][0] = (nxt[a][0] + val) % MOD
                # option 2: Add 'L' (late) → only if l<2
                if l < 2:
                    nxt[a][l+1] = (nxt[a][l+1] + val) % MOD
                # option 3: Add 'A' (absent) → only if a==0
                if a == 0:
                    nxt[1][0] = (nxt[1][0] + val) % MOD
        dp = nxt
    
    return sum(dp[a][l] for a in (0,1) for l in (0,1,2)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Only 6 DP states (2×3) updated per loop, processed n times, so total O(n).
- **Space Complexity:** O(1). Reuse DP arrays of fixed size, no extra storage grows with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to also recover one valid record, not just the count?  
  *Hint: You'd need to backtrack and reconstruct the actual string.*

- How would you adapt this code to count records with at most k absences?  
  *Hint: Let the 'A' state go from 0 to k, increasing DP size.*

- Could you optimize further if only up to 1 'A' and at most 1 'L' in a row are allowed?  
  *Hint: DP state reduces since consecutive 'L's restriction is tighter.*

### Summary
We applied *dynamic programming* with a carefully chosen small state: days so far, number of 'A's used, and consecutive 'L's.
DP provides an O(n) time solution with O(1) space, perfect for large n constraints.  
This *state machine DP* is a common pattern: it applies broadly to string counting problems with global and local restrictions (“at most k of X”, “no more than m in a row of Y”), such as barcode arrangements, binary strings with no adjacent 1's, etc.