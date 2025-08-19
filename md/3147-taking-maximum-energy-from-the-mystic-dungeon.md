### Leetcode 3147 (Medium): Taking Maximum Energy From the Mystic Dungeon [Practice](https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon)

### Description  
You are given an array `energy` where each element represents the energy a magician can give or take (can be negative or positive), lined up in a row.  
You can start at *any* magician (any index). Upon absorbing energy from magician at index `i`, you will immediately teleport to magician at index `i + k`. This process repeats: after absorbing from index `i`, you jump to `i + k`, then to `i + 2k`, and so on, until you reach an index outside the array. Your path consists of all visited indices and the energy values at those indices are summed.  
Your task is to **find the maximum energy** you can accumulate from any such journey, starting at any magician.

### Examples  

**Example 1:**  
Input: `energy = [5, 2, -10, -5, 1]`, `k = 2`  
Output: `3`  
*Explanation:*  
- If you start at index 0: path = [0, 2, 4] → energy sum = 5 + (-10) + 1 = -4  
- If you start at index 1: path = [1, 3] → 2 + (-5) = -3  
- If you start at index 2: path = [2, 4] → -10 + 1 = -9  
- If you start at index 3: path = [3] → -5  
- If you start at index 4: path = [4] → 1  
→ The **maximum** is 1 (from index 4).  
**But** the optimal play is to start at index 0: 5 + (-10) + 1 = -4;
index 1: 2 + (-5) = -3;  
index 2: -10 + 1 = -9;  
index 3: -5;  
index 4: 1.  
So, the maximum is 1.

(Notice, based on some examples, sometimes the output is the starting element if all further jumps reduce the value.)

**Example 2:**  
Input: `energy = [1, -2, 3, 4, -5, 6]`, `k = 3`  
Output: `7`  
*Explanation:*  
- Starting at 0: [0, 3] → 1 + 4 = 5  
- Starting at 1: [1, 4] → -2 + (-5) = -7  
- Starting at 2: [2, 5] → 3 + 6 = 9  
- Starting at 3: [3] → 4  
- Starting at 4: [4] → -5  
- Starting at 5: [5] → 6  
Maximum is **9** (at index 2).

**Example 3:**  
Input: `energy = [-1, -2, -3, -4, -5]`, `k = 1`  
Output: `-1`  
*Explanation:*  
All values are negative; best is to start at the least negative (index 0): -1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  Simulate starting at every index:
    - For index `i`, sum energy at `i`, `i + k`, `i + 2k`, ..., until out of bounds.
    - Track maximum sum found.
    - This is O(n²/k) (for each start index, up to n/k hops).
- **Optimization**:  
  Notice that the sum for jumps at intervals of k from index i is independent; dynamic programming can help here:
    - For any index `i`, the total energy if starting there is: energy[i] + (sum from i+k), so:  
      dp[i] = energy[i] + (dp[i+k] if i+k < n)
    - dp values for i ≥ n-k are just energy[i] (no possible k-jump).
    - Process array **backward** so that dp[i+k] is calculated before dp[i].
    - The result is max(dp[i]) over all i (since we can start anywhere).
- **Why this works:**  
  Each set of start indices `i`, `i+1`, ..., `i+k-1` is independent and covers all possible unique starting points due to the jump size.

### Corner cases to consider  
- k > n: You can always start at any index and you can't jump; max(energy)
- All negative energy: Pick the least negative value.
- k = 1: Can traverse the array from any start; some subpaths may have higher sum only if started late.
- k = n: Only first element possible; one hop only.
- energy is empty (should not happen per constraints, but check!)
- energy length 1: Only one possible sum.

### Solution

```python
def maximumEnergy(energy: list[int], k: int) -> int:
    n = len(energy)
    dp = energy[:]  # dp[i] stores best energy sum starting at i
    # Process backwards, so dp[i+k] is already set
    for i in range(n - 1 - k, -1, -1):
        dp[i] += dp[i + k]
    return max(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n). Each index is processed once, and dp updates are O(1).
- **Space Complexity:**  
  O(n) for dp array (could optimize to O(1) if allowed to overwrite energy).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed the actual path (starting index) yielding the maximum energy?  
  *Hint: Track start index or reconstruct by observing dp values.*

- How to do this in-place without extra space?  
  *Hint: Overwrite the energy array if permitted.*

- If k may change frequently (many queries, different k per query), how to optimize repeated queries?  
  *Hint: Preprocess for k=1 (prefix/suffix sums), maybe segment trees for arbitrary jumps.*

### Summary

- Uses **dynamic programming**: dp[i] = energy[i] + (dp[i+k] if in bounds).
- Common DP pattern for jump-path array/grid problems (e.g., House Robber, Sequence DP).
- Optimizes from brute-force to O(n) by smart backward filling of dp.
- Applies to similar "fixed jump" or "disjoint subsequence sum" problems.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
