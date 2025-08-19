### Leetcode 3051 (Easy): Find Candidates for Data Scientist Position [Practice](https://leetcode.com/problems/find-candidates-for-data-scientist-position)

### Description  
You are given a table `Candidates` that contains information about job candidates and their skills.
Your task is to **find the IDs of all candidates who have all three required skills** for a data scientist position: **'Python', 'Tableau', and 'PostgreSQL'**.

Return the list of candidate IDs (as integers) where each candidate has at least these three skills. The final answer should be sorted in increasing order.

### Examples  

**Example 1:**  
Input:  
Candidates table:

| candidate_id | skill        |
|--------------|-------------|
| 1            | Python      |
| 1            | Tableau     |
| 1            | PostgreSQL  |
| 2            | Tableau     |
| 2            | Python      |
| 3            | Python      |
| 3            | PostgreSQL  |
| 3            | Tableau     |

Output: `[1, 3]`  
Explanation:  
Candidates 1 and 3 both have all three required skills. Candidate 2 has only Python and Tableau.

**Example 2:**  
Input:  
Candidates table:

| candidate_id | skill        |
|--------------|-------------|
| 5            | Tableau     |
| 6            | Python      |
| 7            | PostgreSQL  |

Output: `[]`  
Explanation:  
No candidate has all three required skills.

**Example 3:**  
Input:  
Candidates table:

| candidate_id | skill     |
|--------------|-----------|
| 8            | Python    |
| 8            | Tableau   |
| 8            | Tableau   |
| 8            | PostgreSQL|
| 9            | Python    |
| 9            | Tableau   |
| 9            | Tableau   |

Output: ``  
Explanation:  
Candidate 8 has Python, Tableau, and PostgreSQL (with duplicate entries, but that's okay—we only care about presence). Candidate 9 is missing PostgreSQL.

### Thought Process (as if you’re the interviewee)  
- Start by fetching all candidates who have the relevant skills.
- For each candidate, keep track of what skills they have.
- The brute-force approach is to, for every candidate, check whether they have each of the three required skills.
- To optimize, we can use a dictionary to map candidate_id to a set of skills; then filter those whose set contains all three.
- This approach is efficient because we only need to process each row of the input a single time and aggregate results.

### Corner cases to consider  
- No candidates have any required skill.
- Candidates have repeated skills (duplicates).
- More candidates than required skills.
- Candidates have extra skills; only at least three specified skills are required.
- The table is empty.
- Only one candidate, with or without the required skills.

### Solution

```python
def find_candidates(candidates):
    # candidate_id -> set of relevant skills
    required_skills = {"Python", "Tableau", "PostgreSQL"}
    skill_map = dict()
    
    # Record each skill per candidate
    for candidate_id, skill in candidates:
        if skill in required_skills:
            if candidate_id not in skill_map:
                skill_map[candidate_id] = set()
            skill_map[candidate_id].add(skill)
    
    # Filter those with all three required skills
    result = []
    for candidate_id, skills in skill_map.items():
        if len(skills) == 3:
            result.append(candidate_id)
    
    result.sort()
    return result

# Example usage:
# candidates = [
#     (1, "Python"),
#     (1, "Tableau"),
#     (1, "PostgreSQL"),
#     (2, "Tableau"),
#     (2, "Python"),
#     (3, "Python"),
#     (3, "PostgreSQL"),
#     (3, "Tableau"),
# ]
# print(find_candidates(candidates))  # Output: [1, 3]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the candidates list. Each row is processed once to build the mapping, and then each candidate is checked once for the required skills.
- **Space Complexity:** O(k), where k is the number of distinct candidate IDs, since we store a set of skills per candidate.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the skill requirements change frequently?
  *Hint: Can you generalize your solution to work for a dynamic or arbitrary set of required skills?*

- What if candidates can have the same skill listed multiple times?
  *Hint: Do duplicate skills affect your logic or result?*

- How would you return not just the IDs, but also *which* skill(s) (if any) each candidate is missing?
  *Hint: Consider returning a mapping of candidate_id to their missing skills.*

### Summary
This problem demonstrates the **grouping and filtering** pattern, often used for data aggregation. The solution leverages a hash map to track skills for each candidate and efficiently filter the ones that satisfy all criteria. This pattern appears in other set membership or "must-have N properties" SQL/group-by/data prep problems. It’s also a classic for interview SQL or dict+set problems.

### Tags
Database(#database)

### Similar Problems
