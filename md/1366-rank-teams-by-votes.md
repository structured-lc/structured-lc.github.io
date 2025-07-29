### Leetcode 1366 (Medium): Rank Teams by Votes [Practice](https://leetcode.com/problems/rank-teams-by-votes)

### Description  
You are given a list of votes, where each vote is a string representing a complete ranking of all teams by one voter (e.g., "ABC" means the voter ranks A > B > C). Every string contains all teams, arranged uniquely for that ballot, and all votes refer to exactly the same set of teams.  
The task is to compute the *ranking* of teams from highest to lowest, based on the following rules:
- The team with more first-place votes ranks higher.
- If tied, the team with more second-place votes ranks higher, and so on.
- If all vote counts per rank are identical, teams are ordered alphabetically.

Return a string with the teams in the computed order.

### Examples  

**Example 1:**  
Input: `votes = ["ABC","ACB","ABC","ACB","ACB"]`  
Output: `"ACB"`  
*Explanation:  
A: 1st-place votes = 2, 2nd = 3  
C: 1st = 3, 2nd = 2  
B: 1st = 0, 2nd = 0, 3rd = 5  
C has most 1st-place votes, then A, then B. Thus, ranking is C, A, B, so output is "ACB".*

**Example 2:**  
Input: `votes = ["WXYZ","XYZW"]`  
Output: `"XWYZ"`  
*Explanation:  
X: 1st-place = 1, 2nd = 1  
W: 1st = 1, 2nd = 0, 3rd = 1  
Y: 2nd = 1  
Z: ...  
Teams are sorted comparing 1st, then 2nd,... If still the same, sorted alphabetically. Final: "XWYZ".*

**Example 3:**  
Input: `votes = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"]`  
Output: `"ZMNAGUEDSJYLBOPHRQICWFXTVK"`  
*Explanation:  
Only one voter, so output is just the given ranking.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every team, count how many times it appears at every rank (i.e., how many times A is 1st, 2nd, ..., nᵗʰ), using a count array per team.
  To rank teams, compare their counts for every position:  
  - First compare 1st-place counts.
  - If tied, compare 2nd, etc.
  - If still tied for all ranks, compare names alphabetically.

- **Optimization:**  
  Because team set size ≤ 26 and votes can be large, using a map from team to a list of size n (n = number of teams), and then custom sorting suffices and is efficient.
  Build the map in one pass through votes, sort once, return result.

- This is a direct application of custom sorting and per-position frequency counting.  
  This method is efficient given constraints:
    - Team count is small (max 26).
    - Each vote is length-n, with no missing teams.

- **Why this approach:**  
  The only real difficulty is the custom comparator to do lexicographic comparison of tuples, followed by alphabetical order.  
  Since n is small, sorting is fast and we only need to keep per-team-per-position counts.

### Corner cases to consider  
- Only one vote: Just return that order.
- All teams have exactly identical vote distributions: Should fallback to alphabetical order.
- Only one team: Output it.
- Large number of votes but few teams.
- Multiple teams with completely tied rankings.

### Solution

```python
def rankTeams(votes):
    if not votes:
        return ""

    num_teams = len(votes[0])
    teams = votes[0]  # all unique teams from first vote

    # Initialize: team -> [count of 1st, 2nd, ..., nᵗʰ place]
    count = {team: [0] * num_teams for team in teams}

    # Count the votes positions for each team
    for vote in votes:
        for pos, team in enumerate(vote):
            count[team][pos] += 1

    # Sort: primary by per-position counts, secondary by team name (alphabet)
    def cmp(a, b):
        if count[a] != count[b]:
            # Higher counts should come first (so reverse sorted)
            # Compare from 1st place down; default sort is decreasing
            return count[b] > count[a]  # Actually reversed for sorted()
        return a < b  # tie-break alphabetically

    sorted_teams = sorted(teams, key=lambda x: ([-cnt for cnt in count[x]], x))
    return ''.join(sorted_teams)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N × T + T × log T × T), where N = number of votes, T = number of teams.  
  - Building counts: O(N × T)
  - Sorting: O(T × log T × T), because each comparison looks at all T positions and we have T teams.
  - T ≤ 26, so this is fast.

- **Space Complexity:**  
  O(T²), for the vote counting structure (dict of lists, up to 26 × 26).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of teams could be up to 10⁵?  
  *Hint: How would you avoid keeping O(T²) storage? Can you sort without explicit per-rank histograms?*

- Can you support missing teams or incomplete votes?  
  *Hint: Would you fill with placeholders? How do you adjust the resolving rules for ties and missing votes?*

- If votes arrive in real-time as a data stream, how would you update the ranking efficiently?  
  *Hint: Can you maintain the per-team counts with one pass? How does this affect your data structure choice for updates?*

### Summary
This problem is about *vote counting* with custom multi-key sorting: collect for each team the count of votes it received at every place, then sort all teams by their vector of per-rank counts, falling back to alphabetical order.  
The solution uses a frequency table and a custom comparator; this pattern is common in problems involving ranking and prioritized sorting, such as majority voting and the "top k" elements with several tiebreaker rules.