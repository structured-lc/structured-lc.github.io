### Leetcode 1294 (Easy): Weather Type in Each Country [Practice](https://leetcode.com/problems/weather-type-in-each-country)

### Description  
Given a table containing **weather** data and **country** codes, write an SQL query to find the type of weather (e.g., 'Sunny', 'Rainy', 'Cloudy', etc.) present in each country. Return the result as a list of (Country, WeatherType) pairs, showing all unique weather types for every country present in the data.

### Examples  
**Example 1:**  
Input: (Weather Table)
```
+--------+-------+------------+
| Country| State | WeatherType|
+--------+-------+------------+
| US     | TX    | Sunny      |
| US     | CA    | Rainy      |
| IN     | UP    | Cloudy     |
| IN     | MH    | Sunny      |
| US     | NY    | Cloudy     |
+--------+-------+------------+
```
Output:
```
+--------+------------+
| Country| WeatherType|
+--------+------------+
| US     | Sunny      |
| US     | Rainy      |
| US     | Cloudy     |
| IN     | Sunny      |
| IN     | Cloudy     |
+--------+------------+
```
*Explanation: Each unique (Country, WeatherType) pair should be included.*

**Example 2:**  
Input: (Weather Table)
```
+--------+-------+------------+
| Country| State | WeatherType|
+--------+-------+------------+
| US     | FL    | Rainy      |
| CA     | BC    | Sunny      |
| CA     | ON    | Snowy      |
+--------+-------+------------+
```
Output:
```
+--------+------------+
| Country| WeatherType|
+--------+------------+
| US     | Rainy      |
| CA     | Sunny      |
| CA     | Snowy      |
+--------+------------+
```

### Thought Process (as if you’re the interviewee)  
This question is essentially about selecting unique combinations of **Country** and **WeatherType**. In SQL, you accomplish this using the DISTINCT keyword on the selected columns. Since we don't need to aggregate or join, the query is straightforward.

### Corner cases to consider  
- Multiple rows with the same (Country, WeatherType)
- Countries with only one type of weather
- Empty table (should return empty result)

### Solution

```sql
SELECT DISTINCT Country, WeatherType
FROM Weather;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), scanning all entries in the Weather table.
- **Space Complexity:** O(D), where D is the number of unique (Country, WeatherType) pairs.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you list only countries that experience more than one type of weather?  
  *Hint: Use GROUP BY and HAVING COUNT(DISTINCT WeatherType) > 1.*

- What if you wanted a comma-separated list of weather types per country?  
  *Hint: Use database-specific aggregation like GROUP_CONCAT (MySQL) or STRING_AGG (Postgres).* 

- How can you join the weather data with a Country info table?  
  *Hint: Use a JOIN on the country code between the two tables.*

### Summary
This is a classic SQL question testing basic familiarity with the DISTINCT keyword to obtain unique row pairs. Such patterns are widely used in SQL for deduplication and relationship extraction tasks.