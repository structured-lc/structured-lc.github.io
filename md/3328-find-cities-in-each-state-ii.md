### Leetcode 3328 (Medium): Find Cities in Each State II [Practice](https://leetcode.com/problems/find-cities-in-each-state-ii)

### Description  
Given a SQL table `cities` with columns `state` and `city`, **for each state**, return:
- *A comma-separated string of all cities* in that state (sorted alphabetically).
- Only include:
  - States that have **at least 3 cities**.
  - States where **at least one city starts with the same letter as the state name**.
- Sort the output:
  1. By the count of such “matching-letter” cities (*those starting with the same letter as the state, case-insensitive*) **descending**.
  2. By state name **ascending**.

### Examples  

**Example 1:**  
Input:  
cities =  
| state        | city            |
| ------------ | -------------- |
| New York     | New York City  |
| New York     | Newark         |
| New York     | Buffalo        |
| New York     | Rochester      |
| California   | San Francisco  |
| California   | Sacramento     |
| California   | San Diego      |
| California   | Los Angeles    |
| Texas        | Tyler          |
| Texas        | Temple         |
| Texas        | Taylor         |
| Texas        | Dallas         |
| Pennsylvania | Philadelphia   |
| Pennsylvania | Pittsburgh     |
| Pennsylvania | Pottstown      |

Output:  
| state        | cities                                 | matching_count |
| ------------ | -------------------------------------- | ------------- |
| Pennsylvania | Philadelphia,Pittsburgh,Pottstown      | 3             |
| Texas        | Dallas,Taylor,Temple,Tyler             | 3             |
| New York     | Buffalo,New York City,Newark,Rochester | 2             |
| California   | Los Angeles,San Diego,San Francisco,Sacramento | 1             |

Explanation:  
- "Pennsylvania" has 3 cities all starting with 'P' (matching).
- "Texas" has Tyler, Temple, Taylor (3) with 'T' (matching).
- "New York" has "New York City" and "Newark" (matching 'N'), also has enough cities.
- "California" only "San Diego, San Francisco, Sacramento" (only Sacramento matches with 'S' vs 'C'), but only "Sacramento" starts with 'C', so count is 1.

**Example 2:**  
Input:
cities =  
| state   | city     |
| ------- | -------- |
| Maine   | Bangor   |
| Maine   | Portland |
| Maine   | Augusta  |

Output:  
(no output)  
Explanation:  
- No cities start with 'M', so Maine does not qualify.

**Example 3:**  
Input:
cities =  
| state  | city      |
| ------ | --------- |
| Hawaii | Honolulu  |
| Hawaii | Hilo      |
| Hawaii | Hana      |

Output:  
| state  | cities           | matching_count |
| ------ | --------------- | ------------- |
| Hawaii | Hana,Hilo,Honolulu | 3             |

Explanation:  
- All Hawaii's cities start with 'H'.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - For each state, collect all cities.
  - Count how many cities start with the same letter as the state (case-insensitive).
  - If city count ≥ 3 and at least one city matches, include it.
  - Output required columns; sort as specified.

- **Optimized Approach:**  
  - Group by state.
  - Pre-compute the count and list of matching cities.
  - Store all cities of a state sorted lexicographically.
  - Apply filtering conditions.
  - For SQL: Use GROUP BY and CASE for matching counts.

- **Why this approach:**  
  - Simple grouping with filter/sort conditions.
  - All operations scalable using basic data structures (dictionary for state -> cities).

### Corner cases to consider  
- States with exactly 3 cities (should be included if 1+ city matches).
- State/city names with different cases: matching should be case-insensitive.
- States where only 1 or 2 cities match letter, but 3+ total: still include.
- No qualifying states: should return empty result.
- City/state names with leading/trailing spaces (should be trimmed).
- States with multiple cities having the *exact* same name (should still count each row).
- All cities in the state match the letter.

### Solution

```python
# We are given a list of tuples [(state, city), ...]
# Let's implement the logic step by step.

def findCitiesInEachStateII(cities):
    from collections import defaultdict

    state_to_cities = defaultdict(list)
    for state, city in cities:
        state_to_cities[state].append(city)

    result = []
    for state, city_list in state_to_cities.items():
        cities_sorted = sorted(city_list)
        # Count cities matching first letter (case-insensitive)
        st_letter = state.strip()[0].lower()
        matching_count = sum(1 for city in cities_sorted if city.strip()[0].lower() == st_letter)
        if len(cities_sorted) >= 3 and matching_count > 0:
            result.append( (state,
                            ",".join(cities_sorted),
                            matching_count) )
    # Sort by matching_count desc, then state asc
    result.sort(key=lambda x: (-x[2], x[0]))
    return result

# Example usage:
cities = [
    ("New York", "New York City"),
    ("New York", "Newark"),
    ("New York", "Buffalo"),
    ("New York", "Rochester"),
    ("California", "San Francisco"),
    ("California", "Sacramento"),
    ("California", "San Diego"),
    ("California", "Los Angeles"),
    ("Texas", "Tyler"),
    ("Texas", "Temple"),
    ("Texas", "Taylor"),
    ("Texas", "Dallas"),
    ("Pennsylvania", "Philadelphia"),
    ("Pennsylvania", "Pittsburgh"),
    ("Pennsylvania", "Pottstown"),
]
print(findCitiesInEachStateII(cities))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k), where n is the total number of input rows and k is the maximum number of cities per state. Major step is sorting each state's city list.
- **Space Complexity:** O(n), as we need to store all cities in grouped lists and build the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this if the cities table was so large it did not fit in memory?  
  *Hint: Can you process/store cities one state at a time, or use external sorting?*

- What if you had to return the city names grouped as a list (not string)?  
  *Hint: Adjust the post-processing/formatting logic.*

- Can you do this in a single SQL query?  
  *Hint: Use GROUP_CONCAT, CASE WHEN for matching, GROUP BY, HAVING, ORDER BY.*

### Summary
This problem uses the **group-by pattern**, filtering based on group aggregates, and custom sorting. This approach is broadly applicable in data analytics and reporting, and common in SQL (“GROUP BY, HAVING, aggregate function, ORDER BY”). Being able to handle group-wise filtering, aggregation, and sorting is a critical coding/data manipulation skill.


### Flashcard
Use GROUP_CONCAT with ORDER BY to combine cities, filter states with ≥3 cities and ≥1 city matching state's first letter, sort by matching count DESC then state ASC.

### Tags
Database(#database)

### Similar Problems
