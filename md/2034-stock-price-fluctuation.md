### Leetcode 2034 (Medium): Stock Price Fluctuation  [Practice](https://leetcode.com/problems/stock-price-fluctuation)

### Description  
You are given a stream of stock price records, where each record contains a **timestamp** and its **price**. Records may arrive **out of order** and for any timestamp, a new price update may overwrite any previous value.  
You must design a structure that supports:
- **Updating** the stock price for a timestamp, potentially correcting a previous record for that timestamp.
- **Querying the latest price**, defined as the price at the most recent timestamp seen so far.
- **Querying the maximum and minimum prices** based on all current records, reflecting all corrections.

### Examples  

**Example 1:**  
Input:  
`["StockPrice","update","update","current","maximum","update","maximum","update","minimum"]`  
`[[],[1,10],[2,5],[],[],[1,3],[],[4,2],[]]`  
Output:  
`[null,null,null,5,10,null,5,null,2]`  
*Explanation:*
- update(1,10): timestamp 1 gets price 10  
- update(2,5): timestamp 2 gets price 5  
- current(): latest timestamp is 2 → price = 5  
- maximum(): 10 is the highest price  
- update(1,3): correct timestamp 1 to price 3  
- maximum(): prices are [3,5], max = 5  
- update(4,2): timestamp 4 gets price 2  
- minimum(): prices are [3,5,2], min = 2

**Example 2:**  
Input:  
`["StockPrice","update","update","update","maximum","minimum"]`  
`[[],[2,5],[3,8],[2,4],[],[]]`  
Output:  
`[null,null,null,null,8,4]`  
*Explanation:*
- update(2,5): timestamp 2 price 5  
- update(3,8): timestamp 3 price 8  
- update(2,4): timestamp 2 price 4 (overwrite previous)  
- maximum(): [4,8], max = 8  
- minimum(): [4,8], min = 4

**Example 3:**  
Input:  
`["StockPrice","update","update","update","current"]`  
`[[],[7,12],[12,10],[11,15],[]]`  
Output:  
`[null,null,null,null,10]`  
*Explanation:*
- update(7,12): timestamp 7 → 12  
- update(12,10): timestamp 12 → 10  
- update(11,15): timestamp 11 → 15  
- current(): latest timestamp is 12, price = 10  

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  I could store a mapping from `timestamp → price`. To get the latest, I track the maximum timestamp.  
  To get min/max, I scan through all prices for each query (O(n)).

- **Why brute-force is slow:**  
  For each maximum/minimum query, iterating through all records will be too slow if lots of updates and queries occur.

- **Optimized approach:**  
  - I need **fast updates**, **fast latest price**, and **efficient min/max** queries.  
  - Use a dict (`priceByTimestamp`) for all updates. Track the **current latest timestamp** separately.  
  - For min/max, maintain two heaps:
    - **minHeap** (price, timestamp) for minimum.
    - **maxHeap** (-price, timestamp) for maximum.
  - For corrections (when updating a timestamp), out-of-date heap entries become "stale" but are ignored via lazy removals (check heap top against the dict mapping for valid price).  
  - All operations become O(log n) except dict lookups.

- **Trade-offs:**  
  The solution uses extra space for heaps that may contain duplicates, but it makes all four operations efficient.

### Corner cases to consider  
- Multiple updates to the same timestamp  
- Very large or very small ints for price/timestamp  
- Queries before any updates (handle gracefully)  
- Updating latest timestamp back to an older one and querying current  
- Max timestamp changes after updates  
- All prices being equal  
- Single timestamp case  
- Repeated min/max after corrections

### Solution

```python
class StockPrice:
    def __init__(self):
        # Map timestamps to prices
        self.price_by_time = {}
        # Track latest timestamp seen so far
        self.latest_time = 0
        # Min-heap for minimum price (price, timestamp)
        self.min_heap = []
        # Max-heap for maximum price (-price, timestamp)
        self.max_heap = []

    def update(self, timestamp: int, price: int) -> None:
        # Update the dictionary with the latest price for this timestamp
        self.price_by_time[timestamp] = price

        # Update the latest timestamp if needed
        if timestamp > self.latest_time:
            self.latest_time = timestamp

        # Push the new value to both heaps
        import heapq
        heapq.heappush(self.min_heap, (price, timestamp))
        heapq.heappush(self.max_heap, (-price, timestamp))

    def current(self) -> int:
        # The price at the latest timestamp
        return self.price_by_time[self.latest_time]

    def maximum(self) -> int:
        import heapq
        # Remove stale entries from max heap
        while True:
            price, timestamp = self.max_heap[0]
            # Compare heap top with authoritative price in mapping
            if self.price_by_time[timestamp] == -price:
                return -price
            # Remove stale: the stored price isn't current anymore for that timestamp
            heapq.heappop(self.max_heap)

    def minimum(self) -> int:
        import heapq
        # Remove stale entries from min heap
        while True:
            price, timestamp = self.min_heap[0]
            if self.price_by_time[timestamp] == price:
                return price
            # Remove stale: the stored price isn't current anymore for that timestamp
            heapq.heappop(self.min_heap)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - update: O(log n) for heap push  
  - current: O(1)  
  - maximum/minimum: Amortized O(log n), since each pop removes stale entries (worst-case all are stale, but n updates, so O(n) total for all pops).

- **Space Complexity:**  
  - O(n) for the dictionary mapping  
  - O(n) min_heap and O(n) max_heap: each update can push a new tuple, including stale entries, but at most O(n) total tuples.

### Potential follow-up questions (as if you’re the interviewer)  

- What if price removals (not just corrections) are needed?
  *Hint: Design ways to invalidate timestamps and efficiently cleanup stale heap entries.*

- If only maximum and minimum queries are allowed, how would you optimize further?
  *Hint: Consider data structures like balanced BST or TreeMap for faster cleanup and min/max.*

- Can you support range queries (max/min between two timestamps)?
  *Hint: You'd need an ordered structure (like a Segment Tree or BST) to answer efficiently.*

### Summary
This problem is a classic example of **lazy deletion** with min/max heaps, combined with a primary mapping to determine staleness. The data structure efficiently answers four real-time queries despite corrections and disorder in input.  
The technique—primary authoritative storage with one or more auxiliary data structures and lazy removal—is widely applicable for problems involving dynamic stats or consolidation over time, such as live event tracking, leaderboard maintenance, and sliding window aggregates.

### Tags
Hash Table(#hash-table), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Data Stream(#data-stream), Ordered Set(#ordered-set)

### Similar Problems
- Time Based Key-Value Store(time-based-key-value-store) (Medium)