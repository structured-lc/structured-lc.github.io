### Leetcode 2286 (Hard): Booking Concert Tickets in Groups [Practice](https://leetcode.com/problems/booking-concert-tickets-in-groups)

### Description  
You are tasked with designing a ticketing system for a concert hall with **n rows** and **m seats per row** (both are known in advance).  
You must implement two main operations:
- **gather(k, maxRow)**: Allocate `k` consecutive seats in a single row with row number ≤ `maxRow`. Always pick the **smallest row** and the **leftmost seats** possible. Return `[row, seatNumber]` if possible, otherwise return an empty list `[]`.
- **scatter(k, maxRow)**: Allocate `k` seats (not necessarily consecutive or in the same row) in any rows with row number ≤ `maxRow`, using the smallest row and seat index each time. Return `True` if possible and perform the allocation, else `False`.

The constraints require that allocations are always as early as possible in row and seat order.  
Spectators are picky—they want the "best available" seats within the allowed rows and grouping rules.

### Examples  

**Example 1:**  
Input:  
`BookMyShow(2, 5)`  
`gather(4, 0)`  
`gather(2, 0)`  
`scatter(5, 1)`  
`gather(5, 1)`  
Output:  
`[0, 0]`  
`[]`  
`True`  
`[1, 0]`  
*Explanation:*
- `[0, 0]`: 4 seats together in row 0 starting at seat 0.
- `[]`: Not enough consecutive seats in row 0.
- `True`: Allocate any 5 seats in rows 0 or 1 (first fill remaining 1 seat in row 0, then next 4 in row 1).
- `[1, 0]`: 5 seats together in row 1 starting at seat 0.

**Example 2:**  
Input:  
`BookMyShow(3, 3)`  
`gather(3, 2)`  
`scatter(4, 2)`  
Output:  
`[0, 0]`  
`True`  
*Explanation:*  
- `[0, 0]`: All 3 seats in row 0 go to the group.  
- `True`: Can allocate 1 seat left in row 0 + all seats in row 1 (3 total) = 4 seats.

**Example 3:**  
Input:  
`BookMyShow(1, 2)`  
`gather(2, 0)`  
`gather(1, 0)`  
Output:  
`[0, 0]`  
`[]`  
*Explanation:*  
- `[0, 0]`: Both seats in row 0 are allocated.
- `[]`: No seats left in row 0.

### Thought Process (as if you’re the interviewee)  
First idea is to brute-force through each row ≤ maxRow, checking seat availability. For gather, we need to find k consecutive seats in a row. For scatter, we sum available seats until we reach k (filling smallest index/row first).  
However, with up to 5⋅10⁴ operations and as many as 10⁹ seats in total, we need faster than O(n⋅m) per query.

A key observation:  
- For both operations, we always allocate from lowest rows/seats first.
- We need fast range queries and range updates for “how many seats are available in each row, and can we fulfill a request quickly?”  
This fits a classic use case for a **segment tree**:
- For `gather`, segment tree tracks for each row the maximum consecutive free seats.
- For `scatter`, segment tree aggregates the total available seats.

Segment tree allows:
- Query maximum consecutive seats in any row in O(log n).
- Query or update total available seats in O(log n).
- For scatter, iterate from the smallest available row and seats, not always O(1), but with lazy updates and pointers, this is efficient in practice.

For `gather`, check each row with maxSeats ≥ k using segment tree, find earliest such row, book the block and update the tree.

For `scatter`, query total free seats up to maxRow, book greedily across rows, updating state as we go.

### Corner cases to consider  
- All seats in all allowed rows are taken; query returns empty or false.
- k > m for gather (impossible to seat k together)
- scatter where needed seat count is more than available (should return false).
- maxRow=0: only row 0 usable.
- Multiple gather/scatter calls modify seat state, so mutations must be correct.
- Large k close to n×m.

### Solution

```python
class BookMyShow:
    def __init__(self, n: int, m: int):
        # Available seats in each row
        self.n = n
        self.m = m
        self.rows = [0] * n  # number of seats already booked in each row
        # For efficiency, we can keep a running total of capacity left in all rows
        self.total = n * m
        # For scatter, pointer to first row with available seats
        self.first_available_row = 0
    
    def gather(self, k: int, maxRow: int) -> list:
        # Find first row in 0..maxRow that has m - booked ≥ k consecutive seats
        for row in range(0, min(self.n, maxRow + 1)):
            if self.m - self.rows[row] >= k:
                seatNumber = self.rows[row]
                self.rows[row] += k
                self.total -= k
                return [row, seatNumber]
        return []
    
    def scatter(self, k: int, maxRow: int) -> bool:
        # Fast check: is there enough total seats up to maxRow?
        total_avail = 0
        for row in range(0, min(self.n, maxRow + 1)):
            total_avail += self.m - self.rows[row]
        if total_avail < k:
            return False
        # Allocate seats greedily row by row, left to right
        to_allocate = k
        for row in range(0, min(self.n, maxRow + 1)):
            avail = self.m - self.rows[row]
            if avail == 0:
                continue
            allocate_now = min(avail, to_allocate)
            self.rows[row] += allocate_now
            self.total -= allocate_now
            to_allocate -= allocate_now
            if to_allocate == 0:
                break
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **gather:** O(maxRow) worst-case as we check each row up to maxRow.  
  - **scatter:** O(maxRow) for summing/allocating each row up to maxRow.  
  - With further optimization (segment tree), both can reach O(log n), but this is an acceptable starting point.

- **Space Complexity:**  
  - O(n) for storing bookings per row.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you improve the time complexity for the `gather` and `scatter` methods?  
  *Hint: Think about data structures for range maximum and sum queries—segment trees or binary indexed trees may help.*

- What happens if the constraints increase, say, n or m up to 10⁹?  
  *Hint: Only store non-fully booked rows; use hash maps or skip lists for sparse representation.*

- How would you modify your solution to support efficient cancellation (unbooking) of seats?  
  *Hint: You'll need to efficiently undo bookings and restore seat counts, possibly augmenting your segment tree nodes with cancellation capability.*

### Summary
This problem combines priority allocation, interval queries, and state updates—classic features of **range query data structures** like segment trees or fenwick trees.  
Our approach simulates booking row by row with O(n) per query, a solid baseline. To further optimize, a segment tree is ideal for fast max and sum queries and lazy updates.  
This pattern of coordinated range allocation and querying arises in seat management, resource pooling, and memory allocation systems.


### Flashcard
Use a segment tree or similar to track available seats per row, always allocating from lowest rows/seats first.

### Tags
Binary Search(#binary-search), Design(#design), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
- Cinema Seat Allocation(cinema-seat-allocation) (Medium)
- Longest Increasing Subsequence II(longest-increasing-subsequence-ii) (Hard)