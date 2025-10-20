### Leetcode 2339 (Easy): All the Matches of the League [Practice](https://leetcode.com/problems/all-the-matches-of-the-league)

### Description  
Given a table `Teams` with column `team_name` (unique team names), report **all possible matches** of the league where every two teams play each other **twice** (once as home, once as away). Each pair (A, B) should appear twice: (A as home, B as away) and (B as home, A as away).  
Return **all matches** in any order with columns: `home_team`, `away_team`.

### Examples  

**Example 1:**  
Input:  
Teams = `[Leetcode FC, Ahly SC, Real Madrid]`  
Output:  
```
home_team     away_team
Real Madrid   Leetcode FC
Real Madrid   Ahly SC
Leetcode FC   Real Madrid
Leetcode FC   Ahly SC
Ahly SC       Real Madrid
Ahly SC       Leetcode FC
```
*Explanation: Each team plays every other both home and away. With 3 teams, there are 3 × 2 = 6 matches.*

**Example 2:**  
Input:  
Teams = `[TeamA, TeamB]`  
Output:  
```
home_team     away_team
TeamA         TeamB
TeamB         TeamA
```
*Explanation: With 2 teams, there are 2 matches (each is home/away once).*

**Example 3:**  
Input:  
Teams = `[A]`  
Output:  
*No matches, as a single team cannot play itself.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force/Naive idea:** For every pair of teams, output both orderings: (team1 home, team2 away) and (team2 home, team1 away).  
- **Implementation:** In SQL/interview context, do a self-join (cross join) of the Teams table where `t1.team_name != t2.team_name` so you never match a team to itself.
- **Why this works:** For n teams, every pair (i, j) where i ≠ j yields 2 matches: one with i home, j away, and one with j home, i away.  
- **Optimization / Tradeoffs:** Since n is small (number of teams), this approach is efficient and simple. No need to further filter, as the problem wants every valid permutation except self-matching.

### Corner cases to consider  
- Single team — output is empty (no matches possible).
- Duplicate team names — problem says team_name is unique, so not possible.
- Large number of teams — \(n^2 - n\) rows, might be large but is manageable for SQL/interview context.
- Empty input table — output is empty.

### Solution

```python
# Print all possible league matches, each pair of teams plays twice (1 home, 1 away)
# Teams is a list of team names (strings)
def all_matches_of_league(teams):
    result = []
    # For every possible ordering of two distinct teams
    for home_team in teams:
        for away_team in teams:
            if home_team != away_team:
                result.append((home_team, away_team))
    return result

# Example Usage:
# teams = ['Leetcode FC', 'Ahly SC', 'Real Madrid']
# print(all_matches_of_league(teams))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - For n teams, each can host (n-1) away teams → n × (n-1) comparisons.
- **Space Complexity:** O(n²)  
  - Output list stores all matches: n × (n-1) tuples.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the matches are played only once (not home/away)?
  *Hint: Only one record per unordered pair. Use order or set to deduplicate.*

- What if teams can play themselves?  
  *Hint: Remove the condition `home_team ≠ away_team`.*

- How would you display results sorted by home_team then away_team?  
  *Hint: Sort result list before returning.*

### Summary
This is a classic **self-join/cross-product** SQL and combinatorics problem — generate all ordered pairs (excluding self-pairs) from a list.  
It’s a common pattern in scheduling, tournament table generation, and combinatorial problems involving pairs/permutations.  
No advanced data structures are required; a nested loop or a SQL cross join with filter suffices.


### Flashcard
Use SQL self-join to pair every team with every other (excluding itself), output both home/away orderings for all matches.

### Tags
Database(#database)

### Similar Problems
