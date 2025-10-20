### Leetcode 2314 (Medium): The First Day of the Maximum Recorded Degree in Each City [Practice](https://leetcode.com/problems/the-first-day-of-the-maximum-recorded-degree-in-each-city)

### Description  
Given a table of weather records, where each record consists of a `city_id`, `degree`, and `day`,  
return, for each city, the earliest day (minimum day) on which the maximum recorded degree was observed in that city.  
If a city reached its maximum degree on multiple days, return the earliest such day.

### Examples  

**Example 1:**  
Input=`weather = [[1, 27, 3], [2, 33, 4], [1, 31, 4], [2, 33, 8], [1, 31, 7]]`  
Output=`[[1, 31, 4], [2, 33, 4]]`  
Explanation.  
- For city 1: Highest degree is 31, appears on days 4 and 7 → earliest is day 4.  
- For city 2: Highest degree is 33, appears on days 4 and 8 → earliest is day 4.

**Example 2:**  
Input=`weather = [[1, 20, 1], [1, 25, 3], [1, 25, 5]]`  
Output=`[[1, 25, 3]]`  
Explanation.  
- City 1 has max degree 25 on days 3 and 5 → earliest is day 3.

**Example 3:**  
Input=`weather = [[1, 10, 1], [2, 20, 1], [3, 15, 2]]`  
Output=`[[1, 10, 1], [2, 20, 1], [3, 15, 2]]`  
Explanation.  
- All cities only appear once, so that is the answer for each.

### Thought Process (as if you’re the interviewee)  
First, I look for the **maximum degree recorded for each city**. For cities with the same maximum degree occurring multiple times, I need the **earliest day** among those.

- Brute-force idea:  
  - For each city, filter all records for that city.
  - Find the max degree.
  - Gather all records for that city and max degree, then take min(day).

- Optimization:  
  - Iterate through each record once.
    - For each city, keep track of the current max degree and the earliest day seen for that degree.
    - If degree > current max, update both degree and day.
    - If degree == current max, update the earliest day if needed.

- This way, we accomplish the result in one pass.

### Corner cases to consider  
- Multiple cities having only one record.
- All records in input have the same degree and day.
- City with multiple days and same maximum degree — must pick earliest.
- Empty input list.
- Only one city or only one record.

### Solution

```python
def first_day_max_degree(weather):
    # Store: { city_id: (max_degree, earliest_day) }
    city_records = dict()

    for city_id, degree, day in weather:
        if city_id not in city_records:
            city_records[city_id] = (degree, day)
        else:
            max_degree, earliest_day = city_records[city_id]
            if degree > max_degree:
                # Found new max, update both values
                city_records[city_id] = (degree, day)
            elif degree == max_degree:
                # Same as max, update day if it's earlier
                if day < earliest_day:
                    city_records[city_id] = (max_degree, day)

    # Output as requested: [city_id, degree, day]
    result = []
    for city_id in sorted(city_records.keys()):
        max_degree, earliest_day = city_records[city_id]
        result.append([city_id, max_degree, earliest_day])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the total number of records. Each record is visited once and dict operations are O(1).
- **Space Complexity:** O(k), where k is the number of unique cities (storing max and earliest for each city).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the data does not fit in memory?
  *Hint: Can you do it with external sorting and batch/group-processing per city?*

- How would you do it if the input wasn't pre-sorted by city?
  *Hint: The current solution does not require sorted input, but external memory solutions need to group by city before processing.*

- Can you return the results in descending order of max degrees?
  *Hint: After collecting, you can sort result based on degree before returning.*

### Summary
This problem uses the **hash map/associative array** pattern for grouping and aggregating information per entity (here, per city). The approach is a textbook way to compute group-wise aggregates efficiently in one pass. This pattern often appears in database-style "group by" problems, such as finding top scores, min/max/earliest/latest per grouping, etc.


### Flashcard
For each city, track the max degree and the earliest day it was recorded during a single pass.

### Tags
Database(#database)

### Similar Problems
