### Leetcode 2889 (Easy): Reshape Data: Pivot [Practice](https://leetcode.com/problems/reshape-data-pivot)

### Description  
Given a DataFrame `weather` with columns:  
- **city** (string): City name  
- **month** (string): Month name  
- **temperature** (int): Recorded temperature for that city and month  

Reshape the data so that **each row corresponds to a month**, **each column corresponds to a city**, and the **cell value** represents the temperature for that city and month.  
If a city has no data for a month, that cell can be left as NaN (or be empty).  
This is essentially a pivot—converting row/column data into a more analysis-friendly format.

### Examples  

**Example 1:**  
Input:  
city | month | temperature  
-----|-------|------------  
Jacksonville | January | 13  
ElPaso       | January | 5  
Jacksonville | February | 15  
ElPaso       | February | 7  
Output:  
city      | ElPaso | Jacksonville  
----------|--------|--------------  
February  | 7      | 15  
January   | 5      | 13  
*Explanation: Each row is a month; columns are cities, filled with the correct temperature.*

**Example 2:**  
Input:  
city | month | temperature  
-----|-------|------------  
Chicago | March | 10  
Miami   | March | 20  
Output:  
city  | Chicago | Miami  
------|---------|------  
March | 10      | 20  
*Explanation: Only March is present, mapped to both cities’ temperatures.*

**Example 3:**  
Input:  
city | month | temperature  
-----|-------|------------  
Seattle | April | 12  
Boston  | May   | 18  
Seattle | May   | 14  
Output:  
city  | Boston | Seattle  
------|--------|--------  
April |  NaN   | 12  
May   |  18    | 14  
*Explanation: “April” has no “Boston”, “May” has both, so missing combinations show as NaN.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would involve creating a nested loop to build a result table, mapping (month, city) → temperature for output.
- However, since this is tabular data and the operation is a classic **pivot**, the optimal, industry-standard way is to use the *pivot* transformation:
  - The **rows** (index) are months.
  - The **columns** are cities.
  - The **values** are temperatures for (month, city).
- In Python, this is usually done via a `pivot()` or `pivot_table()` with the right parameters.
- Trade-off: Using pandas' pivot is O(n), efficient and readable. Building a table manually is slow and error-prone. For interview, since libraries are usually restricted, I’ll show a manual mapping approach.

### Corner cases to consider  
- Input is empty: should return empty DataFrame.
- Multiple cities, multiple months with missing data (row or column holes): should fill cells with None or NaN.
- Duplicate (month, city) pairs: clarify which value to use or assume none.
- Only one city or only one month.
- Large input size.

### Solution

```python
def pivotTable(weather):
    # Extract unique months and cities for proper row and column ordering
    months = sorted(set(row[1] for row in weather))
    cities = sorted(set(row[0] for row in weather))
    
    # Build a mapping: (month, city) -> temperature
    value_map = {}
    for row in weather:
        city, month, temp = row
        value_map[(month, city)] = temp

    # Now build the result as a list of lists
    result = []
    # First row: header
    header = ['month'] + cities
    result.append(header)
    
    # For each month, construct a row:
    for month in months:
        row = [month]
        for city in cities:
            # fill with temperature or None/NaN if missing
            row.append(value_map.get((month, city), None))
        result.append(row)
    return result

# Example usage:
weather = [
    ["Jacksonville", "January", 13],
    ["ElPaso", "January", 5],
    ["Jacksonville", "February", 15],
    ["ElPaso", "February", 7]
]
pivoted = pivotTable(weather)
for row in pivoted:
    print(row)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m×c), where n = number of input rows, m = unique months, c = unique cities.  
  (O(n) to map all data, O(m×c) for building output)
- **Space Complexity:** O(m×c) for the result table, plus O(n) for storing the mapping dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle duplicate (month, city) pairs in input?  
  *Hint: Should you aggregate (sum, max, etc.) or take first?*

- Can you sort months in calendar order rather than alphabetically?  
  *Hint: Use an ordered list of months for lookup.*

- How would you handle sparse data for very large tables?  
  *Hint: Consider using efficient storage or returning only non-missing entries.*

### Summary
This problem is a classic **table pivot**/reshaping pattern, often required in data analysis and BI tools.  
The coding pattern is to build a mapping for (row, col) → value and then expand into the requested matrix.  
It is relevant for problems about data transformation, spreadsheets, or reporting in any context where categorical axes are rearranged.  
Practiced here without pandas, it underlines mapping, tabulation, and custom result formatting.

### Tags

### Similar Problems
