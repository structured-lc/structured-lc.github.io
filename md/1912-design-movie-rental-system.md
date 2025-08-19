### Leetcode 1912 (Hard): Design Movie Rental System [Practice](https://leetcode.com/problems/design-movie-rental-system)

### Description  
This problem asks you to design a movie rental system that manages several shops, each of which rents out various movies at different prices.  
- Each shop can have (at most) one copy of each movie.  
- You need to support four operations:  
  - **Search:** Find the 5 cheapest shops (by price, then shop number) that have at least one *unrented* copy of a movie.  
  - **Rent:** Mark a specific movie as rented at a specific shop (if available).
  - **Drop:** Return a rented movie to a specific shop (makes it unrented).
  - **Report:** Output the 5 cheapest *currently rented* movies (by price, shop number, and then movie number).  

This means the system must keep track of which movies are rented/unrented at each shop, and allow efficient querying and updating for all operations.

### Examples  

**Example 1:**  
Input:  
```
MovieRentingSystem(3, [[0,1,5],[0,2,6],[0,3,7],[1,1,4],[1,2,7],[2,1,5]])  
search(1)  
rent(0,1)  
search(1)  
report()  
drop(0,1)  
report()
```
Output:  
```
[1,0,2]  
[1,2]  
[[1,1],[0,1]]  
[[1,1]]
```
*Explanation:*  
- Before any renting, the cheapest shops with movie 1 are shop 1 (price 4), shop 0 (5), shop 2 (5).  
- After renting (0,1), that movie 1 at shop 0 becomes unavailable for searching.  
- Reporting returns the currently rented movies in the correct order.

**Example 2:**  
Input:  
```
MovieRentingSystem(2, [[0,1,10],[1,1,15],[0,2,1],[1,2,1]])  
search(2)  
rent(0,2)  
search(2)  
report()  
drop(0,2)  
report()
```
Output:  
```
[0,1]  
[1]  
[[0,2]]  
[]
```
*Explanation:*  
- The available shops for movie 2 are shop 0 (1), shop 1 (1).  
- After renting (0,2), only shop 1 remains in the search, and report shows the rental.  
- After drop, both are again available.

**Example 3:**  
Input:  
```
MovieRentingSystem(1, [[0,0,3],[0,1,1]])  
search(0)  
rent(0,0)  
report()  
drop(0,0)  
search(0)
```
Output:  
```
[0]  
[[0,0]]  
[]  
[0]
```
*Explanation:*  
- System supports single-shop handling, and dropping returns the movie to un-rented pool.

### Thought Process (as if you’re the interviewee)  

First, I’d try to support each required operation efficiently:

- **Brute-force:**  
  - For searching available shops for a movie, scan through all shops; but this is too slow (O(n) per search), especially for large inputs.
  - To rent/drop, scan and update. Again, this won’t scale.

- **Optimized Approach:**  
  - Each movie should have a fast-access (sorted) list of all available (unrented) copies: (price, shop).
  - Track for each rented movie where it is, for reporting.
  - Each time a movie is rented or dropped, update data structures accordingly.
  - For **search**, use a SortedSet or min-heap per movie (by (price, shop)), and for **report**, keep a global sorted container of rented movies (by (price, shop, movie)).
  - To support fast removals by (shop, movie), also keep mappings from (shop, movie) to price and status.

**Trade-offs:**  
- The cost is in keeping multiple sorted data structures in sync. But this allows O(log n) operations for each command, which fits under tight constraints.
- This resembles the "Auction House/Marketplace" pattern and "Dual Heap" (where things move between sorted containers as their status changes).

### Corner cases to consider  
- Renting a movie that’s already rented (should be prevented)
- Dropping a movie that’s not currently rented
- Renting/dropping at a shop that doesn’t exist for that movie
- No available shops for a particular movie in search
- No rented movies, or <5, for report
- Prices tied, or shops tied in rank
- Single shop or movie scenarios  
- Movies with only one copy in total

### Solution

```python
from collections import defaultdict
import heapq

class MovieRentingSystem:
    def __init__(self, n, entries):
        # For each (shop, movie), track price and rented status
        self.price_map = dict()  # (shop, movie) -> price
        self.rented = set()      # (shop, movie) pairs currently rented
        
        # For each movie, keep a sorted list of unrented (price, shop)
        self.available = defaultdict(list)  # movie -> list of (price, shop)
        
        # Global heap for report: stores rented as (price, shop, movie)
        self.rented_list = []  # Min-heap of (price, shop, movie)
        self.rented_set = set() # Set for quick removal check

        # Populate data structures
        for shop, movie, price in entries:
            self.price_map[(shop, movie)] = price
            heapq.heappush(self.available[movie], (price, shop))

    def search(self, movie):
        result = []
        candidates = []
        # Get all available (not rented) shops for this movie
        # Since heapq does not support delete, we must skip over rented
        tmp = []
        while self.available[movie] and len(result) < 5:
            price, shop = heapq.heappop(self.available[movie])
            if (shop, movie) not in self.rented:
                result.append(shop)
            tmp.append((price, shop))
        # Restore heap
        for entry in tmp:
            heapq.heappush(self.available[movie], entry)
        return result

    def rent(self, shop, movie):
        # Mark as rented
        self.rented.add((shop, movie))
        price = self.price_map[(shop, movie)]
        heapq.heappush(self.rented_list, (price, shop, movie))
        self.rented_set.add((shop, movie))
        
    def drop(self, shop, movie):
        # Mark as unrented
        self.rented.discard((shop, movie))
        # No need to remove from rented_list heap now (see report pruning below)
        self.rented_set.discard((shop, movie))
        
    def report(self):
        result = []
        tmp = []
        # Since rented_list may have stale movies, skip entries that are no longer rented
        while self.rented_list and len(result) < 5:
            price, shop, movie = heapq.heappop(self.rented_list)
            if (shop, movie) in self.rented:
                result.append([shop, movie])
            tmp.append((price, shop, movie))
        # Restore heap
        for entry in tmp:
            heapq.heappush(self.rented_list, entry)
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `__init__`: O(m log m), m = number of entries (for building heaps per movie)
  - `search`: O(5 log n) worst case per call (as we may pop up to 5 shops)
  - `rent`: O(log r), r = currently rented movies (for inserting in rented_list heap)
  - `drop`: O(1) (just remove from rented set)
  - `report`: O(5 log r), r = rented movies (may need to pop several to find 5 valid)

- **Space Complexity:**
  - O(m) for price_map and all available movie heaps
  - O(r) for storing currently rented movies and the report heap

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle supporting *multiple copies* of the same movie at the same shop?  
  *Hint: Model with counts or a multiset, and track rental/deletion state for each copy.*

- How would the solution change if shops/movies can be *removed* dynamically?  
  *Hint: Efficiently removing from heaps requires specialized data structures; think about lazy removal or augmented BSTs.*

- Can you optimize for frequent rental activity where the number of rented movies is far greater than the number of unrented?  
  *Hint: Use cleaner heap clean-up strategies, or indexed structures to quickly find/expire stale heap entries.*

### Summary
This problem showcases data design patterns for *marketplace-style* queries using sorted data structures (min-heaps and sets for state tracking).  
Pattern: Maintain state in synchronised, query-optimized structures (here, per-movie and global heaps), using lazy deletion when direct removal isn't possible.  
You’ll find similar patterns in problems involving top-k queries, booking/reserving systems, and event dispatch queues.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
