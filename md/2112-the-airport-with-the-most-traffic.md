### Leetcode 2112 (Medium): The Airport With the Most Traffic [Practice](https://leetcode.com/problems/the-airport-with-the-most-traffic)

### Description  
Given a table `Flights` where each row contains a `departure_airport`, an `arrival_airport`, and `flights_count`, you need to find the airport(s) that handle the most flights. Each flight counted at least two airports (departure and arrival), so total traffic is the sum of flights for each airport as both departure and arrival. If multiple airports have the highest total, return all their IDs.

### Examples  

**Example 1:**  
Input:  
Flights table:  
```
| departure_airport | arrival_airport | flights_count |
|-------------------|-----------------|--------------|
|         1         |        2        |      4       |
|         2         |        1        |      5       |
|         2         |        4        |      5       |
```
Output: `[[2]]`  
Explanation:  
- Airport 1: 4 (dep) + 5 (arr) = 9  
- Airport 2: 5 (dep) + 4 (arr) + 5 (dep) = 14  
- Airport 4: 5 (arr) = 5  
Airport `2` has the most traffic.

**Example 2:**  
Input:  
Flights table:  
```
| departure_airport | arrival_airport | flights_count |
|-------------------|-----------------|--------------|
|         1         |        3        |      3       |
|         2         |        3        |      3       |
|         1         |        2        |      2       |
|         2         |        1        |      2       |
```
Output: `[[1], [2], [3]]`  
Explanation:  
- Airport 1: 3 (dep) + 2 (dep) + 2 (arr) = 7  
- Airport 2: 3 (dep) + 2 (arr) + 2 (dep) = 7  
- Airport 3: 3 (arr) + 3 (arr) = 6  
Airports 1 and 2 have the same max, but Airport 3 does not. Correction:  
- Airport 1: 3 + 2 + 2 = 7  
- Airport 2: 3 + 2 + 2 = 7  
- Airport 3: 3 + 3 = 6  
So output should be: `[[1], [2]]`

**Example 3:**  
Input:  
Flights table:  
```
| departure_airport | arrival_airport | flights_count |
|-------------------|-----------------|--------------|
|         5         |        7        |      1       |
|         7         |        6        |      2       |
```
Output: `[]`  
Explanation:  
- Airport 5: 1 (dep) = 1  
- Airport 6: 2 (arr) = 2  
- Airport 7: 1 (arr) + 2 (dep) = 3  
Airport 7 has the most traffic.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Loop over each flight, and for both departure and arrival airport, summarize their flight counts. Use a dictionary to collect the total for each airport.

- **Optimization:**  
  Since there are only two columns per row, and each airport can appear multiple times, a single-pass through all rows, updating traffic counts for both departure and arrival for each flight, will be sufficient.

- **Final Approach Chosen:**  
  Use a hash map (`traffic[airport_id]`) to accumulate the total flights for each airport. After building the map, determine max traffic, then extract all airport_ids with matching counts.

  - **Trade-off:**  
    - Time: O(n) single pass, n = number of flights
    - Space: O(m), m = number of unique airports

### Corner cases to consider  
- Flights table empty: output should be empty.
- One flight: should handle showing both airports if both tied.
- Multiple airports with the same highest traffic.
- Airports with 0 flights (should not appear in output).
- Very large number of flights (must be efficient).

### Solution

```python
def airportWithMostTraffic(flights):
    # flights: List[List[int]] with columns [departure_airport, arrival_airport, flights_count]
    traffic = {}  # airport_id -> total flights

    for dep, arr, count in flights:
        # Add traffic for departure airport
        if dep not in traffic:
            traffic[dep] = 0
        traffic[dep] += count

        # Add traffic for arrival airport
        if arr not in traffic:
            traffic[arr] = 0
        traffic[arr] += count

    # Find the max traffic value
    if not traffic:
        return []
    max_traffic = max(traffic.values())

    # Return all airport IDs with max traffic (as list of lists, per problem format)
    result = [[airport] for airport, val in traffic.items() if val == max_traffic]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in flights. Each row performs constant-time work.
- **Space Complexity:** O(m), where m is the number of unique airports (typically ≤ 2n).

### Potential follow-up questions (as if you’re the interviewer)  

- If airport IDs are very large, can we optimize space further?  
  *Hint: Only store airports that actually occur in data.*

- If the flights data is streaming, how would you compute the busiest airport in real-time?  
  *Hint: Use a running aggregation and track max so far.*

- What if we want to return the second and third busiest airports as well?  
  *Hint: Sort the values, or use a min-heap to keep top-k.*

### Summary
This problem highlights the **hash map aggregation** pattern for summarizing grouped counts in one pass. It's a classic approach for real-world analytics on tabular data, such as counting most common users, items, or cities. This solution is efficient (O(n)), robust to ties, and common for group-by style problems in interviews and SQL/data engineering roles.

### Tags
Database(#database)

### Similar Problems
