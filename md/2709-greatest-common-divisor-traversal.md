### Leetcode 2709 (Hard): Greatest Common Divisor Traversal [Practice](https://leetcode.com/problems/greatest-common-divisor-traversal)

### Description  
Given a 0-indexed integer array **nums**, you can traverse between two indices i and j if and only if gcd(nums[i], nums[j]) > 1 (they share a common prime factor).  
For every i, j pair where 0 ≤ i < j < n, determine if it’s possible—using a sequence of such traversals—to get from i to j (possibly using other indices as intermediate steps).  
Return **true** if every pair (i, j) can be connected through these traversals, otherwise return **false**.

---

### Examples  

**Example 1:**  
Input: `nums = [2,3,6]`  
Output: `true`  
*Explanation:  
Pairs to consider: (0,1), (0,2), (1,2).  
To go from 0→1:  
0→2 (gcd(2,6)=2>1), then 2→1 (gcd(6,3)=3>1), so 0→2→1 is possible.  
Similarly, 0↔2 and 1↔2 are direct.  
All pairs are connected.*

**Example 2:**  
Input: `nums = [3,9,5]`  
Output: `false`  
*Explanation:  
3 and 9 can be connected (gcd(3,9)=3>1), but 5 is coprime with both (gcd(5,3)=1, gcd(5,9)=1), so 5 cannot reach the others.*

**Example 3:**  
Input: `nums = [4,6,15,35]`  
Output: `true`  
*Explanation:  
0:4(2,2), 1:6(2,3), 2:15(3,5), 3:35(5,7)  
0→1 (gcd=2); 1→2 (gcd=3); 2→3 (gcd=5).  
4→6→15→35 forms a chain—every pair is reachable via some sequence.*

---

### Thought Process (as if you’re the interviewee)  
- **Brute-force graph traversal:**  
  For each pair (i, j), try to DFS/BFS checking if you can reach from i to j via allowed traversals (edges where gcd>1).  
  This would be O(n²⋅n): too slow for large n.

- **Key insight:**  
  If you view the array as nodes where an edge exists between i and j if gcd(nums[i], nums[j])>1, the question is: Is this graph fully connected?  
  But comparing all O(n²) pairs for gcd>1 is too slow.

- **Optimization using Union-Find (DSU):**  
  Instead of connecting nodes using pairwise gcd, notice that if two numbers share a *prime factor*, they are "connected" via that factor.
  - For each number, decompose it into its prime factors.
  - For every number, union it with others that share a prime via these factors.
  - Effectively, we can treat each prime as a "hub": numbers sharing a prime get grouped using DSU.

- **Final check:**  
  After processing, check if all indices belong to the same connected component.

--- 

### Corner cases to consider  
- Single element array (n=1) ⇒ trivially true, only one node.
- All elements are the same ⇒ always true.
- No two elements share any factor >1 (purely coprime array) ⇒ false if n > 1.
- Contains 1 as element (1 is coprime with everything, but 1 itself does not connect to others, since gcd(1, x) = 1, so it’s a blocker).
- Large primes (array is all different big primes, so nothing is connected).
- Chained connections (elements form a chain: each shares a factor with the next, but not with all others directly).

---

### Solution

```python
def can_traverse_all_pairs(nums):
    # Union-Find data structure
    class DSU:
        def __init__(self, n):
            self.parent = list(range(n))
        
        def find(self, x):
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])
            return self.parent[x]

        def union(self, x, y):
            fx, fy = self.find(x), self.find(y)
            if fx != fy:
                self.parent[fx] = fy

    from collections import defaultdict

    n = len(nums)
    if n == 1:
        return True

    # If any element is 1, cannot connect to others (gcd(1, x) == 1 always)
    if 1 in nums:
        return False

    # Helper: factorize number into its unique primes
    def get_primes(x):
        res = set()
        d = 2
        while d * d <= x:
            if x % d == 0:
                res.add(d)
                while x % d == 0:
                    x //= d
            d += 1
        if x > 1:
            res.add(x)
        return res

    # Map from prime → indices in nums where prime divides nums[i]
    prime_to_indices = defaultdict(list)
    for i, val in enumerate(nums):
        for p in get_primes(val):
            prime_to_indices[p].append(i)

    dsu = DSU(n)
    # For each prime, union together indices that share this prime
    for indices in prime_to_indices.values():
        for i in range(1, len(indices)):
            dsu.union(indices[0], indices[i])

    # After all unions, check if all indices belong to same group
    group = dsu.find(0)
    for i in range(1, n):
        if dsu.find(i) != group:
            return False
    return True
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each number nᵢ, prime factorization up to ⌊√nᵢ⌋.  
  For all n: O(n × log(max(nums))) for factorization (worst case for big numbers is sublinear, most are fast).  
  Union operations over n: nearly linear, due to path compression.  
  **Overall: O(n × log(max(nums)))**, with some log* factors if you count DSU overhead.

- **Space Complexity:**  
  O(n) for parent array, and O(n + number of unique primes in all nums) for factor maps.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large numbers (beyond 1e6) where prime factorization is slow?
  *Hint: Consider using a sieve or precomputed primes, or optimized pollard rho factorization for big values.*

- What if you only need to know if a specific two indices i, j are connected, not all pairs?
  *Hint: You might not need to fully union everything; you could use BFS/DFS on demand for small queries.*

- If you must return the actual sequence of traversals (the path) between i and j, how would you modify your code?
  *Hint: You'd need to explicitly construct the traversal graph and store predecessors when traversing.*

---

### Summary
This is a **graph connectivity problem** where nodes represent array indices and connections are given by shared prime factors (gcd>1).  
The main pattern is **Union-Find (Disjoint Set Union) + prime factorization** per node to efficiently group nodes via shared primes.  
This pattern appears in problems involving "groups based on divisibility", prime factors, or "are all items connected under relation X".  
It’s commonly used wherever equivalence relations by shared traits (divisibility, bits, substring overlap, etc.) are involved.

### Tags
Array(#array), Math(#math), Union Find(#union-find), Number Theory(#number-theory)

### Similar Problems
- Graph Connectivity With Threshold(graph-connectivity-with-threshold) (Hard)