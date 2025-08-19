### Leetcode 935 (Medium): Knight Dialer [Practice](https://leetcode.com/problems/knight-dialer)

### Description  
Given a standard phone keypad (digits 0-9), a chess knight can start on any digit and move like a knight moves in chess ("L" shape: two in one direction, one in a perpendicular). For a given integer n, return how many distinct phone numbers of length n can be dialed by making valid knight moves. Each move selects the next digit. The answer must be returned modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `10`  
*Explanation: With only one digit to dial, you can start on any of the ten digits (0-9), so there are 10 possible numbers, one for each key.*

**Example 2:**  
Input: `n = 2`  
Output: `20`  
*Explanation: From each digit, count the valid knight moves: for two digits, each key can be paired with every key the knight can move to from there, totaling 20.*

**Example 3:**  
Input: `n = 3`  
Output: `46`  
*Explanation: For length 3, calculate all valid 3-digit numbers by simulating all sequences of knight moves across the keypad, starting at any digit. The count accumulates possible moves for each key recursively or via DP.*

### Thought Process (as if you’re the interviewee)

- **Brute-force Idea:**  
  Try all possible paths of length n from every digit, recursively generating all sequences using valid knight moves. However, this approach will have exponential time complexity (O(10ⁿ)), making it infeasible for large n.

- **Optimize to DP:**  
  We notice overlapping subproblems—if we know how many ways exist to dial numbers of length k from digit x, we can reuse this for all longer sequences extending from x. Use either:
    - Top-down Memoization: Recursively compute the answer for (position, remainingDigits) with caching.
    - Bottom-up Dynamic Programming: Use an array to track number of ways to reach each digit at each step, updating for each "hop."

- **Space Optimization:**  
  Since each DP step relies only on the previous step, only two arrays of size 10 are needed (current and previous), instead of a full DP table.

- **Trade-offs:**  
  - Top-down: Easier to write, but uses recursion (could hit stack limits for large n).
  - Bottom-up: Iterative, constant space, fast execution.

- **Edge Treatments:**  
  The mapping of knight moves from each digit is a static 10-entry lookup array. Precompute this for clarity and performance.

### Corner cases to consider  
- n = 1 (must return 10; every digit counts as a valid "number").
- n = very large (test efficiency + mod 10⁹+7).
- Digits with no outbound knight moves (e.g., 5).
- Moves that go out of bounds or land on keypad gaps.

### Solution

```python
MOD = 10**9 + 7

def knightDialer(n):
    # Mapping: digit -> list of valid knight moves
    moves = {
        0: [4, 6],
        1: [6, 8],
        2: [7, 9],
        3: [4, 8],
        4: [0, 3, 9],
        5: [],        # '5' has no outgoing moves
        6: [0, 1, 7],
        7: [2, 6],
        8: [1, 3],
        9: [2, 4],
    }
    
    # Array: ways[i] = ways to reach digit i at current step
    prev = [1] * 10   # Start: can land on any digit
    for hop in range(1, n):
        curr = [0] * 10
        for digit in range(10):
            for nei in moves[digit]:
                curr[digit] = (curr[digit] + prev[nei]) % MOD
        prev = curr
    return sum(prev) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 10 × maxMoves)  
  For each of the n-1 steps, iterate for each digit (10 digits), and each digit checks at most 3 knight moves.
- **Space Complexity:** O(10)  
  Only two arrays of 10 used (previous and current step).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the keypad layout changes?  
  *Hint: Allow the move-adjacency mapping to be dynamically constructed from a given 2D keypad layout.*

- How would you return not just the count but all possible number sequences?  
  *Hint: Consider backtracking, but this grows memory and is only feasible for small n.*

- If we want to restrict allowed digits for starting or intermediate steps?  
  *Hint: Change base cases and DP transitions to only allow/disallow certain digits.*

### Summary
This problem is a classic example of digit DP and state compression: by systematically tabulating reachable states at each move, we avoid repeated work and achieve linear time in n. The pattern is similar to many graph-walking and combinatorial path-counting problems. The move-mapping is a static graph adjacency list, and the main skill is translating movement rules into that mapping. Patterns here are common in chess-move and grid-walk-related DP tasks.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
