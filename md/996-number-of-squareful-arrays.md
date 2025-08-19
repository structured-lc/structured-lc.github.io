### Leetcode 996 (Hard): Number of Squareful Arrays [Practice](https://leetcode.com/problems/number-of-squareful-arrays)

### Description  
Given an integer array, count the number of *unique permutations* such that for every pair of adjacent elements in the permutation, their sum is a *perfect square*.  
A permutation is only different from another if there is at least one index where their values differ (not just a reordering of identical values). For example, [1, 8, 17] and [1, 17, 8] are different, but [2, 2, 2] counted only once.

### Examples  

**Example 1:**  
Input: `nums = [1,17,8]`  
Output: `2`  
Explanation: [1,8,17] and [17,8,1] are valid as 1+8=9, 8+17=25, 17+8=25, 8+1=9 (perfect squares).

**Example 2:**  
Input: `nums = [2,2,2]`  
Output: `1`  
Explanation: All elements are the same, so only one unique permutation exists.

**Example 3:**  
Input: `nums = [2, 2, 3]`  
Output: `0`  
Explanation: No permutation has each adjacent sum as a perfect square.

### Thought Process (as if you’re the interviewee)  
To solve this, I first observe that I need to consider every possible permutation of the input array. For each permutation, I must examine all adjacent pairs and ensure their sum is a perfect square.

- **Brute-force idea:**  
  Try every permutation (n!), check pairs for perfect square property (n-1 pairs).  
  However, with duplicate numbers, naively generating all permutations will lead to over-counting.

- **Optimization:**  
  1. Precompute, for each value, all possible neighbors with which it forms a perfect square.
  2. Use backtracking with a visited array to build permutations, skipping duplicates by tracking used indices and skipping duplicate elements at the same recursion depth.
  3. Since `1 ≤ n ≤ 12`, this is feasible, but must avoid duplicate permutations.

- **Trade-off:**  
  Using a backtracking approach with sorting and duplicate-skipping like in "Permutation II" type problems makes this both correct and efficient for constraints.

### Corner cases to consider  
- All numbers same (e.g., [4,4,4])
- No valid squareful arrays (e.g., [2,3,6])
- Only two elements, sum is or isn’t a perfect square
- Large numbers (ensure integer overflow isn’t an issue)
- Zeros in the array (0+0=0, which is a perfect square, but not allowed for negative sums)
- Empty array or one element (trivially squareful if length ≤ 1)

### Solution

```python
def numSquarefulPerms(nums):
    from math import isqrt

    def is_perfect_square(x):
        s = isqrt(x)
        return s * s == x

    # Precompute neighbors: for each unique value, which other values can it pair with to make a perfect square
    from collections import Counter, defaultdict

    n = len(nums)
    count = Counter(nums)
    graph = defaultdict(list)
    nums_unique = list(count)
    for x in nums_unique:
        for y in nums_unique:
            if is_perfect_square(x + y):
                graph[x].append(y)

    # Backtracking: try to use all numbers, don't use one more than its frequency in input
    ans = 0

    def dfs(x, path_len):
        nonlocal ans
        count[x] -= 1
        if path_len == n:
            ans += 1
        else:
            for y in graph[x]:
                if count[y]:
                    dfs(y, path_len + 1)
        count[x] += 1 # backtrack

    for x in nums_unique:
        dfs(x, 1)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × n!), where n is the length of nums.  
  The n! arises from permutations, but pruning (with graph and count) reduces practical runs. Building the graph takes O(n²).
- **Space Complexity:** O(n).  
  Mainly from recursion stack (depth ≤ n), plus the count and adjacency graph.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n could be up to 100, or nums had only small numbers?  
  *Hint: Try DP+bitmask or memoization to exploit subproblem overlap.*

- Can you return all unique *permutations* themselves, not just count?  
  *Hint: Return built-up paths in the recursion.*

- How would you modify the solution if the perfect square pair requirement is relaxed, e.g., sum is a cube?  
  *Hint: Generalize neighbor-finding logic.*

### Summary
This problem is a classic case of backtracking/permutations with constraints and duplicate handling—similar to "Permutations II" but with custom adjacency rules. The core is graph-building for "valid neighbor" relations, and recursive permutation construction. This pattern is useful for constraint-driven arrangements and can apply anywhere arrangement/permutation rules depend on dynamic pairwise relationships.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Permutations II(permutations-ii) (Medium)