### Leetcode 3601 (Medium): Find Drivers with Improved Fuel Efficiency [Practice](https://leetcode.com/problems/find-drivers-with-improved-fuel-efficiency)

### Description  
Given a table/array of trip records for drivers, with each trip recording the driver_id, trip_date, fuel_efficiency, and trip distance, find the list of driver_id's whose **average fuel efficiency has strictly increased** in the most recent month compared to the previous month. Only consider drivers who have trips in both months.

### Examples  

**Example 1:**  
Input: `[[101,'2023-05-12',33.0,20],[101,'2023-06-20',35.0,17],[102,'2023-05-18',38.0,16],[102,'2023-06-15',33.0,13]]`  
Output: ``  
*Explanation: 101 had a higher June average efficiency than May; 102's efficiency dropped.*

**Example 2:**  
Input: `[[201,'2024-06-11',40.0,30],[202,'2024-06-21',42.0,20],[202,'2024-05-25',40.0,25]]`  
Output: ``  
*Explanation: 202 had trips in May and June with increase; 201 only in June, not included.*

**Example 3:**  
Input: `[[1,'2023-06-01',24.0,9]]`  
Output: `[]`  
*Explanation: Only one trip; need both months for consideration.*


### Thought Process (as if you’re the interviewee)  
- Group trips by driver and by month (extract year and month from date).
- For each driver, calculate average efficiency per month.
- Only consider drivers for whom there are trips in both the last two calendar months.
- Compare: is the current (latest) month's efficiency strictly greater than the previous month?
- Output list of driver ids for which this happens.

### Corner cases to consider  
- Driver with no trips in one of the last two months.
- Trip dates in unordered input.
- Drivers with multiple trips in a month (need to average).
- Only one month in data.
- Tie in average (not strictly increasing).
- Date parsing from string.


### Solution

```python
from collections import defaultdict
from datetime import datetime

def find_drivers_with_improved_fuel_efficiency(trips):
    # Map (driver, month) to (fuel_sum, trip_count)
    stats = defaultdict(lambda: [0, 0])
    months = set()
    for did, date_str, eff, dist in trips:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        ym = (did, dt.year, dt.month)
        stats[ym][0] += eff
        stats[ym][1] += 1
        months.add((dt.year, dt.month))
    # Find the two most recent months
    sorted_months = sorted(list(months))
    if len(sorted_months) < 2:
        return []
    prev, curr = sorted_months[-2], sorted_months[-1]
    res = []
    for did in set(k[0] for k in stats):
        p, c = (did, prev[0], prev[1]), (did, curr[0], curr[1])
        if p in stats and c in stats:
            avg_prev = stats[p][0] / stats[p][1]
            avg_curr = stats[c][0] / stats[c][1]
            if avg_curr > avg_prev:
                res.append(did)
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), N = number of trips (single pass to aggregate, then one pass over driver ids).
- **Space Complexity:** O(D × M) where D = drivers, M = months (tracking sums/counts).

### Potential follow-up questions (as if you’re the interviewer)  

- What if a driver has trips in more than two months? Return those with monotonic improvement?
  *Hint: Use lists of monthly averages and scan for increases.*

- Can you return the improvement amount (delta) not just the driver_id?
  *Hint: Store and calculate the difference between two monthly averages per driver.*

- How would you do this in SQL?
  *Hint: Use group by driver and month, then self-join months for the comparison.*

### Summary
Typical grouping and aggregation problem, using a hash map to collect per-driver, per-month stats and compare monthly means. Common "windowed comparison" pattern, useful for time-series business metrics.