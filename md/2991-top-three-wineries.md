### Leetcode 2991 (Hard): Top Three Wineries  [Practice](https://leetcode.com/problems/top-three-wineries)

### Description  
Given a table **Wineries** with columns:  
- id (unique int),  
- country (string),  
- points (int),  
- winery (string).  

Find the **top three wineries in each country** based on the **total points** from all their wine entries.  
If there are ties in total points, break ties by **winery name (lexicographically ascending)**.  
If there’s no second or third winery in a country, output 'No Second Winery' or 'No Third Winery' for those positions.  
**Output**: For each country, report the top, second, and third winery names according to the rules, ordered by country ascending.

### Examples  

**Example 1:**  
Input:
```
Wineries table:
| id | country   | points | winery     |
|----|-----------|--------|------------|
| 1  | France    | 95     | ParisWine  |
| 2  | France    | 92     | Bordeaux   |
| 3  | France    | 90     | ParisWine  |
| 4  | France    | 91     | NiceCrush  |
| 5  | Spain     | 97     | Rioja      |
| 6  | Spain     | 93     | Castilla   |
```
Output:
```
| country | first_winery | second_winery     | third_winery      |
|---------|--------------|-------------------|-------------------|
| France  | ParisWine    | Bordeaux          | NiceCrush         |
| Spain   | Rioja        | Castilla          | No Third Winery   |
```
*Explanation:*  
- France:  
  - ParisWine: 95+90 = 185  
  - Bordeaux: 92  
  - NiceCrush: 91  
- Spain:  
  - Rioja: 97  
  - Castilla: 93  
- For France, all three wineries present.  
- For Spain, only two; so third_winery is 'No Third Winery'.

**Example 2:**  
Input:
```
| id | country   | points | winery     |
|----|-----------|--------|------------|
| 1  | Italy     | 99     | Venice     |
```
Output:
```
| country | first_winery | second_winery     | third_winery      |
|---------|--------------|-------------------|-------------------|
| Italy   | Venice       | No Second Winery  | No Third Winery   |
```
*Explanation:*  
Only one winery in Italy, so 2nd and 3rd are filled as 'No Second Winery' and 'No Third Winery'.

**Example 3:**  
Input:
```
| id | country   | points | winery     |
|----|-----------|--------|------------|
| 1  | US        | 93     | NapaValley |
| 2  | US        | 88     | NapaValley |
| 3  | US        | 92     | Sonoma     |
| 4  | US        | 92     | Sonoma     |
| 5  | US        | 93     | OregonZest |
```
Output:
```
| country | first_winery | second_winery | third_winery   |
|---------|--------------|---------------|---------------|
| US      | NapaValley   | Sonoma        | OregonZest    |
```
*Explanation:*  
- NapaValley: 93+88 = 181  
- Sonoma: 92+92 = 184  
- OregonZest: 93  
So, Sonoma is 184, NapaValley is 181, OregonZest is 93. Sorted: Sonoma, NapaValley, OregonZest.

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to:
- For each country, sum the points of all wines for each winery.
- Sort wineries by total points (descending), breaking ties by winery name (ascending).
- Select the top three for each country, and fill in dummy values if there are fewer than 3.

To do this efficiently:
- Use a dictionary to accumulate total points per (country, winery).
- For each country, store a list of (total_points, winery_name) tuples.
- Sort each list as described and pick the top three, handling missing second/third spots.
- This minimizes passes over the data (O(n) for accumulation and O(k log k) for sorting per country, where k is number of wineries in a country).

Trade-offs:  
- Sorting per country is efficient unless a country has huge number of wineries (usually unlikely).
- No need for external libraries or advanced data structures—standard Python dicts and sorting suffice.

### Corner cases to consider  
- Empty table (no rows): Output should be empty.
- One winery in a country.
- Two wineries in a country.
- Wineries with identical total points (lex order tiebreaker).
- Countries with exactly three, fewer, or more than three wineries.
- Wineries with same final points but different names (check sorting on names).
- Large input sizes (ensure you don't redo grouping unnecessarily).

### Solution

```python
# Suppose input is a list of dictionaries:
# [
#   {'id': 1, 'country': 'France', 'points': 90, 'winery': 'ParisWine'},
#   ...
# ]
from collections import defaultdict

def top_three_wineries(wineries):
    # Map: country → winery → total points
    country_winery_points = defaultdict(lambda: defaultdict(int))
    
    # Aggregate total points for each (country, winery)
    for entry in wineries:
        country = entry['country']
        winery = entry['winery']
        points = entry['points']
        country_winery_points[country][winery] += points

    # Prepare result
    result = []
    for country in sorted(country_winery_points.keys()):
        winery_points_list = []
        for winery, total_points in country_winery_points[country].items():
            winery_points_list.append(( -total_points, winery ))  # negative for descending sort

        # Sort by total_points descending, then winery ascending
        winery_points_list.sort()

        # Collect top three winery names (handling missing ones)
        top_wineries = []
        for i in range(3):
            if i < len(winery_points_list):
                top_wineries.append(winery_points_list[i][1])
            else:
                if i == 1:
                    top_wineries.append('No Second Winery')
                elif i == 2:
                    top_wineries.append('No Third Winery')

        result.append({
            'country': country,
            'first_winery': top_wineries[0],
            'second_winery': top_wineries[1],
            'third_winery': top_wineries[2]
        })
    
    return result

# Sample usage:
test_input = [
    {'id': 1, 'country': 'France', 'points': 95, 'winery': 'ParisWine'},
    {'id': 2, 'country': 'France', 'points': 92, 'winery': 'Bordeaux'},
    {'id': 3, 'country': 'France', 'points': 90, 'winery': 'ParisWine'},
    {'id': 4, 'country': 'France', 'points': 91, 'winery': 'NiceCrush'},
    {'id': 5, 'country': 'Spain', 'points': 97, 'winery': 'Rioja'},
    {'id': 6, 'country': 'Spain', 'points': 93, 'winery': 'Castilla'}
]
print(top_three_wineries(test_input))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n + c × k log k),  
  where n = number of rows,  
  c = number of unique countries,  
  k = number of wineries per country (max).  
  Explanation: O(n) to aggregate, O(k log k) sorting per country.

- **Space Complexity:**  
  O(n) for storing all aggregation per country and winery.  
  Output and storage both scale with distinct country-winery pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if you had to support real-time insertions and want the results live at any time?  
  *Hint: Use a min-heap or keep sorted lists per country for quick access.*

- What if you wanted the "top K" (customizable) instead of fixed top three?  
  *Hint: Parameterize K and generalize filling 'No X Winery' as needed.*

- How would this scale if the data doesn't fit into memory?  
  *Hint: Use external sorting techniques, streaming aggregation, or databases.*

### Summary
This problem uses the classic **group-by and top-K selection** pattern, mixing aggregation with tie-breaking and structured output.  
It’s most naturally solved by using a nested dictionary, sorting, and careful result building.  
This coding pattern is often used for leaderboard problems, reporting, or when selecting the best (or worst) entities per category.