### Leetcode 3339 (Medium): Find the Number of K-Even Arrays [Practice](https://leetcode.com/problems/find-the-number-of-k-even-arrays)

### Description  
Given integers **n**, **m**, and **k**, find how many arrays of size **n** (elements from 1..m) have **exactly k** contiguous index pairs (i.e., 0 ≤ i < n-1) such that the expression `(arr[i] × arr[i+1]) - arr[i] - arr[i+1]` is even.  
Return the answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 3, m = 3, k = 2`  
Output: `6`  
*Explanation:  
Count all arrays of length 3 with m=3:  
For example, [2,2,2]: pairs are (2,2), (2,2);  
(test all combinations; 6 arrays satisfy the condition for k=2).*

**Example 2:**  
Input: `n = 2, m = 1, k = 0`  
Output: `1`  
*Explanation:  
Only one possible array: [1,1].  
There's 1 pair (1,1): (1 × 1) - 1 - 1 = -1 (odd),  
so number of even pairs = 0 (matches k=0).*

**Example 3:**  
Input: `n = 3, m = 2, k = 1`  
Output: `4`  
*Explanation:  
Possible arrays:  
[1,1]: both pairs odd (0 even pairs)  
[1,2]: pair (1,2) → 1, odd; (2,?)... Counting with all combinations,  
there are 4 arrays with exactly one "even" pair.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible mⁿ arrays, for each count the number of even pairs as per the expression.  
  Too slow for large n, m.
- **Observation**: For a pair (a, b), `(a × b) - a - b` is even ⇔ (a × b) and (a + b) have same parity.  
- **Parity Analysis**:  
  - Odd × Odd = Odd, Odd + Odd = Even  
  - Odd × Even = Even, Odd + Even = Odd  
  - Even × Odd = Even, Even + Odd = Odd  
  - Even × Even = Even, Even + Even = Even  
  So, only if both numbers are both even or both odd, `(a × b) - a - b` is even.
- **Dynamic Programming**:  
  - Use dp[pos][remain][parity]:  
    pos = current index,  
    remain = remaining k-even pairs needed,  
    parity = parity of prev number (0: even, 1: odd)
  - Base case: pos==n, remain==0 ⇒ 1, else 0.
  - For position, try all next numbers (even and odd):
    - If parity equals, next pair is "even", decrement remain.
    - Sum over all possibilities.
  - The number of even and odd numbers from 1..m can be precomputed.

- **Trade-off**:  
  - Brute-force is infeasible for large n.  
  - DP is efficient: O(n × k × 2).

### Corner cases to consider  
- n = 1 (no pairs in array)
- k = 0
- k = n-1 (maximum possible consecutive pairs)
- m = 1 (array with only one kind of element)
- Even/odd edge for m (m odd or even)

### Solution

```python
MOD = 10**9 + 7

def findKEvenArrays(n, m, k):
    # cnt0: number of even numbers in 1..m, cnt1: number of odd numbers
    cnt0 = m // 2
    cnt1 = m - cnt0

    # dp[pos][remain][parity]: ways to fill pos..n-1, with 'remain' even-pairs left, previous number parity
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(pos, remain, last_parity):
        if remain < 0:
            return 0
        if pos == n:
            return 1 if remain == 0 else 0
        res = 0
        # Try to fill this position with even number
        # For even num (parity 0)
        if cnt0 > 0:
            new_remain = remain - (1 if last_parity == 0 else 0) if pos > 0 else remain
            res += cnt0 * dp(pos + 1, new_remain, 0)
            res %= MOD
        # For odd num (parity 1)
        if cnt1 > 0:
            new_remain = remain - (1 if last_parity == 1 else 0) if pos > 0 else remain
            res += cnt1 * dp(pos + 1, new_remain, 1)
            res %= MOD
        return res

    # For first position, try all possible even and odd numbers (their parity)
    total = 0
    if cnt0 > 0:
        total += cnt0 * dp(1, k, 0)
        total %= MOD
    if cnt1 > 0:
        total += cnt1 * dp(1, k, 1)
        total %= MOD
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
    DP has n positions and k possible remain states, last_parity is 2. Each DP state does O(1) work.
- **Space Complexity:** O(n × k × 2) for DP cache.

### Potential follow-up questions (as if you’re the interviewer)  

- What if m is up to 10¹⁸?  
  *Hint: Only counts of even/odd matter, not actual numbers.*

- Can you also output the arrays if n, m are small?  
  *Hint: Generate all arrays via backtracking if feasible.*

- How would your code handle modulus overflow?  
  *Hint: Take mod at every addition or multiplication step.*

### Summary
This problem uses **parity classification** and classic **dynamic programming**. Its state is small: we only track current position, remaining k-pairs, and the last number's parity.  
The main insight is that counting only depends on whether numbers are even or odd (not their actual value), so we use counts for efficient transitions.  
Pattern used: **Digit DP / parity DP** — commonly seen in sequence construction and restriction-counting problems.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Sort Array By Parity II(sort-array-by-parity-ii) (Easy)