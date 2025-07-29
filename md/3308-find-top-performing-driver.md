### Leetcode 3308 (Medium): Find Top Performing Driver [Practice](https://leetcode.com/problems/find-top-performing-driver)

### Description  
Given tables for both drivers and their trips, find the **top-performing driver for each fuel type**.  
- A driver's *performance* is measured by their **average trip rating** (rounded to 2 decimal places).  
- If two drivers have the same average rating, **prefer the one with the higher mileage**.  
- If there’s still a tie, **prefer the one with fewer accidents**.  
- For each fuel type, return the information about the driver who is considered the best by these rules.  
- The result should be sorted by fuel type in ascending order.

### Examples  

**Example 1:**  
Input:  
Drivers =  
| driver_id | mileage | fuel_type | accidents |
|-----------|---------|-----------|-----------|
|    101    |  15000  | Electric  |    1      |
|    102    |  12000  | Gasoline  |    0      |
|    103    |  20000  | Electric  |    0      |

Trips =  
| trip_id | driver_id | rating |
|---------|-----------|--------|
|   1     |   101     |   5    |
|   2     |   101     |   4    |
|   3     |   103     |   5    |
|   4     |   103     |   4    |
|   5     |   102     |   3    |

Output:  
| fuel_type | driver_id | avg_rating | mileage | accidents |
|-----------|-----------|------------|---------|-----------|
| Electric  |   103     |   4.50     | 20000   |    0      |
| Gasoline  |   102     |   3.00     | 12000   |    0      |

*Explanation: Both electric drivers have the same average rating, but 103 has more mileage and fewer accidents. Gasoline only has driver 102.*

**Example 2:**  
Input:  
Drivers =  
| driver_id | mileage | fuel_type | accidents |
|-----------|---------|-----------|-----------|
|   201     |  9000   | Hybrid    |    2      |
|   202     |  12000  | Hybrid    |    1      |

Trips =
| trip_id | driver_id | rating |
|---------|-----------|--------|
|   11    |   201     |   4    |
|   12    |   202     |   4    |

Output:  
| fuel_type | driver_id | avg_rating | mileage | accidents |
|-----------|-----------|------------|---------|-----------|
| Hybrid    |   202     |   4.00     | 12000   |    1      |

*Explanation: Both Hybrid drivers have the same average rating (4.00), but 202 has higher mileage, so wins.*

**Example 3:**  
Input:  
Drivers =  
| driver_id | mileage | fuel_type | accidents |
|-----------|---------|-----------|-----------|
|   301     |  17000  | Electric  |    1      |

Trips =
| trip_id | driver_id | rating |
|---------|-----------|--------|
|   21    |   301     |   5    |

Output:  
| fuel_type | driver_id | avg_rating | mileage | accidents |
|-----------|-----------|------------|---------|-----------|
| Electric  |   301     |   5.00     | 17000   |    1      |

*Explanation: Only one driver, so he’s the best for Electric.*

### Thought Process (as if you’re the interviewee)  
- First, I need to **group trips by driver** and compute the average rating for each driver (rounded to 2 decimal places).
- Then, I’ll **join drivers and their computed averages** to get their mileage, fuel type, and accidents.
- For each fuel type, I need to **select the driver with the highest avg rating**.  
    - If tied, pick the one with the greatest mileage.
    - If still tied, pick the one with fewest accidents.
- This is essentially a **group + sort + pick-top** problem for each fuel type.

**Naive/brute-force:**  
- For each fuel type, scan all drivers, compute their avg, and pick the best.  
- This is inefficient for large datasets.

**Optimized:**  
- Use a group-by to compute averages (in SQL, this would be using GROUP BY and then a ROW_NUMBER partitioned by fuel_type).  
- For each fuel type, after tying breakers (avg_rating DESC, mileage DESC, accidents ASC), pick just the first/top row.
- In Python, the logic would be very similar, probably with dictionaries and `max` with custom keys; no need for sorting the whole list.

**Trade-offs:**  
- Can pre-compute per driver stats in O(n), resulting in efficient subsequent lookups.
- Final grouping across fuel_types is small.

### Corner cases to consider  
- No trips for a driver (should he be considered? Usually, such drivers are ignored).
- Multiple drivers with identical stats for a fuel type.
- Only one driver for a certain fuel type.
- Large number of trips or drivers; must remain efficient.
- Drivers belonging to the same fuel_type but no trips (likely filtered out due to undefined average).
- Negative or 0 mileage or accidents (shouldn’t happen, but code defensively).

### Solution

```python
def find_top_performing_driver(drivers, trips):
    # Step 1: Compute total ratings and trip counts for each driver
    from collections import defaultdict

    driver_rating_sum = defaultdict(int)
    driver_trip_count = defaultdict(int)
    for trip in trips:
        driver_id = trip['driver_id']
        rating = trip['rating']
        driver_rating_sum[driver_id] += rating
        driver_trip_count[driver_id] += 1

    # Step 2: Prepare driver stat dict {driver_id: {...driver info...}}
    driver_stats = {}
    for d in drivers:
        driver_id = d['driver_id']
        # Only consider drivers who have at least one trip
        if driver_trip_count[driver_id]:
            avg_rating = round(driver_rating_sum[driver_id] / driver_trip_count[driver_id] + 1e-8, 2)
            driver_stats[driver_id] = {
                'driver_id': driver_id,
                'fuel_type': d['fuel_type'],
                'mileage': d['mileage'],
                'accidents': d['accidents'],
                'avg_rating': avg_rating
            }

    # Step 3: Group drivers by fuel_type
    from collections import defaultdict
    fuel_driver_map = defaultdict(list)
    for info in driver_stats.values():
        fuel_type = info['fuel_type']
        fuel_driver_map[fuel_type].append(info)

    # Step 4: For each fuel_type, choose top-performing driver using tie-breaks
    res = []
    for fuel_type in sorted(fuel_driver_map.keys()):
        candidates = fuel_driver_map[fuel_type]
        # Key: (avg_rating DESC, mileage DESC, accidents ASC)
        best = max(
            candidates,
            key=lambda x: (x['avg_rating'], x['mileage'], -x['accidents'])
        )
        res.append({
            'fuel_type': fuel_type,
            'driver_id': best['driver_id'],
            'avg_rating': f"{best['avg_rating']:.2f}",
            'mileage': best['mileage'],
            'accidents': best['accidents']
        })
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = #trips and m = #drivers.  
  - Calculating averages is O(n).
  - Building mappings and grouping is O(m).
  - Final group selection is O(u), u = #unique fuel types.
- **Space Complexity:** O(n + m), as we use dictionaries to map drivers and trips, and a result array per fuel type.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties if *all* metrics (rating, mileage, accidents) are identical?
  *Hint: Think about using driver_id as the final tiebreaker—lowest wins.*

- How would you update this for a real-time leader-board as new trips come in?
  *Hint: Try maintaining running statistics and data structures for efficient updates.*

- How would you optimize for very large-scale datasets where memory is a concern?
  *Hint: Consider chunking, streaming, or using external storage.*

### Summary
The approach is a direct application of the **group by + ranking with tie-breakers** pattern.  
This coding pattern appears in “Top k per group,” “Leaderboard,” and “employee performance” problems commonly seen in data-oriented interviews and can be implemented similarly in SQL using window functions or in Python using max with composite keys.