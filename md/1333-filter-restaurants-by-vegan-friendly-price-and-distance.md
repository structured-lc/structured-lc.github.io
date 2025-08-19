### Leetcode 1333 (Medium): Filter Restaurants by Vegan-Friendly, Price and Distance [Practice](https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance)

### Description  
Given a list of restaurants, filter them according to whether they match certain criteria (veganFriendly, price, distance). Each restaurant is described as [id, rating, veganFriendly, price, distance]. You must:
- Only include restaurants that satisfy:
  - veganFriendly == 1 if the filter is on;
  - price ≤ maxPrice;
  - distance ≤ maxDistance.
Then, sort the results descending by rating, then by id, and return the list of restaurant ids in that order.

### Examples  
**Example 1:**  
Input: `restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 1, maxPrice = 50, maxDistance = 10`  
Output: `[3,1,5]`  
*Explanation: After filtering (vegan, price ≤ 50, distance ≤ 10): [[1,4,1,40,10],[3,8,1,30,4],[5,1,1,15,1]]. Sorted by rating desc, id desc: [3,1,5].*

**Example 2:**  
Input: `restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 50, maxDistance = 10`  
Output: `[4,3,2,1,5]`  
*Explanation: All restaurants with price ≤ 50, distance ≤ 10. Sort by rating desc, id desc.*

**Example 3:**  
Input: `restaurants = [[1,4,0,40,10]], veganFriendly = 1, maxPrice = 50, maxDistance = 10`  
Output: `[]`  
*Explanation: No vegan-friendly restaurants.*

### Thought Process (as if you’re the interviewee)  
- First, filter the list by the three criteria.
- The veganFriendly criterion is only enforced if veganFriendly == 1 filter is requested.
- After filtering, sort by (rating desc, id desc).
- Return the ids only.

### Corner cases to consider  
- No restaurants satisfy the filter (return []).
- All or none are vegan-friendly.
- Some filter criteria exclude everything.
- Multiple restaurants have same rating/id (stable sorting must work).

### Solution

```python
from typing import List

def filterRestaurants(restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int) -> List[int]:
    filtered = []
    for rest in restaurants:
        if veganFriendly and rest[2] != 1:
            continue
        if rest[3] > maxPrice or rest[4] > maxDistance:
            continue
        filtered.append(rest)
    # sort by rating desc, then id desc
    filtered.sort(key=lambda x: (-x[1], -x[0]))
    return [r[0] for r in filtered]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) (from sorting; filtering is O(n))
- **Space Complexity:** O(n) (for storing filtered restaurants)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the restaurant list is huge (stream)?  
  *Hint: Use a heap/priority queue of fixed size for only top-K.*

- How would you add support for searching with flexible filter criteria (e.g., range or optional fields)?  
  *Hint: Build filter functions or use more generic predicates.*

- How to optimize if queries are repeated many times with different filters?  
  *Hint: Preprocess with indices or buckets.*

### Summary
This solution is a direct application of **filter, then sort**. This coding pattern occurs often in data-driven problems, e.g., filtering/searching entries by multiple attributes and then sorting by priorities.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
