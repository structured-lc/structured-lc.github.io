### Leetcode 3629 (Medium): Minimum Jumps to Reach End via Prime Teleportation [Practice](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation)

### Description  
You are given an integer array **nums** of length \( n \).  
You start at **index 0**, and your goal is to reach **index \( n-1 \)** (the last element).

From any index \( i \), you may perform one of the following operations:

- **Adjacent Step**: Move to index \( i+1 \) or \( i-1 \) (if within bounds).
- **Prime Teleportation**: If \( \text{nums}[i] \) is a **prime number** \( p \), you may instantly jump to any index \( j \neq i \) such that \( \text{nums}[j] \% p = 0 \).

Return the **minimum number of jumps** required to reach index \( n-1 \).

### Examples  

**Example 1:**  
Input: `nums = [3, 6, 8, 2, 10]`  
Output: `2`  
*Explanation: Start at index 0 (3). 3 is prime, so teleport to index 1 (6, since 6 % 3 == 0). Then adjacent jump to index 2, then index 3 (2 is prime). Teleport to index 4 (10 % 2 == 0). So one sequence is: 0 → 1 → 2 → 3 → 4, but optimal path is: 0 (3, prime) ⇒ 3 (2, prime, via teleport) ⇒ 4 (10, via teleport from 2). Thus, 2 jumps: [0→3→4].*

**Example 2:**  
Input: `nums = [4, 6, 8, 10, 12]`  
Output: `4`  
*Explanation: No number in the array is prime, so you can only take adjacent steps: 0→1→2→3→4 (4 jumps).*

**Example 3:**  
Input: `nums = [5, 7, 14, 35, 28]`  
Output: `2`  
*Explanation: Start at 0 (5, prime). Can teleport to index 2 (14 % 5 == 4) or 3 (35 % 5 == 0); teleport to 3 (35). From 3, take adjacent step to 4 (28).  
Optimal sequence: 0 (5, prime) ⇒ 3 (35, teleport) ⇒ 4 (adjacent), total jumps: 2.*

### Thought Process (as if you're the interviewee)  

- **Brute-force idea:**  
  Try all possible paths using DFS or BFS, keeping track of visited indices. This soon gets exponential, as possible paths multiply rapidly, especially with teleportation.

- **Optimization:**  
  The problem is about **minimum jumps** – ideal for **BFS** (Breadth-First Search). Each position is a node; you can move to adjacent indices, or, if prime, teleport to select nodes.

- Track visited indices to avoid cycles and redundant processing.

- Preprocessing step: For each prime in nums, collect all indices it can teleport to (where nums[j] % prime == 0, j ≠ i).  
  To make teleportation efficient, preprocess:
  - Map each **prime p** to all indices with nums[j] divisible by p.
  
  For every BFS pop:
  - Consider adjacent nodes (i-1, i+1).
  - If current value is prime and not used for teleport, teleport to all indices where nums[j] % value == 0.

- **Why BFS:**  
  - Each move increments the jump count.
  - BFS visits nodes in order of jump count; first time reaching \( n-1 \) is optimal.

### Corner cases to consider  
- All numbers are composites (no teleportation possible).
- All numbers are the same large prime.
- Array of size 1 (already at the end).
- Starting/ending numbers are not prime or not divisible by any prime.
- Primes appearing more than once.
- Array includes 0 or negative numbers (should clarify with interviewer).
- Large n (avoid TLE with efficient prime testing and teleport tracking).

### Solution

```python
def min_jumps(nums):
    from collections import deque, defaultdict

    n = len(nums)
    if n == 1:
        return 0

    # Sieve to check primes up to max(nums)
    def is_prime(x):
        if x <= 1:
            return False
        if x == 2:
            return True
        if x % 2 == 0:
            return False
        i = 3
        while i * i <= x:
            if x % i == 0:
                return False
            i += 2
        return True

    # Map: prime number p ➔ [all indices j with nums[j] % p == 0]
    prime_to_indices = defaultdict(list)
    for idx, val in enumerate(nums):
        if is_prime(val):
            prime_to_indices[val] = []

    # Fill the lists
    for p in prime_to_indices:
        for idx, val in enumerate(nums):
            if idx != 0 and val % p == 0:
                prime_to_indices[p].append(idx)

    # BFS: (index, steps)
    queue = deque()
    queue.append((0, 0))
    visited = [False] * n
    visited[0] = True
    used_tele = set() # Primes already used for teleport

    while queue:
        i, steps = queue.popleft()
        # Reached the end!
        if i == n - 1:
            return steps

        # Move to i - 1
        if i - 1 >= 0 and not visited[i - 1]:
            visited[i - 1] = True
            queue.append((i - 1, steps + 1))

        # Move to i + 1
        if i + 1 < n and not visited[i + 1]:
            visited[i + 1] = True
            queue.append((i + 1, steps + 1))

        # Prime teleportation
        if is_prime(nums[i]) and nums[i] not in used_tele:
            for j in prime_to_indices[nums[i]]:
                if not visited[j]:
                    visited[j] = True
                    queue.append((j, steps + 1))
            used_tele.add(nums[i])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing primes: \(O(n \sqrt{X})\) for is_prime per number, where \( X \) is max(nums).
  - Preprocessing teleport lists: For each prime, up to \(O(n)\) on all primes (in worst case, \(O(n^2)\)).
  - BFS visits each node at most once: \(O(n)\).
  - Overall: Up to \(O(n^2)\) in the worst case (many primes).

- **Space Complexity:**  
  - prime_to_indices: Up to \(O(n \cdot P)\), usually much less.
  - BFS queue and visited: \(O(n)\).
  - Used_tele: Up to number of distinct primes, \(O(P)\).

### Follow-up questions  

- How would you optimize if the array is huge and numbers are large (efficient prime checks, block sieve, etc.)?
  
- What if there are value duplicates? Could memoization by (index, used teleportations) improve further?

- What if you can teleport to indices with \(\text{nums}[j] \% p == r\) for some remainder \( r \)?
