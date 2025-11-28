### Leetcode 3278 (Medium): Find Candidates for Data Scientist Position II [Practice](https://leetcode.com/problems/find-candidates-for-data-scientist-position-ii)

### Description  
Given tables describing **Candidates** (candidate_id, skill, proficiency) and **Projects** (project_id, skill, importance), find **the best candidate for each project**.  
- Each project requires a set of skills, each with an importance.
- Only candidates who have **all required skills** for a project (any proficiency) are eligible.
- For each eligible candidate, calculate a **score** for that candidate and project:
  - Start from 100.
  - For each skill required:
    - Add 10 points if proficiency > importance.
    - Subtract 5 points if proficiency < importance.
    - No change if proficiency == importance.
- For each project, output the candidate with the **highest score** (break ties by smaller candidate_id).
- If no candidate qualifies for a project, that project should not appear in the result.
- Results should be ordered by project_id ascending.

### Examples  

**Example 1:**  
Input:  
Candidates=`[[101,'Python',5],[101,'Tableau',3],[101,'PostgreSQL',4],[101,'TensorFlow',2],[102,'Python',4],[102,'Tableau',5],[102,'PostgreSQL',4],[102,'R',4],[103,'Python',3],[103,'Tableau',5],[103,'PostgreSQL',5],[103,'Spark',4]]`  
Projects=`[[201,'Python',4],[201,'Tableau',3],[201,'PostgreSQL',4]]`  
Output:  
`[[201,102]]`  
Explanation:  
- Project 201 needs Python (4), Tableau (3), PostgreSQL (4).
- Candidate 101: Has all 3 skills. Scores: Python (5>4,+10), Tableau (3=3,0), PostgreSQL (4=4,0). Total = 100+10=110.
- Candidate 102: Has all 3 skills. Scores: Python (4=4,0), Tableau (5>3,+10), PostgreSQL (4=4,0). Total = 100+10=110.
- Candidate 103 does not have Tableau at required proficiency.
- Both 101 and 102 tie at 110, choose lower candidate_id = 101.
- But if 101 is missing a skill, or if there are more constraints, use the scoring and completeness checks accordingly.

**Example 2:**  
Input:  
Candidates=`[[1,'Python',5],[1,'Tableau',2],[1,'PostgreSQL',3],[2,'Python',4],[2,'Tableau',3],[2,'PostgreSQL',4],[3,'Python',3]]`  
Projects=`[[100,'Python',3],[100,'Tableau',2],[100,'PostgreSQL',3]]`  
Output:  
`[[100,2]]`  
Explanation:  
- Project 100: Needs Python (3), Tableau (2), PostgreSQL (3).
- Candidate 1: Has all required skills. Python(5>3,+10), Tableau(2=2,0), PostgreSQL(3=3,0). Total 110.
- Candidate 2: Python(4>3,+10), Tableau(3>2,+10), PostgreSQL(4>3,+10). Total 130.
- Candidate 3 is missing Tableau and PostgreSQL.
- Candidate 2 has highest score (130).

**Example 3:**  
Input:  
Candidates=`[[10,'Python',1]]`  
Projects=`[[888,'Python',2]]`  
Output:  
`[]`  
Explanation:  
- Project 888 needs Python (2).
- Candidate 10 only has Python(1<2), but still has the required skill (proficiency < importance allowed).
- Score: 100-5 = 95.
- Candidate 10 is eligible (he has all required skills) despite being under-qualified, unless requirements say otherwise.
- If project requires more skills not present in Candidates, then none should be returned.

### Thought Process (as if you’re the interviewee)  
A brute-force approach:  
- For every project, for every candidate, check if candidate has *all* required skills.  
- For every candidate-project pair where candidate is eligible, compute score as specified.  
- Select the best-scoring candidate for each project, breaking ties by lower candidate_id.  
Optimization:  
- Index candidates’ skills by candidate_id for fast lookup.
- Precompute required skills for each project.
- Only iterate candidates who have at least all required skills.
- Time/space is mainly affected by number of (candidate, project, skill) combinations, so handling efficiently is to avoid redundant matching.

### Corner cases to consider  
- Multiple candidates tie by score, require tie-breaker by candidate_id.
- Candidate has all required skills, but all are below required importance (still eligible).
- Candidate is missing at least one required skill (ineligible).
- Projects with no eligible candidate—project not included in result.
- Large numbers of candidates or overlapping skills.

### Solution

```python
def find_best_candidates(candidates, projects):
    from collections import defaultdict
    
    # Build: candidate_skills[candidate_id][skill] = proficiency
    candidate_skills = defaultdict(dict)
    for c_id, skill, prof in candidates:
        candidate_skills[c_id][skill] = prof
        
    # Build: project_requirements[project_id][skill] = importance
    project_requirements = defaultdict(dict)
    for p_id, skill, imp in projects:
        project_requirements[p_id][skill] = imp

    results = []
    for project_id, requirements in project_requirements.items():
        best_score = float('-inf')
        best_candidate = None
        for cand_id, skills in candidate_skills.items():
            # Check if candidate has all required skills
            if all(req_skill in skills for req_skill in requirements):
                score = 100
                for req_skill, importance in requirements.items():
                    prof = skills[req_skill]
                    if prof > importance:
                        score += 10
                    elif prof < importance:
                        score -= 5
                    # else: equal, no change
                # Select candidate if better score, or tie-breaker lower id
                if score > best_score or (score == best_score and cand_id < best_candidate):
                    best_score = score
                    best_candidate = cand_id
        if best_candidate is not None:
            results.append([project_id, best_candidate])
    results.sort()  # Order by project_id ascending
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(P × C × S), where P=projects, C=candidates, S=#skills per project. For each project, all candidates may be checked; for each, all required skills.
- **Space Complexity:** O(C×S + P×S), storing skills and requirements dictionaries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a project requires a skill that no candidate has?
  *Hint: How do you filter projects with zero eligible candidates?*

- How would you handle extremely large datasets efficiently?
  *Hint: Preprocessing and indexing can make lookups fast.*

- How to output all candidates (not just best) sorted by score for each project?
  *Hint: Track all eligible candidates; output sorted list per project.*

### Summary
This is a classic join-and-score problem, matching records between two collections, grouping and filtering by derived properties (having all required skills), then ranking ("windowing") by the computed scores per group. This pattern often appears in recommendation engines, job matching, and advanced multi-key filtering tasks. The controlling ideas are match, group, score, and select best by rank.


### Flashcard
Index candidates' skills by ID and precompute required skills per project; for each project, iterate only eligible candidates and track the highest score, breaking ties by lower candidate_id.

### Tags
Database(#database)

### Similar Problems
