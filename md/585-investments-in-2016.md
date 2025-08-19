### Leetcode 585 (Medium): Investments in 2016 [Practice](https://leetcode.com/problems/investments-in-2016)

### Description  
Given a table named **Insurance** with columns:
- PID (policy id, unique)
- TIV_2015 (Total Investment Value in 2015)
- TIV_2016 (Total Investment Value in 2016)
- LAT (latitude for city)
- LON (longitude for city)

Find the **sum (rounded to 2 decimals)** of TIV_2016 values for those policies that satisfy **both**:
- Their TIV_2015 value is **shared** by at least one other policy (i.e. appears more than once).
- Their (LAT, LON) location is **not shared** by any other policy (i.e. appears only once in the data).

Return this sum as a single value (column name: `tiv_2016`).


### Examples  

**Example 1:**  
Input:
```
PID | TIV_2015 | TIV_2016 | LAT | LON
----+----------+----------+-----+-----
 1  |   10     |   5      | 10  | 10
 2  |   20     |   20     | 20  | 20
 3  |   10     |   30     | 20  | 20
 4  |   10     |   40     | 40  | 40
```
Output: `45.00`  
*Explanation:  
- TIV_2015 value 10 appears for PIDs 1, 3, 4 (shared by more than one).
- (LAT, LON) pairs for each row: (10,10), (20,20), (20,20), (40,40).  
- (10,10) - appears only once (unique), (20,20) - appears twice (shared), (40,40) - unique.  
- Valid rows = PID 1 (TIV_2016 = 5) and PID 4 (TIV_2016 = 40).  
Sum = 5 + 40 = 45. Rounded to 2 decimals: 45.00*  

**Example 2:**  
Input:
```
PID | TIV_2015 | TIV_2016 | LAT | LON
----+----------+----------+-----+-----
 1  |   5      |   10     | 11  | 12
 2  |   5      |   20     | 13  | 14
 3  |   15     |   30     | 11  | 12
 4  |   5      |   40     | 15  | 16
```
Output: `60.00`  
*Explanation:  
- TIV_2015 value 5 appears for PIDs 1, 2, 4 (shared).
- (LAT, LON) (11,12): appears twice (PIDs 1,3), not unique; (13,14): once; (15,16): once.
- Valid rows: PID 2 (TIV_2016 = 20), PID 4 (TIV_2016 = 40).
Sum = 20 + 40 = 60.00*  

**Example 3:**  
Input:
```
PID | TIV_2015 | TIV_2016 | LAT | LON
----+----------+----------+-----+-----
 1  |   2      |  100     | 18  | 22
 2  |   3      |  150     | 18  | 22
 3  |   4      |  200     | 45  | 51
```
Output: `0.00`  
*Explanation:  
- No TIV_2015 values are shared.
- No row matches both conditions, so return 0.00*


### Thought Process (as if you’re the interviewee)  
- The **brute-force** approach is:
  - For each row, check if there's at least one other row that shares the same TIV_2015.
  - For each row, check if its (LAT, LON) is unique.
  - If both conditions are met, sum its TIV_2016.
- This is slow in practice (not feasible for large datasets), but sufficient as a starting point in an interview.
- **Optimization** involves:
  - Using counts: For each row, count how many rows have the same TIV_2015 (should be >1).
  - For uniqueness, count how many rows have the same (LAT, LON) (should be 1).
  - We can use SQL "window" functions or grouping logic to calculate these counts efficiently.
- **Why:**  
  - Counting/grouping replaces repeated scanning for each row, reducing time complexity.
  - Only need to sum TIV_2016 where conditions pass.
  - The final result is a single rounded sum.


### Corner cases to consider  
- No rows meet both conditions: return 0.00.
- All investment values are unique (no shared TIV_2015).
- Cities with same location but different policies (both fail the unique city test).
- Repeated floating point values: check correct rounding.
- Only one row in the Insurance table (unlikely to satisfy both conditions).


### Solution

```python
# We'll use two passes:
# - First, count for each TIV_2015 and for each (LAT, LON)
# - Then, iterate and sum TIV_2016 only for the qualifying policies.

def investments_in_2016(policies):
    # First, count occurrences of each TIV_2015 and each (LAT, LON) pair
    from collections import defaultdict

    tiv2015_count = defaultdict(int)
    city_count = defaultdict(int)

    for pid, tiv2015, tiv2016, lat, lon in policies:
        tiv2015_count[tiv2015] += 1
        city_count[(lat, lon)] += 1

    ans = 0.0
    for pid, tiv2015, tiv2016, lat, lon in policies:
        # The policy qualifies if:
        # - There is at least one other policy with the same TIV_2015 (i.e., count > 1)
        # - No other policy shares the same (LAT, LON) (i.e., count == 1)
        if tiv2015_count[tiv2015] > 1 and city_count[(lat, lon)] == 1:
            ans += tiv2016

    # Return rounded to two decimal places
    return round(ans, 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows.  
    - Building counters: O(n).
    - Final filtering and summing: O(n).
- **Space Complexity:** O(k), where k is the number of distinct 2015 values plus number of cities.
    - Needs additional storage for the two dictionaries.


### Potential follow-up questions (as if you’re the interviewer)  

- What if some policies have missing or null TIV_2015, LAT, or LON values?  
  *Hint: Should they be ignored or handled as separate groups?*

- How would you write this as a SQL query for a database interview?  
  *Hint: Use GROUP BY or window functions to compute the necessary counts.*

- Can you reduce the space usage if data is very large?  
  *Hint: Could you perform the filtering in-place, or with aggregation in external storage?*


### Summary
This problem is a classic example of "aggregating with group counts and filtering", often found in reporting and analytics. Key coding patterns used include hash map counting, conditional aggregation, and precise floating point rounding. This approach applies broadly whenever unique group membership and shared values need to be cross-checked, such as in de-duplication tasks or fraud/uniqueness detection.

### Tags
Database(#database)

### Similar Problems
