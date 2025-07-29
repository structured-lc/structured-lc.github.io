### Leetcode 3198 (Easy): Find Cities in Each State [Practice](https://leetcode.com/problems/find-cities-in-each-state)

### Description  
Given a table `cities` with two columns: **state** and **city**, where each row represents a city in a particular state (each pair is unique), return a table with each **state** and a single comma-separated string listing **all the cities in that state**, sorted by city name in ascending order. The result must be ordered by state name ascending.

### Examples  

**Example 1:**  
Input:  
cities table:  
| state      | city          |  
|------------|---------------|  
| California | San Diego     |  
| California | Los Angeles   |  
| California | San Francisco |  
| Texas      | Dallas        |  
| Texas      | Austin        |  
| Texas      | Houston       |  
| New York   | Rochester     |  
| New York   | Buffalo       |  
| New York   | New York City |  

Output:  
| state      | cities                               |  
|------------|--------------------------------------|  
| California | Los Angeles, San Diego, San Francisco|  
| New York   | Buffalo, New York City, Rochester    |  
| Texas      | Austin, Dallas, Houston              |  

*Explanation: For each state, collect the cities, sort them alphabetically, join as a string.*

**Example 2:**  
Input:  
cities table:  
| state | city    |  
|-------|---------|  
| Utah  | Provo   |  
| Utah  | Ogden   |  
| Utah  | Salt Lake City |  

Output:  
| state | cities                       |  
|-------|------------------------------|  
| Utah  | Ogden, Provo, Salt Lake City |  

*Explanation: Only one state, all cities listed in sorted (alphabetical) order.*

**Example 3:**  
Input:  
cities table:  
| state | city   |  
|-------|--------|  
| Ohio  | Akron  |  

Output:  
| state | cities |  
|-------|--------|  
| Ohio  | Akron  |  

*Explanation: Only one city, so the city appears as is.*

### Thought Process (as if you’re the interviewee)  
The core task is to, for each unique state, return a single row containing the state and a sorted, comma-separated string of all its cities.  
- First, I need to **group by** state.
- For each state, I need to **collect the cities**, **sort them**, and **join** into a single string.
- Finally, order the results by state name in ascending order.

Brute force: 
- Get all rows, for each unique state make a list of all its cities, sort, then join.
- Optimize: Use GROUP BY on state, an aggregation to collect and sort cities, then join as a comma-separated string.  
- In SQL, MySQL/LeetCode support GROUP_CONCAT with ORDER BY for aggregation and ordering.

This clean approach leverages SQL aggregation and built-in string functions, making it efficient and concise.

### Corner cases to consider  
- States with only one city
- States with many cities
- Cities with spaces and similar names
- No cities (empty table)
- All states having same city names (duplicates not possible due to unique constraint but check logic)
- Output must order states and city names lexicographically (alphabetically)

### Solution

```sql
SELECT 
    state,
    GROUP_CONCAT(city ORDER BY city ASC SEPARATOR ', ') AS cities
FROM cities
GROUP BY state
ORDER BY state ASC;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log N), where N is the number of rows.  
  - GROUP BY state: linear to the data size.  
  - Sorting cities within each group: log M per state (M = number of cities in that state), but total work is O(N log K) over all K states.
- **Space Complexity:**  
  O(N) extra space for sorting and holding intermediate lists of cities for each group.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle states with millions of cities efficiently?  
  *Hint: Consider memory limits for GROUP_CONCAT and possible batching.*

- What if there could be duplicate city names (for example, between states)?  
  *Hint: Confirm that uniqueness is only required for (state, city), not globally.*

- How to support other delimiters or formatting (e.g., cities on new lines)?  
  *Hint: Adjust the SEPARATOR parameter or use string replace functions.*

### Summary
This problem uses the **grouping and aggregation pattern** in SQL. The main tool is GROUP BY combined with GROUP_CONCAT for string aggregation and ORDER BY for sorting. This pattern is common in report generation and data summarization tasks, such as collecting items per category or building summary descriptions. It is also a practical example of SQL's power for text data transformation within groups.