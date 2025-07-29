### Leetcode 40 (Medium): Combination Sum II [Practice](https://leetcode.com/problems/combination-sum-ii)

### Description  
Given an array of integers called **candidates** (which may include duplicates) and an integer **target**, find all *unique* combinations of candidates where the numbers sum up to target. Each number from candidates may be used **at most once** per combination. Two combinations are unique if the combination (not the order) of chosen numbers differs from any others. The solution set must **not contain duplicate combinations**.

### Examples  

**Example 1:**  
Input: `candidates = [10,1,2,7,6,1,5]`, `target = 8`  
Output: `[[1,1,6],[1,2,5],[1,7],[2,6]]`  
Explanation:  
Possible combinations are:
- 1 + 1 + 6 = 8
- 1 + 2 + 5 = 8
- 1 + 7 = 8
- 2 + 6 = 8  
Combinations are listed as unique sets (order within combinations doesn't matter).

**Example 2:**  
Input: `candidates = [2,5,2,1,2]`, `target = 5`  
Output: `[[1,2,2],[5]]`  
Explanation:  
Possible combinations are:
- 1 + 2 + 2 = 5
- 5 = 5  
Notice `[2,2,1]` is **not** a different combination from `[1,2,2]` (order doesn't matter).

**Example 3:**  
Input: `candidates = [1,1,1,1,1]`, `target = 2`  
Output: `[[1,1]]`  
Explanation:  
Only unique combination is picking any two 1's.

### Thought Process (as if you’re the interviewee)  

- First, this problem is about **finding all subsets whose sum is target**, but there's an important requirement: each candidate can only be chosen **once** per combination, and **duplicate combinations are not allowed**, even if the same value appears more than once in candidates.  
- The brute-force approach: Generate **all subsets**, sum them, and collect those that sum to target. However, this is exponential (2ⁿ).
- To avoid duplicate combinations (since the candidates can have duplicate values), **sort** the array up front.  
- Use **backtracking**:
  - At each level, consider picking the iᵗʰ element or skipping it.
  - If skipping, move to next; if picking, move forward to i+1 so that each element is used at most once.
  - To skip duplicates: when not picking an element, skip all consecutive duplicates.
  - **Base Cases:** If current sum equals target, add path to result; if > target, prune path.  
- This approach ensures all unique combinations are found, and duplicate combinations caused by the same values at different positions are eliminated.

### Corner cases to consider  
- Empty candidates: Input = `[]`, target = 3 → Output = `[]`
- target = 0: Output should be `[[]]` (empty combination sums to zero)
- All elements are the same
- candidates have numbers greater or less than target
- Combinations formed by picking different indices for identical values (avoid duplicates)
- Only one candidate, possibly repeated  
- Negative numbers (though per problem, usually candidates are positive)

### Solution

```python
def combinationSum2(candidates, target):
    # Sort candidates to facilitate deduplication (skip duplicates ahead)
    candidates.sort()
    res = []
    
    def backtrack(start, path, total):
        # Base case: constructed sum matches target
        if total == target:
            res.append(path[:])
            return
        # Prune if sum exceeds target
        if total > target:
            return
        prev = None
        # Explore each candidate starting from current index
        for i in range(start, len(candidates)):
            # Skip duplicates: only consider first element in duplicate run at each level
            if prev == candidates[i]:
                continue
            path.append(candidates[i])
            backtrack(i+1, path, total + candidates[i])
            path.pop()
            prev = candidates[i]
    
    backtrack(0, [], 0)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Potentially O(2ⁿ), since each element can either be included or not (all subsets), though in practice, sorting and duplicate skipping reduces the set of branches significantly.
  - For each subset, constructing a new list may take O(k), where k is the average length of combinations.

- **Space Complexity:**  
  - O(n) recursion stack for backtracking (maximum depth is n)
  - O(number of valid combinations × k) for storing the result

### Potential follow-up questions (as if you’re the interviewer)  

- What if candidates could include negative numbers?  
  *Hint: Would pruning (stopping early) when sum > target still be safe?*

- Could this problem be solved without recursion, using an iterative or BFS approach?  
  *Hint: Consider using a queue, but deduplication logic can get tricky.*

- What if instead, you are allowed to use each candidate any number of times (unlimited supply)?  
  *Hint: Now you can repeat, but must be careful to not reuse sets in different orders.*

### Summary
This problem is a classic example of **backtracking with deduplication**, a recurring pattern in subset and combination search problems. The critical insight is to sort the candidates for easy duplicate handling and prune the search tree as soon as the current sum is greater than target. The deduplication strategy used here is applicable in other problems where input values can repeat, but each must be used no more than its available count—examples include "Subsets II", "Permutation II", and some coin-change problems.