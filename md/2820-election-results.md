### Leetcode 2820 (Medium): Election Results [Practice](https://leetcode.com/problems/election-results)

### Description  
Given a table of votes where each row represents a voter and the candidate they voted for, determine the winner(s) based on a *weighted voting system*:  
- Each voter’s vote is **evenly split** among all the candidates they voted for. For example, if someone votes for 3 candidates, each gets 1/3 of a vote from that person.
- The winner is the candidate(s) with the **highest total weighted votes**. Return their names (if a tie, return all tied winners sorted alphabetically).

### Examples  

**Example 1:**  
Input:  
Votes =  
```
voter   candidate
------  ---------
A       X
A       Y
B       X
C       Y
C       Z
```
Output: `["X", "Y"]`  
*Explanation:  
- A splits 1 vote between X and Y: each gets 0.5  
- B gives X one full vote: X gets 1  
- C splits 1 vote between Y and Z: each gets 0.5  
Total:  
X = 0.5 (A) + 1 (B) = 1.5  
Y = 0.5 (A) + 0.5 (C) = 1.0  
Z = 0.5 (C)  
So X is the winner with highest weighted votes.*

**Example 2:**  
Input:  
Votes =  
```
voter   candidate
------  ---------
Kathy   (null)
Charles Ryan
Charles Christine
Charles Kathy
Benjamin Christine
Arthur Ryan
Anthony Christine
Edward Ryan
Evelyn Christine
Terry   (null)
```
Output: `["Christine", "Ryan"]`  
*Explanation:  
- Kathy and Terry didn’t vote (or voted for null): their vote counts as zero.  
- Charles splits vote among 3: Ryan, Christine, Kathy each get 1/3.
- Others voted for only one: Christine or Ryan each gets 1.  
- Christine: 1/3 (Charles) + 1 (Benjamin) + 1 (Anthony) + 1 (Evelyn) = 2.33  
- Ryan: 1/3 (Charles) + 1 (Arthur) + 1 (Edward)   = 2.33  
Winners: Christine and Ryan, sorted alphabetically.*

**Example 3:**  
Input:  
Votes =  
```
voter   candidate
------  ---------
A       X
B       Y
C       Z
```
Output: `["X", "Y", "Z"]`  
*Explanation:  
Each voter votes only for one candidate; each candidate gets exactly 1. No ties; all have same (highest) value.*

### Thought Process (as if you’re the interviewee)  

First, understand that this is not just a simple majority count; votes can be split among candidates.  
**Brute-force idea:**  
- For each voter, count how many candidates they voted for (n).  
- For each of their chosen candidates, give that candidate 1/n of that voter's vote.
- Sum the votes for each candidate.
- Return candidates with the highest vote total.

**Optimizing:**  
- Since each record is one voter-candidate pair,  
    - Build a mapping from voter → list of candidates.  
    - Calculate split factor per voter (1 / count).
    - For each candidate, sum up their weighted votes.
- At the end, select candidate(s) whose sum equals the maximum.

- **Trade-offs**:  
    - All steps can be performed with O(N) traversals (N = number of rows).  
    - Map structures:  
        - voter → list (to count votes per voter)  
        - candidate → running sum (for final result).  
    - No sorting required except at the end for output.

### Corner cases to consider  
- Voters with zero candidates (should not add to totals)
- Voters voting for one candidate (full vote to that candidate)
- Voters voting for multiple candidates (split vote)
- Candidates with the same highest score (tie)
- Empty votes table
- Candidate names with null or empty string (ignore nulls)
- Duplicate voter-candidate pairs (disallowed per schema)
- Multiple winners (output should be sorted alphabetically)

### Solution

```python
def election_winners(votes):
    # Step 1: Build voter to candidate mapping
    from collections import defaultdict

    voter_to_candidates = defaultdict(list)
    for voter, candidate in votes:
        if candidate is not None:     # ignore null candidates
            voter_to_candidates[voter].append(candidate)

    # Step 2: Calculate votes per candidate
    candidate_votes = defaultdict(float)
    for voter, candidates in voter_to_candidates.items():
        k = len(candidates)
        if k == 0:
            continue    # skip voters who did not vote for any candidate
        split_value = 1.0 / k
        for c in candidates:
            candidate_votes[c] += split_value

    # Step 3: Find the max vote total
    if not candidate_votes:
        return []

    max_vote = max(candidate_votes.values())
    # Step 4: Collect candidates with max votes, sorted alphabetically
    winners = [c for c, v in candidate_votes.items() if abs(v - max_vote) < 1e-9]
    winners.sort()
    return winners

# Example usage:
# votes = [
#     ("A", "X"),
#     ("A", "Y"),
#     ("B", "X"),
#     ("C", "Y"),
#     ("C", "Z"),
# ]
# print(election_winners(votes))     # Output: ['X']
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of rows in votes.  
    - Building voter_to_candidates: O(N)
    - Candidate tally: O(N)
    - Find max: O(C), where C = unique candidates, C ≤ N
    - Sorting winners: O(W log W), where W ≤ C (number of winners), typically small

- **Space Complexity:** O(V + C)
    - O(V) for storing voter → candidates
    - O(C) for candidate → vote total dictionaries

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose each voter has a different weight (not just 1 each).  
  *Hint: How does this change the formula for each candidate's vote?*

- How to support real-time streaming updates to see who is leading after each vote is cast?  
  *Hint: What data structures would allow O(1) update and max extraction?*

- If the votes list is very large and doesn’t fit in memory, how would you process it?  
  *Hint: Consider a two-pass algorithm, or external sort, or distributed processing.*

### Summary
This solution is a classic **hashmap + aggregation/counting pattern**, where you first group by one key, then aggregate by another.  
It’s common in vote counting, leaderboard, and ranking scenarios, especially when votes or scores must be normalized or weighted.  
The two-pass dictionary traversal is a standard method for such problems and can be applied anywhere aggregation is based on prior grouping (e.g., normalized survey results, point splits in ranking, etc.).


### Flashcard
Build voter→candidates map; for each voter, distribute 1/n vote to each candidate; return candidates with highest total votes.

### Tags

### Similar Problems
