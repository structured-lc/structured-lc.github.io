### Leetcode 1998 (Hard): GCD Sort of an Array [Practice](https://leetcode.com/problems/gcd-sort-of-an-array)

### Description  
Given an integer array **nums**, you’re allowed to **swap** any two elements `nums[i]` and `nums[j]` **if** gcd(nums[i], nums[j]) > 1 (i.e., their greatest common divisor is greater than 1).  
Return **true** if it's possible to sort the array in non-decreasing order using only such swaps, otherwise return **false**.  
Intuitively: Can you sort the array by swapping elements that are "GCD-connected"?

### Examples  

**Example 1:**  
Input: `nums = [7,21,3]`  
Output: `true`  
*Explanation:  
- Swap 7 and 21 (gcd=7): [21,7,3]  
- Swap 21 and 3 (gcd=3): [3,7,21]—sorted!*

**Example 2:**  
Input: `nums = [5,2,6,2]`  
Output: `false`  
*Explanation:  
- 5 is coprime with every other element (gcd=1), so 5 can’t move.
- The array can’t be sorted.*

**Example 3:**  
Input: `nums = [10,5,9,3,15]`  
Output: `true`  
*Explanation:  
- Swap 10 and 15 (gcd=5): [15,5,9,3,10]
- Swap 15 and 3 (gcd=3): [3,5,9,15,10]
- Swap 10 and 15 again: [3,5,9,10,15]—sorted!*

### Thought Process (as if you’re the interviewee)  
Let’s break down the problem:  
- *Brute-force*: Try all possible swap sequences checking GCD > 1—it’s exponential, impractical.
- *Observation*: If **two numbers are GCD-connected (directly or indirectly)**, they can end up in the same “component,” meaning you can rearrange numbers within each component.  
- To test if sort is possible:  
  - For each number, which other numbers (positions) can it reach via “GCD” swaps?  
  - Check if the sorted number at each position is in the same GCD component as the original?
- Use **Union-Find (DSU)**:  
  - For each number, union it with all its prime factors.  
  - Union all numbers sharing a prime factor (they are GCD-connected).
  - After processing, for each i, verify: original[i] and sorted[i] are in the same component.
- *Trade-offs*:  
  - This avoids TLE from brute-force.
  - Prime factorization for numbers up to 100,000 is manageable with sieve or trial division.

### Corner cases to consider  
- Array is already sorted.
- All elements are identical.
- Array of length 1.
- Numbers with no common factors (all prime, or only even+odd).
- Large input size, repeated factors.
- Numbers that cannot move at all (all pairwise coprime).

### Solution

```python
def gcdSort(nums):
    # Helper function: Sieve up to max(nums)
    def get_spf(limit):
        spf = [0] * (limit + 1)
        for i in range(2, limit + 1):
            if spf[i] == 0:
                for j in range(i, limit + 1, i):
                    if spf[j] == 0:
                        spf[j] = i
        return spf

    class DSU:
        def __init__(self, size):
            self.parent = list(range(size))
        def find(self, x):
            while self.parent[x] != x:
                self.parent[x] = self.parent[self.parent[x]]
                x = self.parent[x]
            return x
        def union(self, x, y):
            fx, fy = self.find(x), self.find(y)
            if fx != fy:
                self.parent[fx] = fy

    n = len(nums)
    MAX = max(nums)
    spf = get_spf(MAX)  # smallest prime factor for all numbers up to MAX
    dsu = DSU(MAX + 1)

    # Union each value with its prime factors (all numbers sharing a factor >1 get connected)
    for x in nums:
        num = x
        while num > 1:
            fac = spf[num]
            dsu.union(x, fac)
            while num % fac == 0:
                num //= fac

    sorted_nums = sorted(nums)
    for x, y in zip(nums, sorted_nums):
        if dsu.find(x) != dsu.find(y):
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Precomputing smallest prime factors: O(MAX log log MAX), where MAX = max(nums)
  - Processing each num (factorization) is O(log num) for each, upper-bounded by O(n log MAX)
  - DSU operations are nearly constant (amortized).
  - Sorting is O(n log n)
  - Overall: **O(n log MAX + MAX log log MAX)**

- **Space Complexity:**  
  - SPF array: O(MAX)
  - DSU structure: O(MAX)
  - Aux storage: O(n) for sorted array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only swap adjacent elements with GCD > 1?  
  *Hint: Model as a graph or adjacency problem; the approach might become more restricted like Bubble Sort step-by-step.*

- Can you minimize the number of swaps required?  
  *Hint: Consider path length within connected components for each misplaced element.*

- What if the allowed GCD constraint was with an additional threshold k > 1?  
  *Hint: Only union numbers with shared factors ≥ k; adjust sieve/unions to check for large enough factors only.*

### Summary
This is a **DSU/Union-Find + sieve of Eratosthenes with factorization** problem, common where “connected by shared property” is key.  
The pattern can be applied to connectivity queries, grouping by shared prime factors (like in number-theoretic graphs or factor-based grouping, Minimum Spanning Tree variants, etc).  
Efficient prime factorization plus DSU is a powerful way to group "swappable" elements under GCD-based constraints.


### Flashcard
Use union-find to group numbers by shared prime factors; check if each sorted position can be reached within its GCD-connected component.

### Tags
Array(#array), Math(#math), Union Find(#union-find), Sorting(#sorting), Number Theory(#number-theory)

### Similar Problems
- Rank Transform of a Matrix(rank-transform-of-a-matrix) (Hard)