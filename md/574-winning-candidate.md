### Leetcode 574 (Medium): Winning Candidate [Practice](https://leetcode.com/problems/winning-candidate)

### Description  
Given two database tables, `Candidate` (with columns `id`, `Name`) and `Vote` (with `id`, `CandidateId` where `CandidateId` refers to a `Candidate`), write a query to find the **name of the candidate who won the election** — i.e., the candidate with the most votes. There will be at most one winner (no ties).  


### Examples  

**Example 1:**  
Input:  
Candidate =  
| id | Name |  
|----|------|  
| 1  | A    |  
| 2  | B    |  
| 3  | C    |  
| 4  | D    |  
| 5  | E    |  

Vote =  
| id | CandidateId |  
|----|-------------|  
| 1  | 2           |  
| 2  | 4           |  
| 3  | 3           |  
| 4  | 2           |  
| 5  | 5           |  

Output:  
`B`  
*Explanation: Candidate 2 (`B`) has the most votes (2 votes). Each other candidate has 1 or 0 votes, so `B` is the winner.*

**Example 2:**  
Input:  
Candidate =  
| id | Name |  
|----|------|  
| 1  | Alice|  
| 2  | Bob  |  

Vote =  
| id | CandidateId |  
|----|-------------|  
| 1  | 2           |  
| 2  | 1           |  
| 3  | 2           |  
| 4  | 2           |  

Output:  
`Bob`  
*Explanation: Bob (id 2) has 3 votes, Alice has 1 vote.*

**Example 3:**  
Input:  
Candidate =  
| id | Name |  
|----|------|  
| 1  | Carl |  
| 2  | Dave |  

Vote =  
| id | CandidateId |  
|----|-------------|  
| 1  | 1           |  

Output:  
`Carl`  
*Explanation: Only one vote, for Carl.*

### Thought Process (as if you’re the interviewee)  
To solve this, we first need to **count the number of votes per candidate**. This means grouping the `Vote` table by `CandidateId` and counting the number of times each ID appears.  
Once we have the counts, we need to find the **maximum**.  
After identifying the winning `CandidateId`, we join with the `Candidate` table to get the corresponding name.

- **Brute-force**:  
  - Count votes for each candidate.
  - Find which has the maximum.
  - Map the ID back to `Name`.
  - This is essentially a `GROUP BY`, then `ORDER BY` those totals `DESC` and select the first row (using `LIMIT 1`).

- **Optimization and Trade-offs**:  
  - Since the problem states there is always a unique winner, using `LIMIT 1` after ordering by descending count suffices.
  - If there were *ties*, a different approach would be needed, possibly using subqueries to get all with `MAX(count)`.


### Corner cases to consider  
- Only one candidate or one vote (trivial winner).
- Some candidates have 0 votes (should be ignored, as only those with votes can win).
- Large number of votes (ensure query is efficient).
- All votes for the same candidate.
- `Vote` records reference only valid `CandidateId` (guaranteed by schema).

### Solution

```python
# Since this is a SQL problem, let's express the logic as Pythonic pseudocode for counting

def winning_candidate(votes, candidates):
    # votes: list of {"id": int, "CandidateId": int}
    # candidates: list of {"id": int, "Name": str}

    # Step 1: Count votes per CandidateId
    vote_count = {}
    for vote in votes:
        cid = vote["CandidateId"]
        if cid in vote_count:
            vote_count[cid] += 1
        else:
            vote_count[cid] = 1

    # Step 2: Find CandidateId with most votes
    winner_id = max(vote_count, key=vote_count.get)

    # Step 3: Map CandidateId back to Name
    for c in candidates:
        if c["id"] == winner_id:
            return c["Name"]

# SQL (for reference only, as this was a SQL problem):
# SELECT C.Name
# FROM Vote V
# JOIN Candidate C ON V.CandidateId = C.id
# GROUP BY V.CandidateId, C.Name
# ORDER BY COUNT(*) DESC
# LIMIT 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for counting the votes for n=number-of-votes, plus O(m) scan for candidates (could be O(1) if using hashmap), so overall O(n + m).
- **Space Complexity:** O(k) for storing k=number-of-candidates vote counts.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there can be a tie for most votes?  
  *Hint: You’d need to return multiple names, so remove the `LIMIT 1` and filter for all with max count.*

- How would you handle candidates who received zero votes?  
  *Hint: Consider LEFT JOIN and default count 0, if you want to show all candidates.*

- What if the data sets are extremely large?  
  *Hint: Indexing, partitioning, or running in distributed (e.g., MapReduce) environment.*

### Summary
This solution uses the **group by counting pattern** — widely used in SQL problems dealing with counts, rankings, voting or frequency. The pattern is applicable in finding most popular/frequent items, top-k queries, etc. The query illustrates efficient aggregation, joining, and limiting results for real-world analytics.


### Flashcard
Group votes by CandidateId, count votes, select the candidate with the highest count, and join to get the name.

### Tags
Database(#database)

### Similar Problems
