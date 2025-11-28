### Leetcode 3629 (Medium): Minimum Jumps to Reach End via Prime Teleportation [Practice](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation)

### Description  
Given an integer array nums of length n, you start at index 0 and want to reach index n−1 using the minimum number of jumps.  
At every step, from index i, you may:
- Move one step to index i+1 or i−1 (if in bounds), or
- If nums[i] is a prime number p, instantly "teleport" to any index j (j≠i) such that nums[j] is divisible by p (i.e., nums[j] % p == 0).  
Return the minimum number of jumps needed to reach index n−1.

### Examples  

**Example 1:**  
Input: `nums = [2, 4, 3, 9, 6]`  
Output: `2`  
Explanation:  
Step 1: Start at index 0 (value 2, which is prime), teleport to index 1 (since 4 % 2 == 0) → [0 → 1]  
Step 2: Walk one step to index 4 (since 4+1=5, and index 4 is in bounds) → [1 → 4]  

**Example 2:**  
Input: `nums = [7, 3, 15, 6, 10]`  
Output: `2`  
Explanation:  
Step 1: Start at index 0 (value 7, which is prime). Can teleport to index 2 (15%7 ≠ 0), index 3 (6%7 ≠ 0), index 4 (10%7 ≠ 0). Only adjacent moves: [0 → 1].   
Step 2: At index 1 (3, prime). Teleport to index 3 (6%3 == 0) or index 2 (15%3 == 0) or index 4 (10%3 == 1). Teleport to index 3 or 2, then walk/teleport to 4. Total minimum jumps is 2.

**Example 3:**  
Input: `nums = [5, 8, 10, 15, 7, 21, 35]`  
Output: `2`  
Explanation:  
Step 1: Start at index 0 (5, prime), teleport to any index where nums[j] % 5 == 0: indices 2 (10), 3 (15), 6 (35) → Best jump: 0→6  
Step 2: From 6 (35), one adjacent step isn't needed as it's already at last index.

### Thought Process (as if you’re the interviewee)  
Let's think step by step:

- **Brute force**: Try all possible sequences with DFS or recursive backtracking. But with primes and teleportation, this is exponential, so not feasible.
- **Graph/BFS**: Model as a graph. Each index is a node, edges are moves: i±1 and teleportation via prime. Use Breadth-First Search to find the shortest path.
- For prime teleportation, precompute for each prime, a list of indices with values divisible by that prime for fast queries.
- Once we teleport on a prime from index i, mark all possible teleportation destinations for that prime as "used" to avoid redundant visits.
- Use a queue (like BFS with levels), a visited set, and for each index, try adjacent and teleport moves.
- This way, we always expand the minimal-jump nodes first.

This is optimal due to uniform edge weights and similarity to "minimum steps to reach end" with combos of local and teleportation moves.

### Corner cases to consider  
- nums contains only non-primes (no teleports possible)
- nums has multiple 1s or repeated primes
- nums has one element (already at end)
- All numbers are the same
- Primes appear only at first or last index
- Large input (test performance with many indices)
- nums[i] == 0 (0 is not prime; division by 0 not allowed for modulus)

### Solution

```python
def minimumJumps(nums):
    from collections import deque, defaultdict

    # Helper to check primality
    def is_prime(x):
        if x < 2:
            return False
        for i in range(2, int(x**0.5) + 1):
            if x % i == 0:
                return False
        return True

    n = len(nums)
    # Map: prime p → indices where nums[j] % p == 0
    prime_indices = defaultdict(list)
    # Precompute all relevant primes at positions
    for idx, val in enumerate(nums):
        if is_prime(val):
            prime_indices[val]  # Just touch to mark availability

    # For each index, record valid teleport positions for the prime (avoid index i)
    divisible_map = defaultdict(list)
    for p in prime_indices:
        divisible_map[p] = [idx for idx, v in enumerate(nums) if v % p == 0 and v != p]

    visited = [False] * n
    queue = deque()
    queue.append((0, 0))  # (index, steps)
    visited[0] = True

    used_primes = set()  # Primes for which we have already teleported

    while queue:
        pos, steps = queue.popleft()
        if pos == n - 1:
            return steps

        # Adjacent steps
        for nxt in [pos - 1, pos + 1]:
            if 0 <= nxt < n and not visited[nxt]:
                visited[nxt] = True
                queue.append((nxt, steps + 1))

        # Prime teleportation
        val = nums[pos]
        if is_prime(val) and val not in used_primes:
            for idx, v in enumerate(nums):
                if idx != pos and v % val == 0 and not visited[idx]:
                    visited[idx] = True
                    queue.append((idx, steps + 1))
            used_primes.add(val)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × sqrt(K) + n²/P)  
  - For each of n indices, primality check is O(sqrt(K)), K = max(nums[i]).  
  - In worst case (primes everywhere), teleportation could touch up to n² elements.  
  - In practice, typically much less due to primes being rare and duplicate teleports being avoided with used_primes.

- **Space Complexity:**  
  O(n + P × n)  
  - O(n) for visited, O(P × n) for divisible_map if all primes occur, but mostly it's O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reduce time complexity if prime teleportation is allowed only once per number?
  *Hint: Use a flag with the visited state representing whether teleport was used for that prime.*

- Can the approach be adapted for variable-length prime teleportation (can skip k steps where k = prime)?
  *Hint: Think graph modeling, edges weighted by prime-step jumps.*

- Can you solve it if jumps are only allowed from left to right (no i−1 moves)?
  *Hint: Use one-directional BFS and limit adjacent step logic.*

### Summary
This problem uses the **Graph/BFS Shortest Path** pattern with "teleportation" edges based on prime-related logic.  
It combines classic BFS for reachability with additional dynamic neighbor computation.  
This approach generalizes to problems where some nodes enable non-local "special" jumps (used in many reachability/shortest path questions involving value-based transitions).


### Flashcard
Model as graph where nodes are indices and edges represent moves (±1 steps or prime teleportation). Use BFS to find shortest path; precompute prime factors for fast teleportation lookups.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Breadth-First Search(#breadth-first-search), Number Theory(#number-theory)

### Similar Problems
