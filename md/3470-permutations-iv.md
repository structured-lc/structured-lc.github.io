### Leetcode 3470 (Hard): Permutations IV [Practice](https://leetcode.com/problems/permutations-iv)

### Description  
Given a list of `n` integers from 1 to `n`, return all **alternating permutations** of the list in lexicographic order. An alternating permutation is a permutation `perm` where for every 0 ≤ i < n-1, either:
- perm[i] < perm[i+1] when i is even,  
- or perm[i] > perm[i+1] when i is odd.

That is, the permutation alternates between increasing and decreasing at each index. For example, with n = 4, an alternating permutation could be [1, 4, 3, 2], since 1 < 4 > 3 < 2.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `[[1,2,3,4],[1,4,3,2]]`  
*Explanation: Both permutations [1,2,3,4] and [1,4,3,2] alternate directions as required.*

**Example 2:**  
Input: `n = 3`  
Output: `[[1,3,2],[2,3,1]]`  
*Explanation: Only these permutations for n=3 satisfy the alternation pattern. [1,3,2]: 1<3>2, [2,3,1]: 2<3>1.*

**Example 3:**  
Input: `n = 2`  
Output: `[[1,2]]`  
*Explanation: For n=2, the only possible alternating permutation is [1,2] (since 1<2 at index 0, and there's no index 1 to check).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Generate all n! permutations of [1, 2, ..., n], then check for each which ones are alternating. This gives correct results, but is extremely slow and infeasible as n increases.

- **Optimization:** Since at every step the alternation is fixed (either < or >), we can use backtracking to build the permutation step by step:
  - At each index, decide whether we need the next number to be greater or smaller than the previous one based on the parity (even or odd index).
  - Use a visited array to avoid duplicates and ensure all numbers are used exactly once.
  - Only proceed to add a number that satisfies the alternation at each step.

- **Tradeoffs:**  
  - Backtracking limits exploration to only valid candidates, avoiding checking most invalid permutations.
  - Complexity remains exponential, but much less than n! due to early pruning.

- **Why this approach?**  
  - It leverages the structure of the problem (alternating constraints) for aggressive pruning, making it practical for moderate n.


### Corner cases to consider  
- n = 1. Single element, only [1] is alternating by default.
- n = 2. Only one or two permutations, trivial alternation.
- All permutations are strictly increasing or decreasing (for small n).
- For odd vs even n, there might be different numbers of valid permutations.

### Solution

```python
def alternating_permutations(n):
    results = []
    path = []
    used = [False] * (n+1)  # 1-based

    def backtrack(pos):
        if pos == n:
            results.append(list(path))
            return
        for num in range(1, n+1):
            if not used[num]:
                if pos == 0:
                    # First position, always allowed
                    path.append(num)
                    used[num] = True
                    backtrack(pos+1)
                    used[num] = False
                    path.pop()
                else:
                    prev = path[-1]
                    # Determine required relation (< or >) based on parity
                    if pos % 2 == 1 and num > prev:
                        path.append(num)
                        used[num] = True
                        backtrack(pos+1)
                        used[num] = False
                        path.pop()
                    elif pos % 2 == 0 and num < prev:
                        path.append(num)
                        used[num] = True
                        backtrack(pos+1)
                        used[num] = False
                        path.pop()
    backtrack(0)
    return results

# Example usage:
# print(alternating_permutations(4))  # [[1,2,3,4],[1,4,3,2],...]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - In the worst case, up to O(n!) since permutations are being generated, but the actual number is much less due to pruning. Backtracking only explores valid partial permutations.
- **Space Complexity:**  
  - O(n! × n) for storing all possible results, each of length n.
  - O(n) auxiliary space for the path and used arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count the number of such alternating permutations without generating them?
  *Hint: There is a connection to the Euler zigzag numbers (up/down permutations in combinatorics).*

- If you needed only the kᵗʰ smallest alternating permutation in lex order, how would you find it efficiently?
  *Hint: Can you rank or unrank directly in alternating permutation order?*

- Can you generalize the approach to lists with duplicates or arbitrary elements—not just 1 to n?
  *Hint: Think about how alternating relation and lex order interact when elements repeat or aren't sorted.*

### Summary
This problem leverages the **backtracking** pattern, using aggressive pruning: only valid candidates are considered at every decision point based on the alternation rule. It's a classic example of pruning the search space with problem constraints. The technique is widely applicable to permutation generation with sequence constraints, e.g., for pattern-restricted, monotonic, or monotone-alternating sequences. This is similar to problems on generating valid parentheses, next/previous permutation, or count/construct up/down sequences in combinatorics.


### Flashcard
Backtracking with alternation constraint: build permutation step-by-step, ensuring each new element is greater or smaller than the previous based on parity.

### Tags
Array(#array), Math(#math), Combinatorics(#combinatorics), Enumeration(#enumeration)

### Similar Problems
- Permutations III(permutations-iii) (Medium)