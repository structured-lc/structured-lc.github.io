### Leetcode 178 (Medium): Rank Scores [Practice](https://leetcode.com/problems/rank-scores)

### Description  
Given a table with **id** and **score**, determine the rank of each score as follows:
- **Rank the scores from highest to lowest.**
- **If two (or more) scores tie, they share the same rank.**
- **After ties, the next rank(s) should increment without gaps (dense ranking, e.g., 1, 1, 2, 3, not 1, 1, 3).**
Return a table ordered by **score** in descending order, with columns: **score** and **rank**.

### Examples  

**Example 1:**  
Input:  
Scores Table:  
| id | score |
|----|-------|
| 1  | 100   |
| 2  | 90    |
| 3  | 90    |
| 4  | 80    |
Output:  
| score | rank |
|-------|------|
| 100   | 1    |
| 90    | 2    |
| 90    | 2    |
| 80    | 3    |
*Explanation:*  
The highest score (100) gets rank 1. The two records with 90 both get rank 2 (tie). The next score (80) gets rank 3, without any gap.

**Example 2:**  
Input:  
Scores Table:  
| id | score |
|----|-------|
| 1  | 70    |
| 2  | 70    |
| 3  | 70    |
Output:  
| score | rank |
|-------|------|
| 70    | 1    |
| 70    | 1    |
| 70    | 1    |
*Explanation:*  
All scores are tied at the top, so all have rank 1.

**Example 3:**  
Input:  
Scores Table:  
| id | score |
|----|-------|
| 1  | 98    |
| 2  | 97    |
| 3  | 96    |
| 4  | 95    |
Output:  
| score | rank |
|-------|------|
| 98    | 1    |
| 97    | 2    |
| 96    | 3    |
| 95    | 4    |
*Explanation:*  
Strictly descending; ranks increase by 1 each time.

### Thought Process (as if you’re the interviewee)  
- **First,** consider sorting all scores in descending order.
- **Naive approach:** For each score, count how many unique scores are greater to determine its rank. This could be slow for large data.
- If using SQL or pandas, there are built-in functions (like DENSE_RANK()) that solve this.
- **Core requirement:** Use *dense* ranking: no skipped ranks, ties share the same number, and the next rank increments by 1 regardless of how many share the previous rank.
- In an interview without built-ins, I’d sort all distinct scores, map each unique score to its dense-rank, and assign that rank to every occurrence.
- **Trade-off:** Built-in ranking functions are fastest and handle all ties and gaps correctly. Manual mapping works if built-ins are unavailable.

### Corner cases to consider  
- All scores the same (all rank 1)
- All scores distinct (ranks from 1 to n)
- Only one score
- Scores with multiple levels of ties (e.g., [100, 100, 50, 50, 20])
- Empty input table

### Solution

```python
def rank_scores(scores):
    """
    scores: List of dictionaries, each with keys 'id' and 'score'
    Output: List of dictionaries with 'score' and 'rank', sorted as required.
    """
    # Sort by score descendingly
    sorted_scores = sorted(scores, key=lambda x: -x['score'])
    # Map unique score to dense rank
    rank_map = {}
    current_rank = 1
    prev_score = None
    for entry in sorted_scores:
        score = entry['score']
        if score != prev_score:
            rank_map[score] = current_rank
            current_rank += 1
            prev_score = score
    # Create output with score and its rank
    result = []
    for entry in sorted_scores:
        result.append({'score': entry['score'], 'rank': rank_map[entry['score']]})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting the input list, where n is the number of records. All other steps (mapping and output build) are O(n).
- **Space Complexity:** O(n) due to extra storage for `rank_map` and the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ranking if new scores are being inserted frequently in a streaming system?  
  *Hint: Consider data structures for O(1) updates to ranking or efficient recomputation.*

- What if you need to support extremely large datasets, so that sorting cannot be performed in-memory?  
  *Hint: Think about external sorting or distributed processing.*

- If the table had additional columns (like user id) and you needed to rank *within* each user group, not globally?  
  *Hint: Apply dense rank partitioned by user id (group by, window functions).*

### Summary
This solution demonstrates the "dense ranking" or "competition ranking" pattern, frequently used in leaderboard, ranking, and scoring problems. The key pattern is mapping unique items to their rank in sorted order, ensuring that ties share the same rank but that rank increments to the next integer immediately after a tie group. This is a common requirement for problems involving leaderboards, sports tournaments, or whenever ranking with ties needs to avoid gaps.

### Tags
Database(#database)

### Similar Problems
