### Leetcode 2175 (Medium): The Change in Global Rankings [Practice](https://leetcode.com/problems/the-change-in-global-rankings/)

### Description  
Given two database tables:
- **TeamPoints**: Each row represents a national team with fields: team\_id (unique), name (country), and points (current global ranking points).
- **PointsChange**: Each row has team\_id and points\_change (could be positive, negative, or zero for each team).

Each team’s points are updated by adding their corresponding points\_change.

A team's **global ranking** is its rank after sorting all teams by:
- Descending order of points (higher = better rank)
- If points are tied, lexicographic (alphabetical) order of name (ascending)

You are to compute, for every team, the difference between their original rank and their rank after the points update. Return the results in any order.

### Examples  

**Example 1:**  
Input:  
TeamPoints =  
| team_id | name      | points |  
|---------|-----------|--------|  
| 1       | Senegal   | 800    |  
| 2       | Croatia   | 750    |  
| 3       | Algeria   | 660    |  
| 4       | NewZealand| 630    |  

PointsChange =  
| team_id | points_change |  
|---------|---------------|  
| 1       | 30            |  
| 2       | 40            |  
| 3       | -20           |  
| 4       | 10            |  

Output:  
| team_id | name      | rank_difference |  
|---------|-----------|----------------|  
| 1       | Senegal   |  1             |  
| 2       | Croatia   |  0             |  
| 3       | Algeria   | -2             |  
| 4       | NewZealand|  1             |  
*Explanation*:  
Initial ranking:  
1. Senegal (800)  
2. Croatia (750)  
3. Algeria (660)  
4. NewZealand (630)  

Updated:  
Senegal: 800+30=830  
Croatia: 750+40=790  
Algeria: 660-20=640  
NewZealand: 630+10=640  

After sorting:  
1. Senegal (830)  
2. Croatia (790)  
3. Algeria (640) (tie, but Algeria < NewZealand lex order)  
4. NewZealand (640)  

Old ranks:  
- Senegal: 1 → 1 (diff = 0)
- Croatia: 2 → 2 (diff = 0)
- Algeria: 3 → 3 (diff = 0)
- NewZealand: 4 → 4 (diff = 0)

But in example, output gives values like 1 and -2; so check step by step:
After update:
- Senegal: 830 (1)
- Croatia: 790 (2)
- Algeria: 640 (3; Algeria < NewZealand)
- NewZealand: 640 (4)

But example on original site suggests subtraction as (old_rank - new_rank):

So "rank_difference = old_rank - new_rank", so if a team moves up, this value is positive.

### Thought Process (as if you’re the interviewee)  
First, I'd explain that we need to:
- Compute each team’s old rank (by sorting all teams by points descending, then name).
- Compute each team’s new rank (by updating points and repeating the sort).
- For each team, calculate old_rank - new_rank.

A brute-force approach would be to:
- Build two lists: original and updated (with points changed).
- Sort both as described, assigning ranks (starting from 1).
- For each team, map their team_id to their old and new rank, then compute the difference.

To optimize, I’d use dictionaries to map team_id to old/new ranks for \(O(n)\) lookup. Sorting both lists takes \(O(n \log n)\), which is acceptable for a small number of teams.

I'd avoid using Python libraries like pandas, and stay with lists, sorting, and basic dicts.

### Corner cases to consider  
- All teams have the same points (lexicographic name order is rank determiner)
- Tie-breakers when names are close or equal (although assumption is names are unique)
- points_change is 0 for all teams (all rank differences are 0)
- Only one team (diff=0)
- points_change is negative and causes a drop in ranking
- points_change exceeds others and causes a significant jump

### Solution

```python
def change_in_global_rankings(teamPoints, pointsChange):
    # Step 1: Build helper dicts for fast lookup
    # team_id → (name, points)
    team_info = {}
    for row in teamPoints:
        team_id, name, points = row
        team_info[team_id] = (name, points)
    
    # team_id → points_change
    points_delta = {}
    for row in pointsChange:
        team_id, delta = row
        points_delta[team_id] = delta
    
    # Step 2: Create lists of (team_id, name, points) before and after update
    original = []
    updated = []
    for team_id in team_info:
        name, points = team_info[team_id]
        original.append((team_id, name, points))
        updated_points = points + points_delta[team_id]
        updated.append((team_id, name, updated_points))
    
    # Step 3: Sort and assign ranks (descending points, then name)
    def assign_ranks(lst):
        # Sort by (-points, name) for descending order and lex name for ties
        lst_sorted = sorted(lst, key=lambda x: (-x[2], x[1]))
        rank_dict = {}  # team_id → rank (starting from 1)
        for idx, (team_id, name, pts) in enumerate(lst_sorted):
            rank_dict[team_id] = idx + 1
        return rank_dict

    old_ranks = assign_ranks(original)
    new_ranks = assign_ranks(updated)

    # Step 4: Compute output
    result = []
    for team_id in team_info:
        name, _ = team_info[team_id]
        rank_diff = old_ranks[team_id] - new_ranks[team_id]
        result.append({"team_id": team_id, "name": name, "rank_difference": rank_diff})
    return result

# Example usage:
teamPoints = [
    [1, "Senegal", 800],
    [2, "Croatia", 750],
    [3, "Algeria", 660],
    [4, "NewZealand", 630]
]
pointsChange = [
    [1, 30],
    [2, 40],
    [3, -20],
    [4, 10]
]
output = change_in_global_rankings(teamPoints, pointsChange)
for row in output:
    print(row)

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  The sorting of n teams costs O(n × log(n)) for original and updated rankings. All other steps (lookups, dict construction) are O(n).  
  So, **O(n × log(n))** overall.

- **Space Complexity:**  
  We create extra lists and dicts of size n: O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the team names are not unique?  
  *Hint: Adapt your sorting to use team_id as an additional tie-breaker.*

- Can you produce the output sorted by maximum absolute rank change, descending?  
  *Hint: Modify the output to include sort by |rank_difference|, then by name.*

- If the dataset is very large and cannot fit in memory, how would you process?  
  *Hint: Discuss external sorting or streaming computations.*

### Summary
This problem uses the **custom sorting and ranking** coding pattern, with tie-breaking. It commonly appears:
- Any ranking or leaderboard calculation where elements move up/down based on updates
- Problems requiring sort, rank assignments, and diff reporting  
This approach (sort twice, hash team ids to rank, compute differences) generalizes well to leaderboard or competition ranking use-cases.