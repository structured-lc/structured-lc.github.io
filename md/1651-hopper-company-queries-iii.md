### Leetcode 1651 (Hard): Hopper Company Queries III [Practice](https://leetcode.com/problems/hopper-company-queries-iii)

### Description  
Given ride data for the Hopper company, write an SQL query to compute the **average ride distance** and **average ride duration** for every **3-month window** starting from January–March 2020 up to October–December 2020.
- Average should be computed by summing the values over the three months and dividing by 3 (not by the count of rides).
- Return two values: average_ride_distance and average_ride_duration, both rounded to two decimal places.
- Output the result ordered by the window's starting month (e.g. Jan = 1, Feb = 2, ...).

### Examples  

**Example 1:**  
Input:  
Database tables with ride data across Jan–Dec 2020
Output:  
A table with columns: month, average_ride_distance, average_ride_duration
*Explanation: For each window (e.g., Jan–Mar), sum ride_distance for Jan, Feb, Mar, then average across 3 months. Same for ride_duration. Repeat for Feb–Apr, Mar–May, ..., Oct–Dec. Each row corresponds to the starting month of the window.*


### Thought Process (as if you’re the interviewee)  
- The goal is to aggregate ride data into overlapping 3-month windows, for 10 windows in total (Jan-Mar, Feb-Apr, ..., Oct-Dec).
- For each window, we need total sums in that window, then divide by 3 for the desired average.
- Will join or filter rides by their month, and slide the window repeatedly.
- Output is ordered by the first month of the window.
- Use ROUND to 2 decimal places on the averages.
- Will probably use SQL window functions, or a self-join/grouping by month.


### Corner cases to consider  
- Some months have zero rides — ensure not dividing by zero, but still count the month in denominator (so sum can be zero, as required).
- Rides table has rides outside 2020, which should not be included.
- Rides in months partially in the window; only use full months per window.
- Input data has missing months — handle naturally by counting their values as zero.


### Solution

```sql
-- Assuming a table 'Rides' with columns (ride_id, ride_distance, ride_duration, requested_at)
WITH Months AS (
  SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
    SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
    SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL
    SELECT 11 UNION ALL SELECT 12
),
MonthStats AS (
  SELECT
    EXTRACT(MONTH FROM requested_at) AS month,
    SUM(ride_distance) AS total_distance,
    SUM(ride_duration) AS total_duration
  FROM Rides
  WHERE EXTRACT(YEAR FROM requested_at) = 2020
  GROUP BY EXTRACT(MONTH FROM requested_at)
),
WindowStats AS (
  SELECT
    m1.month AS start_month,
    COALESCE(ms1.total_distance,0) + COALESCE(ms2.total_distance,0) + COALESCE(ms3.total_distance,0) AS sum_distance,
    COALESCE(ms1.total_duration,0) + COALESCE(ms2.total_duration,0) + COALESCE(ms3.total_duration,0) AS sum_duration
  FROM Months m1
    LEFT JOIN MonthStats ms1 ON ms1.month = m1.month
    LEFT JOIN MonthStats ms2 ON ms2.month = m1.month + 1
    LEFT JOIN MonthStats ms3 ON ms3.month = m1.month + 2
  WHERE m1.month <= 10
)
SELECT
  start_month AS month,
  ROUND(sum_distance/3.0, 2) AS average_ride_distance,
  ROUND(sum_duration/3.0, 2) AS average_ride_duration
FROM WindowStats
ORDER BY start_month;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) with respect to window calculation (since the months are fixed, and grouping is across 12 months only). O(N) for scanning the rides table to group by month.
- **Space Complexity:** O(12) for monthly aggregations, so constant additional space relative to input.


### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the window size is k months instead of 3. How would you generalize your query?  
  *Hint: Consider generating all possible k-length windows dynamically using a CTE.*

- How would you handle a table where there are missing months entirely?  
  *Hint: Outer join against a months table, treat nulls as zeros.*

- What if you needed average ride distance per driver instead?  
  *Hint: Group first by driver and month before sliding window aggregation.*

### Summary
This approach uses SQL querying to slide a fixed-size window (3 months) across aggregated monthly ride data, leveraging table joins and grouping. This pattern—fixed-size sliding window time aggregation—is widely applicable in analytics tasks over time series data.

### Tags
Database(#database)

### Similar Problems
- Trips and Users(trips-and-users) (Hard)
- Hopper Company Queries I(hopper-company-queries-i) (Hard)
- Hopper Company Queries II(hopper-company-queries-ii) (Hard)
- Number of Times a Driver Was a Passenger(number-of-times-a-driver-was-a-passenger) (Medium)