### Leetcode 1947 (Medium): Maximum Compatibility Score Sum [Practice](https://leetcode.com/problems/maximum-compatibility-score-sum)

### Description  
Given two groups of size m, `students` and `mentors`, each have answered n binary (0/1) survey questions, where `students[i][k]` is the iᵗʰ student's kᵗʰ answer, and `mentors[j][k]` is the jᵗʰ mentor's kᵗʰ answer. You must assign each student to exactly one mentor (and vice versa) so that the sum of all compatibility scores (number of matching answers between each pair) is maximized. Return that maximum sum.

### Examples  

**Example 1:**  
Input:  
`students = [[1,1,0],[1,0,1],[0,0,1]]`,  
`mentors = [[1,0,0],[0,0,1],[1,1,0]]`  
Output: `8`  
*Explanation:  
Pair student₀↔mentor₂ (2 matches), student₁↔mentor₀ (1 match), student₂↔mentor₁ (2 matches), so max total = 2 + 1 + 2 = 5.  
The best assignment is: student₀↔mentor₂ (2), student₁↔mentor₀ (2), student₂↔mentor₁ (2), for total = 2 + 2 + 2 = 6.*  

**Example 2:**  
Input:  
`students = [[0,0],[0,0]]`,  
`mentors = [[1,1],[1,1]]`  
Output: `0`  
*Explanation:  
All answers differ, so no matches; total score = 0.*

**Example 3:**  
Input:  
`students = [[1,0],[1,1]]`,  
`mentors = [[0,0],[1,1]]`  
Output: `3`  
*Explanation:  
Best is to pair student₀↔mentor₀ (1 match), student₁↔mentor₁ (2 matches), total = 1+2 = 3.*

### Thought Process (as if you’re the interviewee)  
First, brute force:  
- Try every permutation of mentors to students (m! possibilities), for each, sum compatibility scores for all pairs and track the max.
- Feasible because m ≤ 8, so max 40320 assignments.

Better:  
- Precompute compatibility scores for every (student, mentor) pair (O(m² × n)), then use backtracking/DFS with memoization.
- At each step, pick a mentor not used yet, accumulate the score, and backtrack.

Why this approach:  
Assignment problem optimization for small datasets typically uses backtracking or permutation-based DFS. Since \(m\) is small, this is tractable.

### Corner cases to consider  
- Zero or one student/mentor (edge cases due to constraints).
- All answers the same (every match).
- No answers match at all.
- Minimum input sizes (m=1, n=1).
- Students/mentors with duplicate answer rows.

### Solution

```python
def maxCompatibilitySum(students, mentors):
    # Precompute scores for all student-mentor pairs
    m, n = len(students), len(students[0])
    scores = [[0]*m for _ in range(m)]
    for i in range(m):
        for j in range(m):
            match = 0
            for q in range(n):
                if students[i][q] == mentors[j][q]:
                    match += 1
            scores[i][j] = match

    # DFS: Try to assign each student to a unique mentor, maximizing sum
    def dfs(i, used_mask):
        if i == m:
            return 0
        max_score = 0
        for j in range(m):
            if not (used_mask & (1 << j)):
                max_score = max(max_score, scores[i][j] + dfs(i+1, used_mask | (1 << j)))
        return max_score

    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × m × n + m!)  
  - Scores precomputing: m² × n  
  - Permutations tried: m!  
  - Each recursive call: O(1) (just chooses next mentor/student)
- **Space Complexity:**  
  O(m² + m)  
  - O(m²) for scores table  
  - O(m) recursion stack depth

### Potential follow-up questions (as if you’re the interviewer)  

- What if m is much larger (e.g., 50)?  
  *Hint: Would need a DP or matching algorithm like Hungarian algorithm since brute force is infeasible.*

- Can you optimize further using memoization?  
  *Hint: Store computed results for (i, used_mask) subproblems.*

- What if compatibility scores are not just match-count, but more complex (weighted)?  
  *Hint: The assignment logic stays the same, just compute the score differently.*

### Summary
This is a classic **assignment problem** (maximum bipartite matching with cost), solved here using backtracking/DFS due to small size. The same pattern applies to scheduling, pairing, or other matching/max-sum problems with constraints (e.g., tasks to workers, jobs to machines). For larger input, you would use DP + bitmask or the Hungarian algorithm for efficiency.