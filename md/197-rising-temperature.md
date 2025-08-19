### Leetcode 197 (Easy): Rising Temperature [Practice](https://leetcode.com/problems/rising-temperature)

### Description  
Given a table **Weather** with columns **id**, **recordDate**, and **temperature**, your task is to find the ids of all days where the temperature was *strictly higher* than the previous day's temperature.  
- Each row represents a unique date, and there are no duplicate recordDate values.
- The result should return just the **id** where the temperature rose compared to the previous day.
- The output order does not matter.

In other words, find all ids where:  
temperature at dateᵢ > temperature at date_{i-1}  
and recordDateᵢ is exactly the next day after recordDate_{i-1}.

### Examples  

**Example 1:**  
Input:  
Weather table  
```
id | recordDate  | temperature
---|-------------|------------
1  | 2015-01-01  | 10
2  | 2015-01-02  | 25
3  | 2015-01-03  | 20
4  | 2015-01-04  | 30
```
Output: `2, 4`  
Explanation.  
- 2015-01-02 (id=2): 25 > 10 (previous day), rising → include 2  
- 2015-01-04 (id=4): 30 > 20 (previous day is 2015-01-03), rising → include 4  
2015-01-03 (id=3): 20 < 25 → not included.

**Example 2:**  
Input:  
```
id | recordDate  | temperature
---|-------------|------------
5  | 2020-10-01  | 15
6  | 2020-10-02  | 10
7  | 2020-10-04  | 12
8  | 2020-10-05  | 20
```
Output: `8`  
Explanation.  
- 2020-10-05 (id=8): Previous day in table is 2020-10-04 (20 > 12, and dates are consecutive: 2020-10-05 is after 2020-10-04), so include 8.  
No other day has a higher temperature than the previous consecutive date.

**Example 3:**  
Input:  
```
id | recordDate  | temperature
---|-------------|------------
9  | 2019-05-01  | 25
10 | 2019-05-02  | 25
```
Output: (empty)  
Explanation.  
- 2019-05-02: 25 is *not* greater than 25 → not included.

### Thought Process (as if you’re the interviewee)  

The problem boils down to, for each day, checking whether its **temperature** is greater than the **previous day's** temperature (with consecutive days).

- **Brute-force:** For each row, find the previous day, compare temperatures. This might require nested iteration if implemented programmatically (which is inefficient).

- **Optimized (SQL thinking):**  
  - For each day, identify the previous day by checking if recordDate matches (previous date + 1).
  - Join the table to itself (self-join) where one date matches the previous day's date (+1 difference), and then compare temperatures.
  - Return the id of the day where temperature > the previous day's temperature.

Trade-offs:  
- **Self-join:** Simple, readable, easy to index on date.
- **Window Function (like LAG):** Also effective if supported, but in interviews, self-join is usually more universal (works in all major SQL dialects).

### Corner cases to consider  
- No days with rising temperature → return an empty result
- Table with only one day → cannot compare, return empty
- Days missing (not 100% consecutive dates in data); only compare actual consecutive dates
- Temperatures equal or decreasing → should not be included
- Multiple days with same temperature should not be included

### Solution

```python
# The question is a SQL challenge, but let's simulate the logic in Python for interview-style.

from datetime import datetime, timedelta

def rising_temperature(weather):
    """
    weather: List of dicts with keys 'id', 'recordDate', 'temperature'
    Returns list of ids where temperature > previous day's temperature (and dates are consecutive)
    """

    # Sort by recordDate to process in order
    weather_sorted = sorted(weather, key=lambda x: x['recordDate'])

    result = []

    for i in range(1, len(weather_sorted)):
        prev = weather_sorted[i - 1]
        curr = weather_sorted[i]

        # Parse dates
        prev_date = datetime.strptime(prev['recordDate'], "%Y-%m-%d")
        curr_date = datetime.strptime(curr['recordDate'], "%Y-%m-%d")

        # Check if dates are consecutive
        if curr_date - prev_date == timedelta(days=1):
            if curr['temperature'] > prev['temperature']:
                result.append(curr['id'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting by recordDate (if unsorted); otherwise O(n) for a single pass.
- **Space Complexity:** O(n) for the sorted list (and result array), proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this using SQL window functions?
  *Hint: Consider using LAG or LEAD to access previous row values.*

- What if dates are not unique? How would you modify the solution?
  *Hint: Handle grouping or filtering approaches to deduplicate.*

- How would you handle time zones or time granularity beyond days?
  *Hint: Parse and normalize dates, handle time components or gaps.*

### Summary
This problem demonstrates the **adjacent comparison** pattern: comparing each element with its previous element, with a consecutive constraint (here, by date).  
The classic approach is a **self-join** in SQL or a **single-pass** in Python after sorting.  
This is a common coding/interview pattern applicable in scenarios like finding increasing trends, detecting new peaks, or diff-based comparisons in time-series data.

### Tags
Database(#database)

### Similar Problems
