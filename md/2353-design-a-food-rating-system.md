### Leetcode 2353 (Medium): Design a Food Rating System [Practice](https://leetcode.com/problems/design-a-food-rating-system)

### Description  
You need to implement a **food rating system** with these requirements:
- Each food has a name, belongs to a specific cuisine, and has a rating (integer).
- You can:
  - **changeRating(food, newRating):** Change the rating of any existing food.
  - **highestRated(cuisine):** Find the food of a given cuisine with the highest rating (pick lexicographically smallest name on ties).

You are required to efficiently support both operations and handle updates after any rating change.

### Examples  

**Example 1:**  
Input:  
`FoodRatings(["kimchi","miso","sushi","moussaka","ramen","bulgogi"],["korean","japanese","japanese","greek","japanese","korean"],[9,12,8,15,14,7])`  
`highestRated("korean")`  
Output: `"kimchi"`  
*Explanation: Among korean foods ("kimchi":9, "bulgogi":7), kimchi has the highest rating.*

**Example 2:**  
Input:  
`changeRating("sushi", 16)`  
`highestRated("japanese")`  
Output: `"sushi"`  
*Explanation: After updating sushi's rating to 16, it becomes the highest among japanese foods ("miso":12, "sushi":16, "ramen":14).*

**Example 3:**  
Input:  
`changeRating("ramen", 16)`  
`highestRated("japanese")`  
Output: `"ramen"`  
*Explanation: Now both "ramen" and "sushi" are rated 16, but "ramen" is lexicographically smaller, so it is chosen.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For changeRating, it's O(1) to update the rating mapping. For highestRated, scan all foods of that cuisine and return the highest. This is **slow for large N** or when many queries happen.

- **Optimized:**  
  - Track each food's rating and cuisine in a mapping.
  - For each cuisine, maintain a sorted structure (like a balanced BST, sorted list, or heap) of foods by rating, and names for tie-breaker.
  - On changeRating, remove the old entry and insert the updated one in the cuisine’s structure.
  - On highestRated, just pick the max (top) from the cuisine’s structure.
  - Use tuple keys (-rating, name) for easy sorting by highest rating and lex min.
  - Need to ensure that we keep the sorted order up to date after changes.

- **Trade-offs:**  
  - Balanced BST or sorted list keeps order but has O(log N) inser/removal. 
  - A heap (priority queue) per cuisine is very fast for highestRated, but requires logic to lazily delete outdated ratings, since Python heaps can’t delete arbitrary elements efficiently.
  - Mapping each food to its current rating helps manage updates.

### Corner cases to consider  
- Changing rating to an existing max/rating tied value — tie-break by name.
- Multiple foods with same name (guaranteed not to happen, per problem).
- All foods of one cuisine updated to very low value.
- Repeated ratings changes on same item.
- Querying a cuisine with only one food.
- All foods across cuisines except one removed/disconnected (unlikely due to constraints).

### Solution

```python
from collections import defaultdict
import heapq

class FoodRatings:
    def __init__(self, foods, cuisines, ratings):
        # Store food --> (rating, cuisine)
        self.food_to_info = {}
        # Store cuisine --> heap[( -rating, name )]
        self.cuisine_to_heap = defaultdict(list)
        # Also store food --> current rating for consistency check
        self.food_to_rating = {}

        for f, c, r in zip(foods, cuisines, ratings):
            self.food_to_info[f] = (c, r)
            self.food_to_rating[f] = r
            heapq.heappush(self.cuisine_to_heap[c], (-r, f))

    def changeRating(self, food, newRating):
        cuisine, _ = self.food_to_info[food]
        self.food_to_info[food] = (cuisine, newRating)
        self.food_to_rating[food] = newRating
        # Insert the updated rating
        heapq.heappush(self.cuisine_to_heap[cuisine], (-newRating, food))
        # We DO NOT delete old rating from heap (lazy deletion)

    def highestRated(self, cuisine):
        # Remove outdated heap entries lazily
        heap = self.cuisine_to_heap[cuisine]
        while True:
            rating_neg, name = heap[0]
            if self.food_to_rating[name] == -rating_neg:
                return name
            heapq.heappop(heap)  # Remove outdated entry
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `__init__`: O(N log N), as we push N items to heaps.
  - `changeRating`: O(log N), for pushing to the heap.
  - `highestRated`: Amortized O(log N) if there are outdated entries, since we may pop multiple times when ratings have changed. Still efficient if the number of changes and queries is reasonable.

- **Space Complexity:**  
  - O(N) for the mappings and the heaps. Each food can have multiple heap entries after several rating changes, but still within O(N) due to the maximum number of changes equal to queries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the system to support **removal** of foods?
  *Hint: Think about how to cleanly remove entries from heaps or handle stale items.*

- What if the rating can be **non-integer** or if there are foods from new cuisines added at runtime?
  *Hint: Consider flexible mappings and data structures supporting new keys on the fly.*

- Can you make the highestRated and changeRating methods **guaranteed O(1)**?
  *Hint: Think about more advanced structures, double-heap, or maintaining additional mappings.*

### Summary
This solution uses the **heap with lazy deletion** pattern, optimized for quick update and retrieval of maximum by using (negative rating, name) tuples. The pattern supports efficient priority/tie-breaking queries even as ratings are updated dynamically. This structure is often found in problems involving **live maximum/minimum retrieval with mutations**, such as leaderboards, live auction tracking, and real-time recommendation engines.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
- Design a Number Container System(design-a-number-container-system) (Medium)
- Most Popular Video Creator(most-popular-video-creator) (Medium)