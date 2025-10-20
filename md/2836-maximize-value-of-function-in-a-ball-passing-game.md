### Leetcode 2836 (Hard): Maximize Value of Function in a Ball Passing Game [Practice](https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game)

### Description  
Given an array **receiver** of length `n`, where `receiver[i]` indicates which player gets the ball if it's currently with player `i`. You also have an integer `k`, the number of total passes.  
You need to pick a starting player `x` (from `0` to `n-1`) and calculate `f(x)`, the sum of the ids (indices) of all the players who touch the ball, starting with player `x` and after `k` passes (player `x` makes the 1st pass, then that player makes the next pass, etc.), always including the current holder's id in the sum (repetitions allowed).  
Your task: return the **maximum** value of `f(x)` for any valid starting player `x`.

### Examples  

**Example 1:**  
Input: `receiver = [2,0,1]`, `k = 4`  
Output: `6`  
*Explanation: Start with player 2: Sequence is 2 (start), 1, 0, 2, 1.  
Sum = 2 + 1 + 0 + 2 + 1 = 6.*

**Example 2:**  
Input: `receiver = [1,2,0,3]`, `k = 10`  
Output: `19`  
*Explanation: Start with player 2: [2,0,1,2,0,1,2,0,1,2,0]  
Sum = 2 + 0 + 1 + 2 + 0 + 1 + 2 + 0 + 1 + 2 + 0 = 11.  
But actually the maximum is starting at player 3 (since receiver[3]=3): [3,3,3,...] all 3s.  
Sum = 3 × 11 = 33 (since k=10, we include the initial and 10 passes).  
But question asks for *k* passes so, if we count initial + 10 passes, double check problem for exact conventions!  
If only 10 ids including starting, then for player 3: [3,3,3,3,3,3,3,3,3,3,3] sum = 3 × 11 = 33. But, if only passes, then it may be 3 × 10 = 30. This example may require clarification!*

**Example 3:**  
Input: `receiver = `, `k = 100`  
Output: `0`  
*Explanation: Only one player, passing to self, sum is 0 repeated.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each starting player `x`, simulate `k` passes, track player ids, sum up, keep max.  
  - Time: O(n × k), which can be too slow for large `k` (up to 1e10, etc.).
- **Observation:** Passing forms a path, possibly with cycles. Once a cycle is hit, can jump by cycle length for large `k`.
- **Optimized approach:** Use **binary lifting** (a.k.a. jump pointers)—for each player, precompute where you'll end up after 2⁰, 2¹, ..., 2ᴾ passes, also compute the sum of ids along each of these jumps.
  - For each starting player, decompose `k` in binary, walk forward, summing the segments.
  - This gives O(n log k) solution, which is efficient enough.
- **Trade-offs:**  
  - O(n log k) time and space, but all steps are direct computation with no simulation.

### Corner cases to consider  
- One player, self-loop, any k
- All players passing to themselves (all self-loops)
- Large `k` values (e.g., `k > n`)
- Cycles in the passing chain
- k = 0 (just the start player)
- receiver[i] = i for some i (repeats)
- Duplicates in receiver

### Solution

```python
def getMaxFunctionValue(receiver, k):
    n = len(receiver)
    max_pow = k.bit_length()  # Number of bits in k

    # f[i][j]: node reached by starting from i and making 2^j passes
    # g[i][j]: sum of ids by starting from i and making 2^j passes (excludes final node's id)
    f = [[0]*max_pow for _ in range(n)]
    g = [[0]*max_pow for _ in range(n)]

    # Precompute jump tables for binary lifting
    for i in range(n):
        f[i][0] = receiver[i]
        g[i][0] = receiver[i]

    for p in range(1, max_pow):
        for i in range(n):
            next_node = f[i][p-1]
            f[i][p] = f[next_node][p-1]
            g[i][p] = g[i][p-1] + g[next_node][p-1]

    res = 0
    for start in range(n):
        cur = start
        total = start  # Start with id of starting player
        remain = k
        bit = 0
        while remain > 0:
            if remain & 1:
                total += g[cur][bit]
                cur = f[cur][bit]
            remain >>= 1
            bit += 1
        res = max(res, total)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log k)  
  Because for each player, we precompute log k jump pointers, and for each starting point, calculation is also log k steps.
- **Space Complexity:** O(n × log k)  
  Due to the storage for the jump tables (f and g for each player, each up to log k in size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the score is the number of **distinct** ids touched (not counting repeats)?  
  *Hint: Consider fast cycle detection and hash sets for tracking distinct.*

- How would you extend to solve for **all** k from 1 to K in a single run?  
  *Hint: Precompute cycle info and interval sums for each player.*

- Can you optimize space if k is extremely large but n is small?  
  *Hint: Note many entries in lifting table may be redundant, try reusing or compressing.*

### Summary
This problem leverages the **binary lifting** (jump pointers/doubling) pattern, often used for efficient simulation over immutable paths and jumps, especially when k is large. This is a common technique in tree ancestor queries (like Lowest Common Ancestor, jump k-steps) and can be applied to simulating repeated transitions or processing fast-forwarding in linked lists or other graphs with immutable transitions. Binary lifting lets us replace linear-in-k simulation with logarithmic steps using preprocessed jump tables.


### Flashcard
Binary lifting precomputes 2ᵏ-step jumps and path sums; decompose k into powers of 2, accumulate values in O(log k) per query.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Jump Game VI(jump-game-vi) (Medium)