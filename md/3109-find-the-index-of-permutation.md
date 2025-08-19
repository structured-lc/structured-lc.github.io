### Leetcode 3109 (Medium): Find the Index of Permutation [Practice](https://leetcode.com/problems/find-the-index-of-permutation)

### Description  
Given a permutation of numbers from 1 to n (an array containing each number in [1, 2, ..., n] exactly once), return the index of this permutation when all permutations are listed in lexicographical (dictionary) order (indexed from 0). The result can be very large, so return it modulo 10⁹ + 7.

You need to determine how many permutations are lexicographically less than the given one.

### Examples  

**Example 1:**  
Input: `perm = [1,2,3]`  
Output: `0`  
*Explanation: [1,2,3] is the first permutation in lex order, so index is 0.*

**Example 2:**  
Input: `perm = [2,1,3]`  
Output: `2`  
*Explanation:  
- Permutations before [2,1,3]:  
  1. [1,2,3]  
  2. [1,3,2]  
- [2,1,3] is the third (index 2).*

**Example 3:**  
Input: `perm = [3,1,2]`  
Output: `4`  
*Explanation:  
- Permutations before [3,1,2]:  
  1. [1,2,3]  
  2. [1,3,2]  
  3. [2,1,3]  
  4. [2,3,1]  
- [3,1,2] is the fifth (index 4).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  List all n! permutations, sort lexicographically, and find the position of perm. This is **O(n! × n)** time—unfeasible for n ≥ 8.

- **Optimized (Factorial Number System):**  
  For each position i in perm (0-based):  
    - Count how many numbers among the remaining (unpicked) ones are smaller than perm[i].  
    - Each such number, if picked at i, would start a block of (n−i−1)! permutations that are lexicographically earlier.  
    - Add this count × (n−i−1)! (modulo 10⁹+7) to the answer.
  - To efficiently count "numbers smaller than the current and not yet picked", use a Fenwick Tree / BIT (**O(n log n)** approach), or keep a sorted list and use bisect (for small n).

- **Tradeoffs:**  
  The optimized combinatorial approach is efficient and avoids brute-force explosion.  
  Coding a Fenwick Tree or using a decreasing-size list for smaller problems is standard and practical.

### Corner cases to consider  
- n = 1 (permutation of length 1)
- perm is the smallest (sorted) permutation ([1,2,3,...,n])
- perm is the largest (reverse sorted)
- Empty list (not valid by premise, but good to validate in code)
- Large n (check for integer overflows, use modulo as required)
- perm contains all unique elements from 1 to n (guaranteed by problem)

### Solution

```python
MOD = 10**9 + 7

def findIndexOfPermutation(perm):
    n = len(perm)
    # Precompute factorials up to n
    factorial = [1] * (n+1)
    for i in range(1, n+1):
        factorial[i] = factorial[i-1] * i % MOD

    # Fenwick Tree (1-indexed)
    class Fenwick:
        def __init__(self, size):
            self.tree = [0]*(size+2)  # accommodating values up to n
        def update(self, i, delta):
            while i < len(self.tree):
                self.tree[i] += delta
                i += (i & -i)
        def query(self, i):
            res = 0
            while i > 0:
                res += self.tree[i]
                i -= (i & -i)
            return res

    # Initialize BIT: Every number from 1 to n appears once
    bit = Fenwick(n)
    for i in range(1, n+1):
        bit.update(i, 1)

    index = 0
    for i in range(n):
        curr = perm[i]
        smaller_unused = bit.query(curr-1)
        index = (index + smaller_unused * factorial[n-1-i]) % MOD
        bit.update(curr, -1)  # Mark as used

    return index
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n)  
  Each of the n steps, we query and update the BIT, both O(log n). Factorial precomputation is O(n).

- **Space Complexity:**  
  O(n)  
  For factorials and Fenwick Tree arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input permutation may contain duplicates?  
  *Hint: You’d need to handle repeated elements, possibly using multinomial coefficients.*

- How would you solve this if you were given a list of many permutations and need to compute their indices together?  
  *Hint: Can you reuse precomputation or data structures efficiently across queries?*

- Can you generate the kᵗʰ (zero-based) permutation directly without enumerating all permutations?  
  *Hint: Use factorial numbering to unwind the index back to a permutation.*

### Summary
This problem is a classic application of the **Factorial Number System** or combinatorial ranking of permutations. Efficient calculation uses a Fenwick Tree for fast prefix counts and factorials for block sizes. This coding pattern appears in permutation ranking/unranking problems in combinatorics, and can be applied to generate or locate the kᵗʰ permutation, count lexicographic orders, or handle ranking in problems with ordering constraints.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
