### Leetcode 3699 (Hard): Number of ZigZag Arrays I [Practice](https://leetcode.com/problems/number-of-zigzag-arrays-i)

### Description  
Given three integers **n**, **l**, and **r**: count the number of arrays of length n, where each element is in the range [l, r], and the array forms a **zigzag pattern**.  
A **zigzag array** alternates between strictly increasing and strictly decreasing.  
Formally:  
- For even indices (*i*: 0, 2, ...) ⇒ arr[i] < arr[i + 1] (local increase)  
- For odd indices (*i*: 1, 3, ...) ⇒ arr[i] > arr[i + 1] (local decrease)  
This means:  
arr < arr[1] > arr[2] < arr[3] > arr[4] ...  
Return the number of such arrays modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 3, l = 1, r = 3`  
Output: `10`  
*Explanation: Possible zigzag arrays: [1,2,1], [1,3,1], [1,3,2], [2,1,2], [2,1,3], [2,3,1], [2,3,1], [3,1,2], [3,2,1], [3,2,1]*

**Example 2:**  
Input: `n = 2, l = 1, r = 2`  
Output: `2`  
*Explanation: Possible arrays: [1,2], [2,1] (both are trivially zigzag for n=2)*

**Example 3:**  
Input: `n = 4, l = 1, r = 2`  
Output: `2`  
*Explanation: Only [1,2,1,2] and [2,1,2,1] are zigzag arrays.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Generate all possible arrays with length n and elements in [l, r]. For each, check zigzag pattern.  
  - There are (r - l + 1)ⁿ possible arrays.  
  - Clearly infeasible (exponential) for large n.

- **Optimization (DP):**  
  Use **dynamic programming**, where `dp[i][last][is_up]` denotes the number of ways to construct a zigzag array of length i, with previous value “last” and the next comparison being “up” (need arr[i] > arr[i-1]) or “down” (need arr[i] < arr[i-1]).  
  - For each position, and each choice of value, make a transition to next step based on the zigzag requirement.
  - Use prefix sum optimization to accelerate transitions for greater/less-than queries, so each value can be handled in O(1) time instead of O(r) per transition.

- **Space Optimization:**  
  Since only previous state is needed, compress DP to 2 rows (current and previous).

- **Final Approach:**  
  Dynamic Programming with prefix sums for transitions.  
  This keeps time complexity to O(n × m), where m = r - l + 1.  
  Trade-off: Much less time than brute-force, slight complexity in implementation with prefix sum arrays.

### Corner cases to consider  
- n = 1 (only one element): trivially zigzag, always allowed.
- l = r (only one possible value): only one array possible.
- Arrays with all values equal (only allowed if n = 1).
- Maximum bounds (large n and m).
- Sequences where zigzag constraint cannot be satisfied.

### Solution

```python
MOD = 10**9 + 7

def numberOfZigZagArrays(n, l, r):
    m = r - l + 1  # possible values
    # up[i]: ways ends at value l + i for "UP" transition (needs next to be 'down')
    # down[i]: ways ends at value l + i for "DOWN" transition (needs next to be 'up')
    up = [1] * m  # Initially, all 1-element arrays are valid
    down = [0] * m
    
    for pos in range(1, n):
        pre_up = [0] * (m + 1)   # prefix sum for "up"
        pre_down = [0] * (m + 1) # prefix sum for "down"
        # Build prefix sums
        for i in range(m):
            pre_up[i+1] = (pre_up[i] + up[i]) % MOD
            pre_down[i+1] = (pre_down[i] + down[i]) % MOD
        new_up = [0] * m
        new_down = [0] * m
        # For arr[pos] = l+i
        for i in range(m):
            # "down": previous must be greater
            new_down[i] = pre_up[i]  # sum of up[j], j < i (prev < curr ⇒ UP before)
            # "up": previous must be less
            new_up[i] = (pre_down[m] - pre_down[i+1]) % MOD  # sum of down[j], j > i
        up = new_up
        down = new_down
    # Final answer: sum(up) + sum(down)
    return (sum(up) + sum(down)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n is length and m is r - l + 1. Each position computes prefix sum (O(m)), and transitions for each value in O(1).
- **Space Complexity:** O(m), since only arrays for previous and current states need to be stored for "up" and "down".

### Potential follow-up questions (as if you’re the interviewer)  

- What if array elements are required to be distinct?  
  *Hint: Think about permutations and use DP with bitmask or track used elements.*

- How would you handle if the zigzag can start either increasing or decreasing?  
  *Hint: Start DP in both ways, sum results.*

- Can you generalize to alternate between k patterns (e.g. up, up, down)?  
  *Hint: Consider DP with more states: up, down, other.*

### Summary
This problem uses a **dynamic programming with prefix sum optimization**—a classic pattern for counting structures with adjacency constraints.  
It's seen in combinatorial array/sequence counting problems where transitions depend on previous value relations.  
The technique is common for:  
- Counting permutations with pattern,
- Building up sequences with local conditions,
- Combinatorial state transitions with O(1) lookups via prefix/suffix sum tricks.

### Tags
Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
