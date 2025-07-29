### Leetcode 2987 (Easy): Find Expensive Cities [Practice](https://leetcode.com/problems/find-expensive-cities)

### Description  
Given a table `Listings` with columns `listing_id`, `city`, and `price`, find all **cities** where the average home price is **strictly greater than the national average home price**.  
Return a list of city names in ascending order.  
In other words:  
- Compute the average price for each city.
- Compute the average price across all listings (national average).
- Keep only cities whose average price is greater than the national average.
- Return the sorted list of city names.

### Examples  

**Example 1:**  
Input:  
Listings =  
| listing_id | city    | price |
|------------|---------|-------|
| 1          | Boston  | 100   |
| 2          | Boston  | 200   |
| 3          | Miami   | 400   |
| 4          | Miami   | 600   |
| 5          | Austin  | 150   |  
Output:  
`["Miami"]`  
*Explanation:*
- Boston: avg = (100 + 200) ÷ 2 = 150
- Miami: avg = (400 + 600) ÷ 2 = 500
- Austin: avg = 150
- National average = (100+200+400+600+150) ÷ 5 = 290
- Only Miami (> 290), so return ["Miami"]

**Example 2:**  
Input:  
Listings =  
| listing_id | city      | price |
|------------|-----------|-------|
| 1          | Chicago   | 120   |
| 2          | Chicago   | 130   |
| 3          | Atlanta   | 125   |
| 4          | Seattle   | 115   |  
Output:  
`["Chicago"]`  
*Explanation:*  
- Chicago: avg = (120 + 130) ÷ 2 = 125
- Atlanta: 125
- Seattle: 115
- National avg = (120 + 130 + 125 + 115) ÷ 4 = 122.5
- Only Chicago (125 > 122.5)

**Example 3:**  
Input:  
Listings =  
| listing_id | city     | price |
|------------|----------|-------|
| 1          | Dallas   | 80    |
| 2          | Austin   | 90    |
| 3          | Houston  | 100   |  
Output:  
`[]`  
*Explanation:*  
- Dallas: 80
- Austin: 90
- Houston: 100
- National avg = (80+90+100) ÷ 3 = 90
- No city's avg is > 90

### Thought Process (as if you’re the interviewee)  
To solve the problem, I need each city’s average price and the overall average price.  
Initial brute force:
- For each city, manually filter all its listings, sum and average.
- Then, separately calculate national average.
- Compare for each city.

But this is inefficient and not scalable.  
Optimized (SQL-style or algorithmic approach):
- One pass: calculate sum and count per city; another for national sum/count.
- Or, after building these, compute per city: if city_avg > national_avg, add city to result.

Space-time trade-off: maintaining sums/counts per city (hash map) and for the whole country.  
Need to sort the final city list lexicographically before returning.

This approach is efficient, simple, and one scan per city/record.

### Corner cases to consider  
- No listings at all ⇒ output is []
- Only one city ⇒ city not in output (as avg = national avg, not >)
- All prices are equal ⇒ no city is output
- Multiple cities tie for the highest average, but equal to, not exceeding, national avg
- Cities with only one listing
- City names with differing casing or spelling (usually case-sensitive)

### Solution

```python
def findExpensiveCities(listings):
    # Step 1: Compute city-wise total sum and count, and global sum & count
    from collections import defaultdict

    city_sum = defaultdict(int)
    city_count = defaultdict(int)
    total_sum = 0
    total_count = 0

    for listing in listings:
        city = listing['city']
        price = listing['price']
        city_sum[city] += price
        city_count[city] += 1
        total_sum += price
        total_count += 1

    # Step 2: Compute national average
    if total_count == 0:
        return []

    national_avg = total_sum / total_count

    # Step 3: Find cities with avg > national_avg
    res = []
    for city in city_sum:
        city_avg = city_sum[city] / city_count[city]
        if city_avg > national_avg:
            res.append(city)

    # Step 4: Lex sort
    res.sort()
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k log k), where n = number of listings, k = distinct cities. O(n) to sum, O(k log k) to sort city names.
- **Space Complexity:** O(k), for storing city sums and counts; plus O(k) for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are millions of listings?  
  *Hint: Can your hashmap scale, or can you process this data in a distributed way?*

- What if you wanted cities with at least a threshold number of listings?  
  *Hint: Add a filter like count ≥ threshold before comparing averages.*

- What if cities’ names may have different cases (e.g., "Boston" vs "boston")?  
  *Hint: Normalize city names (convert to lower or upper case) when processing.*

### Summary
This problem uses the **group-by aggregation** coding pattern: accumulate statistics per group (sum, count), compute an overall aggregate, then filter on per-group vs. global value. This is a common approach in SQL and data-processing interviews, useful for "group-by and compare to aggregate" tasks, such as finding sales leaders by region, top predicting companies, etc.