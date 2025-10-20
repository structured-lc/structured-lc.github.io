### Leetcode 2041 (Medium): Accepted Candidates From the Interviews [Practice](https://leetcode.com/problems/accepted-candidates-from-the-interviews)

### Description  
Given two tables, **Candidates** and **Rounds**, write a query to find the IDs of candidates who have passed every interview round for a given interview. Each candidate participates in multiple rounds for their job interview. The **Candidates** table has the mapping between `candidate_id` and `interview_id`. The **Rounds** table records, for each `interview_id` and `round_number`, whether a candidate has passed the round (`score` column, usually 1 for pass, 0 for fail). Return the IDs of the candidates who have passed all the rounds of their interview.

### Examples  

**Example 1:**  
Input:  
Candidates table:  
| candidate_id | interview_id |
|--------------|-------------|
| 1            | 101         |
| 2            | 102         |
| 3            | 101         |

Rounds table:  
| interview_id | candidate_id | round_number | score |
|--------------|--------------|--------------|-------|
| 101          | 1            | 1            | 1     |
| 101          | 1            | 2            | 1     |
| 101          | 3            | 1            | 1     |
| 101          | 3            | 2            | 0     |
| 102          | 2            | 1            | 1     |
| 102          | 2            | 2            | 1     |

Output: `1,2`  
*Explanation: Candidate 1 passed both rounds for interview 101. Candidate 2 passed both rounds for interview 102. Candidate 3 failed round 2 for interview 101, so only 1 and 2 are returned.*

**Example 2:**  
Input:  
Candidates = `[1, 102], [2, 104], [3, 104]`  
Rounds = `[102,1,1,1],[102,1,2,0],[104,2,1,1],[104,3,1,1]`  
Output: `2,3`  
*Explanation: Candidate 1 failed round 2. Candidates 2 and 3 passed all their rounds for their interview.*

**Example 3:**  
Input:  
Candidates = `[1,100]`, `[2,100]`  
Rounds = `[100,1,1,1]`, `[100,1,2,1]`, `[100,2,1,1]`, `[100,2,2,1]`  
Output: `1,2`  
*Explanation: Both candidates passed all rounds for their shared interview.*

### Thought Process (as if you’re the interviewee)  
- Start by recognizing that for a candidate to be accepted, they must pass **every** round associated with their interview.
- The brute force way: For each candidate, get all rounds they participated in and check if they failed any round. If not, put their id in the result.
- To optimize, use SQL’s aggregation: group by candidate, filter out where min(score) = 1 (so no round was failed). This ensures only those who passed every round are included.
- Key challenge: Some interviews may have multiple candidates and rounds, so the data needs to be joined by both candidate_id and interview_id.

### Corner cases to consider  
- Candidates that did not attend any rounds should not be included.
- A candidate who missed a round (no row in Rounds) should not be counted as passed all rounds.
- Rounds table contains extra candidate-interview pairs not present in Candidates (invalid references).
- All rounds are passed (everyone is accepted).
- No rounds data for a candidate (no output).
- Multiple candidates appear for the same interview.

### Solution

```python
# Provided tables:
# 1. Candidates (candidate_id, interview_id)
# 2. Rounds (interview_id, candidate_id, round_number, score)

def accepted_candidates(candidates, rounds):
    # candidates: List of [candidate_id, interview_id]
    # rounds: List of [interview_id, candidate_id, round_number, score]
    from collections import defaultdict

    # Build mapping for rounds: (candidate_id, interview_id) -> list of scores
    candidate_rounds = defaultdict(list)
    for inter_id, cand_id, rnd, score in rounds:
        candidate_rounds[(cand_id, inter_id)].append(score)
    
    # Result set for candidate_ids who pass all their rounds
    result = []
    
    # For each candidate, check if all their rounds have score==1
    for cand_id, inter_id in candidates:
        rounds_scores = candidate_rounds.get((cand_id, inter_id), [])
        if rounds_scores and all(score == 1 for score in rounds_scores):
            result.append(cand_id)
    
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + N + K)  
  M = number of candidates, N = number of rounds, K = total number of rounds per candidate.  
  - Processing rounds: O(N)
  - Processing candidates: O(M)
  - Checking all rounds: O(K)
- **Space Complexity:** O(K)  
  - To store all round scores per candidate.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a candidate can have multiple interview attempts?  
  *Hint: Distinguish by attempt ID or timestamp.*

- How to handle very large input efficiently if fits not in memory?  
  *Hint: Use database joins, streaming, or batching.*

- If a round can be passed with different passing scores (> 0), how would you change the logic?  
  *Hint: Change check from ==1 to >0 or use configurable passing score.*

### Summary
This problem demonstrates the "group-by and aggregate-filter" pattern, which is fundamental in both SQL and data processing. When checking that all items in a group meet a condition (e.g., min(score) == 1 means all passed), this pattern is highly efficient. It's common in reporting, data analytics, and any problem requiring "all-matching" or "none-fail" conditions by group.


### Flashcard
Group by candidate, filter out any with a failed round (min(score) = 1)—use SQL aggregation to find fully passing candidates.

### Tags
Database(#database)

### Similar Problems
