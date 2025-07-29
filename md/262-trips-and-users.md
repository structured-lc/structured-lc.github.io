### Leetcode 262 (Hard): Trips and Users [Practice](https://leetcode.com/problems/trips-and-users)

### Description  
You are given two SQL tables: `Trips` (each row is a taxi trip) and `Users` (each user is a client or a driver; some may be banned). Each trip has a date (`request_at`), client, driver, status (completed or cancelled), etc.  

The task is to report, for each date from '2013-10-01' to '2013-10-03', the fraction (rounded to two decimals) of trips that were **cancelled** (status is not 'completed') **where both client and driver were not banned on the day of the request**. Exclude trips where either client or driver was banned. List the results in date order.

### Examples  

**Example 1:**  
Input:  
Trips =  
| id | client_id | driver_id | city_id | status               | request_at   |
|----|-----------|-----------|---------|----------------------|--------------|
| 1  | 1         | 10        | 1       | 'completed'          | 2013-10-01   |
| 2  | 2         | 11        | 1       | 'cancelled_by_driver'| 2013-10-01   |
| 3  | 3         | 12        | 6       | 'completed'          | 2013-10-01   |
| 4  | 4         | 13        | 6       | 'cancelled_by_client'| 2013-10-01   |

Users =  
| users_id | banned | role   |
|----------|--------|--------|
| 1        | No     | client |
| 2        | Yes    | client |
| 3        | No     | client |
| 4        | No     | client |
| 10       | No     | driver |
| 11       | No     | driver |
| 12       | No     | driver |
| 13       | No     | driver |

Output:  
| Day        | Cancellation Rate |
|------------|------------------|
| 2013-10-01 |      0.50        |

*Explanation:*  
- There are 4 trips on this day.
- Exclude trip 2 (client_id=2, banned client).
- Of 3 valid trips, trip 4 is cancelled, so 1/3 = 0.33 → rounded to 0.33.

**Example 2:**  
Input:  
(Assume all clients/drivers are unbanned, 2 completed, 2 cancelled trips for 2013-10-02)

Output:  
| Day        | Cancellation Rate |
|------------|------------------|
| 2013-10-02 |      0.50        |

*Explanation:*  
- 4 valid trips: 2 cancelled, 2 completed → Cancellation Rate = 2/4 = 0.50.

**Example 3:**  
Input:  
All trips cancelled and all users unbanned.

Output:  
| Day        | Cancellation Rate |
|------------|------------------|
| 2013-10-03 |      1.00        |

*Explanation:*  
- All trips are cancelled, none are filtered by banned users.

### Thought Process (as if you’re the interviewee)  

First, join the **Trips** table with the **Users** table twice: once to get client info (filter out banned clients), once to get driver info (filter out banned drivers). This ensures both sides are unbanned.  

Next, for the trips in the specified date range, for each day, count:
- Total valid trips  
- Trips where status ≠ 'completed' (i.e., cancelled)

Compute:  
Cancellation Rate = (Cancelled Trips) ÷ (All Valid Trips)

Return for each day in date order, rounding to two decimals.

Optimizations:
- Do pre-filtering: filter users to only unbanned first; filter trips to date window first.
- Avoid using subqueries when a double-join suffices.
- Could use CTEs to keep SQL modular and readable.

Key tradeoff is between clarity/readability (using CTEs and explicit joins) versus minimal SQL for slightly faster performance.

### Corner cases to consider  
- No trips at all for a date (should not output that date).
- All trips involve banned users (should not output those trips).
- All trips on day are completed/cancelled (check 0.00 and 1.00 cases).
- Rounding: ensure exactly two decimals, even if 0.00 or 1.00.
- Same user as both client and driver.
- Multiple trips with same client and/or driver.
- Only cancelled/completed trips for a day.

### Solution

```python
# Since the problem is SQL-only in LeetCode, here's the standard SQL approach,
# with comments for logic clarity.

# For interviews, if you were to write this in Pandas/Python, you could do similar filtering.

'''
WITH valid_users AS (
  SELECT users_id
  FROM Users
  WHERE banned = "No"
),
valid_trips AS (
  SELECT *
  FROM Trips
  WHERE request_at BETWEEN "2013-10-01" AND "2013-10-03"
)
SELECT
  t.request_at AS Day,
  ROUND(
    SUM(CASE WHEN t.status != 'completed' THEN 1 ELSE 0 END) / COUNT(*)
  , 2) AS "Cancellation Rate"
FROM valid_trips t
JOIN valid_users c ON t.client_id = c.users_id
JOIN valid_users d ON t.driver_id = d.users_id
GROUP BY t.request_at
ORDER BY t.request_at;
'''

# If asked for Python (using DataFrames), a similar logic applies:
import pandas as pd

def trip_cancellation_rate(trips: pd.DataFrame, users: pd.DataFrame):
    # Step 1: select only unbanned users
    unbanned_users = set(users[users["banned"] == "No"]["users_id"])

    # Step 2: filter trips for date range given
    trips = trips[
        (trips["request_at"] >= "2013-10-01") & (trips["request_at"] <= "2013-10-03")
    ]

    # Step 3: keep only trips where both client and driver are unbanned
    trips = trips[
        trips["client_id"].isin(unbanned_users) & trips["driver_id"].isin(unbanned_users)
    ]

    # Step 4: group by day, calculate cancellation rate per day
    def cancellation_rate(day_df):
        total = len(day_df)
        cancelled = (day_df["status"] != "completed").sum()
        return round(cancelled / total, 2) if total > 0 else 0

    return (
        trips.groupby("request_at")
        .apply(cancellation_rate)
        .reset_index(name="Cancellation Rate")
        .rename(columns={"request_at": "Day"})
        .sort_values("Day")
    )
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For SQL: O(T), where T is number of rows in Trips (within date range).  
  - For DataFrame: O(T) for filtering, and O(T) for groupby.

- **Space Complexity:**  
  - Storage for filtered users: O(U) where U is number of users.  
  - Filtered trips: O(T) where T is # of trips in the window (temporary).  
  - Output is O(D) where D is # of days in the window (typically small).

### Potential follow-up questions (as if you’re the interviewer)  

- What if drivers’ or clients’ banned status changed during the date range? How would you handle dynamic bans?  
  *Hint: Add a column for ban date or status log to reflect status as of trip date*

- How would you add support for a larger date range (months or years)?  
  *Hint: Consider indexes on date columns and possibly materialized views or partitions.*

- What if you want breakdowns by city or by driver/client?  
  *Hint: Add GROUP BY city_id or by driver_id/client_id; output city/day cancellation rates.*

### Summary
This is a **classic SQL aggregation and filtering** problem, involving multi-table joins, group by date, and conditional ratios.  
Common patterns:
- Filtering with join to user table (to check user attributes)
- Group-by and aggregate (sum/count)  
- Rounding to two decimals  
This type of logic appears in ride sharing/app analytics and is useful in operations dashboards or business reports.