### Leetcode 595 (Easy): Big Countries [Practice](https://leetcode.com/problems/big-countries)

### Description  
Given a table (or list) of countries with their name, area (in square kilometers), and population, identify the **"big countries"**. A country is considered **big** if **either**:
- its `area` is at least 3,000,000 km²  
- **or** its `population` is at least 25,000,000  
The output should list the names of these big countries, typically along with their area and population.

### Examples  

**Example 1:**  
Input: `countries = [("USA", 9833517, 331002651), ("Canada", 9984670, 37742154), ("Algeria", 2381741, 43000000)]`  
Output: `["USA", "Canada"]`  
*Explanation: "USA" and "Canada" have area ≥ 3,000,000. "Algeria" does not meet either threshold.*

**Example 2:**  
Input: `countries = [("Singapore", 710, 5703600), ("China", 9596961, 1392730000)]`  
Output: `["China"]`  
*Explanation: "China" has both area ≥ 3,000,000 and population ≥ 25,000,000. Singapore meets neither.*

**Example 3:**  
Input: `countries = [("Russia", 17098242, 144478050), ("Japan", 377973, 125800000)]`  
Output: `["Russia", "Japan"]`  
*Explanation: "Russia" has area and population above thresholds. "Japan" has population ≥ 25,000,000.*

### Thought Process (as if you’re the interviewee)  
- First, clearly understand the definition: a country is "big" if it satisfies **at least one** of the two criteria.
- For a list of country tuples:  
  - Loop through each tuple, check if either `area ≥ 3,000,000` **or** `population ≥ 25,000,000`.
  - If true, include the country in results.
- Brute-force is acceptable here since it's just a filter: check each entry individually without optimization.
- In SQL, this problem is a classic use of the `WHERE` clause with an OR condition.
- In Python, a simple list comprehension with a conditional filter is efficient and readable.
- Time and space efficiency are both very good because we only scan the input once.

### Corner cases to consider  
- Input list is empty (`[]`): output should be empty.
- All countries are "big": all returned.
- No countries are "big": return empty list.
- Area and population exactly at the threshold (should count as big).
- Negative or nonsensical data (e.g., negative population or area): problem doesn't specify, so assume only valid, sensible inputs.

### Solution

```python
from typing import List, Tuple

def bigCountries(countries: List[Tuple[str, int, int]]) -> List[str]:
    # Returns the names of countries that have area >= 3,000,000 or population >= 25,000,000
    result = []
    for name, area, population in countries:
        if area >= 3_000_000 or population >= 25_000_000:
            result.append(name)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each country is examined once to check the conditions.
- **Space Complexity:** O(k)
  - Where k = number of big countries output, since only names fulfilling the condition are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if you needed the result sorted alphabetically?
  *Hint: Try sorting your result list before returning.*
  
- What if you needed both name and population in the result?
  *Hint: Return tuples or a dictionary instead of just names.*

- How would you handle extremely large datasets efficiently?
  *Hint: Consider data streaming, yielding results, or using a database operation.*

### Summary
This problem uses a **filtering pattern**—scan a list (or table) and select entries based on OR-combined threshold comparisons. This is a basic but very common pattern in data processing and is foundational for database `WHERE` queries and Python filtering tasks. The approach applies cleanly to any scenario where objects/entities have multiple independent criteria for "selection."

### Tags
Database(#database)

### Similar Problems
