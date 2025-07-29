### Leetcode 3377 (Medium): Digit Operations to Make Two Integers Equal [Practice](https://leetcode.com/problems/digit-operations-to-make-two-integers-equal)

### Description  
Given two integers **n** and **m**, each with the same number of digits, you can repeatedly change any digit of **n** (as long as it’s not 9, you can increment by 1; if it's not 0, you can decrement by 1). The rules are:
- In *every step*, **n** must **not** be a prime number—including the start and any intermediate step.
- Every time you change **n**, add its value to a running "cost".
- Your goal: find the **minimum total cost** to turn **n** into **m** via valid operations, or return -1 if it's impossible.

### Examples  

**Example 1:**  
Input: `n = 20`, `m = 22`  
Output: `84`  
*Explanation: 20→21→22 (Sum: 20+21+22=63. But if 21 is prime, that path is invalid—need to avoid primes. Must consider only non-prime transformations.)*

**Example 2:**  
Input: `n = 15`, `m = 18`  
Output: `64`  
*Explanation: Transform 15→16→17→18 with only non-prime numbers at each step. Try all sequences, only counting paths with all composite values.*

**Example 3:**  
Input: `n = 29`, `m = 22`  
Output: `-1`  
*Explanation: No valid sequence exists from 29 to 22 without passing through a prime (or being a prime at any step), so answer is -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible sequences of digit operations from **n** to **m**, but that leads to an exponential number of paths (not feasible).
- **Optimize:**  
  - Since each digit can be changed up or down by 1 (unless 0 or 9), and at every step **n** should not be prime, *this reduces to a shortest path (graph) problem*, where states are possible numbers, edges are valid digit-ops, and nodes where **n** is a prime are forbidden.
  - **Model:**  
    - Each state = a multi-digit integer with the same number of digits as **n**/**m**, where every state keeps track of the cost (sum of numbers traversed so far).
    - Use **Dijkstra’s algorithm**:
      - Initial state = n with cost = n.
      - For each position in the number, if possible, increment or decrement (avoid changing beyond 9 or below 0 in that digit).
      - Do not allow leading zeros because the number must remain the same number of digits.
      - Do not enqueue/visit a state if any intermediate number is a prime.
      - Goal: Reach m with least cost.
  - **Implementation details:**
    - Precompute primes up to the maximum possible value using sieve of Eratosthenes.
    - Use a priority queue (min-heap) to always explore the lowest-cost path next (standard Dijkstra).
    - Track visited states with a dictionary or set to avoid cycles.

### Corner cases to consider  
- n or m is a prime number initially (invalid start/end state).
- Leading zeros are not allowed (numbers must maintain original digit length).
- There is no possible way (every path to m crosses a prime number).
- n == m (returns n if n is not prime, else -1).
- Digits are all 9 or 0 (no valid increment or decrement).
- Both numbers have more than 4 digits—ensure sieve is large enough.

### Solution

```python
def minOperations(n: int, m: int) -> int:
    from collections import deque
    import heapq

    # Turn integer into digits as list, keep leading zeros if needed
    def to_digits(x, width):
        return [int(d) for d in f"{x:0{width}d}"]

    # Turn digits list back to integer
    def from_digits(dlist):
        return int("".join(str(x) for x in dlist))

    # Sieve to preprocess all primes up to the max possible number
    def prime_sieve(limit):
        sieve = [True] * (limit + 1)
        sieve[0] = sieve[1] = False
        for i in range(2, int(limit ** 0.5) + 1):
            if sieve[i]:
                for j in range(i * i, limit + 1, i):
                    sieve[j] = False
        return sieve

    n_str, m_str = str(n), str(m)
    num_digits = len(n_str)
    max_val = 10 ** num_digits - 1

    # Precompute primes up to max_val
    is_prime = prime_sieve(max_val)

    # If start or end is prime, impossible
    if is_prime[n] or is_prime[m]:
        return -1

    # Standard Dijkstra from n to m
    heap = []
    # (cost so far, current number)
    heapq.heappush(heap, (n, n))
    visited = dict()
    visited[n] = n

    while heap:
        cost, cur = heapq.heappop(heap)
        if cur == m:
            return cost
        cur_digits = to_digits(cur, num_digits)
        for idx in range(num_digits):
            d = cur_digits[idx]
            for new_d in [d - 1, d + 1]:
                if 0 <= new_d <= 9 and new_d != d:
                    next_digits = cur_digits.copy()
                    next_digits[idx] = new_d
                    # skip leading zero scenario
                    if next_digits[0] == 0:
                        continue
                    next_num = from_digits(next_digits)
                    if is_prime[next_num]:
                        continue
                    next_cost = cost + next_num
                    if next_num not in visited or next_cost < visited[next_num]:
                        visited[next_num] = next_cost
                        heapq.heappush(heap, (next_cost, next_num))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(10ⁿ × n × log(10ⁿ)), where n = number of digits. There are at most 10ⁿ different n-digit numbers, each can try n × 2 neighbors, and Dijkstra's heap induces log terms.
  - Sieve of Eratosthenes costs O(10ⁿ log log 10ⁿ), but only once.
- **Space Complexity:**  
  - O(10ⁿ) for the sieve array and the visited state map.
  - Heap up to O(10ⁿ) states in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if some digits could be changed by more than 1 at once?  
  *Hint: Consider making each possible one-step operation still atomic, and model as a graph with “jump” edges.*

- What if, instead of avoiding all primes, you had to avoid a *given* list of forbidden numbers?  
  *Hint: Same algorithm, but update the "forbidden" check to reference a hash set of forbidden values instead of prime sieve.*

- Could you optimize space further if n can be up to 100 digits?  
  *Hint: Represent numbers as strings or tuples; optimize visited by pruning paths with higher cost, possibly using BFS with early stopping.*

### Summary
This problem demonstrates a **graph traversal + Dijkstra’s shortest path** pattern, with additional constraints (primes forbidden as states). It is a classic case of "state space search with forbidden/inaccessible states." Variation of this logic can be used in sliding puzzles, sequence transforms, and problems with digit-wise operations and constraints. Modeling numbers as nodes, and each “legal” operation as an edge, is a versatile interview pattern.