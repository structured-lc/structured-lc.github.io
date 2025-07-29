### Leetcode 1125 (Hard): Smallest Sufficient Team [Practice](https://leetcode.com/problems/smallest-sufficient-team)

### Description  
Suppose you are a project manager given a list of **required skills** (`req_skills`) and a list of **people**, where each person is described by the skills they possess. Your task is to select the **smallest possible team** (subset of people, represented by their indices) such that, collectively, they possess all the required skills. The answer can be any valid solution if there is more than one.

### Examples  

**Example 1:**  
Input:  
`req_skills = ["java", "nodejs", "react"]`  
`people = [["java"], ["nodejs"], ["nodejs", "react"]]`  
Output:  
`[0, 2]`  
*Explanation: Person 0 has "java". Person 2 has "nodejs" and "react". Together, they cover all 3 skills. Plenty of answers are possible in some cases, but any answer of minimal size is accepted.*

**Example 2:**  
Input:  
`req_skills = ["algorithms", "math", "java", "reactjs"]`  
`people = [["algorithms", "math", "java"], ["algorithms", "math", "reactjs"], ["java", "reactjs"], ["math"], ["algorithms"], ["reactjs"]]`  
Output:  
`[0, 2]`  
*Explanation: Person 0 covers "algorithms", "math", "java"; Person 2 covers "java", "reactjs". Together, every required skill is covered. Answer size is minimal.*

**Example 3:**  
Input:  
`req_skills = ["a", "b", "c", "d", "e", "f"]`  
`people = [["a","b","c"], ["d"], ["e"], ["f"], ["b","f"], ["c","e"], ["a","d"], ["b","c","e","f"], ["d","e","f"]]`  
Output:  
`[0, 1, 2, 3]`  
*Explanation: Persons 0, 1, 2, 3 together can cover every skill. Answer is the smallest possible team.*

### Thought Process (as if you’re the interviewee)  

First, let's clarify what “covering all required skills” means: I have to pick a subset of people such that the union of their individual skill sets equals the set of all required skills.

#### Brute-force Approach:
- Try all subsets of people, check if their collective skills cover all required skills.
- For each subset, check if they cover `req_skills`.
- Time complexity is O(2ⁿ × m), where n = number of people and m = required skills. This is not feasible for n ≥ 20.

#### Optimized Approach (Bitmask DP):
- Map each skill to an index: `{skill: idx}`.
- Represent a combination of skills as an integer (bitmask), where each bit represents a skill.
- Similarly, for each person, build their skills as a bitmask integer.
- The goal: find the smallest set of indices such that their union of bitmasks covers all bits/sklls.

Let’s use **Dynamic Programming**:
- `dp[mask]` will hold the minimal list of people indices to cover the skills represented by `mask`.
- Initialize: `dp = []` (no skill needed—empty team).
- For each person, for each state in dp, try to add the person:
    - If adding the person's skills improves the coverage, and the resulting team size is smaller, update dp.
- After processing all people, `dp[(1<<num_skills)-1]` holds the smallest team for full coverage.

#### Why this works:
- By storing the smallest team for each bitmask of covered skills, we avoid recomputing for the same coverage.
- Space and time are exponential in the number of required skills (not people), so this works if the skills count is reasonable (\(\leq\)16–20).

### Corner cases to consider  
- All required skills can be covered by a single person (return them).
- People with no overlap with required skills (ignore such people).
- Duplicate people with the same skill set.
- Some skills not covered by any person (no solution, but constraints assure solution).
- Only one skill required.
- People list is empty.
- `req_skills` empty (should return []).
- No duplicate skills within `req_skills` (guaranteed).

### Solution

```python
def smallestSufficientTeam(req_skills, people):
    # Map each skill to a unique bit
    skill_to_idx = {skill: idx for idx, skill in enumerate(req_skills)}
    n_skills = len(req_skills)
    n_people = len(people)
    
    # Generate bitmask for each person: which skills they have
    person_masks = []
    for skillset in people:
        mask = 0
        for skill in skillset:
            if skill in skill_to_idx:  # Ignore skills not required
                mask |= (1 << skill_to_idx[skill])
        person_masks.append(mask)
    
    # dp[state] = team indices covering skills in state; state is skills bitmask
    from collections import defaultdict
    dp = {0: []}
    
    for i, p_mask in enumerate(person_masks):
        if p_mask == 0:
            continue  # Person offers nothing useful
        next_dp = dp.copy()
        for state, team in dp.items():
            new_state = state | p_mask
            if new_state not in next_dp or len(next_dp[new_state]) > len(team) + 1:
                next_dp[new_state] = team + [i]
        dp = next_dp
    
    all_skills_mask = (1 << n_skills) - 1
    return dp[all_skills_mask]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n_people × 2ⁿ_skills): For each person, we can update up to 2ⁿ_skills dp states.
- **Space Complexity:**  
  O(2ⁿ_skills): Stores at most one team per possible skill combination.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return one actual team, or enumerate all smallest teams?  
  *Hint: Track more information in DP or reconstruct all by tracing back possible transitions.*

- What if some people are much more costly to hire than others?  
  *Hint: Instead of team size, minimize total cost in DP step.*

- If the number of required skills is very high, can you do better?  
  *Hint: Explore heuristics or approximation (greedy), but exact DP becomes infeasible for large skills.*

### Summary
The problem is a variant of "set cover," solved here with bitmasking and dynamic programming. Each possible skill combination is represented as a bitmask, and transitions are made by adding people one by one, only if they help to minimize team size. This is a classic application of bitmask DP for subset problems, and is a common pattern for optimization where state space is exponential in one dimension (like number of skills). This approach is applicable to many "minimum subset to cover/unify all features" problems.