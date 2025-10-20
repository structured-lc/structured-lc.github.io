### Leetcode 550 (Medium): Game Play Analysis IV [Practice](https://leetcode.com/problems/game-play-analysis-iv)

### Description  
You are given records of player logins, each represented by a (player_id, event_date) entry. The task is to find the **fraction of unique players who logged in again on the day immediately after their very first login**. The output should be rounded to two decimal places.

- Input is a list of activity records, e.g., `[[player_id, event_date], ...]`, where event_date uses "YYYY-MM-DD" format.
- For each player, check if there is a login exactly on the day following their first login, and compute the ratio:  
  (number of such players) / (total number of unique players).

### Examples  

**Example 1:**  
Input: `[[1, "2016-03-01"], [1, "2016-03-02"], [2, "2016-05-01"], [2, "2016-05-03"]]`  
Output: `0.50`  
*Explanation: Player 1 first logs in on 2016-03-01, then again on 2016-03-02 (the next day). Player 2 first logs in on 2016-05-01 but not on 2016-05-02. So, 1 out of 2 players satisfies the condition.*

**Example 2:**  
Input: `[[5, "2022-01-01"], [5, "2022-01-02"], [5, "2022-01-03"]]`  
Output: `1.00`  
*Explanation: Player 5’s first login is 2022-01-01 and logs in again on 2022-01-02. Since all players (just one) satisfy the condition, the output is 1.00.*

**Example 3:**  
Input: `[[7, "2021-12-31"], [7, "2022-01-03"]]`  
Output: `0.00`  
*Explanation: Player 7 first logs in on 2021-12-31, but does NOT log in on 2022-01-01. None of the 1 player meets the requirement, so output is 0.00.*

### Thought Process (as if you’re the interviewee)  
Let’s break down the problem:

- For every player, we must identify their *first* login date.
- Then, for each player, we need to check if they logged in again on the day after their first login.
- Count the number of such players, then divide by the total number of unique players, and round to two decimals.

The naive way would be:
- For each player, sort their login dates, find the earliest date, and check if there’s also a record the next day.

For efficiency, use a dictionary:
- Map player_id → set of login dates.
- For each player, get the min(login_dates), check if min+1 exists in the set.
- Maintain a count of players satisfying the condition.

This avoids sorting repeatedly and uses sets for O(1) date lookup per player.

### Corner cases to consider  
- Player logs in only once: Should NOT be counted.
- Multiple logins on the same day—should not affect logic.
- No players (empty input): Result should be 0.00.
- Dates are not in order, or have missing days.
- Players with multiple valid consecutive logins: only check for the day after their first login.

### Solution

```python
from typing import List
from collections import defaultdict
from datetime import datetime, timedelta

def fraction_of_players_with_consecutive_logins(activities: List[List[str]]) -> float:
    player_logins = defaultdict(set)
    
    # Build player → set of login dates
    for player_id, event_date in activities:
        player_logins[player_id].add(event_date)
    
    num_players = len(player_logins)
    if num_players == 0:
        return 0.00

    players_with_next_day_login = 0

    for player_id, dates in player_logins.items():
        # Find the first login date
        min_date_str = min(dates)
        min_date = datetime.strptime(min_date_str, "%Y-%m-%d")
        next_day = (min_date + timedelta(days=1)).strftime("%Y-%m-%d")
        
        if next_day in dates:
            players_with_next_day_login += 1
    
    # Fraction rounded to 2 decimal places
    fraction = round(players_with_next_day_login / num_players + 1e-8, 2)
    return fraction
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of activity records—each record is processed once, and then each player is checked (sum of login dates across all players is ≤ N).
- **Space Complexity:** O(N), for the mapping of players to their sets of login dates.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if *event_date* is a timestamp, and you want to check for next-day logins at any hour/minute?
  *Hint: You'll need to normalize times to dates before processing.*

- What if you had to find players who logged in for *k* consecutive days after their first login?
  *Hint: Iterate and check for the entire window of consecutive dates after first login.*

- Could you solve this efficiently in streaming data, where logins arrive in real-time?
  *Hint: Maintain a rolling window or cache of minimum login date and check new arrivals on the fly.*

### Summary
This problem uses a **bucket/hashmap pattern** for grouping records by player, then set lookup to efficiently check for specific dates. It’s reminiscent of data aggregation with group-by, and applies in scenarios requiring per-entity date analysis, like identifying churn, engagement streaks, or user retention cohorts.


### Flashcard
For each player, find first login and check if they logged in the next day; use aggregation for efficiency.

### Tags
Database(#database)

### Similar Problems
- Game Play Analysis III(game-play-analysis-iii) (Medium)
- Game Play Analysis V(game-play-analysis-v) (Hard)