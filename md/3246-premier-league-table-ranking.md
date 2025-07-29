### Leetcode 3246 (Easy): Premier League Table Ranking [Practice](https://leetcode.com/problems/premier-league-table-ranking)

### Description  
Given a table of Premier League teams with columns: team_id, team_name, matches_played, wins, draws, losses,  
compute each team's total points (3 points per win, 1 point per draw) and assign rankings. Teams with equal points share their rank, and the next rank is the position they would occupy in an ordered list (classic "competition ranking"). The table should be output sorted by descending points and then alphabetically by team_name.

### Examples  

**Example 1:**  
Input:  
TeamStats =  
```
[ [1, "Manchester City", 8, 6, 2, 0],
  [2, "Liverpool",      8, 6, 2, 0],
  [3, "Chelsea",        8, 5, 3, 0],
  [4, "Arsenal",        8, 4, 4, 0],
  [5, "Tottenham",      8, 3, 5, 0] ]
```  
Output:  
```
[ [1, "Liverpool",      20, 1],
  [1, "Manchester City",20, 1],
  [3, "Chelsea",        18, 3],
  [4, "Arsenal",        16, 4],
  [5, "Tottenham",      14, 5] ]
```
*Explanation:*
- "Manchester City" and "Liverpool" both have 20 points (6×3 + 2×1). Both share rank 1.
- "Chelsea": 5×3 + 3×1 = 18, so rank 3.
- "Arsenal": 4×3 + 4×1 = 16, so rank 4.
- "Tottenham": 3×3 + 5×1 = 14, so rank 5.

**Example 2:**  
Input:  
TeamStats =  
```
[ [1, "A", 8, 2, 3, 3],
  [2, "B", 8, 2, 3, 3],
  [3, "C", 8, 1, 5, 2] ]
```
Output:  
```
[ [1, "A", 9, 1],
  [1, "B", 9, 1],
  [3, "C", 8, 3] ]
```
*Explanation:*  
- "A" and "B" both: 2×3 + 3×1 = 9, share rank 1.
- "C": 1×3 + 5×1 = 8, so rank 3.

**Example 3:**  
Input:  
TeamStats =  
```
[ [1, "Spurs", 8, 0, 8, 0] ]
```
Output:  
```
[ [1, "Spurs", 8, 1] ]
```
*Explanation:*  
- Only one team: 0×3 + 8×1 = 8 points; rank 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Calculate points for each team: points = (wins × 3) + draws.  
  Sort all teams by (points desc, team_name asc).  
  To assign rankings: For sorted teams, iterate and assign current rank. If the previous team's points == current, assign same rank; otherwise, rank = current index + 1.
- **Optimized approach:**  
  The brute-force is already efficient (O(n log n) for sorting).  
  Handling ties correctly (competition ranking) is key: the rank should not increase for ties, only for the next unique point total.
- **Why this approach:**  
  It's explicit, clear, and optimal:  
  - Calculating points: O(n)  
  - Sorting: O(n log n)  
  - Scan + assign ranking: O(n)

### Corner cases to consider  
- Teams with the same number of points (tie at any position, including first and last)
- Only one team in the league
- All teams have the same points (all tie)
- Team names with identical points, but different names, testing secondary sort
- Empty input (if applicable by problem spec)

### Solution

```python
def premier_league_table_ranking(team_stats):
    # Calculate points for each team
    teams = []
    for entry in team_stats:
        team_id, team_name, _, wins, draws, _ = entry
        points = wins * 3 + draws  # total points
        teams.append([team_id, team_name, points])
    
    # Sort by points descending, team_name ascending
    teams.sort(key=lambda x: (-x[2], x[1]))
    
    # Assign rankings with competition ranking (ties share rank)
    output = []
    prev_points = None
    rank = 1
    for i, (team_id, team_name, points) in enumerate(teams):
        if prev_points is None or points != prev_points:
            rank = i + 1
            prev_points = points
        output.append([team_id, team_name, points, rank])
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to the sort on n teams.
- **Space Complexity:** O(n) for storing the processed team list and output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle additional tie-breakers (e.g., goal difference, goals scored)?  
  *Hint: Add more fields to the sort key and update the tie check logic accordingly.*

- What if the dataset is very large and can't fit in memory?  
  *Hint: Think about external sorting or processing in batches with streaming.*

- How to process if results are distributed across multiple sources/databases?  
  *Hint: Consider distributed sorting algorithms or merging pre-sorted chunks.*

### Summary
A classic _ranking after sorting_ problem using the competition ranking method.  
This pattern frequently appears in leaderboards, contest result rankings, or wherever tie-aware ranking is needed.  
The solution is a combination of sort + scan, a fundamental and reusable approach in many leaderboard/contest scenarios.