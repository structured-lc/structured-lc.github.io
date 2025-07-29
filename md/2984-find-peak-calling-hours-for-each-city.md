### Leetcode 2984 (Medium): Find Peak Calling Hours for Each City [Practice](https://leetcode.com/problems/find-peak-calling-hours-for-each-city)

### Description  
Given a table of phone calls containing `caller_id`, `recipient_id`, `call_time` (a datetime string), and `city`, find the **peak calling hour(s)** for each city.  
A peak calling hour is any hour in which the highest number of calls occurred for that city. If multiple hours have the same highest count, return all those hours.   
Return, for each city and its peak hour, the respective number of calls. Sort the output by `city` ascending and then `peak_calling_hour` ascending.

### Examples  

**Example 1:**  
Input:  
Calls table:  
```
+-----------+--------------+---------------------+----------+
| caller_id | recipient_id | call_time           | city     |
+-----------+--------------+---------------------+----------+
| 8         | 4            | 2021-08-24 22:46:07 | Houston  |
| 4         | 8            | 2021-08-24 22:57:13 | Houston  |
| 5         | 1            | 2021-08-11 21:28:44 | Houston  |
| 8         | 3            | 2021-08-17 22:04:15 | Houston  |
| 11        | 3            | 2021-08-17 13:07:00 | New York |
| 8         | 11           | 2021-08-17 14:22:22 | New York |
+-----------+--------------+---------------------+----------+
```
Output:  
```
+----------+-------------------+-----------------+
| city     | peak_calling_hour | number_of_calls |
+----------+-------------------+-----------------+
| Houston  | 22                | 3               |
| New York | 13                | 1               |
| New York | 14                | 1               |
+----------+-------------------+-----------------+
```
*Explanation:*  
Houston:  
- Hour 21: 1 call  
- Hour 22: 3 calls (peak hour)  

New York:  
- Hour 13: 1 call  
- Hour 14: 1 call  
Both are peak hours since they have the highest (1) calls.

**Example 2:**  
Input:  
Calls table:  
```
+-----------+--------------+---------------------+----------+
| caller_id | recipient_id | call_time           | city     |
+-----------+--------------+---------------------+----------+
| 2         | 7            | 2021-09-12 08:10:00 | Boston   |
| 5         | 9            | 2021-09-12 08:56:42 | Boston   |
| 1         | 8            | 2021-09-12 09:25:34 | Boston   |
+-----------+--------------+---------------------+----------+
```
Output:  
```
+--------+-------------------+-----------------+
| city   | peak_calling_hour | number_of_calls |
+--------+-------------------+-----------------+
| Boston | 8                 | 2               |
+--------+-------------------+-----------------+
```
*Explanation:*  
Boston:  
- Hour 8: 2 calls (peak)  
- Hour 9: 1 call

**Example 3:**  
Input:  
Calls table:  
(empty input)  
Output:  
(empty output)  
*Explanation:*  
No calls exist, so the output is empty.

### Thought Process (as if you’re the interviewee)  
First, clarify **peak calling hour** per city: find the hour(s) in each city with the highest call count.  
- The core is to group the data first by city and hour, tally up the number of calls, then for each city, determine hour(s) where the call count equals the city's maximum.

**Brute-force:**  
- For each city, for each hour (0 to 23), count the number of calls.
- Find max call count per city, collect all hours with that count.

**Optimized idea:**  
- Use a dictionary-of-dictionaries:  
  - Outer key: city  
  - Inner key: hour  
  - Value: count  
- Iterate through data, fill the nested dict with counts.  
- For each city, extract max count and collect all hours achieving that value.

**Trade-offs:**  
- Complexity is controlled by input table size.  
- Efficient lookup and aggregations using dictionaries.  
- Sort output as required.

### Corner cases to consider  
- Input table is empty
- Some cities have only one call
- Multiple hours tie for peak in one city
- Calls at exactly midnight (00 hour) or last hour (23 hour)
- Non-standard or missing datetime formats (should be well-formed per problem statement)
- Sort ordering: output must be sorted by `city` ASC, then `peak_calling_hour` ASC.

### Solution

```python
def find_peak_calling_hours(calls):
    # Map: city -> {hour: count}
    from collections import defaultdict

    city_hour_count = defaultdict(lambda: defaultdict(int))

    for row in calls:
        # row: [caller_id, recipient_id, call_time, city]
        call_time = row[2]
        city = row[3]
        # extract hour as integer (call_time: 'YYYY-MM-DD HH:MM:SS')
        hour = int(call_time[11:13])
        city_hour_count[city][hour] += 1

    result = []
    for city in city_hour_count:
        hour_count = city_hour_count[city]
        max_calls = max(hour_count.values())
        # gather all hours with max_calls
        for hr in sorted(hour_count):
            if hour_count[hr] == max_calls:
                result.append([city, hr, max_calls])

    # sort by city ASC, then by hour ASC
    result.sort(key=lambda x: (x[0], x[1]))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) for scanning N rows, O(C × H) for city-hour aggregation and result construction, where C=#cities, H=hours (≤24). Sorting final list adds O(R log R) where R is result size (small if a city has few peak hours).
- **Space Complexity:** O(C × H) for the aggregation dictionary, plus O(R) for the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the input were billions of rows and could not fit in memory?  
  *Hint: Think about streaming or map-reduce approaches for distributed computation.*

- How would you generalize for “peak calling minute(s)” or other time interval granularities?  
  *Hint: Think about parameterizing the grouping logic.*

- How would you efficiently display this data in real-time as new calls come in throughout the day?  
  *Hint: Consider updating aggregates incrementally and adjusting peak(s) as data changes.*

### Summary
This solution uses a classic hash map aggregation pattern (“group by two keys, track max per group”).  
It’s a common **group-by-and-find-max** pattern used in SQL (GROUP BY, aggregate, then window/partition) and can be generalized for time series, logs, analytics, and leaderboards.
It’s widely applicable anywhere you need “find the keys with maximum value per group” logic.