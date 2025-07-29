### Leetcode 3437 (Medium): Permutations III [Practice](https://leetcode.com/problems/permutations-iii)

### Description  
Given an integer **n**, return all **alternating permutations** of the first n positive integers, sorted in lexicographical order.  
An alternating permutation is a permutation such that no two adjacent elements are **both odd** or **both even**.  
For example, in each permutation, the parity (odd/even) of adjacent numbers must alternate.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `[[1,2,3,4],[1,4,3,2],[2,1,4,3],[2,3,4,1],[3,2,1,4],[3,4,1,2],[4,1,2,3],[4,3,2,1]]`  
*Explanation: All permutations of [1,2,3,4] where no two adjacent numbers are both odd or both even are listed.*

**Example 2:**  
Input: `n = 2`  
Output: `[[1,2],[2,1]]`  
*Explanation: Both permutations [1,2] and [2,1] alternate in parity.*

**Example 3:**  
Input: `n = 3`  
Output: `[[1,2,3],[3,2,1]]`  
*Explanation: Only [1,2,3] and [3,2,1] have alternating parity for all adjacent positions.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea is to generate all possible permutations of [1, 2, ..., n]. For each permutation, check if all adjacent elements alternate in their parity (one odd, next even, and so on). However, generating all n! permutations and filtering them costs O(n! \* n), which is too slow for larger n.

We can optimize by only constructing alternating permutations using **backtracking**. For each new integer we add to the current sequence, only consider unused numbers whose parity is different from the last number added. This pruning avoids generating invalid permutations and wastes less time.

So, we use a recursive DFS/backtracking approach with:
- A list to track used numbers
- For every new position, loop through all unused numbers, and only pick those that alternate in parity from the previous number.

This ensures that the intermediate states are always partially valid, making the search efficient. After filling all positions, save the permutation.

We backtrack after each recursive call to explore other possibilities.

### Corner cases to consider  
- n = 1 (single element, only one permutation)
- n = 2 (must allow both [1,2] and [2,1])
- Large n (up to 10), ensure efficiency
- All numbers odd (not possible for n > 1)
- All numbers even (not possible for n > 1)

### Solution

```python
def permuteIII(n):
    def backtrack(path, used):
        if len(path) == n:
            result.append(path[:])
            return
        for num in range(1, n+1):
            # Only use if not already used
            if not used[num]:
                # The first number can be any number
                if not path or (path[-1] % 2 != num % 2):
                    used[num] = True
                    path.append(num)
                    backtrack(path, used)
                    path.pop()
                    used[num] = False

    result = []
    # used[i] indicates if i has been used, 1-based index
    used = [False] * (n + 1)
    backtrack([], used)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k is the number of valid alternating permutations (always ≤ n!). Each valid permutation is constructed once, and pruning stops many bad branches early.
- **Space Complexity:** O(n) for recursion stack and path per permutation, plus O(k × n) total space to store the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of parity, we want to alternate among three properties (e.g. mod 3 class)?
  *Hint: Generalize the adjacency check to arbitrary predicates.*

- How do you efficiently count (but not generate) the number of such alternating permutations for large n?
  *Hint: Try dynamic programming or memoization.*

- How would you generate just one random alternating permutation uniformly at random?
  *Hint: Think about iterative construction and probability of valid choices at each step.*

### Summary
This problem uses a classic **backtracking/DFS pattern** with state pruning for permutations under custom adjacency constraints.  
It's an example of permutations with custom validation, and the same pattern can apply to problems like "robot movement with forbidden steps," "word ladders with adjacency rules," and ordering elements under relation-based restrictions.  
It's essential to prune the search space to avoid exponential blowup when constraints can be checked incrementally.