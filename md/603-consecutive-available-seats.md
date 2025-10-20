### Leetcode 603 (Easy): Consecutive Available Seats [Practice](https://leetcode.com/problems/consecutive-available-seats)

### Description  
You are given a table (or a list of records) representing seats in a cinema row. Each seat record includes *seat_id* (numbered in order, starting at 1) and a binary value *free* (1 if the seat is available, 0 if it's occupied).  
The challenge is: Given this table/list and an integer *k*, return `True` if there are *k* or more **consecutive available** seats (where *free = 1* for each one), otherwise return `False`.  
This is fundamentally a search for a continuous sequence of *k* ones in the *free* column, with the *seat_id* values being consecutive.

### Examples  

**Example 1:**  
Input:  
```
seats = [
    [1, 1],
    [2, 0],
    [3, 1],
    [4, 1],
    [5, 1]
]
k = 3
```
Output: `True`  
Explanation: Seats 3, 4, 5 are free and consecutive, forming a block of 3 available seats.

**Example 2:**  
Input:  
```
seats = [
    [1, 1],
    [2, 1],
    [3, 0]
]
k = 3
```
Output: `False`  
Explanation: No block of 3 (or more) consecutive free seats exists.

**Example 3:**  
Input:  
```
seats = [
    [1, 1],
    [2, 1],
    [3, 0],
    [4, 1],
    [5, 1]
]
k = 2
```
Output: `True`  
Explanation: Seats 1,2 or seats 4,5 form blocks of 2 consecutive available seats.

### Thought Process (as if you’re the interviewee)  
- **Brute-force Approach:**  
  Go through the list and, for each seat where *free = 1*, check each window of size *k* to see if all *k* seats are free and their *seat_id* values are consecutive.  
  This runs in O(n·k) — inefficient for large n.

- **Optimized Approach:**  
  Since *seat_id* values are sequential, single-pass is possible.  
  - Keep a running counter (`count`) of consecutive available seats.
  - For each available seat, check if the current *seat_id* is exactly 1 greater than the previous seat_id. If so, increment counter; else, reset counter.
  - Whenever a seat is not free, reset counter to 0.

- **Why This Approach:**  
  - Only one pass is needed (O(n)), optimal for interview follow-up on improving efficiency.
  - No extra space is needed beyond basic variables.

### Corner cases to consider  
- Empty seats list (should return `False` or handle gracefully)
- All seats are free (should return `True` if *k* ≤ total seats)
- All seats are occupied (should return `False`)
- k = 1 (should return `True` if any seat is available)
- Non-consecutive *seat_id* (should assume input is cleaned/sequenced, else mention needs for a sort)

### Solution

```python
def has_k_consecutive_available_seats(seats, k):
    # Sort by seat_id in case input is unsorted
    seats.sort(key=lambda x: x[0])

    count = 0
    prev_seat_id = None

    for seat_id, free in seats:
        if free == 1:
            # If previous seat is consecutive, increment counter
            if prev_seat_id is not None and seat_id == prev_seat_id + 1:
                count += 1
            else:
                # Reset for a new possible block
                count = 1
            if count >= k:
                return True
        else:
            # Busy seat, reset counter
            count = 0
        prev_seat_id = seat_id

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of seat records. Each seat is processed once.
- **Space Complexity:** O(1) extra — only constant working variables; no additional data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if seats could be in multiple rows (i.e., not a single row, but a grid)?
  *Hint: Track consecutive blocks per row key. Treat each row independently.*

- Could you return *all* blocks of at least k consecutive free seats (instead of just True/False)?
  *Hint: Store start and end indices or seat ids of each qualifying block.*

- What if seat_id is not guaranteed sequential or unique?  
  *Hint: Validate or preprocess input; sort and detect duplicates.*

### Summary
This problem uses the *sliding window / counting consecutive elements* pattern, leveraging a single traversal and a counter for efficiency. It's a classic pattern in substring, subarray, or "find k-in-a-row" detection, and can be applied in seating, parking, scheduling, and other resource allocation scenarios where blocks of consecutive states are key.


### Flashcard
Use SQL self-join to find all pairs of consecutive seats where both are free (free = 1) and seat_id values differ by 1.

### Tags
Database(#database)

### Similar Problems
