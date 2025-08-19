### Leetcode 1097 (Hard): Game Play Analysis V [Practice](https://leetcode.com/problems/game-play-analysis-v)

### Description  
Given an activity log table for a mobile game, each row represents a login event for a player, including their `player_id`, `device_id`, `event_date`, and `games_played`. A player’s **install date** is defined as their first login date, regardless of device.  
For each **install date**, calculate:
- **installs:** Number of unique players who installed on that date.
- **Day1_retention:** Fraction of those players who returned and logged in again on the next day (install date + 1).  
Return a table with columns `install_dt`, `installs`, `Day1_retention` for each install date.

### Examples  

**Example 1:**  
Input:  
Activity table:

| player_id | device_id | event_date | games_played |
|-----------|-----------|------------|--------------|
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-03-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-01 | 0            |
| 3         | 4         | 2016-07-03 | 5            |

Output:
| install_dt  | installs | Day1_retention |
|-------------|----------|----------------|
| 2016-03-01  | 2        | 0.50           |
| 2017-06-25  | 1        | 0.00           |

*Explanation:*  
- On 2016-03-01, players 1 and 3 installed; only player 1 logged in next day (2016-03-02), so Day1_retention = 1 / 2 = 0.50.
- On 2017-06-25, player 2 installed but didn’t return next day, so Day1_retention = 0.

**Example 2:**  
Input:  
| player_id | device_id | event_date | games_played |
|-----------|-----------|------------|--------------|
| 10        | 5         | 2022-08-01 | 2            |
| 11        | 4         | 2022-08-01 | 1            |
| 10        | 5         | 2022-08-02 | 4            |
| 11        | 3         | 2022-08-03 | 5            |

Output:
| install_dt  | installs | Day1_retention |
|-------------|----------|----------------|
| 2022-08-01  | 2        | 0.50           |

*Explanation:*  
- Players 10 and 11 both installed on 2022-08-01.
- Player 10 returned on 2022-08-02 (so counts for retention), player 11 only returned on 2022-08-03, which does not count.

**Example 3:**  
Input:  
| player_id | device_id | event_date | games_played |
|-----------|-----------|------------|--------------|
| 5         | 99        | 2018-12-12 | 3            |

Output:
| install_dt  | installs | Day1_retention |
|-------------|----------|----------------|
| 2018-12-12  | 1        | 0.00           |

*Explanation:*  
Only one player installed, didn’t come back the next day, so Day1_retention = 0.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each player, get their first login as install date. For each install date, count number of unique players who installed (installs), and number who logged in on the following day. Get the fraction.
- **Optimization:**  
  - Use a dict to store each player's min(event_date) as their install date.
  - For Day-1 retention, check if the player logged in on install_date + 1.
  - Aggregate by install date for all players.
- Grouping and set operations make implementation more efficient.  
  In SQL or Python, use grouping and date arithmetic efficiently.

### Corner cases to consider  
- Players with only one login (never return).
- Multiple players sharing the same install date.
- Players returning after more than one day (don’t count).
- Same player logs in with different devices; only min(date) matters for “install date”.
- Dates with no retention (retention = 0).
- Empty log table.
- Repeated logins by the same player on install date or after.

### Solution

```python
from collections import defaultdict

def game_play_analysis_v(activity):
    # activity: list of dicts with keys 'player_id', 'device_id', 'event_date', 'games_played'

    from datetime import datetime, timedelta

    # Step 1: Determine each player's install date (the earliest login)
    player_install = {}
    for row in activity:
        pid = row['player_id']
        dt = row['event_date']
        if pid not in player_install or dt < player_install[pid]:
            player_install[pid] = dt

    # Step 2: Map each install date to a set of players who installed on that date
    install_date_players = defaultdict(set)
    for pid, inst_dt in player_install.items():
        install_date_players[inst_dt].add(pid)

    # Step 3: Build a lookup for all (player, event_date) logins
    player_dates = defaultdict(set)
    for row in activity:
        pid = row['player_id']
        dt = row['event_date']
        player_dates[pid].add(dt)

    # Step 4: For each install date, count retained players
    result = []
    for inst_dt, players in install_date_players.items():
        # Convert to datetime for day+1
        inst_date_obj = datetime.strptime(inst_dt, "%Y-%m-%d")
        next_date_str = (inst_date_obj + timedelta(days=1)).strftime("%Y-%m-%d")
        retained = 0
        for pid in players:
            if next_date_str in player_dates[pid]:
                retained += 1
        installs = len(players)
        retention = retained / installs if installs > 0 else 0
        # Round to two decimals as per requirement
        retention = round(retention + 1e-8, 2) # add epsilon for correct rounding
        result.append({
            "install_dt": inst_dt,
            "installs": installs,
            "Day1_retention": retention
        })

    # Return in any order (order not enforced)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of activity entries.  
  - Each activity row is processed at most a couple of times for mapping installs and checking logins.
- **Space Complexity:** O(n), due to dictionaries holding player dates, install dates, and per-player mappings.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to compute *Day-2* or *Day-7* retention?
  *Hint: Generalize the “next day” check to configurable day offsets.*

- How to handle a huge log file that doesn’t fit in memory?
  *Hint: Use external sorting, process by player, or stream/aggregate as you go.*

- How would you find weekly/monthly retention instead of daily?
  *Hint: Adjust the date range checks and aggregate over longer windows.*

### Summary
This problem uses a **grouping and aggregation pattern** on event logs: tracking installations by earliest date, then aggregating returns for retention calculation.  
This pattern is common in user analytics, activity tracking, and cohort analysis—extensible to N-day retention, churn analysis, or engagement funnels in product analytics.

### Tags
Database(#database)

### Similar Problems
- Game Play Analysis IV(game-play-analysis-iv) (Medium)