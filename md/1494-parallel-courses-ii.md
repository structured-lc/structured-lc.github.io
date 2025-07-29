### Leetcode 1494 (Hard): Parallel Courses II [Practice](https://leetcode.com/problems/parallel-courses-ii)

### Description  
Given **n** courses labeled from 1 to n, a list of prerequisite relations between courses, and an integer **k** (max courses per semester), determine the minimum number of semesters needed to finish all courses.  
- You can only take a course in a semester if all its prerequisites are completed.  
- In each semester, you can take up to **k** available courses.  

This is a combinatorial scheduling problem with dependencies.

### Examples  

**Example 1:**  
Input: `n=4`, `dependencies=[[2,1],[3,1],[1,4]]`, `k=2`  
Output: `3`  
Explanation:  
Semester 1: Take courses 2 and 3.  
Semester 2: Course 1 is now unlocked; take course 1.  
Semester 3: Take course 4.  
So, minimum 3 semesters needed.

**Example 2:**  
Input: `n=5`, `dependencies=[[2,1],[3,1],[4,1],[1,5]]`, `k=2`  
Output: `4`  
Explanation:  
Semester 1: Take courses 2 and 3.  
Semester 2: Take course 4.  
Semester 3: Take course 1 (its prerequisites are done).  
Semester 4: Take course 5 (its prerequisite is done).  
So, 4 semesters.

**Example 3:**  
Input: `n=4`, `dependencies=[[2,1],[3,1],[1,4]]`, `k=3`  
Output: `2`  
Explanation:  
Semester 1: Take courses 2, 3, and 1 (since after taking 2 and 3, 1's prerequisites are satisfied and you can take it the same semester).  
Semester 2: Take course 4.  
So, minimum 2 semesters.

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  Try all possible orders of taking courses, checking prerequisites, and groupings up to k courses per semester.  
  Clearly infeasible, as the number of combinations is exponential due to dependency order and semester groupings.
- Better idea:  
  Use **bitmask DP** to represent the set of taken courses. Each state is a bitmask of courses taken, and we progress to new states by picking 1 to k available courses (whose prerequisites are satisfied).  
  We need to find the minimum semesters to reach the "all-taken" state (all bits set).
- For each state, we:
  - Find all courses whose prerequisites are satisfied and not taken yet.
  - Try all subsets of size ≤ k from these as possible courses to take this semester.
  - Move to the new state and update the DP table.
- Implementation optimizations:  
  - Only proceed with subset picks, not permutations.  
  - Prune states by DP memoization.

Bitmask DP is chosen as n is at most 15, making 2ⁿ manageable.

### Corner cases to consider  
- No dependencies: can take up to k courses every semester, so ⌈n/k⌉ semesters needed.
- k ≥ n: can take all courses in first semester if no dependencies.
- Circular dependencies: problem guarantees it's possible, so no need to check for cycle.
- Linear chain: e.g., 1→2→3→4, forces minimum n semesters.
- Single course (n=1): 1 semester.
- Dependencies where some courses never have in-degree 0 (shouldn't happen as per constraints).

### Solution

```python
def minNumberOfSemesters(n, relations, k):
    # dp[state]: min semesters needed to finish courses in "state" (bitmask)
    size = 1 << n
    dp = [n] * size
    dp[0] = 0

    # prereq[i]: bitmask of prerequisites for course i
    prereq = [0] * n
    for prev, nxt in relations:
        prereq[nxt - 1] |= 1 << (prev - 1)

    for state in range(size):
        # Find which courses are unlocked (not yet taken, prereqs met)
        can_take = []
        for i in range(n):
            if not (state & (1 << i)) and (state & prereq[i]) == prereq[i]:
                can_take.append(i)

        # Pick all subsets of can_take with size up to k
        m = len(can_take)
        # Bitmask representation of all selectable courses
        def gen_subsets(mask, start, count, subset):
            if count == k or start == m:
                if subset:
                    yield subset
                return
            # include can_take[start]
            yield from gen_subsets(mask, start+1, count+1, subset | (1 << can_take[start]))
            # don't include
            yield from gen_subsets(mask, start+1, count, subset)

        # All subsets (non-empty, up to k) of can_take as bitmasks
        masks = []
        def get_subs(pos, chosen, bits):
            if len(chosen) == k or pos == m:
                if chosen:
                    bm = 0
                    for idx in chosen:
                        bm |= 1 << can_take[idx]
                    masks.append(bm)
                return
            get_subs(pos + 1, chosen + [pos], bits)
            get_subs(pos + 1, chosen, bits)
        get_subs(0, [], 0)

        for take_mask in masks:
            next_state = state | take_mask
            dp[next_state] = min(dp[next_state], dp[state] + 1)

    return dp[size - 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 2ⁿ × C(n,k)), but for each subset the pick is pruned as we generate only valid subsets—so total is O(n × 2ⁿ × k × 2ᵏ) in worst case (since we have at most 2ⁿ states and up to 2ᵏ subsets per pick). With n ≤ 15 and k ≤ 15, this is tractable.

- **Space Complexity:**  
  O(2ⁿ) for the DP array, plus O(n) for prerequisites and state generation.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where courses are added or removed dynamically after the program starts?  
  *Hint: Think about incremental reachability, or dynamic graph updates, and whether recomputation or reuse of prior results is possible.*

- Can this problem be solved in polynomial time if k=1?  
  *Hint: What changes when k=1? How does this map to standard dependency graph (topological sort) and longest path?*

- Could you optimize further if dependencies form a tree, DAG with low width, or have other special structure?  
  *Hint: Try bounding the required semesters by tree height or DAG levels.*

### Summary
This problem is a strong example of **bitmask dynamic programming** combined with subset enumeration.  
The pattern of doing state transitions by picking valid subsets of options, while memoizing state results (here, the set of taken courses) is common in problems with constraints on combinations/selection (domino tiling, scheduling with caps, job assignment with limits, etc).  
This approach is used any time the number of possibilities is exponential but the state can be efficiently encoded, such as TSP variants with pick caps, or minimum covering with dependencies.