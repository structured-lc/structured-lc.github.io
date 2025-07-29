### Leetcode 2263 (Hard): Make Array Non-decreasing or Non-increasing [Practice](https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing)

### Description  
Given a 0-indexed array of integers, you may increment or decrement each element any number of times (each increment/decrement counts as an operation). Your task is to transform the array into either a non-decreasing or non-increasing sequence using the **minimum total number of operations**.

- **Non-decreasing:** Each iᵗʰ element is ≤ the (i+1)ᵗʰ element.
- **Non-increasing:** Each iᵗʰ element is ≥ the (i+1)ᵗʰ element.
- You may increment or decrement any value as many times as needed, paying 1 for each step up or down.

Return the **minimum number of operations** needed to achieve either a non-decreasing or non-increasing array.


### Examples  

**Example 1:**  
Input: `nums = [3,2,4,5,0]`,  
Output: `4`  
Explanation:  
One possible way for non-increasing: [3,3,3,3,0] (add 1 to 2, subtract 1 from 4, subtract 2 from 5; total 4 steps).

**Example 2:**  
Input: `nums = [2,2,3,4]`,  
Output: `0`  
Explanation:  
Already non-decreasing; no operations needed.

**Example 3:**  
Input: `nums = `,  
Output: `0`  
Explanation:  
Trivially non-decreasing and non-increasing.

### Thought Process (as if you’re the interviewee)  

Let’s consider the brute-force approach:
- Try every possible target sequence that’s non-decreasing or non-increasing by considering all valid choices for the transformed array. 
- This is very inefficient (exponential) because you would need to try many combinations.

To optimize:
- Notice that for any sequence, the optimal solution is to **reduce the gap between each adjacent pair** so that no "descending" (for non-decreasing) or "ascending" (for non-increasing) jumps occur.
- Given we can set every number to any value using increments/decrements, the problem reduces to forming a sequence where each number fits the monotonic (either non-decreasing or non-increasing) requirement, minimizing total per-element adjustment cost.

For **non-decreasing case**:
- For each index i, pick a value for position i that is at least as big as previous value.
- For this type of problem, the minimum cost to transform the array to any non-decreasing sequence is when each element follows the **Longest Non-Decreasing Subsequence** (LNDS). However, we are allowed to increase or decrease each value, so **aligning the sequence along a common increasing path minimizes cost**.
- We can solve this by dynamic programming (DP): for each possible value at each i, track minimum cost to reach that value while maintaining monotonicity.
- However, since the range of possible values is limited (0 to 1000 based on constraints), this DP with pruning is feasible.
- Do the same for non-increasing.

Final plan:
- For both directions (non-decreasing and non-increasing), for each value at each index, calculate minimum cost to reach that value while staying monotonic.
- At the end, return min(non-decreasing cost, non-increasing cost).

### Corner cases to consider  
- Single element arrays (already valid)
- Arrays with all equal values
- Arrays strictly increasing or decreasing
- Arrays with large jumps between elements
- Arrays where transformation to non-decreasing is less costly than non-increasing (and vice versa)
- Arrays with min or max at the end or### Leetcode 2263 (Hard): Make Array Non-decreasing or Non-increasing [Practice](https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing)

### Description  
You are given a 0-indexed integer array. In a single operation, you may increment or decrement any element by 1 (and can do this as many times as needed for each element).  
Your task is to find the **minimum number of operations** required to transform the array into either:  
- a **non-decreasing** sequence (each iᵗʰ element ≤ (i+1)ᵗʰ element), or  
- a **non-increasing** sequence (each iᵗʰ element ≥ (i+1)ᵗʰ element).

Each increment or decrement counts as **1 operation**.

### Examples  

**Example 1:**  
Input: `nums = [3,2,4,5,0]`,  
Output: `4`  
Explanation:  
- One possible non-increasing array: [3,3,3,3,0]  
  — 2→3 (+1), 4→3 (-1), 5→3 (-2); total 4 moves.

**Example 2:**  
Input: `nums = [2,2,3,4]`,  
Output: `0`  
Explanation:  
Already non-decreasing.

**Example 3:**  
Input: `nums = `,  
Output: `0`  
Explanation:  
Already both non-decreasing and non-increasing.

### Thought Process (as if you’re the interviewee)  

Let’s break down the problem:
- For each position, I can freely increase or decrease that value, and my cost for a given target sequence is sum(|nums[i] - target[i]|).
- For non-decreasing: target ≤ target[1] ≤ ... ≤ target[n-1].
- For non-increasing: target ≥ target[1] ≥ ... ≥ target[n-1].
- For both, we want the **minimum cost to fit the closest monotonic path** through the array.
- **Dynamic programming** fits: let dp[i][v] = min cost to have prefix ≤ i with target[i]=v.
- At each step, for each candidate v, scan all valid prior vₚ ≤ v (for non-decreasing), and compute dp[i][v] = min(dp[i-1][vₚ]) + |nums[i] - v|.  
- The value range is ≤1000, so O(n·maxV) is feasible (maxV = 1001).

To solve it for both directions:
- Run DP for non-decreasing and non-increasing cases, then return the smaller result.

### Corner cases to consider  
- Empty array.
- Single element array.
- All elements the same.
- Already non-decreasing or non-increasing arrays (0 moves).
- Arrays with max/min at the start or end.
- Arrays with alternating high/low peaks.

### Solution

```python
def makeArrayMonotonic(nums):
    n = len(nums)
    # Value range bounds (inclusive)
    minV, maxV = min(nums), max(nums)
    MIN, MAX = 0, 1000  # As per constraints

    # DP for non-decreasing
    prev = [0] * (MAX+1)
    for v in range(MIN, MAX+1):
        prev[v] = abs(nums[0] - v)
    for i in range(1, n):
        curr = [0] * (MAX+1)
        min_so_far = float('inf')
        for v in range(MIN, MAX+1):
            min_so_far = min(min_so_far, prev[v])
            curr[v] = min_so_far + abs(nums[i] - v)
        prev = curr
    min_inc = min(prev)

    # DP for non-increasing
    prev = [0] * (MAX+1)
    for v in range(MIN, MAX+1):
        prev[v] = abs(nums[0] - v)
    for i in range(1, n):
        curr = [0] * (MAX+1)
        min_so_far = float('inf')
        for v in range(MAX, MIN-1, -1):
            min_so_far = min(min_so_far, prev[v])
            curr[v] = min_so_far + abs(nums[i] - v)
        prev = curr
    min_dec = min(prev)

    return min(min_inc, min_dec)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × V), where n is the array length and V=1001 is value range (since nums[i] ∈ [0,1000]).
- **Space Complexity:** O(V), since only previous and current rows of DP need to be kept.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the value range is much larger (e.g. up to 10⁹)?
  *Hint: Would require coordinate compression or alternative greedy/approximate methods.*

- How can you optimize memory usage if n is huge?
  *Hint: Only need 1 current + 1 previous row for DP; no need for full DP table.*

- Can the approach be extended to other monotonic constraints, like making the array strictly increasing?
  *Hint: Consider how allowed transitions in DP would change.*

### Summary
This is a **dynamic programming with monotonic substructure** problem.  
The technique of building up DP by tracking the minimum cost path for each index/value combo under ordering constraints is especially common in sequence transformation and alignment problems, such as edit distance, LIS modifications, and time series smoothing.  
This pattern can also apply to problems that ask for *minimum adjustment* to satisfy a global property with local consecutive constraints.